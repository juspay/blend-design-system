# 🚀 Release Workflow Guide

This document explains the improved release workflow for the Blend Design System NPM package. The workflow supports **incremental beta versioning** (`X.Y.Z-beta.0`, `X.Y.Z-beta.1`, etc.) to allow multiple testing iterations before promoting to stable.

## 📋 Overview

### Workflow Structure

1. **Create Beta Release** (`create-beta-release.yml`) - Creates beta releases from `staging` branch with incremental versioning
2. **Publish to NPM** (`publish-npm.yml`) - Run from `staging` to publish the beta with the `beta` dist-tag
3. **Promote Beta to Stable** (`promote-to-stable.yml`) - Promotes tested beta to stable release
4. **Publish to NPM** (`publish-npm.yml`) - Run from `main` to publish the stable with the `latest` dist-tag

### Key Features

- ✅ **Incremental Beta Versioning** - Multiple beta iterations (`beta.0`, `beta.1`, `beta.2`, etc.)
- ✅ **Enhanced Changelog Generation** - Categorized, descriptive changelogs with conventional commits
- ✅ **Proper Branch Strategy** - Clear separation between dev, staging, and main branches
- ✅ **Version Management** - Automatic beta/stable version handling
- ✅ **NPM Publishing** - A single `Publish to NPM` workflow; the branch you run it from selects `beta` or `latest`
- ✅ **Tokenless Publishing** - Authenticated with npm Trusted Publishing (OIDC), so there is no NPM token to rotate
- ✅ **Validation & Safety** - Multiple checks to prevent publishing errors
- ✅ **Detailed Release Notes** - Rich GitHub releases with installation instructions

### Publishing Authentication (Trusted Publishing / OIDC)

