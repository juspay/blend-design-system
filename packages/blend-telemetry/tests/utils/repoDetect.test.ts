import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
    detectRepoIdentity,
    normalizeToDocId,
} from '../../src/utils/repoDetect.js'

// ─── Mock child_process ───────────────────────────────────────────────────────
vi.mock('child_process', () => ({
    execSync: vi.fn(),
}))

// ─── Mock fs ──────────────────────────────────────────────────────────────────
vi.mock('fs', () => ({
    readFileSync: vi.fn(),
}))

import { execSync } from 'child_process'
import { readFileSync } from 'fs'

const mockExecSync = vi.mocked(execSync)
const mockReadFileSync = vi.mocked(readFileSync)

// ─── Helpers ──────────────────────────────────────────────────────────────────

function stubEnv(vars: Record<string, string>) {
    Object.entries(vars).forEach(([k, v]) => vi.stubEnv(k, v))
}

function clearCIEnv() {
    const ciVars = [
        'CI',
        'CONTINUOUS_INTEGRATION',
        'GITHUB_ACTIONS',
        'GITHUB_REPOSITORY',
        'GITHUB_REF_NAME',
        'GITHUB_SHA',
        'GITHUB_REF',
        'GITHUB_RUN_ID',
        'GITHUB_ACTOR',
        'GITLAB_CI',
        'CI_PROJECT_PATH',
        'CI_COMMIT_REF_NAME',
        'CI_COMMIT_SHA',
        'CI_PIPELINE_ID',
        'GITLAB_USER_LOGIN',
        'CI_MERGE_REQUEST_IID',
        'CIRCLECI',
        'CIRCLE_PROJECT_USERNAME',
        'CIRCLE_PROJECT_REPONAME',
        'CIRCLE_BRANCH',
        'CIRCLE_SHA1',
        'CIRCLE_BUILD_NUM',
        'CIRCLE_USERNAME',
        'BITBUCKET_BUILD_NUMBER',
        'BITBUCKET_REPO_FULL_NAME',
        'BITBUCKET_BRANCH',
        'BITBUCKET_COMMIT',
        'JENKINS_URL',
        'BLEND_TELEMETRY_CLOUD',
    ]
    ciVars.forEach((v) => vi.stubEnv(v, undefined as unknown as string))
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('detectRepoIdentity', () => {
    beforeEach(() => {
        vi.restoreAllMocks()
        clearCIEnv()
        // Default: git and fs fail gracefully
        mockExecSync.mockImplementation(() => {
            throw new Error('git not available')
        })
        mockReadFileSync.mockImplementation(() => {
            throw new Error('file not found')
        })
    })

    afterEach(() => {
        vi.unstubAllEnvs()
    })

    // ── CI platform detection ─────────────────────────────────────────────────

    it('detects GitHub Actions platform', async () => {
        stubEnv({
            CI: 'true',
            GITHUB_ACTIONS: 'true',
            GITHUB_REPOSITORY: 'juspay/hyperswitch',
        })
        const id = await detectRepoIdentity('/project')
        expect(id.ciPlatform).toBe('github')
        expect(id.isCI).toBe(true)
    })

    it('detects GitLab CI platform', async () => {
        stubEnv({ CI: 'true', GITLAB_CI: 'true' })
        const id = await detectRepoIdentity('/project')
        expect(id.ciPlatform).toBe('gitlab')
    })

    it('detects CircleCI platform', async () => {
        stubEnv({ CI: 'true', CIRCLECI: 'true' })
        const id = await detectRepoIdentity('/project')
        expect(id.ciPlatform).toBe('circleci')
    })

    it('reports local when no CI env set', async () => {
        const id = await detectRepoIdentity('/project')
        expect(id.ciPlatform).toBe('local')
        expect(id.isCI).toBe(false)
    })

    // ── Repo name detection (priority order) ──────────────────────────────────

    it('uses GITHUB_REPOSITORY first', async () => {
        stubEnv({
            GITHUB_REPOSITORY: 'juspay/hyperswitch',
            CI_PROJECT_PATH: 'other/repo',
        })
        const id = await detectRepoIdentity('/project')
        expect(id.repoName).toBe('juspay/hyperswitch')
    })

    it('falls back to CI_PROJECT_PATH (GitLab) when GITHUB_REPOSITORY absent', async () => {
        stubEnv({ CI_PROJECT_PATH: 'myorg/myrepo' })
        const id = await detectRepoIdentity('/project')
        expect(id.repoName).toBe('myorg/myrepo')
    })

    it('parses SSH git remote URL', async () => {
        mockExecSync.mockReturnValueOnce(
            Buffer.from('git@github.com:juspay/checkout-ui.git')
        )
        const id = await detectRepoIdentity('/project')
        expect(id.repoName).toBe('juspay/checkout-ui')
    })

    it('parses HTTPS git remote URL', async () => {
        mockExecSync.mockReturnValueOnce(
            Buffer.from('https://github.com/juspay/payments-dash.git')
        )
        const id = await detectRepoIdentity('/project')
        expect(id.repoName).toBe('juspay/payments-dash')
    })

    it('parses HTTPS git remote URL without .git suffix', async () => {
        mockExecSync.mockReturnValueOnce(
            Buffer.from('https://github.com/juspay/payments-dash')
        )
        const id = await detectRepoIdentity('/project')
        expect(id.repoName).toBe('juspay/payments-dash')
    })

    it('falls back to package.json name when git fails', async () => {
        mockReadFileSync.mockReturnValueOnce('{"name":"@juspay/checkout-ui"}')
        const id = await detectRepoIdentity('/project')
        expect(id.repoName).toBe('juspay/checkout-ui') // strips @ scope prefix
    })

    it('falls back to unknown-repo as last resort', async () => {
        const id = await detectRepoIdentity('/project')
        expect(id.repoName).toBe('project') // basename of projectRoot
    })

    // ── Branch detection ──────────────────────────────────────────────────────

    it('uses GITHUB_REF_NAME for branch', async () => {
        stubEnv({ GITHUB_REF_NAME: 'feat/my-feature' })
        const id = await detectRepoIdentity('/project')
        expect(id.branch).toBe('feat/my-feature')
    })

    it('falls back to git rev-parse for branch', async () => {
        mockExecSync
            .mockImplementationOnce(() => {
                throw new Error()
            }) // remote URL fails
            .mockReturnValueOnce(Buffer.from('main')) // branch succeeds
        const id = await detectRepoIdentity('/project')
        expect(id.branch).toBe('main')
    })

    // ── Commit SHA detection ──────────────────────────────────────────────────

    it('uses GITHUB_SHA for commit', async () => {
        stubEnv({ GITHUB_SHA: 'abc123def456abc123def456abc123def456abc1' })
        const id = await detectRepoIdentity('/project')
        expect(id.commitSha).toBe('abc123def456abc123def456abc123def456abc1')
        expect(id.commitShort).toBe('abc123d')
    })

    // ── PR number detection ───────────────────────────────────────────────────

    it('parses PR number from GITHUB_REF', async () => {
        stubEnv({ GITHUB_REF: 'refs/pull/123/merge' })
        const id = await detectRepoIdentity('/project')
        expect(id.prNumber).toBe('123')
    })

    it('uses CI_MERGE_REQUEST_IID for GitLab MR', async () => {
        stubEnv({ CI_MERGE_REQUEST_IID: '456' })
        const id = await detectRepoIdentity('/project')
        expect(id.prNumber).toBe('456')
    })

    // ── repoId normalization ──────────────────────────────────────────────────

    it('normalizes repo name to safe Firestore ID', async () => {
        stubEnv({ GITHUB_REPOSITORY: 'juspay/hyperswitch' })
        const id = await detectRepoIdentity('/project')
        expect(id.repoId).toBe('juspay__hyperswitch') // / → __
    })
})

// ─── normalizeToDocId unit tests ──────────────────────────────────────────────

describe('normalizeToDocId', () => {
    it('replaces forward slashes with double underscores', () => {
        expect(normalizeToDocId('org/repo')).toBe('org__repo')
    })

    it('replaces special characters with underscores', () => {
        expect(normalizeToDocId('org/repo name!')).toBe('org__repo_name_')
    })

    it('truncates at 400 characters', () => {
        const long = 'a'.repeat(500)
        expect(normalizeToDocId(long)).toHaveLength(400)
    })

    it('returns unknown_repo for empty string', () => {
        expect(normalizeToDocId('')).toBe('unknown_repo')
    })

    it('preserves dots and hyphens', () => {
        expect(normalizeToDocId('my-org/my.repo')).toBe('my-org__my.repo')
    })
})
