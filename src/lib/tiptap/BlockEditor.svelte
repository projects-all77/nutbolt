<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import { Editor } from '@tiptap/core';
	import Document from '@tiptap/extension-document';
	import Paragraph from '@tiptap/extension-paragraph';
	import Text from '@tiptap/extension-text';
  
	export let blockId: string;
	export let initialContent = '';
  
	const dispatch = createEventDispatcher<{
	  update: string;
	  delete: void;
	}>();
  
	let element: HTMLElement;
	let editor: Editor | undefined;
  
	onMount(() => {
	  editor = new Editor({
		element,
		extensions: [
		  Document,
		  Paragraph,
		  Text
		],
		content: initialContent,
		onUpdate: () => {
		  if (editor) {
			const content = editor.getHTML();
			dispatch('update', content);
		  }
		}
	  });
  
	  return () => {
		if (editor) {
		  editor.destroy();
		}
	  };
	});
  
	function handleKeydown(event: KeyboardEvent) {
	  // Delete block on backspace when empty
	  if (editor && event.key === 'Backspace' && !editor.getText().trim()) {
		dispatch('delete');
	  }
	}
  
	function handleDelete() {
	  dispatch('delete');
	}
  </script>
  
  <div class="block-editor">
	<div 
	  bind:this={element} 
	  on:keydown={handleKeydown}
	  contenteditable="true"
	  class="editor-content"
	></div>
	<button 
	  on:click={handleDelete} 
	  class="delete-block"
	>
	  ✕
	</button>
  </div>
  
  <style>
	.block-editor {
	  position: relative;
	  border: 1px solid #e0e0e0;
	  border-radius: 4px;
	  padding: 10px;
	  min-height: 50px;
	  display: flex;
	  align-items: center;
	}
  
	.editor-content {
	  flex-grow: 1;
	  outline: none;
	}
  
	.delete-block {
	  background: none;
	  border: none;
	  color: #888;
	  cursor: pointer;
	  font-size: 16px;
	  margin-left: 10px;
	  opacity: 0.5;
	  transition: opacity 0.2s;
	}
  
	.delete-block:hover {
	  opacity: 1;
	}
  </style>