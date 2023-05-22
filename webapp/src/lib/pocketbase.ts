
import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';

export const pb = new PocketBase("http://localhost:8090");

export const user = writable(pb.authStore.model);

console.log("user: ", user);

pb.authStore.onChange((auth) => {
    console.log("auth: ", auth);
    user.set(pb.authStore.model);
});

