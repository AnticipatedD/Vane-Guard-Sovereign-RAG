export type LogLevel = 'info' | 'warn' | 'error' | 'debug';

export interface LogContext {
  [key: string]: unknown;
}

export class Logger {
  private format: string;

  constructor() {
    this.format = process.env.LOG_FORMAT || 'json';
  }

  log(level: LogLevel, message: string, context: LogContext = {}) {
    const payload = {
      level,
      message,
      timestamp: new Date().toISOString(),
      ...context,
    };
    if (this.format === 'json') {
      console.log(JSON.stringify(payload));
    } else {
      console.log(`[${level.toUpperCase()}] ${message}`);
    }
  }

  info(message: string, context?: LogContext) {
    this.log('info', message, context);
  }

  error(message: string, context?: LogContext) {
    this.log('error', message, context);
  }
}

export const logger = new Logger();
