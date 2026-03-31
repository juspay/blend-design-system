import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { BlendTelemetryReport } from '../../src/metrics/definitions.js'
import type { RepoIdentity } from '../../src/utils/repoDetect.js'

// ─── Mock Firebase modules ────────────────────────────────────────────────────
// We mock the entire firebase/* namespace so no real network calls are made.

const mockInitializeApp = vi.fn(() => ({ name: 'test-app' }))
const mockGetApps = vi.fn(() => [])
const mockDeleteApp = vi.fn(() => Promise.resolve())
const mockGetFirestore = vi.fn(() => ({}))
const mockTerminate = vi.fn(() => Promise.resolve())
const mockDoc = vi.fn()
const mockSetDoc = vi.fn()
const mockGetDoc = vi.fn()
const mockServerTimestamp = vi.fn(() => ({ _serverTimestamp: true }))
const mockCollection = vi.fn()
const mockQuery = vi.fn()
const mockWhere = vi.fn()
const mockOrderBy = vi.fn()
const mockLimit = vi.fn()
const mockGetDocs = vi.fn()

vi.mock('firebase/app', () => ({
    initializeApp: mockInitializeApp,
    getApps: mockGetApps,
    deleteApp: mockDeleteApp,
}))

vi.mock('firebase/firestore', () => ({
    getFirestore: mockGetFirestore,
    terminate: mockTerminate,
    waitForPendingWrites: vi.fn(() => Promise.resolve()),
    doc: mockDoc,
    setDoc: mockSetDoc,
    getDoc: mockGetDoc,
    serverTimestamp: mockServerTimestamp,
    collection: mockCollection,
    query: mockQuery,
    where: mockWhere,
    orderBy: mockOrderBy,
    limit: mockLimit,
    getDocs: mockGetDocs,
}))

import { uploadToCloud } from '../../src/reporters/cloud.js'
// Test Firebase config override — bypasses the 'not configured' guard
const TEST_FIREBASE_CONFIG = {
    projectId: 'test-project',
    apiKey: 'test-key',
    authDomain: 'test.firebaseapp.com',
    storageBucket: 'test.appspot.com',
    messagingSenderId: '123',
    appId: '1:123:web:abc',
}

// ─── Fixtures ─────────────────────────────────────────────────────────────────

function makeReport(
    overrides: Partial<BlendTelemetryReport> = {}
): BlendTelemetryReport {
    return {
        meta: {
            generatedAt: '2026-03-25T10:00:00.000Z',
            toolVersion: '0.2.0',
            packageName: '@juspay/blend-design-system',
            packageVersion: '1.0.0',
            declaredVersion: '1.0.0',
            versionMismatch: false,
            projectRoot: '/home/runner/work/repo',
            scanDurationMs: 1200,
            totalFilesScanned: 120,
            bindingFilesFound: 5,
            filesWithParseErrors: 0,
        },
        summary: {
            totalComponentsAvailable: 50,
            totalComponentsUsed: 20,
            adoptionRate: 40,
            totalUsageCount: 250,
            filesWithBlendUsage: 35,
            topComponents: [{ name: 'Button', count: 80, percentage: 32 }],
            unusedComponents: ['DatePicker', 'TimePicker'],
        },
        componentMetrics: [
            {
                componentName: 'Button',
                bindingName: 'ButtonBinding',
                usageCount: 80,
                isUsed: true,
                filesUsedIn: Array.from(
                    { length: 60 },
                    (_, i) => `src/file${i}.tsx`
                ),
                propUsage: [
                    {
                        propName: 'buttonType',
                        usageCount: 70,
                        usageRate: 0.875,
                        valueDistribution: { primary: 50, secondary: 20 },
                        isDeclaredInBinding: true,
                    },
                ],
                variantDistribution: [],
                spreadPropUsages: 0,
                dynamicUsages: 0,
            },
        ],
        fileMetrics: Array.from({ length: 35 }, (_, i) => ({
            filePath: `/home/runner/work/repo/src/file${i}.tsx`,
            relativePath: `src/file${i}.tsx`,
            language: 'typescript' as const,
            components: ['Button'],
            totalUsages: i + 1,
            isAdapter: i % 5 === 0,
            isWrapper: false,
            isDirect: i % 5 !== 0,
        })),
        migrationMetrics: {
            adapterPatternFiles: 7,
            directBlendFiles: 28,
            wrapperFiles: 0,
            migrationCompletionRate: 80,
            adapterFilePaths: [],
            directFilePaths: [],
            wrapperFilePaths: [],
            componentsByMigrationStatus: {
                fullyMigrated: ['Button'],
                partiallyMigrated: [],
                adapterOnly: [],
            },
        },
        languageBreakdown: {
            rescript: { files: 0, usages: 0, percentage: 0 },
            typescript: { files: 35, usages: 250, percentage: 100 },
            javascript: { files: 0, usages: 0, percentage: 0 },
        },
        ci: null,
        ...overrides,
    }
}

