import { Module } from '@nestjs/common';
import { SpecializationsService } from './specializations.service';
import { SpecializationsResolver } from './specializations.resolver';

@Module({
  providers: [SpecializationsResolver, SpecializationsService]
})
export class SpecializationsModule {}
