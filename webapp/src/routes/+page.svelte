<script>
  import {user, pb} from "$lib/pocketbase";
  import { onMount, onDestroy } from "svelte";

  import Login from './Login.svelte';
  import Prompt from './Prompt.svelte';
  import Response from './Response.svelte';
  import Summary from './Summary.svelte';

  let interactions = [];


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
      "date": "01/02/2023 12:12 UTC"
    },
    "title": "Response title",
    "comment": "Was I a good Bing?",
    "response": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, autem commodi officia, numquam libero quam esse perferendis necessitatibus illo voluptate nobis quae fugit dicta voluptatum quo, mollitia dolore?"
  }

</script>

{#if !$user}

<Login />

{:else}


<div class="flex max-h-screen max-w-screen">
  <div class="overflow-y-scroll max-w-fit min-w-fit">
    <Summary title="Summary title" comment="Summary comment" meta={response1.meta} />
    <Summary title="Summary title" comment="Summary comment" meta={response1.meta} />
    <Summary title="Summary title" comment="Summary comment" meta={response1.meta} />
    <Summary title="Summary title" comment="Summary comment" meta={response1.meta} />
    <Summary title="Summary title" comment="Summary comment" meta={response1.meta} />
    <Summary title="Summary title" comment="Summary comment" meta={response1.meta} />
    <Summary title="Summary title" comment="Summary comment" meta={response1.meta} />
    <Summary title="Summary title" comment="Summary comment" meta={response1.meta} />
    <Summary title="Summary title" comment="Summary comment" meta={response1.meta} />
    <Summary title="Summary title" comment="Summary comment" meta={response1.meta} />
    <Summary title="Summary title" comment="Summary comment" meta={response1.meta} />
    <Summary title="Summary title" comment="Summary comment" meta={response1.meta} />
    <Summary title="Summary title" comment="Summary comment" meta={response1.meta} />
    <Summary title="Summary title" comment="Summary comment" meta={response1.meta} />
    <Summary title="Summary title" comment="Summary comment" meta={response1.meta} />
    <Summary title="Summary title" comment="Summary comment" meta={response1.meta} />
  </div>
<div class="overflow-y-auto">
  <p>Signed in as {$user.username}, you API <button on:click={pb.logout}>Logout</button>
  <div class="flex " >
    <div class="w-1/2">
      <Prompt messages={messages} title="Cluttered prompt meessages"/>
    </div>

    <div class="w-1/2">
      <Response {...response1} >{response1.response.repeat(20) }</Response>
    </div>
  </div>
</div>
</div>

{/if}

