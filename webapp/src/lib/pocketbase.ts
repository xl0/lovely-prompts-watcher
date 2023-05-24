import PocketBase from "pocketbase";

import { writable } from "svelte/store";

import { PUBLIC_PB_URL } from "$env/static/public";

export const pb = new PocketBase(PUBLIC_PB_URL);

export const user = writable();

user.set(pb.authStore.model);

pb.authStore.onChange((auth) => {
  console.trace({user:user, auth, authStore:pb.authStore})
  user.set(pb.authStore.model);
});

