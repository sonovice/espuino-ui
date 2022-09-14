<script>
  import { _ } from 'svelte-i18n';
  import Icon from "../components/Icon.svelte";

  export let show;

  let setting_volume_restart = 6;
  let setting_volume_max_speaker = 18;
  let setting_volume_max_headphones = 6;
  let setting_led_restart = 182;
  let setting_led_night = 7;
  let setting_sleep_timer_minutes = 30;
  let setting_battery_warning = 3.4;
  let setting_battery_low = 3.3;
  let setting_battery_high = 3.7;
  let setting_battery_interval_minutes = 5;

  let settings_wifi_ssid = "Pretty fly for a wifi";
  let settings_wifi_password = "12345678";
  let settings_hostname = "%HOSTNAME%";

  let settings_ftp_username = "%FTP_USER%"
  let settings_ftp_password = "%FTP_PASS%"

  let settings_mqtt_enabled = false
  let settings_mqtt_host = "%MQTT_HOST%"
  let settings_mqtt_port = "%MQTT_PORT%"
  let settings_mqtt_username = "%MQTT_USER%"
  let settings_mqtt_password = "%MQTT_PASS%"

</script>

<div class="{show ? 'block' : 'hidden'} max-w-5xl mx-auto">
  <div class="flex flex-col justify-center md:flex-row">
    <div class="mx-0 mb-4 md:sticky top-4 sm:mx-4 h-fit">
      <nav class="space-y-1">
        <a href="#general" class="flex items-center px-3 py-2 text-sm font-medium text-zinc-900 hover:text-zinc-900 hover:bg-zinc-50 group sm:rounded-md">
          <Icon name="sliders" class="w-5 h-5 mr-3 text-zinc-400 group-hover:text-zinc-500" />
          <span class="truncate">{$_("settings.general.card_title")}</span>
        </a>
  
        <a href="#wifi" class="flex items-center px-3 py-2 text-sm font-medium text-zinc-900 hover:text-zinc-900 hover:bg-zinc-50 group sm:rounded-md">
          <Icon name="wifi" class="w-5 h-5 mr-3 text-zinc-400 group-hover:text-zinc-500" />
          <span class="truncate">{$_("settings.wifi.card_title")}</span>
        </a>
  
        <a href="#ftp" class="flex items-center px-3 py-2 text-sm font-medium text-zinc-900 hover:text-zinc-900 hover:bg-zinc-50 group sm:rounded-md">
          <Icon name="folder-open" class="w-5 h-5 mr-3 text-zinc-400 group-hover:text-zinc-500" />
          <span class="truncate">{$_("settings.ftp.card_title")}</span>
        </a>
  
        <a href="#mqtt" class="flex items-center px-3 py-2 text-sm font-medium text-zinc-900 hover:text-zinc-900 hover:bg-zinc-50 group sm:rounded-md">
          <Icon name="server" class="w-5 h-5 mr-3 text-zinc-400 group-hover:text-zinc-500" />
          <span class="truncate">{$_("settings.mqtt.card_title")}</span>
        </a>
      </nav>
    </div>
    <div class="mx-0 space-y-6 sm:mx-4">

      <form id="general" action="#" method="POST">
        <div class="relative overflow-hidden shadow sm:rounded-md">          
          <Icon name="sliders" style="solid" class="absolute w-40 -right-3 -top-3 text-zinc-100 -rotate-6"/>
          <div class="px-4 py-5 space-y-6 bg-white sm:p-6">
            <div>
              <h3 class="relative text-lg font-medium leading-6">{$_("settings.general.card_title")}</h3>
              <p class="relative mt-1 text-sm text-zinc-500">{$_("settings.general.card_description")}</p>
            </div>

            <div class="space-y-8 divide-y divide-zinc-200">
              <div>
                <h4 class="mb-4 font-medium">{$_("settings.general.volume")}</h4>
                <div class="space-y-6">
                  <div class="space-y-1">
                    <label class="block text-sm font-medium text-zinc-700">{$_("settings.general.volume_after_start")}</label>
                    <div class="flex items-center">
                      <div class="w-10"><Icon class="h-5 mx-auto mr-2 text-zinc-800" name="volume" /></div>
                      <input type="range" class="z-10 range range-secondary" min="1" max="21" step="1" bind:value={setting_volume_restart}/>
                      <span class="block ml-2 font-mono text-right w-14">{(setting_volume_restart - 1) * 5}%</span>
                    </div>
                  </div>
      
                  <div class="space-y-1">
                    <label class="block text-sm font-medium text-zinc-700">{$_("settings.general.volume_max_speaker")}</label>
                    <div class="flex items-center">
                      <div class="w-10"><Icon class="h-5 mx-auto mr-2 text-zinc-800" name="volume-high" /></div>
                      <input type="range" class="range range-secondary" min="1" max="21" step="1" bind:value={setting_volume_max_speaker}/>
                      <span class="block ml-2 font-mono text-right w-14">{(setting_volume_max_speaker - 1) * 5}%</span>
                    </div>
                  </div>

                  <div class="space-y-1">
                    <label class="block text-sm font-medium text-zinc-700">{$_("settings.general.volume_max_headphones")}</label>
                    <div class="flex items-center">
                      <div class="w-10"><Icon class="h-5 mx-auto mr-2 text-zinc-800" name="headphones" /></div>
                      <input type="range" class="range range-secondary" min="1" max="21" step="1" bind:value={setting_volume_max_headphones}/>
                      <span class="block ml-2 font-mono text-right w-14">{(setting_volume_max_headphones - 1) * 5}%</span>
                    </div>
                  </div>

                </div>
              </div>

              <div class="pt-6">
                <h4 class="mb-4 font-medium">{$_("settings.general.led_neopixel")}</h4>
                <div class="space-y-6">
                  <div class="space-y-1">
                    <label class="block text-sm font-medium text-zinc-700">{$_("settings.general.brightness_start")}</label>
                    <div class="flex items-center">
                      <div class="w-10"><Icon class="h-5 mx-auto mr-2 text-zinc-800" name="brightness" /></div>
                      <input type="range" class="range range-secondary" min="0" max="255" step="1" bind:value={setting_led_restart}/>
                      <span class="block ml-2 font-mono text-right w-14">{Math.round(setting_led_restart / 255 * 100)}%</span>
                    </div>
                  </div>
      
                  <div class="space-y-1">
                    <label class="block text-sm font-medium text-zinc-700">{$_("settings.general.brightness_night")}</label>
                    <div class="flex items-center">
                      <div class="w-10"><Icon class="h-5 mx-auto mr-2 text-zinc-800" name="brightness-low" /></div>
                      <input type="range" class="range range-secondary" min="0" max="255" step="1" bind:value={setting_led_night}/>
                      <span class="block ml-2 font-mono text-right w-14">{Math.round(setting_led_night / 255 * 100)}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="pt-6">
                <h4 class="mb-4 font-medium">{$_("settings.general.sleep_timer")}</h4>
                <div class="space-y-6">
                  <div class="space-y-1">
                    <label class="block text-sm font-medium text-zinc-700">{$_("settings.general.minutes_inactivity")}</label>
                    <div class="flex items-center">                  
                      <div class="w-10"><Icon class="h-5 mx-auto mr-2 text-zinc-800" name="snooze" /></div>
                      <input type="range" class="range range-secondary" min="0" max="120" step="5" bind:value={setting_sleep_timer_minutes}/>
                      <span class="block ml-2 font-mono text-right w-14">{setting_sleep_timer_minutes}m</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="pt-6">
                <h4 class="mb-4 font-medium">{$_("settings.general.battery")}</h4>
                <div class="space-y-6">
                  <div class="space-y-1">
                    <label class="block text-sm font-medium text-zinc-700">{$_("settings.general.battery_low")}</label>
                    <div class="flex items-center">
                      <div class="w-10"><Icon class="h-5 mx-auto mr-2 text-zinc-800" name="battery-low" /></div>
                      <input type="range" class="range range-secondary" min="2.5" max="5" step="0.01" bind:value={setting_battery_low}/>
                      <span class="block ml-2 font-mono text-right w-14">{setting_battery_low.toFixed(2)}V</span>
                    </div>
                  </div>

                  <div class="space-y-1">
                    <label class="block text-sm font-medium text-zinc-700">{$_("settings.general.battery_high")}</label>
                    <div class="flex items-center">
                      <div class="w-10"><Icon class="h-5 mx-auto mr-2 text-zinc-800" name="battery-full" /></div>
                      <input type="range" class="range range-secondary" min="2.5" max="5" step="0.01" bind:value={setting_battery_high}/>
                      <span class="block ml-2 font-mono text-right w-14">{setting_battery_high.toFixed(2)}V</span>
                    </div>
                  </div>

                  <div class="space-y-1">
                    <label class="block text-sm font-medium text-zinc-700">{$_("settings.general.battery_warning")}</label>
                    <div class="flex items-center">
                      <div class="w-10"><Icon class="h-5 mx-auto mr-2 text-zinc-800" name="battery-exclamation" /></div>
                      <input type="range" class="range range-secondary" min="2.5" max="5" step="0.01" bind:value={setting_battery_warning}/>
                      <span class="block ml-2 font-mono text-right w-14">{setting_battery_warning.toFixed(2)}V</span>
                    </div>
                  </div>

                  <div class="space-y-1">
                    <label class="block text-sm font-medium text-zinc-700">{$_("settings.general.battery_interval")}</label>
                    <div class="flex items-center">
                      <div class="w-10"><Icon class="h-5 mx-auto mr-2 text-zinc-800" name="clock" /></div>
                      <input type="range" class="range range-secondary" min="1" max="60" step="1" bind:value={setting_battery_interval_minutes}/>
                      <span class="block ml-2 font-mono text-right w-14">{setting_battery_interval_minutes}m</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
          <div class="px-4 py-3 text-right bg-zinc-50 sm:px-6">
            <button type="submit" class="inline-flex justify-center px-4 py-2 mr-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-zinc-500 hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">{$_("common.reset")}</button>
            <button type="submit" class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-orange-500 border border-transparent rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">{$_("common.save")}</button>
          </div>
        
        </div>
      </form>

      <form id="wifi" action="#" method="POST">
        <div class="relative overflow-hidden shadow sm:rounded-md">
          <Icon name="wifi" style="solid" class="absolute w-40 -right-3 -top-3 text-zinc-100 -rotate-6"/>
          <div class="px-4 py-5 space-y-6 bg-white sm:p-6">
            <div>
              <h3 class="relative text-lg font-medium leading-6 text-zinc-900">{$_("settings.wifi.card_title")}</h3>
              <p class="relative mt-1 text-sm text-zinc-500">{$_("settings.wifi.card_description")}</p>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="col-span-2 sm:col-span-1">
                <label class="block text-sm font-medium text-zinc-700">{$_("settings.wifi.ssid")}</label>
                <input type="text" name="ssid" bind:value={settings_wifi_ssid} class="block w-full mt-1 rounded-md shadow-sm border-zinc-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm">
              </div>
              <div class="col-span-2 sm:col-span-1">
                <label class="block text-sm font-medium text-zinc-700">{$_("common.password")}</label>
                <input type="password" name="password" bind:value={settings_wifi_password} class="block w-full mt-1 rounded-md shadow-sm border-zinc-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm">
              </div>
              <div class="col-span-2">
                <label class="block text-sm font-medium text-zinc-700">{$_("settings.wifi.hostname")}</label>
                <input type="text" name="first-name" bind:value={settings_hostname} class="block w-full mt-1 rounded-md shadow-sm border-zinc-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm">
              </div>
            </div>

    
          </div>
          <div class="px-4 py-3 text-right bg-zinc-50 sm:px-6">
            <button type="submit" class="inline-flex justify-center px-4 py-2 mr-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-zinc-500 hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">{$_("common.reset")}</button>
            <button type="submit" class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-orange-500 border border-transparent rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">{$_("common.save")}</button>
          </div>
        </div>
      </form>

      <form id="ftp" action="#" method="POST">
        <div class="relative overflow-hidden shadow sm:rounded-md">
          <Icon name="folder-open" style="solid" class="absolute w-40 -right-3 -top-5 text-zinc-100 -rotate-6"/>
          <div class="px-4 py-5 space-y-6 bg-white sm:p-6">
            <div>
              <h3 class="relative text-lg font-medium leading-6 text-zinc-900">{$_("settings.ftp.card_title")}</h3>
              <p class="relative mt-1 text-sm text-zinc-500">{$_("settings.ftp.card_description")}</p>
            </div>

            <div class="relative grid grid-cols-2 gap-4">
              <div class="col-span-2 sm:col-span-1">
                <label class="block text-sm font-medium text-zinc-700">{$_("common.username")}</label>
                <input type="text" name="username" bind:value={settings_ftp_username} class="block w-full mt-1 rounded-md shadow-sm border-zinc-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm">
              </div>
              <div class="col-span-2 sm:col-span-1">
                <label class="block text-sm font-medium text-zinc-700">{$_("common.password")}</label>
                <input type="password" name="password" bind:value={settings_ftp_password} class="block w-full mt-1 rounded-md shadow-sm border-zinc-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm">
              </div>
            </div>

    
          </div>
          <div class="px-4 py-3 text-right bg-zinc-50 sm:px-6">
            <button type="submit" class="inline-flex justify-center px-4 py-2 mr-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-zinc-500 hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">{$_("common.reset")}</button>
            <button type="submit" class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-orange-500 border border-transparent rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">{$_("settings.ftp.start_server")}</button>
          </div>
        </div>
      </form>

      <form id="mqtt" action="#" method="POST">
        <div class="relative overflow-hidden shadow sm:rounded-md">
          <Icon name="server" style="solid" class="absolute w-40 -right-2 -top-3 text-zinc-100 -rotate-6"/>
          <div class="px-4 py-5 space-y-6 bg-white sm:p-6">
            <div>
              <h3 class="relative text-lg font-medium leading-6 text-zinc-900">{$_("settings.mqtt.card_title")}</h3>
              <p class="relative mt-1 text-sm text-zinc-500">{$_("settings.mqtt.card_description")}</p>
            </div>

            <div class="relative grid grid-cols-4 gap-4">
              <div class="col-span-4 sm:col-span-3">
                <label class="block text-sm font-medium text-zinc-700">{$_("common.server")}</label>
                <input type="text" name="server" bind:value={settings_mqtt_host} class="block w-full mt-1 rounded-md shadow-sm border-zinc-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm">
              </div>
              <div class="col-span-4 sm:col-span-1">
                <label class="block text-sm font-medium text-zinc-700">{$_("common.port")}</label>
                <input type="number" name="port" bind:value={settings_mqtt_port} class="block w-full mt-1 rounded-md shadow-sm border-zinc-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm">
              </div>
              <div class="col-span-4 sm:col-span-2">
                <label class="block text-sm font-medium text-zinc-700">{$_("common.username")} ({$_("common.optional")})</label>
                <input type="text" name="username" bind:value={settings_mqtt_username} class="block w-full mt-1 rounded-md shadow-sm border-zinc-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm">
              </div>
              <div class="col-span-4 sm:col-span-2">
                <label class="block text-sm font-medium text-zinc-700">{$_("common.password")} ({$_("common.optional")})</label>
                <input type="password" name="password" bind:value={settings_mqtt_password} class="block w-full mt-1 rounded-md shadow-sm border-zinc-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm">
              </div>
            </div>

    
          </div>
          <div class="px-4 py-3 text-right bg-zinc-50 sm:px-6">
            <button type="submit" class="inline-flex justify-center px-4 py-2 mr-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-zinc-500 hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">{$_("common.reset")}</button>
            <button type="submit" class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-orange-500 border border-transparent rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">{$_("common.save")}</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>