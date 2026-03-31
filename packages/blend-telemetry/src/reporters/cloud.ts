/**
 * Cloud reporter — uploads blend-telemetry results to Firebase Firestore.
 *
 * Design principles:
 *  - NEVER throws. All errors are caught and returned as { success: false }.
 *  - Firebase config is baked in at build time via tsup define (not consumer secrets).
 *  - Dynamic imports so Firebase is only loaded when an upload is actually needed.
 *  - Deduplication: doc ID = commitSha (deterministic). Same commit run twice just
 *    overwrites with identical data — idempotent, no duplicate docs in Firestore.
 *  - 10-second timeout so a network blip never stalls consumer CI.
 */

import type { BlendTelemetryReport } from '../metrics/definitions.js'
import type { RepoIdentity } from '../utils/repoDetect.js'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CloudUploadResult {
    success: boolean
    /** Firestore document ID if write succeeded */
    docId?: string
    reason?: string
}

/**
 * The shape stored in Firestore.
 * fileMetrics is intentionally excluded (too large, privacy concerns with abs paths).
 * Instead we store fileMetricsSummary with the top 10 files.
 */
export interface TelemetryDocument {
    // ── Identity ──────────────────────────────────────────────────────────────
    repoId: string
    repoName: string
    branch: string | null
    commitSha: string | null
    commitShort: string | null
    prNumber: string | null
    runId: string | null
    actor: string | null
    ciPlatform: string
    isCI: boolean

    // ── Timing ────────────────────────────────────────────────────────────────
    generatedAt: string
    uploadedAt: unknown // Firestore serverTimestamp()

    // ── Tool & package metadata ───────────────────────────────────────────────
    toolVersion: string
    packageName: string
    packageVersion: string
    declaredVersion: string | null
    versionMismatch: boolean
    scanDurationMs: number
    totalFilesScanned: number

    // ── Adoption metrics (flat — fast dashboard queries) ─────────────────────
    adoptionRate: number
    totalComponentsAvailable: number
    totalComponentsUsed: number
    totalUsageCount: number
    filesWithBlendUsage: number
    topComponents: Array<{ name: string; count: number; percentage: number }>
    unusedComponents: string[]

    // ── Language breakdown (flat) ─────────────────────────────────────────────
    rescriptFiles: number
    rescriptUsages: number
    typescriptFiles: number
    typescriptUsages: number
    javascriptFiles: number
    javascriptUsages: number

    // ── Migration metrics ─────────────────────────────────────────────────────
    migrationCompletionRate: number
    adapterPatternFiles: number
    directBlendFiles: number
    wrapperFiles: number
    componentsByMigrationStatus: {
        fullyMigrated: string[]
        partiallyMigrated: string[]
        adapterOnly: string[]
    }

    // ── Component metrics (size-capped) ───────────────────────────────────────
    componentMetrics: Array<{
        componentName: string
        usageCount: number
        isUsed: boolean
        /** Capped at 50 entries */
        filesUsedIn: string[]
        /** Top 10 props by usage rate */
        propUsageSummary: Array<{
            propName: string
            usageCount: number
            usageRate: number
            /** Top 5 values only */
            topValues: Record<string, number>
        }>
    }>

    // ── File metrics summary (top 10 files, no abs paths) ─────────────────────
    fileMetricsSummary: {
        totalFiles: number
        adapterFiles: number
        directFiles: number
        wrapperFiles: number
        topFiles: Array<{
            relativePath: string
            language: string
            totalUsages: number
            componentCount: number
        }>
    }

    // ── CI result ─────────────────────────────────────────────────────────────
    ciEnabled: boolean
    ciPassed: boolean | null
    ciFailures: string[]
}

// ─── Firebase config (baked in at build time via tsup define) ─────────────────
// These tokens are replaced with actual string literals during `tsup` build.
// If building locally without env vars set, they'll be empty strings and
// uploadToCloud() will return { success: false, reason: 'not configured' }.

