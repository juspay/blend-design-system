import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, act } from '../../test-utils'
import { axe } from 'jest-axe'
import { Search, Filter } from 'lucide-react'
import SearchInputV2 from '../../../lib/components/InputsV2/SearchInputV2/SearchInputV2'

const noop = (): void => {}

describe('SearchInputV2 Accessibility', () => {
    describe('WCAG 2.1/2.2 Compliance (Level A, AA) — axe-core', () => {
        it('meets WCAG standards for default field with aria-label (axe-core validation)', async () => {
            const { container } = render(
                <SearchInputV2
                    aria-label="Site search"
                    value=""
                    onChange={noop}
                    placeholder="Search…"
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with left icon slot', async () => {
            const { container } = render(
                <SearchInputV2
                    aria-label="Search products"
                    value=""
                    onChange={noop}
                    placeholder="Search…"
                    leftSlot={<Search size={16} aria-hidden />}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with left and right slots', async () => {
            const { container } = render(
                <SearchInputV2
                    aria-label="Search with filter"
                    value=""
                    onChange={noop}
                    placeholder="Search…"
                    leftSlot={<Search size={16} aria-hidden />}
                    rightSlot={<Filter size={16} aria-hidden />}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards when disabled (2.1.1 Keyboard, 4.1.2 Name Role Value)', async () => {
            const { container } = render(
                <SearchInputV2
                    aria-label="Disabled search"
                    value="read-only"
                    onChange={noop}
                    disabled
                    leftSlot={<Search size={16} aria-hidden />}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with error styling (3.3.1 Error Identification)', async () => {
            const { container } = render(
                <SearchInputV2
                    aria-label="Search with error"
                    error
                    value="bad"
                    onChange={noop}
                    leftSlot={<Search size={16} aria-hidden />}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with non-empty value', async () => {
            const { container } = render(
                <SearchInputV2
                    aria-label="Search query"
                    value="q"
                    onChange={noop}
                    leftSlot={<Search size={16} aria-hidden />}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with autocomplete', async () => {
            const { container } = render(
                <SearchInputV2
                    aria-label="Address search"
                    name="address"
                    autoComplete="street-address"
                    value=""
                    onChange={noop}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 3.3.2 Labels or Instructions (Level A)', () => {
        it('exposes an accessible name via aria-label', () => {
            render(
                <SearchInputV2
                    aria-label="Product catalog search"
                    value=""
                    onChange={noop}
                    placeholder="Keywords"
                />
            )
            expect(
                screen.getByRole('searchbox', {
                    name: /product catalog search/i,
                })
            ).toBeInTheDocument()
        })
    })

    describe('WCAG 3.3.1 Error Identification (Level A)', () => {
        it('sets aria-invalid when error is true', () => {
            render(
                <SearchInputV2
                    aria-label="Search"
                    error
                    value=""
                    onChange={noop}
                />
            )
            expect(screen.getByRole('searchbox')).toHaveAttribute(
                'aria-invalid',
                'true'
            )
        })

        it('sets aria-invalid false when not in error', () => {
            render(
                <SearchInputV2 aria-label="Search" value="" onChange={noop} />
            )
            expect(screen.getByRole('searchbox')).toHaveAttribute(
                'aria-invalid',
                'false'
            )
        })
    })

    describe('WCAG 3.3.7 Redundant Entry (Level A - WCAG 2.2)', () => {
        it('supports autocomplete on the input', () => {
            render(
                <SearchInputV2
                    aria-label="Street"
                    autoComplete="street-address"
                    value=""
                    onChange={noop}
                />
            )
            expect(screen.getByRole('searchbox')).toHaveAttribute(
                'autocomplete',
                'street-address'
            )
        })
    })

    describe('WCAG 1.3.5 Identify Input Purpose (Level AA - WCAG 2.1)', () => {
        it('supports name attribute for input purpose', () => {
            render(
                <SearchInputV2
                    aria-label="Query"
                    name="q"
                    value=""
                    onChange={noop}
                />
            )
            expect(screen.getByRole('searchbox')).toHaveAttribute('name', 'q')
        })
    })

    describe('WCAG 2.1.1 Keyboard (Level A)', () => {
        it('is focusable on the searchbox', () => {
            render(
                <SearchInputV2 aria-label="Search" value="" onChange={noop} />
            )
            const input = screen.getByRole('searchbox')
            act(() => {
                input.focus()
            })
            expect(document.activeElement).toBe(input)
        })

        it('accepts keyboard input in the searchbox', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <SearchInputV2
                    aria-label="Search"
                    value=""
                    onChange={handleChange}
                />
            )
            const input = screen.getByRole('searchbox')
            await user.type(input, 'x')
            expect(handleChange).toHaveBeenCalled()
        })

        it('does not accept input when disabled', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <SearchInputV2
                    aria-label="Search"
                    value=""
                    onChange={handleChange}
                    disabled
                />
            )
            const input = screen.getByRole('searchbox')
            await user.type(input, 'x')
            expect(handleChange).not.toHaveBeenCalled()
        })
    })

    describe('WCAG 2.4.7 Focus Visible (Level AA)', () => {
        it('moves focus to the searchbox when focused programmatically', () => {
            render(
                <SearchInputV2 aria-label="Search" value="" onChange={noop} />
            )
            const input = screen.getByRole('searchbox')
            act(() => {
                input.focus()
            })
            expect(document.activeElement).toBe(input)
        })
    })

    describe('WCAG 2.4.3 Focus Order (Level A)', () => {
        it('tabs through multiple search fields in DOM order', async () => {
            const { user } = render(
                <form>
                    <SearchInputV2
                        aria-label="First search"
                        value=""
                        onChange={noop}
                    />
                    <SearchInputV2
                        aria-label="Second search"
                        value=""
                        onChange={noop}
                    />
                </form>
            )
            const first = screen.getByRole('searchbox', {
                name: /first search/i,
            })
            const second = screen.getByRole('searchbox', {
                name: /second search/i,
            })
            await user.tab()
            expect(document.activeElement).toBe(first)
            await user.tab()
            expect(document.activeElement).toBe(second)
        })
    })

    describe('WCAG 4.1.2 Name, Role, Value (Level A)', () => {
        it('exposes role searchbox', () => {
            render(
                <SearchInputV2 aria-label="Search" value="" onChange={noop} />
            )
            expect(screen.getByRole('searchbox')).toBeInTheDocument()
        })

        it('exposes disabled state when disabled is set', () => {
            render(
                <SearchInputV2
                    aria-label="Search"
                    disabled
                    value="x"
                    onChange={noop}
                />
            )
            expect(screen.getByRole('searchbox')).toBeDisabled()
        })
    })

    describe('Data attributes', () => {
        it('sets data-searchinput from placeholder and data-status', () => {
            const { rerender } = render(
                <SearchInputV2
                    aria-label="Search"
                    placeholder="Find"
                    value=""
                    onChange={noop}
                />
            )
            expect(
                document.querySelector('[data-searchinput="Find"]')
            ).toBeInTheDocument()
            expect(
                document.querySelector('[data-status="enabled"]')
            ).toBeInTheDocument()

            rerender(
                <SearchInputV2
                    aria-label="Search"
                    placeholder="Find"
                    value=""
                    onChange={noop}
                    disabled
                />
            )
            expect(
                document.querySelector('[data-status="disabled"]')
            ).toBeInTheDocument()
        })
    })
})
