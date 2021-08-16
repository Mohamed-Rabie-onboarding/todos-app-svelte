<script lang="ts">
  import type { ITodo } from "../store/collection";

  export let todo: ITodo;
</script>

<div class="todo">
  <p class="todo__description">{todo.description}</p>
  <div class="items">
    {#each todo.items as item (item.id)}
      <div class="item">
        <input type="checkbox" id={"item-" + item.id} checked={item.done} />
        <label for={"item-" + item.id}>
          {item.body}
        </label>
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
</style>
