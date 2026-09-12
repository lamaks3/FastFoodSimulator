import { FullOrder } from 'src/types/fullOrder';
import { KitchenOrder } from 'src/types/kitchenOrder';

export function fullOrderToKitchenOrder(order: FullOrder): KitchenOrder {
  return {
    id: order.id,
    dishes: order.dishes,
  };
}

export function fullOrdersToKitchenOrders(orders: FullOrder[]): KitchenOrder[] {
  return orders.map((order) => fullOrderToKitchenOrder(order));
}
