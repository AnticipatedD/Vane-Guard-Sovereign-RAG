export function scriptLog(level: 'INFO' | 'WARN' | 'ERROR', message: string, meta: Record<string, unknown> = {}) {
  const payload = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...meta,
  };
  if (level === 'ERROR') {
    console.error(JSON.stringify(payload));
  } else {
    console.log(JSON.stringify(payload));
  }
  return payload;
}
