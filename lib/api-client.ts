// Client-side API helpers

export async function fetchProducts() {
  const response = await fetch('/api/products');
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
}

export async function fetchProjects() {
  const response = await fetch('/api/projects');
  if (!response.ok) throw new Error('Failed to fetch projects');
  return response.json();
}

export async function fetchResources() {
  const response = await fetch('/api/resources');
  if (!response.ok) throw new Error('Failed to fetch resources');
  return response.json();
}

export async function fetchInquiries() {
  const response = await fetch('/api/inquiries');
  if (!response.ok) throw new Error('Failed to fetch inquiries');
  return response.json();
}

export async function seedContent() {
  const response = await fetch('/api/seed', { method: 'GET' });
  if (!response.ok) throw new Error('Failed to seed content');
  return response.json();
}
