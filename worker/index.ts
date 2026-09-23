import { logger } from '../src/util/logger';

// Lightweight error reporter function gated behind ERROR_TRACKING_DSN
function reportError(err: unknown, dsn?: string) {
  if (!dsn) return;
  try {
    const errorMsg = err instanceof Error ? err.message : String(err);
    logger.error('Reporting error to tracking service', { error: errorMsg, dsnPrefix: dsn.slice(0, 8) + '...' });
  } catch (reportingErr) {
    console.error('Failed to report error:', reportingErr);
  }
}

export default {
  async fetch(request: Request, env?: { ERROR_TRACKING_DSN?: string }): Promise<Response> {
    try {
      const url = new URL(request.url);
      
      if (url.pathname === '/health') {
        logger.info('Health check pinged', { status: 'healthy' });
        return new Response(JSON.stringify({ status: 'ok', uptime: typeof process !== 'undefined' ? process.uptime() : 0 }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      return new Response('Vane-Guard Docs Portal Edge Worker', { status: 200 });
    } catch (err) {
      logger.error('Worker request failed', { error: err instanceof Error ? err.message : String(err) });
      
      // Capture error via external tracker if DSN is provided
      const dsn = env?.ERROR_TRACKING_DSN || (typeof process !== 'undefined' ? process.env.ERROR_TRACKING_DSN : undefined);
      if (dsn) {
        reportError(err, dsn);
      }

      return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  },
};
