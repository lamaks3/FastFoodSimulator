//
//  APIMocks.swift
//  FastFood
//
//  Created by Maksim Shyshko on 07.09.2026.
//

import Foundation

// MARK: - Models (mirror the OpenAPI schemas)

struct CreateOrderDto: Codable {
    var customerName: String
    var dishes: [String]
}

struct FullOrder: Codable, Identifiable, Equatable {
    var id: Int
    var customerName: String
    var dishes: [String]
}

struct ShortOrder: Codable, Identifiable, Equatable {
    var id: Int
    var customerName: String
}

struct KitchenOrder: Codable, Identifiable, Equatable {
    var id: Int
    var dishes: [String]
}

struct CookOrderRequest: Codable {
    var id: Int
}

struct Orders: Codable {
    var ready: [ShortOrder]
    var notReady: [ShortOrder]
}

struct ErrorResponse: Codable, Error {
    var message: String
}

// MARK: - SSE event models (mirror SseOrderEvent / SseKitchenEvent / SseReadyEvent)

enum SseCommand: String, Codable {
    case add
    case remove
}

struct SseOrderCommand: Codable, Equatable {
    var orderId: Int
    var command: SseCommand
    var order: ShortOrder?
}

struct SseKitchenCommand: Codable, Equatable {
    var orderId: Int
    var command: SseCommand
    var order: KitchenOrder?
}

struct SseReadyCommand: Codable, Equatable {
    var orderId: Int
    var command: SseCommand
    var order: ShortOrder?
}

// MARK: - Service protocol

/// Conform a real network client to this later; the mock below is a drop-in
/// replacement so views/viewModels never need to change.
protocol OrderServiceProtocol {
    func createOrder(_ dto: CreateOrderDto) async throws -> FullOrder
    func getOrders() async throws -> Orders
    func getKitchenOrders() async throws -> [KitchenOrder]
    func cookOrder(id: Int) async throws
    func removeOrder(id: Int) async

    // SSE streams — each call returns a fresh stream, mirroring a new
    // EventSource subscription against /sse/orders, /sse/kitchen, /sse/ready.
    func ordersEvents() -> AsyncStream<SseOrderCommand>
    func kitchenEvents() -> AsyncStream<SseKitchenCommand>
    func readyEvents() -> AsyncStream<SseReadyCommand>
}

// MARK: - Static mock data

enum MockData {
    static var fullOrders: [FullOrder] = []

    static var readyOrders: [ShortOrder] = []

    static var notReadyOrders: [ShortOrder] = []

    static var kitchenOrders: [KitchenOrder] = []

    static let notFoundError = ErrorResponse(message: "Resource not found")
}

// MARK: - Mock service

/// Fake implementation of `OrderServiceProtocol`.
final class MockOrderService: OrderServiceProtocol {

    private var nextId = 5
    private let simulatedDelayNanoseconds: UInt64 = 300_000_000 // 0.3s

    // MARK: SSE subscriber bookkeeping
    //
    // Each `xEvents()` call creates a new AsyncStream + continuation and
    // stores the continuation in one of these dictionaries. When mock state
    // changes, we broadcast to every stored continuation (i.e. every "connected
    // client"), then clean up finished ones on `onTermination`.

    private let subscriberLock = NSLock()
    private var orderSubscribers: [UUID: AsyncStream<SseOrderCommand>.Continuation] = [:]
    private var kitchenSubscribers: [UUID: AsyncStream<SseKitchenCommand>.Continuation] = [:]
    private var readySubscribers: [UUID: AsyncStream<SseReadyCommand>.Continuation] = [:]

    // MARK: - SSE stream factories

    func ordersEvents() -> AsyncStream<SseOrderCommand> {
        let id = UUID()
        return AsyncStream { continuation in
            subscriberLock.lock()
            orderSubscribers[id] = continuation
            subscriberLock.unlock()

            continuation.onTermination = { [weak self] _ in
                guard let self else { return }
                self.subscriberLock.lock()
                self.orderSubscribers.removeValue(forKey: id)
                self.subscriberLock.unlock()
            }
        }
    }

    func kitchenEvents() -> AsyncStream<SseKitchenCommand> {
        let id = UUID()
        return AsyncStream { continuation in
            subscriberLock.lock()
            kitchenSubscribers[id] = continuation
            subscriberLock.unlock()

            continuation.onTermination = { [weak self] _ in
                guard let self else { return }
                self.subscriberLock.lock()
                self.kitchenSubscribers.removeValue(forKey: id)
                self.subscriberLock.unlock()
            }
        }
    }

