<script lang="ts">
  import { toggle_truncate } from '$lib/utils'


  export let toggle:boolean =true;
  export let color="bg-white";
  // export let class="";
</script>

  <p  on:click={toggle?toggle_truncate:null}
      on:keypress={toggle?toggle_truncate:null}
      class="max-h-sm px-2 border border-black {color} rounded-md {$$props.class||''}"
      class:truncate="{toggle}">
    <slot></slot>
  </p>


