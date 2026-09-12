import { FullOrder } from "../types/fullOrder";
import { ShortOrder } from "../types/shortOrder";
export declare function fullOrderToShortOrder(order: FullOrder): ShortOrder;
export declare function fullOrdersToShortOrders(orders: FullOrder[]): ShortOrder[];
