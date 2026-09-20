import { describe, it, expect } from 'vitest';

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
});
