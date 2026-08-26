import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
    resetSnackbarWarnings,
    resolveSnackbarDuration,
} from '../src/components/Snackbar/snackbar.utils'

describe('resolveSnackbarDuration (web sonner parity)', () => {
    beforeEach(() => resetSnackbarWarnings())

    it('maps Infinity and null to the persistent sentinel', () => {
        expect(resolveSnackbarDuration(Infinity)).toBeNull()
        expect(resolveSnackbarDuration(null)).toBeNull()
    })

    it('passes finite durations through and defaults undefined', () => {
        expect(resolveSnackbarDuration(2500)).toBe(2500)
        expect(resolveSnackbarDuration(undefined)).toBeUndefined()
    })

    it('zero is NOT persistent — dev-warns once and falls back', () => {
        // __DEV__ is an RN global; vitest runs in plain node, so stub it.
        vi.stubGlobal('__DEV__', true)
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
        expect(resolveSnackbarDuration(0)).toBeUndefined()
        expect(resolveSnackbarDuration(0)).toBeUndefined()
        expect(warn).toHaveBeenCalledTimes(1)
        warn.mockRestore()
        vi.unstubAllGlobals()
    })
})
