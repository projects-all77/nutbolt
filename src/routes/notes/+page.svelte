<script>
  import { onMount } from 'svelte';
  
  let notes = [];
  
  onMount(() => {
    // Load notes from localStorage
    const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    notes = savedNotes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  });
  
  function getExcerpt(content) {
    // Handle both JSON and string content
    let textContent = '';
    
    if (typeof content === 'string') {
      // Strip HTML tags and get text
      textContent = content.replace(/<[^>]*>/g, '').trim();
    } else if (content && typeof content === 'object') {
      // Extract text from TipTap JSON structure
      textContent = extractTextFromJSON(content);
    }
    
    return textContent.length > 100 ? textContent.substring(0, 100) + '...' : textContent;
  }
  
  function extractTextFromJSON(jsonContent) {
    if (!jsonContent || !jsonContent.content) return '';
    
    let text = '';
    
    function traverse(node) {
      if (node.type === 'text') {
        text += node.text || '';
      } else if (node.content) {
        node.content.forEach(traverse);
      }
      
      // Add space after paragraphs and headings
      if (node.type === 'paragraph' || node.type === 'heading') {
        text += ' ';
      }
    }
    
    jsonContent.content.forEach(traverse);
    return text.trim();
  }
  
  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
</script>

<div class="container mx-auto p-4">
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold">NB</h1>
    <a href="/notes/new" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
      New Note
    </a>
  </div>
  
  {#if notes.length === 0}
    <div class="text-center py-8">
      <p class="text-gray-500">No notes yet. Create your first note!</p>
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each notes as note}
        <div class="bg-white shadow rounded-lg p-4">
          <p class="text-gray-600 text-sm mb-3">{getExcerpt(note.content)}</p>
          <div class="flex justify-between items-center">
            <span class="text-xs text-gray-400">{formatDate(note.updatedAt)}</span>
            <a href="/notes/{note.id}" class="text-blue-500 hover:text-blue-600">View</a>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>