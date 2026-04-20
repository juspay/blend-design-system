# 🔄 Complete Workflow Flowchart

This document provides a clear visual flowchart and explanation of all GitHub Actions workflows for the Blend Design System release process.

## 🎯 Branch Strategy Overview

**Branch Purposes:**

- **`dev`**: Development branch - All feature PRs merge here first. This is where active development happens.
- **`staging`**: Beta releases branch - Beta versions are **created and published from here**. This is the testing ground before production.
- **`main`**: Stable releases branch - Only thoroughly tested, production-ready versions reach here.

**Why staging → dev → staging flow for beta releases?**

1. **Beta is created on `staging`**: The "Create Beta Release" workflow runs on `staging` branch and updates the version (e.g., `1.0.0-beta.0`)

2. **Sync version to `dev`**: Auto-creates PR `staging` → `dev` to sync version info to dev branch
    - **Reason**: `dev` needs to know the latest version for development context
    - **Merge this PR to `dev`**

3. **Sync version back to `staging`**: Manually create PR `dev` → `staging` to sync version back
    - **Reason**: Ensures `staging` has the updated version after dev merge
    - **Required before publishing to NPM**

4. **Publish from `staging`**: Beta versions are always published from `staging` branch

**Key Principle**: Beta versions are **created and published from `staging`**. The `dev` → `staging` → `dev` → `staging` flow is just for **version synchronization**, not for code flow.

## Overall Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                     BLEND DESIGN SYSTEM                          │
│                         RELEASE FLOW                             │
└─────────────────────────────────────────────────────────────────┘

    ┌─────────┐
    │   dev   │  ← Development & Features
    │         │  (All feature PRs merge here first)
    └────┬────┘
         │
         │  PR: dev → staging (code changes)
         ▼
    ┌─────────┐
    │ staging │  ← Beta Releases & Testing
    │         │  (Beta versions created and published from here)
    │ ┌─────┐ │
    │ │Beta │ │
    │ │Cycle│ │
    │ └──┬──┘ │
    └────┼────┘
         │
         │  PR: staging → main (stable promotion)
         ▼
    ┌─────────┐
    │  main   │  ← Stable Releases
    │         │  (Production-ready versions)
    └─────────┘
```

**Key Points:**

- **`dev`**: Development branch - all feature PRs merge here first
- **`staging`**: Beta releases branch - beta versions are created and published from here
- **`main`**: Stable releases branch - only thoroughly tested versions reach here

## 🗺️ Detailed Workflow Flow

### Beta Release Flow (staging branch)

```
┌─────────────────────────────────────────────────────────────────┐
│                    BETA RELEASE FLOW                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  staging branch                                                 │
│       │                                                         │
│       │  1. CREATE BETA RELEASE                                 │
│       │     Run: "Create Beta Release" workflow                 │
│       │     Input:                                              │
│       │       - version_type: patch/minor/major                 │
│       │       - increment_beta: false (first beta)              │
│       │     Result: X.Y.Z-beta.0 (version updated on staging)  │
│       │     Auto-creates PR: staging → dev                      │
│       ▼                                                         │
│       │                                                         │
│  dev branch                                                     │
│       │                                                         │
│       │  2. MERGE PR TO DEV (STEP 1 of 2)                      │
│       │     Auto-created PR: staging → dev                      │
│       │     ⚠️ IMPORTANT: Merge this PR to dev first            │
│       │     Purpose: Sync version info to dev branch             │
│       │     (dev is development branch - needs latest version)  │
│       ▼                                                         │
│       │                                                         │
│       │  3. MANUALLY CREATE PR: dev → staging (STEP 2 of 2)    │
│       │     ⚠️ IMPORTANT: Manually create this PR               │
│       │     Purpose: Sync version back to staging                │
│       │     This ensures staging has the updated version         │
│       │     REQUIRED before publishing to NPM                    │
│       ▼                                                         │
│       │                                                         │
│  staging branch                                                 │
│       │                                                         │
│       │  4. MERGE PR: dev → staging                             │
│       │     Now staging has the updated version                 │
│       ▼                                                         │
│       │                                                         │
│       │  5. PUBLISH BETA TO NPM                                 │
│       │     Run: "Publish Beta to NPM" workflow                 │
│       │     Input: "PUBLISH"                                    │
│       │     Must run from staging branch                        │
│       ▼                                                         │
│       │                                                         │
│       │  6. TEST BETA                                           │
│       │     npm install @juspay/blend-design-system@beta        │
│       ▼                                                         │
│       │                                                         │
│       ╔═══════════════╗                                         │
│       │  ISSUES FOUND? │                                        │
│       ╚═══╦───────╦═══╝                                         │
│           │       │                                             │
│      YES  │       │ NO                                         │
│           │       ▼                                             │
│           │    GO TO STABLE RELEASE                             │
│           │                                                     │
│           ▼                                                     │
│       ┌────────────────────────────────────────────────────────┐│
│       │  6B. FIX ISSUES                                        ││
│       │                                                        ││
│       │  1. Fix issues in dev branch                           ││
│       │  2. Create PR: dev → staging and merge                 ││
│       │  3. Run "Create Beta Release" again from staging       ││
│       │     Input: increment_beta: true (important!)           ││
│       │     Result: X.Y.Z-beta.1 (was beta.0)                  ││
│       │  4. Merge auto PR: staging → dev                       ││
│       │  5. Manually create PR: dev → staging and merge        ││
│       │  6. Repeat from step 5 (publish)                       ││
│       │                                                        ││
│       └────────────────────────────────────────────────────────┘│
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Stable Release Flow (staging → main)

