<script lang="ts">
	import BlockEditor from '$lib/tiptap/BlockEditor.svelte';
</script>

<main class="p-4">
	<h1 class="text-2xl font-bold mb-4">Tiptap Editor</h1>
	<div class="editor-container mx-auto">
		<BlockEditor />
	</div>
</main>

<style>
	.editor-container {
		height: 70vh;
	}
</style>
