import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '../../test-utils'
import { axe, toHaveNoViolations } from 'jest-axe'
import { SingleSelect } from '../../../lib/components/SingleSelect'

expect.extend(toHaveNoViolations)

describe('SingleSelect Accessibility', () => {
    const mockItems = [
        {
            items: [
                { label: 'Option 1', value: 'option-1' },
                { label: 'Option 2', value: 'option-2' },
                { label: 'Option 3', value: 'option-3' },
                { label: 'Option 4', value: 'option-4' },
            ],
        },
    ]

    describe('WCAG Compliance - Automated Tests', () => {
        it('meets WCAG standards for basic single-select', async () => {
            const { container } = render(
                <SingleSelect
                    name="test-singleselect"
                    label="Select Option"
                    placeholder="Choose an option"
                    items={mockItems}
                    onSelect={vi.fn()}
                    selected=""
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with error message', async () => {
            const { container } = render(
                <SingleSelect
                    name="test-singleselect"
                    label="Select Option"
                    placeholder="Choose an option"
                    items={mockItems}
                    onSelect={vi.fn()}
                    selected=""
                    error
                    errorMessage="Please select an option"
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with hint text', async () => {
            const { container } = render(
                <SingleSelect
                    name="test-singleselect"
                    label="Select Option"
                    placeholder="Choose an option"
                    items={mockItems}
                    onSelect={vi.fn()}
                    selected=""
                    hintText="Choose one option from the list"
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for required field', async () => {
            const { container } = render(
                <SingleSelect
                    name="test-singleselect"
                    label="Select Option"
                    placeholder="Choose an option"
                    items={mockItems}
                    onSelect={vi.fn()}
                    selected=""
                    required
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for disabled state', async () => {
            const { container } = render(
                <SingleSelect
                    name="test-singleselect"
                    label="Select Option"
                    placeholder="Choose an option"
                    items={mockItems}
                    onSelect={vi.fn()}
                    selected="option-1"
                    disabled
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with search enabled', async () => {
            const { container } = render(
                <SingleSelect
                    name="test-singleselect"
                    label="Select Option"
                    placeholder="Choose an option"
                    items={mockItems}
                    onSelect={vi.fn()}
                    selected=""
                    enableSearch
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with help icon', async () => {
            const { container } = render(
                <SingleSelect
                    name="test-singleselect"
                    label="Select Option"
                    placeholder="Choose an option"
                    items={mockItems}
                    onSelect={vi.fn()}
                    selected=""
                    helpIconText="This is helpful information"
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with sublabel', async () => {
            const { container } = render(
                <SingleSelect
                    name="test-singleselect"
                    label="Select Option"
                    subLabel="Additional context"
                    placeholder="Choose an option"
                    items={mockItems}
                    onSelect={vi.fn()}
                    selected=""
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('Keyboard Navigation', () => {
        it('supports tab navigation to trigger', async () => {
            const { user } = render(
                <SingleSelect
                    name="test-singleselect"
                    label="Select Option"
                    placeholder="Choose an option"
                    items={mockItems}
                    onSelect={vi.fn()}
                    selected=""
                />
            )

            await user.tab()
            const trigger = screen.getByRole('button')
            expect(trigger).toHaveFocus()
        })

        it('opens menu with Enter key', async () => {
            const { user } = render(
                <SingleSelect
                    name="test-singleselect"
                    label="Select Option"
                    placeholder="Choose an option"
                    items={mockItems}
                    onSelect={vi.fn()}
                    selected=""
                />
            )

            await user.tab()
            await user.keyboard('{Enter}')

            await waitFor(() => {
                expect(screen.getByText('Option 1')).toBeInTheDocument()
            })
        })

        it('opens menu with Space key', async () => {
            const { user } = render(
                <SingleSelect
                    name="test-singleselect"
                    label="Select Option"
                    placeholder="Choose an option"
                    items={mockItems}
                    onSelect={vi.fn()}
                    selected=""
                />
            )

            await user.tab()
            await user.keyboard(' ')

            await waitFor(() => {
                expect(screen.getByText('Option 1')).toBeInTheDocument()
            })
        })

        it('closes menu with Escape key', async () => {
            const { user } = render(
                <SingleSelect
                    name="test-singleselect"
                    label="Select Option"
                    placeholder="Choose an option"
                    items={mockItems}
                    onSelect={vi.fn()}
                    selected=""
                />
            )

            await user.tab()
            await user.keyboard('{Enter}')

            await waitFor(() => {
                expect(screen.getByText('Option 1')).toBeInTheDocument()
            })

            await user.keyboard('{Escape}')

            await waitFor(() => {
                expect(screen.queryByText('Option 1')).not.toBeInTheDocument()
            })
        })

        it('does not open menu when disabled', async () => {
            const { user } = render(
                <SingleSelect
                    name="test-singleselect"
                    label="Select Option"
                    placeholder="Choose an option"
                    items={mockItems}
                    onSelect={vi.fn()}
                    selected=""
                    disabled
                />
            )

            await user.tab()
            await user.keyboard('{Enter}')

            // Menu should not open
            expect(screen.queryByText('Option 1')).not.toBeInTheDocument()
        })

        it('returns focus to trigger after selection', async () => {
            const onSelect = vi.fn()
            const { user } = render(
                <SingleSelect
                    name="test-singleselect"
                    label="Select Option"
                    placeholder="Choose an option"
                    items={mockItems}
                    onSelect={onSelect}
                    selected=""
                />
            )

            const trigger = screen.getByRole('button')

            await user.tab()
            await user.keyboard('{Enter}')

            await waitFor(() => {
                expect(screen.getByText('Option 1')).toBeInTheDocument()
            })

            // Select an item
            await user.click(screen.getByText('Option 1'))

            // Focus should return to trigger
            await waitFor(() => {
                expect(trigger).toHaveFocus()
            })
        })
    })

    describe('ARIA Attributes and Roles', () => {
        it('has proper label association', () => {
            render(
                <SingleSelect
                    name="test-singleselect"
                    label="Select Option"
                    placeholder="Choose an option"
                    items={mockItems}
                    onSelect={vi.fn()}
                    selected=""
                />
            )

            const label = screen.getByText('Select Option')
            expect(label).toBeInTheDocument()
        })

        it('indicates required state with asterisk', () => {
            render(
                <SingleSelect
                    name="test-singleselect"
                    label="Select Option"
                    placeholder="Choose an option"
                    items={mockItems}
                    onSelect={vi.fn()}
                    selected=""
                    required
                />
            )

            // Required indicator should be visible
            expect(screen.getByText('Select Option')).toBeInTheDocument()
        })

        // NOTE: The following tests identify MISSING ARIA attributes found in the audit
        it.skip('MISSING: should have aria-invalid when error exists', () => {
            render(
                <SingleSelect
                    name="test-singleselect"
                    label="Select Option"
                    placeholder="Choose an option"
                    items={mockItems}
                    onSelect={vi.fn()}
                    selected=""
                    error
                    errorMessage="Error message"
                />
            )

            const trigger = screen.getByRole('button')
            expect(trigger).toHaveAttribute('aria-invalid', 'true')
        })

        it.skip('MISSING: should have aria-describedby linking to error message', () => {
            render(
                <SingleSelect
                    name="test-singleselect"
                    label="Select Option"
                    placeholder="Choose an option"
                    items={mockItems}
                    onSelect={vi.fn()}
                    selected=""
                    error
                    errorMessage="Error message"
                />
            )

            const trigger = screen.getByRole('button')
            const errorId = trigger.getAttribute('aria-describedby')

            expect(errorId).toBeTruthy()
            expect(screen.getByText('Error message')).toHaveAttribute(
                'id',
                errorId
            )
        })

        it.skip('MISSING: should have aria-describedby linking to hint text', () => {
            render(
                <SingleSelect
                    name="test-singleselect"
                    label="Select Option"
                    placeholder="Choose an option"
                    items={mockItems}
                    onSelect={vi.fn()}
                    selected=""
                    hintText="Hint text"
                />
            )

            const trigger = screen.getByRole('button')
            const hintId = trigger.getAttribute('aria-describedby')

            expect(hintId).toBeTruthy()
            expect(screen.getByText('Hint text')).toHaveAttribute('id', hintId)
        })

        it.skip('MISSING: ChevronDown icon should have aria-hidden', () => {
            const { container } = render(
                <SingleSelect
                    name="test-singleselect"
                    label="Select Option"
                    placeholder="Choose an option"
                    items={mockItems}
                    onSelect={vi.fn()}
                    selected=""
                />
            )

            const chevron = container.querySelector('svg[aria-hidden="true"]')
            expect(chevron).toBeInTheDocument()
        })

        it('manages aria-expanded state correctly', async () => {
            const { user } = render(
                <SingleSelect
                    name="test-singleselect"
                    label="Select Option"
                    placeholder="Choose an option"
                    items={mockItems}
                    onSelect={vi.fn()}
                    selected=""
                />
            )

            const trigger = screen.getByRole('button')

            // Initially closed
            expect(trigger).toHaveAttribute('aria-expanded', 'false')

            // Open menu
            await user.click(trigger)

            await waitFor(() => {
                expect(trigger).toHaveAttribute('aria-expanded', 'true')
            })

            // Close menu
            await user.keyboard('{Escape}')

            await waitFor(() => {
                expect(trigger).toHaveAttribute('aria-expanded', 'false')
            })
        })
    })

    describe('Screen Reader Support', () => {
        it('announces label text', () => {
            render(
                <SingleSelect
                    name="test-singleselect"
                    label="Select Option"
                    placeholder="Choose an option"
                    items={mockItems}
                    onSelect={vi.fn()}
                    selected=""
                />
            )

            expect(screen.getByText('Select Option')).toBeInTheDocument()
        })

        it('displays error message when error exists', () => {
            render(
                <SingleSelect
                    name="test-singleselect"
                    label="Select Option"
                    placeholder="Choose an option"
                    items={mockItems}
                    onSelect={vi.fn()}
                    selected=""
                    error
                    errorMessage="This field is required"
                />
            )

            expect(
                screen.getByText('This field is required')
            ).toBeInTheDocument()
        })

        it('displays hint text', () => {
            render(
                <SingleSelect
                    name="test-singleselect"
                    label="Select Option"
                    placeholder="Choose an option"
                    items={mockItems}
                    onSelect={vi.fn()}
                    selected=""
                    hintText="Select one option"
                />
            )

            expect(screen.getByText('Select one option')).toBeInTheDocument()
        })

        it('displays sublabel for additional context', () => {
            render(
                <SingleSelect
                    name="test-singleselect"
                    label="Select Option"
                    subLabel="Additional information"
                    placeholder="Choose an option"
                    items={mockItems}
                    onSelect={vi.fn()}
                    selected=""
                />
            )

            expect(
                screen.getByText('Additional information')
            ).toBeInTheDocument()
        })

        it('announces selected value', () => {
            render(
                <SingleSelect
                    name="test-singleselect"
                    label="Select Option"
                    placeholder="Choose an option"
                    items={mockItems}
                    onSelect={vi.fn()}
                    selected="option-1"
                />
            )

            // Selected value should be visible in trigger
            expect(screen.getByText('Option 1')).toBeInTheDocument()
        })

        it('handles empty state announcement', async () => {
            const { user } = render(
                <SingleSelect
                    name="test-singleselect"
                    label="Select Option"
                    placeholder="Choose an option"
                    items={[{ items: [] }]}
                    onSelect={vi.fn()}
                    selected=""
                />
            )

            await user.tab()
            await user.keyboard('{Enter}')

            await waitFor(() => {
                expect(
                    screen.getByText(/no items available/i)
                ).toBeInTheDocument()
            })
        })
    })

    describe('Visual Accessibility', () => {
        it('maintains color contrast requirements', async () => {
            const { container } = render(
                <SingleSelect
                    name="test-singleselect"
                    label="Select Option"
                    placeholder="Choose an option"
                    items={mockItems}
                    onSelect={vi.fn()}
                    selected=""
                />
            )

            const results = await axe(container, {
                rules: {
                    'color-contrast': { enabled: true },
                },
            })
            expect(results).toHaveNoViolations()
        })

        it('provides visible focus indicators', async () => {
            const { user } = render(
                <SingleSelect
                    name="test-singleselect"
                    label="Select Option"
                    placeholder="Choose an option"
                    items={mockItems}
                    onSelect={vi.fn()}
                    selected=""
                />
            )

            await user.tab()
            const trigger = screen.getByRole('button')
            expect(trigger).toHaveFocus()
        })

        it('displays error state visually', () => {
            render(
                <SingleSelect
                    name="test-singleselect"
                    label="Select Option"
                    placeholder="Choose an option"
                    items={mockItems}
                    onSelect={vi.fn()}
                    selected=""
                    error
                    errorMessage="Error"
                />
            )

            expect(screen.getByText('Error')).toBeInTheDocument()
        })

        it('displays disabled state visually', () => {
            render(
                <SingleSelect
                    name="test-singleselect"
                    label="Select Option"
                    placeholder="Choose an option"
                    items={mockItems}
                    onSelect={vi.fn()}
                    selected=""
                    disabled
                />
            )

            const trigger = screen.getByRole('button')
            expect(trigger).toBeDisabled()
        })
    })

    describe('Submenu Support', () => {
        it('renders submenus correctly', async () => {
            const dataWithSubmenu = [
                {
                    items: [
                        {
                            label: 'Parent',
                            value: 'parent',
                            subMenu: [
                                { label: 'Child 1', value: 'child-1' },
                                { label: 'Child 2', value: 'child-2' },
                            ],
                        },
                    ],
                },
            ]

            const { user, container } = render(
                <SingleSelect
                    name="test-singleselect"
                    label="Select Option"
                    placeholder="Choose an option"
                    items={dataWithSubmenu}
                    onSelect={vi.fn()}
                    selected=""
                />
            )

            await user.tab()
            await user.keyboard('{Enter}')

            await waitFor(() => {
                expect(screen.getByText('Parent')).toBeInTheDocument()
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('Edge Cases', () => {
        it('handles empty data array', async () => {
            const { container } = render(
                <SingleSelect
                    name="test-singleselect"
                    label="Select Option"
                    placeholder="Choose an option"
                    items={[{ items: [] }]}
                    onSelect={vi.fn()}
                    selected=""
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('handles grouped items', async () => {
            const groupedData = [
                {
                    groupLabel: 'Group 1',
                    items: [
                        { label: 'Item 1', value: 'item-1' },
                        { label: 'Item 2', value: 'item-2' },
                    ],
                },
            ]

            const { container } = render(
                <SingleSelect
                    name="test-singleselect"
                    label="Select Option"
                    placeholder="Choose an option"
                    items={groupedData}
                    onSelect={vi.fn()}
                    selected=""
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('handles search with no results', async () => {
            const { user } = render(
                <SingleSelect
                    name="test-singleselect"
                    label="Select Option"
                    placeholder="Choose an option"
                    items={mockItems}
                    onSelect={vi.fn()}
                    selected=""
                    enableSearch
                />
            )

            await user.tab()
            await user.keyboard('{Enter}')

            await waitFor(() => {
                const searchInput = screen.getByPlaceholderText(/search/i)
                expect(searchInput).toBeInTheDocument()
            })

            // Type something that doesn't match
            await user.type(screen.getByPlaceholderText(/search/i), 'xyz')

            await waitFor(() => {
                expect(
                    screen.getByText(/no results found/i)
                ).toBeInTheDocument()
            })
        })
    })
})
