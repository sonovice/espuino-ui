<script>
  import { createEventDispatcher } from 'svelte';
  import Icon from './Icon.svelte';


  export let page;
  export let navigationPages;
  export let isConnected;
  export let batteryLevel;

  const dispatch = createEventDispatcher();

  function changePage(page) {
    dispatch('changePage', page);
  }
</script>

<div class="sticky top-0 z-50 shadow-lg bg-zinc-800 text-white">
  <div class="max-w-5xl px-4 mx-auto">
    <div class="flex items-center justify-between h-12 lg:h-16">
      <div class="flex items-center">
        <div class="flex items-center flex-shrink-0">
          <svg class="w-10 h-10 pr-1 text-orange-500" viewBox="0 0 15 14" stroke="none" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.5 4a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 1 0v1a.5.5 0 0 1-.5.5Zm0 8a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 1 0v1a.5.5 0 0 1-.5.5Z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M11 11.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1 0-1h8a.5.5 0 0 1 .5.5Z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 12a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 1 0v9a.5.5 0 0 1-.5.5Z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M2 2.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5Z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2a.5.5 0 0 1 .5-.5Z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2a.5.5 0 0 1 .5-.5Zm4 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2a.5.5 0 0 1 .5-.5Zm-2 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2a.5.5 0 0 1 .5-.5ZM3 4.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5Zm0 5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5ZM3 7a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 7Zm1.5 4a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2a.5.5 0 0 1 .5-.5Zm4 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2a.5.5 0 0 1 .5-.5Zm-2 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2a.5.5 0 0 1 .5-.5Zm2.224-6.947A.5.5 0 0 1 9 4.5v5a.5.5 0 0 1-.8.4L6.333 8.5H4.5A.5.5 0 0 1 4 8V6a.5.5 0 0 1 .5-.5h1.833L8.2 4.1a.5.5 0 0 1 .524-.047ZM8 5.5l-1.2.9a.5.5 0 0 1-.3.1H5v1h1.5a.5.5 0 0 1 .3.1l1.2.9v-3Zm2.146-.354a.5.5 0 0 1 .708 0c.306.307.67.848.777 1.511.113.694-.062 1.481-.777 2.197a.5.5 0 0 1-.708-.708c.485-.484.56-.947.498-1.328a1.871 1.871 0 0 0-.498-.964.5.5 0 0 1 0-.708Z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M11.646 3.146a.5.5 0 0 1 .708 0c.64.64 1.402 1.781 1.627 3.161.23 1.41-.112 3.031-1.627 4.547a.5.5 0 0 1-.708-.708c1.285-1.284 1.527-2.58 1.348-3.678-.184-1.129-.82-2.088-1.348-2.614a.5.5 0 0 1 0-.708Z" /></svg>
          <span class="text-xl">ESPuino</span>
        </div>
        <nav class="hidden sm:ml-4 lg:ml-6 md:block">
          <div class="flex space-x-2 lg:space-x-4">
            {#each navigationPages as [id, name, icon]}
              <button class="flex items-center text-sm font-medium px-3 py-2 rounded-md
                             {page === id
                               ? 'bg-zinc-900 text-white'
                               : 'text-zinc-300 hover:bg-zinc-700 hover:text-white'}"
                      on:click={() => changePage(id)}
              >
                <Icon name={icon} style="solid" class="w-5 h-5 mr-2 align-middle" />
                {name}
              </button>
            {/each}
          </div>
        </nav>
      </div>

      <div class="block sm:ml-2">
        <div class="flex items-center">
          <!-- Battery level -->
          <Icon name="battery-half" style="regular" class="w-5 sm:w-6"/>
          <span class="ml-1 text-xs">{batteryLevel}%</span>


          <!-- Heart beat (connection indicator) -->
          <span class="ml-2 flex w-2 h-2 relative">
            {#if isConnected}
              <span class="animate-ping absolute h-full w-full rounded-full bg-green-300 opacity-75"></span>
              <span class="absolute inline-flex rounded-full h-2 w-2 bg-green-400"></span>
            {:else}
              <span class="absolute inline-flex rounded-full h-2 w-2 bg-red-400"></span>
            {/if}
          </span>
        </div>
      </div>

    </div>
  </div>
</div>