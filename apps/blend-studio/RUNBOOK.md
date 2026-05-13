# Blend Token Studio — Runbook

Operational guide for the Vite + TanStack Router dashboard, the studio REST API, PostgreSQL, Firebase Auth, and Firestore-backed token branches. For product and token architecture, see `packages/blend/Design-docs/TokenStudio/BlendTokenStudioDoc.md`.

## Architecture (current repo)

| Layer                            | Responsibility                                                                                                                                  |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Vite app** (`pnpm dev`)        | SPA on port **3000**; Tailwind for shell/layout; proxies `/api/*` to the API. Blend components still need their runtime peer (see below).       |
| **Express API** (`pnpm dev:api`) | **Express** on port **3001** — `src/server/` mounts `/api/health`, `/api/studio`, `/api/users`, `/api/npm`, `/api/components`, `/api/activity`. |
| **PostgreSQL**                   | Users, roles, monitor metrics (npm, components, deployments) per `database/schema.sql`.                                                         |
| **Firestore**                    | Branch documents, versions, snapshots (see `branch-service.ts` and token-engine studio types).                                                  |
| **Firebase Auth**                | Browser sign-in; Admin SDK verifies `Bearer` tokens on the API.                                                                                 |
| **CLI** (`packages/cli`)         | Consumer-app scaffolding and token helpers (`pnpm exec blend-cli` from a linked workspace).                                                     |

## Prerequisites

- Node.js 20+ (LTS recommended)
- pnpm 10.x (see root `package.json` `packageManager`)
- PostgreSQL 14+ for dashboard user/role and monitor tables
- Firebase project with **Authentication** (e.g. Google) and **Firestore** enabled
- Service account JSON fields mapped to env vars (see below)

## One-time setup

From the monorepo root:

```bash
pnpm install
```

Copy env template for the studio app:

```bash
cd apps/blend-studio
cp .env.example .env
```

Edit `.env` (never commit real secrets). Apply DB schema:

```bash
# DATABASE_URL must point at your Postgres instance
pnpm run db:init
```

### User record and roles

The studio API resolves permissions from PostgreSQL: `roleService` reads `users.role` and maps it to `studio:read` / `studio:write`.

1. Sign in once through the UI (or create the user in Firebase Auth).
2. Copy the user’s **Firebase UID** from the Firebase console.
3. Insert or update a row in `users` with that `firebase_uid`, email, and role `viewer` | `editor` | `admin`.

Without this row, `authenticateBearer` returns null and studio endpoints respond **401**.

Roles are enforced in code (`role-service.ts`). The `roles` table in SQL is available for future expansion; the runtime permission map is currently defined in `RoleService`.

## Environment variables

| Variable                                                               | Used by                                   | Purpose                                                                                                                                     |
| ---------------------------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `VITE_FIREBASE_*`                                                      | Browser                                   | Client Firebase config (`src/lib/firebase.ts`).                                                                                             |
| `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` | Admin SDK                                 | Verify ID tokens and access Firestore (`firebase-admin.ts`). `VITE_FIREBASE_PROJECT_ID` is also read as a fallback for project id / bucket. |
| `FIREBASE_STORAGE_BUCKET` or `VITE_FIREBASE_STORAGE_BUCKET`            | Admin                                     | Optional explicit bucket.                                                                                                                   |
| `DATABASE_URL`                                                         | `database.ts`, `role-service`             | PostgreSQL connection string.                                                                                                               |
| `STUDIO_API_PORT`                                                      | `studio-api.ts`                           | API listen port (default **3001**).                                                                                                         |
| `NPM_API_BASE_URL`, `FIGMA_API_TOKEN`                                  | Legacy monitor API (when ported off Next) | Optional integrations.                                                                                                                      |

Client vars must use the `VITE_` prefix to be exposed to the browser.

## Local development

**Option A — two terminals (predictable logs):**

```bash
cd apps/blend-studio
pnpm dev:api    # Studio + future shared API on :3001
pnpm dev        # Vite on :3000
```

**Option B — single command:**

```bash
cd apps/blend-studio
pnpm dev:full
```

Open `http://localhost:3000`. Sign in, then open **Token Studio** routes under `/studio`.

### Verify imports resolve

The design system is linked from source (`packages/blend/lib/main.ts`) so you do not need `pnpm run build:blend` for local studio UI. For Storybook or publishing npm, still build the library from root: `pnpm run build:blend`.

## Testing checklist

1. **Build:** `cd apps/blend-studio && pnpm run build`
2. **Auth:** With valid `VITE_FIREBASE_*`, sign in on `/login`; `auth` in `src/lib/firebase.ts` must be non-mock.
3. **Studio API:** With Postgres user row and Firestore rules allowing your service account, `GET /api/studio/branches` (with `Authorization: Bearer <idToken>`) returns `{ success, data }`.
4. **Branches UI:** `/studio/` lists branches when authenticated; errors surface if the API is down or the user row is missing.
5. **Editor / preview:** `/studio/editor/$branchId` and `/studio/test` render Blend `ThemeProvider` and token previews (validates `@juspay/blend-design-system` + `styled-components`).

## Data storage (what goes where)

- **PostgreSQL** stores durable account and ops data: users (including `role`), components, npm snapshots, deployments, activity logs — normalized tables with indexes where appropriate (`schema.sql`). This matches the “monitor” side of the app.
- **Firestore** stores **branch** working copies and **published versions** as JSON-friendly documents ideal for frequent edits and hierarchical IDs like `hdfc/retail`. Large generated artifacts are better moved to object storage in a full production rollout (see design doc §6).

Keeping brand JSON in Firestore (or eventually S3) and **roles in Postgres** avoids duplicating identity data and keeps RBAC auditable in SQL.

## Deploying

**Frontend:** `pnpm run build` produces `apps/blend-studio/dist`. Serve as static files (S3+CloudFront, Netlify, Vercel static, etc.). Configure the host to forward `/api` to your API origin, or set `VITE_*` public API base URL if you split origins (requires small client change).

**Studio API:** Run `studio-api.ts` under a process manager (systemd, Kubernetes, Fly.io, Railway) with server-side env vars. Reserve port **3001** internally or set `STUDIO_API_PORT`. Terminate TLS at the load balancer.

**Firestore rules:** Lock down `branches` collections to authenticated users or service accounts as appropriate; never expose Admin credentials to the client.

## CLI (consumer repositories)

From the monorepo, the CLI package lives in `packages/cli`. Typical workflow for external apps:

```bash
pnpm exec blend-cli init
```

After publish, consumers use `npx` against the published package name. Details: `docs/TOKEN_STUDIO_IMPLEMENTATION.md` and the design doc §8.

## Routing conventions

- File-based routes live in `src/routes/` (TanStack Router).
- Generated tree: `src/routeTree.gen.ts` (do not hand-edit).
- Authenticated data fetching uses hooks (`use-studio.ts`) and `/api/studio` — avoid embedding secrets in the client.

## UI: Tailwind vs styled-components

- **Tailwind** is used for Blend Studio chrome (layout, spacing, marketing-style pages).
- **styled-components** is used internally by **@juspay/blend-design-system**. In this repo it’s shipped as a **dependency of the library**, so consumer apps (like `apps/blend-studio`) don’t need to install it directly.

Legacy `src/backend/api/**` files (Next.js shape) are **not** used at runtime; behavior lives under `src/server/routes/`.

## Known follow-ups (engineering backlog)

- Harden Firestore security rules and add integration tests for `src/server/routes/studio.ts`.
- Optional: sync `users` table automatically on first Firebase login via an HTTPS Cloud Function or the studio API.
