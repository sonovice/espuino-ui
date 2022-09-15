<script>
  import { onMount } from "svelte";
  import { _ } from "svelte-i18n";
  import axios from "axios";

  import CardSetting from "../components/SettingsCard.svelte";
  import Divider from "../components/Divider.svelte";
  import Icon from "../components/Icon.svelte";
  import SettingButton from "../components/SettingButton.svelte";
  import SettingRange from "../components/SettingRange.svelte";
  import SettingText from "../components/SettingText.svelte";
  import ToggleButton from "../components/ToggleButton.svelte";
  
  export let show;

  let settings = {
    general: {
      volume_start_percent: undefined,
      volume_max_speaker_percent: undefined,
      volume_max_headphones_percent: undefined,
      led_restart_percent: undefined,
      led_night_percent: undefined,
      power_saving_minutes: undefined,
      battery_warning_voltage: undefined,
      battery_low_voltage: undefined,
      battery_high_voltage: undefined,
      battery_interval_minutes: undefined,
    },
    wifi: {
      ssid: undefined,
      password: undefined,
      hostname: undefined,
    },
    ftp: {
      username: undefined,
      password: undefined,
    },
    mqtt: {
      enabled: undefined,
      host: undefined,
      port: undefined,
      username: undefined,
      password: undefined,
    },
  };

  onMount(async () => {
    // Get all settings from backend on page load
    get_settings();
  });

  // Get settings from backend
  // If `group` is provided, ask only for that subset
  async function get_settings(group = undefined) {
    let url = "https://run.mocky.io/v3/c8c837ba-8515-400b-ae6e-7d0e665778a6"; // TODO replace with "/api/settings"
    if (group !== undefined) url += `?group=${group}`;

    await axios.get(url).then((response) => {
      settings = { ...settings, ...response.data };
    });
  }

  // Send settings to backend
  // Data might only contain partial settings -> Backend takes care of this
  async function set_settings(data) {
    await axios.put("/api/settings", data);
  }

  function read_file(accept, callback) {
    let input = document.createElement("input");
    input.type = "file";
    input.accept = accept
    input.onchange = (event) => {
      // @ts-ignore
      let file = event.target.files[0];
      let reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = (readerEvent) => {
        let content = readerEvent.target.result;
        callback(content);
      }
    }
    input.click();
  }

  function upload_firmware(data) {
    // TODO send firmware to backend
    console.log(data);
  }
</script>

