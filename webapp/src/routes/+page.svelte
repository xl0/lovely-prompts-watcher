<script>
import { toggle_truncate } from '$lib/utils';
  import Bubble from './Bubble.svelte';
  import Message from './Message.svelte';

</script>
<!--
<style>
  .foldable-bubble {
    position: relative;
  }

  .foldable-bubble::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    border-left: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-top: 10px solid #4F46E5; /* Customize the color of the triangle here */
  }
</style> -->

<Message
  role="System"
  comment="Hello, world Hello worsdfdsfdsfsdfdsfsld! sfsdfsd fsd dsfsd fsd dsf sfs sd sdfsdfdsfsdfsdfsdfdsfdsfsfs sdfdsfdsfs">
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, autem commodi officia, numquam libero quam esse perferendis necessitatibus illo voluptate nobis quae fugit dicta voluptatum quo, mollitia dolore?
</Message>


<Message role="User" title="Hello there!">
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, autem commodi officia, numquam libero quam esse perferendis necessitatibus illo voluptate nobis quae fugit dicta voluptatum quo, mollitia dolore?
</Message>

<Message
  role="Assistant"
  title="Hello there!"
  message=""
  comment="Hello, world Hello worsdfdsfdsfsdfdsfsld! sfsdfsd fsd dsfsd fsd dsf sfs sd sdfsdfdsfsdfsdfsdfdsfdsfsfs sdfdsfdsfs">
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, autem commodi officia, numquam libero quam esse perferendis necessitatibus illo voluptate nobis quae fugit dicta voluptatum quo, mollitia dolore?
</Message>

