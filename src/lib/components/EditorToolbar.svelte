<script lang="ts">
	import type { Editor } from '@tiptap/core';
	import { Bold, Italic, Underline, Strikethrough, Code, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, Quote, Heading1, Heading2, Heading3, Image, Link, Table, Highlighter, Subscript, Superscript, Minus } from 'lucide-svelte';
	
	export let editor: Editor;

	$: if (editor) {
		editor.on('selectionUpdate', () => {
			// Force reactivity update
			editor = editor;
		});
	}

	function setHeading(level: number) {
		if (level === 0) {
			editor.chain().focus().setParagraph().run();
		} else {
			editor.chain().focus().toggleHeading({ level }).run();
		}
	}

	function addImage() {
		const url = prompt('Enter image URL:');
		if (url) {
			editor.chain().focus().setImage({ src: url }).run();
		}
	}

	function addLink() {
		const url = prompt('Enter link URL:');
		if (url) {
			editor.chain().focus().setLink({ href: url }).run();
		}
	}

	function addTable() {
		editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
	}
</script>

<div class="editor-toolbar">
	<!-- Text Formatting -->
	<div class="flex gap-1 border-r border-gray-200 pr-2">
		<button
			class="p-2 rounded hover:bg-gray-100 {editor.isActive('bold') ? 'bg-gray-200' : ''}"
			on:click={() => editor.chain().focus().toggleBold().run()}
			title="Bold"
		>
			<Bold size={16} />
		</button>
		<button
			class="p-2 rounded hover:bg-gray-100 {editor.isActive('italic') ? 'bg-gray-200' : ''}"
			on:click={() => editor.chain().focus().toggleItalic().run()}
			title="Italic"
		>
			<Italic size={16} />
		</button>
		<button
			class="p-2 rounded hover:bg-gray-100 {editor.isActive('underline') ? 'bg-gray-200' : ''}"
			on:click={() => editor.chain().focus().toggleUnderline().run()}
			title="Underline"
		>
			<Underline size={16} />
		</button>
		<button
			class="p-2 rounded hover:bg-gray-100 {editor.isActive('strike') ? 'bg-gray-200' : ''}"
			on:click={() => editor.chain().focus().toggleStrike().run()}
			title="Strikethrough"
		>
			<Strikethrough size={16} />
		</button>
		<button
			class="p-2 rounded hover:bg-gray-100 {editor.isActive('code') ? 'bg-gray-200' : ''}"
			on:click={() => editor.chain().focus().toggleCode().run()}
			title="Code"
		>
			<Code size={16} />
		</button>
	</div>

	<!-- Headings -->
	<div class="flex gap-1 border-r border-gray-200 pr-2">
		<button
			class="p-2 rounded hover:bg-gray-100 {editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''}"
			on:click={() => setHeading(1)}
			title="Heading 1"
		>
			<Heading1 size={16} />
		</button>
		<button
			class="p-2 rounded hover:bg-gray-100 {editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}"
			on:click={() => setHeading(2)}
			title="Heading 2"
		>
			<Heading2 size={16} />
		</button>
		<button
			class="p-2 rounded hover:bg-gray-100 {editor.isActive('heading', { level: 3 }) ? 'bg-gray-200' : ''}"
			on:click={() => setHeading(3)}
			title="Heading 3"
		>
			<Heading3 size={16} />
		</button>
	</div>

	<!-- Text Alignment -->
	<div class="flex gap-1 border-r border-gray-200 pr-2">
		<button
			class="p-2 rounded hover:bg-gray-100 {editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''}"
			on:click={() => editor.chain().focus().setTextAlign('left').run()}
			title="Align Left"
		>
			<AlignLeft size={16} />
		</button>
		<button
			class="p-2 rounded hover:bg-gray-100 {editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''}"
			on:click={() => editor.chain().focus().setTextAlign('center').run()}
			title="Align Center"
		>
			<AlignCenter size={16} />
		</button>
		<button
			class="p-2 rounded hover:bg-gray-100 {editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''}"
			on:click={() => editor.chain().focus().setTextAlign('right').run()}
			title="Align Right"
		>
			<AlignRight size={16} />
		</button>
	</div>

	<!-- Lists -->
	<div class="flex gap-1 border-r border-gray-200 pr-2">
		<button
			class="p-2 rounded hover:bg-gray-100 {editor.isActive('bulletList') ? 'bg-gray-200' : ''}"
			on:click={() => editor.chain().focus().toggleBulletList().run()}
			title="Bullet List"
		>
			<List size={16} />
		</button>
		<button
			class="p-2 rounded hover:bg-gray-100 {editor.isActive('orderedList') ? 'bg-gray-200' : ''}"
			on:click={() => editor.chain().focus().toggleOrderedList().run()}
			title="Ordered List"
		>
			<ListOrdered size={16} />
		</button>
		<button
			class="p-2 rounded hover:bg-gray-100 {editor.isActive('taskList') ? 'bg-gray-200' : ''}"
			on:click={() => editor.chain().focus().toggleTaskList().run()}
			title="Task List"
		>
			☑️
		</button>
	</div>

	<!-- Other Formatting -->
	<div class="flex gap-1 border-r border-gray-200 pr-2">
		<button
			class="p-2 rounded hover:bg-gray-100 {editor.isActive('blockquote') ? 'bg-gray-200' : ''}"
			on:click={() => editor.chain().focus().toggleBlockquote().run()}
			title="Quote"
		>
			<Quote size={16} />
		</button>
		<button
			class="p-2 rounded hover:bg-gray-100 {editor.isActive('codeBlock') ? 'bg-gray-200' : ''}"
			on:click={() => editor.chain().focus().toggleCodeBlock().run()}
			title="Code Block"
		>
			<Code size={16} />
		</button>
		<button
			class="p-2 rounded hover:bg-gray-100"
			on:click={() => editor.chain().focus().setHorizontalRule().run()}
			title="Horizontal Rule"
		>
			<Minus size={16} />
		</button>
	</div>

	<!-- Advanced Formatting -->
	<div class="flex gap-1 border-r border-gray-200 pr-2">
		<button
			class="p-2 rounded hover:bg-gray-100 {editor.isActive('highlight') ? 'bg-gray-200' : ''}"
			on:click={() => editor.chain().focus().toggleHighlight().run()}
			title="Highlight"
		>
			<Highlighter size={16} />
		</button>
		<button
			class="p-2 rounded hover:bg-gray-100 {editor.isActive('subscript') ? 'bg-gray-200' : ''}"
			on:click={() => editor.chain().focus().toggleSubscript().run()}
			title="Subscript"
		>
			<Subscript size={16} />
		</button>
		<button
			class="p-2 rounded hover:bg-gray-100 {editor.isActive('superscript') ? 'bg-gray-200' : ''}"
			on:click={() => editor.chain().focus().toggleSuperscript().run()}
			title="Superscript"
		>
			<Superscript size={16} />
		</button>
	</div>

	<!-- Insert -->
	<div class="flex gap-1">
		<button
			class="p-2 rounded hover:bg-gray-100"
			on:click={addImage}
			title="Insert Image"
		>
			<Image size={16} />
		</button>
		<button
			class="p-2 rounded hover:bg-gray-100 {editor.isActive('link') ? 'bg-gray-200' : ''}"
			on:click={addLink}
			title="Insert Link"
		>
			<Link size={16} />
		</button>
		<button
			class="p-2 rounded hover:bg-gray-100"
			on:click={addTable}
			title="Insert Table"
		>
			<Table size={16} />
		</button>
	</div>
</div>

<style>
	.editor-toolbar {
		display: flex;
		flex-wrap: nowrap;
		overflow-x: auto;
		background-color: white;
		border-top: 1px solid #e5e7eb;
		padding: 0.5rem;
		box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
	}

	@media (min-width: 768px) {
		.editor-toolbar {
			position: sticky;
			top: 0;
			z-index: 10;
			flex-wrap: wrap;
			border-bottom: 1px solid #e5e7eb;
			border-top: none;
			box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		}
	}

	.editor-toolbar button {
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 32px;
		min-height: 32px;
		transition: all 0.2s ease;
	}

	.editor-toolbar button:hover {
		transform: translateY(-1px);
	}

	.editor-toolbar button:active {
		transform: translateY(0);
	}
</style>