<div class="{show ? 'block' : 'hidden'} max-w-5xl mx-auto">
  <div class="flex flex-col justify-center md:flex-row">
    <!-- Quick access navigation -->
    <div class="mx-0 mb-4 md:sticky top-4 sm:mx-4 h-fit">
      <div class="space-y-1">
        {#each [["#general", $_("settings.general.card_title"), "sliders"], ["#wifi", $_("settings.wifi.card_title"), "wifi"], ["#ftp", $_("settings.ftp.card_title"), "folder-open"], ["#mqtt", $_("settings.mqtt.card_title"), "server"], ["#system", $_("settings.system.card_title"), "gear"]] as [anchor, text, icon]}
          <a href={anchor} class="flex items-center px-3 py-2 text-sm font-medium text-zinc-900 hover:text-zinc-900 hover:bg-zinc-50 group sm:rounded-md">
            <Icon name={icon} class="w-5 h-5 mr-3 text-zinc-400 group-hover:text-zinc-500" />
            <span class="truncate">{text}</span>
          </a>
        {/each}
      </div>
    </div>

    <!-- General settings -->
    <div class="mx-0 space-y-6 sm:mx-4">
      <CardSetting title={$_("settings.general.card_title")} description={$_("settings.general.card_description")} icon="sliders" anchor="general">
        <div slot="main">
          <!-- Volume -->
          <h4 class="mb-4 font-medium">{$_("settings.general.volume")}</h4>
          <div class="space-y-6">
            <SettingRange text={$_("settings.general.volume_after_start")} bind:value={settings.general.volume_start_percent} icon="volume" step="5" unit="%" />
            <SettingRange text={$_("settings.general.volume_max_speaker")} bind:value={settings.general.volume_max_speaker_percent} icon="speaker" step="5" unit="%" />
            <SettingRange text={$_("settings.general.volume_max_headphones")} bind:value={settings.general.volume_max_headphones_percent} icon="headphones" step="5" unit="%" />
          </div>
          <Divider />

          <!-- LED (NeoPixel) -->
          <h4 class="mb-4 font-medium">{$_("settings.general.led_neopixel")}</h4>
          <div class="space-y-6">
            <SettingRange text={$_("settings.general.brightness_start")} bind:value={settings.general.led_restart_percent} icon="brightness" step="1" unit="%" />
            <SettingRange text={$_("settings.general.brightness_night")} bind:value={settings.general.led_night_percent} icon="brightness-low" step="1" unit="%" />
          </div>
          <Divider />

          <!-- Power saving -->
          <h4 class="mb-4 font-medium">{$_("settings.general.power_saving")}</h4>
          <SettingRange text={$_("settings.general.minutes_inactivity")} bind:value={settings.general.power_saving_minutes} icon="snooze" min="5" max="120" step="5" unit="m" />
          <Divider />

          <!-- Battery -->
          <h4 class="mb-4 font-medium">{$_("settings.general.battery")}</h4>
          <div class="space-y-6">
            <SettingRange text={$_("settings.general.battery_low")} bind:value={settings.general.battery_low_voltage} icon="battery-low" min="2.5" max="5" step="0.01" decimals="2" unit="V" />
            <SettingRange text={$_("settings.general.battery_high")} bind:value={settings.general.battery_high_voltage} icon="battery-full" min="2.5" max="5" step="0.01" decimals="2" unit="V" />
            <SettingRange text={$_("settings.general.battery_warning")} bind:value={settings.general.battery_warning_voltage} icon="battery-exclamation" min="2.5" max="5" step="0.01" decimals="2" unit="V" />
            <SettingRange text={$_("settings.general.battery_interval")} bind:value={settings.general.battery_interval_minutes} icon="clock" max="60" step="5" unit="m" />
          </div>
        </div>
        <div slot="actions">
          <button class="mr-2 button-secondary" on:click={() => get_settings("general")}>
            {$_("common.reset")}
          </button>
          <button class="button-primary" on:click={() => set_settings({general: settings.general})}>
            {$_("common.save")}
          </button>
        </div>
      </CardSetting>

      <!-- WiFi settings -->
      <CardSetting title={$_("settings.wifi.card_title")} description={$_("settings.wifi.card_description")} icon="wifi"anchor="wifi">
        <div slot="main">
          <div class="grid grid-cols-2 gap-4">
            <SettingText class="col-span-2 sm:col-span-1" title={$_("settings.wifi.ssid")} bind:value={settings.wifi.ssid} />
            <SettingText class="col-span-2 sm:col-span-1" title={$_("common.password")} bind:value={settings.wifi.password} />
            <SettingText class="col-span-2" title={$_("settings.wifi.hostname")} bind:value={settings.wifi.hostname} />
          </div>
        </div>
        <div slot="actions">
          <button class="mr-2 button-secondary" on:click={() => get_settings("wifi")}>
            {$_("common.reset")}
          </button>
          <button class="button-primary" on:click={() => set_settings({wifi: settings.wifi})}>
            {$_("common.save")}
          </button>
        </div>
      </CardSetting>

      <!-- FTP settings -->
      <CardSetting title={$_("settings.ftp.card_title")} description={$_("settings.ftp.card_description")} icon="folder-open" anchor="ftp">
        <div slot="main">
          <div class="relative grid grid-cols-2 gap-4">
            <SettingText class="col-span-2 sm:col-span-1" title={$_("common.username")} bind:value={settings.ftp.username} />
            <SettingText class="col-span-2 sm:col-span-1" title={$_("common.password")} bind:value={settings.ftp.password} type="password" />
          </div>
        </div>
        <div slot="actions">
          <button class="mr-2 button-secondary" on:click={() => get_settings("ftp")}>
            {$_("common.reset")}
          </button>
          <button class="button-primary" on:click={() => set_settings({ftp: settings.ftp})}>
            {$_("settings.ftp.start_server")}
          </button>
        </div>
      </CardSetting>

      <!-- MQTT settings -->
      <CardSetting title={$_("settings.mqtt.card_title")} description={$_("settings.mqtt.card_description")} icon="server" anchor="mqtt" class="relative">
        <div slot="main">
          {#if !settings.mqtt.enabled}
            <div class="absolute top-0 left-0 z-10 w-full h-full bg-opacity-60 bg-zinc-50" />
          {/if}
          <div class="relative grid grid-cols-4 gap-4">
            <SettingText class="col-span-4 sm:col-span-3" title={$_("common.server")} bind:value={settings.mqtt.host} disabled={!settings.mqtt.enabled} />
            <SettingText class="col-span-4 sm:col-span-1" title={$_("common.port")} bind:value={settings.mqtt.port} type="number" disabled={!settings.mqtt.enabled} />
            <SettingText class="col-span-4 sm:col-span-2" title="{$_('common.username')} ({$_('common.optional')})" bind:value={settings.mqtt.username} disabled={!settings.mqtt.enabled} />
            <SettingText class="col-span-4 sm:col-span-2" title="{$_('common.password')} ({$_('common.optional')})" bind:value={settings.mqtt.password} type="password" disabled={!settings.mqtt.enabled} />
          </div>
        </div>
        <div slot="actions" class="flex items-center justify-between"><!-- TODO Add enable thingy to bottom left-->
          <div class="relative z-10">
            <ToggleButton text="Enable" bind:enabled={settings.mqtt.enabled} />
          </div>
          <div>
            <button class="mr-2 button-secondary" on:click={() => get_settings("mqtt")} disabled={!settings.mqtt.enabled}>
              {$_("common.reset")}
            </button>
            <button class="button-primary" on:click={() => set_settings({mqtt: settings.mqtt})} disabled={!settings.mqtt.enabled}>
              {$_("common.save")}
            </button>
          </div>
        </div>
      </CardSetting>

      <!-- System settings -->
      <CardSetting title={$_("settings.system.card_title")} description={$_("settings.system.card_description")} icon="gear" anchor="system">
        <div class="relative space-y-6" slot="main">
          <SettingButton name={$_("settings.system.delete_links")} description={$_("settings.system.delete_links_description")} buttonText={$_("settings.system.delete")} buttonClass="button-warning" />
          <SettingButton name={$_("settings.system.import_backup")} description={$_("settings.system.import_backup_description")} buttonText={$_("settings.system.import")} buttonClass="button-warning" />
          <SettingButton name={$_("settings.system.update_firmware")} description={$_("settings.system.update_firmware_description")} buttonText={$_("settings.system.update")} buttonClass="button-warning" on:click={() => read_file(".bin", upload_firmware)} />
        </div>
      </CardSetting>
    </div>
  </div>
</div>
