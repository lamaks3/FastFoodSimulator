import { Controller, Sse } from '@nestjs/common';
import { SseService } from './sse.service';

@Controller('sse')
export class SseController {
  constructor(private readonly sseService: SseService) {}
  @Sse('/orders')
  ordersSse() {
    return this.sseService.ordersSse;
  }
  @Sse('/kitchen')
  kitchenSse() {
    return this.sseService.ordersSse;
  }
  @Sse('/ready')
  readySse() {
    return this.sseService.ordersSse;
  }
}
