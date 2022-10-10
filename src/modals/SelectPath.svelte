<script>
    import {_} from "svelte-i18n";
    import Icon from "../components/Icon.svelte";
    import FileViewer from "../components/FileViewer.svelte";
    import ToggleButtonOnOff from "../components/ToggleButtonOnOff.svelte";

    export let isOpened = false;
    export let selectedPath;

    let page = 0;
    $: page = !isOpened ? 0 : page; // Reset page when modal is closed

    let isStopAfterOneTrackToggled = false;
    let isShuffleToggled           = false;
    let isRepeatToggled            = false;
    let isSavePositionToggled      = false;
    let isSleepWhenFinishedToggled = false;
    let isDimLedsToggled           = false;

    // Reset toggles when modal is closed
    $: isStopAfterOneTrackToggled = !isOpened || page === 0 ? false : isStopAfterOneTrackToggled;
    $: isShuffleToggled           = !isOpened || page === 0 ? false : isShuffleToggled;
    $: isRepeatToggled            = !isOpened || page === 0 ? false : isRepeatToggled;
    $: isSavePositionToggled      = !isOpened || page === 0 ? false : isSavePositionToggled;
    $: isSleepWhenFinishedToggled = !isOpened || page === 0 ? false : isSleepWhenFinishedToggled;
    $: isDimLedsToggled           = !isOpened || page === 0 ? false : isDimLedsToggled;
</script>

<div class="modal modal-bottom sm:modal-middle {isOpened ? 'modal-open' : ''}">
  <div class="modal-box p-0 flex flex-col max-h-[85vh]">
    <!-- Page 1 -->
    {#if page === 0}
      <div class="font-medium px-4 py-4">
        Select file or directory
      </div>
      <FileViewer dir="/Music/Kids/Horror" extensions={["mp3", "m4a", "wav", "m3u"]} bind:selectedPath/>
      <div
          class="px-4 py-3 bg-zinc-100 flex flex-row gap-x-2 sm:justify-end">
        <button class="button button-secondary w-full sm:w-fit" on:click={() => isOpened=false}>Cancel</button>
        <button class="button button-primary w-full sm:w-fit" on:click={() => page++}>Select
          <Icon class="h-3 pl-2" style="solid" name="chevron-right"/>
        </button>
      </div>

    <!-- Page 2 -->
    {:else if page === 1}
      <div class="px-4 pt-4">
        <span class="font-medium">Select playback options</span>
        <div class="text-xs text-zinc-500">
          <span class="font-medium">Path: </span><span class="select-all font-mono truncated">{selectedPath}</span>
        </div>
      </div>

      <div class="px-4 py-3 space-y-2 sm:self-center w-full overflow-y-auto">

        <!-- Save position -->
        <div class="flex flex-row text-sm w-full h-11 sm:h-9">
          <div class="flex flex-row items-center font-medium">
            <Icon class="mr-1 h-5 w-8 text-zinc-800" name="book-bookmark" style="regular"/>
            <span class="w-24 leading-tight">Save position</span>
          </div>
          <ToggleButtonOnOff bind:isToggled={isSavePositionToggled} isDisabled={isShuffleToggled}/>
        </div>

        <!-- Shuffle -->
        {#if selectedPath && (selectedPath.endsWith("/") || selectedPath.endsWith(".m3u"))}
          <div class="flex flex-row text-sm w-full h-11 sm:h-9">
            <div class="flex flex-row items-center font-medium">
              <Icon class="mr-1 h-5 w-8 text-zinc-800" name="shuffle" style="regular"/>
              <span class="w-24 leading-tight">Shuffle</span>
            </div>
            <ToggleButtonOnOff bind:isToggled={isShuffleToggled} isDisabled={isSavePositionToggled}/>
          </div>
        {/if}

        <!-- Repeat -->
        <div class="flex flex-row text-sm w-full h-11 sm:h-9">
          <div class="flex flex-row items-center font-medium">
            <Icon class="mr-1 h-5 w-8 text-zinc-800" name="repeat" style="regular"/>
            <span class="w-24 leading-tight">Repeat</span>
          </div>
          <ToggleButtonOnOff bind:isToggled={isRepeatToggled} isDisabled={isStopAfterOneTrackToggled}/>
        </div>

        <!-- Stop after one track -->
        {#if selectedPath && (selectedPath.endsWith("/") || selectedPath.endsWith(".m3u"))}
          <div class="flex flex-row text-sm w-full h-11 sm:h-9">
            <div class="flex flex-row items-center font-medium">
              <Icon class="mr-1 h-5 w-8 text-zinc-800" name="arrow-right-to-line" style="regular"/>
              <span class="w-24 leading-tight">Stop after one track</span>
            </div>
            <ToggleButtonOnOff bind:isToggled={isStopAfterOneTrackToggled} isDisabled={isRepeatToggled}/>
          </div>
        {/if}

        <!-- Sleep when finished -->
        <div class="flex flex-row text-sm w-full h-11 sm:h-9">
          <div class="flex flex-row items-center font-medium">
            <Icon class="mr-1 h-5 w-8 text-zinc-800" name="snooze" style="regular"/>
            <span class="w-24 leading-tight">Sleep when finished</span>
          </div>
          <ToggleButtonOnOff bind:isToggled={isSleepWhenFinishedToggled} isDisabled={isRepeatToggled}/>
        </div>

        <!-- Dim brightness -->
        <div class="flex flex-row text-sm w-full h-11 sm:h-9">
          <div class="flex flex-row items-center font-medium">
            <Icon class="mr-1 h-5 w-8 text-zinc-800" name="brightness-low" style="regular"/>
            <span class="w-24 leading-tight">Dim brightness</span>
          </div>
          <ToggleButtonOnOff bind:isToggled={isDimLedsToggled}/>
        </div>

      </div>

      <div
          class="px-4 py-3 bg-zinc-100 flex flex-row gap-x-2 sm:justify-end">
<!--        <button class="button button-secondary w-full" on:click={() => isOpened=false}>Cancel</button>-->
        <button class="button button-secondary w-full sm:w-fit" on:click={() => page--}>
          <Icon class="h-3 pr-2" style="solid" name="chevron-left"/>
          Back
        </button>
        <button class="button button-primary w-full sm:w-fit" on:click={() => isOpened=false}>Assign</button>
      </div>
    {/if}
  </div>
</div>