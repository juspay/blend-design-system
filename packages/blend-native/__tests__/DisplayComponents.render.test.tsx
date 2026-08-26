import { fireEvent, render } from '@testing-library/react-native'
import { Avatar } from '../src/components/Avatar'
import { Spinner } from '../src/components/Spinner'
import { ProgressBar } from '../src/components/ProgressBar'
import { BlendNativeProvider } from '../src/theme/BlendNativeProvider'
import type { ReactElement } from 'react'
import {
    ProgressBarV2Appearance,
    ProgressBarV2Variant,
} from '@juspay/blend-design-system/node'

/**
 * Render tests for the display/feedback wave (Spinner, ProgressBar, Avatar,
 * KeyValuePair, Card, Snackbar) — roles, labels and fallbacks as they reach
 * the screen.
 */

const wrap = (ui: ReactElement) =>
    render(<BlendNativeProvider>{ui}</BlendNativeProvider>)

describe('Spinner rendering', () => {
    it('exposes a progressbar with its label', () => {
        const { getByTestId } = wrap(<Spinner testID="spin" />)
        const spinner = getByTestId('spin')
        expect(spinner.props.accessibilityRole).toBe('progressbar')
        expect(spinner.props.accessibilityLabel).toBe('Loading')
    })

    it('overlay mode wraps the indicator in an absolute scrim', () => {
        const { getByTestId } = wrap(<Spinner testID="spin" overlay />)
        expect(getByTestId('spin-overlay')).toBeTruthy()
        expect(getByTestId('spin')).toBeTruthy()
    })
})

describe('Avatar rendering', () => {
    // The avatar is one collapsed a11y node (web's role="img"), so its
    // children are hidden from the default query set.
    const q = { includeHiddenElements: true } as const

    it('renders initials with the shared hash color when there is no src', () => {
        const { getByText, getByTestId } = wrap(
            <Avatar alt="Jane Doe" testID="av" />
        )
        expect(getByText('JD', q)).toBeTruthy()
        expect(getByTestId('av').props.accessibilityRole).toBe('image')
        expect(getByTestId('av').props.accessibilityLabel).toBe('Jane Doe')
    })

    it('falls back to initials when the image errors', () => {
        const onImageError = jest.fn()
        const { getByTestId, queryByTestId } = wrap(
            <Avatar
                src="https://example.com/x.png"
                alt="Jane Doe"
                onImageError={onImageError}
                testID="av"
            />
        )
        expect(getByTestId('av-image', q)).toBeTruthy()
        fireEvent(getByTestId('av-image', q), 'error')
        expect(queryByTestId('av-image', q)).toBeNull()
        expect(getByTestId('av-fallback', q)).toBeTruthy()
        expect(onImageError).toHaveBeenCalledTimes(1)
    })

    it('hides the status dot from assistive tech, folding it into the name', () => {
        const { getByTestId } = wrap(
            <Avatar
                alt="Jane"
                status={{ type: 'online' as never }}
                testID="av"
            />
        )
        const dot = getByTestId('av-status', { includeHiddenElements: true })
        expect(dot.props.importantForAccessibility).toBe('no-hide-descendants')
        expect(getByTestId('av').props.accessibilityLabel).toBe('Jane, online')
    })
})

describe('ProgressBar rendering', () => {
    it('announces value through accessibilityValue, clamped into range', () => {
        const { getByTestId } = wrap(
            <ProgressBar value={150} testID="bar" showLabel />
        )
        const bar = getByTestId('bar')
        expect(bar.props.accessibilityRole).toBe('progressbar')
        expect(bar.props.accessibilityValue).toEqual({
            min: 0,
            max: 100,
            now: 100,
        })
        expect(bar.props.accessibilityLabel).toBe('Progress: 100%')
    })

    it('normalizes a reversed range like web', () => {
        const { getByTestId } = wrap(
            <ProgressBar value={25} min={100} max={0} testID="bar" />
        )
        expect(getByTestId('bar').props.accessibilityValue).toEqual({
            min: 0,
            max: 100,
            now: 25,
        })
    })

    it('renders the linear fill and the circular svg', () => {
        const { getByTestId, rerender } = wrap(
            <ProgressBar value={40} testID="bar" />
        )
        expect(getByTestId('bar-fill')).toBeTruthy()
        rerender(
            <BlendNativeProvider>
                <ProgressBar
                    value={40}
                    variant={ProgressBarV2Variant.CIRCULAR}
                    appearance={ProgressBarV2Appearance.SEGMENTED}
                    testID="bar"
                />
            </BlendNativeProvider>
        )
        expect(getByTestId('bar-svg')).toBeTruthy()
    })
})
