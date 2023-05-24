<script lang="ts">
import Bubble from './Bubble.svelte';
import { show_meta } from '$lib/utils';

export let meta:object;
export let title:string = "";
export let comment:string =""

</script>

<div class="mx-2">
  {#if title} <div class="flex justify-end"><Bubble class="translate-y-1 mx-2 max-w-fit bg-white">{title}</Bubble></div> {/if}

  <div class = "border-black border rounded-md px-2 border-dashed">

    {#if meta}
    <div class="max-w-fit border-black border px-2 my-2 rounded-sm">
      {@html show_meta(meta)}
    </div>
    {/if}

    <p class="px-2 my-2 border border-black bg-white rounded-sm">
      <slot></slot>
    </p>
  </div>

  {#if comment} <div class="flex justify-end"><Bubble class="-translate-y-1 mx-2 max-w-fit bg-white">{comment}</Bubble></div> {/if}
</div>



