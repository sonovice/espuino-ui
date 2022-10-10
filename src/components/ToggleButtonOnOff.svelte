<script>
    import {_} from "svelte-i18n";
    export let isToggled = false;
</script>

<button class="cursor-pointer flex flex-row w-full ml-3 w-full tracking-wider uppercase h-full">
  <div on:click={() => isToggled = false}
       class="flex items-center justify-center w-full h-full rounded-l-md
              {isToggled ? 'border-l border-y border-zinc-400 bg-zinc-100 uppercase text-zinc-400' : 'border border-orange-500 bg-orange-500 font-bold text-white'}"
  >
    {$_("common.off")}
  </div>
  <div on:click={() => isToggled = true}
       class="flex items-center justify-center w-full h-full rounded-r-md
              {isToggled ? 'border border-orange-500 bg-orange-500 font-bold text-white' : 'border-r border-y border-zinc-400 bg-zinc-100 uppercase text-zinc-400'}"
  >
    {$_("common.on")}
  </div>
</button>