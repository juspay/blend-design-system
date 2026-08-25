import {
    FOUNDATION_THEME,
    InputStateV2,
    getTextInputV2Tokens,
    type TextInputV2TokensType,
} from '@juspay/blend-design-system/node'
import { fireEvent, render, screen } from '@testing-library/react-native'
import { BlendNativeProvider } from '../src/theme/BlendNativeProvider'
import { TextInput } from '../src/components/TextInput'
import { parseBorder } from '../src/adapters/cssStringAdapter'

/**
 * TextInput render behaviour: the chrome renders, focus re-resolves the
 * container against the FOCUS tokens, error replaces the hint, and the
 * disabled field blocks editing.
 */

const tokens = getTextInputV2Tokens(FOUNDATION_THEME)
    .sm as TextInputV2TokensType

const renderInput = (
    props: Partial<React.ComponentProps<typeof TextInput>> = {}
) =>
    render(
        <BlendNativeProvider>
            <TextInput
                value="hello"
                label="Name"
                hintText="As on your ID"
                testID="field"
                {...props}
            />
        </BlendNativeProvider>
    )

const flatten = (style: unknown) =>
    Object.assign({}, ...(Array.isArray(style) ? style.flat() : [style]))

describe('TextInput rendering', () => {
    it('renders label, value and hint', () => {
        renderInput()
        expect(screen.getByText('Name')).toBeTruthy()
        expect(screen.getByDisplayValue('hello')).toBeTruthy()
        expect(screen.getByText('As on your ID')).toBeTruthy()
    })

    it('shows the error message instead of the hint', () => {
        renderInput({ error: { show: true, message: 'Required field' } })
        expect(screen.getByText('Required field')).toBeTruthy()
        expect(screen.queryByText('As on your ID')).toBeNull()
    })

    it('renders the required marker', () => {
        renderInput({ required: true })
        expect(
            screen.getByText('*', { includeHiddenElements: true })
        ).toBeTruthy()
    })

    it('renders the sublabel in parentheses', () => {
        renderInput({ subLabel: 'optional' })
        expect(screen.getByText('(optional)')).toBeTruthy()
    })
})

describe('TextInput interaction', () => {
    it('propagates text changes', () => {
        const onChangeText = jest.fn()
        renderInput({ onChangeText })
        fireEvent.changeText(screen.getByTestId('field-input'), 'world')
        expect(onChangeText).toHaveBeenCalledWith('world')
    })

    it('re-resolves the container border on focus', () => {
        renderInput()
        const input = screen.getByTestId('field-input')
        const containerStyle = () =>
            flatten(screen.getByTestId('field-container').props.style)

        const defaultBorder = parseBorder(
            String(tokens.inputContainer.border[InputStateV2.DEFAULT])
        )
        const focusBorder = parseBorder(
            String(tokens.inputContainer.border[InputStateV2.FOCUS])
        )
        // Guard: the assertion below is meaningless if these match.
        expect(focusBorder.borderColor).not.toBe(defaultBorder.borderColor)

        expect(containerStyle().borderColor).toBe(defaultBorder.borderColor)
        fireEvent(input, 'focus')
        expect(containerStyle().borderColor).toBe(focusBorder.borderColor)
        fireEvent(input, 'blur')
        expect(containerStyle().borderColor).toBe(defaultBorder.borderColor)
    })

    it('keeps the error border while focused', () => {
        renderInput({ error: { show: true, message: 'Required' } })
        const input = screen.getByTestId('field-input')
        const errorBorder = parseBorder(
            String(tokens.inputContainer.border[InputStateV2.ERROR])
        )
        fireEvent(input, 'focus')
        expect(
            flatten(screen.getByTestId('field-container').props.style)
                .borderColor
        ).toBe(errorBorder.borderColor)
    })

    it('blocks editing when disabled', () => {
        renderInput({ disabled: true })
        const input = screen.getByTestId('field-input')
        expect(input.props.editable).toBe(false)
        expect(input.props.accessibilityState).toMatchObject({
            disabled: true,
        })
    })

    it('defaults the accessible name to the label', () => {
        renderInput()
        expect(screen.getByLabelText('Name')).toBeTruthy()
    })
})
