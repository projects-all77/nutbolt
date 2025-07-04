<script>
  import { onMount } from 'svelte';
  
  let deletedNotes = [];
  let selectedNotes = [];
  
  onMount(() => {
    // Load deleted notes from database
    deletedNotes = [
      { id: '1', title: 'Old Meeting Notes', excerpt: 'Notes from last quarter meeting...', deletedAt: '2023-11-15' },
      { id: '2', title: 'Draft Ideas', excerpt: 'Incomplete thoughts and ideas...', deletedAt: '2023-11-20' }
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
    selectedNotes = deletedNotes.map(note => note.id);
  }
  
  function clearSelection() {
    selectedNotes = [];
  }
  
  function restoreSelected() {
    if (selectedNotes.length === 0) return;
    
    // Restore selected notes
    console.log('Restoring notes:', selectedNotes);
    
    // Remove from deleted notes
    deletedNotes = deletedNotes.filter(note => !selectedNotes.includes(note.id));
    selectedNotes = [];
  }
  
  function permanentlyDeleteSelected() {
    if (selectedNotes.length === 0) return;
    
    if (confirm('Are you sure you want to permanently delete these notes? This action cannot be undone.')) {
      // Permanently delete selected notes
      console.log('Permanently deleting notes:', selectedNotes);
      
      // Remove from deleted notes
      deletedNotes = deletedNotes.filter(note => !selectedNotes.includes(note.id));
      selectedNotes = [];
    }
  }
  
  function emptyTrash() {
    if (confirm('Are you sure you want to empty the trash? This will permanently delete all notes and cannot be undone.')) {
      // Permanently delete all notes
      console.log('Emptying trash');
      deletedNotes = [];
      selectedNotes = [];
    }
  }
</script>

<div class="container mx-auto p-4">
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold">Trash</h1>
    <a href="/notes" class="text-gray-500 hover:text-gray-700">← Back to Notes</a>
  </div>
  
  {#if deletedNotes.length === 0}
    <div class="text-center py-8">
      <p class="text-gray-500">Trash is empty</p>
      <p class="text-sm text-gray-400 mt-2">Deleted notes will appear here</p>
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
            on:click={restoreSelected}
            disabled={selectedNotes.length === 0}
            class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm disabled:opacity-50"
          >
            Restore Selected
          </button>
          <button
            on:click={permanentlyDeleteSelected}
            disabled={selectedNotes.length === 0}
            class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm disabled:opacity-50"
          >
            Delete Permanently
          </button>
          <button
            on:click={emptyTrash}
            class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
          >
            Empty Trash
          </button>
        </div>
      </div>
    </div>
    
    <div class="space-y-3">
      {#each deletedNotes as note}
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
                Deleted on {new Date(note.deletedAt).toLocaleDateString()}
              </p>
            </div>
            
            <div class="flex gap-2">
              <button
                on:click={() => {
                  selectedNotes = [note.id];
                  restoreSelected();
                }}
                class="text-green-600 hover:text-green-700 text-sm"
              >
                Restore
              </button>
              <button
                on:click={() => {
                  selectedNotes = [note.id];
                  permanentlyDeleteSelected();
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