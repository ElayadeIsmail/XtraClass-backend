import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Group } from '../groups/Group';
import { Student } from '../students/Student';
import {
  addStudentsToGroup,
  addStudentToGroup,
} from './dtos/add-student-group';
import {
  changeStudentGroup,
  changeStudentsGroup,
} from './dtos/change-student-group-input';
import {
  RemoveStudentFromGroupInputs,
  RemoveStudentsFromGroupInputs,
} from './dtos/remove-students-group-inputs';
import { StudentsGroupsService } from './students-groups.service';

@Resolver()
export class StudentsGroupsResolver {
  constructor(private readonly studentsGroupsService: StudentsGroupsService) {}

  @Mutation(() => Student)
  addStudentToGroup(
    @Args('inputs') inputs: addStudentToGroup,
  ): Promise<Student> {
    return this.studentsGroupsService.addStudentToGroup(inputs);
  }
  @Mutation(() => Group)
  addStudentsToGroup(
    @Args('inputs') inputs: addStudentsToGroup,
  ): Promise<Group> {
    return this.studentsGroupsService.addStudentsToGroup(inputs);
  }
  @Mutation(() => Student)
  changeStudentGroup(
    @Args('inputs') inputs: changeStudentGroup,
  ): Promise<Student> {
    return this.studentsGroupsService.changeStudentGroup(inputs);
  }
  @Mutation(() => Group)
  changeStudentsGroup(
    @Args('inputs') inputs: changeStudentsGroup,
  ): Promise<Group> {
    return this.studentsGroupsService.changeStudentsGroup(inputs);
  }
  @Mutation(() => Student)
  removeStudentFromGroup(
    @Args('inputs') inputs: RemoveStudentFromGroupInputs,
  ): Promise<Student> {
    return this.studentsGroupsService.removeStudentFromGroup(inputs);
  }
  @Mutation(() => Group)
  removeStudentsFromGroup(
    @Args('inputs') inputs: RemoveStudentsFromGroupInputs,
  ): Promise<Group> {
    return this.studentsGroupsService.removeStudentsFromGroup(inputs);
  }
}
