<!-- <script>
import { onMount, onDestroy } from 'svelte';

export let eventSource;
export let data = "Hello world!"

// onMount(async () => {
//   const res = await fetch('/api/data');
//   data = await res.json();

//   console.log(data);
// });


onMount(() => {
  eventSource = new EventSource('/api/data');
  console.log("onMount");
  eventSource.onmessage = function (event) {
    console.log("event:", event);
    data = event.data;
  };
});

// onDestroy(() => {
//   eventSource.close();
// });
</script>

<h1>Data:</h1>
<p>{data}</p> -->