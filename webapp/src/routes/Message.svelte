<script lang="ts">
  import Bubble from './Bubble.svelte';
  export let role = "";
  export let title = "";
  export let comment ="";

  const role_color = (role:string) => {
    switch (role.toLowerCase()) {
      case "user": return "bg-blue-300";
      case "system": return "bg-gray-300";
      case "assistant": return "bg-green-300";
      default: return "bg-gray-800";
    }
  }
</script>

<div class={$$props.class}>
  <div class="flex items-end justify-between">
    {#if role}  <Bubble toggle={false} color={role_color(role)} class="mx-2 translate-y-1">{role}</Bubble>{/if}
    {#if title} <Bubble color="bg-amber-200" class="mx-2 translate-y-1">{title}</Bubble> {/if}
  </div>

  <p class="px-2 border border-black bg-white rounded-sm">
    <slot></slot>
  </p>
  <!-- ml-5 -->
  {#if comment} <Bubble color="bg-gray-100" class="-translate-y-1 mr-2 ml-5">{comment}</Bubble> {/if}
</div>