/**
 * Local Storage Utilities for Blend Token Studio
 *
 * These utilities manage user preferences and onboarding state
 * in localStorage, keeping the database clean.
 */

import type {
    OnboardingState,
    UserPreferences,
} from '@blend-design/token-engine'
import {
    getDefaultOnboardingState,
    getDefaultPreferences,
    STORAGE_KEYS,
} from '@blend-design/token-engine'

const STORAGE = STORAGE_KEYS

// ---------------------------------------------------------------------------
// Onboarding
// ---------------------------------------------------------------------------

export function getOnboardingState(): OnboardingState {
    try {
        const stored = localStorage.getItem(STORAGE.ONBOARDING)
        if (stored) {
            return { ...getDefaultOnboardingState(), ...JSON.parse(stored) }
        }
    } catch {
        // Ignore parse errors
    }
    return getDefaultOnboardingState()
}

export function setOnboardingCompleted(): void {
    const state: OnboardingState = {
        hasCompletedOnboarding: true,
        completedAt: new Date().toISOString(),
        skippedAt: null,
    }
    localStorage.setItem(STORAGE.ONBOARDING, JSON.stringify(state))
}

export function skipOnboarding(): void {
    const state: OnboardingState = {
        hasCompletedOnboarding: true,
        completedAt: null,
        skippedAt: new Date().toISOString(),
    }
    localStorage.setItem(STORAGE.ONBOARDING, JSON.stringify(state))
}

export function resetOnboarding(): void {
    localStorage.removeItem(STORAGE.ONBOARDING)
}

// ---------------------------------------------------------------------------
// Preferences
// ---------------------------------------------------------------------------

export function getPreferences(): UserPreferences {
    try {
        const stored = localStorage.getItem(STORAGE.PREFERENCES)
        if (stored) {
            return { ...getDefaultPreferences(), ...JSON.parse(stored) }
        }
    } catch {
        // Ignore parse errors
    }
    return getDefaultPreferences()
}

export function setPreferences(prefs: Partial<UserPreferences>): void {
    const current = getPreferences()
    const updated = { ...current, ...prefs }
    localStorage.setItem(STORAGE.PREFERENCES, JSON.stringify(updated))
}

export function resetPreferences(): void {
    localStorage.removeItem(STORAGE.PREFERENCES)
}

// ---------------------------------------------------------------------------
// Recent Branches
// ---------------------------------------------------------------------------

export interface RecentBranch {
    id: string
    name: string
    accessedAt: string
}

export function getRecentBranches(): RecentBranch[] {
    try {
        const stored = localStorage.getItem(STORAGE.RECENT_BRANCHES)
        if (stored) {
            return JSON.parse(stored)
        }
    } catch {
        // Ignore parse errors
    }
    return []
}

export function addRecentBranch(id: string, name: string): void {
    const branches = getRecentBranches()
    const existing = branches.findIndex((b) => b.id === id)

    if (existing >= 0) {
        branches.splice(existing, 1)
    }

    branches.unshift({
        id,
        name,
        accessedAt: new Date().toISOString(),
    })

    // Keep only last 10
    const trimmed = branches.slice(0, 10)
    localStorage.setItem(STORAGE.RECENT_BRANCHES, JSON.stringify(trimmed))
}

export function clearRecentBranches(): void {
    localStorage.removeItem(STORAGE.RECENT_BRANCHES)
}
