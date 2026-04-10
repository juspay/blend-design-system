import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '../../test-utils'
import OTPInputV2 from '../../../lib/components/InputsV2/OTPInputV2/OTPInputV2'

const getCells = () => screen.getAllByRole('textbox')

describe('OTPInputV2', () => {
    describe('Rendering', () => {
        it('renders label and one textbox per length', () => {
            render(
                <OTPInputV2
                    label="Verification code"
                    length={4}
                    value=""
                    onChange={() => {}}
                />
            )
            expect(screen.getByText('Verification code')).toBeInTheDocument()
            expect(getCells()).toHaveLength(4)
        })

        it('renders sublabel when provided', () => {
            render(
                <OTPInputV2
                    label="Code"
                    sublabel="Check your email"
                    value=""
                    onChange={() => {}}
                />
            )
            expect(screen.getByText(/Check your email/)).toBeInTheDocument()
        })

        it('renders group with aria-label when label is set', () => {
            render(<OTPInputV2 label="OTP" value="" onChange={() => {}} />)
            expect(
                screen.getByRole('group', { name: /OTP/ })
            ).toBeInTheDocument()
        })

        it('renders per-cell aria-label including digit index', () => {
            render(
                <OTPInputV2
                    label="OTP"
                    length={3}
                    value=""
                    onChange={() => {}}
                />
            )
            expect(
                screen.getByRole('textbox', {
                    name: 'OTP digit 1 of 3',
                })
            ).toBeInTheDocument()
            expect(
                screen.getByRole('textbox', { name: 'OTP digit 2 of 3' })
            ).toBeInTheDocument()
        })

        it('renders hint text', () => {
            render(
                <OTPInputV2
                    label="Code"
                    value=""
                    onChange={() => {}}
                    hintText="6 digits from SMS"
                />
            )
            expect(screen.getByText('6 digits from SMS')).toBeInTheDocument()
        })

        it('renders error message when error and errorMessage are set', () => {
            render(
                <OTPInputV2
                    label="Code"
                    value=""
                    onChange={() => {}}
                    error
                    errorMessage="Invalid code"
                />
            )
            expect(screen.getByRole('alert')).toHaveTextContent('Invalid code')
        })

        it('sets aria-invalid on cells when error is true', () => {
            render(
                <OTPInputV2 label="Code" value="" onChange={() => {}} error />
            )
            getCells().forEach((input) => {
                expect(input).toHaveAttribute('aria-invalid', 'true')
            })
        })

        it('sets aria-required on cells when required', () => {
            render(
                <OTPInputV2
                    label="Code"
                    value=""
                    onChange={() => {}}
                    required
                />
            )
            getCells().forEach((input) => {
                expect(input).toHaveAttribute('aria-required', 'true')
                expect(input).toBeRequired()
            })
        })
    })

    describe('Typing and onChange', () => {
        it('calls onChange with joined digits as user types', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <OTPInputV2
                    label="Code"
                    length={4}
                    value=""
                    onChange={onChange}
                />
            )
            const inputs = getCells()
            await user.click(inputs[0]!)
            await user.keyboard('1')
            expect(onChange).toHaveBeenLastCalledWith('1')
            await user.keyboard('2')
            expect(onChange).toHaveBeenLastCalledWith('12')
        })

        it('replaces the focused cell when entering a different digit over an existing one', async () => {
            const { user } = render(
                <OTPInputV2 length={4} value="" onChange={() => {}} />
            )
            const inputs = getCells()
            await user.click(inputs[0]!)
            await user.keyboard('1')
            await user.keyboard('2')
            expect(inputs[0]).toHaveValue('1')
            expect(inputs[1]).toHaveValue('2')
            await user.click(inputs[0]!)
            fireEvent.change(inputs[0]!, { target: { value: '9' } })
            expect(inputs[0]).toHaveValue('9')
            expect(inputs[1]).toHaveValue('2')
        })

        it('does not call onChange when typing a non-digit', async () => {
            const onChange = vi.fn()
            const { user } = render(<OTPInputV2 value="" onChange={onChange} />)
            const inputs = getCells()
            await user.click(inputs[0]!)
            onChange.mockClear()
            await user.keyboard('a')
            expect(onChange).not.toHaveBeenCalled()
        })

        it('distributes multi-digit onChange across cells (e.g. SMS autofill)', () => {
            const onChange = vi.fn()
            render(<OTPInputV2 length={4} value="" onChange={onChange} />)
            const inputs = getCells()
            fireEvent.change(inputs[0]!, { target: { value: '1234' } })
            expect(onChange).toHaveBeenLastCalledWith('1234')
            const after = getCells()
            expect(after[0]).toHaveValue('1')
            expect(after[3]).toHaveValue('4')
        })

        it('strips non-digits from multi-character onChange', () => {
            const onChange = vi.fn()
            render(<OTPInputV2 length={4} value="" onChange={onChange} />)
            fireEvent.change(getCells()[0]!, { target: { value: '12-34' } })
            expect(onChange).toHaveBeenLastCalledWith('1234')
        })
    })

    describe('Paste', () => {
        it('fills digits from paste and calls onChange with full string', () => {
            const onChange = vi.fn()
            render(<OTPInputV2 length={6} value="" onChange={onChange} />)
            const inputs = getCells()
            fireEvent.paste(inputs[2]!, {
                clipboardData: {
                    getData: () => '123456',
                },
            })
            expect(onChange).toHaveBeenCalledWith('123456')
            const after = getCells()
            expect(after[0]).toHaveValue('1')
            expect(after[5]).toHaveValue('6')
        })

        it('strips non-digits from pasted text', () => {
            const onChange = vi.fn()
            render(<OTPInputV2 length={4} value="" onChange={onChange} />)
            fireEvent.paste(getCells()[0]!, {
                clipboardData: {
                    getData: () => '12-34',
                },
            })
            expect(onChange).toHaveBeenCalledWith('1234')
        })
    })

    describe('Keyboard navigation', () => {
        it('moves focus to previous cell on Backspace when current is empty', async () => {
            const { user } = render(
                <OTPInputV2 length={4} value="" onChange={() => {}} />
            )
            const inputs = getCells()
            await user.click(inputs[0]!)
            await user.keyboard('1')
            expect(inputs[1]).toHaveFocus()
            await user.keyboard('{Backspace}')
            expect(inputs[0]).toHaveFocus()
        })

        it('moves focus with ArrowLeft and ArrowRight', async () => {
            const { user } = render(
                <OTPInputV2 length={3} value="" onChange={() => {}} />
            )
            const inputs = getCells()
            await user.click(inputs[1]!)
            await user.keyboard('{ArrowLeft}')
            expect(inputs[0]).toHaveFocus()
            await user.keyboard('{ArrowRight}')
            expect(inputs[1]).toHaveFocus()
        })
    })

    describe('Disabled', () => {
        it('disables all inputs', () => {
            render(<OTPInputV2 value="123456" onChange={() => {}} disabled />)
            getCells().forEach((input) => {
                expect(input).toBeDisabled()
            })
        })
    })

    describe('Name and id', () => {
        it('applies indexed name attributes when name is set', () => {
            render(
                <OTPInputV2
                    name="otp"
                    length={3}
                    value=""
                    onChange={() => {}}
                />
            )
            const inputs = getCells()
            expect(inputs[0]).toHaveAttribute('name', 'otp-0')
            expect(inputs[1]).toHaveAttribute('name', 'otp-1')
            expect(inputs[2]).toHaveAttribute('name', 'otp-2')
        })

        it('uses custom id prefix for inputs when id is provided', () => {
            render(
                <OTPInputV2
                    id="my-otp"
                    length={2}
                    value=""
                    onChange={() => {}}
                />
            )
            expect(getCells()[0]).toHaveAttribute('id', 'my-otp-0')
            expect(getCells()[1]).toHaveAttribute('id', 'my-otp-1')
        })
    })

    describe('Ref forwarding', () => {
        it('forwards ref to the first input element', () => {
            const ref = React.createRef<HTMLInputElement>()
            render(
                <OTPInputV2
                    label="Code"
                    value=""
                    onChange={() => {}}
                    ref={ref}
                />
            )
            expect(ref.current).toBeInstanceOf(HTMLInputElement)
            expect(ref.current).toBe(getCells()[0])
        })
    })

    describe('rest onKeyDown', () => {
        it('invokes consumer onKeyDown after internal handler', async () => {
            const restOnKeyDown = vi.fn()
            const { user } = render(
                <OTPInputV2
                    value=""
                    onChange={() => {}}
                    onKeyDown={restOnKeyDown}
                />
            )
            const first = getCells()[0]!
            await user.click(first)
            await user.keyboard('{ArrowRight}')
            expect(restOnKeyDown).toHaveBeenCalled()
        })
    })
})
