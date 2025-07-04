<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  
  let notes = [];
  let loading = true;
  
  $: tagName = $page.params.tag;
  
  onMount(async () => {
    // Load notes with this tag from database
    loading = false;
    
    // Mock data
    notes = [
      { id: '1', title: 'Project Meeting', excerpt: 'Discussed timeline and deliverables...', updatedAt: '2023-12-01' },
      { id: '2', title: 'Team Standup', excerpt: 'Daily sync meeting notes...', updatedAt: '2023-12-02' }
    ];
  });
</script>

<div class="container mx-auto p-4">
  {#if loading}
    <div class="text-center py-8">
      <p>Loading notes...</p>
    </div>
  {:else}
    <div class="flex justify-between items-center mb-6">
      <div class="flex items-center">
        <h1 class="text-3xl font-bold">#{tagName}</h1>
        <span class="ml-3 text-sm text-gray-500">{notes.length} notes</span>
      </div>
      <div class="flex gap-2">
        <a href="/notes/new?tag={tagName}" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Add Note
        </a>
        <a href="/tags" class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">
          Back to Tags
        </a>
      </div>
    </div>
    
    {#if notes.length === 0}
      <div class="text-center py-8">
        <p class="text-gray-500">No notes with tag "#{tagName}" yet.</p>
        <a href="/notes/new?tag={tagName}" class="text-blue-500 hover:text-blue-600">
          Create your first note with this tag
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
  {/if}
</div>