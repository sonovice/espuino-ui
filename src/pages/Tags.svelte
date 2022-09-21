<script>
    import SettingsCard from "../components/SettingsCard.svelte";
    import FileViewer from "../components/FileViewer.svelte";

    export let show;
</script>

<div class="{show ? '' : 'hidden'} max-w-3xl mx-auto space-y-6">
  <SettingsCard title="Files" icon="folder-open" description="Foo bar">
    <div slot="main" class="relative">
      <FileViewer dir="/Music/Kids/Horror" />
    </div>
</SettingsCard>
</div>
