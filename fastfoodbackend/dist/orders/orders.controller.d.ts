import { OrdersService } from './orders.service';
import { CreateOrderDto } from './types/createOrder.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    getOrders(): Promise<import("./dto/order.type").OrderDto>;
    createOrder(createOrderDto: CreateOrderDto): Promise<import("./types/shortOrder").ShortOrder>;
    removeOrderFromReady(id: number): Promise<void>;
}
