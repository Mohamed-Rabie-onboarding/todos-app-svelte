<script lang="ts">
  import { push } from "svelte-spa-router";
  import http from "../configs/http";

  const form = {
    username: "",
    email: "",
    password: "",
  };

  function register() {
    http
      .post("/user", form)
      .then(() => {
        push("/login");
      })
      .catch(({ response }) => {
        console.log(response.status, response.data);
      });
  }
</script>

<section class="register container">
  <h1>Register</h1>

  <form class="form" on:submit|preventDefault={register}>
    <div class="form__field">
      <input
        bind:value={form.username}
        type="text"
        minlength="3"
        placeholder="Username"
        required
      />
    </div>

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
    <button type="submit" class="btn"> Register </button>
  </form>
</section>

<style lang="scss">
  .register {
    max-width: 500px;
    margin: auto;
    margin-top: 10rem;
  }

  .btn {
    margin: auto;
  }
</style>
