"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fullOrderToKitchenOrder = fullOrderToKitchenOrder;
exports.fullOrdersToKitchenOrders = fullOrdersToKitchenOrders;
function fullOrderToKitchenOrder(order) {
    return {
        id: order.id,
        dishes: order.dishes,
    };
}
function fullOrdersToKitchenOrders(orders) {
    return orders.map((order) => fullOrderToKitchenOrder(order));
}
//# sourceMappingURL=fullOrderToKitchenOrder.js.map