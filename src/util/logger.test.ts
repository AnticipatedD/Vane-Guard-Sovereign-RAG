import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { logger, Logger } from './logger';

describe('Logger Utility', () => {
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'debug').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should format and log info messages correctly', () => {
    const res = logger.info('System initialized', { module: 'auth' });
    expect(res.level).toBe('info');
    expect(res.message).toBe('System initialized');
    expect(res.context).toEqual({ module: 'auth' });
    expect(console.log).toHaveBeenCalledWith(JSON.stringify(res));
  });

  it('should format and log warn messages without context', () => {
    const res = logger.warn('High memory usage');
    expect(res.level).toBe('warn');
    expect(res.message).toBe('High memory usage');
    expect(res.context).toBeUndefined();
    expect(console.warn).toHaveBeenCalledWith(JSON.stringify(res));
  });

  it('should format and log error messages correctly', () => {
    const res = logger.error('Database connection failed', { code: 500 });
    expect(res.level).toBe('error');
    expect(res.message).toBe('Database connection failed');
    expect(console.error).toHaveBeenCalledWith(JSON.stringify(res));
  });

  it('should format and log debug messages correctly', () => {
    const customLogger = new Logger();
    const res = customLogger.debug('Tracing execution flow');
    expect(res.level).toBe('debug');
    expect(res.message).toBe('Tracing execution flow');
    expect(console.debug).toHaveBeenCalledWith(JSON.stringify(res));
  });
});
