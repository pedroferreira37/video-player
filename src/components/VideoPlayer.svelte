<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import {
    Play,
    Pause,
    Fullscreen,
    RectangleHorizontal,
    Shrink,
    Volume2,
  } from "lucide-svelte";
  import ProgressBar from "./ProgressBar.svelte";
  import Countdown from "./Countdown.svelte";

  const dispatch = createEventDispatcher();

  export let src: string;
  export let video: HTMLVideoElement;
  export let paused: boolean = true;
  export let time: number;
  export let duration: number;
  export let theater: boolean;
  export let fullscreen: boolean;
  export let progress: number;
  export let muted: boolean;
  export let volume: number;

  let color = "#ffff";
  let size = 24;
</script>

<div class:theater-mode={theater} class="container">
  <div
    class:full-screen-mode={fullscreen}
    class:theater-mode={theater}
    class="video-container"
  >
    <video
      {src}
      bind:this={video}
      bind:paused
      bind:duration
      bind:muted
      bind:volume
      bind:currentTime={time}
      on:click={() => dispatch("mousedown")}
    >
      <track kind="captions" />
    </video>

    <div class="controls-container" class:pause-mode={paused}>
      <div class="controls-wrapper">
        <ProgressBar {progress} />
        <div class="controls">
          <div class="controls-left">
            <button type="button" on:click={() => dispatch("play")}>
              {#if paused}
                <Play {color} {size} />
              {:else}
                <Pause {color} {size} />
              {/if}
            </button>
            <Countdown {time} {duration} />
          </div>
          <div class="controls-right">
            <button type="button"> </button>
            <button type="button" on:click={() => dispatch("theaterequest")}>
              <RectangleHorizontal {size} {color} />
            </button>
            <button
              type="button"
              on:click={() => dispatch("fullscreenrequest")}
            >
              {#if !fullscreen}
                <Fullscreen {size} {color} />
              {:else}
                <Shrink {size} {color} />
              {/if}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .container {
    min-height: 100vh;
    min-width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container.theater-mode {
    align-items: center;
  }

  .video-container {
    position: relative;
    width: 80%;
  }

  .video-container.full-screen-mode {
    width: 100%;
    height: 100vh;
  }

  div.theater-mode:not(.full-screen-mode) {
    width: 100%;
    height: 90vh;
  }

  video {
    width: 100%;
    height: 100%;
    border-radius: 0.25rem;
    object-fit: cover;
  }

  .controls-container {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    transition: all 0.2s;
    visibility: var(--visibility);
    display: flex;
    padding: 0 1rem 0 1rem;
    visibility: hidden;
  }

  .controls-container.pause-mode {
    visibility: visible;
  }

  .video-container:hover .controls-container {
    visibility: visible;
  }

  .controls-wrapper {
    width: 100%;
    transition: all 0.2;
    display: grid;
    grid-template-rows: 1fr;
    gap: 1.25rem;
    padding: 1rem;
  }

  .controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .controls-left {
    display: flex;
    gap: 2rem;
  }

  .controls-right {
    display: flex;
    gap: 2rem;
  }

  button {
    outline: none;
  }
</style>
