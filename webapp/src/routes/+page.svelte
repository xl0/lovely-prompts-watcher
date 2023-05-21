<script>
  import Prompt from './Prompt.svelte';
  import Response from './Response.svelte';

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


<div class="flex">
<div class="max-w-2xl">
  <Prompt messages={messages} title="Cluttered prompt meessages"/>
</div>

<!-- <div class="max-w-2xl">
  <Prompt messages={messages2} title="Neat prompt messages" comment="Usually you don't have comments/titles all over the place"/>
</div>
 -->
<div class="max-w-2xl">
  <Response {...response1} >{response1.response.repeat(20) }</Response>
</div>
</div>
