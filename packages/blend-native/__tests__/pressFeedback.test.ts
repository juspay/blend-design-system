import { describe, it, expect } from 'vitest'
import {
    resolvePressFeedback,
    DEFAULT_RIPPLE_COLOR,
    type PressFeedbackPlatform,
} from '../src/primitives/pressFeedback'

/**
 * Press feedback used to be iOS-only: every platform got web's `scale(0.99)`,
 * which on Android reads as a bug rather than a press.
 */

describe('Android', () => {
    it('gets a ripple', () => {
        const { androidRipple } = resolvePressFeedback('android')
        expect(androidRipple).toBeDefined()
        expect(androidRipple?.borderless).toBe(false)
    })

    it('gets no scale — the ripple is the feedback', () => {
        // Applying both would double it.
        expect(resolvePressFeedback('android').pressedTransform).toEqual({})
    })

    it('tints the ripple from the active-state background token', () => {
        const { androidRipple } = resolvePressFeedback('android', {
            activeBackgroundColor: '#1A56DB',
        })
        expect(androidRipple?.color).toBe('#1A56DB')
    })

    it('prefers an explicit ripple colour over the token', () => {
        const { androidRipple } = resolvePressFeedback('android', {
            rippleColor: '#FF0000',
            activeBackgroundColor: '#1A56DB',
        })
        expect(androidRipple?.color).toBe('#FF0000')
    })

    it('falls back to the default tint when neither is supplied', () => {
        expect(resolvePressFeedback('android').androidRipple?.color).toBe(
            DEFAULT_RIPPLE_COLOR
        )
    })

    it('honours a borderless ripple, for icon-only controls', () => {
        const { androidRipple } = resolvePressFeedback('android', {
            rippleBorderless: true,
        })
        expect(androidRipple?.borderless).toBe(true)
    })
})

describe('every other platform', () => {
    const others: PressFeedbackPlatform[] = ['ios', 'web', 'windows', 'macos']

    it.each(others)('gets no ripple on %s', (platform) => {
        expect(resolvePressFeedback(platform).androidRipple).toBeUndefined()
    })

    it.each(others)('gets the scale transform on %s', (platform) => {
        expect(resolvePressFeedback(platform).pressedTransform).toEqual({
            transform: [{ scale: 0.99 }],
        })
    })

    it('matches web, which uses scale(0.99)', () => {
        const { pressedTransform } = resolvePressFeedback('ios')
        expect(pressedTransform).toEqual({ transform: [{ scale: 0.99 }] })
    })

    it('honours a custom scale', () => {
        expect(
            resolvePressFeedback('ios', { pressedScale: 0.95 }).pressedTransform
        ).toEqual({ transform: [{ scale: 0.95 }] })
    })
})
