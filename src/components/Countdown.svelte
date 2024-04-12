<script lang="ts">
  export let time: number;
  export let duration: number;

  function format(time: number) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor((time % 3600) % 60);

    const paddedHours = hours.toString().padStart(2, "0");
    const paddedMinutes = minutes.toString();
    const paddedSeconds = seconds.toString().padStart(2, "0");

    if (hours <= 10) {
      return `${paddedMinutes}:${paddedSeconds}`;
    }

    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
  }
</script>

<span>
  {format(time)} / {format(duration)}
</span>

<style>
  :root {
    --font-size: 14px;
  }

  span {
    color: white;
    font-size: var(--font-size);
  }
</style>
