<script>
  import { afterUpdate } from 'svelte';
  
  import Icon from "./Icon.svelte";

  export let dir;
  export let selected_item = undefined;

  let breadcrumbs;

  $: selected_path = `${dir}/${selected_item !== undefined ? selected_item.name : ""}`;
  
  // export let items = [];
  export let items = [
    {type: "dir", name: "You did not tidy up, Vol. 1"},
    {type: "dir", name: "You did not tidy up, Vol. 2"},
    {type: "file", name: "01 Spooky Stories - Bed time is earlier today.mp3"},
    {type: "file", name: "02 Spooky Stories - We're out of milk.mp3"},
    {type: "dir", name: "Daddy did the cooking"},
    {type: "file", name: "README.md"},
    {type: "file", name: "Intro.mp3"},
  ];
  for (let i = 1; i < 100; i++) {
    items.push({type: "file", name: `${String(i).padStart(2, "0")} Foobar.baz`});
  }

  $: sorted_items = items.sort((a, b) => (a.name < b.name) ? 1 : -1).sort((a, b) => (a.type > b.type) ? 1 : -1); // First by name, than by type

  afterUpdate(() => {
		breadcrumbs.scrollLeft = breadcrumbs.scrollWidth;
	});

  function select_item(item) {
    if (item.type === "file") {
      selected_item = item;
    } else {
      selected_item = undefined;
      dir = `${dir}/${item.name}`;
    }
  }

  function go_up_dir(idx) {
    selected_item = undefined;
    dir = dir.split("/").slice(0, idx + 1).join("/");
  }
</script>


<div class="overflow-hidden bg-white border rounded-md border-zinc-100">
  
  <!-- Directory breadcrumbs -->
  <div class="px-2 bg-zinc-100">
    <div bind:this={breadcrumbs} class="flex h-12 overflow-hidden overflow-x-visible rounded-t-md sm:h-10 hide-scrollbars">
      <div class="flex items-center text-left whitespace-nowrap">
        <button class="px-2 sm:text-sm rounded-md cursor-pointer h-9 sm:h-7 {selected_item === undefined && dir === "" ? 'bg-orange-500 text-white' : 'hover:bg-zinc-200'}"
                on:click={() => go_up_dir(0)}>
          <Icon class="w-5 h-5" style="regular" name="sd-card" />
        </button>
        {#each dir.split("/") as part, idx}
          {#if part !== ""}
            <span class="w-4 text-center sm:text-sm">/</span>
            <button class="px-2 sm:text-sm rounded-md cursor-pointer h-9 sm:h-7 {selected_item === undefined && idx == dir.split('/').length - 1 ? 'bg-orange-500 text-white' : 'hover:bg-zinc-200'}"
                    on:click={() => go_up_dir(idx)}>{part}</button>
          {/if}
        {/each}
      </div>
    </div>
  </div>
  
  <!-- File list -->
  <ul class="pt-1 overflow-y-auto max-h-60 sm:max-h-96">
    {#if dir !== ""}
      <li class="flex items-center px-4 py-1 cursor-pointer h-9 sm:text-sm sm:h-7 hover:bg-zinc-100" on:click={() => go_up_dir(dir.split("/").length - 2)}>
        <Icon class="flex-shrink-0 w-5 h-5" style="regular" name="folder-up"} />
        <span class="ml-2 truncate">..</span>
      </li>
    {/if}
    {#each sorted_items as item}
      <li class="flex items-center px-4 py-1 h-9 sm:text-sm cursor-pointer sm:h-7 {selected_item == item ? 'bg-orange-500 hover:bg-orange-500 text-white' : 'hover:bg-zinc-100'}" on:click={() => select_item(item)}>
        <Icon class="flex-shrink-0 w-5 h-5" style="regular" name={item.type === "dir" ? "folder" : "file-audio"} />
        <span class="ml-2 truncate">{item.name}</span>
      </li>
    {/each}
  </ul>
</div>

<!-- TODO Delete -->

<div class="px-2 py-1 mt-3 space-y-2 font-mono text-xs border">
  <h4 class="font-bold">Debug</h4>
  <p>
    <span class="bg-orange-200">Selected path:</span> {selected_path}
  </p>
</div>