<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  
  export let name;
  export let description;
  export let buttonText;
  export let buttonClass;

  function on_click() {
    dispatch("click");
  }
</script>

<div class="items-center justify-between sm:flex sm:flex-row">
  <div class="max-w-[40rem]">
    <h4 class="text-sm font-medium text-zinc-700">{name}</h4>
    <p class="text-sm text-gray-500">{description}</p>
  </div>

  <div class="text-right">
    <div class="items-center mt-1 sm:mt-0 sm:ml-6">
      <button class="{buttonClass} w-24" on:click={on_click}>{buttonText}</button>
    </div>
  </div>
</div>
