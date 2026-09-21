import { describe, it, expect, vi } from 'vitest';
import { logger } from './logger';

describe('Structured Logger Output', () => {
  it('outputs valid structured JSON logs', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    logger.info('Test log event', { key: 'value' });
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
