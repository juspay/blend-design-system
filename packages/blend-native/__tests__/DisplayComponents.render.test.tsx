import { render } from '@testing-library/react-native'
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
