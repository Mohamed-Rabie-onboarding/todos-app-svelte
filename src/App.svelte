<script lang="ts">
  import Router from "svelte-spa-router";
  import routes from "./configs/routes";
  import Navbar from "./components/Navbar.svelte";
</script>

<main>
  <Navbar />
  <Router {routes} />
</main>
