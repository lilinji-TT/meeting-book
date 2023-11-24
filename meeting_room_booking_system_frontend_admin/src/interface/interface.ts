import HttpRequest from "../http";

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
    method: "get",
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
  const response = await HttpRequest("/user/freeze", {
    params: {
      id,
    },
  });
  return response;
}
