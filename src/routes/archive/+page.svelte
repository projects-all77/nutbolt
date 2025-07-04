<script>
  import { onMount } from 'svelte';
  
  let archivedNotes = [];
  let selectedNotes = [];
  
  onMount(() => {
    // Load archived notes from database
    archivedNotes = [
      { id: '1', title: 'Project Retrospective', excerpt: 'Lessons learned from Q3 project...', archivedAt: '2023-10-01' },
      { id: '2', title: 'Old Research Notes', excerpt: 'Initial research findings...', archivedAt: '2023-09-15' }
    ];
  });
  
  function toggleSelect(noteId) {
    if (selectedNotes.includes(noteId)) {
      selectedNotes = selectedNotes.filter(id => id !== noteId);
    } else {
      selectedNotes = [...selectedNotes, noteId];
    }
  }
  
  function selectAll() {
    selectedNotes = archivedNotes.map(note => note.id);
  }
  
  function clearSelection() {
    selectedNotes = [];
  }
  
  function unarchiveSelected() {
    if (selectedNotes.length === 0) return;
    
    // Unarchive selected notes
    console.log('Unarchiving notes:', selectedNotes);
    
    // Remove from archived notes
    archivedNotes = archivedNotes.filter(note => !selectedNotes.includes(note.id));
    selectedNotes = [];
  }
  
  function deleteSelected() {
    if (selectedNotes.length === 0) return;
    
    if (confirm('Are you sure you want to delete these archived notes? They will be moved to trash.')) {
      // Move selected notes to trash
      console.log('Moving to trash:', selectedNotes);
      
      // Remove from archived notes
      archivedNotes = archivedNotes.filter(note => !selectedNotes.includes(note.id));
      selectedNotes = [];
    }
  }
</script>

<div class="container mx-auto p-4">
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold">Archive</h1>
    <a href="/notes" class="text-gray-500 hover:text-gray-700">← Back to Notes</a>
  </div>
  
  {#if archivedNotes.length === 0}
    <div class="text-center py-8">
      <p class="text-gray-500">No archived notes</p>
      <p class="text-sm text-gray-400 mt-2">Archived notes will appear here</p>
    </div>
  {:else}
    <div class="mb-4">
      <div class="flex justify-between items-center">
        <div class="flex gap-2">
          <button
            on:click={selectAll}
            class="text-sm text-blue-500 hover:text-blue-600"
          >
            Select All
          </button>
          <button
            on:click={clearSelection}
            class="text-sm text-gray-500 hover:text-gray-600"
          >
            Clear Selection
          </button>
          <span class="text-sm text-gray-500">
            {selectedNotes.length} selected
          </span>
        </div>
        
        <div class="flex gap-2">
          <button
            on:click={unarchiveSelected}
            disabled={selectedNotes.length === 0}
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm disabled:opacity-50"
          >
            Unarchive Selected
          </button>
          <button
            on:click={deleteSelected}
            disabled={selectedNotes.length === 0}
            class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm disabled:opacity-50"
          >
            Delete Selected
          </button>
        </div>
      </div>
    </div>
    
    <div class="space-y-3">
      {#each archivedNotes as note}
        <div class="bg-white shadow rounded-lg p-4">
          <div class="flex items-start gap-3">
            <input
              type="checkbox"
              checked={selectedNotes.includes(note.id)}
              on:change={() => toggleSelect(note.id)}
              class="mt-1"
            />
            
            <div class="flex-1">
              <h3 class="font-semibold text-gray-700">{note.title}</h3>
              <p class="text-gray-600 text-sm mt-1">{note.excerpt}</p>
              <p class="text-xs text-gray-400 mt-2">
                Archived on {new Date(note.archivedAt).toLocaleDateString()}
              </p>
            </div>
            
            <div class="flex gap-2">
              <a
                href="/notes/{note.id}"
                class="text-blue-600 hover:text-blue-700 text-sm"
              >
                View
              </a>
              <button
                on:click={() => {
                  selectedNotes = [note.id];
                  unarchiveSelected();
                }}
                class="text-green-600 hover:text-green-700 text-sm"
              >
                Unarchive
              </button>
              <button
                on:click={() => {
                  selectedNotes = [note.id];
                  deleteSelected();
                }}
                class="text-red-600 hover:text-red-700 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>