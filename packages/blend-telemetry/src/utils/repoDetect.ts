import { execSync } from 'child_process'
import { readFileSync } from 'fs'
import { resolve, basename } from 'path'

// ─── Types ────────────────────────────────────────────────────────────────────

export type CIPlatform =
    | 'github'
    | 'gitlab'
    | 'circleci'
    | 'bitbucket'
    | 'jenkins'
    | 'local'
    | 'unknown'

export interface RepoIdentity {
    /** Normalized repo ID — safe for Firestore doc IDs and GCS paths (/ replaced with __) */
    repoId: string
    /** Human-readable org/repo string e.g. "juspay/hyperswitch" */
    repoName: string
    branch: string | null
    commitSha: string | null
    /** Short 7-char commit SHA for use as document ID component */
    commitShort: string | null
    prNumber: string | null
    runId: string | null
    actor: string | null
    ciPlatform: CIPlatform
    isCI: boolean
}

// ─── Main export ──────────────────────────────────────────────────────────────

export async function detectRepoIdentity(
    projectRoot: string
): Promise<RepoIdentity> {
    const ciPlatform = detectCIPlatform()
    const isCI = !!(process.env.CI || process.env.CONTINUOUS_INTEGRATION)

    const repoName = detectRepoName(projectRoot)
    const repoId = normalizeToDocId(repoName)

    return {
        repoId,
        repoName,
        branch: detectBranch(projectRoot),
        commitSha: detectCommitSha(projectRoot),
        commitShort: detectCommitShort(projectRoot),
        prNumber: detectPRNumber(),
        runId: detectRunId(),
        actor: detectActor(),
        ciPlatform,
        isCI,
    }
}

// ─── Repo name detection ──────────────────────────────────────────────────────

function detectRepoName(projectRoot: string): string {
    // 1. GitHub Actions — most reliable in CI
    if (process.env.GITHUB_REPOSITORY) {
        return process.env.GITHUB_REPOSITORY // "org/repo"
    }

    // 2. GitLab CI
    if (process.env.CI_PROJECT_PATH) {
        return process.env.CI_PROJECT_PATH // "org/repo"
    }

    // 3. Bitbucket Pipelines
    if (process.env.BITBUCKET_REPO_FULL_NAME) {
        return process.env.BITBUCKET_REPO_FULL_NAME
    }

    // 4. CircleCI
    if (
        process.env.CIRCLE_PROJECT_USERNAME &&
        process.env.CIRCLE_PROJECT_REPONAME
    ) {
        return `${process.env.CIRCLE_PROJECT_USERNAME}/${process.env.CIRCLE_PROJECT_REPONAME}`
    }

    // 5. Git remote URL — works locally and in CI platforms not covered above
    const fromGit = parseRepoNameFromGitRemote(projectRoot)
    if (fromGit) return fromGit

    // 6. package.json name field
    try {
        const pkgPath = resolve(projectRoot, 'package.json')
        const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8')) as {
            name?: string
        }
        if (pkg.name && pkg.name.trim()) {
            // Strip npm scope prefix — "@juspay/checkout-ui" → "juspay/checkout-ui"
            return pkg.name.replace(/^@/, '').trim()
        }
    } catch {
        // ignore
    }

    // 7. Last resort — basename of the project root
    return basename(resolve(projectRoot)) || 'unknown-repo'
}

function parseRepoNameFromGitRemote(projectRoot: string): string | null {
    try {
        const remote = execSync('git config --get remote.origin.url', {
            cwd: projectRoot,
            timeout: 5000,
            stdio: ['pipe', 'pipe', 'pipe'],
        })
            .toString()
            .trim()

        if (!remote) return null

        // SSH:   git@github.com:org/repo.git
        // HTTPS: https://github.com/org/repo.git
        //        https://github.com/org/repo
        const match = remote.match(/[/:]([\w.-]+)\/([\w.-]+?)(?:\.git)?$/)
        if (match) return `${match[1]}/${match[2]}`
    } catch {
        // git not available or not in a git repo
    }
    return null
}

// ─── Branch detection ─────────────────────────────────────────────────────────