    func readyEvents() -> AsyncStream<SseReadyCommand> {
        let id = UUID()
        return AsyncStream { continuation in
            subscriberLock.lock()
            readySubscribers[id] = continuation
            subscriberLock.unlock()

            continuation.onTermination = { [weak self] _ in
                guard let self else { return }
                self.subscriberLock.lock()
                self.readySubscribers.removeValue(forKey: id)
                self.subscriberLock.unlock()
            }
        }
    }

    // MARK: - Broadcast helpers

    private func broadcastOrder(_ event: SseOrderCommand) {
        subscriberLock.lock()
        let continuations = Array(orderSubscribers.values)
        subscriberLock.unlock()
        continuations.forEach { $0.yield(event) }
    }

    private func broadcastKitchen(_ event: SseKitchenCommand) {
        subscriberLock.lock()
        let continuations = Array(kitchenSubscribers.values)
        subscriberLock.unlock()
        continuations.forEach { $0.yield(event) }
    }

    private func broadcastReady(_ event: SseReadyCommand) {
        subscriberLock.lock()
        let continuations = Array(readySubscribers.values)
        subscriberLock.unlock()
        continuations.forEach { $0.yield(event) }
    }

    // MARK: - CRUD (now emitting SSE events on state changes)

    func createOrder(_ dto: CreateOrderDto) async throws -> FullOrder {
        try await Task.sleep(nanoseconds: simulatedDelayNanoseconds)

        guard !dto.dishes.isEmpty else {
            throw MockData.notFoundError
        }

        let order = FullOrder(id: nextId, customerName: dto.customerName, dishes: dto.dishes)
        nextId += 1

        MockData.fullOrders.append(order)

        let shortOrder = ShortOrder(id: order.id, customerName: order.customerName)
        MockData.notReadyOrders.append(shortOrder)

        let kitchenOrder = KitchenOrder(id: order.id, dishes: order.dishes)
        MockData.kitchenOrders.append(kitchenOrder)

        // A new order was created: it shows up in the "not ready" orders list
        // and simultaneously enters the kitchen queue.
        broadcastOrder(SseOrderCommand(orderId: order.id, command: .add, order: shortOrder))
        broadcastKitchen(SseKitchenCommand(orderId: order.id, command: .add, order: kitchenOrder))

        return order
    }

    func getOrders() async throws -> Orders {
        try await Task.sleep(nanoseconds: simulatedDelayNanoseconds)
        return Orders(ready: MockData.readyOrders, notReady: MockData.notReadyOrders)
    }

    func getKitchenOrders() async throws -> [KitchenOrder] {
        try await Task.sleep(nanoseconds: simulatedDelayNanoseconds)
        return MockData.kitchenOrders
    }

    func cookOrder(id: Int) async throws {
        try await Task.sleep(nanoseconds: simulatedDelayNanoseconds)

        guard let index = MockData.kitchenOrders.firstIndex(where: { $0.id == id }) else {
            throw MockData.notFoundError
        }

        MockData.kitchenOrders.remove(at: index)
        // Order left the kitchen queue.
        broadcastKitchen(SseKitchenCommand(orderId: id, command: .remove, order: nil))

        if let notReadyIndex = MockData.notReadyOrders.firstIndex(where: { $0.id == id }) {
            let moved = MockData.notReadyOrders.remove(at: notReadyIndex)
            MockData.readyOrders.append(moved)

            // Order moved out of "not ready" and into "ready".
            broadcastOrder(SseOrderCommand(orderId: id, command: .remove, order: nil))
            broadcastReady(SseReadyCommand(orderId: id, command: .add, order: moved))
        }
    }

    func removeOrder(id: Int) async {
        try? await Task.sleep(nanoseconds: simulatedDelayNanoseconds)

        MockData.fullOrders.removeAll { $0.id == id }

        let wasReady = MockData.readyOrders.contains { $0.id == id }
        let wasNotReady = MockData.notReadyOrders.contains { $0.id == id }

        MockData.readyOrders.removeAll { $0.id == id }
        MockData.notReadyOrders.removeAll { $0.id == id }
        MockData.kitchenOrders.removeAll { $0.id == id }

        // Only emit events for lists the order actually existed in, mirroring
        // a server that just no-ops on a missing id (per the OpenAPI spec).
        if wasReady {
            broadcastReady(SseReadyCommand(orderId: id, command: .remove, order: nil))
        }
        if wasNotReady {
            broadcastOrder(SseOrderCommand(orderId: id, command: .remove, order: nil))
        }
    }

    // MARK: - Cleanup

    deinit {
        orderSubscribers.values.forEach { $0.finish() }
        kitchenSubscribers.values.forEach { $0.finish() }
        readySubscribers.values.forEach { $0.finish() }
    }
}
