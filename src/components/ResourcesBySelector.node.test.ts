import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ResourcesBySelector from './ResourcesBySelector';

describe('ResourcesBySelector Component & Filtering Logic', () => {
  const mockResources = [
    { id: '1', name: 'API Reference', placement: 'top', tags: ['api', 'docs'] },
    { id: '2', name: 'Getting Started Guide', placement: 'left', tags: ['guide'] },
    { id: '3', name: 'Advanced Architecture', placement: 'top', tags: ['architecture'] },
  ];

  it('filters resources by placement mode top', () => {
    render(<ResourcesBySelector resources={mockResources} placement="top" />);
    expect(screen.getByText('API Reference')).toBeDefined();
    expect(screen.getByText('Advanced Architecture')).toBeDefined();
    expect(screen.queryByText('Getting Started Guide')).toBeNull();
  });

  it('filters resources by placement mode left', () => {
    render(<ResourcesBySelector resources={mockResources} placement="left" />);
    expect(screen.getByText('Getting Started Guide')).toBeDefined();
    expect(screen.queryByText('API Reference')).toBeNull();
  });

  it('matches search terms dynamically across resources', () => {
    render(<ResourcesBySelector resources={mockResources} />);
    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: 'Guide' } });
    
    expect(screen.getByText('Getting Started Guide')).toBeDefined();
    expect(screen.queryByText('API Reference')).toBeNull();
  });
});
