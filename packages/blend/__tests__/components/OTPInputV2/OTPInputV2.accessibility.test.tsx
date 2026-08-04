import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen, act, fireEvent } from '../../test-utils'
import { axe } from 'jest-axe'
import OTPInputV2 from '../../../lib/components/InputsV2/OTPInputV2/OTPInputV2'

const noopChange = () => {}

describe('OTPInputV2 Accessibility', () => {
    describe('WCAG 2.1/2.2 Compliance (Level A, AA) — axe-core', () => {
        it('meets WCAG standards for default OTP (axe-core validation)', async () => {
            const { container } = render(
                <OTPInputV2
                    label="Verification code"
                    value=""
                    onChange={noopChange}
                    length={6}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for lengths 4 and 8', async () => {
            // length 6 is covered by the default axe test above
            const lengths = [4, 8] as const
            for (const length of lengths) {
                const { container, unmount } = render(
                    <OTPInputV2
                        label={`${length}-digit code`}
                        value=""
                        onChange={noopChange}
                        length={length}
                    />
                )
                const results = await axe(container)
                expect(results).toHaveNoViolations()
                unmount()
            }
        })

        it('meets WCAG standards when disabled', async () => {
            const { container } = render(
                <OTPInputV2
                    label="Disabled OTP"
                    value=""
                    onChange={noopChange}
                    length={6}
                    disabled
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with error state (3.3.1)', async () => {
            const { container } = render(
                <OTPInputV2
                    label="Verification code"
                    value="123"
                    onChange={noopChange}
                    length={6}
                    error
                    errorMessage="Please enter all 6 digits"
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 3.3.2 Labels or Instructions (Level A)', () => {
        it('exposes one textbox per digit with a stable accessible name', () => {
            render(
                <OTPInputV2
                    label="Verification code"
                    name="otp"
                    value=""
                    onChange={noopChange}
                    length={6}
                />
            )
            const inputs = screen.getAllByRole('textbox')
            expect(inputs).toHaveLength(6)
            expect(inputs[0]).toHaveAttribute(
                'aria-label',
                'Verification code digit 1 of 6'
            )
            expect(inputs[5]).toHaveAttribute(
                'aria-label',
                'Verification code digit 6 of 6'
            )
        })

        it('associates the visible label with the first input via htmlFor', () => {
            const { container } = render(
                <OTPInputV2
                    id="labeled-otp"
                    label="Verification code"
                    value=""
                    onChange={noopChange}
                    length={4}
                />
            )
            // getByLabelText('Verification code') is ambiguous: group also has aria-label "Verification code"
            const label = container.querySelector('label[for="labeled-otp-0"]')
            expect(label).toBeTruthy()
            expect(label).toHaveTextContent('Verification code')
        })

        it('uses generic digit labels when label is omitted', () => {
            render(<OTPInputV2 value="" onChange={noopChange} length={3} />)
            expect(
                screen.getByRole('textbox', { name: 'Digit 1 of 3' })
            ).toBeInTheDocument()
        })

        it('renders sublabel for additional context', () => {
            render(
                <OTPInputV2
                    label="Verification code"
                    sublabel="Sent to your email"
                    value=""
                    onChange={noopChange}
                    length={6}
                />
            )
            expect(screen.getByText(/Sent to your email/)).toBeInTheDocument()
        })

        it('renders hint text', () => {
            render(
                <OTPInputV2
                    label="Code"
                    hintText="Use the 6-digit code from SMS"
                    value=""
                    onChange={noopChange}
                    length={6}
                />
            )
            expect(
                screen.getByText('Use the 6-digit code from SMS')
            ).toBeInTheDocument()
        })
    })

    describe('WCAG 3.3.1 Error Identification (Level A)', () => {
        it('shows error message text when error is set', () => {
            render(
                <OTPInputV2
                    label="Code"
                    value=""
                    onChange={noopChange}
                    length={6}
                    error
                    errorMessage="Invalid or expired code"
                />
            )
            expect(
                screen.getByText('Invalid or expired code')
            ).toBeInTheDocument()
        })

        it('sets aria-invalid on each cell when error is true', () => {
            render(
                <OTPInputV2
                    label="Code"
                    value=""
                    onChange={noopChange}
                    length={4}
                    error
                    errorMessage="Try again"
                />
            )
            screen.getAllByRole('textbox').forEach((input) => {
                expect(input).toHaveAttribute('aria-invalid', 'true')
            })
        })

        it('omits hint from aria-describedby when error is shown (error takes precedence)', () => {
            render(
                <OTPInputV2
                    id="err-otp"
                    label="Code"
                    hintText="Normally helpful"
                    value=""
                    onChange={noopChange}
                    length={6}
                    error
                    errorMessage="Must fix"
                />
            )
            const hintEl = screen.queryByText('Normally helpful')
            expect(hintEl).not.toBeInTheDocument()
            const errorEl = screen.getByText('Must fix')
            screen.getAllByRole('textbox').forEach((input) => {
                expect(input.getAttribute('aria-describedby')).toBe(errorEl.id)
                expect(input.getAttribute('aria-describedby')).not.toContain(
                    'hint'
                )
            })
        })
    })

    describe('WCAG 4.1.2 Name, Role, Value (Level A)', () => {
        it('exposes group role with aria-label when label is provided', () => {
            render(
                <OTPInputV2
                    label="Verification code"
                    sublabel="Check email"
                    value=""
                    onChange={noopChange}
                    length={6}
                    required
                />
            )
            const group = screen.getByRole('group', {
                name: 'Verification code Check email (required)',
            })
            expect(group).toBeInTheDocument()
        })

        it('gives the group a stable id when id prop is set', () => {
            render(
                <OTPInputV2
                    id="grouped-otp"
                    label="Code"
                    value=""
                    onChange={noopChange}
                    length={3}
                />
            )
            expect(screen.getByRole('group')).toHaveAttribute(
                'id',
                'grouped-otp-group'
            )
        })

        it('mirrors aria-describedby on the group and each cell for hint or error', () => {
            render(
                <OTPInputV2
                    id="sync-otp"
                    label="Code"
                    hintText="Hint here"
                    value=""
                    onChange={noopChange}
                    length={4}
                />
            )
            const group = screen.getByRole('group')
            const first = screen.getAllByRole('textbox')[0]!
            const described = first.getAttribute('aria-describedby')
            expect(described).toBeTruthy()
            expect(group.getAttribute('aria-describedby')).toBe(described)
        })

        it('exposes aria-invalid false when not in error', () => {
            render(
                <OTPInputV2
                    label="Code"
                    value=""
                    onChange={noopChange}
                    length={6}
                />
            )
            screen.getAllByRole('textbox').forEach((input) => {
                expect(input).toHaveAttribute('aria-invalid', 'false')
            })
        })

        it('exposes required state on cells', () => {
            render(
                <OTPInputV2
                    label="Code"
                    value=""
                    onChange={noopChange}
                    length={6}
                    required
                />
            )
            screen.getAllByRole('textbox').forEach((input) => {
                expect(input).toHaveAttribute('aria-required', 'true')
                expect(input).toBeRequired()
            })
        })

        it('exposes disabled state on cells', () => {
            render(
                <OTPInputV2
                    label="Code"
                    value="123456"
                    onChange={noopChange}
                    length={6}
                    disabled
                />
            )
            screen.getAllByRole('textbox').forEach((input) => {
                expect(input).toBeDisabled()
            })
        })

        it('supports indexed name attributes for identification', () => {
            render(
                <OTPInputV2
                    name="otp"
                    value=""
                    onChange={noopChange}
                    length={3}
                />
            )
            const inputs = screen.getAllByRole('textbox')
            expect(inputs[0]).toHaveAttribute('name', 'otp-0')
            expect(inputs[1]).toHaveAttribute('name', 'otp-1')
            expect(inputs[2]).toHaveAttribute('name', 'otp-2')
        })
    })

    describe('WCAG 2.1.1 Keyboard (Level A)', () => {
        it('focuses first cell for keyboard interaction', () => {
            render(
                <OTPInputV2
                    label="Code"
                    value=""
                    onChange={noopChange}
                    length={6}
                />
            )
            const inputs = screen.getAllByRole('textbox')
            act(() => {
                inputs[0]!.focus()
            })
            expect(document.activeElement).toBe(inputs[0])
        })

        it('supports Tab between cells', async () => {
            const { user } = render(
                <OTPInputV2
                    label="Code"
                    value=""
                    onChange={noopChange}
                    length={4}
                />
            )
            const inputs = screen.getAllByRole('textbox')
            await user.tab()
            expect(document.activeElement).toBe(inputs[0])
            await user.tab()
            expect(document.activeElement).toBe(inputs[1])
        })

        it('supports ArrowLeft and ArrowRight between cells', async () => {
            const { user } = render(
                <OTPInputV2
                    label="Code"
                    value=""
                    onChange={noopChange}
                    length={4}
                />
            )
            const inputs = screen.getAllByRole('textbox')
            await user.click(inputs[1]!)
            await user.keyboard('{ArrowLeft}')
            expect(document.activeElement).toBe(inputs[0])
            await user.keyboard('{ArrowRight}')
            expect(document.activeElement).toBe(inputs[1])
        })

        it('moves focus to previous cell on Backspace when current cell is empty', async () => {
            const { user } = render(
                <OTPInputV2
                    label="Code"
                    value=""
                    onChange={noopChange}
                    length={4}
                />
            )
            const inputs = screen.getAllByRole('textbox')
            await user.click(inputs[0]!)
            await user.keyboard('1')
            expect(inputs[1]).toHaveFocus()
            await user.keyboard('{Backspace}')
            expect(inputs[0]).toHaveFocus()
        })

        it('supports legacy Left and Right keys for screen reader parity', () => {
            render(
                <OTPInputV2
                    label="Code"
                    value=""
                    onChange={noopChange}
                    length={3}
                />
            )
            const inputs = screen.getAllByRole('textbox')
            inputs[1]!.focus()
            fireEvent.keyDown(inputs[1]!, { key: 'Left' })
            expect(inputs[0]).toHaveFocus()
            fireEvent.keyDown(inputs[0]!, { key: 'Right' })
            expect(inputs[1]).toHaveFocus()
        })

        it('disabled cells are not editable', () => {
            render(
                <OTPInputV2
                    label="Code"
                    value=""
                    onChange={noopChange}
                    length={6}
                    disabled
                />
            )
            screen.getAllByRole('textbox').forEach((input) => {
                expect(input).toBeDisabled()
            })
        })
    })

    describe('ARIA describedby and live regions', () => {
        it('associates hint with cells via aria-describedby when no error', () => {
            render(
                <OTPInputV2
                    id="hint-otp"
                    label="Code"
                    hintText="Digits only"
                    value=""
                    onChange={noopChange}
                    length={6}
                />
            )
            const hintEl = screen.getByText('Digits only')
            expect(hintEl).toHaveAttribute('id', 'hint-otp-hint')
            screen.getAllByRole('textbox').forEach((input) => {
                expect(input.getAttribute('aria-describedby')).toContain(
                    'hint-otp-hint'
                )
            })
        })

        it('associates error message with cells via aria-describedby when error', () => {
            render(
                <OTPInputV2
                    id="err-desc"
                    label="Code"
                    value=""
                    onChange={noopChange}
                    length={6}
                    error
                    errorMessage="Code mismatch"
                />
            )
            const first = screen.getAllByRole('textbox')[0]!
            const errorEl = screen.getByText('Code mismatch')
            expect(errorEl).toHaveAttribute('id', 'err-desc-error')
            expect(first.getAttribute('aria-describedby')).toBe(errorEl.id)
        })

        it('error message is exposed as an alert for announcements', () => {
            render(
                <OTPInputV2
                    label="Code"
                    value=""
                    onChange={noopChange}
                    length={6}
                    error
                    errorMessage="Bad code"
                />
            )
            const alert = screen.getByText('Bad code')
            expect(alert).toHaveAttribute('role', 'alert')
            expect(alert).toHaveAttribute('aria-live', 'polite')
        })
    })

    describe('WCAG 2.4.3 Focus Order (Level A)', () => {
        it('keeps sequential tab order across two OTP groups and a submit control', async () => {
            const { user } = render(
                <form>
                    <OTPInputV2
                        label="First OTP"
                        value=""
                        onChange={noopChange}
                        length={4}
                    />
                    <OTPInputV2
                        label="Second OTP"
                        value=""
                        onChange={noopChange}
                        length={3}
                    />
                    <button type="submit">Submit</button>
                </form>
            )

            const textboxes = screen.getAllByRole('textbox')
            expect(textboxes).toHaveLength(7)

            await user.tab()
            expect(document.activeElement).toBe(textboxes[0])
            await user.tab()
            expect(document.activeElement).toBe(textboxes[1])
            await user.tab()
            expect(document.activeElement).toBe(textboxes[2])
            await user.tab()
            expect(document.activeElement).toBe(textboxes[3])
            await user.tab()
            expect(document.activeElement).toBe(textboxes[4])
            await user.tab()
            expect(document.activeElement).toBe(textboxes[5])
            await user.tab()
            expect(document.activeElement).toBe(textboxes[6])
            await user.tab()
            expect(document.activeElement).toBe(
                screen.getByRole('button', { name: 'Submit' })
            )
        })
    })

    describe('Comprehensive axe', () => {
        it('passes axe with generic labels (no visible label string)', async () => {
            const { container } = render(
                <OTPInputV2 value="" onChange={noopChange} length={5} />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })
})
