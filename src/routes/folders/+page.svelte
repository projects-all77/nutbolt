<script>
  import { onMount } from 'svelte';
  
  let folders = [];
  
  onMount(() => {
    // Load folders from database
    folders = [
      { id: '1', name: 'Work', noteCount: 12, color: 'blue' },
      { id: '2', name: 'Personal', noteCount: 8, color: 'green' },
      { id: '3', name: 'Ideas', noteCount: 15, color: 'purple' }
    ];
  });
</script>

<div class="container mx-auto p-4">
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold">Folders</h1>
    <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
      New Folder
    </button>
  </div>
  
  {#if folders.length === 0}
    <div class="text-center py-8">
      <p class="text-gray-500">No folders yet. Create your first folder!</p>
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each folders as folder}
        <a href="/folders/{folder.id}" class="block">
          <div class="bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow">
            <div class="flex items-center mb-4">
              <div class="w-4 h-4 rounded-full bg-{folder.color}-500 mr-3"></div>
              <h3 class="font-semibold text-lg">{folder.name}</h3>
            </div>
            <p class="text-gray-600">{folder.noteCount} notes</p>
          </div>
        </a>
      {/each}
    </div>
  {/if}
</div>