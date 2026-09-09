import { Module } from '@nestjs/common';
import { DataStorageService } from './dataStorage.service';

@Module({
  providers: [DataStorageService],
  exports: [DataStorageService],
})
export class DataStorageModule {}
