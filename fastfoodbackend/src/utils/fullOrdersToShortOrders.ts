import { FullOrder } from 'src/types/fullOrder';
import { ShortOrder } from 'src/types/shortOrder';

export function fullOrderToShortOrder(order: FullOrder): ShortOrder {
  return {
    id: order.id,
    customerName: order.customerName,
  };
}

export function fullOrdersToShortOrders(orders: FullOrder[]): ShortOrder[] {
  return orders.map((order) => fullOrderToShortOrder(order));
}
