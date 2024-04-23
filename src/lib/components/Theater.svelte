<script lang="ts">
	import { RectangleHorizontal } from "lucide-svelte";

	export let fullscreen: boolean;
</script>

{#if !fullscreen}
	<button type="button" on:click>
		<RectangleHorizontal color="#fffe" size={24} />
	</button>
{/if}

<style>
	button {
		all: unset;
	}
</style>
