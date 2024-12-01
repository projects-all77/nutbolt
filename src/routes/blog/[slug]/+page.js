export async function load({ fetch, params }) {
    const { id } = params;
    const response = await fetch(`/api/blog/${id}`);
    
    if (response.ok) {
      const post = await response.json();
      return { post };
    } else {
      throw new Error('Failed to load blog post');
    }
  }
  