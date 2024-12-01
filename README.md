# Notion-like Editor with SvelteKit

## Features
- Drag and drop blocks
- Add/delete blocks
- Rich text editing
- Minimal Notion-like interface
- TypeScript support
- SvelteKit project structure

## Prerequisites
- Node.js (v18+ recommended)
- npm or pnpm

## Setup Instructions
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure
- `src/routes/+page.svelte`: Main editor page
- `src/lib/BlockEditor.svelte`: Individual block editor component
- `svelte.config.js`: SvelteKit configuration
- `vite.config.ts`: Vite configuration

## Key Dependencies
- Svelte
- SvelteKit
- Tiptap (for rich text editing)
- svelte-dnd-action (for drag and drop)
- uuid (for generating unique block IDs)

## How to Use
- Click "Add Block" to create new text blocks
- Drag and drop blocks to reorder them
- Click the "✕" button to delete a block
- Start typing in a block to add content

## Limitations & Potential Improvements
- Currently supports only paragraph blocks
- No block type switching
- Basic styling
- No persistent storage

## Next Steps
- Add more block types (headings, lists, etc.)
- Implement local storage or backend persistence
- Add more advanced Tiptap extensions
- Improve drag and drop interactions

## License
MIT License