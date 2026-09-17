import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { axe } from 'jest-axe'
import { render, screen } from '../../test-utils'
import ThemeProvider from '../../../lib/context/ThemeProvider'
import { Theme } from '../../../lib/context/theme.enum'
import TextInputV2 from '../../../lib/components/InputsV2/TextInputV2/TextInputV2'
import { TextInputV2DropdownPosition } from '../../../lib/components/InputsV2/TextInputV2/TextInputV2.types'
import { getTextInputV2Tokens } from '../../../lib/components/InputsV2/TextInputV2/TextInputV2.tokens'
import { InputSizeV2 } from '../../../lib/components/InputsV2/inputV2.types'
import { FOUNDATION_THEME } from '../../../lib/tokens'

const hexToRgb = (hex: string) => {
    const value = hex.replace('#', '')
    const r = parseInt(value.slice(0, 2), 16)
    const g = parseInt(value.slice(2, 4), 16)
    const b = parseInt(value.slice(4, 6), 16)
    return `rgb(${r}, ${g}, ${b})`
}

const queryToggle = () =>
    screen.queryByRole('button', { name: /(show|hide) password/i })

const getToggle = () => {
    const toggle = queryToggle()
    expect(toggle).not.toBeNull()
    return toggle as HTMLElement
}

const getToggleIcon = () => {
    const icon = getToggle().querySelector('svg')
    expect(icon).not.toBeNull()
    return icon as SVGElement
}

const renderPassword = (
    props: Partial<React.ComponentProps<typeof TextInputV2>> = {}
) =>
    render(
        <TextInputV2
            label="Password"
            value="secret"
            onChange={() => {}}
            passwordToggle
            {...props}
        />
    )

