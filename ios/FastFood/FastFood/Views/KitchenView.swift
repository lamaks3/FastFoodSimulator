//
//  KitchenView.swift
//  FastFood
//
//  Created by Maksim Shyshko on 08.09.2026.
//

import SwiftUI

struct KitchenView: View {

    let orderService: OrderServiceProtocol

    @State private var kitchenOrders: [KitchenOrder] = []

    var body: some View {
        VStack {
            HStack {
                Text("Orders:")
                    .font(.largeTitle)
                    .bold()
                    .padding()
                Spacer()
            }
            KitchenOrdersList(orderService: orderService, kitchenOrders: $kitchenOrders)
            Spacer()
        }
        .task {
            // Initial snapshot, then live updates via SSE — no more polling.
            await loadOrders()
            await observeKitchenEvents()
        }
    }

    private func loadOrders() async {
        do {
            let fetchedOrders = try await orderService.getKitchenOrders()
            kitchenOrders = fetchedOrders
        } catch {
            print("Ошибка при загрузке заказов: \(error)")
        }
    }

    private func observeKitchenEvents() async {
        for await event in orderService.kitchenEvents() {
            await MainActor.run {
                withAnimation {
                    switch event.command {
                    case .add:
                        if let order = event.order,
                           !kitchenOrders.contains(where: { $0.id == order.id }) {
                            kitchenOrders.append(order)
                        }
                    case .remove:
                        kitchenOrders.removeAll { $0.id == event.orderId }
                    }
                }
            }
        }
    }
}

struct KitchenOrdersList: View {
    let orderService: OrderServiceProtocol
    @Binding var kitchenOrders: [KitchenOrder]

    var body: some View {
        ScrollView {
            ForEach(kitchenOrders, id: \.id) { order in
                HStack {
                    Text(String(order.id))
                        .font(.largeTitle)
                        .bold()
                    Spacer()
                    let dishesString = order.dishes.map { $0 }.joined(separator: ", ")
                    Text(dishesString)
                        .font(.largeTitle)
                        .bold()
                    Spacer()
                    DoneButton(orderService: orderService, kitchenOrder: order) {
                        withAnimation {
                            kitchenOrders.removeAll { $0.id == order.id }
                        }
                    }
                }
                .padding()
                .background(
                    RoundedRectangle(cornerRadius: 25)
                        .foregroundStyle(.gray.opacity(0.45))
                )
            }
        }
        .padding()
    }
}

struct DoneButton: View {
    let orderService: OrderServiceProtocol
    let kitchenOrder: KitchenOrder
    var onFinish: () -> Void

    @State private var didError = false

    var body: some View {
        Button(action: { didError = true }) {
            Image(systemName: "checkmark")
                .font(.largeTitle)
                .foregroundStyle(.white)
                .bold()
                .padding()
        }
        .background(
            RoundedRectangle(cornerRadius: 15)
                .foregroundStyle(.green)
        )
        .alert( "Are you sure to finish this order?",
            isPresented: $didError,
            presenting: ""
        ) { details in
            Button(role: .cancel) {
                // Handle the deletion.
            } label: {
                Text("Cancel")
            }
            Button() {
                Task {
                    do {
                        try await orderService.cookOrder(id: kitchenOrder.id)

                        // The SSE `kitchen` stream will also emit a "remove"
                        // event for this order, but we still update locally
                        // right away for a snappier UI; the later SSE event
                        // will be a harmless no-op since the id is already gone.
                        await MainActor.run {
                            onFinish()
                        }

                    } catch {
                        print("Ошибка при обработке заказа: \(error)")
                    }
                }
            } label: {
                Text("Funish")
            }

        }
    }
}

#Preview {
    KitchenView(orderService: MockOrderService())
}
