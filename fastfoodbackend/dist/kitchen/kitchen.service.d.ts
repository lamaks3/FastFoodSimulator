import { DataStorageService } from "../data/dataStorage.service";
import { KitchenOrderDto } from './dto/kitchenOrder.dto';
export declare class KitchenService {
    private readonly dataStorageService;
    constructor(dataStorageService: DataStorageService);
    getKitchenOrders(): KitchenOrderDto[];
    cookOrder({ id }: KitchenOrderDto): void;
    private fullOrdersToKitchenOrders;
}
