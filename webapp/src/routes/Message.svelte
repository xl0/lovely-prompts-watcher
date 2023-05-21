<script lang="ts">
  import Bubble from './Bubble.svelte';
  export let role = "";
  export let title = "";
  export let message = "";
  export let comment ="";

  export function role_color(role:string) {
    switch (role.toLowerCase()) {
      case "user": return "blue-300";
      case "system": return "gray-300";
      case "assistant": return "green-300";
      default: return "gray-800";
    }
  }
</script>

<div class="max-w-xl {$$props.class||''}">
  <div class="flex items-end justify-between">
    {#if role}  <Bubble text={role} toggle={false} color={role_color(role)} class="translate-y-1" />   {/if}
    {#if title} <Bubble text={title} color="amber-200" class="translate-y-1" />  {/if}
  </div>

  <p class="px-2 border border-black bg-white rounded-sm"><slot></slot></p>

  {#if comment}  <Bubble text={comment} color="gray-100" class="-translate-y-1 ml-5"/>   {/if}
</div>