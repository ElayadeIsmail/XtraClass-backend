import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GradeCount {
  @Field(() => Int, { nullable: true })
  courses: number;
  @Field(() => Int, { nullable: true })
  students: number;
}

@ObjectType()
export class GradeLevels {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
}

@ObjectType()
export class Grade {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
  @Field({ nullable: true })
  _count?: GradeCount;

  @Field(() => [GradeLevels], { nullable: true })
  levels?: GradeLevels[];
}
