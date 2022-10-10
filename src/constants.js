// @formatter:off
export const ACTION_CATEGORIES = [
    {category: "sleep",   i18n_key: "tags.action_categories.sleep"},
    {category: "control", i18n_key: "tags.action_categories.control"},
    {category: "volume",  i18n_key: "tags.action_categories.volume"},
    {category: "misc",    i18n_key: "tags.action_categories.misc"},
]
// Constants correspond with `values.h`
export const WEB_STREAM = {8: {i18n_key: "tags.assignment_types.webstream"}};
export const LOCAL_PLAY_MODES = {
    // Play modes
     1: {i18n_key: "tags.assignment_types.single_track",                  sorting: 1},
     2: {i18n_key: "tags.assignment_types.single_track_loop",             sorting: 2},
    12: {i18n_key: "tags.assignment_types.single_track_of_dir_random",    sorting: 3},
     3: {i18n_key: "tags.assignment_types.audiobook",                     sorting: 4},
     4: {i18n_key: "tags.assignment_types.audiobook_loop",                sorting: 5},
     5: {i18n_key: "tags.assignment_types.all_tracks_of_dir_sorted",      sorting: 6},
     6: {i18n_key: "tags.assignment_types.all_tracks_of_dir_random",      sorting: 7},
     7: {i18n_key: "tags.assignment_types.all_tracks_of_dir_sorted_loop", sorting: 8},
     9: {i18n_key: "tags.assignment_types.all_tracks_of_dir_random_loop", sorting: 9},
    11: {i18n_key: "tags.assignment_types.local_m3u",                     sorting: 10},
}
export const ACTIONS = {
    179: {i18n_key: "tags.assignment_types.sleepmode",                    category: "sleep", sorting: 1, icon: "snooze"},
    101: {i18n_key: "tags.assignment_types.sleep_timer_mod_15",           category: "sleep", sorting: 2, icon: "snooze"},
    102: {i18n_key: "tags.assignment_types.sleep_timer_mod_30",           category: "sleep", sorting: 3, icon: "snooze"},
    103: {i18n_key: "tags.assignment_types.sleep_timer_mod_60",           category: "sleep", sorting: 4, icon: "snooze"},
    104: {i18n_key: "tags.assignment_types.sleep_timer_mod_120",          category: "sleep", sorting: 5, icon: "snooze"},
    105: {i18n_key: "tags.assignment_types.sleep_after_end_of_track",     category: "sleep", sorting: 6, icon: "snooze"},
    106: {i18n_key: "tags.assignment_types.sleep_after_end_of_playlist",  category: "sleep", sorting: 8, icon: "snooze"},
    107: {i18n_key: "tags.assignment_types.sleep_after_5_tracks",         category: "sleep", sorting: 7, icon: "snooze"},

    170: {i18n_key: "tags.assignment_types.playpause",                    category: "control", sorting: 1, icon: "play-pause"},
    182: {i18n_key: "tags.assignment_types.stop",                         category: "control", sorting: 2, icon: "stop"},
    173: {i18n_key: "tags.assignment_types.firsttrack",                   category: "control", sorting: 3, icon: "backward-fast"},
    171: {i18n_key: "tags.assignment_types.prevtrack",                    category: "control", sorting: 4, icon: "backward-step"},
    181: {i18n_key: "tags.assignment_types.seek_backwards",               category: "control", sorting: 5, icon: "backward"},
    180: {i18n_key: "tags.assignment_types.seek_forwards",                category: "control", sorting: 6, icon: "forward"},
    172: {i18n_key: "tags.assignment_types.nexttrack",                    category: "control", sorting: 7, icon: "forward-step"},
    174: {i18n_key: "tags.assignment_types.lasttrack",                    category: "control", sorting: 8, icon: "forward-fast"},
    111: {i18n_key: "tags.assignment_types.repeat_track",                 category: "control", sorting: 9, icon: "repeat-1"},
    110: {i18n_key: "tags.assignment_types.repeat_playlist",              category: "control", sorting: 10, icon: "repeat"},

    177: {i18n_key: "tags.assignment_types.volumedown",                   category: "volume", sorting: 1,icon: "volume-low"},
    175: {i18n_key: "tags.assignment_types.volumeinit",                   category: "volume", sorting: 2,icon: "volume"},
    176: {i18n_key: "tags.assignment_types.volumeup",                     category: "volume", sorting: 3,icon: "volume-high"},

    100: {i18n_key: "tags.assignment_types.lock_buttons_mod",             category: "misc", sorting: 1,  icon: "lock"},
    120: {i18n_key: "tags.assignment_types.dimm_leds_nightmode",          category: "misc", sorting: 2,  icon: "brightness-low"},
    150: {i18n_key: "tags.assignment_types.enable_ftp_server",            category: "misc", sorting: 3,  icon: "folder-open"},
    130: {i18n_key: "tags.assignment_types.toggle_wifi_status",           category: "misc", sorting: 4,  icon: "wifi"},
    140: {i18n_key: "tags.assignment_types.toggle_bluetooth_sink",        category: "misc", sorting: 5,  icon: "bluetooth"},
    141: {i18n_key: "tags.assignment_types.toggle_bluetooth_source",      category: "misc", sorting: 6,  icon: "bluetooth"},
    151: {i18n_key: "tags.assignment_types.tell_ip_address",              category: "misc", sorting: 7,  icon: "network-wired"},
};
// @formatter:on