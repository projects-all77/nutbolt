<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Placeholder from '@tiptap/extension-placeholder';
	import Underline from '@tiptap/extension-underline';
	import Focus from '@tiptap/extension-focus';
	import Typography from '@tiptap/extension-typography';
	import TextAlign from '@tiptap/extension-text-align';
	import Highlight from '@tiptap/extension-highlight';
	import Subscript from '@tiptap/extension-subscript';
	import Superscript from '@tiptap/extension-superscript';
	import TextStyle from '@tiptap/extension-text-style';
	import Color from '@tiptap/extension-color';
	import FontFamily from '@tiptap/extension-font-family';
	import Link from '@tiptap/extension-link';
	import Image from '@tiptap/extension-image';
	import Table from '@tiptap/extension-table';
	import TableRow from '@tiptap/extension-table-row';
	import TableCell from '@tiptap/extension-table-cell';
	import TableHeader from '@tiptap/extension-table-header';
	import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
	import TaskList from '@tiptap/extension-task-list';
	import TaskItem from '@tiptap/extension-task-item';
	import { createLowlight } from 'lowlight';
	import EditorToolbar from './EditorToolbar.svelte';

	export let content = '';
	export let onUpdate: (jsonContent: object) => void = () => {};
	export let placeholder = 'Start writing your note...';
	export let showToolbar = true;

	let element: HTMLElement;
	let editor: Editor | undefined;

	const lowlight = createLowlight();

	onMount(() => {
		editor = new Editor({
			element,
			extensions: [
				StarterKit.configure({
					heading: {
						levels: [1, 2, 3, 4, 5, 6],
					},
					codeBlock: false, // We'll use CodeBlockLowlight instead
				}),
				Underline,
				Focus.configure({
					className: 'has-focus',
					mode: 'all',
				}),
				Typography,
				TextAlign.configure({
					types: ['heading', 'paragraph'],
				}),
				Highlight.configure({
					multicolor: true,
				}),
				Subscript,
				Superscript,
				TextStyle,
				Color,
				FontFamily,
				Link.configure({
					openOnClick: false,
					autolink: true,
				}),
				Image.configure({
					inline: true,
					allowBase64: true,
				}),
				Table.configure({
					resizable: true,
				}),
				TableRow,
				TableHeader,
				TableCell,
				TaskList,
				TaskItem.configure({
					nested: true,
				}),
				CodeBlockLowlight.configure({
					lowlight,
				}),
				Placeholder.configure({
					placeholder: placeholder
				})
			],
			content: content,
			onUpdate: ({ editor }) => {
				const jsonContent = editor.getJSON();
				onUpdate(jsonContent);
			},
			editorProps: {
				attributes: {
					class: 'prose prose-lg max-w-none focus:outline-none min-h-screen p-6'
				}
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});

	$: if (editor && content) {
		try {
			const currentContent = editor.getJSON();
			const newContent = typeof content === 'string' ? JSON.parse(content) : content;
			if (JSON.stringify(currentContent) !== JSON.stringify(newContent)) {
				editor.commands.setContent(newContent);
			}
		} catch (error) {
			if (typeof content === 'string') {
				editor.commands.setContent(content);
			}
		}
	}

	export function getJSON() {
		return editor?.getJSON();
	}

	export function getHTML() {
		return editor?.getHTML();
	}

	export function setContent(content: any) {
		editor?.commands.setContent(content);
	}

	export function focus() {
		editor?.commands.focus();
	}

	export function blur() {
		editor?.commands.blur();
	}
</script>

<div class="note-editor h-screen w-full">
	{#if showToolbar && editor}
		<EditorToolbar {editor} />
	{/if}
	<div bind:this={element} class="flex-1 w-full {showToolbar ? 'editor-with-toolbar' : ''}"></div>
</div>

<style>
	.note-editor {
		display: flex;
		flex-direction: column;
	}

	.editor-with-toolbar {
		height: calc(100vh - 60px) !important;
	}

	:global(.note-editor .ProseMirror) {
		height: 100% !important;
		width: 100% !important;
		padding: 2rem !important;
		font-size: 1.125rem !important;
		line-height: 1.7 !important;
		font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif !important;
		color: #1f2937 !important;
		background-color: #ffffff !important;
		border: none !important;
		outline: none !important;
		resize: none !important;
		overflow-y: auto !important;
	}
	
	:global(.note-editor .ProseMirror p.is-editor-empty:first-child::before) {
		color: #9ca3af !important;
		content: attr(data-placeholder) !important;
		float: left !important;
		height: 0 !important;
		pointer-events: none !important;
	}
	
	:global(.note-editor .ProseMirror:focus) {
		outline: none !important;
	}
	
	:global(.note-editor .ProseMirror p) {
		margin: 0 0 1rem 0 !important;
	}
	
	:global(.note-editor .ProseMirror p:last-child) {
		margin-bottom: 0 !important;
	}

	:global(.note-editor .ProseMirror h1) {
		font-size: 2.5rem !important;
		font-weight: 700 !important;
		line-height: 1.2 !important;
		margin: 2rem 0 1rem 0 !important;
	}

	:global(.note-editor .ProseMirror h2) {
		font-size: 2rem !important;
		font-weight: 600 !important;
		line-height: 1.3 !important;
		margin: 1.5rem 0 1rem 0 !important;
	}

	:global(.note-editor .ProseMirror h3) {
		font-size: 1.5rem !important;
		font-weight: 600 !important;
		line-height: 1.4 !important;
		margin: 1.5rem 0 0.5rem 0 !important;
	}

	:global(.note-editor .ProseMirror h4) {
		font-size: 1.25rem !important;
		font-weight: 600 !important;
		line-height: 1.5 !important;
		margin: 1rem 0 0.5rem 0 !important;
	}

	:global(.note-editor .ProseMirror h5) {
		font-size: 1.125rem !important;
		font-weight: 600 !important;
		line-height: 1.6 !important;
		margin: 1rem 0 0.5rem 0 !important;
	}

	:global(.note-editor .ProseMirror h6) {
		font-size: 1rem !important;
		font-weight: 600 !important;
		line-height: 1.6 !important;
		margin: 1rem 0 0.5rem 0 !important;
	}

	:global(.note-editor .ProseMirror blockquote) {
		border-left: 4px solid #e5e7eb !important;
		margin: 1.5rem 0 !important;
		padding-left: 1rem !important;
		font-style: italic !important;
		color: #6b7280 !important;
	}

	:global(.note-editor .ProseMirror ul) {
		list-style-type: disc !important;
		margin: 1rem 0 !important;
		padding-left: 1.5rem !important;
	}

	:global(.note-editor .ProseMirror ol) {
		list-style-type: decimal !important;
		margin: 1rem 0 !important;
		padding-left: 1.5rem !important;
	}

	:global(.note-editor .ProseMirror li) {
		margin: 0.25rem 0 !important;
	}

	:global(.note-editor .ProseMirror ul[data-type="taskList"]) {
		list-style: none !important;
		padding-left: 0 !important;
	}

	:global(.note-editor .ProseMirror ul[data-type="taskList"] li) {
		display: flex !important;
		align-items: flex-start !important;
		gap: 0.5rem !important;
	}

	:global(.note-editor .ProseMirror ul[data-type="taskList"] li > label) {
		flex: 0 0 auto !important;
		margin-right: 0.5rem !important;
		user-select: none !important;
	}

	:global(.note-editor .ProseMirror ul[data-type="taskList"] li > div) {
		flex: 1 1 auto !important;
	}

	:global(.note-editor .ProseMirror hr) {
		border: none !important;
		border-top: 2px solid #e5e7eb !important;
		margin: 2rem 0 !important;
	}

	:global(.note-editor .ProseMirror code) {
		background-color: #f3f4f6 !important;
		padding: 0.125rem 0.25rem !important;
		border-radius: 0.25rem !important;
		font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace !important;
		font-size: 0.875rem !important;
		color: #ef4444 !important;
	}

	:global(.note-editor .ProseMirror pre) {
		background-color: #1f2937 !important;
		color: #f9fafb !important;
		border-radius: 0.5rem !important;
		padding: 1rem !important;
		margin: 1rem 0 !important;
		overflow-x: auto !important;
		font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace !important;
		font-size: 0.875rem !important;
		line-height: 1.5 !important;
	}

	:global(.note-editor .ProseMirror pre code) {
		background-color: transparent !important;
		color: inherit !important;
		padding: 0 !important;
		border-radius: 0 !important;
		font-size: inherit !important;
	}

	:global(.note-editor .ProseMirror a) {
		color: #3b82f6 !important;
		text-decoration: underline !important;
	}

	:global(.note-editor .ProseMirror a:hover) {
		color: #1d4ed8 !important;
	}

	:global(.note-editor .ProseMirror img) {
		max-width: 100% !important;
		height: auto !important;
		border-radius: 0.5rem !important;
		margin: 1rem 0 !important;
	}

	:global(.note-editor .ProseMirror table) {
		border-collapse: collapse !important;
		margin: 1rem 0 !important;
		overflow: hidden !important;
		table-layout: fixed !important;
		width: 100% !important;
	}

	:global(.note-editor .ProseMirror table td, .note-editor .ProseMirror table th) {
		border: 1px solid #e5e7eb !important;
		box-sizing: border-box !important;
		min-width: 1em !important;
		padding: 0.5rem !important;
		position: relative !important;
		vertical-align: top !important;
	}

	:global(.note-editor .ProseMirror table th) {
		background-color: #f9fafb !important;
		font-weight: 600 !important;
		text-align: left !important;
	}

	:global(.note-editor .ProseMirror .has-focus) {
		border-radius: 0.25rem !important;
		outline: 2px solid #3b82f6 !important;
		outline-offset: 2px !important;
	}

	:global(.note-editor .ProseMirror mark) {
		background-color: #fef3c7 !important;
		border-radius: 0.125rem !important;
		padding: 0.125rem 0.25rem !important;
	}
</style>