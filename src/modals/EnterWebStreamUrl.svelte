<script>
    export let isOpened = false;
    export let webStreamUrl = "";


</script>

<div class="modal modal-bottom sm:modal-middle {isOpened ? 'modal-open' : ''}">
  <div class="modal-box p-0 flex flex-col max-h-[85vh]">
    <div class="font-medium px-4 py-4">
      Enter web stream URL
    </div>
    <div class="px-4 pb-4">
      <input type="text" name="url" id="url"
             class="block w-full rounded-md border-zinc-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
             placeholder="https://"
             bind:value={webStreamUrl}
      >
    </div>
    <div
        class="px-4 py-3 bg-zinc-100 flex flex-row gap-x-2 sm:justify-end">
      <button class="button button-secondary w-full sm:w-fit" on:click={() => isOpened=false}>Cancel</button>
      <button class="button button-primary w-full sm:w-fit" on:click={() => isOpened=false}>Assign</button>
    </div>
  </div>
</div>