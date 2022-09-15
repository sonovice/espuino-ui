<script>
  export let enabled = false;
  export let text = "";
</script>

<div class="flex items-center">
  <button type="button" class="relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
                               {enabled ? 'bg-orange-500' : 'bg-zinc-200'}" role="switch" aria-checked="false" aria-labelledby="annual-billing-label" on:click={() => enabled = !enabled}>
    <span aria-hidden="true" class="inline-block w-5 h-5 transition duration-200 ease-in-out transform  bg-white rounded-full shadow pointer-events-none ring-0
                                    {enabled ? 'translate-x-5' : 'translage-x-0'}"></span>
  </button>
  <span class="ml-3 text-sm font-medium text-zinc-900" id="annual-billing-label">{text}
  </span>
</div>