import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { RagIngest } from './RagIngest';

describe('RagIngest Component', () => {
    it('renders input field and submit button', () => {
        render(<RagIngest />);
        expect(screen.getByLabelText(/data source url \/ path/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /ingest document/i })).toBeInTheDocument();
    });

    it('disables submit button when input is empty', () => {
        render(<RagIngest />);
        const button = screen.getByRole('button', { name: /ingest document/i });
        expect(button).toBeDisabled();
    });

    it('calls onIngestSuccess when ingestion succeeds', async () => {
        const handleSuccess = vi.fn();
        render(<RagIngest onIngestSuccess={handleSuccess} />);

        const input = screen.getByLabelText(/data source url \/ path/i);
        fireEvent.change(input, { target: { value: 'https://example.com/source' } });

        const button = screen.getByRole('button', { name: /ingest document/i });
        expect(button).not.toBeDisabled();

        fireEvent.click(button);

        await waitFor(() => {
            expect(handleSuccess).toHaveBeenCalledTimes(1);
            expect(handleSuccess).toHaveBeenCalledWith({ source: 'https://example.com/source' });
        });
    });

    it('calls onIngestError when ingestion fails', async () => {
        const handleError = vi.fn();
        render(<RagIngest onIngestError={handleError} />);

        const input = screen.getByLabelText(/data source url \/ path/i);
        fireEvent.change(input, { target: { value: 'trigger-error' } });

        const button = screen.getByRole('button', { name: /ingest document/i });
        fireEvent.click(button);

        await waitFor(() => {
            expect(handleError).toHaveBeenCalledTimes(1);
            expect(handleError).toHaveBeenCalledWith(expect.any(Error));
        });
    });
});
