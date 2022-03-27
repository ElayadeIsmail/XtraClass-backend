import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
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

  @Query(() => Student)
  findOneStudent(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Student> {
    return this.studentsService.findOne(id);
  }
  @Query(() => [Student])
  findStudents(): Promise<Student[]> {
    return this.studentsService.find();
  }

  @Mutation(() => Student)
  deleteStudent(@Args('id', { type: () => Int }) id: number) {
    return this.studentsService.delete(id);
  }
}
