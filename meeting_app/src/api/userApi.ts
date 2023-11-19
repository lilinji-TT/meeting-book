import request from "../http";

export async function login(username: string, password: string) {
  const reponse = await request({
    url: "/user/login",
    method: "POST",
    data: { username, password },
  });

  return reponse;
}
