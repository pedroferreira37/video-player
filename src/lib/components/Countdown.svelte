<script lang="ts">
	import { format } from "$lib/util";

	export let time: number;
	export let duration: number;
</script>

<span>
	{format(time)} / {format(duration)}
</span>

<style>
	span {
		font-size: 0.875rem;
		color: #ffff;
	}
</style>
