import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateGradeInputs {
  @Field()
  name: string;

  @Field(() => [GradeLevelsInput])
  levels: GradeLevelsInput[];
}

@InputType()
export class GradeLevelsInput {
  @Field()
  name: string;
}
