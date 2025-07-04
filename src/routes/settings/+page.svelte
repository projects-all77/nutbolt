<script>
  import { onMount } from 'svelte';
  
  let settings = {
    theme: 'light',
    fontSize: 'medium',
    autoSave: true,
    notifications: true,
    defaultFolder: '',
    exportFormat: 'markdown'
  };
  
  let folders = [];
  
  onMount(() => {
    // Load settings and folders from database
    folders = [
      { id: '1', name: 'Work' },
      { id: '2', name: 'Personal' },
      { id: '3', name: 'Ideas' }
    ];
  });
  
  function saveSettings() {
    // Save settings to database
    console.log('Saving settings:', settings);
    // Show success message
  }
</script>

<div class="container mx-auto p-4">
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold">Settings</h1>
    <a href="/notes" class="text-gray-500 hover:text-gray-700">← Back to Notes</a>
  </div>
  
  <div class="max-w-2xl">
    <form on:submit|preventDefault={saveSettings} class="space-y-6">
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-4">Appearance</h2>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Theme</label>
            <select bind:value={settings.theme} class="w-full p-2 border border-gray-300 rounded-md">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
            <select bind:value={settings.fontSize} class="w-full p-2 border border-gray-300 rounded-md">
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
        </div>
      </div>
      
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-4">Editor</h2>
        
        <div class="space-y-4">
          <div class="flex items-center">
            <input
              type="checkbox"
              id="autoSave"
              bind:checked={settings.autoSave}
              class="mr-2"
            />
            <label for="autoSave" class="text-sm font-medium text-gray-700">Auto-save notes</label>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Default Folder</label>
            <select bind:value={settings.defaultFolder} class="w-full p-2 border border-gray-300 rounded-md">
              <option value="">None</option>
              {#each folders as folder}
                <option value={folder.id}>{folder.name}</option>
              {/each}
            </select>
          </div>
        </div>
      </div>
      
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-4">Notifications</h2>
        
        <div class="flex items-center">
          <input
            type="checkbox"
            id="notifications"
            bind:checked={settings.notifications}
            class="mr-2"
          />
          <label for="notifications" class="text-sm font-medium text-gray-700">Enable notifications</label>
        </div>
      </div>
      
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-4">Export</h2>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Default Export Format</label>
          <select bind:value={settings.exportFormat} class="w-full p-2 border border-gray-300 rounded-md">
            <option value="markdown">Markdown</option>
            <option value="html">HTML</option>
            <option value="pdf">PDF</option>
            <option value="txt">Plain Text</option>
          </select>
        </div>
      </div>
      
      <div class="flex gap-2">
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
        >
          Save Settings
        </button>
        <button
          type="button"
          class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md"
        >
          Reset to Defaults
        </button>
      </div>
    </form>
  </div>
</div>