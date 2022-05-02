import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Instructor } from 'src/models/instructors/Instructor';
import { Staff } from 'src/models/staff/Staff';

@ObjectType()
export class OutgoingPayments {
  @Field(() => Int)
  id: number;
  @Field()
  amount: number;
  @Field(() => Int)
  instructorId: number;
  @Field(() => Instructor, { nullable: true })
  instructor?: Instructor;
  @Field(() => Int)
  staffId: number;
  @Field(() => Staff, { nullable: true })
  staff?: Staff;
  @Field(() => Int)
  year: number;
  @Field(() => Int)
  month: number;
  @Field()
  payedAt: Date;
}