`publish-npm.yml` publishes with [npm Trusted Publishing](https://docs.npmjs.com/trusted-publishers/). There is **no `NPM_TOKEN`** — GitHub mints a short-lived OIDC token at publish time and npm exchanges it for publish rights. Nothing expires, so there is nothing to rotate.

This is a **one-time setup** on npmjs.com, under `@juspay/blend-design-system` → Settings → Trusted Publisher:

| Field             | Value                 |
| ----------------- | --------------------- |
| Provider          | GitHub Actions        |
| Organization      | `juspay`              |
| Repository        | `blend-design-system` |
| Workflow filename | `publish-npm.yml`     |
| Environment       | `npm`                 |
| Allowed actions   | `npm publish`         |

Constraints that follow from this, and that are easy to break by accident:

- **npm allows only one trusted publisher per package.** This is why beta and stable share one workflow file instead of having one each — a second publishing workflow for this package cannot authenticate.
- **The workflow filename is part of the credential.** Renaming or moving `publish-npm.yml` breaks publishing until the registration is updated.
- **The job must keep `permissions: id-token: write`** and must keep `environment: npm` to match the registration.
- **Trusted publishing requires npm >= 11.5.1 and Node >= 22.14.0**, which is why the workflow pins Node 24 and installs the latest npm CLI before publishing.
- **Self-hosted runners are not supported** — the job must stay on `ubuntu-latest`.
- `npm whoami` does **not** reflect OIDC auth; authentication only happens during `npm publish` itself. Do not add token-verification steps back.
- Publishes from a public repo are automatically signed with **provenance**, visible on the npm package page.

## 🔢 Beta Versioning System

### Version Format

```
X.Y.Z-beta.N

Where:
- X.Y.Z = Base semantic version (e.g., 1.2.3)
- N = Beta iteration number (0, 1, 2, ...)

Examples:
- 1.0.0-beta.0  → First beta for version 1.0.0
- 1.0.0-beta.1  → Second beta (after fixing issues)
- 1.0.0-beta.2  → Third beta (more fixes)
- 1.0.0         → Stable release (promoted from beta.2)
```

### Why Multiple Beta Sub-Versions?

The beta sub-version system (`beta.0`, `beta.1`, `beta.2`, etc.) allows you to:

1. **Iterative Testing**: Test each beta version thoroughly before promoting to stable
2. **Issue Resolution**: Fix issues found in `beta.0` and release `beta.1`, then test again
3. **Quality Assurance**: Ensure each beta iteration is properly tested before moving forward
4. **Confidence**: Only promote to stable when you're confident the version works correctly

**Key Principle**: Each beta sub-version (`beta.N`) should be tested and verified before creating the next one (`beta.N+1`) or promoting to stable.

### Beta Iteration Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                     BETA ITERATION CYCLE                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1.0.0-beta.0  ──→  Test  ──→  Issues Found?                    │
│                                    │                             │
│                          ┌─────────┴─────────┐                  │
│                          │                   │                  │
│                         YES                  NO                 │
│                          │                   │                  │
│                          ▼                   ▼                  │
│                   1.0.0-beta.1       Promote to Stable          │
│                          │                   │                  │
│                          ▼                   ▼                  │
│                   Continue cycle...      1.0.0 (stable)         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## 🔄 Release Process

### Beta Release Process (Iterative)

#### First Beta (`X.Y.Z-beta.0`)

1. **Trigger**: From `staging` branch
2. **Workflow**: `Create Beta Release`
3. **Settings**:
    - Version bump type: `patch`, `minor`, or `major`
    - Increment existing beta: `false` (creates new version)
4. **Result**: Creates `X.Y.Z-beta.0`

#### Subsequent Betas (`X.Y.Z-beta.1`, `beta.2`, etc.)

1. **Trigger**: From `staging` branch (after fixing issues)
2. **Workflow**: `Create Beta Release`
3. **Settings**:
    - Increment existing beta: `true` (increments beta number)
4. **Result**: Creates `X.Y.Z-beta.N+1`

### Stable Release Process

1. **Trigger**: From `staging` branch (after beta testing is complete)
2. **Workflow**: `Promote Beta to Stable`
3. **Action**: Converts `X.Y.Z-beta.N` to `X.Y.Z`, creates GitHub release
4. **Next**: Merge PR to `main`, then trigger `Publish to NPM`

## 📁 Branch Strategy

```
main (stable releases)
   ↑
   └── PR from staging (after promote-to-stable workflow)

staging (beta releases)
   ↑                    ↑
   └── PR from dev      └── Auto PR from staging (create-beta-release)
   (manual, after       (auto-created, then manual PR dev → staging)
    auto PR merged)

dev (development)
   ↑
   └── Feature branches merge here
```

### Branch Purposes

- **`dev`**: Active development, feature branches merge here
- **`staging`**: Beta releases, testing before production
- **`main`**: Stable releases, production-ready code

### Branch Flow Details

**Beta Release Flow:**

1. Workflow runs on `staging` → creates PR: `staging` → `dev` (auto)
2. Merge PR to `dev` → manually create PR: `dev` → `staging`
3. Merge PR to `staging` → publish beta to NPM from `staging`

**Stable Release Flow:**

1. Workflow runs on `staging` → creates PR: `staging` → `main` (auto)
2. Merge PR to `main` → publish stable to NPM from `main`

**Why this flow?**

- Ensures `dev` always has the latest version information
- Keeps `staging` in sync with version changes
- Maintains clear separation: beta on `staging`, stable on `main`

## 🛠 How to Use

### Creating First Beta Release

1. **Ensure your code is in `staging` branch**

    ```bash
    git checkout staging
    git pull origin staging
    ```

2. **Trigger the workflow**
    - Go to Actions → "Create Beta Release"
    - Click "Run workflow"
    - Select version bump type: `patch`, `minor`, or `major`
    - **Set "Increment existing beta version" to `false`** (creates new version)
    - Click "Run workflow"

3. **Merge PR to `dev` branch** (Step 1 of 2)
    - The workflow auto-creates a PR: `staging` → `dev`
    - Review changelog and version changes
    - **Merge the PR to `dev` branch**

4. **Create and merge PR from `dev` → `staging`** (Step 2 of 2)
    - **Manually create a PR** from `dev` → `staging`
    - This syncs the version back to `staging` branch
    - **Merge the PR to `staging` branch**
    - ⚠️ **Important**: This step is required before publishing to NPM

5. **Publish to NPM**
    - Go to Actions → "Publish to NPM"
    - From `staging` branch, type "PUBLISH" to confirm
    - Click "Run workflow"

6. **Install and test**
    ```bash
    npm install @juspay/blend-design-system@beta
    # or specific version
    npm install @juspay/blend-design-system@1.0.0-beta.0
    ```

### Creating Subsequent Beta Releases (After Finding Issues)

1. **Fix issues in `dev` branch**
    - Make fixes in `dev` branch
    - Commit and push changes

2. **Merge fixes to `staging`**
    - Create PR: `dev` → `staging`
    - Merge the PR to `staging`

3. **Trigger the workflow**
    - Go to Actions → "Create Beta Release"
    - Click "Run workflow"
    - **Set "Increment existing beta version" to `true`** (Important!)
    - Click "Run workflow"
    - **Result**: `1.0.0-beta.0` → `1.0.0-beta.1` (or `beta.N` → `beta.N+1`)

4. **Merge PR to `dev` branch** (Step 1 of 2)
    - The workflow auto-creates a PR: `staging` → `dev`
    - **Merge the PR to `dev` branch**

5. **Create and merge PR from `dev` → `staging`** (Step 2 of 2)
    - **Manually create a PR** from `dev` → `staging`
    - **Merge the PR to `staging` branch**

6. **Publish and test again**
    - Run "Publish to NPM" workflow from `staging`
    - Test the new beta version
    - Repeat steps 1-6 until no issues are found

### Promoting Beta to Stable Release

1. **Ensure beta testing is complete on `staging` branch**
    - All beta iterations have been tested (e.g., `beta.0`, `beta.1`, `beta.2`)
    - No issues found in the latest beta version
    - Ready for production release

    ```bash
    git checkout staging
    git pull origin staging
    ```

2. **Trigger the workflow**
    - Go to Actions → "Promote Beta to Stable"
    - Click "Run workflow"
    - Type "PROMOTE" to confirm
    - Click "Run workflow"
    - **Result**: `1.0.0-beta.2` → `1.0.0` (removes beta suffix)

3. **Review and merge PR to `main` branch**
    - The workflow auto-creates a PR: `staging` → `main`
    - Review changelog and version changes
    - **Merge the PR to `main` branch**

4. **Publish to NPM**
    - Go to Actions → "Publish to NPM"
    - From `main` branch, type "PUBLISH" to confirm
    - Click "Run workflow"
    - This publishes with `latest` tag on NPM

## 📊 Workflow Decision Tree

```
Do you have issues to fix in beta?
│
├── YES → Run "Create Beta Release" with increment_beta=true
│         Result: beta.N → beta.N+1
│
└── NO → Ready for stable?
         │
         ├── YES → Run "Promote Beta to Stable"
         │         Result: X.Y.Z-beta.N → X.Y.Z
         │
         └── NO → Continue testing current beta
```

## 📝 Enhanced Changelog

### Features

- **Conventional Commits**: Parses commit messages following conventional commit format
- **Categorization**: Groups changes by type (features, fixes, etc.)
- **Breaking Changes**: Highlights breaking changes prominently
- **Beta Iteration Info**: Shows which beta version was promoted
- **Rich Formatting**: Includes emojis, links to commits, and proper sections

### Commit Message Format

For best changelog generation, use conventional commit format:

```
type(scope): description

# Examples:
feat(button): add new primary button variant
fix(accordion): resolve animation timing issue
docs(readme): update installation instructions
chore(deps): update dependencies
```

### Supported Types

| Type       | Description                 | Priority |
| ---------- | --------------------------- | -------- |
| `feat`     | 🚀 Features                 | 1        |
| `fix`      | 🐛 Bug Fixes                | 2        |
| `perf`     | ⚡ Performance Improvements | 3        |
| `refactor` | ♻️ Code Refactoring         | 4        |
| `style`    | 💄 Styles                   | 5        |
| `docs`     | 📚 Documentation            | 6        |
| `test`     | 🧪 Tests                    | 7        |
| `build`    | 📦 Build System             | 8        |
| `ci`       | 👷 CI/CD                    | 9        |
| `chore`    | 🔧 Chores                   | 10       |

## 🔒 Safety Features

### Version Validation

- Validates version format before processing
- Supports both old format (`X.Y.Z-beta`) and new format (`X.Y.Z-beta.N`)
- Prevents publishing non-beta versions as beta
- Prevents publishing beta versions as stable
- Checks for existing versions on NPM

### Branch Protection

- Beta workflows only run from `staging` branch
- Stable workflows only run from `main` branch
- Promote workflow runs from `staging` and creates PR to `main`
- Requires manual confirmation for publishing

### Error Handling

- Comprehensive error messages
- Rollback capabilities for failed operations
- Detailed logging for debugging

## 🎯 Best Practices

### For Development

1. **Use Conventional Commits**: Ensures good changelog generation
2. **Test Each Beta**: Install and test each beta iteration before proceeding
3. **Review PRs Carefully**: Auto-generated PRs contain important changes
4. **Follow Branch Strategy**: Keep dev, staging, and main in sync

### For Beta Testing

1. **Start with beta.0**: First beta of a new version
2. **Increment on Issues**: Use `increment_beta=true` when fixing issues
3. **Document Issues**: Keep track of what was fixed in each beta
4. **Test Thoroughly**: Each beta should be tested before the next

### For Stable Releases

1. **Only Promote Tested Betas**: Ensure all known issues are fixed
2. **Review Beta History**: Check how many iterations were needed
3. **Update Documentation**: Ensure docs match the released version
4. **Communicate Changes**: Share release notes with team and users

## 🐛 Troubleshooting

### Common Issues

#### "Version already exists on NPM"

- **Cause**: Trying to publish a version that already exists
- **Solution**: Run `Create Beta Release` with `increment_beta=true` to create next beta

#### "Not a beta version" error

- **Cause**: Running beta workflow on stable version
- **Solution**: Run `Create Beta Release` with `increment_beta=false` to create new beta

#### "NPM authentication failed" / `ENEEDAUTH` / unexpected `404`

- **Cause**: The npm Trusted Publisher registration does not match the run. There is no NPM token involved.
- **Solution**: On <https://www.npmjs.com/package//blend-design-system/access>, confirm the trusted publisher is `juspay` / `blend-design-system` / `publish-npm.yml` / environment `npm`. Renaming the workflow file breaks OIDC.

### Debug Steps

1. **Check workflow logs**: Review the GitHub Actions logs for detailed errors
2. **Verify branch**: Ensure you're on the correct branch for the workflow
3. **Check version**: Verify the package.json version is as expected
4. **Test locally**: Run the changelog script locally to test

## 📞 Support

### Getting Help

- **Issues**: Create an issue in the repository
- **Questions**: Ask in team chat or during team meetings
- **Documentation**: Refer to this guide and workflow comments

### Contributing

- **Improvements**: Suggest workflow improvements via issues or PRs
- **Bug Reports**: Report workflow bugs with detailed steps to reproduce
- **Documentation**: Help improve this documentation

---

## 🎉 Quick Reference

### Beta Release Commands

```bash
# First beta (new version)
# GitHub Actions: Create Beta Release (increment_beta=false)

# Subsequent betas (fixing issues)
# GitHub Actions: Create Beta Release (increment_beta=true)

# Publish beta to NPM
# GitHub Actions: Publish to NPM

# Install latest beta
npm install @juspay/blend-design-system@beta

# Install specific beta
npm install @juspay/blend-design-system@1.0.0-beta.2
```

### Stable Release Commands

```bash
# Promote beta to stable
# GitHub Actions: Promote Beta to Stable

# Publish stable to NPM
# GitHub Actions: Publish to NPM

# Install latest stable
npm install @juspay/blend-design-system@latest

# Install specific version
npm install @juspay/blend-design-system@1.0.0
```

### Manual Changelog Generation

```bash
# Generate beta changelog
node scripts/generate-changelog.js "1.2.3-beta.0" beta

# Generate stable changelog
node scripts/generate-changelog.js "1.2.3" stable
```

## 📈 Version History Example

```
1.0.0-beta.0  → Initial beta for v1.0.0
1.0.0-beta.1  → Fixed button styling issues
1.0.0-beta.2  → Fixed accessibility concerns
1.0.0         → Stable release (promoted from beta.2)

1.1.0-beta.0  → Initial beta for v1.1.0 (new features)
1.1.0-beta.1  → Fixed new feature bugs
1.1.0         → Stable release (promoted from beta.1)
```

This improved workflow ensures reliable, consistent releases with detailed changelogs and proper version management through iterative beta testing. 🚀
