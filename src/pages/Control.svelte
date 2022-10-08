<script>
    import {_} from "svelte-i18n";

    import Icon from "../components/Icon.svelte";
    import SettingRange from "../components/SettingRange.svelte";

    export let show;

    let volume = 20;
    let brightness = 55;
</script>

<div class="{show ? 'block' : 'hidden'} max-w-3xl mx-auto space-y-6">
  <div class="relative overflow-hidden shadow-md sm:rounded-md sm:mx-4">
    <Icon name="music" style="solid" class="absolute hidden w-32 sm:block -right-1 -top-3 text-zinc-50 -rotate-6"/>
    <div class="flex flex-col items-center bg-white sm:items-stretch sm:flex-row">
      <div class="relative object-contain mx-4 mt-4 overflow-hidden rounded-md shadow-md sm:mx-0 sm:mt-0 sm:rounded-none sm:shadow-none">
        <img class="max-h-64 sm:max-h-96"
             alt="Album cover"
             src="https://images.unsplash.com/photo-1509781827353-fb95c262fc40?auto=format&fit=crop&w=500&h=500&q=80"
        />
      </div>
      <div class="relative flex flex-col justify-between w-full">
        <div class="mx-4 my-4 sm:mx-6">
          <div class="text-lg font-medium sm:text-xl">The Kids Aren't Alright</div>
          <div class="text-md">The Offspring</div>
        </div>
        <div class="flex flex-row items-center justify-around h-24 px-[5%] bg-zinc-50">
          <button
              class="p-2 rounded-full text-zinc-500 hover:text-zinc-600 focus:ring-4 focus:ring-zinc-500 focus:outline-none focus:ring-offset-2 focus:ring-offset-zinc-50">
            <Icon class="h-7 w-7" name="backward-fast" style="solid"/>
          </button>
          <button
              class="p-2 rounded-full text-zinc-500 hover:text-zinc-600 focus:ring-4 focus:ring-zinc-500 focus:outline-none focus:ring-offset-2 focus:ring-offset-zinc-50">
            <Icon class="h-7 w-7" name="backward-step" style="solid"/>
          </button>
          <button
              class="p-0 text-white rounded-full focus:ring-4 focus:ring-orange-500 focus:outline-none focus:ring-offset-1 focus:ring-offset-zinc-50">
            <div class="flex items-center justify-center w-16 h-16 bg-orange-500 rounded-full hover:bg-orange-600">
              <Icon class="h-10 w-10" name="pause" style="solid"/>
            </div>
          </button>
          <button
              class="p-2 rounded-full text-zinc-500 hover:text-zinc-600 focus:ring-4 focus:ring-zinc-500 focus:outline-none focus:ring-offset-2 focus:ring-offset-zinc-50">
            <Icon class="h-7 w-7" name="forward-step" style="solid"/>
          </button>
          <button
              class="p-2 rounded-full text-zinc-500 hover:text-zinc-600 focus:ring-4 focus:ring-zinc-500 focus:outline-none focus:ring-offset-2 focus:ring-offset-zinc-50">
            <Icon class="h-7 w-7" name="forward-fast" style="solid"/>
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="relative overflow-hidden bg-white shadow-md sm:rounded-md sm:mx-4">
    <Icon name="sliders" style="solid"
          class="absolute hidden w-32 sm:block -right-1 -top-3 text-zinc-50 -rotate-6"/>
    <div class="relative px-4 py-5 space-y-6">
      <SettingRange text="Volume" bind:value={volume} icon="volume" step="5" unit="%"/>
      <SettingRange text="LED brightness" bind:value={brightness} icon="brightness" unit="%"/>
    </div>
  </div>
</div>
