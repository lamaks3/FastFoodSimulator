//
//  OrdersView.swift
//  FastFood
//
//  Created by Maksim Shyshko on 08.09.2026.
//

import Foundation
import SwiftUI
import Combine

struct OrdersView: View {

    let orderService: OrderServiceProtocol

    @State private var readyOrders: [ShortOrder] = []
    @State private var inProgressOrders: [ShortOrder] = []

    var body: some View {
        HStack {
            VStack {
                VStack {
                    Title(title: "Ready orders")
                    OrdersList(orderService: orderService, isReadyOrdersView: true , orders: $readyOrders)
                }
                .padding([.leading, .trailing])
                Spacer()
            }
            .background(
                Rectangle()
                    .foregroundStyle(.black.opacity(0.4))
            )

            VStack {
                VStack {
                    Title(title: "In progress")
                    OrdersList(
                        orderService: orderService,
                        isReadyOrdersView: false ,
                        orders: $inProgressOrders
                    )

                }
                .padding([.leading, .trailing])
                Spacer()

            }
            .background(
                Rectangle()
                    .foregroundStyle(.black.opacity(0.2))
            )
        }
        .ignoresSafeArea()
        .task {
            // Initial snapshot, then live updates via SSE — no more polling.
            await loadOrders()
            async let notReadyTask: Void = observeNotReadyEvents()
            async let readyTask: Void = observeReadyEvents()
            _ = await (notReadyTask, readyTask)
        }
    }

    private func loadOrders() async {
        do {
            let fetchedOrders = try await orderService.getOrders()
            withAnimation(.easeInOut) {
                readyOrders = fetchedOrders.ready
                inProgressOrders = fetchedOrders.notReady
            }
        } catch {
            print("Ошибка при загрузке заказов: \(error)")
        }
    }

    /// Listens to /sse/orders — changes to the "not ready" list.
    private func observeNotReadyEvents() async {
        for await event in orderService.ordersEvents() {
            await MainActor.run {
                withAnimation(.easeInOut) {
                    switch event.command {
                    case .add:
                        if let order = event.order,
                           !inProgressOrders.contains(where: { $0.id == order.id }) {
                            inProgressOrders.append(order)
                        }
                    case .remove:
                        inProgressOrders.removeAll { $0.id == event.orderId }
                    }
                }
            }
        }
    }

    /// Listens to /sse/ready — changes to the "ready" list.
    private func observeReadyEvents() async {
        for await event in orderService.readyEvents() {
            await MainActor.run {
                withAnimation(.easeInOut) {
                    switch event.command {
                    case .add:
                        if let order = event.order,
                           !readyOrders.contains(where: { $0.id == order.id }) {
                            readyOrders.append(order)
                        }
                    case .remove:
                        readyOrders.removeAll { $0.id == event.orderId }
                    }
                }
            }
        }
    }
}

struct Title: View {
    let title: String

    var body: some View {
        HStack {
            Spacer()
            Text(title)
                .font(.largeTitle)
                .bold()
            Spacer()
        }
        .padding()
    }
}

struct OrdersList: View {
    let orderService: OrderServiceProtocol
    let isReadyOrdersView: Bool
    @Binding var orders: [ShortOrder]

    var body: some View {
        ForEach(orders, id: \.id) { order in
            Button() {
                if isReadyOrdersView {
                    Task {
                        // removeOrder never throws (per the OpenAPI spec it
                        // always succeeds, even for a missing id), so no
                        // do/try/catch is needed here. The SSE `ready` stream
                        // will also emit the "remove" event, which is a
                        // harmless no-op once we've already removed it locally.
                        await orderService.removeOrder(id: order.id)
                    }
                }
            } label: {
                HStack {
                    Text(String(order.id))
                        .font(.largeTitle)
                        .bold()
                        .padding([.top, .leading, .trailing])
                    Spacer()
                    Text(order.customerName)
                        .font(.largeTitle)
                        .bold()
                        .padding([.top, .leading, .trailing])
                }
            }
        }
    }
}

#Preview {
    OrdersView(orderService: MockOrderService())
}
