import { writable } from "svelte/store";

export interface IUser {
  id: number;
  username: string;
  picture: string;
  token: string;
}

function createUserStore() {
  const maybeUser = localStorage.getItem("user");
  const initUser = maybeUser ? JSON.parse(maybeUser) : null;

  const { subscribe, set } = writable<IUser | null>(initUser);

  function login(user: IUser) {
    localStorage.setItem("user", JSON.stringify(user));
    set(user);
  }

  function logout() {
    localStorage.removeItem("user");
    set(null);
  }

  return {
    subscribe,
    login,
    logout,
  };
}

export default createUserStore();
