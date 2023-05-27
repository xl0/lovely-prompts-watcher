<script lang="ts">
  import "../app.css";
  import { onDestroy, onMount } from "svelte";
  import { user, pb }  from "$lib/pocketbase";

  import Login from '$lib/components/Login.svelte';
  import Prompt from '$lib/components/Prompt.svelte';
  import Response from '$lib/components/Reply.svelte';
  import PromptSummary from '$lib/components/PromptSummary.svelte';
  import Navbar from "$lib/components/Navbar.svelte";
  import { debug } from "svelte/internal";

  export let prompt_list:Array<string> = [];

  export let prompt_db:Record<string, Record<string, any>> = {};



  let unsubscribe_prompts = null;
  let unsubscribe_replies = null;

  let messages = [
    {
      "role": "System",
      "message" : "You are a good Bing",
      "comment": "Hello, world!"
    },
    {
      "role": "User",
      "title": "Lorem",
      "message": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, autem commodi officia, numquam libero quam esse perferendis necessitatibus illo voluptate nobis quae fugit dicta voluptatum quo, mollitia dolore?".repeat(5),
      "comment": "You have been a bad user. ".repeat(100)
    },
  ]

  let messages2 = [
    { "role": "System",
      "message" : "You are a good Bing"
    },
    {
      "role": "User",
      "message": "Hello there!"
    },
    { "role": "Assistant",
      "message": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, autem commodi officia, numquam libero quam esse perferendis necessitatibus illo voluptate nobis quae fugit dicta voluptatum quo, mollitia dolore?",
    }
  ]

  let response1 = {
    "meta": {
      "model": "gpt-3.5-turbo",
      "temperature": 0.7,
      "max_tokens": 250,
    },
    "title": "Response title",
    "comment": "Was I a good Bing?",
    "updated": "01/02/2023 12:12 UTC",
    "response": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, autem commodi officia, numquam libero quam esse perferendis necessitatibus illo voluptate nobis quae fugit dicta voluptatum quo, mollitia dolore?"
  }


  onMount(async () => {
    const res = await pb.collection("prompts").getFullList({
      expand: "replies(prompt)",
      fields: "id, title, comment, updated," +
              "expand.replies(prompt).id, expand.replies(prompt).title, expand.replies(prompt).comment," +
              "expand.replies(prompt).updated, expand.replies(prompt).meta," +
              "expand.replies(prompt).tok_in, expand.replies(prompt).tok_out, expand.replies(prompt).tok_max",
      sort: "-updated",
    })

    function map_replies( record:Record<string, any> ) {
      if (record.expand && record.expand["replies(prompt)"]) {
        record.reply_db = Object.fromEntries(record.expand["replies(prompt)"].map((r:Record<string, any>) => [r.id, r]));
        record.reply_list = record.expand["replies(prompt)"].map((r:Record<string, any>) => r.id);
        delete record.expand["replies(prompt)"];
      }
      return record;
    }

    prompt_list = res.map((r) => r.id);
    prompt_db = Object.fromEntries(res.map((r) => [r.id, map_replies(r)]));

    // res.map((r) => {
    //   const replies  = r.expand["replies(prompt)"];
    //   if (replies) {
    //     r.replies = new Map( r.expand["replies(prompt)"].map((r:Record<string, any>) => [r.id, r]) );
    //   }
    //   r.expand = {};
    //   return r;
    // })

    // console.log("Collected on mount: ", {res})
    // console.log({user:$user});
    // console.log({authStore:pb.authStore});




    // prompt_list = res.map((r) => r.id);
    // prompt_db = Object.fromEntries(res.map((r) => [r.id, r]));


    // console.log({prompts});

    unsubscribe_prompts = await pb.collection('prompts').subscribe('*', async ({action, record}) => {
      console.log("prompts update: ", {action, record});

      if (action === 'create') {
        // This should be aempty, but just in case
        let replies = await pb.collection("replies").getFullList({
            filter: `prompt = "${record.id}"`,
            fields: "id, title, comment, reply, updated, meta",
            sort: "-updated",
          })

        if (replies) {
          record.reply_db = Object.fromEntries(replies.map((r:Record<string, any>) => [r.id, r]));
          record.reply_list = replies.map((r:Record<string, any>) => r.id);
        }

        prompt_db[record.id] = record;
        prompt_list = [record.id, ...prompt_list ];
      }
      else if (action === 'update') {
        console.log("Updated prompt: ", {record});

        // Note: Update the object in place, so that the UI updates
        for (let [key, value] of Object.entries(record)) {
          prompt_db[record.id][key] = value;
        }

      } else if (action === 'delete') {
        console.log("Deleted prompt: ", {record});

        // prompts.delete(record.id);
        // prompts = prompts;
        prompt_list = prompt_list.filter((prompt) => prompt !== record.id);
        // delete prompt_db[record.id]
      }
    });

    unsubscribe_replies = await pb.collection('replies').subscribe('*', async ({action, record}) => {
      console.log({action, record});
      console.assert(record.prompt in prompt_db);
      let prompt = prompt_db[record.prompt];

      if (action === 'create') {
        if (prompt.reply_db === undefined) {
          prompt.reply_db = {};
          prompt.reply_list = [];
        }
        prompt.reply_db[record.id] = record;
        prompt.reply_list = [record.id, ...prompt_db[record.prompt].reply_list];
      } else if (action === 'update') {
        console.log("Updated reply: ", {record});
        console.assert(record.id in prompt_db[record.prompt].reply_db);
        
        // Note: Update the object in place, so that the UI updates
        for (let [key, value] of Object.entries(record)) {
          prompt.reply_db[record.id][key] = value;
        }

      } else if (action === 'delete') {
        console.log("Deleted reply: ", {record});
        console.assert(record.id in prompt_db[record.prompt].reply_db);

        prompt.reply_list = prompt_db[record.prompt].reply_list.filter((reply:string) => reply !== record.id);
      }

      prompt_db[record.prompt] = prompt_db[record.prompt]; // Trigger ui update
    });

  });

  onDestroy(() => {
    if (unsubscribe_prompts) {
      unsubscribe_prompts();
    }
    if (unsubscribe_replies) {
      unsubscribe_replies();
    }
  });

  </script>

  <div class="flex flex-col h-screen" data-sveltekit-preload-data="off">
    <Login class="py-1"/>
    <!-- <Navbar/> -->
    <div class="flex overflow-hidden grow" >
        <div class="overflow-y-scroll shrink-0 max-w-sm">

            {#each prompt_list as pid }
                {@debug pid}
                <!-- prompt_json = -->

                <!-- <pre class="text-xs"><code>{JSON.stringify(prompt, null, 2)}</code></pre> -->

                <!-- <pre> {JSON.stringify(prompt,null,2)} </pre> -->

                <!-- {console.log({prompt})} -->
                <a href="/prompt/{pid}">
                <PromptSummary title={prompt_db[pid].title}
                        comment={prompt_db[pid].comment}
                        updated={prompt_db[pid].updated}
                        reply_list = {prompt_db[pid].reply_list}
                        reply_db = {prompt_db[pid].reply_db}
                        class=" m-1"/>
                </a>
            {/each}

        <!-- <PromptSummary replies={[response1]} title="Summary title" comment="Summary comment" meta={response1.meta} updated="2023-05-24 07:16:19.545Z"/> -->
        </div>

        <div class="overflow-y-scroll grow">
            <slot/>
        </div>


</div>
  </div>
