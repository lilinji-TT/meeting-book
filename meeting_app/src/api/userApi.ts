import request from "../http";
import { RegisterUser } from "../pages/Register/Register";

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
