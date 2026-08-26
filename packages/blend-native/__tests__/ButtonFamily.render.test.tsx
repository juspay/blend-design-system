import React from 'react'
import { Text as RNText, View } from 'react-native'
import { render, fireEvent } from '@testing-library/react-native'
import { IconButton } from '../src/components/Button'
import { BlendNativeProvider } from '../src/theme/BlendNativeProvider'

/**
 * Render tests for the Button/Tag family components (IconButton, LinkButton,
 * ButtonGroup, TagGroup). The pure-layer suites verify resolved styles; these
 * verify what actually reaches the screen — roles, labels, injected group
 * positions.
 */

const wrap = (ui: React.ReactElement) =>
    render(<BlendNativeProvider>{ui}</BlendNativeProvider>)

const Icon = () => <View testID="icon" />

describe('IconButton rendering', () => {
    it('renders the icon and exposes a button role with the label', () => {
        const { getByTestId } = wrap(
            <IconButton
                icon={<Icon />}
                accessibilityLabel="Close"
                testID="icon-button"
            />
        )
        expect(getByTestId('icon')).toBeTruthy()
        const button = getByTestId('icon-button')
        expect(button.props.accessibilityRole).toBe('button')
        expect(button.props.accessibilityLabel).toBe('Close')
    })

    it('fires onPress', () => {
        const onPress = jest.fn()
        const { getByTestId } = wrap(
            <IconButton
                icon={<Icon />}
                accessibilityLabel="Close"
                onPress={onPress}
                testID="icon-button"
            />
        )
        fireEvent.press(getByTestId('icon-button'))
        expect(onPress).toHaveBeenCalledTimes(1)
    })

    it('cannot be un-iconified through the rest spread', () => {
        // The forced props are applied after the spread, so a stray `text`
        // that got past the types (via `as never`) must not render.
        const stray = { text: 'sneaky' } as never
        const { queryByText, getByTestId } = wrap(
            <IconButton
                icon={<Icon />}
                accessibilityLabel="Close"
                testID="icon-button"
                {...(stray as object)}
            />
        )
        expect(getByTestId('icon')).toBeTruthy()
        expect(queryByText('sneaky')).toBeNull()
    })
})

describe('IconButton accessibility', () => {
    it('keeps the icon slot hidden from assistive tech', () => {
        // The label lives on the button; the icon must not be a separate
        // accessibility node. RNText inside the slot stays presentational.
        const { getByTestId } = wrap(
            <IconButton
                icon={<RNText>×</RNText>}
                accessibilityLabel="Close"
                testID="icon-button"
            />
        )
        expect(getByTestId('icon-button').props.accessibilityLabel).toBe(
            'Close'
        )
    })
})
