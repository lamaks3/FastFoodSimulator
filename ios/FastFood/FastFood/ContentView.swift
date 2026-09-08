//
//  ContentView.swift
//  FastFood
//
//  Created by Maksim Shyshko on 07.09.2026.
//

import SwiftUI

struct ContentView: View {

    let orderService: OrderServiceProtocol = MockOrderService()
    
    var body: some View {


//        TabView {
//            Tab("Sent", systemImage: "tray.and.arrow.up.fill") {
//                    OrdersView(orderService: orderService)
//                }
//
//                Tab("Account", systemImage: "person.crop.circle.fill") {
//                    KitchenView(orderService: orderService)
//            }
//        }

        OrdersView(orderService: orderService)
        KitchenView(orderService: orderService)
    }
}

#Preview {
    ContentView()
}
