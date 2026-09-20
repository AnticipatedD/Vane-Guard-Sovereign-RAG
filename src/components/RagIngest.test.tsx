import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { RagIngest } from './RagIngest';

describe('RagIngest Component', () => {
  it('renders input and disabled submit button by default', () => {
    render(<RagIngest />);
    const input = screen.getByLabelText(/data source url \/ path/i);
    const button = screen.getByRole('button', { name: /ingest document/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('enables submit button when input contains valid text', () => {
    render(<RagIngest />);
    const input = screen.getByLabelText(/data source url \/ path/i);
    const button = screen.getByRole('button', { name: /ingest document/i });

    fireEvent.change(input, { target: { value: 'https://example.com/data.pdf' } });
    expect(button).not.toBeDisabled();
  });

  it('handles successful ingestion trigger', () => {
    const handleSuccess = vi.fn();
    render(<RagIngest onIngestSuccess={handleSuccess} />);

    const input = screen.getByLabelText(/data source url \/ path/i);
    const button = screen.getByRole('button', { name: /ingest document/i });

    fireEvent.change(input, { target: { value: 's3://vector-bucket/docs' } });
    fireEvent.click(button);

    expect(handleSuccess).toHaveBeenCalledWith({ source: 's3://vector-bucket/docs' });
    expect(input).toHaveValue('');
  });

  it('handles error scenario gracefully', () => {
    const handleError = vi.fn();
    render(<RagIngest onIngestError={handleError} />);

    const input = screen.getByLabelText(/data source url \/ path/i);
    const button = screen.getByRole('button', { name: /ingest document/i });

    fireEvent.change(input, { target: { value: 'trigger-error' } });
    fireEvent.click(button);

    expect(handleError).toHaveBeenCalledWith(new Error('Ingestion pipeline failed'));
  });
});
