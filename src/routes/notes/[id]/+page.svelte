<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import NoteEditor from '$lib/components/NoteEditor.svelte';
  
  let note = null;
  let isEditing = false;
  let content = '';
  let autoSaveTimeout;
  
  $: noteId = $page.params.id;
  
  onMount(() => {
    // Load note from localStorage
    const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    note = savedNotes.find(n => n.id === noteId);
    
    if (note) {
      content = note.content;
    } else {
      // Note not found, redirect to notes list
      goto('/notes');
    }
  });
  
  function toggleEdit() {
    isEditing = !isEditing;
  }
  
  function handleUpdate(newContent) {
    content = newContent;
    
    // Clear previous timeout
    if (autoSaveTimeout) {
      clearTimeout(autoSaveTimeout);
    }
    
    // Set new timeout for auto-save
    autoSaveTimeout = setTimeout(() => {
      saveNote();
    }, 1000);
  }
  
  function saveNote() {
    if (!note || !content || (typeof content === 'string' && !content.trim())) return;
    
    // Update note in localStorage
    const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    const noteIndex = savedNotes.findIndex(n => n.id === note.id);
    
    if (noteIndex !== -1) {
      savedNotes[noteIndex] = {
        ...note,
        content: content, // Store the full JSON structure
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem('notes', JSON.stringify(savedNotes));
      note = savedNotes[noteIndex];
    }
  }
  
  function deleteNote() {
    if (!note || !confirm('Are you sure you want to delete this note?')) return;
    
    // Remove note from localStorage
    const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    const filteredNotes = savedNotes.filter(n => n.id !== note.id);
    localStorage.setItem('notes', JSON.stringify(filteredNotes));
    
    // Redirect to notes list
    goto('/notes');
  }
  
  // Handle keyboard shortcuts
  function handleKeydown(event) {
    if (event.metaKey || event.ctrlKey) {
      if (event.key === 's') {
        event.preventDefault();
        saveNote();
      } else if (event.key === 'e') {
        event.preventDefault();
        toggleEdit();
      }
    }
  }
  
  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if note}
  <div class="fixed top-0 left-0 right-0 z-10 bg-white border-b">
    <div class="flex justify-between items-center px-4 py-2">
      <div class="flex items-center gap-4">
        <a href="/notes" class="text-gray-500 hover:text-gray-700">← Back</a>
        <span class="text-sm text-gray-500">
          Last updated: {formatDate(note.updatedAt)}
        </span>
      </div>
      <div class="flex items-center gap-2">
        <button 
          on:click={toggleEdit}
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm"
        >
          {isEditing ? 'View' : 'Edit'}
        </button>
        <button 
          on:click={deleteNote}
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
  
  <div class="pt-12">
    {#if isEditing}
      <NoteEditor 
        {content}
        onUpdate={handleUpdate}
        placeholder="Start writing your note..."
      />
    {:else}
      <div class="h-screen w-full p-8">
        <div class="prose prose-lg max-w-none h-full overflow-y-auto">
          <NoteEditor 
            {content}
            onUpdate={() => {}} 
            placeholder=""
            showToolbar={false}
          />
        </div>
      </div>
    {/if}
  </div>
{:else}
  <div class="flex items-center justify-center h-screen">
    <p class="text-gray-500">Loading note...</p>
  </div>
{/if}