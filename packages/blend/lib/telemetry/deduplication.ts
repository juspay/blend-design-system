/**
 * Telemetry deduplication utilities
 *
 * @fileoverview Session-based deduplication logic for preventing duplicate telemetry events
 * @package @juspay/blend-design-system
 */

import { ProjectContext } from './types'
import { STORAGE_KEY_PREFIX, HASH_BASE } from './constants'

/**
 * Interface for stored usage data in sessionStorage
 */
interface StoredUsageData {
    componentName: string
    propsSignature: string
    projectContext: ProjectContext
    firstSeen: number
    lastSeen: number
    instanceCount: number
}

/**
 * Result of usage tracking check
 */
export interface UsageTrackingResult {
    shouldTrack: boolean
    usageKey: string
    instanceCount: number
}

/**
 * Create a consistent hash signature from component props
 * @param props - Sanitized component props
 * @returns Hash string for deduplication
 */
export function createPropsSignature(props: Record<string, unknown>): string {
    // Sort keys for consistent hashing
    const sortedKeys = Object.keys(props).sort()
    const propsString = sortedKeys
        .map((key) => `${key}:${props[key]}`)
        .join('|')

    // Simple but effective hash function
    let hash = 0
    for (let i = 0; i < propsString.length; i++) {
        const char = propsString.charCodeAt(i)
        hash = (hash << 5) - hash + char
        hash = hash & hash // Convert to 32-bit integer
    }

    return Math.abs(hash).toString(HASH_BASE)
}

/**
 * Generate unique storage key for component usage
 * @param componentName - Name of the component
 * @param propsSignature - Hash of component props
 * @param projectContext - Project context information
 * @returns Unique storage key
 */
export function generateUsageKey(
    componentName: string,
    propsSignature: string,
    projectContext: ProjectContext
): string {
    const { repositoryName, pageRoute } = projectContext
    return `${STORAGE_KEY_PREFIX}_${repositoryName}_${pageRoute}_${componentName}_${propsSignature}`
}

/**
 * Safely access sessionStorage with error handling
 * @param key - Storage key
 * @returns Stored value or null
 */
function safeGetSessionStorage(key: string): string | null {
    try {
        return sessionStorage.getItem(key)
    } catch (error) {
        console.warn('Blend telemetry: sessionStorage access failed', error)
        return null
    }
}

/**
 * Safely write to sessionStorage with error handling
 * @param key - Storage key
 * @param value - Value to store
 * @returns Success boolean
 */
function safeSetSessionStorage(key: string, value: string): boolean {
    try {
        sessionStorage.setItem(key, value)
        return true
    } catch (error) {
        console.warn('Blend telemetry: sessionStorage write failed', error)
        return false
    }
}

/**
 * Update existing usage data with new instance
 * @param existingData - Current stored usage data
 * @param usageKey - Storage key
 * @returns Updated instance count
 */
function updateExistingUsage(
    existingData: StoredUsageData,
    usageKey: string
): number {
    const updatedData: StoredUsageData = {
        ...existingData,
        instanceCount: (existingData.instanceCount || 1) + 1,
        lastSeen: Date.now(),
    }

    safeSetSessionStorage(usageKey, JSON.stringify(updatedData))
    return updatedData.instanceCount
}

/**
 * Create new usage tracking entry
 * @param componentName - Name of the component
 * @param propsSignature - Hash of component props
 * @param projectContext - Project context information
 * @param usageKey - Storage key
 * @returns Initial instance count (1)
 */
function createNewUsage(
    componentName: string,
    propsSignature: string,
    projectContext: ProjectContext,
    usageKey: string
): number {
    const newUsageData: StoredUsageData = {
        componentName,
        propsSignature,
        projectContext,
        firstSeen: Date.now(),
        lastSeen: Date.now(),
        instanceCount: 1,
    }

    safeSetSessionStorage(usageKey, JSON.stringify(newUsageData))
    return 1
}

/**
 * Check if component usage should be tracked (session-based deduplication)
 * @param componentName - Name of the component being tracked
 * @param componentProps - Component props for signature generation
 * @param projectContext - Project context information
 * @returns Usage tracking result with shouldTrack flag and instance count
 */
export function shouldTrackUsage(
    componentName: string,
    componentProps: Record<string, unknown>,
    projectContext: ProjectContext
): UsageTrackingResult {
    // Always track in server environment
    if (typeof window === 'undefined') {
        return { shouldTrack: true, usageKey: '', instanceCount: 1 }
    }

    const propsSignature = createPropsSignature(componentProps)
    const usageKey = generateUsageKey(
        componentName,
        propsSignature,
        projectContext
    )

    const existingUsageStr = safeGetSessionStorage(usageKey)

    if (existingUsageStr) {
        // Usage already tracked - increment count
        try {
            const existingUsage: StoredUsageData = JSON.parse(existingUsageStr)
            const instanceCount = updateExistingUsage(existingUsage, usageKey)

            return { shouldTrack: false, usageKey, instanceCount }
        } catch (error) {
            console.warn(
                'Blend telemetry: Failed to parse existing usage data',
                error
            )
            // Fall through to create new usage
        }
    }

    // First time seeing this combination
    const instanceCount = createNewUsage(
        componentName,
        propsSignature,
        projectContext,
        usageKey
    )

    return { shouldTrack: true, usageKey, instanceCount }
}

/**
 * Get stored usage data for debugging purposes
 * @param usageKey - Storage key
 * @returns Stored usage data or null
 */
export function getStoredUsageData(usageKey: string): StoredUsageData | null {
    const storedData = safeGetSessionStorage(usageKey)
    if (!storedData) return null

    try {
        return JSON.parse(storedData)
    } catch (error) {
        console.warn(
            'Blend telemetry: Failed to parse stored usage data',
            error
        )
        return null
    }
}
