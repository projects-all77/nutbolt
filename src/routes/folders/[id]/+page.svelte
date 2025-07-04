<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  
  let folder = null;
  let notes = [];
  let loading = true;
  
  $: folderId = $page.params.id;
  
  onMount(async () => {
    // Load folder and notes from database
    loading = false;
    
    // Mock data
    folder = {
      id: folderId,
      name: 'Work',
      color: 'blue',
      description: 'Work-related notes and documents'
    };
    
    notes = [
      { id: '1', title: 'Meeting Notes', excerpt: 'Discussion about project timeline...', updatedAt: '2023-12-01' },
      { id: '2', title: 'Project Ideas', excerpt: 'New feature suggestions...', updatedAt: '2023-12-02' }
    ];
  });
</script>

<div class="container mx-auto p-4">
  {#if loading}
    <div class="text-center py-8">
      <p>Loading folder...</p>
    </div>
  {:else if folder}
    <div class="flex justify-between items-center mb-6">
      <div class="flex items-center">
        <div class="w-6 h-6 rounded-full bg-{folder.color}-500 mr-3"></div>
        <h1 class="text-3xl font-bold">{folder.name}</h1>
      </div>
      <div class="flex gap-2">
        <a href="/notes/new?folder={folder.id}" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Add Note
        </a>
        <a href="/folders" class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">
          Back to Folders
        </a>
      </div>
    </div>
    
    {#if folder.description}
      <p class="text-gray-600 mb-6">{folder.description}</p>
    {/if}
    
    {#if notes.length === 0}
      <div class="text-center py-8">
        <p class="text-gray-500">No notes in this folder yet.</p>
        <a href="/notes/new?folder={folder.id}" class="text-blue-500 hover:text-blue-600">
          Add your first note
        </a>
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each notes as note}
          <div class="bg-white shadow rounded-lg p-4">
            <h3 class="font-semibold mb-2">{note.title}</h3>
            <p class="text-gray-600 text-sm mb-3">{note.excerpt}</p>
            <div class="flex justify-between items-center">
              <span class="text-xs text-gray-400">{note.updatedAt}</span>
              <a href="/notes/{note.id}" class="text-blue-500 hover:text-blue-600">View</a>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  {:else}
    <div class="text-center py-8">
      <p class="text-red-500">Folder not found</p>
      <a href="/folders" class="text-blue-500 hover:text-blue-600">← Back to Folders</a>
    </div>
  {/if}
</div>