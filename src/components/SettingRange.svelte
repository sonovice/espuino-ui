<script>
  import Icon from "./Icon.svelte";

  export let text;
  export let icon;
  export let value;
  export let unit = "";
  export let min = "0";
  export let max = "100";
  export let step = "1";
  export let decimals = "0";

  $: shown_value = value === undefined ? '-' : value.toFixed(parseInt(decimals))
</script>

<div class="space-y-1">
  <span class="block text-sm font-medium text-zinc-700">{text}</span>
  <div class="flex items-center">
    <div class="flex-shrink-0 w-9">
      <Icon class="h-5 mx-auto text-zinc-800" name={icon} />
    </div>
    <input type="range" class="range range-secondary" {min} {max} {step} bind:value />
    <span class="block ml-2 font-mono text-right w-14">{shown_value}{unit}</span>
  </div>
</div>
