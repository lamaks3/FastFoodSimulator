import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { KitchenModule } from './kitchen/kitchen.module';
import { SseModule } from './sse/sse.module';

@Module({
  imports: [OrdersModule, KitchenModule, SseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
