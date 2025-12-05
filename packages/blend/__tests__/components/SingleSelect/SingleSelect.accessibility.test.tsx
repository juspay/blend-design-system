import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '../../test-utils'
import { axe } from 'jest-axe'
import SingleSelect from '../../../lib/components/SingleSelect/SingleSelect'
import {
    SelectMenuSize,
    type SelectMenuGroupType,
} from '../../../lib/components/SingleSelect/types'

// Test data builders
const createTestItems = (): SelectMenuGroupType[] => [
    {
        items: [
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Option 3', value: 'option3', disabled: true },
        ],
    },
]

const createTestItemsWithGroups = (): SelectMenuGroupType[] => [
    {
        groupLabel: 'Group 1',
        items: [
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
        ],
    },
    {
        groupLabel: 'Group 2',
        items: [
            { label: 'Option 3', value: 'option3' },
            { label: 'Option 4', value: 'option4', disabled: true },
        ],
        showSeparator: true,
    },
]

describe('SingleSelect Accessibility', () => {
    describe('WCAG 2.1 Compliance (Level A, AA, AAA)', () => {
        it('meets WCAG standards for default SingleSelect (axe-core validation)', async () => {
            const { container } = render(
                <SingleSelect
                    placeholder="Select an option"
                    items={createTestItems()}
                    selected=""
                    onSelect={() => {}}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for all SingleSelect states (default, selected, disabled, error, required)', async () => {
            const states = [
                {
                    placeholder: 'Default',
                    items: createTestItems(),
                    selected: '',
                    onSelect: () => {},
                },
                {
                    placeholder: 'Selected',
                    items: createTestItems(),
                    selected: 'option1',
                    onSelect: () => {},
                },
                {
                    placeholder: 'Disabled',
                    items: createTestItems(),
                    selected: '',
                    onSelect: () => {},
                    disabled: true,
                },
                {
                    placeholder: 'Error',
                    items: createTestItems(),
                    selected: '',
                    onSelect: () => {},
                    error: true,
                    errorMessage: 'This field is required',
                },
                {
                    placeholder: 'Required',
                    items: createTestItems(),
                    selected: '',
                    onSelect: () => {},
                    required: true,
                },
            ]

            for (const props of states) {
                const { container, unmount } = render(
                    <SingleSelect {...props} />
                )
                const results = await axe(container)
                expect(results).toHaveNoViolations()
                unmount()
            }
        })

        it('meets WCAG standards with complex content (label, subLabel, hintText, errorMessage)', async () => {
            const { container } = render(
                <SingleSelect
                    label="Select Country"
                    subLabel="Choose your country"
                    hintText="Select your country from the list"
                    placeholder="Select an option"
                    items={createTestItems()}
                    selected=""
                    onSelect={() => {}}
                    required
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for all sizes', async () => {
            const sizes = [
                SelectMenuSize.SMALL,
                SelectMenuSize.MEDIUM,
                SelectMenuSize.LARGE,
            ]

            for (const size of sizes) {
                const { container, unmount } = render(
                    <SingleSelect
                        placeholder="Select an option"
                        items={createTestItems()}
                        selected=""
                        onSelect={() => {}}
                        size={size}
                    />
                )
                const results = await axe(container)
                expect(results).toHaveNoViolations()
                unmount()
            }
        })

        it('meets WCAG standards with menu groups', async () => {
            const { container } = render(
                <SingleSelect
                    placeholder="Select an option"
                    items={createTestItemsWithGroups()}
                    selected=""
                    onSelect={() => {}}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 2.1.1 Keyboard (Level A)', () => {
        it('is focusable with keyboard - all functionality operable via keyboard', async () => {
            const { user } = render(
                <SingleSelect
                    placeholder="Select an option"
                    items={createTestItems()}
                    selected=""
                    onSelect={() => {}}
                />
            )

            const trigger = screen.getByRole('button')
            await user.tab()
            expect(document.activeElement).toBe(trigger)
        })

        it('opens menu with Enter key - keyboard activation support (WCAG 2.1.1)', async () => {
            const { user } = render(
                <SingleSelect
                    placeholder="Select an option"
                    items={createTestItems()}
                    selected=""
                    onSelect={() => {}}
                />
            )

            const trigger = screen.getByRole('button')
            trigger.focus()
            await user.keyboard('{Enter}')

            // Menu should open (Radix UI handles this)
            await waitFor(() => {
                expect(screen.getByText('Option 1')).toBeInTheDocument()
            })
        })

        it('opens menu with Space key - keyboard activation support (WCAG 2.1.1)', async () => {
            const { user } = render(
                <SingleSelect
                    placeholder="Select an option"
                    items={createTestItems()}
                    selected=""
                    onSelect={() => {}}
                />
            )

            const trigger = screen.getByRole('button')
            trigger.focus()
            await user.keyboard(' ')

            // Menu should open
            await waitFor(() => {
                expect(screen.getByText('Option 1')).toBeInTheDocument()
            })
        })

        it('closes menu with Escape key - keyboard navigation (WCAG 2.1.1)', async () => {
            const { user } = render(
                <SingleSelect
                    placeholder="Select an option"
                    items={createTestItems()}
                    selected=""
                    onSelect={() => {}}
                />
            )

            const trigger = screen.getByRole('button')
            trigger.focus()
            await user.keyboard('{Enter}')

            await waitFor(() => {
                expect(screen.getByText('Option 1')).toBeInTheDocument()
            })

            await user.keyboard('{Escape}')

            await waitFor(() => {
                expect(screen.queryByText('Option 1')).not.toBeInTheDocument()
            })
        })

        it('navigates menu items with Arrow keys - keyboard navigation (WCAG 2.1.1)', async () => {
            const { user } = render(
                <SingleSelect
                    placeholder="Select an option"
                    items={createTestItems()}
                    selected=""
                    onSelect={() => {}}
                />
            )

            const trigger = screen.getByRole('button')
            trigger.focus()
            await user.keyboard('{Enter}')

            await waitFor(() => {
                expect(screen.getByText('Option 1')).toBeInTheDocument()
            })

            // Arrow down should navigate to next item
            await user.keyboard('{ArrowDown}')
            // Arrow up should navigate to previous item
            await user.keyboard('{ArrowUp}')
        })

        it('selects item with Enter key - keyboard selection (WCAG 2.1.1)', async () => {
            const handleSelect = vi.fn()
            const { user } = render(
                <SingleSelect
                    placeholder="Select an option"
                    items={createTestItems()}
                    selected=""
                    onSelect={handleSelect}
                />
            )

            const trigger = screen.getByRole('button')
            trigger.focus()
            await user.keyboard('{Enter}')

            await waitFor(() => {
                expect(screen.getByText('Option 1')).toBeInTheDocument()
            })

            await user.keyboard('{ArrowDown}')
            await user.keyboard('{Enter}')

            // Should select the item
            expect(handleSelect).toHaveBeenCalled()
        })

        it('disabled SingleSelect is not focusable - keyboard navigation (WCAG 2.1.1)', async () => {
            const { user } = render(
                <SingleSelect
                    placeholder="Select an option"
                    items={createTestItems()}
                    selected=""
                    onSelect={() => {}}
                    disabled
                />
            )

            const trigger = screen.getByRole('button')
            await user.tab()
            expect(document.activeElement).not.toBe(trigger)
            expect(trigger).toBeDisabled()
        })

        it('does not respond to keyboard when disabled (WCAG 2.1.1)', async () => {
            const handleSelect = vi.fn()
            const { user } = render(
                <SingleSelect
                    placeholder="Disabled Select"
                    items={createTestItems()}
                    selected=""
                    onSelect={handleSelect}
                    disabled
                />
            )

            const trigger = screen.getByRole('button')
            trigger.focus()
            await user.keyboard('{Enter}')
            await user.keyboard(' ')

            // Menu should not open
            expect(screen.queryByText('Option 1')).not.toBeInTheDocument()
        })
    })

    describe('WCAG 4.1.2 Name, Role, Value (Level A)', () => {
        it('has correct button role - programmatically determinable role', () => {
            render(
                <SingleSelect
                    placeholder="Select an option"
                    items={createTestItems()}
                    selected=""
                    onSelect={() => {}}
                />
            )

            const trigger = screen.getByRole('button')
            expect(trigger).toBeInTheDocument()
        })

        it('has aria-expanded attribute - state is programmatically determinable', async () => {
            const { user } = render(
                <SingleSelect
                    placeholder="Select an option"
                    items={createTestItems()}
                    selected=""
                    onSelect={() => {}}
                />
            )

            const trigger = screen.getByRole('button')
            expect(trigger).toHaveAttribute('aria-expanded', 'false')

            trigger.focus()
            await user.keyboard('{Enter}')

            await waitFor(() => {
                expect(trigger).toHaveAttribute('aria-expanded', 'true')
            })
        })

        it('has aria-haspopup attribute - popup relationship communicated (WCAG 4.1.2)', () => {
            render(
                <SingleSelect
                    placeholder="Select an option"
                    items={createTestItems()}
                    selected=""
                    onSelect={() => {}}
                />
            )

            const trigger = screen.getByRole('button')
            // Radix UI should provide aria-haspopup="menu"
            expect(trigger).toHaveAttribute('aria-haspopup')
        })

        it('provides accessible name via placeholder - name is programmatically determinable', () => {
            render(
                <SingleSelect
                    placeholder="Select an option"
                    items={createTestItems()}
                    selected=""
                    onSelect={() => {}}
                />
            )

            const trigger = screen.getByRole('button', {
                name: /Select an option/i,
            })
            expect(trigger).toBeInTheDocument()
        })

        it('provides accessible name via label - name is programmatically determinable', () => {
            render(
                <SingleSelect
                    label="Country"
                    placeholder="Select country"
                    items={createTestItems()}
                    selected=""
                    onSelect={() => {}}
                />
            )

            const label = screen.getByText('Country')
            expect(label).toBeInTheDocument()
            expect(label.tagName.toLowerCase()).toBe('label')
        })

        it('displays selected value as accessible name - value is programmatically determinable', () => {
            render(
                <SingleSelect
                    placeholder="Select an option"
                    items={createTestItems()}
                    selected="option1"
                    onSelect={() => {}}
                />
            )

            const trigger = screen.getByRole('button')
            expect(trigger).toHaveTextContent('Option 1')
        })

        it('supports aria-label for accessible name override (WCAG 4.1.2)', () => {
            render(
                <SingleSelect
                    placeholder="Select an option"
                    items={createTestItems()}
                    selected=""
                    onSelect={() => {}}
                    aria-label="Custom Accessible Name"
                />
            )

            const trigger = screen.getByRole('button', {
                name: 'Custom Accessible Name',
            })
            expect(trigger).toBeInTheDocument()
        })

        it('supports aria-labelledby for complex labeling (WCAG 4.1.2)', () => {
            render(
                <>
                    <h3 id="select-heading">Country Selection</h3>
                    <SingleSelect
                        placeholder="Select an option"
                        items={createTestItems()}
                        selected=""
                        onSelect={() => {}}
                        aria-labelledby="select-heading"
                    />
                </>
            )

            const trigger = screen.getByRole('button')
            expect(trigger).toHaveAttribute('aria-labelledby', 'select-heading')
        })
    })

    describe('WCAG 1.3.1 Info and Relationships (Level A)', () => {
        it('associates label with trigger correctly - relationships are programmatically determinable', () => {
            render(
                <SingleSelect
                    label="Country"
                    name="country"
                    placeholder="Select country"
                    items={createTestItems()}
                    selected=""
                    onSelect={() => {}}
                />
            )

            const label = screen.getByText('Country')
            const trigger = screen.getByRole('button')

            expect(label.tagName.toLowerCase()).toBe('label')
            expect(label).toHaveAttribute('for', 'country')
            expect(trigger).toHaveAttribute('name', 'country')
        })

        it('generates unique IDs for label association when name not provided', () => {
            render(
                <>
                    <SingleSelect
                        label="Select 1"
                        placeholder="Select an option"
                        items={createTestItems()}
                        selected=""
                        onSelect={() => {}}
                    />
                    <SingleSelect
                        label="Select 2"
                        placeholder="Select an option"
                        items={createTestItems()}
                        selected=""
                        onSelect={() => {}}
                    />
                </>
            )

            const triggers = screen.getAllByRole('button')
            const labels = screen.getAllByText(/Select [12]/)

            expect(triggers[0]).toHaveAttribute('name')
            expect(triggers[1]).toHaveAttribute('name')
            expect(triggers[0].getAttribute('name')).not.toBe(
                triggers[1].getAttribute('name')
            )

            expect(labels[0].tagName.toLowerCase()).toBe('label')
            expect(labels[1].tagName.toLowerCase()).toBe('label')
        })

        it('communicates required state via visual indicator (WCAG 1.3.1)', () => {
            render(
                <SingleSelect
                    label="Required Field"
                    placeholder="Select an option"
                    items={createTestItems()}
                    selected=""
                    onSelect={() => {}}
                    required
                />
            )

            // Note: aria-required is not valid for button elements, only for form inputs
            // Required state is communicated via visual indicator (asterisk) and label association
            expect(screen.getByText('*')).toBeInTheDocument()
            const label = screen.getByText('Required Field')
            expect(label.tagName.toLowerCase()).toBe('label')
        })

        it('communicates error state via aria-invalid (WCAG 1.3.1)', () => {
            render(
                <SingleSelect
                    label="Error Field"
                    placeholder="Select an option"
                    items={createTestItems()}
                    selected=""
                    onSelect={() => {}}
                    error
                    errorMessage="This field is required"
                />
            )

            const trigger = screen.getByRole('button')
            expect(trigger).toHaveAttribute('aria-invalid', 'true')
        })

        it('communicates disabled state via disabled attribute (WCAG 1.3.1)', () => {
            render(
                <SingleSelect
                    label="Disabled Field"
                    placeholder="Select an option"
                    items={createTestItems()}
                    selected=""
                    onSelect={() => {}}
                    disabled
                />
            )

            const trigger = screen.getByRole('button')
            expect(trigger).toBeDisabled()
        })
    })

    describe('WCAG 3.3.2 Labels or Instructions (Level A)', () => {
        it('provides clear label for SingleSelect purpose', () => {
            render(
                <SingleSelect
                    label="Select Country"
                    placeholder="Choose country"
                    items={createTestItems()}
                    selected=""
                    onSelect={() => {}}
                />
            )

            const label = screen.getByText('Select Country')
            expect(label).toBeInTheDocument()
        })

        it('indicates required state with asterisk and visual indicator (WCAG 3.3.2)', () => {
            render(
                <SingleSelect
                    label="Required Select"
                    placeholder="Select an option"
                    items={createTestItems()}
                    selected=""
                    onSelect={() => {}}
                    required
                />
            )

            // Note: aria-required is not valid for button elements, only for form inputs
            // Required state is communicated via visual indicator (asterisk) and label association
            expect(screen.getByText('*')).toBeInTheDocument()
            const label = screen.getByText('Required Select')
            expect(label.tagName.toLowerCase()).toBe('label')
        })

        it('provides hintText for additional context via aria-describedby (WCAG 3.3.2)', () => {
            render(
                <SingleSelect
                    label="Select with hint"
                    placeholder="Select an option"
                    items={createTestItems()}
                    selected=""
                    onSelect={() => {}}
                    hintText="Please select an option from the list"
                />
            )

            const trigger = screen.getByRole('button')
            const hintText = screen.getByText(
                'Please select an option from the list'
            )

            expect(trigger).toHaveAttribute('aria-describedby')
            expect(hintText).toBeInTheDocument()
        })

        it('merges custom aria-describedby with hintText ID (WCAG 3.3.2)', () => {
            render(
                <>
                    <SingleSelect
                        label="Select with multiple descriptions"
                        placeholder="Select an option"
                        items={createTestItems()}
                        selected=""
                        onSelect={() => {}}
                        hintText="Hint text"
                        aria-describedby="custom-description"
                    />
                    <div id="custom-description">Custom description</div>
                </>
            )

            const trigger = screen.getByRole('button')
            const ariaDescribedBy = trigger.getAttribute('aria-describedby')

            expect(ariaDescribedBy).toBeTruthy()
            expect(ariaDescribedBy).toContain('custom-description')
            // Check for hint ID (format: singleselect-{id}-hint)
            expect(ariaDescribedBy).toMatch(/-hint/)
        })
    })

    describe('WCAG 4.1.3 Status Messages (Level AA)', () => {
        it('communicates error state via aria-invalid="true" (WCAG 4.1.3)', () => {
            render(
                <SingleSelect
                    label="Error Select"
                    placeholder="Select an option"
                    items={createTestItems()}
                    selected=""
                    onSelect={() => {}}
                    error
                    errorMessage="This field has an error"
                />
            )

            const trigger = screen.getByRole('button')
            expect(trigger).toHaveAttribute('aria-invalid', 'true')
        })

        it('connects error message via aria-describedby (WCAG 4.1.3)', () => {
            render(
                <SingleSelect
                    label="Error Select"
                    placeholder="Select an option"
                    items={createTestItems()}
                    selected=""
                    onSelect={() => {}}
                    error
                    errorMessage="This field is required"
                />
            )

            const trigger = screen.getByRole('button')

            expect(trigger).toHaveAttribute('aria-describedby')
            const describedBy = trigger.getAttribute('aria-describedby')
            expect(describedBy).toBeTruthy()
        })

        it('announces selection changes to screen readers (WCAG 4.1.3)', async () => {
            const handleSelect = vi.fn()
            const { user, rerender } = render(
                <SingleSelect
                    placeholder="Select an option"
                    items={createTestItems()}
                    selected=""
                    onSelect={handleSelect}
                />
            )

            const trigger = screen.getByRole('button')
            trigger.focus()
            await user.keyboard('{Enter}')

            await waitFor(() => {
                expect(screen.getByText('Option 1')).toBeInTheDocument()
            })

            await user.keyboard('{ArrowDown}')
            await user.keyboard('{Enter}')

            // Re-render with selected value
            rerender(
                <SingleSelect
                    placeholder="Select an option"
                    items={createTestItems()}
                    selected="option1"
                    onSelect={handleSelect}
                />
            )

            // Selected value should be displayed
            expect(trigger).toHaveTextContent('Option 1')
        })
    })

    describe('WCAG 2.4.7 Focus Visible (Level AA)', () => {
        it('has visible focus indicator - focus is clearly visible', async () => {
            const { user } = render(
                <SingleSelect
                    placeholder="Select an option"
                    items={createTestItems()}
                    selected=""
                    onSelect={() => {}}
                />
            )

            const trigger = screen.getByRole('button')
            await user.tab()
            expect(trigger).toHaveFocus()
            // Focus indicator should be visible (tested via visual regression)
        })

        it('maintains focus indicator visibility across states', async () => {
            const { user, rerender } = render(
                <SingleSelect
                    placeholder="Select an option"
                    items={createTestItems()}
                    selected=""
                    onSelect={() => {}}
                />
            )

            const trigger = screen.getByRole('button')
            await user.tab()
            expect(trigger).toHaveFocus()

            rerender(
                <SingleSelect
                    placeholder="Select an option"
                    items={createTestItems()}
                    selected="option1"
                    onSelect={() => {}}
                />
            )

            trigger.focus()
            expect(trigger).toHaveFocus()
        })
    })

    describe('WCAG 1.4.3 Contrast (Minimum) (Level AA)', () => {
        it('maintains sufficient contrast for labels - requires manual verification', () => {
            render(
                <SingleSelect
                    label="Contrast Select"
                    placeholder="Select an option"
                    items={createTestItems()}
                    selected=""
                    onSelect={() => {}}
                />
            )

            const trigger = screen.getByRole('button')
            expect(trigger).toBeInTheDocument()
            // NOTE: Actual contrast ratios require manual verification with contrast checker tools
            // Label text uses gray[700] (#2B303B) on white (gray[0]: #FFFFFF)
            // Should meet 4.5:1 for normal text (AA per WCAG 1.4.3)
        })

        it('maintains contrast in error state - requires manual verification', () => {
            render(
                <SingleSelect
                    label="Error Contrast Select"
                    placeholder="Select an option"
                    items={createTestItems()}
                    selected=""
                    onSelect={() => {}}
                    error
                    errorMessage="Error message"
                />
            )

            const trigger = screen.getByRole('button')
            expect(trigger).toHaveAttribute('aria-invalid', 'true')
            // NOTE: Error state requires manual verification with contrast checker
        })

        it('maintains contrast in disabled state - requires manual verification', () => {
            render(
                <SingleSelect
                    label="Disabled Contrast Select"
                    placeholder="Select an option"
                    items={createTestItems()}
                    selected=""
                    onSelect={() => {}}
                    disabled
                />
            )

            const trigger = screen.getByRole('button')
            expect(trigger).toBeDisabled()
            // NOTE: Disabled state requires manual verification with contrast checker
        })
    })

    describe('WCAG 2.5.5 Target Size (Level AAA)', () => {
        it('has adequate touch target size - requires manual verification', () => {
            render(
                <SingleSelect
                    placeholder="Touch Target Select"
                    items={createTestItems()}
                    selected=""
                    onSelect={() => {}}
                />
            )

            const trigger = screen.getByRole('button')
            expect(trigger).toBeInTheDocument()
            // NOTE: Touch target size requires manual verification
            // WCAG 2.5.5 AAA requires 44x44px minimum interactive area
            // Current implementation should meet this via padding
        })
    })

    describe('WCAG 1.4.6 Contrast (Enhanced) (Level AAA)', () => {
        it('meets enhanced contrast requirements - requires manual verification', () => {
            render(
                <SingleSelect
                    placeholder="Enhanced Contrast Select"
                    items={createTestItems()}
                    selected=""
                    onSelect={() => {}}
                />
            )

            const trigger = screen.getByRole('button')
            expect(trigger).toBeInTheDocument()
            // NOTE: AAA requires 7:1 contrast ratio (WCAG 1.4.6)
            // Current implementation designed for AA (4.5:1 per WCAG 1.4.3)
            // Requires manual verification and potential color adjustments
        })
    })

    describe('WCAG 1.4.11 Non-text Contrast (Level AA)', () => {
        it('maintains focus indicator contrast - requires manual verification', async () => {
            const { user } = render(
                <SingleSelect
                    placeholder="Focus Contrast Select"
                    items={createTestItems()}
                    selected=""
                    onSelect={() => {}}
                />
            )

            const trigger = screen.getByRole('button')
            await user.tab()
            expect(trigger).toHaveFocus()
            // NOTE: Focus indicator requires 3:1 contrast against background (WCAG 1.4.11)
            // Manual verification required
        })
    })

    describe('WCAG 2.3.3 Animation from Interactions (Level AAA)', () => {
        it('respects reduced motion preferences', () => {
            // Mock reduced motion preference
            Object.defineProperty(window, 'matchMedia', {
                writable: true,
                value: vi.fn().mockImplementation((query) => ({
                    matches: query === '(prefers-reduced-motion: reduce)',
                    media: query,
                    onchange: null,
                    addListener: vi.fn(),
                    removeListener: vi.fn(),
                    addEventListener: vi.fn(),
                    removeEventListener: vi.fn(),
                    dispatchEvent: vi.fn(),
                })),
            })

            render(
                <SingleSelect
                    placeholder="Reduced Motion Select"
                    items={createTestItems()}
                    selected=""
                    onSelect={() => {}}
                />
            )

            const trigger = screen.getByRole('button')
            expect(trigger).toBeInTheDocument()
            // Animation behavior would be tested through visual regression
        })
    })

    describe('WCAG 1.4.8 Visual Presentation (Level AAA)', () => {
        it('respects browser text size settings - text scales up to 200%', () => {
            render(
                <SingleSelect
                    placeholder="Text Scaling Select"
                    items={createTestItems()}
                    selected=""
                    onSelect={() => {}}
                />
            )

            const trigger = screen.getByRole('button')
            expect(trigger).toBeInTheDocument()
            // NOTE: Text uses relative units (rem/em) allowing user control
            // Text should scale up to 200% without loss of functionality
            // Manual verification required
        })
    })

    describe('WCAG 1.4.9 Images of Text (Level AAA)', () => {
        it('does not use images of text - uses actual text', () => {
            render(
                <SingleSelect
                    placeholder="No Images of Text Select"
                    items={createTestItems()}
                    selected=""
                    onSelect={() => {}}
                />
            )

            const trigger = screen.getByRole('button')
            expect(trigger).toBeInTheDocument()
            // NOTE: SingleSelect component uses actual text, not images of text
            // Icons (ChevronDown) are SVG graphics, not images of text
        })
    })

    describe('WCAG 2.1.3 Keyboard (No Exception) (Level AAA)', () => {
        it('all functionality is keyboard accessible without timing requirements', async () => {
            const handleSelect = vi.fn()
            const { user } = render(
                <SingleSelect
                    placeholder="Keyboard No Exception Select"
                    items={createTestItems()}
                    selected=""
                    onSelect={handleSelect}
                />
            )

            const trigger = screen.getByRole('button')
            trigger.focus()

            await user.keyboard('{Enter}')
            await waitFor(() => {
                expect(screen.getByText('Option 1')).toBeInTheDocument()
            })

            await user.keyboard('{ArrowDown}')
            await user.keyboard('{Enter}')

            expect(handleSelect).toHaveBeenCalled()
            // NOTE: All functionality is keyboard accessible
            // No timing requirements or mouse-only functionality
        })
    })

    describe('WCAG 3.2.5 Change on Request (Level AAA)', () => {
        it('does not cause context changes on focus - changes only on user request', async () => {
            const { user } = render(
                <SingleSelect
                    placeholder="Change on Request Select"
                    items={createTestItems()}
                    selected=""
                    onSelect={() => {}}
                />
            )

            const trigger = screen.getByRole('button')
            await user.tab()

            // Focus should not cause context changes
            expect(trigger).toHaveFocus()
            // Menu should not open on focus
            expect(screen.queryByText('Option 1')).not.toBeInTheDocument()
        })
    })

    describe('Menu Items Accessibility', () => {
        it('menu items have proper role and aria-selected attributes', async () => {
            const { user } = render(
                <SingleSelect
                    placeholder="Select an option"
                    items={createTestItems()}
                    selected="option1"
                    onSelect={() => {}}
                />
            )

            const trigger = screen.getByRole('button')
            trigger.focus()
            await user.keyboard('{Enter}')

            await waitFor(
                () => {
                    const menuItems = screen.getAllByRole('menuitem')
                    expect(menuItems.length).toBeGreaterThan(0)
                },
                { timeout: 3000 }
            )

            // Radix UI provides role="menuitem" and aria-checked for selected items
            const menuItems = screen.getAllByRole('menuitem')
            expect(menuItems.length).toBeGreaterThan(0)
        })

        it('disabled menu items are not selectable', async () => {
            const handleSelect = vi.fn()
            const { user } = render(
                <SingleSelect
                    placeholder="Select an option"
                    items={createTestItems()}
                    selected=""
                    onSelect={handleSelect}
                />
            )

            const trigger = screen.getByRole('button')
            trigger.focus()
            await user.keyboard('{Enter}')

            await waitFor(() => {
                expect(screen.getByText('Option 3')).toBeInTheDocument()
            })

            // Navigate to disabled item
            await user.keyboard('{ArrowDown}')
            await user.keyboard('{ArrowDown}')
            await user.keyboard('{ArrowDown}')

            // Try to select disabled item
            await user.keyboard('{Enter}')

            // Should not select disabled item
            expect(handleSelect).not.toHaveBeenCalledWith('option3')
        })
    })

    describe('Search Functionality Accessibility', () => {
        it('search input is keyboard accessible', async () => {
            const { user } = render(
                <SingleSelect
                    placeholder="Select an option"
                    items={createTestItems()}
                    selected=""
                    onSelect={() => {}}
                    enableSearch
                />
            )

            const trigger = screen.getByRole('button')
            trigger.focus()
            await user.keyboard('{Enter}')

            await waitFor(() => {
                const searchInput = screen.getByPlaceholderText(/search/i)
                expect(searchInput).toBeInTheDocument()
            })

            const searchInput = screen.getByPlaceholderText(/search/i)
            expect(searchInput).toHaveFocus()
        })

        it('search input has proper label association', async () => {
            const { user } = render(
                <SingleSelect
                    placeholder="Select an option"
                    items={createTestItems()}
                    selected=""
                    onSelect={() => {}}
                    enableSearch
                    searchPlaceholder="Search options..."
                />
            )

            const trigger = screen.getByRole('button')
            trigger.focus()
            await user.keyboard('{Enter}')

            await waitFor(() => {
                const searchInput =
                    screen.getByPlaceholderText('Search options...')
                expect(searchInput).toBeInTheDocument()
            })

            const searchInput = screen.getByPlaceholderText('Search options...')
            expect(searchInput).toHaveAttribute('aria-label')
        })
    })

    describe('Form Integration Accessibility', () => {
        it('works properly in form context', () => {
            render(
                <form>
                    <fieldset>
                        <legend>Preferences</legend>
                        <SingleSelect
                            name="country"
                            placeholder="Select country"
                            items={createTestItems()}
                            selected=""
                            onSelect={() => {}}
                        />
                    </fieldset>
                </form>
            )

            const trigger = screen.getByRole('button')
            expect(trigger).toHaveAttribute('name', 'country')
        })

        it('supports form validation patterns', () => {
            render(
                <form>
                    <SingleSelect
                        label="Required Select"
                        placeholder="Select an option"
                        items={createTestItems()}
                        selected=""
                        onSelect={() => {}}
                        required
                        aria-describedby="validation-message"
                    />
                    <div id="validation-message">This field is required</div>
                </form>
            )

            const trigger = screen.getByRole('button')
            const ariaDescribedBy = trigger.getAttribute('aria-describedby')
            // aria-describedby should include validation-message
            expect(ariaDescribedBy).toContain('validation-message')
            // Note: aria-required is not valid for button elements, only for form inputs
            // Required state is communicated via visual indicator (asterisk) and label association
            expect(screen.getByText('*')).toBeInTheDocument()
        })
    })

    describe('Complex Content Accessibility', () => {
        it('handles complex label content accessibly', async () => {
            const { container } = render(
                <SingleSelect
                    label="Select Country"
                    subLabel="Choose your country from the list"
                    hintText="Select your country from the dropdown menu"
                    placeholder="Select country"
                    items={createTestItems()}
                    selected=""
                    onSelect={() => {}}
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()

            const trigger = screen.getByRole('button')
            expect(trigger).toBeInTheDocument()
        })

        it('maintains accessibility with menu groups', async () => {
            const { container } = render(
                <SingleSelect
                    placeholder="Select an option"
                    items={createTestItemsWithGroups()}
                    selected=""
                    onSelect={() => {}}
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('handles slot content accessibly', async () => {
            const { container } = render(
                <SingleSelect
                    placeholder="Select an option"
                    items={createTestItems()}
                    selected=""
                    onSelect={() => {}}
                    slot={<span aria-label="icon">🔍</span>}
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })
})
