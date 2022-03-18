import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateCourseInputs {
  @Field()
  name?: string;
  @Field(() => Int)
  price?: number;
  @Field()
  updatePriceForStudent?: boolean;
}
