<script lang="ts">
  import Bubble from './Bubble.svelte';
import Message from './Message.svelte';

  export let messages:any;
  export let title:string = "";
  export let comment:string ="";

</script>

<div class="mx-2 {$$props.class||''}">
  {#if title} <div class="flex justify-end"><Bubble class="translate-y-1 mx-2 max-w-fit bg-white">{title}</Bubble></div> {/if}
  <div class = "border-black border rounded-md p-2 border-dashed">
    {#if messages}
      {#each messages as message}
      <Message
      role={message.role}
      title={message.title}
      comment={message.comment}
      >
        {message.message}
      </Message>
      {/each}
    {:else}
      <div class=""></div>
    {/if}

</div>
{#if comment} <div class="flex justify-end"><Bubble class="-translate-y-1 mx-2 max-w-fit bg-white">{comment}</Bubble></div> {/if}
</div>

