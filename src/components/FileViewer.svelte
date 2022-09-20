<script>
  import Icon from "./Icon.svelte";

  export let dir;
  export let selected_item = undefined;

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

  $: sorted_items = items.sort((a, b) => (a.name < b.name) ? 1 : -1).sort((a, b) => (a.type > b.type) ? 1 : -1); // First by name, than by type

  function select_item(item) {
    if (item.type === "file") {
      selected_item = item;
    } else {
      selected_item = undefined;
      dir = `${dir}/${item.name}`;
    }
  }

  function change_dir(idx) {
    selected_item = undefined;
    dir = dir.split("/").slice(0, idx + 1).join("/");
  }
</script>


<div class="">
  <div class="flex overflow-hidden" style="direction: rtl;">
    <div class="w-full"></div>
    <!-- TODO What happens, if the folder name is to wide for a mobile screen? Need for a "back" button -->
    <div class="flex items-center text-left whitespace-nowrap" style="direction: ltr;">
      {#each dir.split("/") as part, idx}
        {#if part !== ""}
          <span class="w-5 text-center sm:text-sm">/</span>
          <button class="px-2 sm:text-sm rounded-md cursor-pointer h-9 sm:h-7 {selected_item === undefined && idx == dir.split('/').length - 1? 'bg-orange-500 text-white' : 'hover:bg-zinc-100'}"
                on:click={() => change_dir(idx)}>{part}</button>
        {/if}
      {/each}
    </div>
  </div>
  
  <!-- Divider -->
  <div class="py-2 divide-y divide-zinc-200">
    <div />
    <div />
  </div>

  <ul>
    {#each sorted_items as item}
      <li class="flex items-center px-2 py-1 h-9 sm:text-sm cursor-pointer sm:rounded-md sm:h-7 {selected_item == item ? 'bg-orange-500 hover:bg-orange-500 text-white' : 'hover:bg-zinc-100'}" on:click={() => select_item(item)}>
        <Icon class="flex-shrink-0 w-5 h-5" style="regular" name={item.type === "dir" ? "folder" : "file-audio"} />
        <span class="ml-2 truncate">{item.name}</span>
      </li>
    {/each}
  </ul>
</div>

<div class="px-2 mt-3">
  {selected_path}
</div>