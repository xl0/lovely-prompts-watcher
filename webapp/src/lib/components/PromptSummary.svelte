<script lang="ts">

  import ReplySummary from './ReplySummary.svelte';
  import { formatDistanceToNow, formatDistance} from 'date-fns'

  export let title = "";
  export let comment = "";
  export let updated;
  export let replies;

  let date_fmt = new Intl.RelativeTimeFormat("en", {numeric: "auto"});

</script>


<div class="hover:bg-blue-50 border-black border p-1 rounded-md {$$props.class||''}">


  <p class="text-base line-clamp-2 text-ellipsis">{title||"Prompt"}</p>
<div class="flex justify-between items-top">

  {#if comment}
  <div class="text-xs"><p>{comment}</p></div>
  {/if}

  <p class="justify-self-end text-sm font-light text-ellipsis"> {formatDistanceToNow(new Date(updated), { addSuffix: true, includeSeconds: true}).replace("about ", "").replace("hour", "h")} </p>
</div>
<!--
  {date_fmt.format(updated)}
  {comment} -->


  <!-- <pre>replies: {JSON.stringify(replies,null,2)} </pre> -->
  {#if replies }
    {#each replies as reply (reply.id)}
      {@debug reply}
      <ReplySummary
        class="my-1"
        title={reply.title}
        comment={reply.comment}
        meta={reply.meta}
        tok_in={reply.tok_in}
        tok_out={reply.tok_out}
        tok_max={reply.tok_max}
        timediff={formatDistance(new Date(reply.updated), new Date(updated), { addSuffix: true, includeSeconds: true}).replace("about ", "")}/>
    {/each}
  {/if}

    <!-- <ReplySummary  -->

      <!-- <div class="text-xs font-mono text-gray-500">{@html show_meta(meta)}</div>
        <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
          <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style="width: {100*token_used/token_max}%">{token_used}/{token_max}</div>
        </div> -->
</div>