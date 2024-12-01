<script>
    export let addTodo;
    export let editingTodo = null;
    export let updateTodo;
  
    let title = '';
    let description = '';
  
    // Reactive statement to update form when editing todo changes
    $: if (editingTodo) {
      title = editingTodo.title;
      description = editingTodo.description;
    }
  
    function handleSubmit() {
      // Prevent submission of empty todos
      if (!title.trim()) return;
  
      if (editingTodo) {
        // Update existing todo
        updateTodo({
          ...editingTodo,
          title,
          description
        });
      } else {
        // Add new todo
        addTodo({
          title,
          description
        });
      }
  
      // Reset form
      title = '';
      description = '';
    }
  
    function handleCancel() {
      // Reset form and editing state
      title = '';
      description = '';
      editingTodo = null;
    }
  </script>
  
  <form on:submit|preventDefault={handleSubmit} class="mb-4">
    <div class="mb-2">
      <input 
        type="text" 
        bind:value={title} 
        placeholder="Todo Title" 
        class="w-full p-2 border rounded"
        required
      />
    </div>
    
    <div class="mb-2">
      <textarea 
        bind:value={description} 
        placeholder="Description (optional)" 
        class="w-full p-2 border rounded"
      ></textarea>
    </div>
    
    <div class="flex space-x-2">
      <button 
        type="submit" 
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {editingTodo ? 'Update Todo' : 'Add Todo'}
      </button>
      
      {#if editingTodo}
        <button 
          type="button" 
          on:click={handleCancel}
          class="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      {/if}
    </div>
  </form>