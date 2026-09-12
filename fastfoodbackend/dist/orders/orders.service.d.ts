import { OrderDto } from './types/order.type';
import { CreateOrderDto } from './dto/createOrder.dto';
import { DataStorageService } from "../data/dataStorage.service";
import { SseService } from "../sse/sse.service";
import { FullOrder } from "../types/fullOrder";
export declare class OrdersService {
    private readonly dataStorageService;
    private readonly sseService;
    constructor(dataStorageService: DataStorageService, sseService: SseService);
    getOrders(): OrderDto;
    createOrder(order: CreateOrderDto): FullOrder;
    removeOrderFromReady(id: number): void;
}
