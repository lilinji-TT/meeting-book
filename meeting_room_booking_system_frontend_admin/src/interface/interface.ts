import dayjs from "dayjs";
import HttpRequest from "../http";
import { SearchBooking } from "../pages/BookingManage/BookingManage";
import { UserInfo } from "../pages/InfoModify/InfoModify";
import { CreateMeetingRoom } from "../pages/MeetingRoomManage/CreateMeetingRoomModal";
import { UpdateMeetingRoom } from "../pages/MeetingRoomManage/UpdateMeetingRoom";
import { UpdatePassword } from "../pages/PasswordModify/PasswordModify";
export async function login(username: string, password: string) {
  const response = await HttpRequest({
    url: "/user/admin/login",
    method: "post",
    data: {
      username,
      password,
    },
  });

  return response;
}

export async function userSearch(
  username: string,
  nickName: string,
  email: string,
  pageNo: number,
  pageSize: number
) {
  const reponse = await HttpRequest({
    url: "/user/list",
    method: "GET",
    params: {
      username,
      nickName,
      email,
      pageNo,
      pageSize,
    },
  });
  return reponse;
}

export async function freeze(id: number) {
  const response = await HttpRequest({
    url: "/user/freeze",
    method: "GET",
    params: {
      id,
    },
  });
  return response;
}

export async function getUserInfo() {
  const response = await HttpRequest({
    url: "/user/info",
    method: "GET",
  });

  return response;
}

export async function updateInfo(data: UserInfo) {
  const response = await HttpRequest({
    url: "/user/admin/update",
    method: "POST",
    data,
  });
  return response;
}

export async function updateUserInfoCaptcha() {
  const response = await HttpRequest({
    url: "/user/update/captcha",
    method: "GET",
  });

  return response;
}

export async function updatePasswordCaptcha(email: string) {
  const response = await HttpRequest({
    url: "/user/update_password/captcha",
    method: "GET",
    params: {
      email,
    },
  });

  return response;
}

export async function updatePassword(data: UpdatePassword) {
  const response = await HttpRequest({
    url: "/user/update/captcha",
    method: "POST",
    data,
  });

  return response;
}

export async function meetingRoomList(
  name: string,
  capacity: number,
  equipment: string,
  pageNo: number,
  pageSize: number
) {
  const reponse = await HttpRequest({
    url: "/meeting-room/list",
    method: "GET",
    params: {
      name,
      capacity,
      equipment,
      pageNo,
      pageSize,
    },
  });

  return reponse;
}

export async function deleteMeetingRoom(id: number) {
  const response = await HttpRequest({
    url: `/meeting-room/${id}`,
    method: "DELETE",
  });

  return response;
}

export async function createMeetingRoom(meetingRoom: CreateMeetingRoom) {
  const response = await HttpRequest({
    url: "/meeting-room/create",
    method: "POST",
    data: meetingRoom,
  });

  return response;
}

export async function updateMeetingRoom(meetingRoom: UpdateMeetingRoom) {
  const response = await HttpRequest({
    url: "/meeting-room/update",
    method: "PUT",
    data: meetingRoom,
  });

  return response;
}

export async function findMeetingRoom(id: number) {
  const response = await HttpRequest({
    url: `/meeting-room/${id}`,
    method: "GET",
  });

  return response;
}

export async function bookingList(
  searchBooking: SearchBooking,
  pageNo: number,
  pageSize: number
) {
  let bookingTimeRangeStart;
  let bookingTimeRangeEnd;

  if (searchBooking.rangeStartDate && searchBooking.rangeStartTime) {
    const rangeStartDateStr = dayjs(searchBooking.rangeStartDate).format(
      "YYYY-MM-DD"
    );
    const rangeStartTimeStr = dayjs(searchBooking.rangeStartTime).format(
      "HH:mm"
    );
    bookingTimeRangeStart = dayjs(
      rangeStartDateStr + " " + rangeStartTimeStr
    ).valueOf();
  }

  if (searchBooking.rangeEndDate && searchBooking.rangeEndTime) {
    const rangeEndDateStr = dayjs(searchBooking.rangeEndDate).format(
      "YYYY-MM-DD"
    );
    const rangeEndTimeStr = dayjs(searchBooking.rangeEndTime).format("HH:mm");
    bookingTimeRangeEnd = dayjs(
      rangeEndDateStr + " " + rangeEndTimeStr
    ).valueOf();
  }

  const response = await HttpRequest({
    url: "/booking/list",
    method: "GET",
    params: {
      username: searchBooking.username,
      meetingRoomName: searchBooking.meetingRoomName,
      meetingRoomPosition: searchBooking.meetingRoomPosition,
      bookingTimeRangeStart,
      bookingTimeRangeEnd,
      pageNo: pageNo,
      pageSize: pageSize,
    },
  });

  return response;
}

export async function apply(id: number) {
  const reponse = await HttpRequest({
    url: "/booking/apply/" + id,
    method: "GET",
  });
  return reponse;
}

export async function reject(id: number) {
  const reponse = await HttpRequest({
    url: "/booking/reject/" + id,
    method: "GET",
  });
  return reponse;
}

export async function unbind(id: number) {
  const reponse = await HttpRequest({
    url: "/booking/unbind/" + id,
    method: "GET",
  });
  return reponse;
}
