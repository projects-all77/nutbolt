<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Underline from '@tiptap/extension-underline';
	import TextAlign from '@tiptap/extension-text-align';
	import Link from '@tiptap/extension-link';
	import Image from '@tiptap/extension-image';
	import Table from '@tiptap/extension-table';
	import TableRow from '@tiptap/extension-table-row';
	import TableCell from '@tiptap/extension-table-cell';
	import TableHeader from '@tiptap/extension-table-header';
	import Highlight from '@tiptap/extension-highlight';
	import Subscript from '@tiptap/extension-subscript';
	import Superscript from '@tiptap/extension-superscript';
	import TaskList from '@tiptap/extension-task-list';
	import TaskItem from '@tiptap/extension-task-item';

	import EditorToolbar from '$lib/components/EditorToolbar.svelte';

	export let initialContent = '';

	let element: HTMLElement;
	let editor: Editor;

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				StarterKit,
				Underline,
				TextAlign.configure({ types: ['heading', 'paragraph'] }),
				Link.configure({ openOnClick: false }),
				Image,
				Table.configure({ resizable: true }),
				TableRow,
				TableHeader,
				TableCell,
				Highlight,
				Subscript,
				Superscript,
				TaskList,
				TaskItem.configure({ nested: true })
			],
			content: initialContent,
			autofocus: true,
			editable: true,
			injectCSS: false
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

<div class="editor-wrapper">
	{#if editor}
		<EditorToolbar {editor} />
	{/if}
	<div bind:this={element} class="editor-content-area" />
</div>

<style>
	.editor-wrapper {
		display: flex;
		flex-direction: column;
		height: 100%;
		border: 1px solid #e0e0e0;
		border-radius: 8px;
		overflow: hidden;
	}

	.editor-content-area {
		flex-grow: 1;
		padding: 1rem;
		overflow-y: auto;
	}

	.editor-content-area:focus {
		outline: none;
	}

	/* Basic TipTap styles */
	.ProseMirror {
		min-height: 200px;
	}
	.ProseMirror > * + * {
		margin-top: 0.75em;
	}
	.ProseMirror ul,
	.ProseMirror ol {
		padding: 0 1rem;
	}
	.ProseMirror h1,
	.ProseMirror h2,
	.ProseMirror h3 {
		line-height: 1.1;
	}
	.ProseMirror code {
		background-color: rgba(97, 97, 97, 0.1);
		color: #616161;
	}
	.ProseMirror pre {
		background: #0d0d0d;
		color: #fff;
		font-family: 'JetBrainsMono', monospace;
		padding: 0.75rem 1rem;
		border-radius: 0.5rem;
	}
	.ProseMirror pre code {
		color: inherit;
		padding: 0;
		background: none;
		font-size: 0.8rem;
	}
	.ProseMirror img {
		max-width: 100%;
		height: auto;
	}
	.ProseMirror blockquote {
		padding-left: 1rem;
		border-left: 2px solid rgba(13, 13, 13, 0.1);
	}
	.ProseMirror hr {
		border: none;
		border-top: 2px solid rgba(13, 13, 13, 0.1);
		margin: 2rem 0;
	}
	.ProseMirror table {
		border-collapse: collapse;
		table-layout: fixed;
		width: 100%;
		margin: 0;
		overflow: hidden;
	}
	.ProseMirror td,
	.ProseMirror th {
		min-width: 1em;
		border: 2px solid #ced4da;
		padding: 3px 5px;
		vertical-align: top;
		box-sizing: border-box;
		position: relative;
	}
	.ProseMirror th {
		font-weight: bold;
		text-align: left;
		background-color: #f1f3f5;
	}
	.ProseMirror .selectedCell:after {
		z-index: 2;
		position: absolute;
		content: '';
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: rgba(200, 200, 255, 0.4);
		pointer-events: none;
	}
	.ProseMirror .column-resize-handle {
		position: absolute;
		right: -2px;
		top: 0;
		bottom: -2px;
		width: 4px;
		background-color: #adf;
		pointer-events: none;
	}
	.ProseMirror p {
		margin: 0;
	}
	.ProseMirror ul[data-type='taskList'] {
		list-style: none;
		padding: 0;
	}
	.ProseMirror ul[data-type='taskList'] li {
		display: flex;
		align-items: center;
	}
	.ProseMirror ul[data-type='taskList'] li > label {
		flex: 0 0 auto;
		margin-right: 0.5rem;
	}
</style>
