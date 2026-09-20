import { describe, it, expect, vi } from 'vitest';
import { scriptLog } from './logger';

describe('Build Script Logger', () => {
  it('outputs structured JSON formatted log entry', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const log = scriptLog('INFO', 'Catalog models fetched', { count: 42 });

    expect(log.level).toBe('INFO');
    expect(log.message).toBe('Catalog models fetched');
    expect(log.count).toBe(42);
    expect(spy).toHaveBeenCalledWith(JSON.stringify(log));
    spy.mockRestore();
  });
});
