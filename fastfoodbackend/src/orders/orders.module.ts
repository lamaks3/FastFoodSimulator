import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { DataStorageModule } from 'src/data/dataStorage.module';
import { SseModule } from 'src/sse/sse.module';

@Module({
  imports: [DataStorageModule, SseModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
