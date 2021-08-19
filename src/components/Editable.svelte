<script lang="ts">
  export let label: string;

  let editing: boolean = false;
  let editedVal: string = label;

  const toggleEdit = () => (editing = !editing);
</script>

{#if !editing}
  <p on:click={toggleEdit}>
    {label}
  </p>
{/if}

{#if editing}
  <input type="text" on:blur={toggleEdit} bind:value={editedVal} />
{/if}
<br />
label: {label}
<br />
editedVal: {editedVal}
<br />
<hr />