```
┌─────────────────────────────────────────────────────────────────┐
│                   STABLE RELEASE FLOW                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  staging branch                                                  │
│       │                                                          │
│       │  1. PROMOTE BETA TO STABLE                              │
│       │     Run: "Promote Beta to Stable" workflow               │
│       │     Input: "PROMOTE"                                    │
│       │     Result: X.Y.Z-beta.N → X.Y.Z                         │
│       │     Creates PR: staging → main                           │
│       ▼                                                          │
│       │                                                          │
│  main branch                                                    │
│       │                                                          │
│       │  2. MERGE PR TO MAIN                                    │
│       │     Review and merge auto-created PR                    │
│       ▼                                                          │
│       │                                                          │
│       │  3. PUBLISH STABLE TO NPM                               │
│       │     Run: "Publish Stable to NPM" workflow                │
│       │     Input: "PUBLISH"                                    │
│       │     Result: @juspay/blend-design-system@latest          │
│       ▼                                                          │
│       │                                                          │
│       ▼                                                          │
│    DONE                                                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Complete End-to-End Flow

```
┌─────────────────────────────────────────────────────────────────┐
│              COMPLETE RELEASE FLOW (BETA → STABLE)               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────┐                                                      │
│  │   dev   │                                                      │
│  └────┬────┘                                                      │
│       │                                                          │
│       │  1. Development complete                                 │
│       │  2. PR: dev → staging                                   │
│       ▼                                                          │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  STAGING - BETA RELEASE CYCLE                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│       │                                                          │
│       ├──► Create Beta Release (increment_beta=false)          │
│       │     Workflow runs on: staging                           │
│       │     Result: 1.0.0-beta.0 (version on staging)          │
│       │     Auto-creates PR: staging → dev                      │
│       │                                                          │
│       ├──► STEP 1: Merge auto PR to dev                        │
│       │     (staging → dev) - syncs version to dev              │
│       │                                                          │
│       ├──► STEP 2: Manually create PR: dev → staging             │
│       │     Merge PR to staging - syncs version back             │
│       │     Now staging has updated version ready for publish    │
│       │                                                          │
│       ├──► Publish Beta to NPM                                  │
│       │     npm install @juspay/blend-design-system@beta      │
│       │                                                          │
│       ├──► Test Beta                                            │
│       │     ├─── Issues? ──► YES ──► Fix in dev                 │
│       │     │         └────┘                                   │
│       │     │                └────► Fix in dev                │
│       │     │                       └────► PR: dev → staging   │
│       │     │                              └────► Merge PR      │
│       │     │                              └────► Create Beta   │
│       │     │                              Release from staging │
│       │     │                              (increment_beta=    │
│       │     │                              TRUE)                │
│       │     │                              Result: 1.0.0-beta.1│
│       │     │                              └────► Merge auto   │
│       │     │                              PR: staging → dev   │
│       │     │                              └────► Manually PR: │
│       │     │                              dev → staging       │
│       │     │                                                   │
│       │     └─── NO ──► Ready for stable                        │
│       │                                                          │
│       ▼                                                          │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  STAGING → MAIN - STABLE RELEASE                        │    │
│  └─────────────────────────────────────────────────────────┘    │
│       │                                                          │
│       ├──► Promote Beta to Stable                              │
│       │     Result: 1.0.0-beta.2 → 1.0.0                       │
│       │     PR: staging → main                                 │
│       │                                                          │
│  ┌─────────┐                                                      │
│  │  main   │ ◄─────── Merge PR                                  │
│  └────┬────┘                                                      │
│       │                                                          │
│       └──► Publish Stable to NPM                                 │
│            Result: @juspay/blend-design-system@latest           │
│                                                                 │
│       ▼                                                          │
│    DONE                                                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 📋 Beta Iteration Example

