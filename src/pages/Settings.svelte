<script>
  import { _ } from 'svelte-i18n';

  import Icon from "../components/Icon.svelte";
  import RangedSetting from '../components/SettingRange.svelte';
  import TextSetting from '../components/SettingText.svelte';
  import Divider from '../components/Divider.svelte';
  import CardSetting from '../components/SettingsCard.svelte';

  export let show;

  let setting_volume_start_percent = 25;
  let setting_volume_max_speaker_percent = 85;
  let setting_volume_max_headphones_percent = 40;
  let setting_led_restart_percent = 80;
  let setting_led_night_percent = 5;
  let setting_sleep_timer_minutes = 30;
  let setting_battery_warning_voltage = 3.4;
  let setting_battery_low_voltage = 3.3;
  let setting_battery_high_voltage = 3.7;
  let setting_battery_interval_minutes = 5;

  let settings_wifi_ssid = "Pretty fly for a wifi";
  let settings_wifi_password = "12345678";
  let settings_hostname = "%HOSTNAME%";

  let settings_ftp_username = "%FTP_USER%";
  let settings_ftp_password = "%FTP_PASS%";

  let settings_mqtt_enabled = false;
  let settings_mqtt_host = "%MQTT_HOST%";
  let settings_mqtt_port = "%MQTT_PORT%";
  let settings_mqtt_username = "%MQTT_USER%";
  let settings_mqtt_password = "%MQTT_PASS%";

</script>

