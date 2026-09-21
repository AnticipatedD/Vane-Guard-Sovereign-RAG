# Vane-Guard Sovereign Documentation Portal

High-performance documentation portal built with Astro, Starlight, React, TypeScript, and Cloudflare Workers Edge runtime.

## Features
- **Structured Edge Worker**: Integrated health endpoints (`/health`) and JSON logging (`src/util/logger.ts`).
- **Strict Testing**: Enforced unit tests and Vitest coverage gates (70%).
- **TypeScript & Zod**: Full type safety across component props and API parameters.

## Local Development
```bash
pnpm install
pnpm run dev

pnpm test

