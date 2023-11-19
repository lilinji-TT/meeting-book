import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3005/",
  timeout: 3000,
});

instance.interceptors.request.use(
  (config) => {
    // config.headers["Authorization"] = "Bearer yourToken";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return error.response;
  }
);
export default instance;
