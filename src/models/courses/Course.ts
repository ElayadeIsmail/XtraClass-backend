import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Grade } from '../grades/Grade';
import { Level } from '../grades/Level';
import { Specialization } from '../specializations/Specialization';
import { Subject } from '../subjects/Subject';

@ObjectType()
export class Count {
  @Field(() => Int, { nullable: true })
  groups: number;
  @Field(() => Int, { nullable: true })
  instructors: number;
  @Field(() => Int, { nullable: true })
  students: number;
}

@ObjectType()
export class Course {
  @Field(() => Int)
  id: number;
  @Field()
  name: string;
  @Field(() => Float)
  price: number;
  @Field(() => Int)
  gradeId: number;
  @Field(() => Int)
  levelId: number;
  @Field(() => Grade, { nullable: true })
  grade?: Grade;
  @Field(() => Level, { nullable: true })
  level?: Level;
  @Field(() => Count, { nullable: true })
  _count?: Count;
  @Field(() => Int)
  specializationId: number;
  @Field(() => Int)
  subjectId: number;
  @Field(() => Specialization, { nullable: true })
  specialization?: Specialization;
  @Field(() => Subject, { nullable: true })
  subject?: Subject;
}
