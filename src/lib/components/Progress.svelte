<script lang="ts">
	import { onDestroy, onMount } from "svelte";

	export let paused: boolean;
	export let time: number;
	export let duration: number;

	let container: HTMLDivElement;
	let scrubing: boolean;

	$: progress = time / duration;

	function update(event: MouseEvent) {
		const rect = container.getBoundingClientRect();
		const x = event.x;

		const p = Math.min(Math.max(0, x - rect.x), rect.width) / rect.width;

		if (scrubing) {
			time = p * duration;
		}
	}

	function scrub(event: MouseEvent) {
		const rect = container.getBoundingClientRect();
		const x = event.x;
		const buttons = event.buttons;

		const p = Math.min(Math.max(0, x - rect.x), rect.width) / rect.width;

		scrubing = (buttons & 1) === 1;

		if (!scrubing && p !== 1) {
			time = p * duration;
			paused = false;
			return;
		}

		paused = true;
	}

	onMount(() => {
		document.addEventListener("mouseup", (e: MouseEvent) => scrubing && scrub(e));
		document.addEventListener("mousemove", (e: MouseEvent) => scrubing && update(e));
	});

	onDestroy(() => {
		document.removeEventListener("mouseup", (e: MouseEvent) => scrubing && scrub(e));
		document.removeEventListener("mousemove", (e: MouseEvent) => scrubing && update(e));
	});
</script>

<div
	bind:this={container}
	role="menuitem"
	tabindex="-1"
	class="progress"
	on:mousedown={(e) => scrub(e)}
	on:mousemove={(e) => update(e)}
>
	<div class="progress-base" style="--progress: {progress || 0}"></div>
	<div class="progress-dot" style="--progress: {progress || 0}"></div>
</div>

<style>
	.progress {
		position: relative;
		width: 100%;
		padding-top: 1rem;
		cursor: pointer;
		box-sizing: border-box;
	}

	.progress-base {
		width: 100%;
		height: 3px;
		background-color: #a9a9a9;
		position: relative;
		transition: transform 100ms ease-in-out;
	}

	.progress-base::before {
		content: "";
		width: calc(var(--progress) * 100%);
		height: 3px;
		background-color: red;
		position: absolute;
		top: 0;
		left: 0;
	}

	.progress-dot {
		height: 50%;
		border-radius: 50%;
		background-color: red;
		position: absolute;
		bottom: -20%;
		left: calc((var(--progress) * 100%));
		transform: scale(0);
		aspect-ratio: 1/1;
		transition: transform 100ms ease-in-out;
	}

	.progress:hover .progress-base {
		transform: scaleY(1.8);
	}

	.progress:hover .progress-dot {
		transform: scale(1.6);
	}
</style>
