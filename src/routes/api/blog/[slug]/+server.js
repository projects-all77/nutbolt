// src/routes/api/blog/[id]/+server.js
import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

export async function GET({ params }) {
  const { id } = params;
  const filePath = path.resolve('src/lib/server/data/blogs.json');
  const blogData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  // Find the blog post by id
  const post = blogData.find((post) => post.id === parseInt(id, 10));

  if (post) {
    return json(post);
  } else {
    return json({ error: 'Post not found' }, { status: 404 });
  }
}
