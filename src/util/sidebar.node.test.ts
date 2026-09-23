import { describe, it, expect, vi } from 'vitest';

// Mock astro:content collections API
vi.mock('astro:content', () => ({
  getCollection: vi.fn(async (collectionName: string) => {
    if (collectionName === 'docs') {
      return [
        { id: 'index.md', data: { title: 'Home', sidebar: { order: 1 } } },
        { id: 'guides/rag.md', data: { title: 'RAG Guide', sidebar: { order: 2 } } },
      ];
    }
    return [];
  }),
  getEntry: vi.fn(async (collection: string, id: string) => {
    return { id, data: { title: 'Mocked Entry', collection } };
  }),
}));

// Minimal mock/implementation logic matching sidebar path utilities
function normalizePath(path: string): string {
  return path.replace(/\/+$/, '');
}

function flattenSidebar(items: Array<{ link?: string; items?: any[] }>): string[] {
  let links: string[] = [];
  for (const item of items) {
    if (item.link) links.push(normalizePath(item.link));
    if (item.items) links = links.concat(flattenSidebar(item.items));
  }
  return links;
}

// Simulated generateSidebar utilizing mocked collection data
async function generateSidebar() {
  const { getCollection } = await import('astro:content');
  const docs = await getCollection('docs');
  return docs.map((doc) => ({
    text: doc.data.title,
    link: `/${doc.id.replace(/\.md$/, '')}`,
  }));
}

describe('Sidebar Utility Functions', () => {
  it('normalizes trailing slashes correctly', () => {
    expect(normalizePath('/docs/api/')).toBe('/docs/api');
    expect(normalizePath('/docs/api///')).toBe('/docs/api');
  });

  it('flattens nested sidebar trees without losing routes', () => {
    const mockSidebar = [
      { link: '/getting-started/' },
      {
        items: [
          { link: '/guides/rag/' },
          { link: '/guides/gateway/' }
        ]
      }
    ];

    const result = flattenSidebar(mockSidebar);
    expect(result).toEqual(['/getting-started', '/guides/rag', '/guides/gateway']);
  });

  it('generates sidebar entries from mocked astro:content collections', async () => {
    const sidebar = await generateSidebar();
    expect(sidebar).toHaveLength(2);
    expect(sidebar[0]).toEqual({ text: 'Home', link: '/index' });
    expect(sidebar[1]).toEqual({ text: 'RAG Guide', link: '/guides/rag' });
  });
});
