<script>
    import { update_await_block_branch } from "svelte/internal";
  import Icon from "./Icon.svelte";

  export let path;
  
  let selected_item = undefined;
  
  // let items = [];
  let items = [
    {type: "dir", name: "You did not tidy up, Vol. 1"},
    {type: "dir", name: "You did not tidy up, Vol. 2"},
    {type: "file", name: "01 Spooky Stories - Bed time is earlier today.mp3"},
    {type: "file", name: "02 Spooky Stories - We're out of milk.mp3"},
    {type: "dir", name: "Daddy did the cooking"},
    {type: "file", name: "README.md"},
    {type: "file", name: "Intro.mp3"},
  ];

  $: sorted_items = items.sort((a, b) => (a.name < b.name) ? 1 : -1).sort((a, b) => (a.type > b.type) ? 1 : -1); // First by name, than by type

  function select(item) {
    if (item.type === "file") {
      selected_item = item.name;
    } else {
      selected_item = undefined;
      path = `${path}/${item.name}`;
    }
  }

  function change_path(idx) {
    selected_item = undefined;
    path = path.split("/").slice(0, idx + 1).join("/");
  }
</script>

<!-- TODO Find better solution for right aligning the path bar than direction: rtl; -->
<div>
  <div class="flex" style="direction: rtl;">
    <div class="w-full flex-grow-1"></div>
    <div class="flex items-center py-1 text-left gap-x-2 whitespace-nowrap" style="direction: ltr;">
      {#each path.split("/") as part, idx}
        {#if part !== ""}
          <span class="w-5 text-center sm:text-sm">/</span>
          <span class="py-1 px-2 sm:text-sm rounded-md cursor-pointer h-9 sm:h-7 {selected_item === undefined && idx == path.split('/').length - 1? 'bg-orange-500 text-white' : 'hover:bg-zinc-100'}" on:click={() => change_path(idx)}>{part}</span>
        {/if}
      {/each}
    </div>
  </div>
  <ul class="">
    {#each sorted_items as item}
      <li class="flex items-center px-2 py-1 h-9 sm:text-sm cursor-pointer sm:rounded-md sm:h-7 {selected_item === item.name ? 'bg-orange-500 hover:bg-orange-500 text-white' : 'hover:bg-zinc-100'}" on:click={() => select(item)}>
        <Icon class="flex-shrink-0 w-5 h-5" style="regular" name={item.type === "dir" ? "folder" : "file-audio"} />
        <span class="ml-2 truncate">{item.name}</span>
      </li>
    {/each}
  </ul>
</div>


<!-- 
TreeView:
https://svelte.dev/repl/a3f724e24df54b9695402576ffd68fe3?version=3.50.1
https://svelte.dev/repl/eca6f6392e294247b4f379fde3069274?version=3.46.6
https://vuetifyjs.com/en/components/treeview/#search-and-filter
 -->