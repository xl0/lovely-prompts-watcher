<script lang="ts">
  import { toggle_truncate } from '$lib/utils'

  export let text = "Title Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, autem commodi officia, numquam libero quam esse perferendis necessitatibus illo voluptate nobis quae fugit dicta voluptatum quo, mollitia dolore?"
  export let toggle:boolean =true;
  export let color="white";
  // export let class="";
</script>

  <p  on:click={toggle?toggle_truncate:null}
      on:keypress={toggle?toggle_truncate:null}
      class="max-h-sm px-2 mx-2 border border-black bg-{color} rounded-md {$$props.class}"
      class:truncate="{toggle}">
    {text}
  </p>


