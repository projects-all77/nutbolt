<script>
  import { onMount } from 'svelte';
  
  let templates = [];
  let activeTab = 'all';
  
  onMount(() => {
    // Load templates from database
    templates = [
      { id: '1', name: 'Meeting Notes', description: 'Standard meeting notes template', category: 'business', content: '# Meeting Notes\n\n**Date:** \n**Attendees:** \n**Agenda:** \n\n## Discussion Points\n\n## Action Items\n\n## Next Steps', createdAt: '2023-11-01' },
      { id: '2', name: 'Project Plan', description: 'Basic project planning template', category: 'business', content: '# Project Plan\n\n## Overview\n\n## Goals\n\n## Timeline\n\n## Resources\n\n## Risks', createdAt: '2023-11-02' },
      { id: '3', name: 'Daily Journal', description: 'Personal daily reflection template', category: 'personal', content: '# Daily Journal - {{date}}\n\n## Today\'s Goals\n\n## Accomplishments\n\n## Challenges\n\n## Gratitude\n\n## Tomorrow\'s Focus', createdAt: '2023-11-03' },
      { id: '4', name: 'Book Review', description: 'Template for book reviews', category: 'personal', content: '# Book Review: {{title}}\n\n**Author:** \n**Genre:** \n**Rating:** \n\n## Summary\n\n## Key Takeaways\n\n## Favorite Quotes\n\n## Recommendation', createdAt: '2023-11-04' }
    ];
  });
  
  $: filteredTemplates = activeTab === 'all' ? templates : templates.filter(t => t.category === activeTab);
  
  function useTemplate(template) {
    // Create new note with template content
    const templateContent = template.content
      .replace('{{date}}', new Date().toLocaleDateString())
      .replace('{{title}}', '[Book Title]');
    
    // Navigate to new note page with pre-filled content
    window.location.href = `/notes/new?template=${template.id}`;
  }
  
  function deleteTemplate(templateId) {
    if (confirm('Are you sure you want to delete this template?')) {
      templates = templates.filter(t => t.id !== templateId);
    }
  }
</script>

<div class="container mx-auto p-4">
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold">Templates</h1>
    <div class="flex gap-2">
      <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        New Template
      </button>
      <a href="/notes" class="text-gray-500 hover:text-gray-700">← Back to Notes</a>
    </div>
  </div>
  
  <div class="mb-6">
    <div class="flex border-b">
      <button
        class="px-4 py-2 {activeTab === 'all' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}"
        on:click={() => activeTab = 'all'}
      >
        All Templates ({templates.length})
      </button>
      <button
        class="px-4 py-2 {activeTab === 'business' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}"
        on:click={() => activeTab = 'business'}
      >
        Business ({templates.filter(t => t.category === 'business').length})
      </button>
      <button
        class="px-4 py-2 {activeTab === 'personal' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}"
        on:click={() => activeTab = 'personal'}
      >
        Personal ({templates.filter(t => t.category === 'personal').length})
      </button>
    </div>
  </div>
  
  {#if filteredTemplates.length === 0}
    <div class="text-center py-8">
      <p class="text-gray-500">No templates found</p>
      <p class="text-sm text-gray-400 mt-2">Create templates to speed up your note-taking</p>
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each filteredTemplates as template}
        <div class="bg-white shadow rounded-lg p-6">
          <div class="flex justify-between items-start mb-4">
            <h3 class="font-semibold text-lg">{template.name}</h3>
            <span class="text-xs bg-gray-100 px-2 py-1 rounded capitalize">{template.category}</span>
          </div>
          
          <p class="text-gray-600 text-sm mb-4">{template.description}</p>
          
          <div class="bg-gray-50 p-3 rounded mb-4">
            <pre class="text-xs text-gray-700 whitespace-pre-wrap overflow-hidden" style="max-height: 120px;">{template.content}</pre>
          </div>
          
          <div class="flex justify-between items-center">
            <span class="text-xs text-gray-400">
              Created {new Date(template.createdAt).toLocaleDateString()}
            </span>
            <div class="flex gap-2">
              <button
                on:click={() => useTemplate(template)}
                class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
              >
                Use Template
              </button>
              <button class="text-gray-600 hover:text-gray-700 text-sm">
                Edit
              </button>
              <button
                on:click={() => deleteTemplate(template.id)}
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