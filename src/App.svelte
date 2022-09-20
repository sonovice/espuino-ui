<script>
  import { _ } from 'svelte-i18n';

  import TopNavigation from "./components/NavigationTop.svelte";
  import BottomNavigation from "./components/NavigationBottom.svelte";
  import Control from "./pages/Control.svelte";
  import Settings from "./pages/Settings.svelte";
  import Tags from "./pages/Tags.svelte";

  const navigationPages = [
    // [id,      name,                     icon]
    ["control",  $_("control.page_name"),  "play-pause"],
    ["tags",     $_("tags.page_name"),     "nfc"],
    ["settings", $_("settings.page_name"), "sliders"],
  ];

  let current_page = "control";
  let main_area;

  const gateway = `ws://${window.location.hostname}/ws`;

  function changePage(event) {
    main_area.scrollTo(0, 0);
    current_page = event.detail;
  }
</script>


<TopNavigation navigationPages={navigationPages} page={current_page} on:changePage={changePage}/>

<main class="flex flex-col items-center flex-1 h-full overflow-y-auto" bind:this={main_area}>
  <div class="w-full pt-4 pb-4">
    <Control show={current_page === "control"}/>
    <Tags show={current_page === "collection"}/>
    <Settings show={current_page === "settings"}/>
  </div>
</main>

<BottomNavigation navigationPages={navigationPages} page={current_page} on:changePage={changePage}/>