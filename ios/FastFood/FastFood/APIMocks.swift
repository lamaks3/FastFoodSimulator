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

// MARK: - Service protocol

/// Conform a real network client to this later; the mock below is a drop-in
/// replacement so views/viewModels never need to change.
protocol OrderServiceProtocol {
    func createOrder(_ dto: CreateOrderDto) async throws -> FullOrder
    func getOrders() async throws -> Orders
    func getKitchenOrders() async throws -> [KitchenOrder]
    func cookOrder(id: Int) async throws
    func removeOrder(id: Int) async
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

    func createOrder(_ dto: CreateOrderDto) async throws -> FullOrder {
        try await Task.sleep(nanoseconds: simulatedDelayNanoseconds)

        guard !dto.dishes.isEmpty else {
            throw MockData.notFoundError
        }

        let order = FullOrder(id: nextId, customerName: dto.customerName, dishes: dto.dishes)
        nextId += 1

        MockData.fullOrders.append(order)
        MockData.notReadyOrders.append(ShortOrder(id: order.id, customerName: order.customerName))
        MockData.kitchenOrders.append(KitchenOrder(id: order.id, dishes: order.dishes))

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

        if let notReadyIndex = MockData.notReadyOrders.firstIndex(where: { $0.id == id }) {
            let moved = MockData.notReadyOrders.remove(at: notReadyIndex)
            MockData.readyOrders.append(moved)
        }
    }

    func removeOrder(id: Int) async {
        try? await Task.sleep(nanoseconds: simulatedDelayNanoseconds)

        MockData.fullOrders.removeAll { $0.id == id }
        MockData.readyOrders.removeAll { $0.id == id }
        MockData.notReadyOrders.removeAll { $0.id == id }
        MockData.kitchenOrders.removeAll { $0.id == id }
    }
}
