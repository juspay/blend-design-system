import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
    DEFAULT_TOAST_DURATION,
    MAX_VISIBLE_TOASTS,
    dismissToast,
    getToasts,
    getVisibleToasts,
    resetToasts,
    showToast,
    subscribeToasts,
} from '../src/overlay/toast/toastStore'

beforeEach(() => resetToasts())

describe('toast queue', () => {
    it('appends toasts and returns generated ids', () => {
        const a = showToast({ content: 'a' })
        const b = showToast({ content: 'b' })
        expect(a).not.toBe(b)
        expect(getToasts().map((t) => t.content)).toEqual(['a', 'b'])
    })

    it('applies the default duration and honours null (sticky)', () => {
        showToast({ content: 'a' })
        showToast({ content: 'b', duration: null })
        showToast({ content: 'c', duration: 1000 })
        expect(getToasts().map((t) => t.duration)).toEqual([
            DEFAULT_TOAST_DURATION,
            null,
            1000,
        ])
    })

    it('replaces a toast in place when the id is reused', () => {
        showToast({ id: 'save', content: 'saving' })
        showToast({ content: 'other' })
        showToast({ id: 'save', content: 'saved' })
        expect(getToasts().map((t) => t.content)).toEqual(['saved', 'other'])
    })

    it('dismisses one by id, or all with no id', () => {
        const a = showToast({ content: 'a' })
        showToast({ content: 'b' })
        dismissToast(a)
        expect(getToasts().map((t) => t.content)).toEqual(['b'])
        dismissToast()
        expect(getToasts()).toEqual([])
    })

    it('caps the visible slice to the newest MAX_VISIBLE_TOASTS', () => {
        for (let i = 0; i < MAX_VISIBLE_TOASTS + 2; i++) {
            showToast({ content: `t${i}` })
        }
        const visible = getVisibleToasts()
        expect(visible).toHaveLength(MAX_VISIBLE_TOASTS)
        expect(visible[visible.length - 1].content).toBe(
            `t${MAX_VISIBLE_TOASTS + 1}`
        )
    })

    it('notifies subscribers and stops after unsubscribe', () => {
        const listener = vi.fn()
        const unsubscribe = subscribeToasts(listener)
        showToast({ content: 'a' })
        expect(listener).toHaveBeenCalledTimes(1)
        unsubscribe()
        showToast({ content: 'b' })
        expect(listener).toHaveBeenCalledTimes(1)
    })
})
