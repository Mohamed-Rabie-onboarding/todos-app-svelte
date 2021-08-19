<script lang="ts">
  import type { ITodo, ITodoItem } from "../store/collection";
  import Editable from "./Editable.svelte";
  import http from "../configs/http";
  import collectionStore from "../store/collection";
  import Removable from "./Removable.svelte";

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

  const removeTodo = () => {
    http
      .delete(`/todo/${todo.id}`)
      .then(() => {
        collectionStore.removeTodo(collectionId, todo.id);
      })
      .catch(console.error);
  };

  const removeTodoItem = (id: number) => () => {
    http
      .delete(`/todo-item/${id}`)
      .then(() => {
        collectionStore.removeTodoItem(collectionId, todo.id, id);
      })
      .catch(console.error);
  };

  let body: string = "";
  const addTodoItem = (ev: CustomEvent) => {
    body = "";
    const { detail: { value } } = ev; // prettier-ignore

    http
      .post<ITodoItem>(`/todo-item/${todo.id}`, {
        body: value,
      })
      .then(({ data }) => {
        collectionStore.addTodoItem(collectionId, todo.id, data);
      })
      .catch(console.error);
  };
</script>

<Removable on:click={removeTodo}>
  <div class="todo">
    <Editable label={todo.description} on:updated={updateTodoDescription}>
      <p class="todo__description">{todo.description}</p>
    </Editable>
    <div class="items">
      {#each todo.items as item (item.id)}
        <Removable top={0} on:click={removeTodoItem(item.id)}>
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
        </Removable>
      {/each}
      <Editable bind:label={body} on:updated={addTodoItem}>
        <div>Add new todo item.</div>
      </Editable>
    </div>
  </div>
</Removable>

<style lang="scss">
  .todo {
    background-color: var(--white);
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .item {
    display: flex;
    margin: 2rem 0 1rem;
    align-items: center;

    input {
      margin-right: 1rem;
    }
  }
</style>
