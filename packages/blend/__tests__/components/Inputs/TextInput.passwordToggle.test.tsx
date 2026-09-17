import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test-utils'
import ThemeProvider from '../../../lib/context/ThemeProvider'
import TextInput from '../../../lib/components/Inputs/TextInput/TextInput'
import { TextInputSize } from '../../../lib/components/Inputs/TextInput/types'
import { getTextInputTokens } from '../../../lib/components/Inputs/TextInput/textInput.tokens'
import { FOUNDATION_THEME } from '../../../lib/tokens'

const hexToRgb = (hex: string) => {
    const value = hex.replace('#', '')
    const r = parseInt(value.slice(0, 2), 16)
    const g = parseInt(value.slice(2, 4), 16)
    const b = parseInt(value.slice(4, 6), 16)
    return `rgb(${r}, ${g}, ${b})`
}

const getToggle = () =>
    screen.getByRole('button', { name: /show password/i }) as HTMLElement

const getToggleIcon = () => {
    const icon = getToggle().querySelector('svg')
    expect(icon).not.toBeNull()
    return icon as SVGElement
}

const renderPassword = (
    props: Partial<React.ComponentProps<typeof TextInput>> = {}
) =>
    render(
        <TextInput
            label="Password"
            value="secret"
            onChange={() => {}}
            type="password"
            passwordToggle
            {...props}
        />
    )

describe('TextInput password toggle tokens', () => {
    it('renders the built-in toggle at the default 18px size', () => {
        renderPassword()
        const icon = getToggleIcon()
        expect(icon.getAttribute('width')).toBe('18')
        expect(icon.getAttribute('height')).toBe('18')
    })

    it('colours the toggle from passwordToggle.color, not the input text', () => {
        renderPassword()
        const tokens = getTextInputTokens(FOUNDATION_THEME).lg
        expect(getToggle()).toHaveStyle({
            color: hexToRgb(String(tokens.passwordToggle.color.default)),
        })
    })

    it('uses the error colour when the field is in error', () => {
        renderPassword({ error: true, errorMessage: 'Too short' })
        const tokens = getTextInputTokens(FOUNDATION_THEME).lg
        expect(getToggle()).toHaveStyle({
            color: hexToRgb(String(tokens.passwordToggle.color.error)),
        })
    })

    it('uses the disabled colour when the field is disabled', () => {
        renderPassword({ disabled: true })
        const tokens = getTextInputTokens(FOUNDATION_THEME).lg
        expect(getToggle()).toHaveStyle({
            color: hexToRgb(String(tokens.passwordToggle.color.disabled)),
        })
    })

    it('honours passwordToggle token overrides for icon size and colour', () => {
        const tokens = getTextInputTokens(FOUNDATION_THEME)
        const override = (block: (typeof tokens)['sm']) => ({
            ...block,
            passwordToggle: {
                iconSize: {
                    [TextInputSize.SMALL]: FOUNDATION_THEME.unit[14],
                    [TextInputSize.MEDIUM]: FOUNDATION_THEME.unit[16],
                    [TextInputSize.LARGE]: FOUNDATION_THEME.unit[16],
                },
                color: {
                    default: FOUNDATION_THEME.colors.gray[400],
                    hover: FOUNDATION_THEME.colors.gray[600],
                    focus: FOUNDATION_THEME.colors.gray[600],
                    error: FOUNDATION_THEME.colors.red[600],
                    disabled: FOUNDATION_THEME.colors.gray[300],
                },
            },
        })

        render(
            <ThemeProvider
                componentTokens={{
                    TEXT_INPUT: {
                        sm: override(tokens.sm),
                        lg: override(tokens.lg),
                    },
                }}
            >
                <TextInput
                    label="Password"
                    value="secret"
                    onChange={() => {}}
                    type="password"
                    passwordToggle
                    size={TextInputSize.LARGE}
                />
            </ThemeProvider>
        )

        const icon = getToggleIcon()
        expect(icon.getAttribute('width')).toBe('16')
        expect(icon.getAttribute('height')).toBe('16')
        expect(getToggle()).toHaveStyle({
            color: hexToRgb(String(FOUNDATION_THEME.colors.gray[400])),
        })
    })

    it('resolves icon size per input size from the override', () => {
        const tokens = getTextInputTokens(FOUNDATION_THEME)
        const override = (block: (typeof tokens)['sm']) => ({
            ...block,
            passwordToggle: {
                ...block.passwordToggle,
                iconSize: {
                    [TextInputSize.SMALL]: FOUNDATION_THEME.unit[12],
                    [TextInputSize.MEDIUM]: FOUNDATION_THEME.unit[16],
                    [TextInputSize.LARGE]: FOUNDATION_THEME.unit[20],
                },
            },
        })

        render(
            <ThemeProvider
                componentTokens={{
                    TEXT_INPUT: {
                        sm: override(tokens.sm),
                        lg: override(tokens.lg),
                    },
                }}
            >
                <TextInput
                    label="Password"
                    value="secret"
                    onChange={() => {}}
                    type="password"
                    passwordToggle
                    size={TextInputSize.SMALL}
                />
            </ThemeProvider>
        )

        expect(getToggleIcon().getAttribute('width')).toBe('12')
    })

    it('keeps the legacy look when a token override predates passwordToggle', () => {
        const tokens = getTextInputTokens(FOUNDATION_THEME)
        const withoutToggle = (block: (typeof tokens)['sm']) => {
            const legacyBlock: Partial<(typeof tokens)['sm']> = { ...block }
            delete legacyBlock.passwordToggle
            return legacyBlock as (typeof tokens)['sm']
        }

        expect(() =>
            render(
                <ThemeProvider
                    componentTokens={{
                        TEXT_INPUT: {
                            sm: withoutToggle(tokens.sm),
                            lg: withoutToggle(tokens.lg),
                        },
                    }}
                >
                    <TextInput
                        label="Password"
                        value="secret"
                        onChange={() => {}}
                        type="password"
                        passwordToggle
                    />
                </ThemeProvider>
            )
        ).not.toThrow()

        expect(getToggleIcon().getAttribute('width')).toBe('18')
        expect(getToggle()).toHaveStyle({
            color: hexToRgb(String(tokens.lg.inputContainer.color.default)),
        })
    })
})
