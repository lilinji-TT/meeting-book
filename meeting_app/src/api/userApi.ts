import request from "../http";
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
