import { OrderStorage } from './types/orderStorage.type';
import { FullOrder } from "../types/fullOrder";
export declare class DataStorageService {
    constructor();
    private orders;
    private maxId;
    getOrders(): OrderStorage;
    addOrder(customerName: string, dishes: string[]): FullOrder;
}
