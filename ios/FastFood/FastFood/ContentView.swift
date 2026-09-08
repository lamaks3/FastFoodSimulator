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
        OrdersView(orderService: orderService)
    }
}

#Preview {
    ContentView()
}
