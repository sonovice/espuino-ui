<script>
  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';

  import CardSetting from '../components/SettingsCard.svelte';
  import Divider from '../components/Divider.svelte';
  import Icon from "../components/Icon.svelte";
  import RangedSetting from '../components/SettingRange.svelte';
  import TextSetting from '../components/SettingText.svelte';  

  export let show;

  let settings = {
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

    wifi_ssid: undefined,
    wifi_password: undefined,
    wifi_hostname: undefined,

    ftp_username: undefined,
    ftp_password: undefined,

    mqtt_enabled: undefined,
    mqtt_host: undefined,
    mqtt_port: undefined,
    mqtt_username: undefined,
    mqtt_password: undefined,
  }


  onMount(async () => {
    // TODO replace with actual HTTP GET calls to backend

  });

  function getWifiConfig() {

  }


  
</script>

<div class="{show ? 'block' : 'hidden'} max-w-5xl mx-auto">
  <div class="flex flex-col justify-center md:flex-row">
    
    <!-- Quick access navigation -->
    <div class="mx-0 mb-4 md:sticky top-4 sm:mx-4 h-fit">
      <div class="space-y-1">
        {#each [
          ["#general", $_("settings.general.card_title"), "sliders"],
          ["#wifi", $_("settings.wifi.card_title"), "wifi"],
          ["#ftp", $_("settings.ftp.card_title"), "folder-open"],
          ["#mqtt", $_("settings.mqtt.card_title"), "server"],
          ["#system", $_("settings.system.card_title"), "gear"],
        ] as [anchor, text, icon]}
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
            <RangedSetting text={$_("settings.general.volume_after_start")} bind:value={settings.volume_start_percent} icon="volume" step="5" unit="%" />
            <RangedSetting text={$_("settings.general.volume_max_speaker")} bind:value={settings.volume_max_speaker_percent} icon="speaker" step="5" unit="%" />
            <RangedSetting text={$_("settings.general.volume_max_headphones")} bind:value={settings.volume_max_headphones_percent} icon="headphones" step="5" unit="%" />
          </div>
          
          <Divider />
          
          <!-- LED (NeoPixel) -->
          <h4 class="mb-4 font-medium">{$_("settings.general.led_neopixel")}</h4>
          <div class="space-y-6">
            <RangedSetting text={$_("settings.general.brightness_start")} bind:value={settings.led_restart_percent} icon="brightness" step="1" unit="%" />
            <RangedSetting text={$_("settings.general.brightness_night")} bind:value={settings.led_night_percent} icon="brightness-low" step="1" unit="%" />
          </div>
          
          <Divider />
          
          <!-- Power saving -->
          <h4 class="mb-4 font-medium">{$_("settings.general.power_saving")}</h4>
          <RangedSetting text={$_("settings.general.minutes_inactivity")} bind:value={settings.power_saving_minutes} icon="snooze" max="120" step="5" unit="m" />
          
          <Divider />
          
          <!-- Battery -->
          <h4 class="mb-4 font-medium">{$_("settings.general.battery")}</h4>
          <div class="space-y-6">
            <RangedSetting text={$_("settings.general.battery_low")} bind:value={settings.battery_low_voltage} icon="battery-low" min="2.5" max="5" step="0.01" decimals="2" unit="V" />
            <RangedSetting text={$_("settings.general.battery_high")} bind:value={settings.battery_high_voltage} icon="battery-full" min="2.5" max="5" step="0.01" decimals="2" unit="V" />
            <RangedSetting text={$_("settings.general.battery_warning")} bind:value={settings.battery_warning_voltage} icon="battery-exclamation" min="2.5" max="5" step="0.01" decimals="2" unit="V" />
            <RangedSetting text={$_("settings.general.battery_interval")} bind:value={settings.battery_interval_minutes} icon="clock" max="60" step="5" unit="m" />
          </div>
        </div>
        <div slot="actions">
          <button class="mr-2 button-secondary">{$_("common.reset")}</button>
          <button class="button-primary">{$_("common.save")}</button>
        </div>
      </CardSetting>

      <!-- WiFi settings -->
      <CardSetting title={$_("settings.wifi.card_title")} description={$_("settings.wifi.card_description")} icon="wifi" anchor="wifi">
        <div slot="main">
          <div class="grid grid-cols-2 gap-4">
            <TextSetting class="col-span-2 sm:col-span-1" title={$_("settings.wifi.ssid")} bind:value={settings.wifi_ssid} />
            <TextSetting class="col-span-2 sm:col-span-1" title={$_("common.password")} bind:value={settings.wifi_password} />
            <TextSetting class="col-span-2" title={$_("settings.wifi.hostname")} bind:value={settings.wifi_hostname} />
          </div>
        </div>
        <div slot="actions">
          <button class="mr-2 button-secondary">{$_("common.reset")}</button>
          <button class="button-primary">{$_("common.save")}</button>
        </div>
      </CardSetting>

      <!-- FTP settings -->
      <CardSetting title={$_("settings.ftp.card_title")} description={$_("settings.ftp.card_description")} icon="folder-open" anchor="ftp">
        <div slot="main">
          <div class="relative grid grid-cols-2 gap-4">
            <TextSetting class="col-span-2 sm:col-span-1" title={$_("common.username")} bind:value={settings.ftp_username} />
            <TextSetting class="col-span-2 sm:col-span-1" title={$_("common.password")} bind:value={settings.ftp_password} type="password" />
          </div>
        </div>
        <div slot="actions">
          <button class="mr-2 button-secondary">{$_("common.reset")}</button>
          <button class="button-primary">{$_("settings.ftp.start_server")}</button>
        </div>
      </CardSetting>

      <!-- MQTT settings -->
      <CardSetting title={$_("settings.mqtt.card_title")} description={$_("settings.mqtt.card_description")} icon="server" anchor="mqtt">
        <div slot="main">
          <div class="relative grid grid-cols-4 gap-4">
            <TextSetting class="col-span-4 sm:col-span-3" title={$_("common.server")} bind:value={settings.mqtt_host} />
            <TextSetting class="col-span-4 sm:col-span-1" title={$_("common.port")} bind:value={settings.mqtt_port} type="number" />
            <TextSetting class="col-span-4 sm:col-span-2" title={$_("common.username")} bind:value={settings.mqtt_username} />
            <TextSetting class="col-span-4 sm:col-span-2" title={$_("common.password")} bind:value={settings.mqtt_password} type="password" />
          </div>
        </div>
        <div slot="actions">
          <button class="mr-2 button-secondary">{$_("common.reset")}</button>
          <button class="button-primary">{$_("common.save")}</button>
        </div>
      </CardSetting>

      <!-- System settings -->
      <CardSetting title={$_("settings.system.card_title")} description={$_("settings.system.card_description")} icon="gear" anchor="system">
        <div slot="main">
          <div>{$_("settings.system.delete_assignments")}</div>
          <div>{$_("settings.system.import_backup")}</div>
          <div>{$_("settings.system.update_firmware")}</div>
        </div>
        <div slot="actions">
          <button class="mr-2 button-secondary">{$_("common.reset")}</button>
          <button class="button-primary">{$_("common.save")}</button>
        </div>
      </CardSetting>
    </div>
  </div>
</div>