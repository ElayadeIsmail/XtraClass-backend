import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { CoursesModule } from './models/courses/courses.module';
import { GradesModule } from './models/grades/grades.module';
import { ParentsModule } from './models/parents/parents.module';
import { StudentsModule } from './models/students/students.module';
import { UsersModule } from './models/users/users.module';
import { PrismaService } from './services/prisma/prisma.service';
import { InstructorsModule } from './instructors/instructors.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    UsersModule,
    StudentsModule,
    GradesModule,
    ParentsModule,
    CoursesModule,
    InstructorsModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
