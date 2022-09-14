<script>
  import { _ } from 'svelte-i18n';

  import TopNavigation from "./components/NavigationTop.svelte";
  import BottomNavigation from "./components/NavigationBottom.svelte";
  import Control from "./pages/Control.svelte";
  import Settings from "./pages/Settings.svelte";
  import Rfid from "./pages/Rfid.svelte";
  import System from "./pages/System.svelte";

  const navigationPages = [
    // [id,      name,                     icon]
    ["control",  $_("control.page_name"),  "music"],
    ["rfid",     $_("rfid.page_name"),     "nfc"],
    ["settings", $_("settings.page_name"), "sliders"],
    ["system",   $_("system.page_name"),   "gear"],
  ];

  let current_page = "control";

  function changePage(event) {
    current_page = event.detail;
  }
</script>


<TopNavigation navigationPages={navigationPages} page={current_page} on:changePage={changePage}/>

<main class="flex flex-col items-center flex-1 h-full overflow-y-auto">
  <div class="w-full pt-4 pb-4">
  <Control show={current_page === "control"}/>
  <Rfid show={current_page === "rfid"}/>
  <Settings show={current_page === "settings"}/>
  <System show={current_page === "system"}/>
</div>
</main>

<BottomNavigation navigationPages={navigationPages} page={current_page} on:changePage={changePage}/>