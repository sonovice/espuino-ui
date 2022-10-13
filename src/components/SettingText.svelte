<script>
  export let title;
  export let value;
  export let name;
  export let type = "text";
  export let disabled = false;

  // Prevent "type" from being a two way binding
  function type_action(node) {
    node.type = type;
  }
</script>

<div class={$$props.class}>
  <span class="block text-sm font-medium text-zinc-700">{title}</span>
  <input use:type_action bind:value={value} id={name} {name} class="block w-full mt-1 rounded-md shadow-sm border-zinc-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm" {disabled}>
</div>
