import React, { useState } from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, act } from '../../test-utils'
import SearchInputV2 from '../../../lib/components/InputsV2/SearchInputV2/SearchInputV2'
import { Search } from 'lucide-react'

const defaultProps = {
    value: '',
    onChange: () => {},
    placeholder: 'Search',
}

describe('SearchInputV2', () => {
    describe('Rendering', () => {
        it('renders a searchbox and placeholder', () => {
            render(<SearchInputV2 {...defaultProps} />)
            expect(screen.getByRole('searchbox')).toBeInTheDocument()
            expect(screen.getByPlaceholderText('Search')).toBeInTheDocument()
        })

        it('sets data-searchinput from placeholder and data-status', () => {
            const { rerender } = render(
                <SearchInputV2 {...defaultProps} placeholder="Find" />
            )
            expect(
                document.querySelector('[data-searchinput="Find"]')
            ).toBeInTheDocument()
            expect(
                document.querySelector('[data-status="enabled"]')
            ).toBeInTheDocument()

            rerender(
                <SearchInputV2 {...defaultProps} placeholder="Find" disabled />
            )
            expect(
                document.querySelector('[data-status="disabled"]')
            ).toBeInTheDocument()
        })

        it('renders left slot container when leftSlot is set', () => {
            render(
                <SearchInputV2
                    {...defaultProps}
                    leftSlot={<Search size={16} data-testid="left-icon" />}
                />
            )
            expect(
                document.querySelector('[data-element="left-slot"]')
            ).toBeInTheDocument()
            expect(screen.getByTestId('left-icon')).toBeInTheDocument()
        })

        it('renders right slot container when rightSlot is set', () => {
            render(
                <SearchInputV2
                    {...defaultProps}
                    rightSlot={<span data-testid="right-extra">Filter</span>}
                />
            )
            expect(
                document.querySelector('[data-element="right-slot"]')
            ).toBeInTheDocument()
            expect(screen.getByTestId('right-extra')).toBeInTheDocument()
        })
    })

    describe('Controlled value', () => {
        it('displays the controlled value', () => {
            render(
                <SearchInputV2
                    {...defaultProps}
                    value="query"
                    onChange={() => {}}
                />
            )
            expect(screen.getByRole('searchbox')).toHaveValue('query')
        })

        it('calls onChange when the user types', async () => {
            const handleChange = vi.fn()
            const Controlled = () => {
                const [v, setV] = useState('')
                return (
                    <SearchInputV2
                        {...defaultProps}
                        value={v}
                        onChange={(e) => {
                            setV(e.target.value)
                            handleChange(e)
                        }}
                    />
                )
            }
            const { user } = render(<Controlled />)
            const input = screen.getByRole('searchbox')
            await user.type(input, 'a')
            expect(handleChange).toHaveBeenCalled()
            expect(handleChange.mock.calls.at(-1)?.[0].target.value).toBe('a')
            expect(input).toHaveValue('a')
        })
    })

    describe('States', () => {
        it('disables the input when disabled is true', () => {
            render(
                <SearchInputV2
                    {...defaultProps}
                    value="x"
                    onChange={() => {}}
                    disabled
                />
            )
            expect(screen.getByRole('searchbox')).toBeDisabled()
        })

        it('sets aria-invalid to true when error is true', () => {
            render(
                <SearchInputV2
                    {...defaultProps}
                    error
                    value=""
                    onChange={() => {}}
                />
            )
            expect(screen.getByRole('searchbox')).toHaveAttribute(
                'aria-invalid',
                'true'
            )
        })

        it('sets aria-invalid to false when error is false', () => {
            render(<SearchInputV2 {...defaultProps} />)
            expect(screen.getByRole('searchbox')).toHaveAttribute(
                'aria-invalid',
                'false'
            )
        })

        it('sets required on the input when required is passed', () => {
            render(
                <SearchInputV2
                    {...defaultProps}
                    required
                    value=""
                    onChange={() => {}}
                />
            )
            expect(screen.getByRole('searchbox')).toBeRequired()
        })
    })

    describe('Clear behavior', () => {
        it('calls onClear when provided and the built-in clear area is clicked', async () => {
            const onClear = vi.fn()
            const onChange = vi.fn()
            const { user } = render(
                <SearchInputV2
                    {...defaultProps}
                    value="text"
                    onChange={onChange}
                    onClear={onClear}
                    allowClear
                    leftSlot={<Search size={16} aria-hidden />}
                />
            )
            const rightSlot = document.querySelector(
                '[data-element="right-slot"]'
            )
            expect(rightSlot).toBeTruthy()
            await user.click(rightSlot!)
            expect(onClear).toHaveBeenCalledTimes(1)
            expect(onChange).not.toHaveBeenCalled()
        })

        it('calls onChange with empty value when clearing without onClear', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <SearchInputV2
                    {...defaultProps}
                    value="text"
                    onChange={onChange}
                    allowClear
                    leftSlot={<Search size={16} aria-hidden />}
                />
            )
            const rightSlot = document.querySelector(
                '[data-element="right-slot"]'
            )
            await user.click(rightSlot!)
            expect(onChange).toHaveBeenCalledTimes(1)
            expect(onChange.mock.calls[0]?.[0].target.value).toBe('')
        })

        it('does not show built-in clear when allowClear is false', () => {
            render(
                <SearchInputV2
                    {...defaultProps}
                    value="filled"
                    onChange={() => {}}
                    allowClear={false}
                    leftSlot={<Search size={16} aria-hidden />}
                />
            )
            expect(
                document.querySelector('[data-element="right-slot"]')
            ).toBeNull()
        })
    })

    describe('Events', () => {
        it('calls onFocus and onBlur on the searchbox', () => {
            const onFocus = vi.fn()
            const onBlur = vi.fn()
            render(
                <SearchInputV2
                    {...defaultProps}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
            )
            const input = screen.getByRole('searchbox')
            act(() => {
                input.focus()
            })
            expect(onFocus).toHaveBeenCalledTimes(1)
            act(() => {
                input.blur()
            })
            expect(onBlur).toHaveBeenCalledTimes(1)
        })
    })

    describe('Form attributes', () => {
        it('applies name to the input', () => {
            render(
                <SearchInputV2
                    {...defaultProps}
                    name="q"
                    value=""
                    onChange={() => {}}
                />
            )
            expect(screen.getByRole('searchbox')).toHaveAttribute('name', 'q')
        })

        it('applies id to the input when provided', () => {
            render(
                <SearchInputV2
                    {...defaultProps}
                    id="site-search"
                    value=""
                    onChange={() => {}}
                />
            )
            expect(screen.getByRole('searchbox')).toHaveAttribute(
                'id',
                'site-search'
            )
        })
    })

    describe('Ref forwarding', () => {
        it('forwards ref to the input element', () => {
            const ref = React.createRef<HTMLInputElement>()
            render(<SearchInputV2 {...defaultProps} ref={ref} />)
            expect(ref.current).toBeInstanceOf(HTMLInputElement)
            expect(ref.current?.getAttribute('role')).toBe('searchbox')
        })
    })
})