describe('TextInputV2 password toggle', () => {
    describe('behaviour', () => {
        it('masks the value and renders one toggle button', () => {
            renderPassword()
            const input = screen.getByLabelText('Password')
            expect(input).toHaveAttribute('type', 'password')
            expect(
                screen.getAllByRole('button', { name: /show password/i })
            ).toHaveLength(1)
            expect(getToggle()).toHaveAttribute('aria-pressed', 'false')
            expect(getToggle()).toHaveAttribute('aria-controls', input.id)
        })

        it('reveals and re-masks the value on click', async () => {
            const { user } = renderPassword()
            const input = screen.getByLabelText('Password')

            await user.click(getToggle())
            expect(input).toHaveAttribute('type', 'text')
            expect(getToggle()).toHaveAttribute('aria-pressed', 'true')
            expect(getToggle()).toHaveAccessibleName(/hide password/i)

            await user.click(getToggle())
            expect(input).toHaveAttribute('type', 'password')
            expect(getToggle()).toHaveAttribute('aria-pressed', 'false')
        })

        it('toggles from the keyboard without submitting the form', async () => {
            const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault())
            const { user } = render(
                <form onSubmit={onSubmit}>
                    <TextInputV2
                        label="Password"
                        value="secret"
                        onChange={() => {}}
                        passwordToggle
                    />
                </form>
            )
            const input = screen.getByLabelText('Password')

            getToggle().focus()
            await user.keyboard('{Enter}')
            expect(input).toHaveAttribute('type', 'text')
            await user.keyboard(' ')
            expect(input).toHaveAttribute('type', 'password')
            expect(onSubmit).not.toHaveBeenCalled()
        })

        it('overrides an explicit type prop while enabled', () => {
            renderPassword({ type: 'text' })
            expect(screen.getByLabelText('Password')).toHaveAttribute(
                'type',
                'password'
            )
        })

        it('leaves type alone and renders no toggle when disabled', () => {
            renderPassword({ passwordToggle: false, type: 'email' })
            expect(screen.getByLabelText('Password')).toHaveAttribute(
                'type',
                'email'
            )
            expect(queryToggle()).toBeNull()
        })

        it('renders a consumer rightSlot beside the toggle', () => {
            renderPassword({
                rightSlot: { slot: <span data-testid="strength">ok</span> },
            })
            const slot = screen.getByTestId('strength')
            const toggle = getToggle()
            const rightSlot = document.querySelector(
                '[data-element="right-slot"]'
            )
            expect(rightSlot).not.toBeNull()
            expect(rightSlot).toContainElement(slot)
            expect(rightSlot).toContainElement(toggle)
        })

        it('is not focusable when the field is disabled', () => {
            renderPassword({ disabled: true })
            expect(getToggle()).toBeDisabled()
            expect(getToggle()).toHaveAttribute('tabindex', '-1')
        })

        it('yields to an embedded dropdown', () => {
            renderPassword({
                dropdown: {
                    position: TextInputV2DropdownPosition.RIGHT,
                    label: 'Unit',
                    placeholder: 'Unit',
                    items: [{ items: [{ value: 'a', label: 'A' }] }],
                    selected: 'a',
                    onSelect: () => {},
                },
            })
            expect(queryToggle()).toBeNull()
            expect(
                document.querySelector('input[name="text-input"]')
            ).toHaveAttribute('type', 'password')
        })
    })

    describe('tokens', () => {
        const light = getTextInputV2Tokens(FOUNDATION_THEME).lg

        it('sizes the icon from inputContainer.passwordToggle.iconSize', () => {
            renderPassword({ size: InputSizeV2.MD })
            const icon = getToggleIcon()
            const expected = String(
                light.inputContainer.passwordToggle.iconSize.md
            ).replace('px', '')
            expect(icon.getAttribute('width')).toBe(expected)
            expect(icon.getAttribute('height')).toBe(expected)
        })

        it('colours the toggle from the default state token', () => {
            renderPassword()
            expect(getToggle()).toHaveStyle({
                color: hexToRgb(
                    String(light.inputContainer.passwordToggle.color.default)
                ),
            })
        })

        it('uses the error colour when the field has an error', () => {
            renderPassword({ error: { show: true, message: 'Too short' } })
            expect(getToggle()).toHaveStyle({
                color: hexToRgb(
                    String(light.inputContainer.passwordToggle.color.error)
                ),
            })
        })

        it('prefers the disabled colour over the error colour', () => {
            renderPassword({
                disabled: true,
                error: { show: true, message: 'Too short' },
            })
            expect(getToggle()).toHaveStyle({
                color: hexToRgb(
                    String(light.inputContainer.passwordToggle.color.disabled)
                ),
            })
        })

        it('resolves the dark theme colour under ThemeProvider theme=dark', () => {
            const dark = getTextInputV2Tokens(FOUNDATION_THEME, Theme.DARK).lg
            render(
                <ThemeProvider theme={Theme.DARK}>
                    <TextInputV2
                        label="Password"
                        value="secret"
                        onChange={() => {}}
                        passwordToggle
                    />
                </ThemeProvider>
            )
            expect(getToggle()).toHaveStyle({
                color: hexToRgb(
                    String(dark.inputContainer.passwordToggle.color.default)
                ),
            })
        })

        it('honours componentTokens overrides for size and colour', () => {
            render(
                <ThemeProvider
                    componentTokens={{
                        TEXT_INPUTV2: {
                            lg: {
                                inputContainer: {
                                    passwordToggle: {
                                        iconSize: {
                                            sm: '12px',
                                            md: '20px',
                                            lg: '24px',
                                        },
                                        color: {
                                            default:
                                                FOUNDATION_THEME.colors
                                                    .gray[400],
                                        },
                                    },
                                },
                            },
                        },
                    }}
                >
                    <TextInputV2
                        label="Password"
                        value="secret"
                        onChange={() => {}}
                        passwordToggle
                        size={InputSizeV2.LG}
                    />
                </ThemeProvider>
            )
            expect(getToggleIcon().getAttribute('width')).toBe('24')
            expect(getToggle()).toHaveStyle({
                color: hexToRgb(String(FOUNDATION_THEME.colors.gray[400])),
            })
        })
    })

    describe('Accessibility', () => {
        it('has no axe violations with the toggle rendered', async () => {
            const { container } = renderPassword({ required: true })
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })
})
