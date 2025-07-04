<script>
  import { onMount } from 'svelte';
  
  let tags = [];
  
  onMount(() => {
    // Load tags from database
    tags = [
      { name: 'work', count: 15, color: 'blue' },
      { name: 'personal', count: 8, color: 'green' },
      { name: 'ideas', count: 12, color: 'purple' },
      { name: 'todo', count: 6, color: 'red' },
      { name: 'meeting', count: 9, color: 'yellow' }
    ];
  });
</script>

<div class="container mx-auto p-4">
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold">Tags</h1>
    <a href="/notes" class="text-gray-500 hover:text-gray-700">← Back to Notes</a>
  </div>
  
  {#if tags.length === 0}
    <div class="text-center py-8">
      <p class="text-gray-500">No tags yet. Tags will appear as you add them to notes.</p>
    </div>
  {:else}
    <div class="flex flex-wrap gap-3">
      {#each tags as tag}
        <a 
          href="/tags/{tag.name}" 
          class="inline-flex items-center px-4 py-2 bg-{tag.color}-100 text-{tag.color}-800 rounded-full hover:bg-{tag.color}-200 transition-colors"
        >
          <span class="text-sm font-medium">#{tag.name}</span>
          <span class="ml-2 text-xs bg-{tag.color}-200 px-2 py-1 rounded-full">{tag.count}</span>
        </a>
      {/each}
    </div>
    
    <div class="mt-8">
      <h2 class="text-xl font-semibold mb-4">Tag Cloud</h2>
      <div class="flex flex-wrap gap-2">
        {#each tags as tag}
          <a 
            href="/tags/{tag.name}" 
            class="text-{tag.color}-600 hover:text-{tag.color}-800 transition-colors"
            style="font-size: {Math.min(2, Math.max(0.8, tag.count / 10))}rem"
          >
            #{tag.name}
          </a>
        {/each}
      </div>
    </div>
  {/if}
</div>