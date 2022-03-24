import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Subject } from './Subject';
import { SubjectsService } from './subjects.service';

@Resolver()
export class SubjectsResolver {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Mutation(() => Subject)
  async createSubject(@Args('name') name: string): Promise<Subject> {
    return this.subjectsService.create(name);
  }

  @Query(() => Subject)
  async findOneSubject(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Subject> {
    return this.subjectsService.findOne(id);
  }
  @Query(() => [Subject])
  async findManySubject(): Promise<Subject[]> {
    return this.subjectsService.find();
  }

  @Mutation(() => Subject)
  async deleteSubject(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Subject> {
    return this.subjectsService.delete(id);
  }
}
