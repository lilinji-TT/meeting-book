import dayjs from "dayjs";
import request from "../http";
import { SearchBooking } from "../pages/BookingHistory/BookingHistory";
import { RegisterUser } from "../pages/Register/Register";
import { UserInfo } from "../pages/UpdateInfo/UpdateInfo";
import { UpdatePasswordProps } from "../pages/UpdatePassword/UpdatePassword";

export async function login(username: string, password: string) {
  const reponse = await request({
    url: "/user/login",
    method: "POST",
    data: { username, password },
  });

  return reponse;
}

export async function registerCaptcha(address: string) {
  const reponse = await request({
    url: "/user/register-captcha",
    method: "GET",
    params: {
      address,
    },
  });

  return reponse;
}

export async function register(registerUser: RegisterUser) {
  const reponse = await request({
    url: "/user/register",
    method: "POST",
    data: registerUser,
  });

  return reponse;
}

export async function updatePasswordCaptcha(email: string) {
  const reposne = await request({
    url: "/user/update_password/captcha",
    params: {
      email,
    },
  });

  return reposne;
}

export async function updatePassword(data: UpdatePasswordProps) {
  const response = await request({
    url: "/user/update_password",
    method: "POST",
    data,
  });

  return response;
}

export async function getUserInfo() {
  const reponse = await request({
    url: "/user/info",
    method: "GET",
  });

  return reponse;
}

export async function updateInfo(data: UserInfo) {
  const reponse = await request({
    url: "/user/update",
    method: "POST",
    data,
  });

  return reponse;
}

export async function updateUserInfoCaptcha() {
  const reponse = await request({
    url: "/user/update/captcha",
    method: "GET",
  });

  return reponse;
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
  const response = await request({
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