declare const __BLEND_FIREBASE_API_KEY__: string
declare const __BLEND_FIREBASE_AUTH_DOMAIN__: string
declare const __BLEND_FIREBASE_PROJECT_ID__: string
declare const __BLEND_FIREBASE_STORAGE_BUCKET__: string
declare const __BLEND_FIREBASE_MESSAGING_SENDER_ID__: string
declare const __BLEND_FIREBASE_APP_ID__: string

const FIREBASE_CONFIG = {
    apiKey: __BLEND_FIREBASE_API_KEY__,
    authDomain: __BLEND_FIREBASE_AUTH_DOMAIN__,
    projectId: __BLEND_FIREBASE_PROJECT_ID__,
    storageBucket: __BLEND_FIREBASE_STORAGE_BUCKET__,
    messagingSenderId: __BLEND_FIREBASE_MESSAGING_SENDER_ID__,
    appId: __BLEND_FIREBASE_APP_ID__,
}

// ─── Collection constants ──────────────────────────────────────────────────────

const COLLECTION = 'blend-telemetry'

// ─── Main export ──────────────────────────────────────────────────────────────

export async function uploadToCloud(
    report: BlendTelemetryReport,
    identity: RepoIdentity,
    options: {
        timeout?: number
        dryRun?: boolean
        /** Override baked Firebase config — for testing only */
        _testFirebaseConfig?: Partial<typeof FIREBASE_CONFIG>
    } = {}
): Promise<CloudUploadResult> {
    const { timeout = 10_000, dryRun = false } = options

    // Allow test override of baked config; falls back to build-time constants
    const effectiveConfig = options._testFirebaseConfig
        ? { ...FIREBASE_CONFIG, ...options._testFirebaseConfig }
        : FIREBASE_CONFIG

    // Guard: config not baked in (local dev build without env vars)
    if (!effectiveConfig.projectId) {
        return { success: false, reason: 'not configured' }
    }

    const payload = buildPayload(report, identity)

    if (dryRun) {
        return {
            success: true,
            reason: 'dry-run',
            docId: payload.commitShort ?? 'dry-run',
        }
    }

    // Initialize Firebase here so we can share the app reference between
    // the upload promise and the timeout, allowing the timeout to call
    // deleteApp() and force-kill any hanging Firestore connections.
    const { initializeApp, getApps, deleteApp } = await import('firebase/app')
    const app =
        getApps().length > 0 ? getApps()[0] : initializeApp(effectiveConfig)

    let timeoutHandle: ReturnType<typeof setTimeout> | undefined

    const timeoutPromise = new Promise<CloudUploadResult>((resolve) => {
        timeoutHandle = setTimeout(async () => {
            // Force-close Firebase to unblock any pending Firestore operations:
            // terminate() closes the gRPC connection, deleteApp() releases the handle.
            try {
                const { getFirestore, terminate } =
                    await import('firebase/firestore')
                await terminate(getFirestore(app))
            } catch {
                /* ignore */
            }
            try {
                await deleteApp(app)
            } catch {
                /* ignore */
            }
            resolve({ success: false, reason: 'timeout' })
        }, timeout)
    })

    const uploadPromise = doUpload(app, payload, identity).finally(() =>
        clearTimeout(timeoutHandle)
    )

    return Promise.race([uploadPromise, timeoutPromise])
}

