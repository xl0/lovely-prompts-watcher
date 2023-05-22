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
    //   if (user) {
    //     $user = user;
    //   }
    // }
</script>

{#if $user}
current user is {$user}

{:else}
<form action="" placeholder="username" on:submit|preventDefault>

  <input type="text" bind:value={username} placeholder="username" />
  <input type="password" bind:value={password} placeholder="password" />
  <button type="submit" on:click={login}>login</button>
  <button type="button" on:click={register}>register</button>

</form>

{/if}