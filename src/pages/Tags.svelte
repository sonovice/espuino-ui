<script>
    import FileViewer from "../components/FileViewer.svelte";

    export let show;
</script>

<div class="{show ? '' : 'hidden'} max-w-3xl mx-auto space-y-6">
  <div class="relative px-4 py-5 overflow-hidden bg-white shadow-md sm:rounded-md sm:mx-4">
    <FileViewer path="/Music/Kids/Horror" />
  </div>
</div>
