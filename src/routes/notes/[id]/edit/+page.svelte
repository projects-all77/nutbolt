<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  
  let note = null;
  let loading = true;
  let title = '';
  let content = '';
  
  $: noteId = $page.params.id;
  
  onMount(async () => {
    // Load note from database
    loading = false;
    
    // Mock data for now
    note = {
      id: noteId,
      title: 'Sample Note',
      content: 'This is a sample note content.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    title = note.title;
    content = note.content;
  });
  
  async function updateNote() {
    if (!title.trim()) return;
    
    const updatedNote = {
      ...note,
      title: title.trim(),
      content: content.trim(),
      updatedAt: new Date().toISOString()
    };
    
    // Save to database
    console.log('Updating note:', updatedNote);
    
    // Redirect to note view
    goto(`/notes/${noteId}`);
  }
  
  async function deleteNote() {
    if (confirm('Are you sure you want to delete this note?')) {
      // Delete from database
      console.log('Deleting note:', noteId);
      
      // Redirect to notes list
      goto('/notes');
    }
  }
</script>

<div class="container mx-auto p-4">
  {#if loading}
    <div class="text-center py-8">
      <p>Loading note...</p>
    </div>
  {:else if note}
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Edit Note</h1>
      <a href="/notes/{noteId}" class="text-gray-500 hover:text-gray-700">← Back to Note</a>
    </div>
    
    <form on:submit|preventDefault={updateNote} class="space-y-4">
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700 mb-2">Title</label>
        <input
          type="text"
          id="title"
          bind:value={title}
          placeholder="Enter note title..."
          class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      
      <div>
        <label for="content" class="block text-sm font-medium text-gray-700 mb-2">Content</label>
        <textarea
          id="content"
          bind:value={content}
          placeholder="Write your note here..."
          rows="12"
          class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>
      
      <div class="flex gap-2">
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
        >
          Update Note
        </button>
        <button
          type="button"
          on:click={deleteNote}
          class="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md"
        >
          Delete Note
        </button>
        <a
          href="/notes/{noteId}"
          class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md"
        >
          Cancel
        </a>
      </div>
    </form>
  {:else}
    <div class="text-center py-8">
      <p class="text-red-500">Note not found</p>
      <a href="/notes" class="text-blue-500 hover:text-blue-600">← Back to Notes</a>
    </div>
  {/if}
</div>