```
┌─────────────────────────────────────────────────────────────────┐
│                    BETA ITERATION EXAMPLE                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Initial State: Version 1.0.0 (stable)                           │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  BETA ITERATION 1                                       │    │
│  │  ───────────────────                                   │    │
│  │  • Create Beta Release (increment_beta=false)          │    │
│  │  • Result: 1.1.0-beta.0                                │    │
│  │  • Publish to NPM                                      │    │
│  │  • Test: Found button bug                                │    │
│  └─────────────────────────────────────────────────────────┘    │
│                              │                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  BETA ITERATION 2                                       │    │
│  │  ───────────────────                                   │    │
│  │  • Fix bug in dev                                      │    │
│  │  • Create Beta Release (increment_beta=true)           │    │
│  │  • Result: 1.1.0-beta.1                                │    │
│  │  • Publish to NPM                                      │    │
│  │  • Test: Found accessibility issue                     │    │
│  └─────────────────────────────────────────────────────────┘    │
│                              │                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  BETA ITERATION 3                                       │    │
│  │  ───────────────────                                   │    │
│  │  • Fix issue in dev                                    │    │
│  │  • Create Beta Release (increment_beta=true)           │    │
│  │  • Result: 1.1.0-beta.2                                │    │
│  │  • Publish to NPM                                      │    │
│  │  • Test: All good! ✓                                    │    │
│  └─────────────────────────────────────────────────────────┘    │
│                              │                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  STABLE RELEASE                                        │    │
│  │  ──────────────                                       │    │
│  │  • Promote Beta to Stable                             │    │
│  │  • Result: 1.1.0                                       │    │
│  │  • Publish to NPM (latest tag)                        │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 📋 Workflow File Reference

### Active Workflows

| Workflow Name              | File                      | Branch    | Purpose                                           |
| -------------------------- | ------------------------- | --------- | ------------------------------------------------- |
| **CI**                     | `ci.yml`                  | main, dev | Continuous integration: lint, build, test         |
| **Create Beta Release**    | `create-beta-release.yml` | staging   | Creates beta releases with incremental versioning |
| **Publish Beta to NPM**    | `publish-beta-npm.yml`    | staging   | Publishes beta versions to NPM                    |
| **Promote Beta to Stable** | `promote-to-stable.yml`   | staging   | Promotes tested beta to stable                    |
| **Publish Stable to NPM**  | `publish-stable-npm.yml`  | main      | Publishes stable versions to NPM                  |

### Deprecated Workflows

| Workflow Name             | File                        | Status                      | Replacement                                     |
| ------------------------- | --------------------------- | --------------------------- | ----------------------------------------------- |
| **Legacy Release**        | `release.yml`               | Deprecated (emergency only) | create-beta-release.yml + promote-to-stable.yml |
| **Create Stable Release** | `create-stable-release.yml` | Deprecated                  | promote-to-stable.yml                           |

## 🔄 Decision Tree

```
                        START
                          │
                ┌─────────┴─────────┐
                │  Ready to Release?│
                └─────────┬─────────┘
                          │
            ┌─────────────┴─────────────┐
            │ First Beta OR           │
            │ Increment Existing?     │
            └───────┬─────────┬───────┘
                    │         │
               First │     Increment
               Beta  │     Existing
                    │         │
                    ▼         ▼
        ┌───────────────┐ ┌──────────────┐
        │Create Beta    │ │Create Beta   │
        │increment_beta │ │increment_beta│
        │   = false     │ │   = true    │
        └───────┬───────┘ └──────┬───────┘
                │                │
                └────────┬───────┘
                         │
                Merge PR → dev → staging
                         │
                Publish Beta to NPM
                         │
                     Test Beta
                         │
              ┌──────────┴──────────┐
              │    Issues Found?    │
              └──────┬────────┬─────┘
                     │        │
                   YES        NO
                     │        │
           ┌─────────┴┐   ┌────┴────────┐
           │ Fix in  │   │ Promote to  │
           │  dev    │   │  Stable     │
           └────┬────┘   └────┬────────┘
                │             │
                │    Merge PR → main
                │             │
                │    Publish Stable
                │    to NPM
                │
                └──────► DONE
