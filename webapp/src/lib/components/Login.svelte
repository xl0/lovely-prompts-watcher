<script lang="ts">
import { user, pb } from "$lib/pocketbase";

let username: string;
let password: string;

async function login() {
  await pb.collection("users").authWithPassword(username, password);
}

async function register() {
    try {
        const data = {
            username,
            password,
            passwordConfirm: password
        };

        await pb.collection("users").create(data);
        await login();
    } catch (err) {
        console.log(err);
    }
}

function signout() {
    pb.authStore.clear();
}

console.log({$user});

</script>

{#if $user}
<div class="flex border-b border-black {$$props.class||''}">
<p class="mr-2">current user is {$user.username} ({$user.email}) <code>API KEY: {$user.id}_{$user.api_token}</code></p>
<!-- {console.log(JSON.stringify($user))} -->

<form action="" placeholder="username" on:submit|preventDefault>
  <button class="border border-black rounded-md px-1" type="button" on:click={signout}>signout</button>
</form>
</div>
{:else}
<form action="" placeholder="username" on:submit|preventDefault>

  <input type="text" bind:value={username} placeholder="username" />
  <input type="password" bind:value={password} placeholder="password" />
  <button class="border border-black rounded-md px-1" type="submit" on:click={login}>login</button>
  <!-- <button type="button" on:click={register}>register</button> -->
  <!-- <button type="button" on:click={signout}>signout</button> -->

</form>

{/if}