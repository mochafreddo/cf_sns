# cf_sns

NestJS practice repository for following along with a course and experimenting with a simple SNS-style API.

## Requirements

- Node.js 24
- pnpm 10
- PostgreSQL
- `mise` optional, but recommended for matching the local tool versions in [`.mise.toml`](/Users/mochafreddo/study/nestjs/cf_sns/.mise.toml)

## Setup

```bash
mise install
pnpm install
```

Create a `.env` file in the project root.

```env
JWT_SECRET=
HASH_ROUNDS=
PROTOCOL=
HOST=

DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=
```

The app loads configuration through `@nestjs/config`, so missing environment variables can prevent startup.

## Run

```bash
pnpm start
pnpm start:dev
pnpm start:debug
```

The API listens on `PORT` if provided, otherwise `49153`.

## Quality Checks

```bash
pnpm lint
pnpm build
pnpm test
pnpm test:e2e
```

If build artifacts get in the way, clean them first:

```bash
pnpm clean
```

## Notes

- TypeORM is configured in [`src/app.module.ts`](/Users/mochafreddo/study/nestjs/cf_sns/src/app.module.ts) using environment variables.
- Pagination links depend on `PROTOCOL` and `HOST`.
- In some sandboxed macOS environments, Jest may fail because of Watchman permissions rather than test failures.
