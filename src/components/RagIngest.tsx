import React, { useState } from 'react';

export interface RagIngestProps {
  onIngestSuccess?: (data: { source: string }) => void;
  onIngestError?: (error: Error) => void;
}

export const RagIngest: React.FC<RagIngestProps> = ({ onIngestSuccess, onIngestError }) => {
  const [source, setSource] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!source.trim()) return;

    setLoading(true);
    try {
      if (source === 'trigger-error') {
        throw new Error('Ingestion pipeline failed');
      }
      const payload = { source: source.trim() };
      if (onIngestSuccess) onIngestSuccess(payload);
      setSource('');
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error('Unknown error');
      if (onIngestError) onIngestError(errorObj);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} data-testid="rag-ingest-form">
      <label htmlFor="rag-source-input">Data Source URL / Path</label>
      <input
        id="rag-source-input"
        type="text"
        value={source}
        onChange={(e) => setSource(e.target.value)}
        placeholder="Enter data source..."
        disabled={loading}
      />
      <button type="submit" disabled={loading || !source.trim()}>
        {loading ? 'Ingesting...' : 'Ingest Document'}
      </button>
    </form>
  );
};
