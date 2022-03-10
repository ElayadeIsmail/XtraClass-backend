import { Query, Resolver } from '@nestjs/graphql';
import { generatePassword } from '../../helpers/generate-password';
import { UsersService } from './users.service';
@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => String)
  hello() {
    return generatePassword();
  }
}
