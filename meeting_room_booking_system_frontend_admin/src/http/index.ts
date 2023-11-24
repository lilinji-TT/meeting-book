import { message } from "antd";
import axios, { AxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3005/",
  timeout: 3000,
});

instance.interceptors.request.use(function (config) {
  const accessToken = localStorage.getItem("access_token");

  if (accessToken) {
    config.headers.authorization = "Bearer " + accessToken;
  }
  return config;
});

interface PendingTask {
  config: AxiosRequestConfig;
  resolve: Function;
}
let refreshing = false;
const queue: PendingTask[] = [];

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (!error.response) {
      return Promise.reject(error);
    }

    let { data, config } = error.response;

    if (refreshing) {
      return new Promise((resolve) => {
        queue.push({
          config,
          resolve,
        });
      });
    }

    if (data.code === 401 && !config.url.includes("/user/refresh")) {
      refreshing = true;

      const res = await refreshToken();

      refreshing = false;

      if (res.status === 200) {
        queue.forEach(({ config, resolve }) => {
          resolve(instance(config));
        });

        return instance(config);
      } else {
        message.error(res.data);

        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      }
    } else {
      return error.response;
    }
  }
);

async function refreshToken() {
  const refresh_token = localStorage.getItem("refresh_token");
  if (!refresh_token) {
    return {
      status: 401,
      data: "token 已失效，请重新登录",
    };
  }

  const res = await instance.get("/user/refresh", {
    params: {
      refreshToken: refresh_token,
    },
  });

  const { data } = res.data;
  localStorage.setItem("access_token", data.access_token || "");
  localStorage.setItem("refresh_token", data.refresh_token || "");
  return res;
}

export default instance;
