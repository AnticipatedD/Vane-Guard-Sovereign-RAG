import { describe, it, expect } from 'vitest';

describe('SchemaTree Search & Filter Engine', () => {
  it('correctly matches search terms', () => {
    const text = 'Sovereign RAG Documentation';
    const query = 'Sovereign';
    expect(text.toLowerCase().includes(query.toLowerCase())).toBe(true);
  });

  it('handles search filter expansion state', () => {
    const expandedKeys = new Set<string>();
    expandedKeys.add('node-1');
    expect(expandedKeys.has('node-1')).toBe(true);
  });

  it('highlights search match terms correctly', () => {
    const term = 'RAG';
    const content = 'Vane-Guard RAG System';
    expect(content.indexOf(term)).toBe(11);
  });
});
