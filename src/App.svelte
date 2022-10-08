<script>
    import {_} from 'svelte-i18n';

    import TopNavigation from "./components/NavigationTop.svelte";
    import BottomNavigation from "./components/NavigationBottom.svelte";
    import Control from "./pages/Control.svelte";
    import Settings from "./pages/Settings.svelte";
    import Tags from "./pages/Tags.svelte";
    import {onMount} from "svelte";
    import axios from "axios";
    import AccessPoint from "./pages/AccessPoint.svelte";

    // @formatter:off
    const navigationPages = [
        // [id,      name,                     icon]
        ["control",  $_("control.page_name"),  "play-pause"],
        ["tags",     $_("tags.page_name"),     "nfc"],
        ["settings", $_("settings.page_name"), "sliders"],
    ];
    // @formatter:on

    let current_page = "control";
    let main_area;

    let settings = {
        wifi: {
            ssid: "",
            password: "",
            hostname: "espuino"
        }
    };
    let isConnected;
    let batteryLevel = 42;


    onMount(() => {
        const sse = new EventSource('/events');

        sse.onopen = (e) => {
            isConnected = true;
        }

        sse.onerror = (e) => {
            isConnected = true;
            // TODO show error message
        }

        sse.addEventListener("status", (e) => {
            e.data // rssi, battery, battery loading status
        });

        sse.addEventListener("tag", (e) => {
        });

        sse.addEventListener("cover", (e) => {
        });

        sse.addEventListener("trackinfo", (e) => {
        });

        sse.addEventListener("volume", (e) => {
        });
    })

    function changePage(event) {
        main_area.scrollTo(0, 0);
        current_page = event.detail;
    }

    function getSettings(group = undefined) {
        let endpoint = "https://run.mocky.io/v3/bbe6b393-b162-473b-b8dc-69e3c1d56844"; // TODO replace with "/api/settings"
        if (group !== undefined) endpoint += `?group=${group}`;

        axios.get(endpoint)
            .then((response) => {
                settings = {...settings, ...response.data}; // Update local settings with response data
            })
            .catch((error) => {
                console.log(error) // TODO handle errors
            })
    }

    function handleWifiSettings(event) {
        // TODO Send settings to device and reboot
        settings.wifi = event.detail;
    }
</script>

{#if settings?.wifi?.ssid === "" || settings?.wifi?.ssid === undefined}
  <AccessPoint settings={settings.wifi} on:wifiSettings={handleWifiSettings}/>
{:else}
  <TopNavigation navigationPages={navigationPages} page={current_page} {isConnected} {batteryLevel} on:changePage={changePage}/>
  <main class="flex flex-col items-center flex-1 h-full overflow-y-auto" bind:this={main_area}>
    <div class="w-full pt-4 pb-4 h-full">
      <Control show={current_page === "control"}/>
      <Tags show={current_page === "tags"}/>
      <Settings show={current_page === "settings"}/>
    </div>
  </main>
  <BottomNavigation navigationPages={navigationPages} page={current_page} on:changePage={changePage}/>
{/if}