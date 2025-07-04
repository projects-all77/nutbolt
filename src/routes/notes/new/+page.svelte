<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import NoteEditor from '$lib/components/NoteEditor.svelte';
  
  let content = '';
  let autoSaveTimeout;
  
  // Load from localStorage on mount
  onMount(() => {
    const savedContent = localStorage.getItem('draft_note');
    if (savedContent) {
      try {
        content = JSON.parse(savedContent);
      } catch (error) {
        content = savedContent; // fallback for old string content
      }
    }
  });
  
  // Auto-save to localStorage
  function handleUpdate(newContent) {
    content = newContent;
    
    // Clear previous timeout
    if (autoSaveTimeout) {
      clearTimeout(autoSaveTimeout);
    }
    
    // Set new timeout for auto-save
    autoSaveTimeout = setTimeout(() => {
      localStorage.setItem('draft_note', JSON.stringify(content));
    }, 1000);
  }
  
  // Save and redirect
  async function saveNote() {
    if (!content || (typeof content === 'string' && !content.trim())) return;
    
    const note = {
      id: Date.now().toString(),
      content: content, // Store the full JSON structure
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Save to localStorage
    const existingNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    existingNotes.push(note);
    localStorage.setItem('notes', JSON.stringify(existingNotes));
    
    // Clear draft
    localStorage.removeItem('draft_note');
    
    // Redirect to notes list
    goto('/notes');
  }
  
  // Handle keyboard shortcuts
  function handleKeydown(event) {
    if (event.metaKey || event.ctrlKey) {
      if (event.key === 's') {
        event.preventDefault();
        saveNote();
      }
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="fixed top-0 left-0 right-0 z-10 bg-white border-b">
  <div class="flex justify-between items-center px-4 py-2">
    <a href="/notes" class="text-gray-500 hover:text-gray-700">← Back</a>
    <button 
      on:click={saveNote}
      class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm"
    >
      Save
    </button>
  </div>
</div>

<div class="pt-12">
  <NoteEditor 
    {content}
    onUpdate={handleUpdate}
    placeholder="Start writing your note..."
  />
</div>