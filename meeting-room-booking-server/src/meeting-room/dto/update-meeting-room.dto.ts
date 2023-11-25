import { IsNotEmpty } from 'class-validator';
import { CreateMeetingRoomDto } from './create-meeting-room.dto';

export class UpdateMeetingRoomDto extends CreateMeetingRoomDto {
  @IsNotEmpty({
    message: 'id 不能为空',
  })
  id: number;
}
