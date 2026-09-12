"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fullOrderToShortOrder = fullOrderToShortOrder;
exports.fullOrdersToShortOrders = fullOrdersToShortOrders;
function fullOrderToShortOrder(order) {
    return {
        id: order.id,
        customerName: order.customerName,
    };
}
function fullOrdersToShortOrders(orders) {
    return orders.map((order) => fullOrderToShortOrder(order));
}
//# sourceMappingURL=fullOrdersToShortOrders.js.map