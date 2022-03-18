import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsResolver } from './subjects.resolver';

@Module({
  providers: [SubjectsResolver, SubjectsService]
})
export class SubjectsModule {}
