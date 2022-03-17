import { Query, Resolver } from '@nestjs/graphql';
import { PasswordManager } from 'src/services/password.service';
import { UsersService } from './users.service';
@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => String)
  hello() {
    return PasswordManager.generatePassword();
  }
}
