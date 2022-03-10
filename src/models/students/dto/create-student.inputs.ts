import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateStudentInputs {
  @Field()
  username: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field({ nullable: true })
  photo?: string;

  @Field()
  phone: string;

  @Field(() => Date)
  birthDate: Date;

  @Field()
  address: string;

  @Field({ nullable: true })
  cin?: string;
}
