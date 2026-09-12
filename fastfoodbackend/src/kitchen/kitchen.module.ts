import { Module } from '@nestjs/common';
import { KitchenService } from './kitchen.service';
import { KitchenController } from './kitchen.controller';
import { DataStorageModule } from 'src/data/dataStorage.module';
import { SseModule } from 'src/sse/sse.module';

@Module({
  imports: [DataStorageModule, SseModule],
  controllers: [KitchenController],
  providers: [KitchenService],
})
export class KitchenModule {}
