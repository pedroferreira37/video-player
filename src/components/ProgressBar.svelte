<script lang="ts">
  export let progress: number;
</script>

<div class="progress-bar-container">
  <div class="progress-bar">
    <span class="progress-bar-current" style="--width:{progress}%"> </span>
    <span class="progress-bar-total"></span>
  </div>
</div>

<style>
  :root {
    --height: 5px;
  }

  .progress-bar-container {
    position: relative;
    cursor: pointer;
  }

  .progress-bar-total {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background-color: gray;
    height: var(--height);
  }

  .progress-bar-current {
    position: absolute;
    top: 0;
    left: 0;
    background-color: red;
    height: var(--height);
    width: var(--width);
    z-index: 1000;
  }
</style>
