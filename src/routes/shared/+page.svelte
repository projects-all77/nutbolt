<script>
  import { onMount } from 'svelte';
  
  let sharedNotes = [];
  let sharedWithMe = [];
  let activeTab = 'shared';
  
  onMount(() => {
    // Load shared notes from database
    sharedNotes = [
      { id: '1', title: 'Team Meeting Notes', sharedWith: ['alice@example.com', 'bob@example.com'], permissions: 'edit', sharedAt: '2023-11-01' },
      { id: '2', title: 'Project Documentation', sharedWith: ['team@example.com'], permissions: 'view', sharedAt: '2023-11-05' }
    ];
    
    sharedWithMe = [
      { id: '3', title: 'Quarterly Report', sharedBy: 'manager@example.com', permissions: 'edit', sharedAt: '2023-11-03' },
      { id: '4', title: 'Company Guidelines', sharedBy: 'hr@example.com', permissions: 'view', sharedAt: '2023-11-07' }
    ];
  });
  
  function revokeShare(noteId) {
    if (confirm('Are you sure you want to revoke sharing for this note?')) {
      sharedNotes = sharedNotes.filter(note => note.id !== noteId);
    }
  }
  
  function leaveSharedNote(noteId) {
    if (confirm('Are you sure you want to leave this shared note?')) {
      sharedWithMe = sharedWithMe.filter(note => note.id !== noteId);
    }
  }
</script>

<div class="container mx-auto p-4">
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold">Shared Notes</h1>
    <a href="/notes" class="text-gray-500 hover:text-gray-700">← Back to Notes</a>
  </div>
  
  <div class="mb-6">
    <div class="flex border-b">
      <button
        class="px-4 py-2 {activeTab === 'shared' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}"
        on:click={() => activeTab = 'shared'}
      >
        Shared by Me ({sharedNotes.length})
      </button>
      <button
        class="px-4 py-2 {activeTab === 'with-me' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}"
        on:click={() => activeTab = 'with-me'}
      >
        Shared with Me ({sharedWithMe.length})
      </button>
    </div>
  </div>
  
  {#if activeTab === 'shared'}
    <div>
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">Notes You've Shared</h2>
        <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Share a Note
        </button>
      </div>
      
      {#if sharedNotes.length === 0}
        <div class="text-center py-8">
          <p class="text-gray-500">You haven't shared any notes yet</p>
          <p class="text-sm text-gray-400 mt-2">Share notes to collaborate with others</p>
        </div>
      {:else}
        <div class="space-y-4">
          {#each sharedNotes as note}
            <div class="bg-white shadow rounded-lg p-4">
              <div class="flex justify-between items-start">
                <div class="flex-1">
                  <h3 class="font-semibold mb-2">{note.title}</h3>
                  <div class="text-sm text-gray-600 mb-2">
                    Shared with: {note.sharedWith.join(', ')}
                  </div>
                  <div class="flex gap-4 text-xs text-gray-500">
                    <span>Permissions: {note.permissions}</span>
                    <span>Shared: {new Date(note.sharedAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div class="flex gap-2">
                  <a href="/notes/{note.id}" class="text-blue-600 hover:text-blue-700 text-sm">
                    View
                  </a>
                  <button class="text-gray-600 hover:text-gray-700 text-sm">
                    Manage
                  </button>
                  <button
                    on:click={() => revokeShare(note.id)}
                    class="text-red-600 hover:text-red-700 text-sm"
                  >
                    Revoke
                  </button>
                </div>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  {:else}
    <div>
      <h2 class="text-xl font-semibold mb-4">Notes Shared with You</h2>
      
      {#if sharedWithMe.length === 0}
        <div class="text-center py-8">
          <p class="text-gray-500">No notes shared with you yet</p>
          <p class="text-sm text-gray-400 mt-2">Shared notes will appear here</p>
        </div>
      {:else}
        <div class="space-y-4">
          {#each sharedWithMe as note}
            <div class="bg-white shadow rounded-lg p-4">
              <div class="flex justify-between items-start">
                <div class="flex-1">
                  <h3 class="font-semibold mb-2">{note.title}</h3>
                  <div class="text-sm text-gray-600 mb-2">
                    Shared by: {note.sharedBy}
                  </div>
                  <div class="flex gap-4 text-xs text-gray-500">
                    <span>Permissions: {note.permissions}</span>
                    <span>Shared: {new Date(note.sharedAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div class="flex gap-2">
                  <a href="/notes/{note.id}" class="text-blue-600 hover:text-blue-700 text-sm">
                    View
                  </a>
                  {#if note.permissions === 'edit'}
                    <a href="/notes/{note.id}/edit" class="text-green-600 hover:text-green-700 text-sm">
                      Edit
                    </a>
                  {/if}
                  <button
                    on:click={() => leaveSharedNote(note.id)}
                    class="text-red-600 hover:text-red-700 text-sm"
                  >
                    Leave
                  </button>
                </div>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  {/if}
</div>