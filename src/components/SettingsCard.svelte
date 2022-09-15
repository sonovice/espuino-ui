<script>
  import Icon from "./Icon.svelte";

  export let title;
  export let description;
  export let icon;
  export let anchor = ""
</script>

<div id={anchor} class="{$$props.class} relative overflow-hidden shadow sm:rounded-md">
  <Icon name={icon} style="solid" class="absolute w-40 -right-3 -top-3 text-zinc-50 -rotate-6"/>
  <div class="px-4 py-5 space-y-6 bg-white sm:p-6">
    <div>
      <h3 class="relative text-lg font-medium leading-6">{title}</h3>
      <p class="relative mt-1 text-sm text-zinc-500">{description}</p>
    </div>
    <slot name="main" />
  </div>
  {#if $$slots.actions}
    <div class="px-4 py-3 bg-zinc-50 sm:px-6">
      <slot name="actions"/>
    </div>
  {/if}
</div>