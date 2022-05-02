import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Sale } from './Sale';
import { SalesService } from './sales.service';

@Resolver()
export class SalesResolver {
  constructor(private readonly salesService: SalesService) {}

  @Query(() => Sale)
  sale(@Args('id', { type: () => Int }) id: number): Promise<Sale> {
    return this.salesService.findOne(id);
  }
  @Query(() => [Sale])
  sales(): Promise<Sale[]> {
    return this.salesService.find();
  }

  @Mutation(() => Sale)
  addSale(@Args('name') name: string): Promise<Sale> {
    return this.salesService.create(name);
  }
  @Mutation(() => Sale)
  updateSale(
    @Args('name') name: string,
    @Args('id') id: number,
  ): Promise<Sale> {
    return this.salesService.update(id, name);
  }
  @Mutation(() => Sale)
  deleteSale(@Args('id') id: number): Promise<Sale> {
    return this.salesService.delete(id);
  }
}
