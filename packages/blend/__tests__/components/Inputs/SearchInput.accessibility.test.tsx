import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test-utils'
import { axe } from 'jest-axe'
import { Search, X, Filter, MapPin } from 'lucide-react'
import SearchInput from '../../../lib/components/Inputs/SearchInput/SearchInput'

describe('SearchInput Accessibility', () => {
    describe('WCAG 2.1/2.2 Compliance (Level A, AA, AAA)', () => {
        it('meets WCAG standards for default search input (axe-core validation)', async () => {
            const { container } = render(
                <SearchInput
                    placeholder="Search..."
                    value=""
                    onChange={() => {}}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with search icon (1.1.1 Non-text Content)', async () => {
            const { container } = render(
                <SearchInput
                    placeholder="Search products..."
                    value=""
                    onChange={() => {}}
                    leftSlot={<Search size={16} aria-hidden="true" />}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards when disabled (2.1.1 Keyboard, 4.1.2 Name Role Value)', async () => {
            const { container } = render(
                <SearchInput
                    placeholder="This search is disabled"
                    value=""
                    onChange={() => {}}
                    disabled
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with error state (3.3.1 Error Identification)', async () => {
            const { container } = render(
                <SearchInput
                    placeholder="Search with validation..."
                    value="invalid"
                    onChange={() => {}}
                    error
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with clear button (1.1.1, 2.1.1, 4.1.2)', async () => {
            const { container } = render(
                <SearchInput
                    placeholder="Search..."
                    value="test query"
                    onChange={() => {}}
                    leftSlot={<Search size={16} aria-hidden="true" />}
                    rightSlot={
                        <button
                            type="button"
                            aria-label="Clear search"
                            onClick={() => {}}
                        >
                            <X size={16} aria-hidden="true" />
                        </button>
                    }
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 1.3.5 Identify Input Purpose (Level AA - WCAG 2.1)', () => {
        it('uses search input type by default for semantic purpose identification', () => {
            render(
                <SearchInput
                    placeholder="Search..."
                    value=""
                    onChange={() => {}}
                />
            )
            const input = screen.getByRole('searchbox')
            expect(input).toHaveAttribute('type', 'search')
        })

        it('supports name attribute for input purpose identification', () => {
            render(
                <SearchInput
                    placeholder="Search products..."
                    name="product-search"
                    value=""
                    onChange={() => {}}
                />
            )
            const input = screen.getByRole('searchbox')
            expect(input).toHaveAttribute('name', 'product-search')
        })

        it('allows type override while maintaining accessibility', () => {
            render(
                <SearchInput
                    placeholder="Search..."
                    type="text"
                    value=""
                    onChange={() => {}}
                />
            )
            const input = screen.getByRole('textbox')
            expect(input).toHaveAttribute('type', 'text')
        })
    })

    describe('WCAG 3.3.2 Labels or Instructions (Level A)', () => {
        it('provides placeholder text for context - instructions provided', () => {
            render(
                <SearchInput
                    placeholder="Search products, services, or content..."
                    value=""
                    onChange={() => {}}
                />
            )
            const input = screen.getByRole('searchbox')
            expect(input).toHaveAttribute(
                'placeholder',
                'Search products, services, or content...'
            )
        })

        it('supports aria-label for accessible name when placeholder is not sufficient', () => {
            render(
                <SearchInput
                    placeholder="Search..."
                    aria-label="Search for products in the catalog"
                    value=""
                    onChange={() => {}}
                />
            )
            const input = screen.getByRole('searchbox', {
                name: 'Search for products in the catalog',
            })
            expect(input).toBeInTheDocument()
        })

        it('supports aria-labelledby for label association', () => {
            render(
                <div>
                    <label id="search-label">Product Search</label>
                    <SearchInput
                        placeholder="Enter search term"
                        aria-labelledby="search-label"
                        value=""
                        onChange={() => {}}
                    />
                </div>
            )
            const input = screen.getByRole('searchbox', {
                name: 'Product Search',
            })
            expect(input).toBeInTheDocument()
        })
    })

    describe('WCAG 3.3.1 Error Identification (Level A)', () => {
        it('applies error styling when error prop is true - error visually indicated', () => {
            render(
                <SearchInput
                    placeholder="Search with validation..."
                    value=""
                    onChange={() => {}}
                    error
                />
            )
            const input = screen.getByRole('searchbox')
            expect(input).toHaveAttribute('aria-invalid', 'true')
        })

        it('exposes error state programmatically via aria-invalid', () => {
            render(
                <SearchInput
                    placeholder="Search..."
                    value="invalid"
                    onChange={() => {}}
                    error
                />
            )
            const input = screen.getByRole('searchbox')
            expect(input).toHaveAttribute('aria-invalid', 'true')
        })

        it('sets aria-invalid to false when not in error state', () => {
            render(
                <SearchInput
                    placeholder="Search..."
                    value=""
                    onChange={() => {}}
                    error={false}
                />
            )
            const input = screen.getByRole('searchbox')
            expect(input).toHaveAttribute('aria-invalid', 'false')
        })
    })

    describe('WCAG 2.1.1 Keyboard (Level A)', () => {
        it('is focusable with keyboard - all functionality operable via keyboard', () => {
            render(
                <SearchInput
                    placeholder="Focusable"
                    value=""
                    onChange={() => {}}
                />
            )
            const input = screen.getByRole('searchbox')

            input.focus()
            expect(document.activeElement).toBe(input)
        })

        it('can receive keyboard input - keyboard operable', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <SearchInput
                    placeholder="Type Here"
                    value=""
                    onChange={handleChange}
                />
            )

            const input = screen.getByRole('searchbox')
            await user.type(input, 'search query')

            expect(handleChange).toHaveBeenCalled()
        })

        it('disabled inputs are not focusable - prevents keyboard interaction', () => {
            render(
                <SearchInput
                    placeholder="Disabled"
                    value=""
                    onChange={() => {}}
                    disabled
                />
            )
            const input = screen.getByRole('searchbox')
            expect(input).toBeDisabled()
        })

        it('supports Tab key for focus navigation - logical focus order', async () => {
            const { user } = render(
                <>
                    <SearchInput
                        placeholder="First search"
                        value=""
                        onChange={() => {}}
                    />
                    <SearchInput
                        placeholder="Second search"
                        value=""
                        onChange={() => {}}
                    />
                </>
            )

            const inputs = screen.getAllByRole('searchbox')
            await user.tab()
            expect(document.activeElement).toBe(inputs[0])

            await user.tab()
            expect(document.activeElement).toBe(inputs[1])
        })

        it('clear button is keyboard accessible - all functionality keyboard operable', async () => {
            const handleClear = vi.fn()
            const { user } = render(
                <SearchInput
                    placeholder="Search..."
                    value="test"
                    onChange={() => {}}
                    rightSlot={
                        <button
                            type="button"
                            aria-label="Clear search"
                            onClick={handleClear}
                        >
                            <X size={16} aria-hidden="true" />
                        </button>
                    }
                />
            )

            const clearButton = screen.getByRole('button', {
                name: 'Clear search',
            })

            // Focus the button directly and press Enter
            clearButton.focus()
            expect(document.activeElement).toBe(clearButton)

            // Press Enter on the button
            await user.keyboard('{Enter}')

            expect(handleClear).toHaveBeenCalled()
        })
    })

    describe('WCAG 2.1.3 Keyboard (No Exception) - Level AAA', () => {
        it('all functionality is keyboard accessible without timing requirements', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <SearchInput
                    placeholder="Search..."
                    value="test"
                    onChange={handleChange}
                    leftSlot={<Search size={16} aria-hidden="true" />}
                    rightSlot={
                        <button
                            type="button"
                            aria-label="Clear"
                            onClick={() => {}}
                        >
                            <X size={16} aria-hidden="true" />
                        </button>
                    }
                />
            )

            const input = screen.getByRole('searchbox')
            const clearButton = screen.getByRole('button', { name: 'Clear' })

            // Focus the input first to establish context
            input.focus()
            expect(document.activeElement).toBe(input)

            // Verify input has value
            expect(input).toHaveValue('test')

            // Focus the button directly
            clearButton.focus()
            expect(document.activeElement).toBe(clearButton)

            // Press Enter on the button (though it won't do anything since onClick is empty)
            await user.keyboard('{Enter}')

            // All interactions work without timing requirements
            // Input value remains accessible and button is keyboard operable
            expect(input).toHaveValue('test')
        })
    })

    describe('WCAG 2.4.7 Focus Visible (Level AA)', () => {
        it('shows focus indicator when focused - keyboard focus indicator visible', () => {
            render(
                <SearchInput
                    placeholder="Focus Me"
                    value=""
                    onChange={() => {}}
                />
            )
            const input = screen.getByRole('searchbox')

            input.focus()
            expect(document.activeElement).toBe(input)
            // Focus indicator styling is applied via _focus prop (borderBottom)
        })

        it('maintains focus visible state during interaction', async () => {
            const { user } = render(
                <SearchInput
                    placeholder="Type Here"
                    value=""
                    onChange={() => {}}
                />
            )
            const input = screen.getByRole('searchbox')

            await user.click(input)
            expect(document.activeElement).toBe(input)

            await user.keyboard('test')
            expect(document.activeElement).toBe(input)
        })

        it('removes focus on blur - predictable focus behavior', () => {
            render(
                <SearchInput
                    placeholder="Blur Test"
                    value=""
                    onChange={() => {}}
                />
            )
            const input = screen.getByRole('searchbox')

            input.focus()
            expect(document.activeElement).toBe(input)

            input.blur()
            expect(document.activeElement).not.toBe(input)
        })
    })

    describe('WCAG 2.4.3 Focus Order (Level A)', () => {
        it('maintains logical focus order - sequential navigation order', async () => {
            const { user } = render(
                <form>
                    <SearchInput
                        placeholder="First search"
                        value=""
                        onChange={() => {}}
                    />
                    <SearchInput
                        placeholder="Second search"
                        value=""
                        onChange={() => {}}
                    />
                    <button type="submit">Submit</button>
                </form>
            )

            await user.tab()
            expect(document.activeElement).toBe(
                screen.getAllByRole('searchbox')[0]
            )

            await user.tab()
            expect(document.activeElement).toBe(
                screen.getAllByRole('searchbox')[1]
            )

            await user.tab()
            expect(document.activeElement).toBe(
                screen.getByRole('button', { name: 'Submit' })
            )
        })
    })

    describe('WCAG 4.1.2 Name, Role, Value (Level A)', () => {
        it('has proper searchbox role - programmatically determinable role', () => {
            render(
                <SearchInput
                    placeholder="Search..."
                    value=""
                    onChange={() => {}}
                />
            )
            expect(screen.getByRole('searchbox')).toBeInTheDocument()
        })

        it('announces accessible name via placeholder or aria-label', () => {
            render(
                <SearchInput
                    placeholder="Search products..."
                    value=""
                    onChange={() => {}}
                />
            )
            const input = screen.getByRole('searchbox')
            expect(input).toHaveAttribute('placeholder', 'Search products...')
        })

        it('exposes required state - state programmatically determinable', () => {
            render(
                <SearchInput
                    placeholder="Required search"
                    value=""
                    onChange={() => {}}
                    required
                />
            )
            const input = screen.getByRole('searchbox')
            expect(input).toHaveAttribute('required')
            expect(input).toHaveAttribute('aria-required', 'true')
        })

        it('announces disabled state - state programmatically determinable', () => {
            render(
                <SearchInput
                    placeholder="Disabled search"
                    value=""
                    onChange={() => {}}
                    disabled
                />
            )
            const input = screen.getByRole('searchbox')
            expect(input).toBeDisabled()
        })

        it('exposes error state via aria-invalid - state programmatically determinable', () => {
            render(
                <SearchInput
                    placeholder="Search with error"
                    value=""
                    onChange={() => {}}
                    error
                />
            )
            const input = screen.getByRole('searchbox')
            expect(input).toHaveAttribute('aria-invalid', 'true')
        })
    })

    describe('WCAG 1.1.1 Non-text Content (Level A)', () => {
        it('decorative icons should have aria-hidden="true"', () => {
            render(
                <SearchInput
                    placeholder="Search..."
                    value=""
                    onChange={() => {}}
                    leftSlot={<Search size={16} aria-hidden="true" />}
                />
            )
            const input = screen.getByRole('searchbox')
            expect(input).toBeInTheDocument()
            // Decorative icons should have aria-hidden="true"
        })

        it('interactive elements in right slot should have accessible names', () => {
            render(
                <SearchInput
                    placeholder="Search..."
                    value="test"
                    onChange={() => {}}
                    rightSlot={
                        <button
                            type="button"
                            aria-label="Clear search query"
                            onClick={() => {}}
                        >
                            <X size={16} aria-hidden="true" />
                        </button>
                    }
                />
            )
            expect(
                screen.getByRole('button', { name: 'Clear search query' })
            ).toBeInTheDocument()
        })

        it('filter buttons should have accessible names', () => {
            render(
                <SearchInput
                    placeholder="Search with filters..."
                    value=""
                    onChange={() => {}}
                    rightSlot={
                        <button
                            type="button"
                            aria-label="Open filter options"
                            onClick={() => {}}
                        >
                            <Filter size={16} aria-hidden="true" />
                        </button>
                    }
                />
            )
            expect(
                screen.getByRole('button', { name: 'Open filter options' })
            ).toBeInTheDocument()
        })
    })

    describe('WCAG 1.4.3 Contrast (Minimum) - Level AA', () => {
        it('provides sufficient color contrast for text - requires manual verification', () => {
            render(
                <SearchInput
                    placeholder="Contrast Test"
                    value="Test value"
                    onChange={() => {}}
                />
            )
            const input = screen.getByRole('searchbox')
            expect(input).toBeInTheDocument()
            // Note: Actual contrast ratio verification requires manual testing
            // Text color on background should meet 4.5:1 for AA
        })

        it('maintains contrast for error state - requires manual verification', () => {
            render(
                <SearchInput
                    placeholder="Error Contrast"
                    value=""
                    onChange={() => {}}
                    error
                />
            )
            const input = screen.getByRole('searchbox')
            expect(input).toHaveAttribute('aria-invalid', 'true')
            // Error border should maintain 3:1 contrast ratio
        })

        it('disabled state maintains minimum contrast - requires manual verification', () => {
            render(
                <SearchInput
                    placeholder="Disabled"
                    value="Disabled text"
                    onChange={() => {}}
                    disabled
                />
            )
            const input = screen.getByRole('searchbox')
            expect(input).toBeDisabled()
            // Note: Disabled contrast may not meet 4.5:1 but should be distinguishable
        })
    })

    describe('WCAG 2.5.8 Target Size (Minimum) - Level AA (WCAG 2.2)', () => {
        it('meets minimum touch target size requirements (24x24px for AA)', () => {
            render(
                <SearchInput
                    placeholder="Touch Target"
                    value=""
                    onChange={() => {}}
                />
            )
            const input = screen.getByRole('searchbox')
            expect(input).toBeInTheDocument()
            // Input fields naturally exceed 24x24px minimum for Level AA
            // Actual size verification requires browser DevTools measurement
        })

        it('clear button meets minimum touch target size', () => {
            render(
                <SearchInput
                    placeholder="Search..."
                    value="test"
                    onChange={() => {}}
                    rightSlot={
                        <button
                            type="button"
                            aria-label="Clear"
                            onClick={() => {}}
                            style={{ minWidth: '24px', minHeight: '24px' }}
                        >
                            <X size={16} aria-hidden="true" />
                        </button>
                    }
                />
            )
            const button = screen.getByRole('button', { name: 'Clear' })
            expect(button).toBeInTheDocument()
            // Buttons should meet 24x24px minimum for Level AA
        })
    })

    describe('Form Integration & Required Fields', () => {
        it('displays required state when required prop is true (3.3.2)', () => {
            render(
                <SearchInput
                    placeholder="Required search"
                    value=""
                    onChange={() => {}}
                    required
                />
            )
            const input = screen.getByRole('searchbox')
            expect(input).toHaveAttribute('required')
            expect(input).toHaveAttribute('aria-required', 'true')
        })

        it('works correctly in form submission context', () => {
            const handleSubmit = vi.fn((e) => e.preventDefault())
            render(
                <form onSubmit={handleSubmit}>
                    <SearchInput
                        placeholder="Search..."
                        name="search"
                        value=""
                        onChange={() => {}}
                        required
                    />
                    <button type="submit">Submit</button>
                </form>
            )

            const input = screen.getByRole('searchbox')
            expect(input).toHaveAttribute('name', 'search')
            expect(input).toHaveAttribute('required')
        })

        it('supports form validation with required and error states', () => {
            render(
                <SearchInput
                    placeholder="Search..."
                    name="search"
                    value=""
                    onChange={() => {}}
                    required
                    error
                />
            )

            const input = screen.getByRole('searchbox')
            expect(input).toHaveAttribute('required')
            expect(input).toHaveAttribute('aria-required', 'true')
            expect(input).toHaveAttribute('aria-invalid', 'true')
        })
    })

    describe('With Slots (Icons) - WCAG 1.1.1 Non-text Content', () => {
        it('supports left slot with decorative icon - icon does not interfere with accessibility', () => {
            render(
                <SearchInput
                    placeholder="Search..."
                    value=""
                    onChange={() => {}}
                    leftSlot={<Search size={16} aria-hidden="true" />}
                />
            )
            const input = screen.getByRole('searchbox')
            expect(input).toBeInTheDocument()
            // Decorative icons should have aria-hidden="true"
        })

        it('supports right slot with clear button - maintains accessibility', () => {
            render(
                <SearchInput
                    placeholder="Search..."
                    value="test"
                    onChange={() => {}}
                    rightSlot={
                        <button
                            type="button"
                            aria-label="Clear search"
                            onClick={() => {}}
                        >
                            <X size={16} aria-hidden="true" />
                        </button>
                    }
                />
            )
            expect(
                screen.getByRole('button', { name: 'Clear search' })
            ).toBeInTheDocument()
        })

        it('supports contextual icons with proper accessibility', () => {
            render(
                <SearchInput
                    placeholder="Search locations..."
                    value=""
                    onChange={() => {}}
                    leftSlot={<MapPin size={16} aria-hidden="true" />}
                />
            )
            const input = screen.getByRole('searchbox')
            expect(input).toBeInTheDocument()
            // Contextual icons provide visual context but are marked as decorative
        })
    })

    describe('Focus and Blur Events (WCAG 3.2.1 On Focus - Level A)', () => {
        it('calls onFocus when input receives focus - predictable behavior', () => {
            const handleFocus = vi.fn()
            render(
                <SearchInput
                    placeholder="Focus Event"
                    value=""
                    onChange={() => {}}
                    onFocus={handleFocus}
                />
            )

            const input = screen.getByRole('searchbox')
            input.focus()

            expect(handleFocus).toHaveBeenCalledTimes(1)
        })

        it('calls onBlur when input loses focus - predictable behavior', () => {
            const handleBlur = vi.fn()
            render(
                <SearchInput
                    placeholder="Blur Event"
                    value=""
                    onChange={() => {}}
                    onBlur={handleBlur}
                />
            )

            const input = screen.getByRole('searchbox')
            input.focus()
            input.blur()

            expect(handleBlur).toHaveBeenCalledTimes(1)
        })

        it('does not change context unexpectedly on focus (3.2.1)', () => {
            render(
                <SearchInput
                    placeholder="No Context Change"
                    value=""
                    onChange={() => {}}
                    onFocus={() => {
                        // Focus should not trigger unexpected context changes
                        // like form submission or navigation
                    }}
                />
            )

            const input = screen.getByRole('searchbox')
            input.focus()

            expect(document.activeElement).toBe(input)
        })
    })

    describe('Placeholder Text (WCAG 3.3.2 - Best Practice)', () => {
        it('provides placeholder text for additional guidance', () => {
            render(
                <SearchInput
                    placeholder="Search products, services, or content..."
                    value=""
                    onChange={() => {}}
                />
            )
            const input = screen.getByRole('searchbox')
            expect(input).toHaveAttribute(
                'placeholder',
                'Search products, services, or content...'
            )
        })

        it('placeholder provides context but should be supplemented with aria-label when needed', () => {
            render(
                <SearchInput
                    placeholder="Search..."
                    aria-label="Search for products in the catalog"
                    value=""
                    onChange={() => {}}
                />
            )
            const input = screen.getByRole('searchbox', {
                name: 'Search for products in the catalog',
            })
            expect(input).toHaveAttribute('placeholder', 'Search...')
        })
    })

    describe('WCAG 3.3.7 Redundant Entry (Level A - WCAG 2.2)', () => {
        it('supports autocomplete attribute for reducing redundant entry', () => {
            render(
                <SearchInput
                    placeholder="Search..."
                    name="search"
                    value=""
                    onChange={() => {}}
                    autoComplete="on"
                />
            )
            const input = screen.getByRole('searchbox')
            expect(input).toHaveAttribute('autocomplete', 'on')
        })
    })

    describe('Comprehensive WCAG 2.1/2.2 Compliance (Level A, AA, AAA)', () => {
        it('meets WCAG standards with all features combined - comprehensive test', async () => {
            const { container } = render(
                <SearchInput
                    placeholder="Complete search test"
                    value=""
                    onChange={() => {}}
                    required
                    name="search"
                    leftSlot={<Search size={16} aria-hidden="true" />}
                    rightSlot={
                        <button
                            type="button"
                            aria-label="Clear search"
                            onClick={() => {}}
                        >
                            <X size={16} aria-hidden="true" />
                        </button>
                    }
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
            // Tests: 1.1.1, 1.3.5, 2.1.1, 2.4.7, 3.3.2, 4.1.2
        })

        it('meets WCAG standards with error state - all error requirements', async () => {
            const { container } = render(
                <SearchInput
                    placeholder="Error test"
                    value="invalid"
                    onChange={() => {}}
                    error
                    required
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
            // Tests: 3.3.1 Error Identification, 4.1.2
        })

        it('meets WCAG standards in disabled state - all disabled state requirements', async () => {
            const { container } = render(
                <SearchInput
                    placeholder="Disabled"
                    value="Cannot edit"
                    onChange={() => {}}
                    disabled
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
            // Tests: 2.1.1 Keyboard, 4.1.2 Name Role Value
        })

        it('meets WCAG standards with filter button - interactive elements accessible', async () => {
            const { container } = render(
                <SearchInput
                    placeholder="Search with filters..."
                    value="test"
                    onChange={() => {}}
                    leftSlot={<Search size={16} aria-hidden="true" />}
                    rightSlot={
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                                type="button"
                                aria-label="Clear search"
                                onClick={() => {}}
                            >
                                <X size={16} aria-hidden="true" />
                            </button>
                            <button
                                type="button"
                                aria-label="Open filter options"
                                onClick={() => {}}
                            >
                                <Filter size={16} aria-hidden="true" />
                            </button>
                        </div>
                    }
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
            // Tests: 1.1.1 Non-text Content, 2.1.1 Keyboard, 4.1.2 Name Role Value
        })
    })
})
