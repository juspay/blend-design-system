import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, act } from '../../test-utils'
import { TextAreaV2 } from '../../../lib/components/InputsV2/TextAreaV2'

const noop = () => {}

describe('TextAreaV2', () => {
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
                    error
                    errorMessage="Invalid value"
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
})
