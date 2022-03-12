import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateStudentInputs } from './dto/create-student.inputs';
import { Student } from './Student';
import { StudentsService } from './students.service';
@Resolver()
export class StudentsResolver {
  constructor(private readonly studentsService: StudentsService) {}

  @Mutation(() => Student)
  async createStudent(
    @Args('inputs') inputs: CreateStudentInputs,
  ): Promise<Student> {
    return this.studentsService.createStudent(inputs);
  }
}
