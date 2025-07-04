<script>
  import { onMount } from 'svelte';
  
  let importOptions = {
    source: 'file',
    format: 'markdown',
    createFolders: true,
    preserveStructure: true,
    defaultFolder: '',
    conflictResolution: 'rename'
  };
  
  let folders = [];
  let selectedFiles = [];
  let importing = false;
  let importProgress = 0;
  let importResults = null;
  
  onMount(() => {
    // Load folders
    folders = [
      { id: '1', name: 'Work' },
      { id: '2', name: 'Personal' },
      { id: '3', name: 'Ideas' }
    ];
  });
  
  function handleFileSelect(event) {
    selectedFiles = Array.from(event.target.files);
  }
  
  function handleDrop(event) {
    event.preventDefault();
    selectedFiles = Array.from(event.dataTransfer.files);
  }
  
  function handleDragOver(event) {
    event.preventDefault();
  }
  
  function removeFile(index) {
    selectedFiles = selectedFiles.filter((_, i) => i !== index);
  }
  
  async function startImport() {
    if (selectedFiles.length === 0) {
      alert('Please select files to import');
      return;
    }
    
    importing = true;
    importProgress = 0;
    
    // Simulate import progress
    const interval = setInterval(() => {
      importProgress += 10;
      if (importProgress >= 100) {
        clearInterval(interval);
        importing = false;
        
        // Mock import results
        importResults = {
          success: true,
          imported: selectedFiles.length,
          created: selectedFiles.length,
          updated: 0,
          errors: []
        };
        
        console.log('Import complete:', importResults);
      }
    }, 200);
  }
  
  function resetImport() {
    selectedFiles = [];
    importResults = null;
    importProgress = 0;
  }
</script>

<div class="container mx-auto p-4">
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold">Import Notes</h1>
    <a href="/notes" class="text-gray-500 hover:text-gray-700">← Back to Notes</a>
  </div>
  
  <div class="max-w-2xl">
    {#if importResults}
      <div class="bg-white shadow rounded-lg p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">Import Results</h2>
        
        {#if importResults.success}
          <div class="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 class="font-medium text-green-900 mb-2">Import Successful!</h3>
            <ul class="text-sm text-green-800 space-y-1">
              <li>Total files processed: {importResults.imported}</li>
              <li>Notes created: {importResults.created}</li>
              <li>Notes updated: {importResults.updated}</li>
              {#if importResults.errors.length > 0}
                <li>Errors: {importResults.errors.length}</li>
              {/if}
            </ul>
          </div>
        {:else}
          <div class="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 class="font-medium text-red-900 mb-2">Import Failed</h3>
            <p class="text-sm text-red-800">Please check your files and try again.</p>
          </div>
        {/if}
        
        <div class="mt-4 flex gap-2">
          <a href="/notes" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            View Notes
          </a>
          <button
            on:click={resetImport}
            class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Import More
          </button>
        </div>
      </div>
    {:else}
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-4">Import Options</h2>
        
        <div class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Import Source</label>
            <select bind:value={importOptions.source} class="w-full p-2 border border-gray-300 rounded-md">
              <option value="file">File Upload</option>
              <option value="url">URL</option>
              <option value="clipboard">Clipboard</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Expected Format</label>
            <select bind:value={importOptions.format} class="w-full p-2 border border-gray-300 rounded-md">
              <option value="markdown">Markdown</option>
              <option value="html">HTML</option>
              <option value="txt">Plain Text</option>
              <option value="json">JSON</option>
              <option value="evernote">Evernote Export</option>
              <option value="notion">Notion Export</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">File Selection</label>
            <div
              class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors"
              on:drop={handleDrop}
              on:dragover={handleDragOver}
            >
              <div class="mb-4">
                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <p class="text-sm text-gray-600 mb-2">Drag and drop files here, or</p>
              <input
                type="file"
                multiple
                accept=".md,.txt,.html,.json"
                on:change={handleFileSelect}
                class="hidden"
                id="file-upload"
              />
              <label for="file-upload" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
                Select Files
              </label>
            </div>
            
            {#if selectedFiles.length > 0}
              <div class="mt-4">
                <h4 class="font-medium mb-2">Selected Files ({selectedFiles.length})</h4>
                <div class="max-h-32 overflow-y-auto space-y-1">
                  {#each selectedFiles as file, index}
                    <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span class="text-sm">{file.name}</span>
                      <button
                        on:click={() => removeFile(index)}
                        class="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  {/each}
                </div>
              </div>
            {/if}
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Import Settings</label>
            <div class="space-y-2">
              <label class="flex items-center">
                <input
                  type="checkbox"
                  bind:checked={importOptions.createFolders}
                  class="mr-2"
                />
                <span class="text-sm">Create folders from file structure</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  bind:checked={importOptions.preserveStructure}
                  class="mr-2"
                />
                <span class="text-sm">Preserve folder hierarchy</span>
              </label>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Default Folder</label>
            <select bind:value={importOptions.defaultFolder} class="w-full p-2 border border-gray-300 rounded-md">
              <option value="">None (root level)</option>
              {#each folders as folder}
                <option value={folder.id}>{folder.name}</option>
              {/each}
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Conflict Resolution</label>
            <select bind:value={importOptions.conflictResolution} class="w-full p-2 border border-gray-300 rounded-md">
              <option value="rename">Rename duplicate files</option>
              <option value="overwrite">Overwrite existing files</option>
              <option value="skip">Skip duplicate files</option>
            </select>
          </div>
          
          {#if importing}
            <div>
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-medium">Importing...</span>
                <span class="text-sm text-gray-600">{importProgress}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div
                  class="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style="width: {importProgress}%"
                ></div>
              </div>
            </div>
          {:else}
            <button
              on:click={startImport}
              disabled={selectedFiles.length === 0}
              class="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
            >
              Start Import
            </button>
          {/if}
        </div>
      </div>
    {/if}
  </div>
</div>