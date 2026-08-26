import { render } from '@testing-library/react-native'
import { Spinner } from '../src/components/Spinner'
import { BlendNativeProvider } from '../src/theme/BlendNativeProvider'
import type { ReactElement } from 'react'

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
