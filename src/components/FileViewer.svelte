<script>
    import {afterUpdate} from 'svelte';
    import Icon from "./Icon.svelte";

    export let dir;
    export let selectedItem = undefined;
    export let selectedPath;

    export let extensions = []

    let breadcrumbs;

    $: selectedPath = `${dir}/${selectedItem !== undefined ? selectedItem.name : ""}`;

    const ICONS = {
        mp3: "file-audio",
        wav: "file-audio",
        m4a: "file-audio",
        m3u: "file-lines",
    }

    export let items = [];
    // TODO remove
    items = [
        {type: "dir", name: "You did not tidy up, Vol. 1"},
        {type: "dir", name: "You did not tidy up, Vol. 2"},
        {type: "file", name: "01 Spooky Stories - Bed time is earlier today.mp3"},
        {type: "file", name: "02 Spooky Stories - We're out of milk.mp3"},
        {type: "dir", name: "Daddy did the cooking"},
        {type: "file", name: "README.md"},
        {type: "file", name: "no_extension"},
        {type: "file", name: "multiple.ext.ens.ions.wav"},
        {type: "file", name: "multiple.ext.ens.ions"},
        {type: "file", name: "Intro.mp3"},
        {type: "file", name: "Playlist.m3u"},
    ];
    for (let i = 1; i < 50; i++) {
        items.push({type: "file", name: `${String(i).padStart(2, "0")} Foobar.mp3`});
    }

    $: sortedItems = items.sort((a, b) => (a.name < b.name) ? 1 : -1).sort((a, b) => (a.type > b.type) ? 1 : -1); // First by name, than by type

    afterUpdate(() => {
        breadcrumbs.scrollLeft = breadcrumbs.scrollWidth;
    });

    function selectItem(item) {
        if (item.type === "file") {
            selectedItem = item;
        } else {
            selectedItem = undefined;
            dir = `${dir}/${item.name}`;
        }
    }

    function goUpDirectory(idx) {
        selectedItem = undefined;
        dir = dir.split("/").slice(0, idx + 1).join("/");
    }
</script>


<div class="overflow-hidden bg-white flex flex-col">

  <!-- Directory breadcrumbs -->
  <div class="px-2 bg-zinc-100">
    <div bind:this={breadcrumbs}
         class="flex h-12 overflow-hidden overflow-x-visible rounded-t-md sm:h-10 hide-scrollbars">
      <div class="flex items-center text-left whitespace-nowrap">
        <button
            class="px-2 sm:text-sm rounded-md cursor-pointer h-9 sm:h-7 {selectedItem === undefined && dir === '' ? 'bg-orange-500 text-white' : 'hover:bg-zinc-200'}"
            on:click={() => goUpDirectory(0)}>
          <Icon class="w-5 h-5" style="regular" name="sd-card"/>
        </button>
        {#each dir.split("/") as part, idx}
          {#if part !== ""}
            <span class="w-4 text-center sm:text-sm">/</span>
            <button
                class="px-2 sm:text-sm rounded-md cursor-pointer h-9 sm:h-7 {selectedItem === undefined && idx == dir.split('/').length - 1 ? 'bg-orange-500 text-white' : 'hover:bg-zinc-200'}"
                on:click={() => goUpDirectory(idx)}>{part}
            </button>
          {/if}
        {/each}
      </div>
    </div>
  </div>

  <!-- File list -->
  <!--  <ul class="pt-1 overflow-y-auto max-h-60 sm:max-h-96">-->
  <ul class="pt-1 overflow-y-auto">
    {#if dir !== ""}
      <li class="flex items-center px-4 py-1 cursor-pointer h-9 sm:text-sm sm:h-7 hover:bg-zinc-100"
          on:click={() => goUpDirectory(dir.split("/").length - 2)}>
        <Icon class="flex-shrink-0 w-5 h-5" style="regular" name="folder-up" }/>
        <span class="ml-2 truncate">..</span>
      </li>
    {/if}
    {#each sortedItems as item}
      {#if item.type === "dir" || extensions.length == 0 || extensions.includes(item.name.split(".").pop().toLowerCase())}
        <li class="flex items-center px-4 py-1 h-9 sm:text-sm cursor-pointer sm:h-7 {selectedItem == item ? 'bg-orange-500 hover:bg-orange-500 text-white' : 'hover:bg-zinc-100'}"
            on:click={() => selectItem(item)}>
          <Icon class="flex-shrink-0 w-5 h-5" style="regular" name={item.type === "dir" ? "folder" : ICONS[item.name.split(".").pop()]}/>
          <span class="ml-2 truncate">{item.name}</span>
        </li>
      {/if}
    {/each}
  </ul>
</div>

<!-- TODO Debug only -->
<!--<div class="px-2 py-1 mt-3 space-y-2 font-mono text-xs border">-->
<!--  <h4 class="font-bold">Debug</h4>-->
<!--  <p>-->
<!--    <span class="bg-orange-200">Selected path:</span> {selectedPath}-->
<!--  </p>-->
<!--</div>-->