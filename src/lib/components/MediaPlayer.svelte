<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import { debounce } from "$lib/util";

	import Progress from "./Progress.svelte";
	import Controls from "./Controls.svelte";
	import Volume from "./Volume.svelte";
	import Play from "./Play.svelte";
	import Theater from "./Theater.svelte";
	import Fullscreen from "./Fullscreen.svelte";
	import Countdown from "./Countdown.svelte";

	//Src
	export let src: string;

	//Controls
	let fullscreen: boolean;
	let theater: boolean;
	let hovering: boolean;
	let volume: number = 1;
	let muted: boolean;

	//Video
	let video: HTMLVideoElement;
	let paused: boolean = true;
	let duration: number;
	let time: number;

	const play = () => (paused = !paused);

	function toggle_fullscreen() {
		if (!document.fullscreenElement) {
			document.documentElement.requestFullscreen();
			fullscreen = true;
			return;
		}

		document.exitFullscreen();
		fullscreen = false;
	}

	const disable_control = debounce(() => (hovering = false), 2000);

	function fullscreenchange() {
		if (!document.fullscreenElement) fullscreen = false;
	}

	function keyboard(e: KeyboardEvent) {
		switch (e.key) {
			case " ":
				hovering = true;
				paused = !paused;
				disable_control();
				return;
			case "f":
			case "F":
				toggle_fullscreen();
				return;
			case "t":
			case "T":
				theater = !theater;
				return;
			default:
				return;
		}
	}

	onMount(() => {
		document.addEventListener("fullscreenchange", fullscreenchange);
		document.addEventListener("keydown", keyboard);
	});

	onDestroy(() => {
		document.removeEventListener("fullscreenchange", fullscreenchange);
		document.removeEventListener("keydown", keyboard);
	});
</script>

<main
	class="media-player"
	class:fullscreen-mode={fullscreen}
	class:theater-mode={theater}
	class:hide-cursor={!paused && !hovering}
	on:mousemove={() => {
		if (!hovering) hovering = true;
		disable_control();
	}}
	on:mouseleave={() => (hovering = false)}
>
	<video
		{src}
		bind:this={video}
		bind:paused
		bind:currentTime={time}
		bind:duration
		bind:volume
		bind:muted
		on:mousedown={() => {
			if (!hovering && !paused) {
				hovering = true;
				paused = true;
				return;
			}

			play();
			disable_control();
		}}
		on:dblclick={() => toggle_fullscreen()}
	>
		<track kind="captions" />
	</video>

	{#if paused || hovering}
		<div class="bottom-container">
			<Progress bind:paused bind:time {duration} />
			<div class="controls">
				<Controls>
					<Play slot="play" {paused} on:click={() => play()} />
					<Volume
						slot="volume"
						bind:volume
						on:mute={() => {
							volume = volume === 0 ? 1 : 0;
							muted = !muted;
						}}
					/>
					<Countdown slot="countdown" {time} {duration} />
					<Theater slot="theater" {fullscreen} on:click={() => (theater = !theater)} />
					<Fullscreen slot="fullscreen" on:click={() => toggle_fullscreen()} />
				</Controls>
			</div>
		</div>
	{/if}
</main>

<style>
	video {
		width: 100%;
	}

	.media-player {
		position: relative;
		background-color: #151515;
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.media-player.fullscreen-mode,
	.media-player.theater-mode {
		max-width: initial;
		width: 100%;
	}

	.media-player.fullscreen-mode {
		height: 100vh;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1000;
	}

	.media-player.theater-mode:not(.fullscreen-mode) {
		height: 80vh;
	}

	.bottom-container {
		display: flex;
		flex-direction: column;
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 1.25rem;
		gap: 1rem;
	}

	.controls {
		display: flex;
		justify-content: space-between;
		width: 100%;
		z-index: 1;
	}

	.controls::before {
		content: "";
		position: absolute;
		bottom: 0;
		left: 0;
		background: linear-gradient(to top, rgba(0, 0, 0, 0.4), transparent);
		width: 100%;
		aspect-ratio: 6/1;
		z-index: -1;
		pointer-events: none;
	}

	.hide-cursor {
		cursor: none;
	}
</style>
