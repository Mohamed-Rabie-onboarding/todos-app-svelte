import type { RouteDefinition } from "svelte-spa-router";

// Pages
import Todos from "../pages/Todos.svelte";
import Login from "../pages/Login.svelte";
import Register from "../pages/Register.svelte";

const routes: RouteDefinition = {
  "/": Todos,
  "/login": Login,
  "/register": Register,
};

export default routes;
