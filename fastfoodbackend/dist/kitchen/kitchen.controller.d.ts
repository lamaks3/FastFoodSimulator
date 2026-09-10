import { KitchenService } from './kitchen.service';
import { KitchenOrderDto } from './dto/kitchenOrder.dto';
export declare class KitchenController {
    private readonly kitchenService;
    constructor(kitchenService: KitchenService);
    getKitchenOrders(): KitchenOrderDto[];
    moveOrderToReady(kitchenOrder: KitchenOrderDto): void;
}
