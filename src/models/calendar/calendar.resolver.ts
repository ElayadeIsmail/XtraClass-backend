import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CalendarService } from './calendar.service';
import { CalendarSession } from './CalendarSession';
import { CreateCalendarSession } from './dto/create-calendar-inputs';
import { UpdateCalendarSession } from './dto/update-calendar-session';

@Resolver()
export class CalendarResolver {
  constructor(private readonly calendarService: CalendarService) {}

  @Query(() => [CalendarSession])
  calendar() {
    return this.calendarService.find();
  }
  @Mutation(() => [CalendarSession])
  addCalendar(
    @Args('inputs', { type: () => [CreateCalendarSession] })
    inputs: CreateCalendarSession[],
  ) {
    return this.calendarService.create(inputs);
  }
  @Mutation(() => [CalendarSession])
  addGroupSession(
    @Args('inputs', { type: () => CreateCalendarSession })
    inputs: CreateCalendarSession,
  ) {
    return this.calendarService.createOne(inputs);
  }

  @Mutation(() => CalendarSession)
  updateGroupSession(
    @Args('sessionId')
    id: number,
    @Args('inputs')
    inputs: UpdateCalendarSession,
  ) {
    return this.calendarService.update(id, inputs);
  }
  @Mutation(() => CalendarSession)
  removeGroupSession(
    @Args('sessionId')
    id: number,
  ) {
    return this.calendarService.remove(id);
  }
}
