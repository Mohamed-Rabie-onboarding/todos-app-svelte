<script lang="ts">
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import http from "../configs/http";
  import collectionStore from "../store/collection";
  import type { ICollection } from "../store/collection";
  import Collection from "../components/Collection.svelte";
  import Editable from "../components/Editable.svelte";

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

  let title = "";
  const createNewCollection = (ev: CustomEvent) => {
    title = "";
    const { detail: { value } } = ev; // prettier-ignore

    http
      .post<ICollection>("/collection", {
        title: value,
      })
      .then(({ data }) => {
        collectionStore.addCollection(data);
      })
      .catch(console.error);
  };
</script>

<section class="board">
  <section class="collections">
    {#each $collectionStore as collection (collection.id)}
      <Collection {collection} />
    {/each}
    <Editable bind:label={title} on:updated={createNewCollection}>
      <div class="new-collection">Add new collection</div>
    </Editable>
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

    .new-collection {
      --w: 350px;
      min-width: var(--w);
      max-width: var(--w);
      background-color: rgba(white, 0.3);
      padding: 1.5rem;
    }
  }
</style>
