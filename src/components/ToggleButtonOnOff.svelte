<script>
    import {_} from "svelte-i18n";

    export let isDisabled = false;
    export let isToggled = false;

    $: isToggled = isToggled && !isDisabled;
</script>

<button class="relative flex flex-row w-full ml-3 w-full tracking-wider uppercase h-full rounded-md overflow-hidden bg-zinc-100 hover:bg-zinc-200 transition duration-150 transition-opacity {isDisabled ? 'opacity-30 cursor-default' : 'opacity-100 cursor-pointer'}"
        on:click={() => {if (!isDisabled) isToggled = !isToggled}}>
  <div class="absolute w-1/2 h-full bg-orange-500 rounded-md transition duration-150 ease-in-out translate {isToggled ? 'translate-x-[100%]' : ''}"></div>
  <div class="relative flex items-center justify-center w-full h-full {isToggled && !isDisabled ? 'uppercase text-zinc-400 hover' : 'font-bold text-white'}">
    {$_("common.off")}
  </div>
  <div class="relative flex items-center justify-center w-full h-full {isToggled ? 'font-bold text-white' : 'uppercase text-zinc-400'}">
    {$_("common.on")}
  </div>
</button>