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

    export let show;
    export let tag = undefined;

    // @formatter:off
    const TAG_TYPES = {
        PATH: 'audio',
        MODIFICATION: 'modification',
        EMPTY: 'empty'
    }
    // Constants correspond with `values.h`
    const PLAY_MODES = {
         1: "single_track",
         2: "single_track_loop",
        12: "single_track_of_dir_random",
         3: "audiobook",
         4: "audiobook_loop",
         5: "all_tracks_of_dir_sorted",
         6: "all_tracks_of_dir_random",
         7: "all_tracks_of_dir_sorted_loop",
         9: "all_tracks_of_dir_random_loop",
         8: "webstream",
        11: "local_m3u",
    }
    const MODIFICATION_TYPES = {
        179: "sleepmode",
        100: "lock_buttons_mod",
        101: "sleep_timer_mod_15",
        102: "sleep_timer_mod_30",
        103: "sleep_timer_mod_60",
        104: "sleep_timer_mod_120",
        105: "sleep_after_end_of_track",
        106: "sleep_after_end_of_playlist",
        107: "sleep_after_5_tracks",
        110: "repeat_playlist",
        111: "repeat_track",
        120: "dimm_leds_nightmode",
        130: "toggle_wifi_status",
        140: "toggle_bluetooth_mode",
        150: "enable_ftp_server",
        170: "playpause",
        171: "prevtrack",
        172: "nexttrack",
        173: "firsttrack",
        174: "lasttrack",
        175: "volumeinit",
        176: "volumeup",
        177: "volumedown",
        180: "seek_forwards",
        181: "seek_backwards",
        182: "stop",
    }
    // @formatter:on

    // TODO For tests only, remove
    tag = null;
    // tag = {id: 12345678, type: TAG_TYPES.EMPTY};
    tag = {id: 12345678, type: TAG_TYPES.PATH, mode: 2, pathOrUrl: "/music/kids/horror/Please, no vitamins today.mp3"};
    // tag = {id: 12345678, type: TAG_TYPES.MODIFICATION, modification: 101};
</script>

<div class="{show ? 'block' : 'hidden'} max-w-3xl mx-auto sm:h-fit">
  <div class="{$$props.class} relative overflow-hidden shadow sm:rounded-md bg-white">
    <Icon name="nfc" style="solid" class="absolute w-40 -right-3 -top-3 text-zinc-50 -rotate-6 hidden sm:block"/>
    <div class="relative px-4 py-5 space-y-6 sm:p-6">
      <div class="flex flex-col items-center justify-center my-auto">
        <div class="flex flex-col justify-between sm:flex-row w-full">
          <div class="flex flex-col items-center py-8 sm:py-0 min-w-fit px-8">
            {#if tag}
              <Icon name="nfc" style="regular" class="text-green-400 h-24"/>
              <div class="text-green-400 pt-4 text-lg font-bold">Tag {tag.id} found.</div>
            {:else}
              <Icon name="nfc-slash" style="regular" class="text-red-400 h-24"/>
              <div class="text-red-400 pt-3 text-lg font-bold">No Tag found.</div>
              <div class="mt-3 text-sm text-zinc-500">Please place a tag on the ESPuino.</div>
            {/if}
          </div>

          {#if tag}
            <div>
              {#if tag.type === TAG_TYPES.EMPTY}
                Tag has no linked action.
              {:else if tag.type === TAG_TYPES.PATH}
                Path: "{tag.pathOrUrl}"
                <span
                    class="rounded-full text-white bg-orange-400 text-xs px-2 py-1 font-semibold">{PLAY_MODES[tag.mode]}</span>
              {:else if tag.type === TAG_TYPES.MODIFICATION}
                Modification: "{MODIFICATION_TYPES[tag.modification]}"
              {/if}
            </div>


          {/if}
        </div>
      </div>
    </div>

    {#if tag}
      <div class="flex flex-col sm:flex-row justify-end gap-2 px-4 py-3 bg-zinc-50">
        <button class="button-secondary">Assign new path</button>
        <button class="button-secondary">Assign new modification</button>
        {#if tag.type !== TAG_TYPES.EMPTY}
          <button class="button-warning">Remove assignment</button>
        {/if}
      </div>
    {/if}

  </div>
</div>