import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:3200/api/v1",
});

instance.interceptors.request.use(function (config) {
  console.log("[Request]", config.data);
  return config;
});

export default instance;
