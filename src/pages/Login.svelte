<script lang="ts">
  import http from "../configs/http";
  import userStore from "../store/user";
  import type { IUser } from "../store/user";
  import { push } from "svelte-spa-router";

  const form = {
    email: "",
    password: "",
  };

  function login() {
    console.log("ere?");

    http
      .post<IUser>("/user/authenticate", form)
      .then(({ data }) => {
        userStore.login(data);
        push("/");
      })
      .catch(({ response }) => {
        console.log(response.status, response.data);
      });
  }
</script>

<section class="login container">
  <h1>Login</h1>

  <form class="form" on:submit|preventDefault={login}>
    <div class="form__field">
      <div class="form__field">
        <input
          bind:value={form.email}
          type="email"
          placeholder="Email address"
          required
        />
      </div>

      <div class="form__field">
        <input
          bind:value={form.password}
          type="password"
          minlength="6"
          placeholder="Password"
          required
        />
      </div>
      <button type="submit" class="btn"> Login </button>
    </div>
  </form>
</section>

<style lang="scss">
  .login {
    max-width: 500px;
    margin: auto;
    margin-top: 10rem;
  }

  .btn {
    margin: auto;
  }
</style>
