import React from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act } from '../../test-utils'
import { TextAreaV2 } from '../../../lib/components/InputsV2/TextAreaV2'
import * as useBreakpointsModule from '../../../lib/hooks/useBreakPoints'
import {
    getTextAreaAriaDescribedBy,
    getTextAreaInputPadding,
    getTextAreaInteractionKeys,
    getTextAreaLabelState,
} from '../../../lib/components/InputsV2/TextAreaV2/utils'
import type { TextAreaTokensType } from '../../../lib/components/InputsV2/TextAreaV2/TextAreaV2.tokens'
import {
    InputSizeV2,
    InputStateV2,
} from '../../../lib/components/InputsV2/inputV2.types'

const noop = () => {}

/** Minimal `inputContainer.padding` for `getTextAreaInputPadding` unit tests. */
const mockInputContainerPadding: TextAreaTokensType['inputContainer']['padding'] =
    {
        top: { sm: 10, md: 10, lg: 10 },
        right: { sm: 14, md: 14, lg: 14 },
        bottom: { sm: 10, md: 10, lg: 10 },
        left: { sm: 14, md: 14, lg: 14 },
    }

describe('TextAreaV2', () => {
    beforeEach(() => {
        vi.spyOn(useBreakpointsModule, 'useBreakpoints').mockReturnValue({
            innerWidth: 1280,
            breakPointLabel: 'lg',
        } as ReturnType<typeof useBreakpointsModule.useBreakpoints>)
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    describe('Rendering', () => {
        it('renders with label and textarea', () => {
            render(
                <TextAreaV2
                    label="Notes"
                    placeholder="Type here"
                    value=""
                    onChange={noop}
                />
            )
            expect(screen.getByText('Notes')).toBeInTheDocument()
            expect(screen.getByRole('textbox')).toBeInTheDocument()
        })

        it('renders with sublabel', () => {
            render(
                <TextAreaV2
                    label="Bio"
                    sublabel="Shown on your profile"
                    placeholder="…"
                    value=""
                    onChange={noop}
                />
            )
            expect(
                screen.getByText(/Shown on your profile/)
            ).toBeInTheDocument()
        })

        it('renders placeholder on textarea', () => {
            render(
                <TextAreaV2
                    label="Field"
                    placeholder="Add text"
                    value=""
                    onChange={noop}
                />
            )
            expect(screen.getByRole('textbox')).toHaveAttribute(
                'placeholder',
                'Add text'
            )
        })

        it('renders hint text', () => {
            render(
                <TextAreaV2
                    label="Feedback"
                    placeholder="…"
                    value=""
                    onChange={noop}
                    hintText="Max 500 characters"
                />
            )
            expect(screen.getByText('Max 500 characters')).toBeInTheDocument()
        })

        it('renders required indicator and aria-required', () => {
            render(
                <TextAreaV2
                    label="Required"
                    placeholder="…"
                    value=""
                    onChange={noop}
                    required
                />
            )
            expect(screen.getByText('*')).toBeInTheDocument()
            expect(screen.getByRole('textbox')).toHaveAttribute(
                'aria-required',
                'true'
            )
        })

        it('sets rows on textarea', () => {
            render(
                <TextAreaV2
                    label="Tall"
                    placeholder="…"
                    value=""
                    onChange={noop}
                    rows={8}
                />
            )
            expect(screen.getByRole('textbox')).toHaveAttribute('rows', '8')
        })

        it('sets resize style via prop', () => {
            render(
                <TextAreaV2
                    label="Resize"
                    placeholder="…"
                    value=""
                    onChange={noop}
                    resize="vertical"
                />
            )
            expect(screen.getByRole('textbox')).toHaveStyle({
                resize: 'vertical',
            })
        })
    })

    describe('States', () => {
        it('renders disabled textarea', () => {
            render(
                <TextAreaV2
                    label="Off"
                    placeholder="…"
                    value=""
                    onChange={noop}
                    disabled
                />
            )
            expect(screen.getByRole('textbox')).toBeDisabled()
        })

        it('renders error message and aria-invalid', () => {
            render(
                <TextAreaV2
                    label="Field"
                    placeholder="…"
                    value="x"
                    onChange={noop}
                    error={{ show: true, message: 'Invalid value' }}
                />
            )
            expect(screen.getByText('Invalid value')).toBeInTheDocument()
            expect(screen.getByRole('textbox')).toHaveAttribute(
                'aria-invalid',
                'true'
            )
        })

        it('sets aria-invalid false when no error', () => {
            render(
                <TextAreaV2
                    label="Ok"
                    placeholder="…"
                    value=""
                    onChange={noop}
                />
            )
            expect(screen.getByRole('textbox')).toHaveAttribute(
                'aria-invalid',
                'false'
            )
        })
    })

    describe('Controlled behavior', () => {
        it('displays controlled value', () => {
            render(
                <TextAreaV2
                    label="Controlled"
                    placeholder="…"
                    value="hello"
                    onChange={noop}
                />
            )
            expect(screen.getByRole('textbox')).toHaveValue('hello')
        })

        it('calls onChange when user types', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <TextAreaV2
                    label="Type"
                    placeholder="…"
                    value=""
                    onChange={handleChange}
                />
            )
            await user.type(screen.getByRole('textbox'), 'ab')
            expect(handleChange).toHaveBeenCalled()
        })
    })

    describe('Events', () => {
        it('calls onFocus and onBlur', () => {
            const onFocus = vi.fn()
            const onBlur = vi.fn()
            render(
                <TextAreaV2
                    label="E"
                    placeholder="…"
                    value=""
                    onChange={noop}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
            )
            const el = screen.getByRole('textbox')
            act(() => {
                el.focus()
            })
            expect(onFocus).toHaveBeenCalledTimes(1)
            act(() => {
                el.blur()
            })
            expect(onBlur).toHaveBeenCalledTimes(1)
        })

        it('stops keydown from bubbling to parent', async () => {
            const parentKeyDown = vi.fn()
            const { user } = render(
                <div onKeyDown={parentKeyDown}>
                    <TextAreaV2
                        label="E"
                        placeholder="…"
                        value=""
                        onChange={noop}
                    />
                </div>
            )
            await user.click(screen.getByRole('textbox'))
            await user.keyboard('x')
            expect(parentKeyDown).not.toHaveBeenCalled()
        })
    })

    describe('Ref forwarding', () => {
        it('forwards ref to textarea element', () => {
            const ref = React.createRef<HTMLTextAreaElement>()
            render(
                <TextAreaV2
                    label="Ref"
                    placeholder="…"
                    value=""
                    onChange={noop}
                    ref={ref}
                />
            )
            expect(ref.current).toBeInstanceOf(HTMLTextAreaElement)
            expect(ref.current).toBe(screen.getByRole('textbox'))
        })
    })

    describe('Attributes', () => {
        it('applies custom id', () => {
            render(
                <TextAreaV2
                    id="my-ta"
                    label="L"
                    placeholder="…"
                    value=""
                    onChange={noop}
                />
            )
            expect(screen.getByRole('textbox')).toHaveAttribute('id', 'my-ta')
        })

        it('applies name', () => {
            render(
                <TextAreaV2
                    label="L"
                    placeholder="…"
                    value=""
                    onChange={noop}
                    name="notes"
                />
            )
            expect(screen.getByRole('textbox')).toHaveAttribute('name', 'notes')
        })

        it('exposes data-textarea on root', () => {
            render(
                <TextAreaV2
                    label="Tagged"
                    placeholder="…"
                    value=""
                    onChange={noop}
                />
            )
            expect(
                document.querySelector('[data-textarea="Tagged"]')
            ).toBeInTheDocument()
        })

        it('sets aria-describedby to hint id when hintText is present', () => {
            render(
                <TextAreaV2
                    id="ta-hint"
                    label="L"
                    placeholder="…"
                    value=""
                    onChange={noop}
                    hintText="Help text"
                />
            )
            expect(screen.getByRole('textbox')).toHaveAttribute(
                'aria-describedby',
                'ta-hint-hint'
            )
        })

        it('sets aria-describedby to error id when error is shown with message', () => {
            render(
                <TextAreaV2
                    id="ta-err"
                    label="L"
                    placeholder="…"
                    value=""
                    onChange={noop}
                    error={{ show: true, message: 'Bad' }}
                />
            )
            expect(screen.getByRole('textbox')).toHaveAttribute(
                'aria-describedby',
                'ta-err-error'
            )
        })

        it('omits error id from aria-describedby when error has no message', () => {
            render(
                <TextAreaV2
                    id="ta-empty-err"
                    label="L"
                    placeholder="…"
                    value=""
                    onChange={noop}
                    error={{ show: true, message: '' }}
                />
            )
            expect(screen.getByRole('textbox')).not.toHaveAttribute(
                'aria-describedby'
            )
        })
    })

    describe('Small screen (sm breakpoint)', () => {
        beforeEach(() => {
            vi.spyOn(useBreakpointsModule, 'useBreakpoints').mockReturnValue({
                innerWidth: 375,
                breakPointLabel: 'sm',
            } as ReturnType<typeof useBreakpointsModule.useBreakpoints>)
        })

        it('uses empty native placeholder and hides top InputLabels (sublabel)', () => {
            render(
                <TextAreaV2
                    label="Mobile label"
                    sublabel="Desktop sublabel only"
                    placeholder="Type here"
                    value=""
                    onChange={noop}
                />
            )
            expect(screen.getByRole('textbox')).toHaveAttribute(
                'placeholder',
                ''
            )
            expect(
                screen.queryByText('Desktop sublabel only')
            ).not.toBeInTheDocument()
            expect(screen.getByText('Mobile label')).toBeInTheDocument()
        })

        it('renders floating label layer when label is set', () => {
            render(
                <TextAreaV2
                    label="Float me"
                    placeholder="…"
                    value=""
                    onChange={noop}
                />
            )
            expect(
                document.querySelector('[data-element="label"]')
            ).toBeInTheDocument()
            expect(
                document.querySelector('[data-element="floating-label"]')
            ).toBeInTheDocument()
        })

        it('does not render floating label layer when label is omitted', () => {
            render(<TextAreaV2 placeholder="…" value="" onChange={noop} />)
            expect(
                document.querySelector('[data-element="floating-label"]')
            ).not.toBeInTheDocument()
        })

        it('increases top padding when floated (has value on sm)', () => {
            render(
                <TextAreaV2
                    label="Padded"
                    placeholder="…"
                    value="x"
                    onChange={noop}
                />
            )
            const ta = screen.getByRole('textbox')
            const cs = window.getComputedStyle(ta)
            expect(parseFloat(cs.paddingTop)).toBeGreaterThan(0)
            expect(parseFloat(cs.paddingBottom)).toBe(0)
        })
    })

    describe('rest onKeyDown', () => {
        it('invokes consumer onKeyDown from rest', async () => {
            const onKeyDown = vi.fn()
            const { user } = render(
                <TextAreaV2
                    label="K"
                    placeholder="…"
                    value=""
                    onChange={noop}
                    onKeyDown={onKeyDown}
                />
            )
            await user.click(screen.getByRole('textbox'))
            await user.keyboard('{Escape}')
            expect(onKeyDown).toHaveBeenCalled()
        })
    })

    describe('utils', () => {
        describe('getTextAreaInputPadding', () => {
            it('doubles top padding and clears bottom on sm when focused or filled', () => {
                const ic = {
                    padding: mockInputContainerPadding,
                } as TextAreaTokensType['inputContainer']
                const r = getTextAreaInputPadding({
                    inputContainer: ic,
                    size: InputSizeV2.MD,
                    isSmallScreen: true,
                    inputFocusedOrWithValue: true,
                })
                expect(r.paddingTop).toBe(20)
                expect(r.paddingBottom).toBe(0)
                expect(r.floatingLabelTopPadding).toBe(10)
                expect(r.floatingLabelLeftPadding).toBe(14)
            })

            it('uses base padding when not small screen', () => {
                const ic = {
                    padding: mockInputContainerPadding,
                } as TextAreaTokensType['inputContainer']
                const r = getTextAreaInputPadding({
                    inputContainer: ic,
                    size: InputSizeV2.MD,
                    isSmallScreen: false,
                    inputFocusedOrWithValue: true,
                })
                expect(r.paddingTop).toBe(10)
                expect(r.paddingBottom).toBe(10)
            })
        })

        describe('getTextAreaAriaDescribedBy', () => {
            it('returns hint id when hint present and no error', () => {
                expect(
                    getTextAreaAriaDescribedBy(
                        'hint',
                        { show: false, message: '' },
                        'h-id',
                        'e-id'
                    )
                ).toBe('h-id')
            })

            it('returns error id when error shown with message', () => {
                expect(
                    getTextAreaAriaDescribedBy(
                        undefined,
                        { show: true, message: 'bad' },
                        'h-id',
                        'e-id'
                    )
                ).toBe('e-id')
            })

            it('returns undefined when nothing describes the field', () => {
                expect(
                    getTextAreaAriaDescribedBy(
                        undefined,
                        { show: false, message: '' },
                        'h-id',
                        'e-id'
                    )
                ).toBeUndefined()
            })
        })

        describe('getTextAreaLabelState', () => {
            it('returns DISABLED when disabled', () => {
                expect(getTextAreaLabelState(true, false, false)).toBe(
                    InputStateV2.DISABLED
                )
            })

            it('returns ERROR when error shown', () => {
                expect(getTextAreaLabelState(false, true, true)).toBe(
                    InputStateV2.ERROR
                )
            })

            it('returns FOCUS when focused and no error', () => {
                expect(getTextAreaLabelState(false, false, true)).toBe(
                    InputStateV2.FOCUS
                )
            })

            it('returns DEFAULT otherwise', () => {
                expect(getTextAreaLabelState(false, false, false)).toBe(
                    InputStateV2.DEFAULT
                )
            })
        })

        describe('getTextAreaInteractionKeys', () => {
            it('maps error and disabled to token keys', () => {
                expect(getTextAreaInteractionKeys(true, false)).toEqual({
                    borderDefault: 'error',
                    borderHover: 'error',
                    borderFocus: 'error',
                    bgDefault: 'error',
                    bgHover: 'error',
                    textColorKey: 'default',
                })
                expect(getTextAreaInteractionKeys(false, true)).toEqual(
                    expect.objectContaining({
                        textColorKey: 'disabled',
                    })
                )
            })
        })
    })
})
