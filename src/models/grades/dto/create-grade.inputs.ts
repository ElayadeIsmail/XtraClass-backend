import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateGradeInputs {
  @Field()
  name: string;

  @Field(() => [GradeLevelsInput])
  levels: GradeLevelsInput[];
}

@InputType()
export class UpdateGradeInputs {
  @Field()
  name: string;

  @Field(() => Int)
  gradeId: number;
}

@InputType()
export class GradeLevelsInput {
  @Field()
  name: string;
}

@InputType()
export class CreateLevelInput {
  @Field()
  name: string;

  @Field(() => Int)
  gradeId: number;
}
@InputType()
export class updateLevelInput {
  @Field()
  name: string;

  @Field(() => Int)
  gradeId: number;
}
