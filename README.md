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

The dev server listens on port 1111 (see Astro config). # Build 
```bash
pnpm run build
```
# Checks and tests 
```bash
pnpm run check
pnpm run lint
pnpm run format:core:check
pnpm test -- --run
pnpm exec vitest run --coverage --project Node --project Astro
```
# Environment variablesCopy the example file and fill in values as needed:
```bash
cp .env.example .env
```
Never commit a real `.env file`. Public client-side search settings use PUBLIC_* variables (see .env.example). 
Docker (optional) 
```bash
docker compose up --build
```
## Offline Testing Guide

This repository enforces offline-first testing guarantees. You can run the entire test suite on a fresh clone without configuring external Cloudflare network credentials or `.env` files:

```bash
pnpm install --frozen-lockfile
pnpm test -- --run
```
# This builds the site and serves the production build. For local editing with hot reload, prefer pnpm dev on the host.

# Repository layout  text.
├── .github/workflows/ # CI
├── bin/ # Build and repo utilities
├── src/ # Components, content, utils
├── worker/ # Cloudflare Worker entry
├── astro.config.ts
├── package.json
├── pnpm-lock.yaml
└── vitest.config.ts

# Security 
Do not hardcode API keys in source.
Use .env / CI secrets / Cloudflare secrets for credentials.
If a key was ever committed, rotate it immediately. License See [LICENSE](license.md) in this repository.
