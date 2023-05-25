<script lang="ts">
    import Prompt from '$lib/components/Prompt.svelte';
    import Reply from '$lib/components/Reply.svelte';
    export let data;
    // import Prompt from 'Prompt.svelte';
    // import Response from 'Reply.svelte';
    // import PromptSummary from 'PromptSummary.svelte';
    // import Navbar from "Navbar.svelte";

</script>


<!-- <div> -->
    <!-- <pre>{JSON.stringify(data, null, 2)}</pre> -->
    <div class="flex grow w-full" >
        <div class="w-1/2">
            <!-- <Prompt messages={data.prompt.messages} title="Prompt messages"/> -->
            <Prompt messages={data.messages} title={data.title} comment={data.comment}/>
        </div>

        <div class="w-1/2">
            {#if data.expand["replies(prompt)"]}
            <!-- <pre>{JSON.stringify(data.expand["replies(prompt)"], null, 2)}</pre> -->

                {#each data.expand["replies(prompt)"] as reply}
                    <Reply title={reply.title} comment={reply.comment} meta={reply.meta} > {reply.reply}</Reply>
                {/each}
            {/if}
        </div>
    </div>
<!-- </div> -->
