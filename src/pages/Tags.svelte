<script>
    import {_} from "svelte-i18n";
    import Icon from "../components/Icon.svelte";
    import FileViewer from "../components/FileViewer.svelte";

    export let show;
    export let tag = {id: ""};

    let openedModalId = "";

    let selectedPath;
    let selectedAction;
    let webStreamUrl;

    // @formatter:off
    const TAG_TYPES = {
        LOCAL_AUDIO: 'local_audio',
        WEB_AUDIO: 'web_audio',
        ACTION: 'action',
    }
    const ACTION_CATEGORIES = [
        {category: "sleep", name: $_("tags.action_categories.sleep")},
        {category: "control", name: $_("tags.action_categories.control")},
        {category: "volume", name: $_("tags.action_categories.volume")},
        {category: "misc", name: $_("tags.action_categories.misc")},
    ]
    // Constants correspond with `values.h`
    const COMMANDS = {
        // Play modes
         1: {name: $_("tags.assignment_types.single_track"),                  type: TAG_TYPES.LOCAL_AUDIO},
         2: {name: $_("tags.assignment_types.single_track_loop"),             type: TAG_TYPES.LOCAL_AUDIO},
        12: {name: $_("tags.assignment_types.single_track_of_dir_random"),    type: TAG_TYPES.LOCAL_AUDIO},
         3: {name: $_("tags.assignment_types.audiobook"),                     type: TAG_TYPES.LOCAL_AUDIO},
         4: {name: $_("tags.assignment_types.audiobook_loop"),                type: TAG_TYPES.LOCAL_AUDIO},
         5: {name: $_("tags.assignment_types.all_tracks_of_dir_sorted"),      type: TAG_TYPES.LOCAL_AUDIO},
         6: {name: $_("tags.assignment_types.all_tracks_of_dir_random"),      type: TAG_TYPES.LOCAL_AUDIO},
         7: {name: $_("tags.assignment_types.all_tracks_of_dir_sorted_loop"), type: TAG_TYPES.LOCAL_AUDIO},
         9: {name: $_("tags.assignment_types.all_tracks_of_dir_random_loop"), type: TAG_TYPES.LOCAL_AUDIO},
        11: {name: $_("tags.assignment_types.local_m3u"),                     type: TAG_TYPES.LOCAL_AUDIO},
         8: {name: $_("tags.assignment_types.webstream"),                     type: TAG_TYPES.WEB_AUDIO},

        // Actions
        179: {name: $_("tags.assignment_types.sleepmode"),                    type: TAG_TYPES.ACTION, category: "sleep", sorting: 1, icon: "snooze"},
        101: {name: $_("tags.assignment_types.sleep_timer_mod_15"),           type: TAG_TYPES.ACTION, category: "sleep", sorting: 2, icon: "snooze"},
        102: {name: $_("tags.assignment_types.sleep_timer_mod_30"),           type: TAG_TYPES.ACTION, category: "sleep", sorting: 3, icon: "snooze"},
        103: {name: $_("tags.assignment_types.sleep_timer_mod_60"),           type: TAG_TYPES.ACTION, category: "sleep", sorting: 4, icon: "snooze"},
        104: {name: $_("tags.assignment_types.sleep_timer_mod_120"),          type: TAG_TYPES.ACTION, category: "sleep", sorting: 5, icon: "snooze"},
        105: {name: $_("tags.assignment_types.sleep_after_end_of_track"),     type: TAG_TYPES.ACTION, category: "sleep", sorting: 6, icon: "snooze"},
        106: {name: $_("tags.assignment_types.sleep_after_end_of_playlist"),  type: TAG_TYPES.ACTION, category: "sleep", sorting: 8, icon: "snooze"},
        107: {name: $_("tags.assignment_types.sleep_after_5_tracks"),         type: TAG_TYPES.ACTION, category: "sleep", sorting: 7, icon: "snooze"},

        170: {name: $_("tags.assignment_types.playpause"),                    type: TAG_TYPES.ACTION, category: "control", sorting: 1, icon: "play-pause"},
        182: {name: $_("tags.assignment_types.stop"),                         type: TAG_TYPES.ACTION, category: "control", sorting: 2, icon: "stop"},
        173: {name: $_("tags.assignment_types.firsttrack"),                   type: TAG_TYPES.ACTION, category: "control", sorting: 3, icon: "backward-fast"},
        171: {name: $_("tags.assignment_types.prevtrack"),                    type: TAG_TYPES.ACTION, category: "control", sorting: 4, icon: "backward-step"},
        181: {name: $_("tags.assignment_types.seek_backwards"),               type: TAG_TYPES.ACTION, category: "control", sorting: 5, icon: "backward"},
        180: {name: $_("tags.assignment_types.seek_forwards"),                type: TAG_TYPES.ACTION, category: "control", sorting: 6, icon: "forward"},
        172: {name: $_("tags.assignment_types.nexttrack"),                    type: TAG_TYPES.ACTION, category: "control", sorting: 7, icon: "forward-step"},
        174: {name: $_("tags.assignment_types.lasttrack"),                    type: TAG_TYPES.ACTION, category: "control", sorting: 8, icon: "forward-fast"},
        111: {name: $_("tags.assignment_types.repeat_track"),                 type: TAG_TYPES.ACTION, category: "control", sorting: 9, icon: "repeat-1"},
        110: {name: $_("tags.assignment_types.repeat_playlist"),              type: TAG_TYPES.ACTION, category: "control", sorting: 10, icon: "repeat"},

        177: {name: $_("tags.assignment_types.volumedown"),                   type: TAG_TYPES.ACTION, category: "volume", sorting: 1,icon: "volume-low"},
        175: {name: $_("tags.assignment_types.volumeinit"),                   type: TAG_TYPES.ACTION, category: "volume", sorting: 2,icon: "volume"},
        176: {name: $_("tags.assignment_types.volumeup"),                     type: TAG_TYPES.ACTION, category: "volume", sorting: 3,icon: "volume-high"},

        100: {name: $_("tags.assignment_types.lock_buttons_mod"),             type: TAG_TYPES.ACTION, category: "misc", sorting: 1,  icon: "lock"},
        120: {name: $_("tags.assignment_types.dimm_leds_nightmode"),          type: TAG_TYPES.ACTION, category: "misc", sorting: 2,  icon: "brightness-low"},
        150: {name: $_("tags.assignment_types.enable_ftp_server"),            type: TAG_TYPES.ACTION, category: "misc", sorting: 3,  icon: "folder-open"},
        130: {name: $_("tags.assignment_types.toggle_wifi_status"),           type: TAG_TYPES.ACTION, category: "misc", sorting: 4,  icon: "wifi"},
        140: {name: $_("tags.assignment_types.toggle_bluetooth_mode"),        type: TAG_TYPES.ACTION, category: "misc", sorting: 5,  icon: "bluetooth"},
    };
    // @formatter:on

    // TODO For tests only, remove
    tag = {id: "12345678", command: 12, pathOrUrl: "/music/short stories/"};
    // tag = {id: "12345678", command: 103};
    // tag = {id: "12345678"};
    // tag = {id: ""};

      console.log(Object.entries(COMMANDS));
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
                  {#if "command" in tag}
                    {COMMANDS[tag.command].name}
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
        <button class="button button-secondary w-full sm:py-8" on:click={() => openedModalId="explorer"}>
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
<div class="modal modal-bottom sm:modal-middle {openedModalId === 'explorer' ? 'modal-open' : ''}">
  <div class="modal-box p-0 flex flex-col max-h-[80vh]">
    <div class="font-medium px-4 py-4">
      Select file or directory
    </div>
    <FileViewer dir="/Music/Kids/Horror" extensions={["mp3", "m4a", "wav"]} bind:selectedPath/>
    <div
        class="px-4 py-3 bg-zinc-50 sm:px-6 flex flex-col-reverse gap-y-2 sm:flex-row sm:gap-x-2 sm:gap-y-0 sm:justify-end">
      <button class="button button-secondary" on:click={() => openedModalId=""}>Cancel</button>
      <button class="button button-primary" on:click={() => openedModalId=""}>Assign</button>
    </div>
  </div>
</div>

<!--Web stream-->
<div class="modal modal-bottom sm:modal-middle {openedModalId === 'stream' ? 'modal-open' : ''}">
  <div class="modal-box p-0 flex flex-col max-h-[80vh]">
    <div class="font-medium px-4 py-4">
      Enter web stream URL
    </div>
    <div class="px-4 pb-2">
      <input type="text" name="url" id="url"
             class="block w-full rounded-md border-zinc-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
             placeholder="https://">
    </div>
    <div
        class="px-4 py-3 bg-zinc-50 sm:px-6 flex flex-col-reverse gap-y-2 sm:flex-row sm:gap-x-2 sm:gap-y-0 sm:justify-end">
      <button class="button button-secondary" on:click={() => openedModalId=""}>Cancel</button>
      <button class="button button-primary" on:click={() => openedModalId=""}>Assign</button>
    </div>
  </div>
</div>

<!--Action-->
<div class="modal modal-bottom sm:modal-middle {openedModalId === 'action' ? 'modal-open' : ''}">
  <div class="modal-box p-0 flex flex-col max-h-[80vh]">
    <div class="relative font-medium px-4 py-4">
      Select action
    </div>
    <ul class="border-t border-zinc-100 overflow-y-auto">
      {#each ACTION_CATEGORIES as category_obj}
        <div class="bg-zinc-50 font-semibold text-xs uppercase tracking-wider text-zinc-700 px-4 py-1">{category_obj.name}</div>
        {#each Object.entries(COMMANDS).sort((a, b) => (a[1].sorting > b[1].sorting ? 1 : -1)) as [key, values]}
          {#if values.type === TAG_TYPES.ACTION && values.category === category_obj.category}
            <li class="flex items-center pl-6 pr-4 py-1 h-9 sm:text-sm cursor-pointer sm:h-7 {selectedAction === key ? 'bg-orange-500 hover:bg-orange-500 text-white' : 'hover:bg-zinc-100'}"
                on:click={() => selectedAction=key}>
              <div class="w-6 flex flex-col items-center"><Icon class="flex-shrink-0 h-5" style="regular" name={values.icon}/></div>
              <span class="ml-3 truncate">{values.name}</span>
            </li>
          {/if}
        {/each}
      {/each}

    </ul>
    <div
        class="px-4 py-3 bg-zinc-50 sm:px-6 flex flex-col-reverse gap-y-2 sm:flex-row sm:gap-x-2 sm:gap-y-0 sm:justify-end">
      <button class="button button-secondary" on:click={() => openedModalId=""}>Cancel</button>
      <button class="button button-primary" on:click={() => openedModalId=""}>Assign</button>
    </div>
  </div>
</div>

<!--Remove-->
<div class="modal modal-bottom sm:modal-middle {openedModalId === 'remove' ? 'modal-open' : ''}">
  <div class="modal-box p-0 flex flex-col max-h-[80vh]">
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
            {#if "command" in tag}
              {COMMANDS[tag.command].name}
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
        class="px-4 py-3 bg-zinc-50 sm:px-6 flex flex-col-reverse gap-y-2 sm:flex-row sm:gap-x-2 sm:gap-y-0 sm:justify-end">
      <button class="button button-secondary" on:click={() => openedModalId=""}>Cancel</button>
      <button class="button button-warning" on:click={() => openedModalId=""}>Remove</button>
    </div>
  </div>
</div>