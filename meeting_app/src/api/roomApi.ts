import dayjs from "dayjs";
import request from "../http";
import { CreateBooking } from "../pages/MeetingRoomList/CreateBookingModal";

export async function searchMeetingRoomList(
  name: string,
  capacity: number,
  equipment: string,
  pageNo: number,
  pageSize: number
) {
  const response = await request({
    url: "meeting-room/list",
    params: {
      name,
      capacity,
      equipment,
      pageNo,
      pageSize,
    },
  });

  return response;
}

export async function unbind(id: number) {
  const response = await request({
    url: `/booking/unbind/${id}`,
    method: "POST",
  });

  return response;
}

export async function bookingAdd(booking: CreateBooking) {
  const rangeStartDateStr = dayjs(booking.rangeStartDate).format("YYYY-MM-DD");
  const rangeStartTimeStr = dayjs(booking.rangeStartTime).format("HH:mm");
  const startTime = dayjs(
    rangeStartDateStr + " " + rangeStartTimeStr
  ).valueOf();

  const rangeEndDateStr = dayjs(booking.rangeEndDate).format("YYYY-MM-DD");
  const rangeEndTimeStr = dayjs(booking.rangeEndTime).format("HH:mm");
  const endTime = dayjs(rangeEndDateStr + " " + rangeEndTimeStr).valueOf();

  const response = await request({
    url: "/booking/add",
    method: "POST",
    data: {
      meetingRoomId: booking.meetingRoomId,
      startTime,
      endTime,
      note: booking.note,
    },
  });
  
  return response;
}
