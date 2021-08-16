<script lang="ts">
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import http from "../configs/http";
  import collectionStore from "../store/collection";
  import type { ICollection } from "../store/collection";
  import Collection from "../components/Collection.svelte";

  let loading = false;

  onMount(async () => {
    if (get(collectionStore).length === 0) {
      loading = true;
      http
        .get<{ collections: ICollection[] }>("/collection")
        .then(({ data }) => {
          collectionStore.set(data.collections);
        })
        .catch(({ response }) => {
          console.log(response.status, response.data);
        })
        .finally(() => {
          loading = false;
        });
    }
  });
</script>

<section class="board">
  <section class="collections">
    {#each $collectionStore as collection (collection.id)}
      <Collection {collection} />
    {/each}
    <div class="collection">here goes add collection</div>
  </section>
</section>

<style lang="scss">
  .board {
    height: calc(100vh - 64px);
    width: 100%;
    overflow: hidden;
    background-color: var(--board-bg);

    .collections {
      width: calc(100vw - 5rem);
      margin: auto;
      height: calc(100% - 4rem);
      margin-top: 2rem;
      display: flex;
      align-items: flex-start;
      will-change: transform;
      overflow-y: hidden;
      overflow-x: auto;
      padding-bottom: 2rem;
    }
  }
</style>
