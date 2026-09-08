//
//  CustomerView.swift
//  FastFood
//
//  Created by Maksim Shyshko on 08.09.2026.
//

import SwiftUI

struct CustomerView: View {
    let orderService: OrderServiceProtocol

    var body: some View {
        NavigationStack {
            VStack {
                HStack {
                    Text("Hello 👋🏻\nWhat do you want to order?")
                        .font(.largeTitle)
                        .bold()
                        .padding()
                    Spacer()
                }
                HStack {
                    BundelCard(
                        orderService: orderService,
                        title: "Bundle 1",
                        components: ["Coke", "Pizza", "IceCream"]
                    )
                    BundelCard(
                        orderService: orderService,
                        title: "Bundle 2",
                        components: ["Coke", "Pizza", "IceCream"]
                    )
                    BundelCard(
                        orderService: orderService,
                        title: "Bundle 3",
                        components: ["Coke", "Pizza", "IceCream"]
                    )
                }
            }
        }
    }
}

struct BundelCard: View {
    let orderService: OrderServiceProtocol

    let title: String
    let components: [String]

    var body: some View {
        NavigationLink {
            InputNameForm(orderService: orderService, dishes: components)
        } label: {
            VStack {
                VStack(alignment: .center) {
                    Text(title)
                        .foregroundStyle(Color.primary)
                        .font(.largeTitle)
                        .bold()
                }
                let dishesString = components.joined(separator: "\n")
                VStack(alignment: .leading) {
                    Text(dishesString)
                        .foregroundStyle(Color.primary)
                        .font(.largeTitle)
                }
            }
            .padding()
            .background(
                RoundedRectangle(cornerRadius: 25)
                    .foregroundStyle(.black.opacity(0.15))
            )
        }
    }
}

struct InputNameForm: View {
    let orderService: OrderServiceProtocol
    let dishes: [String]

    @State private var name: String = ""

    @State private var showingSuccessAlert = false
    @State private var createdOrderId: Int? = nil

    @Environment(\.dismiss) private var dismiss

    var body: some View {
        VStack {
            HStack {
                Text("What is your name?")
                    .font(.largeTitle)
                    .bold()
                    .padding()
                Spacer()
            }

            TextField("Enter your name", text: $name)
                .textFieldStyle(.roundedBorder)
                .padding()

            Button {
                Task {
                    do {
                        let order = try await orderService.createOrder(
                            CreateOrderDto(customerName: name, dishes: dishes)
                        )
                        createdOrderId = order.id
                        showingSuccessAlert = true
                    } catch {
                        print("Error: \(error)")
                    }
                }
            } label: {
                Text("Place order")
                    .font(.largeTitle)
                    .foregroundStyle(.white)
                    .padding()
                    .background(
                        RoundedRectangle(cornerRadius: 25)
                            .foregroundStyle(.black)
                    )
            }
            .disabled(name.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty)
        }
        .alert("Заказ успешно оформлен!", isPresented: $showingSuccessAlert) {
            Button("ОК") {
                dismiss()
            }
        } message: {
            if let orderId = createdOrderId {
                Text("Номер вашего заказа: \(orderId)")
            }
        }
    }
}

#Preview {
    CustomerView(orderService: MockOrderService())
}
