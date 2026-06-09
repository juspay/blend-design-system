import type { GoogleFontFamily } from '@/lib/google-fonts'
import { FONT_FAMILIES } from '@/components/studio/editor/types'

export interface AddedSystemFont {
    family: string
    variants: string[]
    category?: string
}

const STORAGE_PREFIX = 'blend-studio-added-system-fonts'

function storageKey(scopeId: string): string {
    return `${STORAGE_PREFIX}:${scopeId}`
}

export function isBuiltinSystemFont(family: string): boolean {
    const key = family.trim().toLowerCase()
    return FONT_FAMILIES.some((f) => f.toLowerCase() === key)
}

/** True if the family is already listed under System Fonts (built-in or user-added). */
export function isInSystemFonts(
    family: string,
    added: readonly AddedSystemFont[]
): boolean {
    if (isBuiltinSystemFont(family)) return true
    const key = family.trim().toLowerCase()
    return added.some((f) => f.family.toLowerCase() === key)
}

export function readAddedSystemFonts(scopeId: string): AddedSystemFont[] {
    if (typeof window === 'undefined') return []

    try {
        const raw = localStorage.getItem(storageKey(scopeId))
        if (!raw) return []
        const parsed = JSON.parse(raw) as AddedSystemFont[]
        if (!Array.isArray(parsed)) return []
        return parsed.filter(
            (entry) =>
                typeof entry.family === 'string' &&
                entry.family.length > 0 &&
                !isBuiltinSystemFont(entry.family)
        )
    } catch {
        return []
    }
}

export function writeAddedSystemFonts(
    scopeId: string,
    fonts: AddedSystemFont[]
): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(storageKey(scopeId), JSON.stringify(fonts))
}

export function googleFontToAdded(font: GoogleFontFamily): AddedSystemFont {
    return {
        family: font.family,
        variants: font.variants,
        category: font.category,
    }
}

export function mergeSystemFontLists(
    added: readonly AddedSystemFont[]
): string[] {
    const builtin = [...FONT_FAMILIES]
    const seen = new Set<string>(builtin.map((f) => f.toLowerCase()))
    const extra: string[] = []

    for (const font of added) {
        const key = font.family.toLowerCase()
        if (seen.has(key)) continue
        seen.add(key)
        extra.push(font.family)
    }

    return [...builtin, ...extra]
}
