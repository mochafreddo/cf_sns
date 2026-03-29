# AGENTS

## Purpose

This is a small NestJS practice repository used for following a course and trying changes quickly.
Optimize for simple, readable changes over heavy abstraction or broad refactors.

## Working Style

- Preserve the existing NestJS module layout unless the task clearly requires structural changes.

## Commands

- Install: `mise install && pnpm install`
- Dev server: `pnpm start:dev`
- Build: `pnpm build`
- Lint: `pnpm lint`
- Unit tests: `pnpm test`
- E2E tests: `pnpm test:e2e`
- Clean build artifacts: `pnpm clean`

## Gotchas

- Jest may fail in sandboxed macOS environments because of Watchman permissions. Treat that as an environment issue first, not an application regression.
- `pnpm clean` removes `dist` and `tsconfig.build.tsbuildinfo`. Use it before assuming a build issue is caused by source changes.

## Editing Notes

- Keep README examples free of real secrets or local-only sensitive values.
- Favor plain `pnpm` scripts in `package.json`; use `mise` to manage the local toolchain, not to wrap every script.
