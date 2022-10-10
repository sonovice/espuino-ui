<script>
    import {_} from "svelte-i18n";
    import Icon from "../components/Icon.svelte";
    import FileViewer from "../components/FileViewer.svelte";
    import * as CONSTS from "../constants.js";
    import ToggleButtonOnOff from "../components/ToggleButtonOnOff.svelte";

    export let show;
    export let tag = {id: ""};

    let openedModalId = "";

    let selectedPath;
    let selectedAction;
    let webStreamUrl;

    let isStopAfterOneTrackToggled = false;
    let isShuffleToggled = false;
    let isRepeatToggled = false;
    let isSavePositionToggled = false;

    // TODO For tests only, remove
    tag = {id: "12345678", command: 12, pathOrUrl: "/music/short stories/"};
    // tag = {id: "12345678", command: 103};
    // tag = {id: "12345678"};
    // tag = {id: ""};

</script>

<div class="{show ? 'block' : 'hidden'} max-w-2xl mx-auto sm:h-fit">
  <div class="{$$props.class} relative overflow-hidden shadow sm:rounded-md bg-white sm:mx-4 h-full">
    <Icon name="nfc" style="solid" class="absolute w-40 -right-3 -top-3 text-zinc-50 -rotate-6 hidden sm:block"/>
    <div class="relative px-4 py-3 space-y-6">
      <div class="flex flex-col sm:flex-row w-full items-center">
        <div class="py-8 w-48 flex-shrink-0 flex flex-col items-center">
          {#if tag.id !== ""}
            <div class="flex h-24 w-24 relative">
              <Icon name="nfc" style="regular" class="absolute animate-ping h-full w-full text-green-300 opacity-75"/>
              <Icon name="nfc" style="regular" class="absolute h-full w-full text-green-400"/>
            </div>
          {:else}
            <Icon name="nfc-slash" style="regular" class="text-red-400 h-24"/>
          {/if}
        </div>

        <div class="flex flex-col items-center space-y-4 w-full">
          {#if tag.id !== ""}
            <div class="text-green-400 text-lg font-bold">Tag detected</div>
            <table class="text-sm w-full sm:w-fit">
              <tr>
                <th class="font-medium text-left w-1 align-text-top">ID:</th>
                <td class="pl-3 font-mono select-all">{tag.id}</td>
              </tr>
              <tr>
                <th class="font-medium text-left w-1 align-text-top">Assignment:</th>
                <td class="pl-3">
                  {#if "command" in tag && (tag.command in CONSTS.LOCAL_PLAY_MODES || tag.command in CONSTS.ACTIONS || tag.command in CONSTS.WEB_STREAM)}
                    {#if tag.command in CONSTS.LOCAL_PLAY_MODES}
                      {$_(CONSTS.LOCAL_PLAY_MODES[tag.command].i18n_key)}
                    {:else if tag.command in CONSTS.ACTIONS}
                      {$_(CONSTS.ACTIONS[tag.command].i18n_key)}
                    {:else if tag.command in CONSTS.WEB_STREAM}
                      {$_(CONSTS.WEB_STREAM[tag.command].i18n_key)}
                    {/if}
                  {:else}
                    {$_("tags.assignment_types.none")}
                  {/if}
                </td>
              </tr>
              {#if "pathOrUrl" in tag}
                <tr>
                  <th class="font-medium text-left w-1 align-text-top">
                    {#if tag.pathOrUrl.startsWith("/")}
                      Path:
                    {:else}
                      URL:
                    {/if}
                  </th>
                  <td class="pl-3 select-all" style="word-break: break-all;">{tag.pathOrUrl}</td>
                </tr>
              {/if}
            </table>
          {:else}
            <div class="text-red-400 text-lg font-bold">No Tag detected</div>
            <div class="text-sm">Please place a tag on the ESPuino.</div>
          {/if}
        </div>
      </div>
    </div>

    {#if tag.id}
      <div class="flex flex-col sm:flex-row gap-2 px-4 py-3 bg-zinc-50">
        <button class="button button-secondary w-full sm:py-8" on:click={() => openedModalId="explorer_1"}>
          Assign file or directory
        </button>
        <button class="button button-secondary w-full sm:py-8" on:click={() => openedModalId="stream"}>
          Assign web stream
        </button>
        <button class="button button-secondary w-full sm:py-8" on:click={() => openedModalId="action"}>
          Assign action
        </button>
        {#if "command" in tag}
          <button class="button button-warning w-full sm:py-8" on:click={() => openedModalId="remove"}>
            Remove assignment
          </button>
        {/if}
      </div>
    {/if}

  </div>
</div>

<!--MODALS-->
<!--File explorer-->
<div class="modal modal-bottom sm:modal-middle {openedModalId.startsWith('explorer') ? 'modal-open' : ''}">
  <div class="modal-box p-0 flex flex-col max-h-[85vh]">
    {#if openedModalId === "explorer_1"}
      <div class="font-medium px-4 py-4">
        Select file or directory
      </div>
      <FileViewer dir="/Music/Kids/Horror" extensions={["mp3", "m4a", "wav", "m3u"]} bind:selectedPath/>
      <div
          class="px-4 py-3 bg-zinc-100 flex flex-col-reverse gap-y-2 sm:flex-row sm:gap-x-2 sm:gap-y-0 sm:justify-end">
        <button class="button button-secondary" on:click={() => openedModalId=""}>Cancel</button>
        <button class="button button-primary" on:click={() => openedModalId="explorer_2"}>Select
          <Icon class="h-3 pl-2" style="solid" name="chevron-right"/>
        </button>
      </div>
    {:else if openedModalId === "explorer_2"}
      <div class="px-4 pt-4">
        <span class="font-medium">Select playback options</span>
        <div class="text-xs text-zinc-500">
          <span class="font-medium">Path: </span><span class="select-all font-mono truncated">{selectedPath}</span>
        </div>
      </div>


      <div class="px-4 py-3 space-y-2 sm:self-center w-full">
        {#if selectedPath && (selectedPath.endsWith("/") || selectedPath.endsWith(".m3u"))}
          <div class="flex flex-row text-sm w-full h-11 sm:h-9">
            <div class="flex flex-row items-center font-medium">
              <Icon class="mr-1 h-5 w-8 text-zinc-800" name="arrow-right-to-line" style="regular"/>
              <span class="w-24">Stop after one track:</span>
            </div>
            <ToggleButtonOnOff bind:isToggled={isStopAfterOneTrackToggled} isDisabled={isRepeatToggled}/>
          </div>
        {/if}

        {#if selectedPath && (selectedPath.endsWith("/") || selectedPath.endsWith(".m3u"))}
          <div class="flex flex-row text-sm w-full h-11 sm:h-9">
            <div class="flex flex-row items-center font-medium">
              <Icon class="mr-1 h-5 w-8 text-zinc-800" name="shuffle" style="regular"/>
              <span class="w-24">Shuffle:</span>
            </div>
            <ToggleButtonOnOff bind:isToggled={isShuffleToggled} isDisabled={isSavePositionToggled}/>
          </div>
        {/if}

        <div class="flex flex-row text-sm w-full h-11 sm:h-9">
          <div class="flex flex-row items-center font-medium">
            <Icon class="mr-1 h-5 w-8 text-zinc-800" name="repeat" style="regular"/>
            <span class="w-24">Repeat:</span>
          </div>
          <ToggleButtonOnOff bind:isToggled={isRepeatToggled} isDisabled={isStopAfterOneTrackToggled}/>
        </div>

        <div class="flex flex-row text-sm w-full h-11 sm:h-9">
          <div class="flex flex-row items-center font-medium">
            <Icon class="mr-1 h-5 w-8 text-zinc-800" name="book-bookmark" style="regular"/>
            <span class="w-24">Save position:</span>
          </div>
          <ToggleButtonOnOff bind:isToggled={isSavePositionToggled} isDisabled={isShuffleToggled}/>
        </div>
      </div>

      <div
          class="px-4 py-3 bg-zinc-100 flex flex-col-reverse gap-y-2 sm:flex-row sm:gap-x-2 sm:gap-y-0 sm:justify-end">
        <button class="button button-secondary" on:click={() => openedModalId=""}>Cancel</button>
        <button class="button button-secondary" on:click={() => openedModalId="explorer_1"}>
          <Icon class="h-3 pr-2" style="solid" name="chevron-left"/>
          Back
        </button>
        <button class="button button-primary" on:click={() => openedModalId=""}>Assign</button>
      </div>
    {/if}
  </div>
</div>

<!--Web stream-->
<div class="modal modal-bottom sm:modal-middle {openedModalId === 'stream' ? 'modal-open' : ''}">
  <div class="modal-box p-0 flex flex-col max-h-[85vh]">
    <div class="font-medium px-4 py-4">
      Enter web stream URL
    </div>
    <div class="px-4 pb-4">
      <input type="text" name="url" id="url"
             class="block w-full rounded-md border-zinc-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
             placeholder="https://"
             bind:value={webStreamUrl}
      >
    </div>
    <div
        class="px-4 py-3 bg-zinc-100 flex flex-col-reverse gap-y-2 sm:flex-row sm:gap-x-2 sm:gap-y-0 sm:justify-end">
      <button class="button button-secondary" on:click={() => openedModalId=""}>Cancel</button>
      <button class="button button-primary" on:click={() => openedModalId=""}>Assign</button>
    </div>
  </div>
</div>

<!--Action-->
<div class="modal modal-bottom sm:modal-middle {openedModalId === 'action' ? 'modal-open' : ''}">
  <div class="modal-box p-0 flex flex-col max-h-[85vh]">
    <div class="relative font-medium px-4 py-4">
      Select action
    </div>
    <ul class="overflow-y-auto">
      {#each CONSTS.ACTION_CATEGORIES as category_obj}
        <div
            class="bg-zinc-100 font-semibold text-xs uppercase tracking-wider text-zinc-700 px-4 py-1">{category_obj.name}</div>
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
        class="px-4 py-3 bg-zinc-100 flex flex-col-reverse gap-y-2 sm:flex-row sm:gap-x-2 sm:gap-y-0 sm:justify-end">
      <button class="button button-secondary" on:click={() => openedModalId=""}>Cancel</button>
      <button class="button button-primary" on:click={() => openedModalId=""}>Assign</button>
    </div>
  </div>
</div>

<!--Remove-->
<div class="modal modal-bottom sm:modal-middle {openedModalId === 'remove' ? 'modal-open' : ''}">
  <div class="modal-box p-0 flex flex-col max-h-[85vh]">
    <div class="relative font-medium px-4 py-4">
      Do you really want to remove this tag's assignment?
    </div>
    <div class="px-8 pb-2">
      <table class="text-sm w-full sm:w-fit">
        <tr>
          <th class="font-medium text-left w-1 align-text-top">ID:</th>
          <td class="pl-3 font-mono select-all">{tag.id}</td>
        </tr>
        <tr>
          <th class="font-medium text-left w-1 align-text-top">Assignment:</th>
          <td class="pl-3">
            {#if "command" in tag && (tag.command in CONSTS.LOCAL_PLAY_MODES || tag.command in CONSTS.ACTIONS || tag.command in CONSTS.WEB_STREAM)}
              {#if tag.command in CONSTS.LOCAL_PLAY_MODES}
                {$_(CONSTS.LOCAL_PLAY_MODES[tag.command].i18n_key)}
              {:else if tag.command in CONSTS.ACTIONS}
                {$_(CONSTS.ACTIONS[tag.command].i18n_key)}
              {:else if tag.command in CONSTS.WEB_STREAM}
                {$_(CONSTS.WEB_STREAM[tag.command].i18n_key)}
              {/if}
            {:else}
              {$_("tags.assignment_types.none")}
            {/if}
          </td>
        </tr>
        {#if "pathOrUrl" in tag}
          <tr>
            <th class="font-medium text-left w-1 align-text-top">
              {#if tag.pathOrUrl.startsWith("/")}
                Path:
              {:else}
                URL:
              {/if}
            </th>
            <td class="pl-3 select-all" style="word-break: break-all;">{tag.pathOrUrl}</td>
          </tr>
        {/if}
      </table>
    </div>
    <div
        class="px-4 py-3 bg-zinc-100 flex flex-col-reverse gap-y-2 sm:flex-row sm:gap-x-2 sm:gap-y-0 sm:justify-end">
      <button class="button button-secondary" on:click={() => openedModalId=""}>Cancel</button>
      <button class="button button-warning" on:click={() => openedModalId=""}>Remove</button>
    </div>
  </div>
</div>