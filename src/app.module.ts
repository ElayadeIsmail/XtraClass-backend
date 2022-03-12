import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { GradesModule } from './models/grades/grades.module';
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
  ],
  providers: [PrismaService],
})
export class AppModule {}
