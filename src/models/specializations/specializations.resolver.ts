import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Specialization } from './Specialization';
import { SpecializationsService } from './specializations.service';

@Resolver()
export class SpecializationsResolver {
  constructor(
    private readonly specializationsService: SpecializationsService,
  ) {}

  @Mutation(() => Specialization)
  async createSpecialization(
    @Args('name') name: string,
  ): Promise<Specialization> {
    return this.specializationsService.create(name);
  }

  @Query(() => Specialization)
  async specialization(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Specialization> {
    return this.specializationsService.findOne(id);
  }
  @Query(() => [Specialization])
  async Specializations(): Promise<Specialization[]> {
    return this.specializationsService.find();
  }

  @Mutation(() => Specialization)
  async deleteSpecialization(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Specialization> {
    return this.specializationsService.delete(id);
  }
}
