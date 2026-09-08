//
//  CustomerView.swift
//  FastFood
//
//  Created by Maksim Shyshko on 08.09.2026.
//

import SwiftUI

struct Order: View {
    @State var selectedDishes: [String] = []
    var body: some View {
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
                    selectedDishes: $selectedDishes,
                    title: "Bundle 1",
                    components: ["Coke", "Pizza", "IceCream"]
                )
                BundelCard(
                    selectedDishes: $selectedDishes,
                    title: "Bundle 2",
                    components: ["Coke", "Pizza", "IceCream"]
                )
                BundelCard(
                    selectedDishes: $selectedDishes,
                    title: "Bundle 3",
                    components: ["Coke", "Pizza", "IceCream"]
                )
            }
        }
    }
}

struct BundelCard: View {
    @Binding var selectedDishes: [String]
    let title: String
    let components: [String]

    var body: some View {
        VStack {
            VStack(alignment: .center) {
                Text(title)
                    .font(.largeTitle)
                    .bold()
            }
            let dishesString = components.map { $0 }.joined(
                separator: "\n")
            VStack(alignment: .leading) {
                Text(dishesString)
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



#Preview {
    Order()
}
