import { DataStorageService } from "../data/dataStorage.service";
import { KitchenOrderDto } from './dto/kitchenOrder.dto';
import { SseService } from "../sse/sse.service";
export declare class KitchenService {
    private readonly dataStorageService;
    private readonly sseService;
    constructor(dataStorageService: DataStorageService, sseService: SseService);
    getKitchenOrders(): import("../types/kitchenOrder").KitchenOrder[];
    cookOrder({ id }: KitchenOrderDto): void;
}
