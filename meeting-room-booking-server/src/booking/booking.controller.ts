import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { generateParseIntPipe } from 'src/utils/pipe';
import { BookingService } from './booking.service';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get('apply/:id')
  async apply(@Param('id') id: number) {
    return this.bookingService.apply(id);
  }

  @Get('reject/:id')
  async reject(@Param('id') id: number) {
    return this.bookingService.reject(id);
  }

  @Get('unbind/:id')
  async unbind(@Param('id') id: number) {
    return this.bookingService.unbind(id);
  }

  @Get('urge/:id')
  async urge(@Param('id') id: number) {
    return this.bookingService.urge(id);
  }

  @Get('list')
  async list(
    @Query('pageNo', new DefaultValuePipe(1), generateParseIntPipe('pageNo'))
    pageNo: number,
    @Query(
      'pageSize',
      new DefaultValuePipe(10),
      generateParseIntPipe('pageSize'),
    )
    pageSize: number,
    @Query('username') username: string,
    @Query('meetingRoomName') meetingRoomName: string,
    @Query('meetingRoomPosition') meetingRoomPosition: string,
    @Query(
      'bookingTimeRangeStart',
      new DefaultValuePipe(0),
      generateParseIntPipe('bookingTimeRangeStart'),
    )
    bookingTimeRangeStart: number,
    @Query(
      'bookingTimeRangeEnd',
      new DefaultValuePipe(0),
      generateParseIntPipe('bookingTimeRangeEnd'),
    )
    bookingTimeRangeEnd: number,
  ) {
    return this.bookingService.find(
      pageNo,
      pageSize,
      username,
      meetingRoomName,
      meetingRoomPosition,
      bookingTimeRangeStart,
      bookingTimeRangeEnd,
    );
  }
}
