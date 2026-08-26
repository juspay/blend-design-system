import { createContext, useContext } from 'react'

/**
 * The playground's own palette.
 *
 * Deliberately hand-rolled rather than read from Blend's tokens: the harness
 * is the instrument used to inspect the library, so it must keep working
 * when the library does not. A control panel built out of the components
 * under test goes blank exactly when you need it most.
 */
export type ChromePalette = {
    bg: string
    surface: string
    surfaceAlt: string
    border: string
    fg: string
    fgMuted: string
    accent: string
    accentFg: string
    /** The preview stage and its dashed boundary. */
    stage: string
    stageBorder: string
    codeBg: string
    codeFg: string
    scrim: string
}

export const LIGHT_CHROME: ChromePalette = {
    bg: '#FFFFFF',
    surface: '#F7F8FA',
    surfaceAlt: '#EDEFF3',
    border: '#DFE3E9',
    fg: '#1A1C23',
    fgMuted: '#6B7280',
    accent: '#2B7FFF',
    accentFg: '#FFFFFF',
    stage: '#FAFBFC',
    stageBorder: '#C7CED8',
    codeBg: '#F4F5F7',
    codeFg: '#2B3038',
    scrim: 'rgba(16, 18, 22, 0.4)',
}

export const DARK_CHROME: ChromePalette = {
    bg: '#0E0F11',
    surface: '#17191D',
    surfaceAlt: '#212429',
    border: '#2E3238',
    fg: '#F5F6F7',
    fgMuted: '#9BA3AF',
    accent: '#4C8DFF',
    accentFg: '#0A1220',
    stage: '#131518',
    stageBorder: '#3A3F47',
    codeBg: '#1B1E23',
    codeFg: '#D7DBE0',
    scrim: 'rgba(0, 0, 0, 0.55)',
}

export const ChromeContext = createContext<ChromePalette>(LIGHT_CHROME)

export function useChrome(): ChromePalette {
    return useContext(ChromeContext)
}

/** Monospace face for the JSX snippet, per platform. */
export const MONO_FONT = {
    ios: 'Menlo',
    android: 'monospace',
    default: 'monospace',
}
