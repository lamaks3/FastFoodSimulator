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
            while !Task.isCancelled {
                await loadOrders()
                try? await Task.sleep(nanoseconds: 3_000_000_000)
            }
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
                        do {
                            try await orderService.removeOrder(id: order.id)
                        } catch {
                            print("Error to delete order")
                        }
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
