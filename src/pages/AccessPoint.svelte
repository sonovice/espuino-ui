<script>
    import { createEventDispatcher } from 'svelte';
    import {_} from "svelte-i18n";
    import SettingsCard from "../components/SettingsCard.svelte";
    import SettingText from "../components/SettingText.svelte";

    const dispatch = createEventDispatcher();

    export let settings;

    let openedModal = "wifi";

    function setWifiSettings() {
        dispatch('wifiSettings', settings);
    }
</script>


<div class="modal sm:modal-middle {openedModal === 'wifi' ? 'modal-open' : ''}">
  <div>
    <SettingsCard title="ESPuino WiFi Access Setup"
                  description="It seems that this ESPuino was not able to connect to the local WiFi or was started for the first time. Please enter the credentials for your WiFi access point."
                  icon="wifi"
                  class="sm:max-w-xl ">
      <div slot="main">
        <div class="grid grid-cols-2 gap-4">
          <SettingText class="col-span-2 sm:col-span-1" title={$_("settings.wifi.ssid")}
                       bind:value={settings.ssid}/>
          <SettingText class="col-span-2 sm:col-span-1" title={$_("common.password")} bind:value={settings.password}
                       type="password"/>
          <SettingText class="col-span-2" title={$_("settings.wifi.hostname")} bind:value={settings.hostname}/>
        </div>
      </div>
      <div slot="actions" class="flex flex-col-reverse gap-y-2 sm:flex-row sm:gap-x-2 sm:gap-y-0 sm:justify-end">
        <button class="button-primary" on:click={setWifiSettings}>
          {$_("common.save_and_reboot")}
        </button>
      </div>
    </SettingsCard>
  </div>
</div>