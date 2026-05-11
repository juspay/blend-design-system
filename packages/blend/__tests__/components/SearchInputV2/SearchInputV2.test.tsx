import React, { useState } from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, act } from '../../test-utils'
import SearchInputV2 from '../../../lib/components/InputsV2/SearchInputV2/SearchInputV2'
import type { SearchInputV2TokensType } from '../../../lib/components/InputsV2/SearchInputV2/SearchInputV2.tokens'
import {
    createSearchInputV2ClearHandler,
    getSearchInputV2InputStateKey,
    getSearchInputV2PaddingInline,
    getSearchInputV2PrimitiveInputChrome,
    getSearchInputV2SlotWrapperStyle,
    shouldShowSearchInputV2Clear,
    toPixels,
} from '../../../lib/components/InputsV2/SearchInputV2/utils'
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

        it('does not render built-in clear when disabled', () => {
            render(
                <SearchInputV2
                    {...defaultProps}
                    value="text"
                    onChange={() => {}}
                    allowClear
                    disabled
                    leftSlot={<Search size={16} aria-hidden />}
                />
            )
            expect(
                document.querySelector('[data-element="right-slot"]')
            ).toBeNull()
        })

        it('exposes built-in clear as a named button for accessibility', () => {
            render(
                <SearchInputV2
                    {...defaultProps}
                    value="text"
                    onChange={() => {}}
                    allowClear
                    leftSlot={<Search size={16} aria-hidden />}
                />
            )
            const clearBtn = screen.getByRole('button', {
                name: 'Clear search',
            })
            expect(clearBtn).toHaveAttribute('data-element', 'right-slot')
        })

        it('does not use button semantics on right slot when rightSlot is custom', () => {
            render(
                <SearchInputV2
                    {...defaultProps}
                    value="text"
                    onChange={() => {}}
                    allowClear
                    rightSlot={<span data-testid="custom">x</span>}
                />
            )
            expect(
                screen.queryByRole('button', { name: 'Clear search' })
            ).toBeNull()
            expect(screen.getByTestId('custom')).toBeInTheDocument()
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

    describe('utils', () => {
        describe('toPixels', () => {
            it('returns numbers unchanged', () => {
                expect(toPixels(12)).toBe(12)
            })

            it('parses px strings', () => {
                expect(toPixels('16px')).toBe(16)
            })

            it('returns 0 for undefined', () => {
                expect(toPixels(undefined)).toBe(0)
            })
        })

        describe('getSearchInputV2InputStateKey', () => {
            it('returns error when error is true', () => {
                expect(getSearchInputV2InputStateKey(true, false, false)).toBe(
                    'error'
                )
            })

            it('returns focus when focused and not in error', () => {
                expect(getSearchInputV2InputStateKey(false, true, false)).toBe(
                    'focus'
                )
            })

            it('returns disabled when disabled and not error', () => {
                expect(getSearchInputV2InputStateKey(false, false, true)).toBe(
                    'disabled'
                )
            })

            it('returns disabled over focus when focused while disabled', () => {
                expect(getSearchInputV2InputStateKey(false, true, true)).toBe(
                    'disabled'
                )
            })

            it('returns error over disabled when error and disabled', () => {
                expect(getSearchInputV2InputStateKey(true, true, true)).toBe(
                    'error'
                )
            })

            it('returns default otherwise', () => {
                expect(getSearchInputV2InputStateKey(false, false, false)).toBe(
                    'default'
                )
            })
        })

        describe('shouldShowSearchInputV2Clear', () => {
            it('is true when allowed, has value, and not disabled', () => {
                expect(shouldShowSearchInputV2Clear(true, 'a', false)).toBe(
                    true
                )
            })

            it('is false when disabled', () => {
                expect(shouldShowSearchInputV2Clear(true, 'a', true)).toBe(
                    false
                )
            })

            it('is false when allowClear is false', () => {
                expect(shouldShowSearchInputV2Clear(false, 'a', false)).toBe(
                    false
                )
            })

            it('is false when value is empty', () => {
                expect(shouldShowSearchInputV2Clear(true, '', false)).toBe(
                    false
                )
            })
        })

        describe('createSearchInputV2ClearHandler', () => {
            it('does nothing when disabled', () => {
                const onClear = vi.fn()
                const onChange = vi.fn()
                const fn = createSearchInputV2ClearHandler({
                    disabled: true,
                    onClear,
                    onChange,
                })
                fn()
                expect(onClear).not.toHaveBeenCalled()
                expect(onChange).not.toHaveBeenCalled()
            })

            it('prefers onClear when provided', () => {
                const onClear = vi.fn()
                const onChange = vi.fn()
                const fn = createSearchInputV2ClearHandler({
                    disabled: false,
                    onClear,
                    onChange,
                })
                fn()
                expect(onClear).toHaveBeenCalledTimes(1)
                expect(onChange).not.toHaveBeenCalled()
            })

            it('calls onChange with empty value when onClear is omitted', () => {
                const onChange = vi.fn()
                const fn = createSearchInputV2ClearHandler({
                    disabled: false,
                    onChange,
                })
                fn()
                expect(onChange).toHaveBeenCalledTimes(1)
                expect(onChange.mock.calls[0]?.[0].target.value).toBe('')
            })
        })

        describe('getSearchInputV2PaddingInline', () => {
            it('uses paddingX only when there are no slots', () => {
                expect(
                    getSearchInputV2PaddingInline({
                        paddingX: 8,
                        gap: 4,
                        hasLeftSlot: false,
                        leftSlotWidth: 0,
                        hasRightSlot: false,
                        rightSlotWidth: 0,
                    })
                ).toEqual({
                    paddingInlineStart: 8,
                    paddingInlineEnd: 8,
                })
            })

            it('adds left slot width and gap to inline start', () => {
                expect(
                    getSearchInputV2PaddingInline({
                        paddingX: 8,
                        gap: 4,
                        hasLeftSlot: true,
                        leftSlotWidth: 20,
                        hasRightSlot: false,
                        rightSlotWidth: 0,
                    })
                ).toEqual({
                    paddingInlineStart: 8 + 20 + 4,
                    paddingInlineEnd: 8,
                })
            })
        })

        describe('getSearchInputV2SlotWrapperStyle', () => {
            it('maps transition, transform, and state color', () => {
                const slot = {
                    transition: 'color 200ms',
                    transform: 'scale(1)',
                    color: {
                        default: '#111',
                        hover: '#222',
                        focus: '#333',
                        error: '#444',
                        disabled: '#555',
                    },
                } as SearchInputV2TokensType['inputContainer']['slot']
                expect(getSearchInputV2SlotWrapperStyle(slot, 'focus')).toEqual(
                    {
                        transition: 'color 200ms',
                        transform: 'scale(1)',
                        color: '#333',
                    }
                )
            })
        })

        describe('getSearchInputV2PrimitiveInputChrome', () => {
            const mockIc = {
                borderBottom: {
                    default: '1px solid a',
                    hover: '1px solid b',
                    focus: '1px solid c',
                    error: '1px solid d',
                    disabled: '1px solid e',
                },
                color: {
                    default: 'ca',
                    hover: 'cb',
                    focus: 'cc',
                    error: 'cd',
                    disabled: 'ce',
                },
            } as SearchInputV2TokensType['inputContainer']

            it('uses disabled chrome when disabled', () => {
                const c = getSearchInputV2PrimitiveInputChrome(
                    mockIc,
                    true,
                    false
                )
                expect(c.borderBottom).toBe('1px solid e')
                expect(c.color).toBe('ce')
                expect(c.hover.borderBottom).toBe('1px solid e')
                expect(c.focus.borderBottom).toBe('1px solid e')
            })

            it('uses error chrome when error and not disabled', () => {
                const c = getSearchInputV2PrimitiveInputChrome(
                    mockIc,
                    false,
                    true
                )
                expect(c.borderBottom).toBe('1px solid d')
                expect(c.color).toBe('cd')
            })

            it('uses default and hover/focus tokens when enabled without error', () => {
                const c = getSearchInputV2PrimitiveInputChrome(
                    mockIc,
                    false,
                    false
                )
                expect(c.borderBottom).toBe('1px solid a')
                expect(c.color).toBe('ca')
                expect(c.hover.borderBottom).toBe('1px solid b')
                expect(c.focus.borderBottom).toBe('1px solid c')
            })
        })
    })
})
