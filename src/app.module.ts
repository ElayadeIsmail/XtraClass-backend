import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { CoursesModule } from './models/courses/courses.module';
import { GradesModule } from './models/grades/grades.module';
import { GroupsModule } from './models/groups/groups.module';
import { InstructorsModule } from './models/instructors/instructors.module';
import { ParentsModule } from './models/parents/parents.module';
import { StudentsModule } from './models/students/students.module';
import { UsersModule } from './models/users/users.module';
import { PrismaService } from './services/prisma/prisma.service';

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
    GroupsModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
