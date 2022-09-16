<script>
  import Icon from "../components/Icon.svelte";

  export let show;
</script>

<div class="{show ? 'block' : 'hidden'} max-w-3xl mx-auto">
  <div class="overflow-hidden shadow-md sm:rounded-md sm:mx-4">
    <div class="flex flex-col items-center bg-white sm:items-stretch sm:flex-row">
      <div class="object-contain mx-4 mt-4 overflow-hidden rounded-md sm:mx-0 sm:mt-0 sm:rounded-none">
        <img
          class="max-h-96"
          alt="Album cover"
          src="https://images.unsplash.com/photo-1509781827353-fb95c262fc40?auto=format&fit=crop&w=500&h=500&q=80"
        />
      </div>
      <div class="flex flex-col justify-between w-full">
        <div class="my-4 ml-6">
          <div class="text-lg font-medium sm:text-2xl">The Kids Aren't Alright</div>
          <div class="text-md sm:text-lg">The Offspring</div>
        </div>
        <div class="flex flex-row items-center justify-around h-24 px-[5%] bg-zinc-50">
          <button class="p-2 rounded-full text-zinc-500 hover:text-zinc-600 focus:ring-4 focus:ring-zinc-500 focus:outline-none focus:ring-offset-2 focus:ring-offset-zinc-50">
            <Icon class="h-7" name="backward-fast" style="solid" />
          </button>
          <button class="p-2 rounded-full text-zinc-500 hover:text-zinc-600 focus:ring-4 focus:ring-zinc-500 focus:outline-none focus:ring-offset-2 focus:ring-offset-zinc-50">
            <Icon class="h-7" name="backward" style="solid" />
          </button>
          <button class="p-0 text-white rounded-full focus:ring-4 focus:ring-orange-500 focus:outline-none focus:ring-offset-1 focus:ring-offset-zinc-50">
            <div class="flex items-center justify-center w-16 h-16 bg-orange-500 rounded-full hover:bg-orange-600">
              <Icon class="h-10 " name="pause" style="solid" />
            </div>
          </button>
          <button class="p-2 rounded-full text-zinc-500 hover:text-zinc-600 focus:ring-4 focus:ring-zinc-500 focus:outline-none focus:ring-offset-2 focus:ring-offset-zinc-50">
            <Icon class="h-7" name="forward" style="solid" />
          </button>
          <button class="p-2 rounded-full text-zinc-500 hover:text-zinc-600 focus:ring-4 focus:ring-zinc-500 focus:outline-none focus:ring-offset-2 focus:ring-offset-zinc-50">
            <Icon class="h-7" name="forward-fast" style="solid" />
        </button>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- <div class="flex justify-center {show ? '' : 'hidden'}">
  <div class="overflow-hidden bg-white shadow-lg rounded-xl">
    <img
      class="object-contain w-96"
      alt="Album cover"
      src="https://images.unsplash.com/photo-1509781827353-fb95c262fc40?auto=format&fit=crop&w=900&h=900&q=80"
    />
    <div class="w-full p-3">
      <div class="flex items-center justify-between h-24 px-5 py-3">
        <Fa icon={faBackwardStep} size="2x" class="text-zinc-700" />
        <Fa icon={faBackward} size="2x" class="text-zinc-700" />
        <Fa icon={faPlay} size="3x" class="text-orange-400" />
        <Fa icon={faForward} size="2x" class="text-zinc-700" />
        <Fa icon={faForwardStep} size="2x" class="text-zinc-700" />
      </div>
    </div>
  </div>
</div> -->
