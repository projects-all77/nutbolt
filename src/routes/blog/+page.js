export async function load({ fetch }) {
    const response = await fetch('/api/data');
    
    if (response.ok) {
      const data = await response.json();
      return { data };
    } else {
      throw new Error('Failed to load JSON data');
    }
  }
  