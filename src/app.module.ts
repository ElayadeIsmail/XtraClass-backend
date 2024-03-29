import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { CalendarModule } from './models/calendar/calendar.module';
import { CoursesModule } from './models/courses/courses.module';
import { GradesModule } from './models/grades/grades.module';
import { GroupsModule } from './models/groups/groups.module';
import { InstructorsCoursesModule } from './models/instructors-courses/instructors-courses.module';
import { InstructorsGroupsModule } from './models/instructors-groups/instructors-groups.module';
import { InstructorsModule } from './models/instructors/instructors.module';
import { ParentsModule } from './models/parents/parents.module';
import { PaymentsModule } from './models/payments/payments.module';
import { SalesModule } from './models/sales/sales.module';
import { SpecializationsModule } from './models/specializations/specializations.module';
import { StaffModule } from './models/staff/staff.module';
import { StudentsCoursesModule } from './models/students-courses/students-courses.module';
import { StudentsGroupsModule } from './models/students-groups/students-groups.module';
import { StudentsModule } from './models/students/students.module';
import { SubjectsModule } from './models/subjects/subjects.module';
import { UsersModule } from './models/users/users.module';

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
    StudentsGroupsModule,
    StudentsCoursesModule,
    InstructorsGroupsModule,
    InstructorsCoursesModule,
    SpecializationsModule,
    SubjectsModule,
    StaffModule,
    CalendarModule,
    PaymentsModule,
    SalesModule,
  ],
})
export class AppModule {}
