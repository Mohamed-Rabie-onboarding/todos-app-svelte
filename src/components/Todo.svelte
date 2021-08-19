<script lang="ts">
  import type { ITodo } from "../store/collection";
  import Editable from "./Editable.svelte";
  import http from "../configs/http";
  import collectionStore from "../store/collection";

  export let collectionId: number;
  export let todo: ITodo;

  const updateTodoDescription = (ev: CustomEvent) => {
    const { detail: { value } } = ev; // prettier-ignore

    http
      .put(`/todo/${todo.id}`, {
        description: value,
      })
      .then(() => {
        collectionStore.updateTodoDescription(collectionId, todo.id, value);
      })
      .catch(console.error);
  };

  const updateItemBody = (id: number) => (ev: CustomEvent) => {
    const { detail: { value } } = ev; // prettier-ignore

    http
      .put(`/todo-item/${id}`, {
        body: value,
      })
      .then(() => {
        collectionStore.updateItemBody(collectionId, todo.id, id, value);
      })
      .catch(console.error);
  };

  const updateItemDone = (id: number) => (ev: Event) => {
    const input = ev.target as HTMLInputElement;
    const value = input.checked;

    http
      .put(`/todo-item/${id}`, {
        done: value,
      })
      .then(() => {
        collectionStore.updateItemDone(collectionId, todo.id, id, value);
      })
      .catch(console.error);
  };
</script>

<div class="todo">
  <Editable label={todo.description} on:updated={updateTodoDescription}>
    <p class="todo__description">{todo.description}</p>
  </Editable>
  <div class="items">
    {#each todo.items as item (item.id)}
      <div class="item">
        <input
          type="checkbox"
          checked={item.done}
          on:change={updateItemDone(item.id)}
        />
        <Editable label={item.body} on:updated={updateItemBody(item.id)}>
          <span>
            {item.body}
          </span>
        </Editable>
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .todo {
    background-color: var(--white);
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .item {
    display: flex;
    margin: 1rem 0;
    align-items: center;

    input {
      margin-right: 1rem;
    }
  }
</style>
