<script>
    import {_} from "svelte-i18n";
    import Icon from "../components/Icon.svelte";
    import * as CONSTS from "../constants.js";

    export let isOpened = false;
    export let selectedAction;
</script>

<div class="modal modal-bottom sm:modal-middle {isOpened ? 'modal-open' : ''}">
  <div class="modal-box p-0 flex flex-col max-h-[85vh]">
    <div class="relative font-medium px-4 py-4">
      Select action
    </div>
    <ul class="overflow-y-auto">
      {#each CONSTS.ACTION_CATEGORIES as category_obj}
        <div
            class="bg-zinc-100 font-semibold text-xs uppercase tracking-wider text-zinc-700 px-4 py-1">{$_(category_obj.i18n_key)}</div>
        {#each Object.entries(CONSTS.ACTIONS).sort((a, b) => (a[1].sorting > b[1].sorting ? 1 : -1)) as [key, values]}
          {#if values.category === category_obj.category}
            <li class="flex items-center pl-6 pr-4 py-1 h-9 sm:text-sm cursor-pointer sm:h-7 {selectedAction === key ? 'bg-orange-500 hover:bg-orange-500 text-white' : 'hover:bg-zinc-100'}"
                on:click={() => selectedAction=key}>
              <div class="w-6 flex flex-col items-center">
                <Icon class="flex-shrink-0 h-5" style="regular" name={values.icon}/>
              </div>
              <span class="ml-3 truncate">{$_(values.i18n_key)}</span>
            </li>
          {/if}
        {/each}
      {/each}
    </ul>
    <div
        class="px-4 py-3 bg-zinc-100 flex flex-row gap-x-2 sm:justify-end">
      <button class="button button-secondary w-full sm:w-fit" on:click={() => isOpened=false}>Cancel</button>
      <button class="button button-primary w-full sm:w-fit" on:click={() => isOpened=false}>Assign</button>
    </div>
  </div>
</div>