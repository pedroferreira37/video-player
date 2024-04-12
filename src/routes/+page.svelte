<script lang="ts">
  import VideoPlayer from "../components/VideoPlayer.svelte";

  let video: HTMLVideoElement;

  let paused: boolean = true;
  let duration: number;
  let time: number = 0;
  let theater: boolean = false;
  let fullscreen: boolean = false;
  let muted: boolean = false;
  let volume: number = 1;

  $: progress = (time / duration) * 100;

  function play() {
    paused ? video.play() : video.pause();
  }

  function resizeFullScreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      return;
    }

    document.documentElement.requestFullscreen();
    fullscreen = true;
  }

  document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement) {
      fullscreen = false;
    }
  });
</script>

<VideoPlayer
  bind:video
  bind:paused
  bind:duration
  bind:time
  bind:muted
  bind:volume
  bind:theater
  bind:fullscreen
  {progress}
  on:play={play}
  on:mousedown={play}
  on:fullscreenrequest={resizeFullScreen}
  on:theaterequest={() => (theater = !theater)}
  src="videos/sintel-short.mp4"
/>
