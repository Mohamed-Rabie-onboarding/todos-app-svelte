import axios from "axios";
import { get } from "svelte/store";
import userStore from "../store/user";

const instance = axios.create({
  baseURL: "http://127.0.0.1:3200/api/v1",
});

instance.interceptors.request.use(function (config) {
  console.log("[Request]", config.data);

  config.headers.Authorization = `bearer ${get(userStore).token}`;
  return config;
});

export default instance;
