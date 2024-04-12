import { writable } from "svelte/store";

function cache(key: string) {
  const { subscribe, update } = writable(
    JSON.parse(localStorage.getItem(key) || "{}")
  );

  return {
    subscribe,
    set: (k: string, v: any) => update((cache) => ({ ...cache, [k]: v })),
  };
}

export default cache("user-video-preferences");
