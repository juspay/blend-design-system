import React from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { act, render, screen, waitFor } from '../../test-utils'
import { ResponsiveText } from '../../../lib/components/KeyValuePairV2/ResponsiveText'

vi.mock('../../../lib/hooks/useTruncationDetection', () => ({
    default: vi.fn(() => false),
}))

import useTruncationDetection from '../../../lib/hooks/useTruncationDetection'

const defaultProps = {
    children: 'Sample text',
    fontSize: '14px',
    color: '#000',
    slotPresent: false,
}

describe('ResponsiveText', () => {
    describe('Rendering', () => {
        it('renders text content', () => {
            render(<ResponsiveText {...defaultProps} />)
            expect(screen.getByText('Sample text')).toBeInTheDocument()
        })

        it('renders with custom as component', () => {
            render(
                <ResponsiveText {...defaultProps} as="span" id="custom-el" />
            )
            const el = document.getElementById('custom-el')
            expect(el).toBeInTheDocument()
            expect(el?.tagName).toBe('SPAN')
        })

        it('applies aria-label when provided', () => {
            render(
                <ResponsiveText
                    {...defaultProps}
                    aria-label="Descriptive label"
                />
            )
            expect(
                screen.getByLabelText('Descriptive label')
            ).toBeInTheDocument()
        })

        it('applies role when provided', () => {
            render(<ResponsiveText {...defaultProps} role="definition" />)
            expect(screen.getByRole('definition')).toBeInTheDocument()
        })
    })

    describe('textOverflow="wrap"', () => {
        it('does not show tooltip and skips truncation check', () => {
            render(
                <ResponsiveText
                    {...defaultProps}
                    textOverflow="wrap"
                    showTooltipOnTruncate={true}
                />
            )
            expect(screen.getByText('Sample text')).toBeInTheDocument()
            expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
        })
    })

    describe('showTooltipOnTruncate={false}', () => {
        it('renders text without tooltip wrapper', () => {
            render(
                <ResponsiveText
                    {...defaultProps}
                    showTooltipOnTruncate={false}
                />
            )
            expect(screen.getByText('Sample text')).toBeInTheDocument()
            expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
        })
    })

    describe('textOverflow="wrap-clamp"', () => {
        it('renders with wrap-clamp and does not crash', () => {
            render(
                <ResponsiveText
                    {...defaultProps}
                    textOverflow="wrap-clamp"
                    maxLines={3}
                />
            )
            expect(screen.getByText('Sample text')).toBeInTheDocument()
        })

        it('calls checkTruncation and can set isTruncated from scrollHeight > clientHeight', async () => {
            vi.useFakeTimers()
            const { container } = render(
                <ResponsiveText
                    {...defaultProps}
                    children="Long text that might clamp"
                    textOverflow="wrap-clamp"
                    maxLines={2}
                    showTooltipOnTruncate={true}
                />
            )
            const wrapperDiv = container.querySelector('div')
            if (wrapperDiv) {
                Object.defineProperty(wrapperDiv, 'scrollHeight', {
                    configurable: true,
                    value: 100,
                })
                Object.defineProperty(wrapperDiv, 'clientHeight', {
                    configurable: true,
                    value: 50,
                })
            }
            await vi.runAllTimersAsync()
            expect(
                screen.getByText('Long text that might clamp')
            ).toBeInTheDocument()
            vi.useRealTimers()
        })
    })

    describe('Tooltip when truncated', () => {
        beforeEach(() => {
            vi.useFakeTimers()
        })
        afterEach(() => {
            vi.useRealTimers()
            vi.mocked(useTruncationDetection).mockReturnValue(false)
        })

        it('uses TruncatedTextWithTooltipV2 when truncate overflow is enabled', async () => {
            vi.mocked(useTruncationDetection).mockReturnValue(true)

            render(
                <ResponsiveText
                    {...defaultProps}
                    textOverflow="truncate"
                    showTooltipOnTruncate={true}
                />
            )

            await act(async () => {
                await vi.runAllTimersAsync()
            })

            expect(screen.getByText('Sample text')).toBeInTheDocument()
            expect(useTruncationDetection).toHaveBeenCalled()
        })
    })

    describe('ResizeObserver triggers checkTruncation', () => {
        it('handles resize when textOverflow is wrap (early return path)', async () => {
            type ResizeObserverCallback = (
                entries: { contentRect: DOMRect }[]
            ) => void
            let observerCallback: ResizeObserverCallback | null = null
            const observe = vi.fn()
            const disconnect = vi.fn()

            const ResizeObserverMock = vi
                .fn()
                .mockImplementation((cb: ResizeObserverCallback) => {
                    observerCallback = cb
                    return { observe, disconnect }
                })

            vi.stubGlobal('ResizeObserver', ResizeObserverMock)

            render(
                <ResponsiveText
                    {...defaultProps}
                    textOverflow="wrap"
                    showTooltipOnTruncate={true}
                />
            )

            await waitFor(() => {
                expect(observe).toHaveBeenCalled()
            })

            if (observerCallback) {
                ;(observerCallback as ResizeObserverCallback)([
                    { contentRect: new DOMRect(0, 0, 100, 50) },
                ])
            }

            expect(screen.getByText('Sample text')).toBeInTheDocument()

            vi.unstubAllGlobals()
        })
    })
})
