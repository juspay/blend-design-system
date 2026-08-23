import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { Alert } from '../src/components/Alert'
import { BlendNativeProvider } from '../src/theme/BlendNativeProvider'

/**
 * Render tests for `Alert`.
 *
 * These exist because every bug found while building this package was found by
 * eyeballing a simulator screenshot, not by a test — the pure-layer suites can
 * verify a resolved style object but never that the right thing reached the
 * screen. The cases below are exactly the ones that were missed.
 */

const renderAlert = (props: React.ComponentProps<typeof Alert>) =>
    render(
        <BlendNativeProvider>
            <Alert {...props} />
        </BlendNativeProvider>
    )

describe('Alert rendering', () => {
    it('renders its heading and description', () => {
        const { getByText } = renderAlert({
            heading: 'Saved',
            description: 'All good.',
        })
        expect(getByText('Saved')).toBeTruthy()
        expect(getByText('All good.')).toBeTruthy()
    })

    it('renders neither when both are omitted', () => {
        const { getByTestId } = renderAlert({ testID: 'alert' })
        expect(getByTestId('alert')).toBeTruthy()
    })
})

describe('Alert accessibility', () => {
    // Regression: the container used to set `accessible`, which groups children
    // into one element and made the actions and close button individually
    // unreachable by VoiceOver. Only a render test can catch that.
    it('keeps the action buttons individually reachable', () => {
        const { getByLabelText } = renderAlert({
            heading: 'Payment failed',
            actions: {
                primaryAction: { text: 'Retry', onPress: () => {} },
                secondaryAction: { text: 'Dismiss', onPress: () => {} },
            },
        })

        expect(getByLabelText('Retry action')).toBeTruthy()
        expect(getByLabelText('Dismiss action')).toBeTruthy()
    })

    it('keeps the close button reachable', () => {
        const { getByLabelText } = renderAlert({
            heading: 'Heads up',
            closeButton: { show: true },
        })
        expect(getByLabelText('Close')).toBeTruthy()
    })

    it('marks the container as an alert', () => {
        const { getByTestId } = renderAlert({
            heading: 'Heads up',
            testID: 'alert',
        })
        expect(getByTestId('alert').props.accessibilityRole).toBe('alert')
    })

    it('does not collapse the subtree into one element', () => {
        const { getByTestId } = renderAlert({
            heading: 'Heads up',
            testID: 'alert',
        })
        // `accessible` must stay unset — see the note in Alert.tsx.
        expect(getByTestId('alert').props.accessible).not.toBe(true)
    })
})

describe('Alert interaction', () => {
    it('fires the primary action', () => {
        const onPress = jest.fn()
        const { getByLabelText } = renderAlert({
            heading: 'x',
            actions: { primaryAction: { text: 'Retry', onPress } },
        })
        fireEvent.press(getByLabelText('Retry action'))
        expect(onPress).toHaveBeenCalledTimes(1)
    })

    it('fires the close handler', () => {
        const onPress = jest.fn()
        const { getByLabelText } = renderAlert({
            heading: 'x',
            closeButton: { show: true, onPress },
        })
        fireEvent.press(getByLabelText('Close'))
        expect(onPress).toHaveBeenCalledTimes(1)
    })

    it('renders no close button when disabled', () => {
        const { queryByLabelText } = renderAlert({
            heading: 'x',
            closeButton: { show: false },
        })
        expect(queryByLabelText('Close')).toBeNull()
    })
})
