import { OrderDto } from './dto/order.type';
import { ShortOrder } from './types/shortOrder';
import { CreateOrderDto } from './types/createOrder.dto';
import { DataStorageService } from "../data/dataStorage.service";
export declare class OrdersService {
    private readonly dataStorageService;
    constructor(dataStorageService: DataStorageService);
    getOrders(): Promise<OrderDto>;
    createOrder(order: CreateOrderDto): Promise<ShortOrder>;
    removeOrderFromReady(id: number): Promise<void>;
    private fullOrderToShortOrder;
}
