import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { DataStorageModule } from 'src/data/dataStorage.module';

@Module({
  imports: [DataStorageModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
