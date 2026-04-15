# Plan: Per-PR preview publishes via pkg.pr.new

Ref: [juspay/blend-design-system#1357](https://github.com/juspay/blend-design-system/issues/1357)

## Context

Today, a reviewer who wants to test an open PR has three painful options: `yalc publish` locally (requires cloning the repo and a working local build — this is exactly what broke on `fix/usescroll` and burned ~40 min of back-and-forth with no verification), wait for a beta release, or share a tarball by hand. There is no one-click way to `npm install` a PR's build.

The fix is to wire up **pkg.pr.new** (an open-source continuous-release service already used by Vite, Vue, Svelte, Nuxt). On every PR it publishes an ephemeral, immutable build of `@juspay/blend-design-system` under a `https://pkg.pr.new/...` URL and posts a sticky comment on the PR with an install command. Reviewers just `pnpm add https://pkg.pr.new/@juspay/blend-design-system@<sha>` in their consumer app — no clone, no build, no NPM pollution.

**Why pkg.pr.new and not `npm publish` with a `pr-<n>` dist-tag:** pkg.pr.new previews are inherently ephemeral (no `npm unpublish` 72h window), auth is handled by its GitHub App (no `NPM_TOKEN` to rotate), the sticky comment is built-in, and the whole thing is a ~20-line workflow vs. a ~400-line publish-and-cleanup pipeline we'd own.

This change is **additive** — existing yalc scripts and beta/stable release workflows are untouched.

---

## TODO checklist — what has to be done

### A. One-time manual setup (repo admin, not code)

- [ ] **Install the pkg.pr.new GitHub App** at https://github.com/apps/pkg-pr-new on `juspay/blend-design-system` (repo-level is enough, org-wide is fine too).
- [ ] Confirm no secrets / `NPM_TOKEN` / environment config is needed — the App handles auth.

### B. Code changes in the PR

- [ ] **Create** `.github/workflows/pkg-pr-new.yml` (new file, content below).
- [ ] **Edit** `CONTRIBUTING.md` — add a "Testing an open PR" section pointing reviewers at the sticky pkg.pr.new bot comment with the copy-paste install line.
- [ ] **Edit** `PUBLISHING.md` — add a short "Preview releases" paragraph explaining that every PR auto-publishes a preview, linking to https://pkg.pr.new, and clarifying this is **not** a real npm publish.

### C. Files intentionally NOT changed

- `package.json` root scripts — leave `yalc:publish` / `yalc:push` alone (local yalc is still useful for tight edit-loop dev).
- `.github/workflows/ci.yml` — untouched; preview publishing runs in its own workflow so pkg.pr.new outages can't block required checks.
- `publish-beta-npm.yml`, `publish-stable-npm.yml`, `release.yml` — untouched; real releases still go through changesets + `NODE_AUTH_TOKEN`.
- `packages/blend/package.json` — already has `repository.url`, `publishConfig.access: public`, correct `files`/`exports`/`main`. Nothing to change.

### D. Verification (after the PR is up)

- [ ] Workflow parses — no YAML errors in the Actions tab.
- [ ] The workflow's own PR triggers a run; build and publish steps succeed.
- [ ] pkg.pr.new bot posts a sticky comment containing `https://pkg.pr.new/@juspay/blend-design-system@<sha>`.
- [ ] Install the preview in a scratch Vite/Next app, import `Button`, confirm it renders (proves `dist/main.js` + `dist/main.d.ts` + `dist/style.css` are all in the tarball).
- [ ] Force-push a commit; sticky comment updates in place (not duplicated).
- [ ] Existing `CI` workflow (`lint-build`, `test`, `a11y`) still runs and is still required.
- [ ] Revisit `fix/usescroll`: install its preview URL, verify the scroll bug fix — the exact verification that was impossible before. Link the repro back on issue #1357 when closing.

---

## File 1: `.github/workflows/pkg-pr-new.yml` (NEW)

Standalone workflow, parallel to `ci.yml`. Kept separate (rather than bolted onto `ci.yml`) so a transient pkg.pr.new outage never blocks CI required checks, and so the build here is scoped to only the publishable package instead of the full Turbo graph.

```yaml
name: Preview Release (pkg.pr.new)

on:
    pull_request:
        branches: [main, dev]
    push:
        branches: [dev]

concurrency:
    group: pkg-pr-new-${{ github.ref }}
    cancel-in-progress: true

permissions:
    contents: read
    pull-requests: write

jobs:
    preview:
        name: Publish preview to pkg.pr.new
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v4

            - name: Setup pnpm
              uses: pnpm/action-setup@v4

            - name: Setup Node.js
              uses: actions/setup-node@v4
              with:
                  node-version: 20
                  cache: pnpm

            - name: Install dependencies
              run: pnpm install --frozen-lockfile

            - name: Build @juspay/blend-design-system
              run: pnpm --filter @juspay/blend-design-system build

            - name: Publish preview
              run: pnpm dlx pkg-pr-new publish --pnpm './packages/blend'
```

**Design notes tied to findings from exploration:**

- **Trigger is `pull_request` + `push: dev`.** PR coverage is the core requirement from #1357. `push: dev` gives a rolling `@dev` preview URL people can pin to without opening a PR. `main` push is intentionally skipped — stable releases go through `publish-stable-npm.yml`.
- **Single-package scope (`./packages/blend`), not `./packages/*`.** The other non-private packages (`blend-telemetry`, `blend-ui-mcp`) have their own dedicated publish workflows and are out of scope for #1357. Widening the glob later is a one-line change.
- **`--pnpm` flag** tells pkg.pr.new to pack with pnpm, matching the repo's package manager (`pnpm@10.21.0`).
- **Compact URLs work** because `packages/blend/package.json` already has a valid `repository.url` field (`packages/blend/package.json:117-120`). No package.json change needed.
- **`pull-requests: write`** is required for the sticky-comment posting. `contents: read` is the minimum for checkout. No `id-token`, no `NPM_TOKEN`.
- **Concurrency group** cancels superseded runs on force-push, matching the style in `ci.yml:9-11`.
- **Build reuses the existing vite build** (`packages/blend/package.json:24`) via `pnpm --filter`. Lint + typecheck + vite build — same as production publish.

---

## File 2: `CONTRIBUTING.md` (MODIFY — new section)

Suggested copy to insert near the top, under a heading like `## Testing an open PR`:

> Every PR automatically publishes a preview build of `@juspay/blend-design-system` via [pkg.pr.new](https://pkg.pr.new). Look for the sticky comment from the `pkg-pr-new` bot at the top of the PR — it contains a one-line install command you can paste into any consumer app:
>
> ```bash
> pnpm add https://pkg.pr.new/@juspay/blend-design-system@<commit-sha>
> ```
>
> No clone, no local build, no `yalc`. The preview URL is immutable and tied to the exact commit; force-pushing updates the sticky comment with a new URL.

---

## File 3: `PUBLISHING.md` (MODIFY — new section)

Suggested copy under a new `## Preview releases` heading, leaving the existing yalc / beta / stable sections untouched:

> Every pull request to `main` or `dev` automatically publishes an ephemeral preview of `@juspay/blend-design-system` to [pkg.pr.new](https://pkg.pr.new). These previews are **not** real npm releases, are tied to the PR's HEAD commit, and must not be used in production. Real releases continue to go through the changesets → `publish-beta-npm.yml` / `publish-stable-npm.yml` flow.

---

## Out of scope (future follow-ups)

Deferred deliberately to keep the PR small:

- Publishing `blend-telemetry` and `blend-ui-mcp` previews via the same workflow.
- Adding a `--template './examples/*'` StackBlitz preview (no `examples/` directory exists yet).
- Removing yalc scripts from root `package.json`.
- Gating preview publishes on approval via `pull_request_review` — fine for an open-source repo where PRs are already public.
