<script lang="ts">
  import Bubble from './Bubble.svelte';
  import { model_summary, show_tok_stats} from '$lib/utils';

  export let title = "";
  export let comment ="";
  export let meta = { };
  export let tok_in = 0;
  export let tok_out = 0;
  export let tok_max = 0;
  export let timediff = "";
  // export let token_used = 1234;
  // export let token_max = 4000;

</script>

<div class="hover:bg-blue-100 border-black border p-1 rounded-md {$$props.class||''}">


  <div class="text-base">{title||"Reply"}</div>

  {#if meta}
    <div class="text-xs font-mono text-gray-500">{model_summary(meta)}</div>
  {/if}

  {#if comment}
    <div class="text-xs"><p>{comment}</p></div>
  {/if}

  <div class="group flex items-center justify-between">
  <div class="relative w-2/3">
    <div class="group-hover:opacity-100 opacity-0 absolute inset-0 flex items-center justify-center">
      <Bubble class="text-xs font-mono text-gray-500 bg-white">in: {tok_in} out: {tok_out}</Bubble>
    </div>

    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700">
      {#if tok_max}
        <div class="bg-blue-600 x-5 h-full leading-none rounded-full" style="width: {100*(tok_in+tok_out)/tok_max}%"></div>
      {/if}
    </div>

  </div>
  {#if tok_max}
    <div class="text-xs font-mono text-gray-500">{tok_in+tok_out}/{tok_max}</div>
  {/if}
</div>
</div>

