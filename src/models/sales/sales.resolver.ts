import { Resolver } from '@nestjs/graphql';
import { SalesService } from './sales.service';

@Resolver()
export class SalesResolver {
  constructor(private readonly salesService: SalesService) {}
}
