import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/createOrder.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    getOrders(): Promise<import("./types/order.type").OrderDto>;
    createOrder(createOrderDto: CreateOrderDto): Promise<import("../types/fullOrder").FullOrder>;
    removeOrderFromReady(id: number): Promise<void>;
}
