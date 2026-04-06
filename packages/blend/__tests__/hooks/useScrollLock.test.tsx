import React from 'react'
import { describe, it, expect, afterEach, vi } from 'vitest'
import { render, cleanup } from '@testing-library/react'
import useScrollLock from '../../lib/hooks/useScrollLock'

const ScrollLockHarness = ({
    locked,
    children,
}: {
    locked: boolean
    children?: React.ReactNode
}) => {
    useScrollLock(locked)
    return <>{children}</>
}

describe('useScrollLock', () => {
    afterEach(() => {
        cleanup()
        document.body.removeAttribute('style')
        document.documentElement.removeAttribute('style')
        vi.restoreAllMocks()
    })

    it('does not preventDefault on Space when the search input is focused', () => {
        const { unmount } = render(
            <ScrollLockHarness locked>
                <input type="text" data-testid="field" />
            </ScrollLockHarness>
        )

        const input = document.querySelector(
            '[data-testid="field"]'
        ) as HTMLInputElement
        input.focus()

        const event = new KeyboardEvent('keydown', {
            key: ' ',
            bubbles: true,
            cancelable: true,
        })
        const preventDefaultSpy = vi.spyOn(event, 'preventDefault')

        input.dispatchEvent(event)

        expect(preventDefaultSpy).not.toHaveBeenCalled()
        unmount()
    })

    it('does not preventDefault on ArrowDown when activeElement is an input but target is not', () => {
        const { unmount } = render(
            <ScrollLockHarness locked>
                <input type="text" data-testid="field" />
                <div data-testid="menu-surface" />
            </ScrollLockHarness>
        )

        const input = document.querySelector(
            '[data-testid="field"]'
        ) as HTMLInputElement
        const surface = document.querySelector(
            '[data-testid="menu-surface"]'
        ) as HTMLDivElement
        input.focus()

        const event = new KeyboardEvent('keydown', {
            key: 'ArrowDown',
            bubbles: true,
            cancelable: true,
        })
        const preventDefaultSpy = vi.spyOn(event, 'preventDefault')

        surface.dispatchEvent(event)

        expect(preventDefaultSpy).not.toHaveBeenCalled()
        unmount()
    })

    it('restores body overflow styles after unmount when lock was active', () => {
        const { unmount } = render(<ScrollLockHarness locked />)

        expect(document.documentElement.style.overflow).toBe('hidden')

        unmount()

        expect(document.documentElement.style.overflow).toBe('')
        expect(document.body.style.overflow).toBe('')
    })
})
