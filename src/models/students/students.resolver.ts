import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateStudentInputs } from './dto/create-student.inputs';
import { StudentFilterInputs } from './dto/students-filter-inputs';
import { Student } from './Student';
import { StudentsService } from './students.service';
@Resolver()
export class StudentsResolver {
  constructor(private readonly studentsService: StudentsService) {}

  @Mutation(() => Student)
  addStudent(@Args('inputs') inputs: CreateStudentInputs): Promise<Student> {
    return this.studentsService.createStudent(inputs);
  }

  @Query(() => Student)
  student(@Args('id', { type: () => Int }) id: number): Promise<Student> {
    return this.studentsService.findOne(id);
  }
  @Query(() => [Student])
  students(@Args('args') args: StudentFilterInputs): Promise<Student[]> {
    return this.studentsService.find(args);
  }

  @Mutation(() => Student)
  deleteStudent(@Args('id', { type: () => Int }) id: number) {
    return this.studentsService.delete(id);
  }
}
