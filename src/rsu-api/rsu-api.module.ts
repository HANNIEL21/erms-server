import { Module } from '@nestjs/common';
import { RsuApiService } from './rsu-api.service';

@Module({
  providers: [RsuApiService],
  exports: [RsuApiService],
})
export class RsuApiModule {}
