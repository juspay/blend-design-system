import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useBreakpoints } from '../../lib/hooks/useBreakPoints'

describe('useBreakpoints', () => {
    afterEach(() => {
        vi.unstubAllGlobals()
    })

    it('falls back to the current window when the top frame is cross-origin', () => {
        const inaccessibleTop = {
            get innerWidth() {
                throw new DOMException(
                    'Blocked a frame from accessing a cross-origin frame',
                    'SecurityError'
                )
            },
        } as Window
        const addEventListener = vi.fn()
        const removeEventListener = vi.fn()
        const framedWindow = {
            top: inaccessibleTop,
            innerWidth: 768,
            addEventListener,
            removeEventListener,
        } as unknown as Window

        vi.stubGlobal('window', framedWindow)

        const { result, unmount } = renderHook(() => useBreakpoints())

        expect(result.current).toEqual({
            innerWidth: 768,
            breakPointLabel: 'sm',
        })
        expect(addEventListener).toHaveBeenCalledWith(
            'resize',
            expect.any(Function)
        )

        unmount()
        expect(removeEventListener).toHaveBeenCalledWith(
            'resize',
            expect.any(Function)
        )
    })
})
