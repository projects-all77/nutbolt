import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.resolve('src/lib/server/data/blogs.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  return json(data);
}