function detectBranch(projectRoot: string): string | null {
    // GitHub Actions
    if (process.env.GITHUB_REF_NAME) return process.env.GITHUB_REF_NAME

    // GitLab CI
    if (process.env.CI_COMMIT_REF_NAME) return process.env.CI_COMMIT_REF_NAME

    // CircleCI
    if (process.env.CIRCLE_BRANCH) return process.env.CIRCLE_BRANCH

    // Bitbucket
    if (process.env.BITBUCKET_BRANCH) return process.env.BITBUCKET_BRANCH

    // Git fallback
    try {
        const branch = execSync('git rev-parse --abbrev-ref HEAD', {
            cwd: projectRoot,
            timeout: 5000,
            stdio: ['pipe', 'pipe', 'pipe'],
        })
            .toString()
            .trim()
        if (branch && branch !== 'HEAD') return branch
    } catch {
        // ignore
    }

    return null
}

// ─── Commit SHA detection ─────────────────────────────────────────────────────

function detectCommitSha(projectRoot: string): string | null {
    if (process.env.GITHUB_SHA) return process.env.GITHUB_SHA
    if (process.env.CI_COMMIT_SHA) return process.env.CI_COMMIT_SHA
    if (process.env.CIRCLE_SHA1) return process.env.CIRCLE_SHA1
    if (process.env.BITBUCKET_COMMIT) return process.env.BITBUCKET_COMMIT

    try {
        const sha = execSync('git rev-parse HEAD', {
            cwd: projectRoot,
            timeout: 5000,
            stdio: ['pipe', 'pipe', 'pipe'],
        })
            .toString()
            .trim()
        return sha || null
    } catch {
        return null
    }
}

function detectCommitShort(projectRoot: string): string | null {
    const full = detectCommitSha(projectRoot)
    return full ? full.slice(0, 7) : null
}

// ─── PR / Run / Actor detection ───────────────────────────────────────────────

function detectPRNumber(): string | null {
    // GitHub: GITHUB_REF looks like "refs/pull/123/merge"
    const ghRef = process.env.GITHUB_REF
    if (ghRef) {
        const match = ghRef.match(/refs\/pull\/(\d+)\//)
        if (match) return match[1]
    }
    // GitLab
    if (process.env.CI_MERGE_REQUEST_IID)
        return process.env.CI_MERGE_REQUEST_IID

    return null
}

function detectRunId(): string | null {
    return (
        process.env.GITHUB_RUN_ID ??
        process.env.CI_PIPELINE_ID ??
        process.env.CIRCLE_BUILD_NUM ??
        process.env.BITBUCKET_BUILD_NUMBER ??
        null
    )
}

function detectActor(): string | null {
    return (
        process.env.GITHUB_ACTOR ??
        process.env.GITLAB_USER_LOGIN ??
        process.env.CIRCLE_USERNAME ??
        null
    )
}

// ─── CI platform detection ────────────────────────────────────────────────────

function detectCIPlatform(): CIPlatform {
    if (process.env.GITHUB_ACTIONS) return 'github'
    if (process.env.GITLAB_CI) return 'gitlab'
    if (process.env.CIRCLECI) return 'circleci'
    if (process.env.BITBUCKET_BUILD_NUMBER) return 'bitbucket'
    if (process.env.JENKINS_URL) return 'jenkins'
    if (process.env.CI) return 'unknown'
    return 'local'
}

// ─── Normalization ────────────────────────────────────────────────────────────

/**
 * Converts a repo name into a Firestore-safe document ID.
 *
 * Rules:
 * - "/" → "__"  (Firestore doc IDs can't contain forward slashes)
 * - Any char outside [a-zA-Z0-9_.-] → "_"
 * - Truncate to 400 chars (well under Firestore's 1500 byte limit)
 * - Never empty — fall back to "unknown_repo"
 */
export function normalizeToDocId(repoName: string): string {
    const normalized = repoName
        .replace(/\//g, '__')
        .replace(/[^a-zA-Z0-9_.-]/g, '_')
        .slice(0, 400)

    return normalized.length > 0 ? normalized : 'unknown_repo'
}
