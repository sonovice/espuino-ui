<script>
  import { createEventDispatcher } from 'svelte';
  import Icon from './Icon.svelte';


  export let page;
  export let navigationPages

  const dispatch = createEventDispatcher();

  function changePage(page) {
    dispatch('changePage', page);
  }
</script>

<div class="sticky bottom-0 left-0 right-0 h-14 md:hidden bg-zinc-800">
  <nav class="flex items-center mx-auto overflow-x-auto max-w-7xl flex-nowrap overscroll-x-none">
    {#each navigationPages as [id, name, icon]}
      <button class="flex-auto flex flex-col items-center w-28 shrink-0 text-sm font-medium px-3 pt-2 pb-1
                      {page === id
                        ? 'bg-zinc-900 text-white'
                        : 'text-zinc-300 hover:bg-zinc-700 hover:text-white'}"
              on:click={() => changePage(id)}
      >
        <Icon name={icon} style="solid" class="w-5 h-5 mb-1" />
        <span>{name}</span>
      </button>
    {/each}
  </nav>
</div>

<!-- <div class="sticky bottom-0 left-0 right-0 h-14 md:hidden bg-zinc-800">
  <nav class="grid items-center grid-flow-col mx-auto overflow-x-auto auto-cols-auto max-w-7xl flex-nowrap overscroll-x-none">
    {#each navigationPages as [id, name, icon]}
      <button class="flex-auto flex flex-col items-center shrink-0 grow text-sm font-medium px-2 pt-2 pb-1
                      {page === id
                        ? 'bg-zinc-900 text-white'
                        : 'text-zinc-300 hover:bg-zinc-700 hover:text-white'}"
              on:click={() => changePage(id)}
      >
        <Icon name={icon} style="solid" class="w-5 h-5 mb-1" />
        <span>{name}</span>
      </button>
    {/each}
  </nav>
</div> -->