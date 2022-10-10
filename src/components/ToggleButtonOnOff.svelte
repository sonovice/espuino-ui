<script>
    import {_} from "svelte-i18n";
    export let isDisabled = false;
    export let isToggled = false;

    let isHovered = false;

    $: isToggled = isToggled && !isDisabled;

</script>

<button class="cursor-default relative flex flex-row w-full ml-3 w-full tracking-wider uppercase h-full rounded-md overflow-hidden
              {isHovered ? 'bg-zinc-200' : 'bg-zinc-100'}
              {isDisabled ? 'opacity-30' : 'opacity-100'} transition duration-150 transition-opacity">
  <div class="absolute w-[50%] h-full bg-orange-500 rounded-md transition duration-150 ease-in-out translate {isToggled ? 'translate-x-[100%]' : ''}"></div>
  <div class="z-0 flex items-center justify-center w-full h-full
              {isToggled && !isDisabled ? 'uppercase text-zinc-400 hover' : 'font-bold text-white'}
              {isHovered ? 'cursor-pointer' : ''}"
       on:click={() => {if (!isDisabled) isToggled = false; isHovered = false}}
       on:mousemove={() => isHovered = isToggled && !isDisabled}
       on:mouseleave={() => isHovered = false}
  >
    {$_("common.off")}
  </div>
  <div class="z-0 flex items-center justify-center w-full h-full
              {isToggled ? 'font-bold text-white' : 'uppercase text-zinc-400'}
              {isHovered ? 'cursor-pointer' : ''}"
       on:click={() => {if (!isDisabled) isToggled = true; isHovered = false}}
       on:mousemove={() => isHovered = !isToggled && !isDisabled}
       on:mouseleave={() => isHovered = false}
  >
    {$_("common.on")}
  </div>
</button>