<div class="{show ? 'block' : 'hidden'} max-w-5xl mx-auto">
  <div class="flex flex-col justify-center md:flex-row">
    <div class="mx-0 mb-4 md:sticky top-4 sm:mx-4 h-fit">
      <div class="space-y-1">
        {#each [
          ["#general", $_("settings.general.card_title"), "sliders"],
          ["#wifi", $_("settings.wifi.card_title"), "wifi"],
          ["#ftp", $_("settings.ftp.card_title"), "folder-open"],
          ["#mqtt", $_("settings.mqtt.card_title"), "server"],
        ] as [anchor, text, icon]}
          <a href={anchor} class="flex items-center px-3 py-2 text-sm font-medium text-zinc-900 hover:text-zinc-900 hover:bg-zinc-50 group sm:rounded-md">
            <Icon name={icon} class="w-5 h-5 mr-3 text-zinc-400 group-hover:text-zinc-500" />
            <span class="truncate">{text}</span>
          </a>
        {/each}
      </div>
    </div>

    <div class="mx-0 space-y-6 sm:mx-4">
      <CardSetting title={$_("settings.general.card_title")} description={$_("settings.general.card_description")} icon="sliders">
        <div slot="main">
          <h4 class="mb-4 font-medium">{$_("settings.general.volume")}</h4>
          <div class="space-y-6">
            <RangedSetting text={$_("settings.general.volume_after_start")} bind:value={setting_volume_start_percent} icon="volume" step="5" />
            <RangedSetting text={$_("settings.general.volume_max_speaker")} bind:value={setting_volume_max_speaker_percent} icon="volume-high" step="5" />
            <RangedSetting text={$_("settings.general.volume_max_headphones")} bind:value={setting_volume_max_headphones_percent} icon="headphones" step="5" />
          </div>
          
          <Divider />
          
          <h4 class="mb-4 font-medium">{$_("settings.general.led_neopixel")}</h4>
          <div class="space-y-6">
            <RangedSetting text={$_("settings.general.brightness_start")} bind:value={setting_led_restart_percent} icon="brightness" step="1" />
            <RangedSetting text={$_("settings.general.brightness_night")} bind:value={setting_led_night_percent} icon="brightness-low" step="1" />
          </div>
          
          <Divider />
          
          <h4 class="mb-4 font-medium">{$_("settings.general.sleep_timer")}</h4>
          <RangedSetting text={$_("settings.general.minutes_inactivity")} bind:value={setting_sleep_timer_minutes} icon="snooze" max="120" step="5" unit="m" />
          
          <Divider />
          
          <h4 class="mb-4 font-medium">{$_("settings.general.battery")}</h4>
          <div class="space-y-6">
            <RangedSetting text={$_("settings.general.battery_low")} bind:value={setting_battery_low_voltage} icon="battery-low" min="2.5" max="5" step="0.01" decimals="2" unit="V" />
            <RangedSetting text={$_("settings.general.battery_high")} bind:value={setting_battery_high_voltage} icon="battery-full" min="2.5" max="5" step="0.01" decimals="2" unit="V" />
            <RangedSetting text={$_("settings.general.battery_warning")} bind:value={setting_battery_warning_voltage} icon="battery-exclamation" min="2.5" max="5" step="0.01" decimals="2" unit="V" />
            <RangedSetting text={$_("settings.general.battery_interval")} bind:value={setting_battery_interval_minutes} icon="clock" max="60" step="5" unit="m" />
          </div>
          
        </div>
        <div slot="actions">
          <button type="submit" class="inline-flex justify-center px-4 py-2 mr-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-zinc-500 hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">{$_("common.reset")}</button>
          <button type="submit" class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-orange-500 border border-transparent rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">{$_("common.save")}</button>
        </div>
      </CardSetting>

      <CardSetting title={$_("settings.wifi.card_title")} description={$_("settings.wifi.card_description")} icon="wifi">
        <div slot="main">
          <div class="grid grid-cols-2 gap-4">
            <TextSetting class="col-span-2 sm:col-span-1" title={$_("settings.wifi.ssid")} bind:value={settings_wifi_ssid} />
            <TextSetting class="col-span-2 sm:col-span-1" title={$_("common.password")} bind:value={settings_wifi_password} />
            <TextSetting class="col-span-2" title={$_("settings.wifi.hostname")} bind:value={settings_hostname} />
          </div>
        </div>
        <div slot="actions">
          <button type="submit" class="inline-flex justify-center px-4 py-2 mr-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-zinc-500 hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">{$_("common.reset")}</button>
          <button type="submit" class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-orange-500 border border-transparent rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">{$_("common.save")}</button>
        </div>
      </CardSetting>

      <CardSetting title={$_("settings.ftp.card_title")} description={$_("settings.ftp.card_description")} icon="folder-open">
        <div slot="main">
          <div class="relative grid grid-cols-2 gap-4">
            <TextSetting class="col-span-2 sm:col-span-1" title={$_("common.username")} bind:value={settings_ftp_username} />
            <TextSetting class="col-span-2 sm:col-span-1" title={$_("common.password")} bind:value={settings_ftp_password} type="password" />
          </div>
        </div>
        <div slot="actions">
          <button type="submit" class="inline-flex justify-center px-4 py-2 mr-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-zinc-500 hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">{$_("common.reset")}</button>
          <button type="submit" class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-orange-500 border border-transparent rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">{$_("settings.ftp.start_server")}</button>
        </div>
      </CardSetting>

      <CardSetting title={$_("settings.mqtt.card_title")} description={$_("settings.mqtt.card_description")} icon="server">
        <div slot="main">
          <div class="relative grid grid-cols-4 gap-4">
            <TextSetting class="col-span-4 sm:col-span-3" title={$_("common.server")} bind:value={settings_mqtt_host} />
            <TextSetting class="col-span-4 sm:col-span-1" title={$_("common.port")} bind:value={settings_mqtt_port} type="number" />
            <TextSetting class="col-span-4 sm:col-span-2" title={$_("common.username")} bind:value={settings_mqtt_username} />
            <TextSetting class="col-span-4 sm:col-span-2" title={$_("common.password")} bind:value={settings_mqtt_password} type="password" />
          </div>
        </div>
        <div slot="actions">
          <button type="submit" class="inline-flex justify-center px-4 py-2 mr-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-zinc-500 hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">{$_("common.reset")}</button>
          <button type="submit" class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-orange-500 border border-transparent rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">{$_("common.save")}</button>
        </div>
      </CardSetting>
    </div>
  </div>
</div>