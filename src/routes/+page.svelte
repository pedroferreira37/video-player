<script lang="ts">
	import MediaPlayer from "../lib/components/MediaPlayer.svelte";
</script>

<main>
	<h2>This is uncompleted video player builted with svelte! :)</h2>
	<p>Complete it's a just a matter of time, but my learnings here finded it's way</p>
	<MediaPlayer src="videos/sintel-short.mp4" />
</main>

<style>
	:root {
		font-family:
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			"Segoe UI",
			Roboto,
			Oxygen,
			Ubuntu,
			Cantarell,
			"Open Sans",
			"Helvetica Neue",
			sans-serif;
		margin: 0;
		color: rgb(55, 53, 47);
		font-size: 18px;
	}

	:global(body) {
		display: flex;
		align-items: center;
		height: 100vh;
	}

	main {
		max-width: 1920px;
		width: 1200px;
		margin: 0 auto;
		padding: 1rem;
	}

	h2 {
		margin: 0 auto;
		font-weight: bold;
	}

	p {
		margin-bottom: 1rem;
	}
</style>
