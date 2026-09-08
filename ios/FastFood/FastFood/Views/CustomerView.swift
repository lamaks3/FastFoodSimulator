//
//  CustomerView.swift
//  FastFood
//
//  Created by Maksim Shyshko on 08.09.2026.
//

import SwiftUI

struct Order: View {
    @State var selectedDishes: [String] = []
    @State var customerName: String = ""
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
                        customerName: $customerName,
                        selectedDishes: $selectedDishes,
                        title: "Bundle 1",
                        components: ["Coke", "Pizza", "IceCream"]
                    )
                    BundelCard(
                        customerName: $customerName,
                        selectedDishes: $selectedDishes,
                        title: "Bundle 2",
                        components: ["Coke", "Pizza", "IceCream"]
                    )
                    BundelCard(
                        customerName: $customerName,
                        selectedDishes: $selectedDishes,
                        title: "Bundle 3",
                        components: ["Coke", "Pizza", "IceCream"]
                    )
                }
            }
        }
    }
}

struct BundelCard: View {
    @Binding var customerName: String
    @Binding var selectedDishes: [String]
    let title: String
    let components: [String]

    var body: some View {
        NavigationLink {
            InputNameForm(name: $customerName)
        } label: {
            VStack {
                VStack(alignment: .center) {
                    Text(title)
                        .foregroundStyle(Color.primary)
                        .font(.largeTitle)
                        .bold()
                }
                let dishesString = components.map { $0 }.joined(
                    separator: "\n")
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
    @Binding var name: String
    var body: some View {
        VStack {
            HStack {
                Text("What is your name?")
                    .font(.largeTitle)
                    .bold()
                    .padding()
                Spacer()
            }
            TextField("", text: $name)
                .textFieldStyle(.roundedBorder)
                                .padding()
            NavigationLink {

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
        }
    }
}


#Preview {
    Order()
}
