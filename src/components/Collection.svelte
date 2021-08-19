<script lang="ts">
  import Editable from "./Editable.svelte";
  import type { ICollection } from "../store/collection";
  import Todo from "./Todo.svelte";

  export let collection: ICollection;
</script>

<div class="collection">
  <header class="collection__header">
    <Editable label={collection.title} />
    <h3>{collection.title}</h3>
  </header>
  <div class="collection__container spacer">
    {#each collection.todos as todo (todo.id)}
      <Todo {todo} />
    {/each}
  </div>
</div>

<style lang="scss">
  .collection {
    --w: 350px;
    min-width: var(--w);
    max-width: var(--w);
    background-color: var(--collection-bg);
    margin-right: 2rem;
    display: flex;
    flex-direction: column;
    height: 100%;
    border-radius: 0.5rem;

    &__header {
      padding: 1.5rem;
    }

    &__container {
      padding: 1.5rem;
      will-change: transform;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
</style>
