import { type ReactNode } from 'react'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import type { SkeletonTokensType } from '../skeleton.tokens'

/**
 * Shared hook for all skeleton components to eliminate code duplication
 * Handles token fetching, loading state, and motion preferences
 */
export const useSkeletonBase = (loading: boolean, children?: ReactNode) => {
    const tokens = useResponsiveTokens<SkeletonTokensType>('SKELETON')

    // Check for motion preferences (accessibility)
    const prefersReducedMotion =
        typeof window !== 'undefined'
            ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
            : false

    if (!loading) {
        return {
            shouldRender: false,
            fallback: children || null,
            tokens: null,
            prefersReducedMotion: false,
        }
    }

    return {
        shouldRender: true,
        fallback: null,
        tokens,
        prefersReducedMotion,
    }
}

/**
 * Common skeleton component props validation and defaults
 */
export const useSkeletonDefaults = <T extends Record<string, unknown>>(
    props: T,
    defaults: Partial<T>
): T => {
    return { ...defaults, ...props }
}
