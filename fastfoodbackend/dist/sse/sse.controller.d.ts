import { SseService } from './sse.service';
export declare class SseController {
    private readonly sseService;
    constructor(sseService: SseService);
    ordersSse(): import("rxjs").Observable<import("@nestjs/common").MessageEvent>;
    kitchenSse(): import("rxjs").Observable<import("@nestjs/common").MessageEvent>;
    readySse(): import("rxjs").Observable<import("@nestjs/common").MessageEvent>;
}
