<script lang="ts">
	import { createEventDispatcher, onDestroy, onMount } from "svelte";
	import { Volume1, Volume2, VolumeX } from "lucide-svelte";

	const disptach = createEventDispatcher();

	export let volume: number;

	let slider: HTMLDivElement;
	let scrubing: boolean;

	function update(event: MouseEvent) {
		const rect = slider.getBoundingClientRect();
		const x = event.x;

		const v = Math.min(Math.max(0, x - rect.x), rect.width) / rect.width;

		if (scrubing) {
			volume = v;
		}
	}

	function scrub(event: MouseEvent) {
		const rect = slider.getBoundingClientRect();
		const x = event.x;
		const buttons = event.buttons;

		const v = Math.min(Math.max(0, x - rect.x), rect.width) / rect.width;

		scrubing = (buttons & 1) === 1;

		if (!scrubing) {
			volume = v;
			return;
		}
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

<div class="volume-base">
	<button class="volume" on:click={() => disptach("mute")}>
		{#if volume <= 1 && volume >= 0.4}
			<Volume2 color="#fffe" size={24} />
		{:else if volume <= 0.4 && volume > 0}
			<Volume1 color="#fffe" size={24} />
		{:else}
			<VolumeX color="#fffe" size={24} />
		{/if}
	</button>
	<div
		bind:this={slider}
		class="volume-slider"
		style="--volume: {volume}"
		role="slider"
		tabindex="-1"
		aria-valuemin="0"
		aria-valuemax="1"
		aria-valuenow="0.5"
		on:mousedown={(e) => scrub(e)}
		on:mousemove={(e) => update(e)}
	></div>
</div>

<style>
	.volume-base {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding-right: 0.5rem;
	}

	.volume-base:hover .volume-slider {
		display: block;
	}

	.volume-slider {
		background: #a9a9a9;
		height: 3px;
		position: relative;
		width: 4rem;
		display: none;
		cursor: pointer;
	}

	.volume-slider::before {
		content: "";
		display: block;
		background: #ffff;
		width: calc(var(--volume) * 100%);
		height: 3px;
		position: relative;
	}

	.volume-slider::after {
		content: "";
		position: absolute;
		left: calc(var(--volume) * 100%);
		top: -3.5px;
		height: 0.6rem;
		width: 0.6rem;
		border-radius: 50%;
		background: #ffff;
	}
</style>
