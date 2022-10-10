<script>
    import {_} from "svelte-i18n";
    import Icon from "../components/Icon.svelte";
    import * as CONSTS from "../constants.js";
    import SelectPath from "../modals/SelectPath.svelte";
    import WebStream from "../modals/WebStream.svelte";
    import SelectAction from "../modals/SelectAction.svelte";
    import ConfirmRemove from "../modals/ConfirmRemove.svelte";

    export let show;
    export let currentTag = {id: ""};
    export let tags = [];


    let openedModalId = "";

    let selectedPath;
    let selectedAction;
    let webStreamUrl;


    // TODO For tests only, remove
    currentTag = {id: "12345678", command: 12, pathOrUrl: "/music/short stories/"};
    // tag = {id: "12345678", command: 103};
    // tag = {id: "12345678"};
    // tag = {id: ""};

    for (let i = 1; i <= 10; i++) {
        tags.push({id: String(i).padStart(8, '0'), command: 12, pathOrUrl: "/music/short stories/"});
    }

</script>

<div class="{show ? 'block' : 'hidden'} max-w-2xl mx-auto sm:h-fit space-y-6 pb-4">
  <!-- CURRENT TAG -->
  <div class="{$$props.class} relative overflow-hidden shadow sm:rounded-md bg-white sm:mx-4 h-full">
    <Icon name="nfc" style="solid" class="absolute w-40 -right-3 -top-3 text-zinc-50 -rotate-6 hidden sm:block"/>
    <div class="relative px-4 py-3 space-y-6">
      <div class="flex flex-col sm:flex-row w-full items-center">
        <div class="py-8 w-48 flex-shrink-0 flex flex-col items-center">
          {#if currentTag.id !== ""}
            <div class="flex h-24 w-24 relative">
              <Icon name="nfc" style="regular" class="absolute animate-ping h-full w-full text-green-300 opacity-75"/>
              <Icon name="nfc" style="regular" class="absolute h-full w-full text-green-400"/>
            </div>
          {:else}
            <Icon name="nfc-slash" style="regular" class="text-red-400 h-24"/>
          {/if}
        </div>

        <div class="flex flex-col items-center space-y-4 w-full">
          {#if currentTag.id !== ""}
            <div class="text-green-400 text-lg font-bold">Tag detected</div>
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
          {:else}
            <div class="text-red-400 text-lg font-bold">No Tag detected</div>
            <div class="text-sm">Please place a tag on the ESPuino.</div>
          {/if}
        </div>
      </div>
    </div>

    <!-- Buttons -->
    {#if currentTag.id}
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
        {#if "command" in currentTag}
          <button class="button button-warning w-full sm:py-8" on:click={() => openedModalId="remove"}>
            Remove assignment
          </button>
        {/if}
      </div>
    {/if}
  </div>

  <!-- TAG LIST -->
  <div class="relative overflow-hidden shadow sm:rounded-md bg-white sm:mx-4 h-full">
    <Icon name="list" style="solid" class="absolute w-40 -right-3 -top-3 text-zinc-50 -rotate-6 hidden sm:block"/>
    <div class="relative px-4 pt-5 pb-1 space-y-6">
      <div>
        <h3 class="relative text-lg font-medium leading-6">Assigned playback tags</h3>
        <p class="relative mt-1 text-sm text-zinc-500">This is a list of tags with playback assignments for quick reference or manual triggering.</p>
      </div>
      <div>
        <table class="w-full text-sm text-left h-full">
          <thead>
            <tr>
              <th class="font-medium">ID</th>
              <th class="pl-5 font-medium">Playback options</th>
              <th class="pl-5 font-medium hidden sm:table-cell">Path / URL</th>
              <th></th><!-- Space for buttons -->
            </tr>
          </thead>
          <tbody>
            {#each tags as tag}
              <tr class="h-full border-zinc-300 border-t">
                <td class="pt-2 sm:pb-2 font-mono w-0 select-all">
                  {tag.id}
                </td>
                <td class="pt-2 sm:pb-2 pl-5 ">
                  <!--{tag.command}-->
                  <div class="flex flex-row h-full w-fit rounded-md overflow-hidden">
                    <Icon class="my-auto h-8 w-8 bg-orange-500 px-2 py-1 text-white" name="book-bookmark" style="regular"/>
                    <Icon class="my-auto h-8 w-8 bg-zinc-100 px-2 py-1 text-zinc-400" name="shuffle" style="regular"/>
                    <Icon class="my-auto h-8 w-8 bg-orange-500 px-2 py-1 text-white" name="repeat" style="regular"/>
                    <Icon class="my-auto h-8 w-8 bg-zinc-100 px-2 py-1 text-zinc-400" name="arrow-right-to-line" style="regular"/>
                    <Icon class="my-auto h-8 w-8 bg-zinc-100 px-2 py-1 text-zinc-400" name="snooze" style="regular"/>
                    <Icon class="my-auto h-8 w-8 bg-zinc-100 px-2 py-1 text-zinc-400" name="brightness-low" style="regular"/>
                  </div>
                </td>
                <td class="pt-2 sm:pb-2 px-5 w-full hidden sm:table-cell text-zinc-500 break-all select-all font-mono text-xs">
                  {tag.pathOrUrl}
                </td>
                <td class="pt-2 sm:pb-2 w-0">
                  <button class="button button-secondary max-h-8 w-12">
                    <Icon class="h-5 w-5 text-white" name="play" style="solid"/>
                  </button>
                </td>
              </tr>
              <tr class="sm:hidden">
                <td colspan="3" class="pb-2">
                  <span class="font-medium">Path / URL: </span><span class="text-zinc-500 break-all select-all font-mono text-xs">{tag.pathOrUrl}</span>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    <div
        class="px-4 py-3 bg-zinc-100 flex gap-x-2 flex-row sm:gap-x-2 sm:gap-y-0 sm:justify-end">
      <button class="button button-secondary w-full sm:w-fit">
        <Icon class="h-3 pr-2" style="solid" name="chevron-left"/>
        Previous </button>
      <button class="button button-secondary w-full sm:w-fit">
        Next
        <Icon class="h-3 pl-2" style="solid" name="chevron-right"/>
      </button>
    </div>
  </div>
</div>


<!--MODALS-->
<SelectPath {openedModalId} {selectedPath} />
<WebStream {openedModalId} {webStreamUrl} />
<SelectAction {openedModalId} {selectedAction} />
<ConfirmRemove {openedModalId} {currentTag} />
