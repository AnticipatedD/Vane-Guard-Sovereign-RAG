# Vane-Guard-Sovereign-RAG

A documentation and developer portal built with **Astro**, **Starlight**, **React**, and **TypeScript**, with a Cloudflare Worker for static asset serving and redirects.

> **What this repository is**  
> This is an Astro/Starlight documentation site (similar in structure to a production docs portal). It is **not** a Python/FastAPI/LangChain RAG pipeline. The source of truth is the TypeScript/Astro tree under `src/`, `worker/`, and the scripts in `package.json`.

## Technology stack

- Astro + Starlight
- React + TypeScript
- Vitest
- Zod / Valibot validation in tooling
- pnpm
- Cloudflare Workers (Wrangler)
- GitHub Actions CI

## Requirements

- Node.js 24+
- pnpm 11+

## Install

```bash
pnpm install --frozen-lockfile
