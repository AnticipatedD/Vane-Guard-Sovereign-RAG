export interface LogEntry {
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  context?: Record<string, unknown>;
}

export class Logger {
  private formatEntry(level: LogEntry['level'], message: string, context?: Record<string, unknown>): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...(context && { context }),
    };
  }

  public info(message: string, context?: Record<string, unknown>): LogEntry {
    const entry = this.formatEntry('info', message, context);
    console.log(JSON.stringify(entry));
    return entry;
  }

  public warn(message: string, context?: Record<string, unknown>): LogEntry {
    const entry = this.formatEntry('warn', message, context);
    console.warn(JSON.stringify(entry));
    return entry;
  }

  public error(message: string, context?: Record<string, unknown>): LogEntry {
    const entry = this.formatEntry('error', message, context);
    console.error(JSON.stringify(entry));
    return entry;
  }

  public debug(message: string, context?: Record<string, unknown>): LogEntry {
    const entry = this.formatEntry('debug', message, context);
    console.debug(JSON.stringify(entry));
    return entry;
  }
}

export const logger = new Logger();
