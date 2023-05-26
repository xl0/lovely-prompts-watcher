<script>
    import "../app.css";
    import { onDestroy, onMount } from "svelte";
    import { user, pb }  from "$lib/pocketbase";

    import Login from '$lib/components/Login.svelte';
    import Prompt from '$lib/components/Prompt.svelte';
    import Response from '$lib/components/Reply.svelte';
    import PromptSummary from '$lib/components/PromptSummary.svelte';
    import Navbar from "$lib/components/Navbar.svelte";
  import { construct_svelte_component, debug } from "svelte/internal";

    export let interactions = [];

    let unsubscribe = null;

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
    console.log("Collected on mount: ", {res})
    console.log({user:$user});
    console.log({authStore:pb.authStore});

    interactions = res;

    unsubscribe = await pb.collection('prompts').subscribe('*', async ({action, record}) => {
      console.log({action, record, interactions});

      if (action === 'create') {
        record.expand = {};
        // debug;
        const replies = await pb.collection("replies").getFullList({
          filter: `prompt = "${record.id}"`,
          fields: "id, title, comment, reply, updated, meta",
          sort: "-updated",
        })
        // console.log("Replies: ", replies);

        if ( replies.length > 0 )
          record.expan["replies(prompt)"] = replies;
        interactions = [record, ...interactions ];
      } else if (action === 'update') {
        console.log("Updated prompt: ", {record});
        interactions = interactions.map((prompt) => {
          if (prompt.id === record.id) {
            return record;
          } else {
            return prompt;
          }
        });
      } else if (action === 'delete') {
        console.log("Deleted prompt: ", {record});
        interactions = interactions.filter((prompt) => prompt.id !== record.id);
      }
    });
  });

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });

  </script>



  <div class="flex flex-col h-screen" data-sveltekit-preload-data="off">
    <Login class="py-1"/>
    <!-- <Navbar/> -->
    <div class="flex overflow-hidden grow" >
        <div class="overflow-y-scroll shrink-0">
          {#if interactions}
            {#each interactions as prompt (prompt.id)}
                <!-- prompt_json = -->

                <!-- <pre class="text-xs"><code>{JSON.stringify(prompt, null, 2)}</code></pre> -->

                <!-- <pre> {JSON.stringify(prompt,null,2)} </pre> -->

                <!-- {console.log({prompt})} -->
                <a href="/prompt/{prompt.id}">
                <PromptSummary title={prompt.title}
                        comment={prompt.comment}
                        updated={prompt.updated}
                        replies = {prompt.expand['replies(prompt)']}
                        class="max-w-xs m-1"/>
                </a>
            {/each}
          {/if}

        <!-- <PromptSummary replies={[response1]} title="Summary title" comment="Summary comment" meta={response1.meta} updated="2023-05-24 07:16:19.545Z"/> -->
        </div>

        <div class="overflow-y-scroll grow">
            <slot/>
        </div>


</div>
  </div>
