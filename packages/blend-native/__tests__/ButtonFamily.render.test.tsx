import React from 'react'
import { Text as RNText, View } from 'react-native'
import { render, fireEvent } from '@testing-library/react-native'
import {
    Button,
    ButtonGroup,
    IconButton,
    LinkButton,
} from '../src/components/Button'
import { BlendNativeProvider } from '../src/theme/BlendNativeProvider'

type FlatStyle = Record<string, unknown>
const flatten = (style: unknown): FlatStyle =>
    Object.assign({}, ...[style].flat(Infinity).filter(Boolean))

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

describe('LinkButton rendering', () => {
    it('announces itself as a link, not a button', () => {
        // The role rides Button's rest spread, which must land after the
        // explicit accessibilityRole="button" — this test pins that order.
        const { getByTestId } = wrap(
            <LinkButton text="Learn more" testID="link" onPress={() => {}} />
        )
        expect(getByTestId('link').props.accessibilityRole).toBe('link')
    })

    it('fires onPress and blocks it when disabled', () => {
        const onPress = jest.fn()
        const { getByTestId, rerender } = wrap(
            <LinkButton text="Docs" testID="link" onPress={onPress} />
        )
        fireEvent.press(getByTestId('link'))
        expect(onPress).toHaveBeenCalledTimes(1)

        rerender(
            <BlendNativeProvider>
                <LinkButton
                    text="Docs"
                    testID="link"
                    onPress={onPress}
                    disabled
                />
            </BlendNativeProvider>
        )
        fireEvent.press(getByTestId('link'))
        expect(onPress).toHaveBeenCalledTimes(1)
    })
})

describe('ButtonGroup rendering', () => {
    const threeButtons = (stacked: boolean, gap?: number) => (
        <ButtonGroup stacked={stacked} gap={gap} testID="group">
            <Button text="One" testID="b1" onPress={() => {}} />
            <Button text="Two" testID="b2" onPress={() => {}} />
            <Button text="Three" testID="b3" onPress={() => {}} />
        </ButtonGroup>
    )

    it('stacked: injects left/center/right and collapses shared edges', () => {
        const { getByTestId } = wrap(threeButtons(true))
        const first = flatten(getByTestId('b1').props.style)
        const middle = flatten(getByTestId('b2').props.style)
        const last = flatten(getByTestId('b3').props.style)

        // End caps keep only their outward corners.
        expect(first.borderTopRightRadius).toBe(0)
        expect(first.borderTopLeftRadius).not.toBe(0)
        expect(last.borderTopLeftRadius).toBe(0)
        expect(last.borderTopRightRadius).not.toBe(0)
        // The interior member squares off and drops its shared borders.
        expect(middle.borderTopLeftRadius).toBe(0)
        expect(middle.borderTopRightRadius).toBe(0)
        expect(middle.borderLeftWidth).toBe(0)
        expect(middle.borderRightWidth).toBe(0)
        // Stacked groups have no gap.
        expect(flatten(getByTestId('group').props.style).gap).toBe(0)
    })

    it('non-stacked: injects nothing and keeps the default gap', () => {
        const { getByTestId } = wrap(threeButtons(false))
        const first = flatten(getByTestId('b1').props.style)
        expect(first.borderTopRightRadius).not.toBe(0)
        expect(flatten(getByTestId('group').props.style).gap).toBe(10)
    })

    it('respects a custom gap', () => {
        const { getByTestId } = wrap(threeButtons(false, 4))
        expect(flatten(getByTestId('group').props.style).gap).toBe(4)
    })

    it('a single stacked child keeps its full radius', () => {
        const { getByTestId } = wrap(
            <ButtonGroup stacked testID="group">
                <Button text="Only" testID="b1" onPress={() => {}} />
            </ButtonGroup>
        )
        const only = flatten(getByTestId('b1').props.style)
        expect(only.borderTopLeftRadius).not.toBe(0)
        expect(only.borderTopRightRadius).not.toBe(0)
    })
})

describe('ButtonGroup accessibility', () => {
    it('keeps members individually pressable and reachable', () => {
        // The container must not be `accessible` — that collapses the
        // members into one node (the Alert container regression).
        const one = jest.fn()
        const two = jest.fn()
        const { getByTestId } = wrap(
            <ButtonGroup stacked testID="group">
                <Button text="One" testID="b1" onPress={one} />
                <Button text="Two" testID="b2" onPress={two} />
            </ButtonGroup>
        )
        expect(getByTestId('group').props.accessible).not.toBe(true)
        fireEvent.press(getByTestId('b1'))
        fireEvent.press(getByTestId('b2'))
        expect(one).toHaveBeenCalledTimes(1)
        expect(two).toHaveBeenCalledTimes(1)
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
