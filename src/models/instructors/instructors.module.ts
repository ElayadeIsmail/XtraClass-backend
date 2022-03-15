import { Module } from '@nestjs/common';
import { InstructorsService } from './instructors.service';
import { InstructorsResolver } from './instructors.resolver';

@Module({
  providers: [InstructorsResolver, InstructorsService]
})
export class InstructorsModule {}
