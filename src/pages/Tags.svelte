<!--<script>-->
<!--    import SettingsCard from "../components/SettingsCard.svelte";-->
<!--    import FileViewer from "../components/FileViewer.svelte";-->

<!--    export let show;-->
<!--    let selected_path;-->
<!--</script>-->

<!--<div class="{show ? '' : 'hidden'} max-w-3xl mx-auto space-y-6">-->
<!--  <SettingsCard title="Files" icon="folder-open" description="Foo bar">-->
<!--    <div slot="main" class="relative">-->
<!--      <FileViewer dir="/Music/Kids/Horror" extensions={["mp3", "m4a", "wav"]} bind:selected_path/>-->
<!--    </div>-->
<!--  </SettingsCard>-->
<!--</div>-->


<script>
    import {_} from "svelte-i18n";
    import Icon from "../components/Icon.svelte";
    import FileViewer from "../components/FileViewer.svelte";

    export let show;
    export let tag = {id: ""};

    let opened_modal = "";

    let selected_path;

    // @formatter:off
    const TAG_TYPES = {
        LOCAL_AUDIO: 'local_audio',
        WEB_AUDIO: 'web_audio',
        ACTION: 'action',
    }
    // Constants correspond with `values.h`
    const COMMANDS = {
        // Play modes
         1: {name: $_("tags.assignment_types.single_track"), type: TAG_TYPES.LOCAL_AUDIO},
         2: {name: $_("tags.assignment_types.single_track_loop"), type: TAG_TYPES.LOCAL_AUDIO},
        12: {name: $_("tags.assignment_types.single_track_of_dir_random"), type: TAG_TYPES.LOCAL_AUDIO},
         3: {name: $_("tags.assignment_types.audiobook"), type: TAG_TYPES.LOCAL_AUDIO},
         4: {name: $_("tags.assignment_types.audiobook_loop"), type: TAG_TYPES.LOCAL_AUDIO},
         5: {name: $_("tags.assignment_types.all_tracks_of_dir_sorted"), type: TAG_TYPES.LOCAL_AUDIO},
         6: {name: $_("tags.assignment_types.all_tracks_of_dir_random"), type: TAG_TYPES.LOCAL_AUDIO},
         7: {name: $_("tags.assignment_types.all_tracks_of_dir_sorted_loop"), type: TAG_TYPES.LOCAL_AUDIO},
         9: {name: $_("tags.assignment_types.all_tracks_of_dir_random_loop"), type: TAG_TYPES.LOCAL_AUDIO},
        11: {name: $_("tags.assignment_types.local_m3u"), type: TAG_TYPES.LOCAL_AUDIO},
         8: {name: $_("tags.assignment_types.webstream"), type: TAG_TYPES.WEB_AUDIO},

        // Actions
        179: {name: $_("tags.assignment_types.sleepmode"), type: TAG_TYPES.ACTION},
        100: {name: $_("tags.assignment_types.lock_buttons_mod"), type: TAG_TYPES.ACTION},
        101: {name: $_("tags.assignment_types.sleep_timer_mod_15"), type: TAG_TYPES.ACTION},
        102: {name: $_("tags.assignment_types.sleep_timer_mod_30"), type: TAG_TYPES.ACTION},
        103: {name: $_("tags.assignment_types.sleep_timer_mod_60"), type: TAG_TYPES.ACTION},
        104: {name: $_("tags.assignment_types.sleep_timer_mod_120"), type: TAG_TYPES.ACTION},
        105: {name: $_("tags.assignment_types.sleep_after_end_of_track"), type: TAG_TYPES.ACTION},
        106: {name: $_("tags.assignment_types.sleep_after_end_of_playlist"), type: TAG_TYPES.ACTION},
        107: {name: $_("tags.assignment_types.sleep_after_5_tracks"), type: TAG_TYPES.ACTION},
        110: {name: $_("tags.assignment_types.repeat_playlist"), type: TAG_TYPES.ACTION},
        111: {name: $_("tags.assignment_types.repeat_track"), type: TAG_TYPES.ACTION},
        120: {name: $_("tags.assignment_types.dimm_leds_nightmode"), type: TAG_TYPES.ACTION},
        130: {name: $_("tags.assignment_types.toggle_wifi_status"), type: TAG_TYPES.ACTION},
        140: {name: $_("tags.assignment_types.toggle_bluetooth_mode"), type: TAG_TYPES.ACTION},
        150: {name: $_("tags.assignment_types.enable_ftp_server"), type: TAG_TYPES.ACTION},
        170: {name: $_("tags.assignment_types.playpause"), type: TAG_TYPES.ACTION},
        171: {name: $_("tags.assignment_types.prevtrack"), type: TAG_TYPES.ACTION},
        172: {name: $_("tags.assignment_types.nexttrack"), type: TAG_TYPES.ACTION},
        173: {name: $_("tags.assignment_types.firsttrack"), type: TAG_TYPES.ACTION},
        174: {name: $_("tags.assignment_types.lasttrack"), type: TAG_TYPES.ACTION},
        175: {name: $_("tags.assignment_types.volumeinit"), type: TAG_TYPES.ACTION},
        176: {name: $_("tags.assignment_types.volumeup"), type: TAG_TYPES.ACTION},
        177: {name: $_("tags.assignment_types.volumedown"), type: TAG_TYPES.ACTION},
        180: {name: $_("tags.assignment_types.seek_forwards"), type: TAG_TYPES.ACTION},
        181: {name: $_("tags.assignment_types.seek_backwards"), type: TAG_TYPES.ACTION},
        182: {name: $_("tags.assignment_types.stop"), type: TAG_TYPES.ACTION},
    };
    // @formatter:on

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
                <th class="font-bold text-left w-1 align-text-top">ID:</th>
                <td class="pl-3 font-mono">{tag.id}</td>
              </tr>
              <tr>
                <th class="font-bold text-left w-1 align-text-top">Assignment:</th>
                <td class="pl-3">
                  {#if "command" in tag}
                    {COMMANDS[tag.command].name}
                  {:else}
                    {$_("tags.assignment_types.none")}
                  {/if}
                </td>
              </tr>
              {#if "pathOrUrl" in tag}
                <tr>
                  <th class="font-bold text-left w-1 align-text-top">
                    {#if tag.pathOrUrl.startsWith("/")}
                      Path:
                    {:else}
                      URL:
                    {/if}
                  </th>
                  <td class="pl-3" style="word-break: break-all;">{tag.pathOrUrl}</td>
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
        <button class="button button-secondary w-full sm:py-8" on:click={() => opened_modal="explorer"}>
          Assign local path
        </button>
        <button class="button button-secondary w-full sm:py-8" on:click={() => opened_modal="stream"}>
          Assign web stream
        </button>
        <button class="button button-secondary w-full sm:py-8" on:click={() => opened_modal="action"}>
          Assign action
        </button>
        {#if "command" in tag}
          <button class="button button-warning w-full sm:py-8" on:click={() => opened_modal="remove"}>
            Remove assignment
          </button>
        {/if}
      </div>
    {/if}

  </div>
</div>

<!--MODALS-->
<!--File explorer-->
<div class="modal modal-bottom sm:modal-middle {opened_modal === 'explorer' ? 'modal-open' : ''}">
  <div class="modal-box p-0 h-[80vh] flex flex-col">
    <FileViewer dir="/Music/Kids/Horror" extensions={["mp3", "m4a", "wav"]} bind:selected_path/>
    <div class="px-4 py-3 bg-zinc-50 sm:px-6 flex flex-col-reverse gap-y-2 sm:flex-row sm:gap-x-2 sm:gap-y-0 sm:justify-end">
      <button class="button button-secondary" on:click={() => opened_modal=""}>Cancel</button>
      <button class="button button-primary">Assign</button>
    </div>
  </div>
</div>

<!--Web stream-->
<div class="modal modal-bottom sm:modal-middle {opened_modal === 'stream' ? 'modal-open' : ''}">
  <div class="modal-box p-0 flex flex-col">
    <div class="px-4 py-3">
      Web stream (TODO)
    </div>
    <div class="px-4 py-3 bg-zinc-50 sm:px-6 flex flex-col-reverse gap-y-2 sm:flex-row sm:gap-x-2 sm:gap-y-0 sm:justify-end">
      <button class="button button-secondary" on:click={() => opened_modal=""}>Cancel</button>
      <button class="button button-primary">Assign</button>
    </div>
  </div>
</div>

<!--Action-->
<div class="modal modal-bottom sm:modal-middle {opened_modal === 'action' ? 'modal-open' : ''}">
  <div class="modal-box p-0 flex flex-col">
    <div class="px-4 py-3 form-control">
      <!--{#each Object.entries(COMMANDS) as [key, values]}-->
      <!--  {#if values.type === TAG_TYPES.ACTION}-->
      <!--    <label class="label cursor-pointer py-1 sm:text-sm">-->
      <!--      <input type="radio" name="action" class="radio radio-secondary sm:radio-sm">-->
      <!--      <span class="pl-2">{values.name}</span>-->
      <!--    </label>-->
      <!--  {/if}-->
      <!--{/each}-->
    </div>
    <div class="px-4 py-3 bg-zinc-50 sm:px-6 flex flex-col-reverse gap-y-2 sm:flex-row sm:gap-x-2 sm:gap-y-0 sm:justify-end">
      <button class="button button-secondary" on:click={() => opened_modal=""}>Cancel</button>
      <button class="button button-primary">Assign</button>
    </div>
  </div>
</div>

<!--Remove-->
<div class="modal modal-bottom sm:modal-middle {opened_modal === 'remove' ? 'modal-open' : ''}">
  <div class="modal-box p-0 flex flex-col">
    <div class="px-4 py-3">
      Remove (TODO)
    </div>
    <div class="px-4 py-3 bg-zinc-50 sm:px-6 flex flex-col-reverse gap-y-2 sm:flex-row sm:gap-x-2 sm:gap-y-0 sm:justify-end">
      <button class="button button-secondary" on:click={() => opened_modal=""}>Cancel</button>
      <button class="button button-warning">Remove</button>
    </div>
  </div>
</div>