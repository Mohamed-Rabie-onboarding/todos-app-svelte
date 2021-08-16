<script lang="ts">
  import active from "svelte-spa-router/active";
  import userStore from "../store/user";
</script>

<nav class="navbar container">
  <div class="navbar__logo">
    <img src="/assets/logo.svg" alt="logo" />
  </div>
  <div class="spacer" />
  <!-- prettier-ignore -->
  <div class="navbar__links">
    <a href="/#/" use:active={{ path: "/", className: "active" }} class="active"> Todos </a>
    <a href="/#/login" use:active={{ path: "/login", className: "active" }} > Login </a>
    <a href="/#/register" use:active={{ path: "/register", className: "active" }}> Register</a>
    <a href="/#/login" on:click={userStore.logout}> Logout</a>
  </div>
</nav>

<style lang="scss">
  .navbar {
    --navbar-height: 6.4rem;
    display: flex;
    align-items: center;
    height: var(--navbar-height);
    background-color: var(--navbar-bg);

    &__logo img {
      height: 4.5rem;
    }

    &__links {
      height: 100%;
      display: flex;
      align-items: center;

      > a {
        height: 100%;
        line-height: var(--navbar-height);
        padding: 0 1.5rem;

        &:not(:last-of-type) {
          margin-right: 10px;
        }

        &:hover {
          background-color: var(--navbar-hover-link);
        }

        &.active {
          background-color: var(--navbar-active-link);
        }
      }
    }
  }
</style>
