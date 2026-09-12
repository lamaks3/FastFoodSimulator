import { Global, Module } from '@nestjs/common';
import { DataStorageService } from './dataStorage.service';

@Global()
@Module({
  providers: [DataStorageService],
  exports: [DataStorageService],
})
export class DataStorageModule {}
