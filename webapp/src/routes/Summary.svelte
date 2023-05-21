<script lang="ts">
  import Bubble from './Bubble.svelte';
  import { show_meta } from '$lib/utils';

  export let title = "";
  export let meta = {};
  export let token_used = 1234;
  export let token_max = 4000;
  export let comment ="";

</script>

<div class="border-black border p-1 mx-2 my-1 rounded-md {$$props.class||''}">
  <div class="text-base">{title}</div>
  <div class="text-xs font-mono text-gray-500">{@html show_meta(meta)}</div>

  <div class="text-xs">{comment}</div>

  <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
    <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style="width: {100*token_used/token_max}%">{token_used}/{token_max}</div>
  </div>
</div>