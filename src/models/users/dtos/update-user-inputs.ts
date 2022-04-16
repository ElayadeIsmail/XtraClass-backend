import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInputs {
  @Field({ nullable: true })
  photo?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  address?: string;
}
