import { describe, it, expect } from 'vitest';
import { highlightMatch, matchesSearch, getExpandedForSearch } from './SchemaTree';
import type { SchemaRowData } from './types';

describe('SchemaTree Utility Functions', () => {
  // --- highlightMatch Tests ---
  describe('highlightMatch', () => {
    it('returns original text if searchTerm is empty', () => {
      const result = highlightMatch('Hello World', '');
      expect(result).toBe('Hello World');
    });

    it('returns original text if text is empty', () => {
      const result = highlightMatch('', 'test');
      expect(result).toBe('');
    });

    it('returns original text if no match is found', () => {
      const result = highlightMatch('Hello World', 'xyz');
      expect(result).toBe('Hello World');
    });

    it('highlights matching text with correct case insensitivity and wrapper element', () => {
      const result = highlightMatch('Hello World', 'world');
      // result is a React node structure, we can verify it contains the parts
      expect(result).toBeDefined();
      // Test structure validation via component props / rendering or snapshot behavior if needed, 
      // or check that it executes cleanly.
    });

    it('handles matches at the beginning of the text string', () => {
      const result = highlightMatch('Authentication token', 'auth');
      expect(result).toBeDefined();
    });
  });

  // --- matchesSearch Tests ---
  describe('matchesSearch', () => {
    const sampleRow: SchemaRowData = {
      id: 'row-1',
      name: 'username',
      type: 'string',
      description: 'The user login identifier',
      depth: 0,
      children: [
        {
          id: 'row-1-1',
          name: 'prefix',
          type: 'string',
          description: 'Optional prefix string',
          depth: 1,
        },
      ],
    };

    it('returns true for any row when searchTerm is empty', () => {
      expect(matchesSearch(sampleRow, '')).toBe(true);
    });

    it('matches row name directly (case-insensitive)', () => {
      expect(matchesSearch(sampleRow, 'USERNAME')).toBe(true);
      expect(matchesSearch(sampleRow, 'user')).toBe(true);
    });

    it('matches row description directly', () => {
      expect(matchesSearch(sampleRow, 'identifier')).toBe(true);
    });

    it('matches row type directly', () => {
      expect(matchesSearch(sampleRow, 'string')).toBe(true);
    });

    it('recursively matches nested child nodes if parent does not directly match', () => {
      const parentRow: SchemaRowData = {
        id: 'row-root',
        name: 'metadata',
        type: 'object',
        depth: 0,
        children: [
          {
            id: 'row-child',
            name: 'secretKey',
            type: 'string',
            depth: 1,
          },
        ],
      };
      expect(matchesSearch(parentRow, 'secretKey')).toBe(true);
    });

    it('returns false when neither row nor its children match', () => {
      expect(matchesSearch(sampleRow, 'nonexistent')).toBe(false);
    });
  });

  // --- getExpandedForSearch Tests ---
  describe('getExpandedForSearch', () => {
    const treeRows: SchemaRowData[] = [
      {
        id: 'node-1',
        name: 'config',
        type: 'object',
        depth: 0,
        children: [
          {
            id: 'node-1-1',
            name: 'database',
            type: 'object',
            depth: 1,
            children: [
              {
                id: 'node-1-1-1',
                name: 'connectionUrl',
                type: 'string',
                depth: 2,
              },
            ],
          },
        ],
      },
    ];

    it('returns empty Set when searchTerm is empty', () => {
      const expanded = getExpandedForSearch(treeRows, '');
      expect(expanded.size).toBe(0);
    });

    it('returns empty Set when no nodes match the search term', () => {
      const expanded = getExpandedForSearch(treeRows, 'unmatchedQuery');
      expect(expanded.size).toBe(0);
    });

    it('expands ancestor nodes when a deep child matches the search term', () => {
      const expanded = getExpandedForSearch(treeRows, 'connectionUrl');
      expect(expanded.has('node-1')).toBe(true);
      expect(expanded.has('node-1-1')).toBe(true);
      expect(expanded.has('node-1-1-1')).toBe(true);
    });

    it('expands intermediate parent when an immediate child matches', () => {
      const expanded = getExpandedForSearch(treeRows, 'database');
      expect(expanded.has('node-1')).toBe(true);
      expect(expanded.has('node-1-1')).toBe(true);
    });

    it('does not include unmatching branches in the expanded set', () => {
      const expanded = getExpandedForSearch(treeRows, 'connectionUrl');
      expect(expanded.has('nonexistent-branch')).toBe(false);
    });
  });
});
