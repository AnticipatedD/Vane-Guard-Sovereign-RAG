# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com),
and this project adheres to [Semantic Versioning](https://semver.org).

## [Unreleased]

### Security
- Sanitized hardcoded API token placeholders in `code-example-selector.tsx`.

### Added
- Automated unit test workflow step in `.github/workflows/ci.yml`.
- Mock fixture catalog dataset in `bin/__fixtures__/catalog-export.json`.
- Dedicated unit tests for `sidebar.ts` and catalog fetching tools.

### Refactored
- Decoupled data models from `RTKUIComponentGrid.tsx` into `data.ts`.
- Replaced direct console output with structured JSON logger in build scripts.

### File Inventory & Placement Matrix

| Target File Path | Purpose / Source | Replaces / Fixes |
| :--- | :--- | :--- |
| `src/components/ai-gateway/code-example-selector.tsx` | Sanitized Code Examples | Security hygiene / hardcoded secret hits |
| `src/components/realtimekit/RTKUIComponentGrid/data.ts` | Extracted Data Arrays | Component LOC bloat (>450 LOC) |
| `bin/__fixtures__/catalog-export.json` | Offline Test Fixtures | External network dependency in CI |
| `src/util/sidebar.test.ts` | Sidebar Navigation Specs | Low test-to-source ratio (1:22 → 1:10) |
| `CHANGELOG.md` | Keep a Changelog Standard | Docs & Governance completeness |

## - 2026-09-17

### Added
- Initial release of Vane-Guard Sovereign RAG documentation framework.
