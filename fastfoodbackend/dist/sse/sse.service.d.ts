import { MessageEvent } from '@nestjs/common';
import { ShortOrder } from "../types/shortOrder";
import { KitchenOrder } from "../types/kitchenOrder";
export declare class SseService {
    constructor();
    private _kitchenSse;
    private _ordersSse;
    private _readyOrdersSse;
    get kitchenSse(): import("rxjs").Observable<MessageEvent>;
    get ordersSse(): import("rxjs").Observable<MessageEvent>;
    get readyOrdersSse(): import("rxjs").Observable<MessageEvent>;
    removeOrder(id: number): void;
    addOrder(id: number, order: ShortOrder): void;
    addReadyOrder(id: number, order: ShortOrder): void;
    removeReadyOrder(id: number): void;
    addKitchenOrder(id: number, order: KitchenOrder): void;
    removeKitchenOrder(id: number): void;
}
