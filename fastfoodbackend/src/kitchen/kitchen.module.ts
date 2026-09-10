import { Module } from '@nestjs/common';
import { KitchenService } from './kitchen.service';
import { KitchenController } from './kitchen.controller';
import { DataStorageModule } from 'src/data/dataStorage.module';

@Module({
  imports: [DataStorageModule],
  controllers: [KitchenController],
  providers: [KitchenService],
})
export class KitchenModule {}