// ─── Upload implementation ────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function doUpload(
    app: any,
    payload: TelemetryDocument,
    identity: RepoIdentity
): Promise<CloudUploadResult> {
    const {
        getFirestore,
        doc,
        serverTimestamp,
        terminate,
        waitForPendingWrites,
    } = await import('firebase/firestore')
    const { deleteApp } = await import('firebase/app')

    const db = getFirestore(app)

    // Shared cleanup:
    //  1. waitForPendingWrites — ensures setDoc has been acknowledged by the server
    //     before we close the connection (critical: setDoc resolves from local cache
    //     immediately, but the write may not have reached Firestore yet)
    //  2. terminate — closes the gRPC connection so the process can exit
    //  3. deleteApp — releases the Firebase app handle
    const cleanup = async () => {
        try {
            await waitForPendingWrites(db)
        } catch {
            /* ignore — already terminated */
        }
        try {
            await terminate(db)
        } catch {
            /* ignore */
        }
        try {
            await deleteApp(app)
        } catch {
            /* ignore */
        }
    }

    try {
        const { repoId, commitSha } = identity

        // Deterministic doc ID — same commit always maps to same Firestore document.
        // Running the tool twice on the same commit is idempotent (last write wins,
        // but the data is identical so it doesn't matter).
        // Local runs with no commitSha fall back to a daily bucket so at most one
        // doc per day is written for un-tracked local usage.
        const today = new Date().toISOString().slice(0, 10) // "YYYY-MM-DD"
        const docId = commitSha ?? `local_${today}`

        const repoDocRef = doc(db, COLLECTION, repoId)
        const runDocRef = doc(db, COLLECTION, repoId, 'runs', docId)

        // ── Write ─────────────────────────────────────────────────────────────
        // docId is deterministic (commitSha or local_YYYY-MM-DD), so setDoc is
        // idempotent — running the same commit twice just overwrites with the
        // same data. No client-side dedup query needed.
        const result = await writeDocuments(
            db,
            runDocRef,
            repoDocRef,
            payload,
            identity,
            docId,
            serverTimestamp
        )

        await cleanup()
        return result
    } catch (err: unknown) {
        await cleanup()
        const message = err instanceof Error ? err.message : String(err)

        // Single retry on transient network errors
        if (isRetryableError(message)) {
            await sleep(2000)
            return doUpload(app, payload, identity)
        }

        return { success: false, reason: message }
    }
}

async function writeDocuments(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _db: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    runDocRef: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    repoDocRef: any,
    payload: TelemetryDocument,
    identity: RepoIdentity,
    docId: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    serverTimestamp: () => any
): Promise<CloudUploadResult> {
    const { setDoc } = await import('firebase/firestore')

    // ── Write run document ────────────────────────────────────────────────
    const docPayload: TelemetryDocument = {
        ...payload,
        uploadedAt: serverTimestamp(),
    }

    // ── Update repo-level "latest" summary (for dashboard overview) ───────
    const latestSummary = {
        repoId: identity.repoId,
        repoName: identity.repoName,
        branch: identity.branch,
        commitSha: identity.commitSha,
        lastUpdated: serverTimestamp(),
        adoptionRate: payload.adoptionRate,
        totalComponentsUsed: payload.totalComponentsUsed,
        totalComponentsAvailable: payload.totalComponentsAvailable,
        totalUsageCount: payload.totalUsageCount,
        migrationCompletionRate: payload.migrationCompletionRate,
        toolVersion: payload.toolVersion,
        packageVersion: payload.packageVersion,
        latestRunDocId: docId,
    }

    // Parallel writes — run doc + repo-level latest summary
    await Promise.all([
        setDoc(runDocRef, docPayload),
        setDoc(repoDocRef, latestSummary, { merge: true }),
    ])

    return { success: true, docId }
}

// ─── Payload builder ──────────────────────────────────────────────────────────

