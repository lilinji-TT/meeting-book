import HttpRequest from "../http";
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
