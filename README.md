# Vane-Guard Sovereign Documentation Portal

High-performance documentation portal built with Astro, Starlight, React, TypeScript, and Cloudflare Workers Edge runtime.

## Architecture

The project follows a hybrid edge-accelerated static architecture designed for performance, modularity, and speed:
- **Astro & Starlight Static Build**: The core documentation pages, navigation hierarchies, and content collections are compiled into optimized static assets.
- **React Islands (`src/components`)**: Interactive UI components and client-side widgets operate as isolated React islands seamlessly embedded within the Starlight layout framework.
- **Cloudflare Worker Edge Runtime (`worker/`)**: The edge layer handles request interception, routing, health endpoints, and runtime fallback logic via Wrangler.

### Key Directories & Purpose

| Directory | Purpose |
| :--- | :--- |
| `src/util/` | Core utility functions, path normalizers, sidebar generators, and structured logging tools. |
| `src/plugins/rehype/` | Custom Rehype plugins for transforming markdown nodes (e.g., external link markers and arrows). |
| `bin/` | Prebuild scripts and data ingestion utilities (e.g., catalog models and skill syncing). |

## Features
- **Structured Edge Worker**: Integrated health endpoints (`/health`) and JSON logging (`src/util/logger.ts`).
- **Strict Testing**: Enforced unit tests and Vitest coverage gates (70%).
- **TypeScript & Zod**: Full type safety across component props and API parameters.

## Local Development
```bash
pnpm install
pnpm run dev

pnpm test