function makeIdentity(overrides: Partial<RepoIdentity> = {}): RepoIdentity {
    return {
        repoId: 'juspay__hyperswitch',
        repoName: 'juspay/hyperswitch',
        branch: 'main',
        commitSha: 'abc123def456abc1',
        commitShort: 'abc123d',
        prNumber: null,
        runId: '12345',
        actor: 'testuser',
        ciPlatform: 'github',
        isCI: true,
        ...overrides,
    }
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('uploadToCloud', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        mockGetApps.mockReturnValue([]) // not yet initialized
        mockGetFirestore.mockReturnValue({})
        mockDoc.mockReturnValue({})
        mockSetDoc.mockResolvedValue(undefined)
        mockGetDocs.mockResolvedValue({ empty: true, docs: [] })
    })

    // ── Not configured guard ──────────────────────────────────────────────────

    it('returns not-configured when Firebase projectId is empty', async () => {
        // The baked config has empty projectId in test builds (no env vars set)
        const result = await uploadToCloud(makeReport(), makeIdentity())
        // If config is not baked in (empty projectId), should fail gracefully
        expect(result.success).toBe(false)
        expect(result.reason).toBe('not configured')
    })

    // ── Dry run ───────────────────────────────────────────────────────────────

    it('returns success without writing on dry-run', async () => {
        const result = await uploadToCloud(makeReport(), makeIdentity(), {
            dryRun: true,
            _testFirebaseConfig: TEST_FIREBASE_CONFIG,
        })
        expect(result.success).toBe(true)
        expect(result.reason).toBe('dry-run')
        expect(mockSetDoc).not.toHaveBeenCalled()
    })

    // ── Timeout ───────────────────────────────────────────────────────────────

    it('returns timeout when write takes too long', async () => {
        mockGetApps.mockReturnValue([{ name: 'default' }]) // already initialized
        mockGetDocs.mockResolvedValue({ empty: true, docs: [] })
        // setDoc never resolves
        mockSetDoc.mockReturnValue(new Promise(() => {}))

        const result = await uploadToCloud(
            makeReport(),
            makeIdentity(),
            { timeout: 100, _testFirebaseConfig: TEST_FIREBASE_CONFIG } // 100ms timeout for fast test
        )

        expect(result.success).toBe(false)
        expect(result.reason).toBe('timeout')
    }, 3000)

    // ── Silent failure ────────────────────────────────────────────────────────

    it('returns failure without throwing when setDoc throws', async () => {
        mockGetApps.mockReturnValue([{ name: 'default' }])
        mockGetDocs.mockResolvedValue({ empty: true, docs: [] })
        mockSetDoc.mockRejectedValue(new Error('Firestore unavailable'))

        const result = await uploadToCloud(makeReport(), makeIdentity(), {
            _testFirebaseConfig: TEST_FIREBASE_CONFIG,
        })
        expect(result.success).toBe(false)
        expect(result.reason).toContain('Firestore unavailable')
    })

    // ── Payload size capping ──────────────────────────────────────────────────

    it('caps filesUsedIn to 50 entries in componentMetrics', async () => {
        mockGetApps.mockReturnValue([{ name: 'default' }])
        mockGetDocs.mockResolvedValue({ empty: true, docs: [] })

        // setDoc is called twice: (1) run doc with full payload, (2) repo summary.
        // We capture the FIRST call which has componentMetrics.
        let firstCallPayload: Record<string, unknown> | null = null
        mockSetDoc.mockImplementation((_ref: unknown, data: unknown) => {
            if (!firstCallPayload)
                firstCallPayload = data as Record<string, unknown>
            return Promise.resolve()
        })

        const report = makeReport()
        // Button has 60 filesUsedIn — should be capped at 50
        await uploadToCloud(report, makeIdentity(), {
            _testFirebaseConfig: TEST_FIREBASE_CONFIG,
        })

        expect(firstCallPayload).not.toBeNull()
        const metrics = (firstCallPayload as Record<string, unknown>)
            .componentMetrics as Array<{
            filesUsedIn: string[]
        }>
        expect(metrics[0].filesUsedIn.length).toBeLessThanOrEqual(50)
    })

    it('includes at most top 10 files in fileMetricsSummary', async () => {
        mockGetApps.mockReturnValue([{ name: 'default' }])
        mockGetDocs.mockResolvedValue({ empty: true, docs: [] })

        // Capture the first setDoc call (run doc) which has fileMetricsSummary
        let firstCallPayload: Record<string, unknown> | null = null
        mockSetDoc.mockImplementation((_ref: unknown, data: unknown) => {
            if (!firstCallPayload)
                firstCallPayload = data as Record<string, unknown>
            return Promise.resolve()
        })

        await uploadToCloud(makeReport(), makeIdentity(), {
            _testFirebaseConfig: TEST_FIREBASE_CONFIG,
        })

        expect(firstCallPayload).not.toBeNull()
        const summary = (firstCallPayload as Record<string, unknown>)
            .fileMetricsSummary as {
            topFiles: unknown[]
            totalFiles: number
        }
        expect(summary.topFiles.length).toBeLessThanOrEqual(10)
        expect(summary.totalFiles).toBe(35) // full count preserved
    })
})
