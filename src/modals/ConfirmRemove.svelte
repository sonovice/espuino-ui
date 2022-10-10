<script>
    import {_} from "svelte-i18n";
    import * as CONSTS from "../constants.js";

    export let isOpened = false;
    export let currentTag;
</script>

<div class="modal modal-bottom sm:modal-middle {isOpened ? 'modal-open' : ''}">
  <div class="modal-box p-0 flex flex-col max-h-[85vh]">
    <div class="relative font-medium px-4 py-4">
      Do you really want to remove this tag's assignment?
    </div>
    <div class="px-8 pb-2">
      <table class="text-sm w-full sm:w-fit">
        <tr>
          <th class="font-medium text-left w-1 align-text-top">ID:</th>
          <td class="pl-3 font-mono select-all">{currentTag.id}</td>
        </tr>
        <tr>
          <th class="font-medium text-left w-1 align-text-top">Assignment:</th>
          <td class="pl-3">
            {#if "command" in currentTag && (currentTag.command in CONSTS.LOCAL_PLAY_MODES || currentTag.command in CONSTS.ACTIONS || currentTag.command in CONSTS.WEB_STREAM)}
              {#if currentTag.command in CONSTS.LOCAL_PLAY_MODES}
                {$_(CONSTS.LOCAL_PLAY_MODES[currentTag.command].i18n_key)}
              {:else if currentTag.command in CONSTS.ACTIONS}
                {$_(CONSTS.ACTIONS[currentTag.command].i18n_key)}
              {:else if currentTag.command in CONSTS.WEB_STREAM}
                {$_(CONSTS.WEB_STREAM[currentTag.command].i18n_key)}
              {/if}
            {:else}
              {$_("tags.assignment_types.none")}
            {/if}
          </td>
        </tr>
        {#if "pathOrUrl" in currentTag}
          <tr>
            <th class="font-medium text-left w-1 align-text-top">
              {#if currentTag.pathOrUrl.startsWith("/")}
                Path:
              {:else}
                URL:
              {/if}
            </th>
            <td class="pl-3 select-all break-all select-all">{currentTag.pathOrUrl}</td>
          </tr>
        {/if}
      </table>
    </div>
    <div
        class="px-4 py-3 bg-zinc-100 flex flex-row gap-x-2 sm:gap-x-2 sm:gap-y-0 sm:justify-end">
      <button class="button button-secondary w-full" on:click={() => isOpened=false}>Cancel</button>
      <button class="button button-warning w-full" on:click={() => isOpened=false}>Remove</button>
    </div>
  </div>
</div>