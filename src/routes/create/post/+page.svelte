<script lang="ts">
    import { onMount } from 'svelte';
    import { dndzone } from 'svelte-dnd-action';
    import { flip } from 'svelte/animate';
    import { v4 as uuidv4 } from 'uuid';

    import BlockEditor from '$lib/tiptap/BlockEditor.svelte';


  import TodoList from './TodoList.svelte';
  import TodoForm from './TodoForm.svelte';

  import PouchDB from 'pouchdb';


  // Create a local PouchDB database
  const db = new PouchDB('todos');


  const db_nutbolt = new PouchDB('nutbolt');

   // Initialize reactive variables
   let todos = [];
  let editingTodo = null;
  
    // Define block type
    interface Block {
      id: string;
      type: string;
      content: string;
    }
  
    // Initial state with a welcome block
    let blocks: Block[] = [
      { 
        id: uuidv4(), 
        type: 'paragraph', 
        content: 'Welcome to your editor!' 
      }
    ];
  
    // Drag and drop handlers
    function handleDndConsider(e: CustomEvent<{ items: Block[] }>) {
      blocks = e.detail.items;
    }
  
    function handleDndFinalize(e: CustomEvent<{ items: Block[] }>) {
      blocks = e.detail.items;
    }
  
    // Add a new block
    async function addBlock(type = 'paragraph') {
      blocks = [
        ...blocks, 
        { 
          id: uuidv4(), 
          type, 
          content: 'More content' 
        }
      ];

      try {
      const response = await db_nutbolt.post({
        blocks: blocks,

      });
      
      const block = await db_nutbolt.get(response.id);
      blocks = [...blocks, block];
    } catch (error) {
      console.error('Error adding blocks:', error);
    }

      console.log('added block', blocks);
    }
  
    // Update block content
    function updateBlockContent(id: string, newContent: string) {
      blocks = blocks.map(block => 
        block.id === id 
          ? { ...block, content: newContent } 
          : block
      );
      console.log('updated blocks', blocks)
    }
  
    // Delete a block
    function deleteBlock(id: string) {
      blocks = blocks.filter(block => block.id !== id);
    }

      // Add a new todo
  async function addTodo(todo) {
    try {
      const response = await db.post({
        title: todo.title,
        description: todo.description,
        completed: false,
        createdAt: new Date().toISOString()
      });
      
      // Fetch the full document to ensure we have the _id and _rev
      const newTodo = await db.get(response.id);
      todos = [...todos, newTodo];
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  }

  // Update an existing todo
  async function updateTodo(updatedTodo) {
    try {
      const response = await db.put(updatedTodo);
      
      // Update local todos array
      todos = todos.map(todo => 
        todo._id === updatedTodo._id ? { ...updatedTodo, _rev: response.rev } : todo
      );
      
      // Reset editing state
      editingTodo = null;
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  }

  // Delete a todo
  async function deleteTodo(todoId) {
    try {
      const todo = todos.find(t => t._id === todoId);
      await db.remove(todo);
      
      // Remove from local array
      todos = todos.filter(t => t._id !== todoId);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }

  // Set a todo for editing
  function setEditingTodo(todo) {
    editingTodo = { ...todo };
  }

  // Toggle todo completion
  async function toggleTodoCompletion(todo) {
    const updatedTodo = { 
      ...todo, 
      completed: !todo.completed 
    };
    
    await updateTodo(updatedTodo);
  }

    onMount(async () => {
      try {
      const result = await db.allDocs({ include_docs: true });
      todos = result.rows.map(row => row.doc);

      const resultBlocks = await db_nutbolt.allDocs({ include_docs: true });
      blocks = resultBlocks.rows.map(row => row.blocks);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
    });


  </script>
  
  <main>
    <TodoForm 
    {addTodo} 
    {editingTodo} 
    {updateTodo} 
  />

  <TodoList 
    {todos} 
    {deleteTodo} 
    {setEditingTodo}
    {toggleTodoCompletion}
  />

    <div class="editor-container">
      <section
        use:dndzone={{ items: blocks }}
        on:consider={handleDndConsider}
        on:finalize={handleDndFinalize}
      >
        {#each blocks as block (block.id)}
          <div 
            animate:flip={{ duration: 250 }}
            class="block-wrapper"
          >
            <BlockEditor 
              blockId={block.id}
              initialContent={block.content}
              on:update={(e) => updateBlockContent(block.id, e.detail)}
              on:delete={() => deleteBlock(block.id)}
            />
          </div>
        {/each}
      </section>
    </div>

    <div class="post-block-button">
      <sl-button variant="default" size="large">
        <sl-icon slot="prefix" name="postcard"></sl-icon>
        Post
      </sl-button>
    </div>
    <div class="add-block-button">
      <sl-icon-button 
        name="plus-square" 
        label="Add block" 
        style="font-size: 2rem;" 
        on:click={() => addBlock()} 
        on:keydown={(e) => e.key === 'Enter' && addBlock()}
        role="button"
      ></sl-icon-button>
    </div>


    <sl-card class="card-header card-footer">
      <div slot="header">
        Header Title
        <sl-icon-button name="gear" label="Settings"></sl-icon-button>
      </div>
    
      This card has a header. You can put all sorts of things in it!

      This card has a footer. You can put all sorts of things in it!

      <div slot="footer">
        <sl-rating></sl-rating>
        <sl-button variant="primary">Preview</sl-button>
      </div>
    </sl-card>
    
    
  </main>
  
  <style>
      .editor-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    position: relative;
    min-height: 300px; /* Ensure there's always space for the button */
  }

  .block-wrapper {
    margin-bottom: 10px;
    position: relative;
  }

  .add-block-button {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }

  .post-block-button {
    position: absolute;
    bottom: 20px;
    left: 20px;
  }

  /* Card */

  .card-header {
        max-width: 300px;
      }
    
      .card-header [slot='header'] {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    
      .card-header h3 {
        margin: 0;
      }
    
      .card-header sl-icon-button {
        font-size: var(--sl-font-size-medium);
      }

      .card-footer {
    max-width: 300px;
  }

      .card-footer [slot='footer'] {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
    
  </style>