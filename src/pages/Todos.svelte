<script lang="ts">
</script>

<section class="board">
  <section class="collections">
    <div class="collection">collection 1</div>
    <div class="collection">collection 1</div>
    <div class="collection">collection 1</div>
    <div class="collection">collection 1</div>
    <div class="collection">collection 1</div>
    <div class="collection">collection 1</div>
    <div class="collection">collection 1</div>
    <div class="collection">collection 1</div>
    <div class="collection">collection 1</div>
    <div class="collection">collection 1</div>
    <div class="collection">collection 1</div>
    <div class="collection">collection 1</div>
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
      overflow-x: auto;
      overflow-y: hidden;
      display: flex;
      align-items: flex-start;

      > .collection {
        --w: 350px;
        min-width: var(--w);
        max-width: var(--w);
        background-color: var(--collection-bg);
        padding: 1.5rem;

        &:not(:last-of-type) {
          margin-right: 2rem;
        }
      }
    }
  }
</style>
