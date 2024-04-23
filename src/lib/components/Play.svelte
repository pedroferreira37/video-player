<script lang="ts">
	import { Pause, Play } from "lucide-svelte";

	export let paused: boolean;
</script>

<button type="button" on:click>
	{#if paused}
		<Play color="#fffe" size={24} />
	{:else}
		<Pause color="#fffe" size={24} />
	{/if}
</button>

<style>
	button {
		all: unset;
	}
</style>
