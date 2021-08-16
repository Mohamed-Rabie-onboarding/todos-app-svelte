import axios from "axios";
import { get } from "svelte/store";
import userStore from "../store/user";

const instance = axios.create({
  baseURL: "http://127.0.0.1:3200/api/v1",
});

instance.interceptors.request.use(function (config) {
  console.log("[Request]", config.data);

  const user = get(userStore);
  if (user) {
    config.headers.Authorization = `bearer ${user.token}`;
  }

  return config;
});

export default instance;
