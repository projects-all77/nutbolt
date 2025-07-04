<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  
  let query = '';
  let results = [];
  let loading = false;
  let searched = false;
  
  $: searchParams = $page.url.searchParams;
  
  onMount(() => {
    const urlQuery = searchParams.get('q');
    if (urlQuery) {
      query = urlQuery;
      performSearch();
    }
  });
  
  async function performSearch() {
    if (!query.trim()) return;
    
    loading = true;
    searched = true;
    
    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Mock search results
    results = [
      { id: '1', title: 'Meeting Notes', excerpt: 'Discussion about project timeline and deliverables...', updatedAt: '2023-12-01', type: 'note' },
      { id: '2', title: 'Project Ideas', excerpt: 'New feature suggestions and improvements...', updatedAt: '2023-12-02', type: 'note' }
    ].filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(query.toLowerCase())
    );
    
    loading = false;
  }
  
  function handleKeydown(event) {
    if (event.key === 'Enter') {
      performSearch();
    }
  }
</script>

<div class="container mx-auto p-4">
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold">Search</h1>
    <a href="/notes" class="text-gray-500 hover:text-gray-700">← Back to Notes</a>
  </div>
  
  <div class="mb-6">
    <div class="flex gap-2">
      <input
        type="text"
        bind:value={query}
        on:keydown={handleKeydown}
        placeholder="Search notes, folders, tags..."
        class="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        on:click={performSearch}
        disabled={loading}
        class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md disabled:opacity-50"
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
    </div>
  </div>
  
  {#if loading}
    <div class="text-center py-8">
      <p>Searching...</p>
    </div>
  {:else if searched}
    {#if results.length === 0}
      <div class="text-center py-8">
        <p class="text-gray-500">No results found for "{query}"</p>
        <p class="text-sm text-gray-400 mt-2">Try different keywords or check your spelling</p>
      </div>
    {:else}
      <div class="mb-4">
        <p class="text-sm text-gray-600">Found {results.length} results for "{query}"</p>
      </div>
      
      <div class="space-y-4">
        {#each results as result}
          <div class="bg-white shadow rounded-lg p-4">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <a href="/notes/{result.id}" class="block">
                  <h3 class="font-semibold text-lg text-blue-600 hover:text-blue-800">{result.title}</h3>
                  <p class="text-gray-600 text-sm mt-1">{result.excerpt}</p>
                </a>
              </div>
              <div class="text-right">
                <span class="text-xs text-gray-400 capitalize">{result.type}</span>
                <div class="text-xs text-gray-400 mt-1">{result.updatedAt}</div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  {:else}
    <div class="text-center py-8">
      <p class="text-gray-500">Enter a search term to find notes, folders, and tags</p>
    </div>
  {/if}
</div>