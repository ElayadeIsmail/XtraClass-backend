import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Days } from '@prisma/client';
import { Group } from '../groups/Group';
import { Sale } from '../sales/Sale';

// export enum Days {
//   Sunday,
//   Monday,
//   Tuesday,
//   Wednesday,
//   Thursday,
//   Friday,
//   Saturday,
// }

registerEnumType(Days, {
  name: 'Days',
});

@ObjectType()
export class CalendarSession {
  @Field(() => Int)
  id: number;
  @Field(() => Int)
  groupId: number;
  @Field(() => Group, { nullable: true })
  group?: Group;
  @Field(() => Days)
  day: Days;
  @Field()
  from: string;
  @Field()
  to: string;

  @Field(() => Int)
  saleId: number;

  @Field(() => Sale)
  sale: Sale;
}
