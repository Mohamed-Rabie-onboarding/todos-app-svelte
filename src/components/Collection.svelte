<script lang="ts">
  import Editable from "./Editable.svelte";
  import type { ICollection, ITodo } from "../store/collection";
  import Todo from "./Todo.svelte";
  import http from "../configs/http";
  import collectionStore from "../store/collection";
  import Removable from "./Removable.svelte";

  export let collection: ICollection;

  const updateCollectionTitle = (ev: CustomEvent) => {
    const {  detail : { value } } = ev; // prettier-ignore

    http
      .put(`/collection/${collection.id}`, {
        title: value,
      })
      .then(({ status }) => {
        if (status === 204) {
          return collectionStore.updateCollectionTitle(collection.id, value);
        }

        console.log("error", status);
      })
      .catch(console.error);
  };

  const removeCollection = () => {
    http
      .delete(`/collection/${collection.id}`)
      .then(() => {
        collectionStore.removeCollection(collection.id);
      })
      .catch(console.error);
  };

  let description: string = "";
  const addTodo = (ev: CustomEvent) => {
    description = "";
    const { detail: { value } } = ev; //prettier-ignore
    http
      .post<ITodo>(`/todo/${collection.id}`, {
        description: value,
      })
      .then(({ data }) => {
        collectionStore.addTodo(collection.id, data);
      })
      .catch(console.error);
  };
</script>

<Removable on:click={removeCollection}>
  <div class="collection">
    <header class="collection__header">
      <Editable label={collection.title} on:updated={updateCollectionTitle}>
        <h3>{collection.title}</h3>
      </Editable>
    </header>
    <div class="collection__container spacer">
      {#each collection.todos as todo (todo.id)}
        <Todo {todo} collectionId={collection.id} />
      {/each}
      <Editable bind:label={description} on:updated={addTodo}>
        <div class="add-todo">Add new Todo.</div>
      </Editable>
    </div>
  </div>
</Removable>

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
