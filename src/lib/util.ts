export function format(time: number) {
	const hours = Math.floor(time / 3600);
	const minutes = Math.floor((time % 3600) / 60);
	const seconds = Math.floor((time % 3600) % 60);

	const paddedHours = hours.toString().padStart(2, "0");
	const paddedMinutes = minutes.toString();
	const paddedSeconds = seconds.toString().padStart(2, "0");

	if (!time) {
		return `0:00`;
	}

	if (hours <= 10) {
		return `${paddedMinutes}:${paddedSeconds}`;
	}

	return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
}

export function debounce(fn: Function, ms: number) {
	let timer: ReturnType<typeof setTimeout>;

	return (...args: any[]) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			fn(...args);
		}, ms);
	};
}
