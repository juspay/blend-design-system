# Plan: Per-PR preview publishes via pkg.pr.new

Ref: [juspay/blend-design-system#1357](https://github.com/juspay/blend-design-system/issues/1357)

## Context

Today, a reviewer who wants to test an open PR has three painful options: `yalc publish` locally (requires cloning the repo and a working local build — this is exactly what broke on `fix/usescroll` and burned ~40 min of back-and-forth with no verification), wait for a beta release, or share a tarball by hand. There is no one-click way to `npm install` a PR's build.

The fix is to wire up **pkg.pr.new** (an open-source continuous-release service already used by ReScript, Vite, Vue, Svelte, Nuxt). On every PR it publishes an immutable, commit-SHA-pinned build of `@juspay/blend-design-system` under a `https://pkg.pr.new/...` URL and posts a sticky comment on the PR with an install command. Reviewers just `pnpm add https://pkg.pr.new/@juspay/blend-design-system@<sha>` in their consumer app — no clone, no build, no NPM pollution.

**Why pkg.pr.new and not `npm publish` with a `pr-<n>` dist-tag:** pkg.pr.new previews live on their own domain (not `npmjs.org`), auth is handled by its GitHub App (no `NPM_TOKEN` to rotate), the sticky comment is built-in, and the whole thing is a ~30-line workflow vs. a ~400-line publish-and-cleanup pipeline we'd own.

This change is **additive** — existing yalc scripts and beta/stable release workflows are untouched.

---

## TODO checklist — what has to be done

### A. One-time manual setup (repo admin, not code)

- [x] **Install the pkg.pr.new GitHub App** at https://github.com/apps/pkg-pr-new on `juspay/blend-design-system` (repo-level is enough, org-wide is fine too).
- [x] Confirm no secrets / `NPM_TOKEN` / environment config is needed — the App handles auth.
- [ ] **(Recommended)** Enable `Settings → Actions → General → Fork pull request workflows from outside collaborators` → **"Require approval for all outside collaborators"**. This is the maintainer-approval gate that prevents random outside PRs from running any workflow — including the preview publish — until a maintainer clicks **"Approve and run"**. Same posture ReScript uses.

### B. Code changes in the PR

- [x] **Edit** `.github/workflows/ci.yml` — add a `preview` job that runs `pkg-pr-new publish` after `lint-build` succeeds. (Initial design was a standalone `pkg-pr-new.yml`; merged into `ci.yml` per review feedback so we have one workflow and one mental model.)
- [x] **Edit** `CONTRIBUTING.md` — add a "Testing an open PR" section pointing reviewers at the sticky pkg.pr.new bot comment with the copy-paste install line.
- [x] **Edit** `PUBLISHING.md` — add a "Preview releases" section explaining that every PR auto-publishes a preview, linking to https://pkg.pr.new, and clarifying this is **not** a real npm publish.

### C. Files intentionally NOT changed

- `package.json` root scripts — leave `yalc:publish` / `yalc:push` alone (local yalc is still useful for tight edit-loop dev).
- `publish-beta-npm.yml`, `publish-stable-npm.yml`, `release.yml` — untouched; real releases still go through changesets + `NODE_AUTH_TOKEN`.
- `packages/blend/package.json` — already has `repository.url`, `publishConfig.access: public`, correct `files`/`exports`/`main`. Nothing to change.

### D. Verification (after the PR is up)

- [x] Workflow parses — no YAML errors in the Actions tab.
- [x] PR triggers a run; build and publish steps succeed.
- [x] pkg.pr.new bot posts a sticky comment containing `https://pkg.pr.new/@juspay/blend-design-system@<sha>`.
- [ ] Install the preview in a scratch Vite/Next app, import `Button`, confirm it renders (proves `dist/main.js` + `dist/main.d.ts` + `dist/style.css` are all in the tarball).
- [ ] Force-push a commit; sticky comment updates in place (not duplicated).
- [ ] Existing `CI` workflow (`lint-build`, `test`, `a11y`) still runs and is still required. Preview job should NOT be added to branch-protection required checks.
- [ ] Revisit `fix/usescroll`: install its preview URL, verify the scroll bug fix — the exact verification that was impossible before. Link the repro back on issue #1357 when closing.

---

## File 1: `.github/workflows/ci.yml` — new `preview` job

The `preview` job lives alongside the existing `lint-build`, `test`, and `a11y` jobs in `ci.yml`. It runs only on pull requests and pushes to `dev`, and only after `lint-build` passes — so a broken PR never mints a preview URL.

```yaml
preview:
    name: Publish preview to pkg.pr.new
    runs-on: ubuntu-latest
    needs: lint-build
    if: github.event_name == 'pull_request' || (github.event_name == 'push' && github.ref == 'refs/heads/dev')
    permissions:
        contents: read
        pull-requests: write

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

**Design notes:**

- **Lives in `ci.yml`, not a separate workflow.** Original plan was a standalone `pkg-pr-new.yml` for "isolation" — but that isolation was illusory (GitHub runs every workflow on every PR anyway), and four separate `pnpm install` runs per PR is wasteful. Merging matches the pattern used by ReScript's `ci.yml`.
- **`needs: lint-build` gates publish on a green build.** Mirrors ReScript's `needs: build-compiler`. A broken PR doesn't mint a preview URL, closing an obvious attack vector.
- **`if:` guard scopes the job to PRs + `push` to `dev`.** `push` to `main` is intentionally skipped — stable releases go through `publish-stable-npm.yml`. PR coverage is the core requirement from #1357; `push: dev` gives a rolling `@dev` preview URL people can pin to without opening a PR.
- **Single-package scope (`./packages/blend`), not `./packages/*`.** The other non-private packages (`blend-telemetry`, `blend-ui-mcp`) have their own dedicated publish workflows and are out of scope for #1357.
- **`--pnpm` flag** tells pkg.pr.new to pack with pnpm, matching the repo's package manager (`pnpm@10.21.0`).
- **Compact URLs work** because `packages/blend/package.json` already has a valid `repository.url` field. No package.json change needed.
- **`pull-requests: write` is scoped to this job only** via the job-level `permissions:` block, so the other `ci.yml` jobs keep their workflow-level `contents: read` default. No `id-token`, no `NPM_TOKEN`.
- **Build reuses the existing vite build** via `pnpm --filter`. Lint + typecheck + vite build — same as production publish.

---

## File 2: `CONTRIBUTING.md` (MODIFY — new section)

Inserted under a `## Testing an Open PR` heading:

> Every pull request to `main` or `dev` automatically publishes an ephemeral preview build of `@juspay/blend-design-system` via [pkg.pr.new](https://pkg.pr.new). You do **not** need to clone the repo, run a local build, or use `yalc` to test someone else's PR.
>
> Look for the sticky comment from the `pkg-pr-new` bot near the top of the PR. It contains a one-line install command you can paste into any consumer app:
>
> ```bash
> pnpm add https://pkg.pr.new/@juspay/blend-design-system@<commit-sha>
> ```
>
> The URL is immutable and tied to the exact commit. Force-pushing the PR branch updates the sticky comment in place with a new URL.

---

## File 3: `PUBLISHING.md` (MODIFY — new section)

Inserted under a `## Preview releases (pkg.pr.new)` heading:

> Every pull request to `main` or `dev` automatically publishes an ephemeral preview of `@juspay/blend-design-system` to [pkg.pr.new](https://pkg.pr.new). Reviewers and consumer teams can install the preview directly from a URL in the sticky PR comment:
>
> ```bash
> pnpm add https://pkg.pr.new/@juspay/blend-design-system@<commit-sha>
> ```
>
> These previews are **not** real npm releases. They are tied to the PR's HEAD commit, are ephemeral by design, and **must not be used in production**. Real releases continue to go through the changesets → beta / stable flow described below.
>
> The preview is published by the `preview` job in `.github/workflows/ci.yml`, gated on a successful build (`needs: lint-build`), and uses the [pkg.pr.new GitHub App](https://github.com/apps/pkg-pr-new) — no `NPM_TOKEN` or secrets required.

---

## Security posture (for secops review)

Defense-in-depth layers, in order of strength:

1. **GitHub-native outside-contributor approval gate.** When `Settings → Actions → General → Require approval for all outside collaborators` is enabled, no workflow (including the preview publish) runs on an outside PR until a maintainer clicks **"Approve and run"** on the Actions tab. This is the "maintainer tick before anything happens" gate — GitHub-native, no YAML tricks.
2. **`pull_request` event sandboxing.** Fork PRs get a read-only `GITHUB_TOKEN` and no access to repo secrets. pkg.pr.new authenticates via its own GitHub App, so there's no repo secret for a hostile PR to steal.
3. **Build-gated publish.** The `preview` job has `needs: lint-build`; if lint or build fails, no preview is minted.
4. **Commit-SHA-pinned, un-indexed, content-addressed URLs.** Preview URLs are immutable (no floating version, no auto-upgrade), only surfaced in the sticky PR comment on our repo (not searchable, not on npmjs.org, not in any registry index), and documented as "not for production use". Backend storage is Cloudflare R2; pkg.pr.new does not publicly document a retention TTL, but tarballs appear to be long-lived. If we ever need a specific tarball removed, pkg.pr.new accepts takedown requests via their GitHub issue tracker.

**Prior art:** Same architecture used by ReScript, Vite, Vue, Nuxt, Svelte, Vitest, TanStack. ReScript's `ci.yml` is structurally identical to our `preview` job — no per-commit approval gate beyond the four layers above.

---

## Out of scope (future follow-ups)

Deferred deliberately to keep the PR small:

- Publishing `blend-telemetry` and `blend-ui-mcp` previews via the same job.
- Adding a `--template './examples/*'` StackBlitz preview (no `examples/` directory exists yet).
- Removing yalc scripts from root `package.json`.
- Node version alignment via `.nvmrc` — the repo has drift (`ci.yml` uses Node 20, publish workflows use Node 22). Deserves its own PR that touches every workflow, not just this one.
- Shared setup / cache optimization — extracting the `pnpm install + setup-node` steps into a composite action so `lint-build`, `test`, `a11y`, and `preview` don't each run their own install. Discussed during review but scoped out as a cross-cutting refactor.