```

## 🎯 Quick Reference Checklist

### Beta Release Checklist

**Branch Strategy:**

- `dev` = Development branch (all feature PRs merge here first)
- `staging` = Beta releases branch (beta versions created and published from here)
- `main` = Stable releases branch

**First Beta Release:**

- [ ] Features merged to `dev`
- [ ] PR: dev → staging merged (initial code sync)
- [ ] Run "Create Beta Release" workflow from `staging` branch
    - [ ] Input: increment_beta=false (for first beta)
    - [ ] Result: Creates X.Y.Z-beta.0 on staging
    - [ ] Auto-creates PR: staging → dev
- [ ] **STEP 1: Merge auto-created PR to `dev`** (staging → dev)
    - [ ] Purpose: Sync version info to dev branch
- [ ] **STEP 2: Manually create PR: `dev` → `staging`**
    - [ ] Purpose: Sync version back to staging
    - [ ] Merge this PR to staging
- [ ] Run "Publish Beta to NPM" from `staging` branch
- [ ] Install and test: `npm install @juspay/blend-design-system@beta`

**Subsequent Beta Releases (if issues found):**

- [ ] Fix issues in `dev` branch
- [ ] Create and merge PR: `dev` → `staging` (code fixes)
- [ ] Run "Create Beta Release" from `staging` (increment_beta=true)
    - [ ] Auto-creates PR: staging → dev
- [ ] **Merge auto PR to `dev`** (staging → dev)
- [ ] **Manually create and merge PR: `dev` → `staging`** (version sync)
- [ ] Run "Publish Beta to NPM" from `staging` and test again
- [ ] Repeat until no issues

### Stable Release Checklist

- [ ] Beta testing complete (no issues found)
- [ ] Last beta published to NPM (e.g., `1.0.0-beta.2`)
- [ ] Run "Promote Beta to Stable" workflow from `staging` branch
- [ ] **Merge auto-created PR to `main`** (staging → main)
- [ ] Run "Publish Stable to NPM" workflow from `main` branch
- [ ] Verify: `npm install @juspay/blend-design-system@latest`

## 🔍 Troubleshooting Flow

```
                      ISSUE
                         │
           ┌─────────────┴─────────────┐
           │                           │
      Version Issue               Publish Issue
           │                           │
           ▼                           ▼
   ┌───────────────┐           ┌───────────────┐
   │ Check version │           │ Check NPM     │
   │ in package   │           │ token         │
   │   .json      │           │ in secrets    │
   └───────┬───────┘           └───────┬───────┘
           │                           │
     ┌─────┴─────┐                   │
     │           │                   │
  Wrong      Beta on           Invalid
 Format      main?             token
     │           │                   │
     ▼           ▼                   ▼
 Create       Run promote       Update NPM_
 Beta with    to-stable         TOKEN
 correct
 parameters
     │           │
     └───────────┴───────────────────┘
                 │
                 ▼
           Try Again
```

## 📦 Installation Commands

### Install Beta

```bash
# Latest beta
npm install @juspay/blend-design-system@beta

# Specific beta version
npm install @juspay/blend-design-system@1.0.0-beta.2
```

### Install Stable

```bash
# Latest stable
npm install @juspay/blend-design-system@latest

# Specific version
npm install @juspay/blend-design-system@1.0.0
```

---

This flowchart provides a clear, simple view of the release process without unnecessary complexity.