function buildPayload(
    report: BlendTelemetryReport,
    identity: RepoIdentity
): TelemetryDocument {
    const {
        meta,
        summary,
        componentMetrics,
        fileMetrics,
        migrationMetrics,
        languageBreakdown,
        ci,
    } = report

    return {
        // Identity
        repoId: identity.repoId,
        repoName: identity.repoName,
        branch: identity.branch,
        commitSha: identity.commitSha,
        commitShort: identity.commitShort,
        prNumber: identity.prNumber,
        runId: identity.runId,
        actor: identity.actor,
        ciPlatform: identity.ciPlatform,
        isCI: identity.isCI,

        // Timing
        generatedAt: meta.generatedAt,
        uploadedAt: null, // replaced with serverTimestamp() before write

        // Tool metadata
        toolVersion: meta.toolVersion,
        packageName: meta.packageName,
        packageVersion: meta.packageVersion,
        declaredVersion: meta.declaredVersion,
        versionMismatch: meta.versionMismatch,
        scanDurationMs: meta.scanDurationMs,
        totalFilesScanned: meta.totalFilesScanned,

        // Adoption metrics
        adoptionRate: summary.adoptionRate,
        totalComponentsAvailable: summary.totalComponentsAvailable,
        totalComponentsUsed: summary.totalComponentsUsed,
        totalUsageCount: summary.totalUsageCount,
        filesWithBlendUsage: summary.filesWithBlendUsage,
        topComponents: summary.topComponents,
        unusedComponents: summary.unusedComponents,

        // Language breakdown (flat)
        rescriptFiles: languageBreakdown.rescript.files,
        rescriptUsages: languageBreakdown.rescript.usages,
        typescriptFiles: languageBreakdown.typescript.files,
        typescriptUsages: languageBreakdown.typescript.usages,
        javascriptFiles: languageBreakdown.javascript.files,
        javascriptUsages: languageBreakdown.javascript.usages,

        // Migration
        migrationCompletionRate: migrationMetrics.migrationCompletionRate,
        adapterPatternFiles: migrationMetrics.adapterPatternFiles,
        directBlendFiles: migrationMetrics.directBlendFiles,
        wrapperFiles: migrationMetrics.wrapperFiles,
        componentsByMigrationStatus:
            migrationMetrics.componentsByMigrationStatus,

        // Component metrics (size-capped to stay under Firestore 1MB doc limit)
        componentMetrics: componentMetrics.map((c) => ({
            componentName: c.componentName,
            usageCount: c.usageCount,
            isUsed: c.isUsed,
            filesUsedIn: c.filesUsedIn.slice(0, 50), // cap at 50 files
            propUsageSummary: c.propUsage
                .sort((a, b) => b.usageRate - a.usageRate)
                .slice(0, 10) // top 10 props
                .map((p) => ({
                    propName: p.propName,
                    usageCount: p.usageCount,
                    usageRate: p.usageRate,
                    // Filter empty-string keys — Firestore rejects empty field names
                    topValues: topN(
                        Object.fromEntries(
                            Object.entries(p.valueDistribution).filter(
                                ([k]) => k !== ''
                            )
                        ),
                        5
                    ),
                })),
        })),

        // File metrics summary — top 10 by usage, relative paths only (no abs paths)
        fileMetricsSummary: {
            totalFiles: fileMetrics.length,
            adapterFiles: fileMetrics.filter((f) => f.isAdapter).length,
            directFiles: fileMetrics.filter((f) => f.isDirect).length,
            wrapperFiles: fileMetrics.filter((f) => f.isWrapper).length,
            topFiles: fileMetrics
                .sort((a, b) => b.totalUsages - a.totalUsages)
                .slice(0, 10)
                .map((f) => ({
                    relativePath: f.relativePath,
                    language: f.language,
                    totalUsages: f.totalUsages,
                    componentCount: f.components.length,
                })),
        },

        // CI
        ciEnabled: !!ci,
        ciPassed: ci ? ci.passed : null,
        ciFailures: ci ? ci.failures : [],
    }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Returns top N entries from a Record<string, number> by value */
function topN(obj: Record<string, number>, n: number): Record<string, number> {
    return Object.fromEntries(
        Object.entries(obj)
            .sort(([, a], [, b]) => b - a)
            .slice(0, n)
    )
}

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

function isRetryableError(message: string): boolean {
    const retryablePatterns = [
        'network',
        'ECONNRESET',
        'ENOTFOUND',
        'ETIMEDOUT',
        'fetch failed',
        'Failed to fetch',
    ]
    return retryablePatterns.some((p) =>
        message.toLowerCase().includes(p.toLowerCase())
    )
}
