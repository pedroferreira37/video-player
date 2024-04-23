<div class="left-controls">
	<slot name="play" />
	<slot name="volume" />
	<slot name="countdown" />
</div>

<div class="right-controls">
	<slot name="theater" />
	<slot name="fullscreen" />
</div>

<style>
	.right-controls,
	.left-controls {
		display: flex;
		gap: 1rem;
		align-items: center;
	}
</style>
