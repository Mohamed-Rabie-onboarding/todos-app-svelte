<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  export let label: string;
  let editing: boolean = false;
  $: editedVal = label;

  const toggleEdit = () => (editing = !editing);
  const updateOrSkip = () => {
    toggleEdit();
    if (label === editedVal || editedVal === "") {
      return (editedVal = label);
    }

    label = editedVal;
    dispatch("updated", { value: label });
  };
</script>

{#if !editing}
  <div on:click={toggleEdit}>
    <slot />
  </div>
{/if}

{#if editing}
  <input type="text" on:blur={updateOrSkip} autofocus bind:value={editedVal} />
{/if}
