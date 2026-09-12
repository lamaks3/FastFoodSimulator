import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { KitchenModule } from './kitchen/kitchen.module';
import { SseModule } from './sse/sse.module';

@Module({
  imports: [OrdersModule, KitchenModule, SseModule],
})
export class AppModule {}
