<script>
    export let todos = [];
    export let deleteTodo;
    export let setEditingTodo;
    export let toggleTodoCompletion;
  </script>
  
  {#if todos.length === 0}
    <p class="text-gray-500 text-center">No todos yet. Add a new todo!</p>
  {/if}
  
  <ul class="space-y-2">
    {#each todos as todo (todo._id)}
      <li 
        class="flex items-center justify-between p-3 border rounded 
        {todo.completed ? 'bg-gray-100 line-through' : 'bg-white'}"
      >
        <div class="flex-grow mr-2">
          <input 
            type="checkbox" 
            checked={todo.completed}
            on:change={() => toggleTodoCompletion(todo)}
            class="mr-2"
          />
          <span class="font-semibold">{todo.title}</span>
          {#if todo.description}
            <p class="text-gray-600 text-sm">{todo.description}</p>
          {/if}
        </div>
        
        <div class="flex space-x-2">
          <button 
            on:click={() => setEditingTodo(todo)}
            class="text-blue-500 hover:text-blue-700"
          >
            Edit
          </button>
          <button 
            on:click={() => deleteTodo(todo._id)}
            class="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      </li>
    {/each}
  </ul>