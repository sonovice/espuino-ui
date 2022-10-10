<script>
    import {createEventDispatcher} from "svelte";
    import Icon from "./Icon.svelte";

    const dispatch = createEventDispatcher();

    export let toggled = false;
    export let text = "";
    export let icon = undefined;

    function on_toggle() {
        toggled = !toggled;
        dispatch("toggle");
    }
</script>

<div class="flex items-center">
  <button type="button" class="relative inline-flex flex-shrink-0 h-7 sm:h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer w-12 sm:w-11 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 {toggled ? 'bg-orange-500' : 'bg-zinc-200'}" role="switch" on:click={on_toggle}>
    <span class="inline-block w-6 h-6 sm:w-5 sm:h-5 transition duration-200 ease-in-out transform  bg-white rounded-full shadow pointer-events-none ring-0 {toggled ? 'translate-x-5' : 'translage-x-0'}"></span>
  </button>
  <div class="ml-3 flex flex-row">
    {#if icon}
      <Icon class="mr-2 h-5 mx-auto text-zinc-800" name={icon} style="regular"/>
    {/if}
    <span class="text-sm font-medium text-zinc-900" id="annual-billing-label">{text}
  </span>
  </div>
</div>