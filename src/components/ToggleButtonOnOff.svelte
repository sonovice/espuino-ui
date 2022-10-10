<script>
    import {_} from "svelte-i18n";
    export let isDisabled = false;
    export let isToggled = false;

    $: isToggled = isToggled && !isDisabled;

</script>

<button class="relative cursor-pointer flex flex-row w-full ml-3 w-full tracking-wider uppercase h-full overflow-hidden">
  <div class="cursor-default absolute w-full h-full z-10 bg-zinc-100 opacity-80 rounded overflow-hidden {isDisabled ? 'block' : 'hidden'}"></div>
  <div on:click={() => {if (!isDisabled) isToggled = false}}
       class="flex items-center justify-center w-full h-full rounded-l-md
              {isToggled ? 'border-l border-y border-zinc-300 bg-zinc-100 uppercase text-zinc-400' : 'border border-orange-500 bg-orange-500 font-bold text-white'}"
  >
    {$_("common.off")}
  </div>
  <div on:click={() => {if (!isDisabled) isToggled = true}}
       class="flex items-center justify-center w-full h-full rounded-r-md
              {isToggled ? 'border border-orange-500 bg-orange-500 font-bold text-white' : 'border-r border-y border-zinc-300 bg-zinc-100 uppercase text-zinc-400'}"
  >
    {$_("common.on")}
  </div>
</button>