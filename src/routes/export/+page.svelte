<script>
  import { onMount } from 'svelte';
  
  let exportOptions = {
    format: 'markdown',
    includeArchived: false,
    includeDeleted: false,
    selectedFolders: [],
    selectedTags: [],
    dateRange: 'all'
  };
  
  let folders = [];
  let tags = [];
  let exporting = false;
  let exportProgress = 0;
  
  onMount(() => {
    // Load folders and tags
    folders = [
      { id: '1', name: 'Work', noteCount: 15 },
      { id: '2', name: 'Personal', noteCount: 8 },
      { id: '3', name: 'Ideas', noteCount: 12 }
    ];
    
    tags = [
      { name: 'work', count: 15 },
      { name: 'personal', count: 8 },
      { name: 'ideas', count: 12 }
    ];
  });
  
  function toggleFolder(folderId) {
    if (exportOptions.selectedFolders.includes(folderId)) {
      exportOptions.selectedFolders = exportOptions.selectedFolders.filter(id => id !== folderId);
    } else {
      exportOptions.selectedFolders = [...exportOptions.selectedFolders, folderId];
    }
  }
  
  function toggleTag(tagName) {
    if (exportOptions.selectedTags.includes(tagName)) {
      exportOptions.selectedTags = exportOptions.selectedTags.filter(tag => tag !== tagName);
    } else {
      exportOptions.selectedTags = [...exportOptions.selectedTags, tagName];
    }
  }
  
  async function startExport() {
    exporting = true;
    exportProgress = 0;
    
    // Simulate export progress
    const interval = setInterval(() => {
      exportProgress += 10;
      if (exportProgress >= 100) {
        clearInterval(interval);
        exporting = false;
        
        // Trigger download
        const filename = `notes-export-${new Date().toISOString().split('T')[0]}.${exportOptions.format}`;
        console.log(`Export complete: ${filename}`);
        
        // In real implementation, this would download the file
        alert(`Export complete! Downloaded as ${filename}`);
      }
    }, 200);
  }
</script>

<div class="container mx-auto p-4">
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold">Export Notes</h1>
    <a href="/notes" class="text-gray-500 hover:text-gray-700">← Back to Notes</a>
  </div>
  
  <div class="max-w-2xl">
    <div class="bg-white shadow rounded-lg p-6">
      <h2 class="text-xl font-semibold mb-4">Export Options</h2>
      
      <div class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
          <select bind:value={exportOptions.format} class="w-full p-2 border border-gray-300 rounded-md">
            <option value="markdown">Markdown (.md)</option>
            <option value="html">HTML (.html)</option>
            <option value="pdf">PDF (.pdf)</option>
            <option value="txt">Plain Text (.txt)</option>
            <option value="json">JSON (.json)</option>
            <option value="zip">ZIP Archive (.zip)</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Include</label>
          <div class="space-y-2">
            <label class="flex items-center">
              <input
                type="checkbox"
                bind:checked={exportOptions.includeArchived}
                class="mr-2"
              />
              <span class="text-sm">Include archived notes</span>
            </label>
            <label class="flex items-center">
              <input
                type="checkbox"
                bind:checked={exportOptions.includeDeleted}
                class="mr-2"
              />
              <span class="text-sm">Include deleted notes</span>
            </label>
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Select Folders</label>
          <div class="max-h-32 overflow-y-auto border border-gray-300 rounded-md p-2">
            <label class="flex items-center mb-2">
              <input
                type="checkbox"
                checked={exportOptions.selectedFolders.length === folders.length}
                on:change={(e) => {
                  if (e.target.checked) {
                    exportOptions.selectedFolders = folders.map(f => f.id);
                  } else {
                    exportOptions.selectedFolders = [];
                  }
                }}
                class="mr-2"
              />
              <span class="text-sm font-medium">All Folders</span>
            </label>
            {#each folders as folder}
              <label class="flex items-center mb-1">
                <input
                  type="checkbox"
                  checked={exportOptions.selectedFolders.includes(folder.id)}
                  on:change={() => toggleFolder(folder.id)}
                  class="mr-2"
                />
                <span class="text-sm">{folder.name} ({folder.noteCount} notes)</span>
              </label>
            {/each}
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Select Tags</label>
          <div class="max-h-32 overflow-y-auto border border-gray-300 rounded-md p-2">
            <label class="flex items-center mb-2">
              <input
                type="checkbox"
                checked={exportOptions.selectedTags.length === tags.length}
                on:change={(e) => {
                  if (e.target.checked) {
                    exportOptions.selectedTags = tags.map(t => t.name);
                  } else {
                    exportOptions.selectedTags = [];
                  }
                }}
                class="mr-2"
              />
              <span class="text-sm font-medium">All Tags</span>
            </label>
            {#each tags as tag}
              <label class="flex items-center mb-1">
                <input
                  type="checkbox"
                  checked={exportOptions.selectedTags.includes(tag.name)}
                  on:change={() => toggleTag(tag.name)}
                  class="mr-2"
                />
                <span class="text-sm">#{tag.name} ({tag.count} notes)</span>
              </label>
            {/each}
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
          <select bind:value={exportOptions.dateRange} class="w-full p-2 border border-gray-300 rounded-md">
            <option value="all">All time</option>
            <option value="last-week">Last week</option>
            <option value="last-month">Last month</option>
            <option value="last-year">Last year</option>
            <option value="custom">Custom range</option>
          </select>
        </div>
        
        {#if exporting}
          <div>
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm font-medium">Exporting...</span>
              <span class="text-sm text-gray-600">{exportProgress}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style="width: {exportProgress}%"
              ></div>
            </div>
          </div>
        {:else}
          <button
            on:click={startExport}
            class="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Start Export
          </button>
        {/if}
      </div>
    </div>
    
    <div class="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h3 class="font-medium text-blue-900 mb-2">Export Summary</h3>
      <ul class="text-sm text-blue-800 space-y-1">
        <li>Format: {exportOptions.format.toUpperCase()}</li>
        <li>Folders: {exportOptions.selectedFolders.length === 0 ? 'All' : exportOptions.selectedFolders.length}</li>
        <li>Tags: {exportOptions.selectedTags.length === 0 ? 'All' : exportOptions.selectedTags.length}</li>
        <li>Include archived: {exportOptions.includeArchived ? 'Yes' : 'No'}</li>
        <li>Include deleted: {exportOptions.includeDeleted ? 'Yes' : 'No'}</li>
      </ul>
    </div>
  </div>
</div>