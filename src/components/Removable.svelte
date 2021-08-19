<script lang="ts">
  export let top: number = 15;

  $: style = `top: ${top}px`;
</script>

<div class="removable">
  <span class="exit" {style} on:click>
    <span />
    <span />
  </span>
  <slot />
</div>

<style lang="scss" scoped>
  .removable {
    position: relative;

    .exit {
      position: absolute;
      right: 30px;
      z-index: 1;
      cursor: pointer;

      > span {
        transition: transform 0.3s ease;
        position: absolute;
        top: 5px;
        right: 0;
        height: 3px;
        width: 20px;
        background-color: black;
        transform: rotate(45deg);

        &:last-of-type {
          transform: rotate(-45deg);
        }
      }

      &:hover {
        > span {
          transform: rotate(30deg);

          &:last-of-type {
            transform: rotate(-30deg);
          }
        }
      }
    }
  }
</style>
