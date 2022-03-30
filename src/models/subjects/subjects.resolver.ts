import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Subject } from './Subject';
import { SubjectsService } from './subjects.service';

@Resolver()
export class SubjectsResolver {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Mutation(() => Subject)
  async addSubject(@Args('name') name: string): Promise<Subject> {
    return this.subjectsService.create(name);
  }

  @Query(() => Subject)
  subject(@Args('id', { type: () => Int }) id: number): Promise<Subject> {
    return this.subjectsService.findOne(id);
  }
  @Query(() => [Subject])
  subjects(): Promise<Subject[]> {
    return this.subjectsService.find();
  }

  @Mutation(() => Subject)
  async deleteSubject(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Subject> {
    return this.subjectsService.delete(id);
  }
}
