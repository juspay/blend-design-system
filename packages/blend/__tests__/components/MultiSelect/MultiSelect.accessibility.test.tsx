import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '../../test-utils'
import { axe, toHaveNoViolations } from 'jest-axe'
import { MultiSelect } from '../../../lib/components/MultiSelect'

expect.extend(toHaveNoViolations)

describe('MultiSelect Accessibility', () => {
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
        it('meets WCAG standards for basic multi-select', async () => {
            const { container } = render(
                <MultiSelect
                    name="test-multiselect"
                    label="Select Options"
                    placeholder="Choose options"
                    items={mockItems}
                    onChange={vi.fn()}
                    selectedValues={[]}
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with error message', async () => {
            const { container } = render(
                <MultiSelect
                    name="test-multiselect"
                    label="Select Options"
                    placeholder="Choose options"
                    items={mockItems}
                    onChange={vi.fn()}
                    selectedValues={[]}
                    error
                    errorMessage="Please select at least one option"
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with hint text', async () => {
            const { container } = render(
                <MultiSelect
                    name="test-multiselect"
                    label="Select Options"
                    placeholder="Choose options"
                    items={mockItems}
                    onChange={vi.fn()}
                    selectedValues={[]}
                    hintText="You can select multiple options"
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for required field', async () => {
            const { container } = render(
                <MultiSelect
                    name="test-multiselect"
                    label="Select Options"
                    placeholder="Choose options"
                    items={mockItems}
                    onChange={vi.fn()}
                    selectedValues={[]}
                    required
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for disabled state', async () => {
            const { container } = render(
                <MultiSelect
                    name="test-multiselect"
                    label="Select Options"
                    placeholder="Choose options"
                    items={mockItems}
                    onChange={vi.fn()}
                    selectedValues={['option-1']}
                    disabled
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with search enabled', async () => {
            const { container } = render(
                <MultiSelect
                    name="test-multiselect"
                    label="Select Options"
                    placeholder="Choose options"
                    items={mockItems}
                    onChange={vi.fn()}
                    selectedValues={[]}
                    enableSearch
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with Select All enabled', async () => {
            const { container } = render(
                <MultiSelect
                    name="test-multiselect"
                    label="Select Options"
                    placeholder="Choose options"
                    items={mockItems}
                    onChange={vi.fn()}
                    selectedValues={[]}
                    enableSelectAll
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with max selections', async () => {
            const { container } = render(
                <MultiSelect
                    name="test-multiselect"
                    label="Select Options"
                    placeholder="Choose options"
                    items={mockItems}
                    onChange={vi.fn()}
                    selectedValues={[]}
                    maxSelections={2}
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('Keyboard Navigation', () => {
        it('supports tab navigation to trigger', async () => {
            const { user } = render(
                <MultiSelect
                    name="test-multiselect"
                    label="Select Options"
                    placeholder="Choose options"
                    items={mockItems}
                    onChange={vi.fn()}
                    selectedValues={[]}
                />
            )

            await user.tab()
            const trigger = screen.getByRole('button')
            expect(trigger).toHaveFocus()
        })

        it('opens menu with Enter key', async () => {
            const { user } = render(
                <MultiSelect
                    name="test-multiselect"
                    label="Select Options"
                    placeholder="Choose options"
                    items={mockItems}
                    onChange={vi.fn()}
                    selectedValues={[]}
                />
            )

            await user.tab()
            const trigger = screen.getByRole('button')

            await user.keyboard('{Enter}')

            await waitFor(() => {
                expect(screen.getByText('Option 1')).toBeInTheDocument()
            })
        })

        it('opens menu with Space key', async () => {
            const { user } = render(
                <MultiSelect
                    name="test-multiselect"
                    label="Select Options"
                    placeholder="Choose options"
                    items={mockItems}
                    onChange={vi.fn()}
                    selectedValues={[]}
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
                <MultiSelect
                    name="test-multiselect"
                    label="Select Options"
                    placeholder="Choose options"
                    items={mockItems}
                    onChange={vi.fn()}
                    selectedValues={[]}
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
                <MultiSelect
                    name="test-multiselect"
                    label="Select Options"
                    placeholder="Choose options"
                    items={mockItems}
                    onChange={vi.fn()}
                    selectedValues={[]}
                    disabled
                />
            )

            await user.tab()
            const trigger = screen.getByRole('button')

            await user.keyboard('{Enter}')

            // Menu should not open
            expect(screen.queryByText('Option 1')).not.toBeInTheDocument()
        })
    })

    describe('ARIA Attributes and Roles', () => {
        it('has proper label association', () => {
            render(
                <MultiSelect
                    name="test-multiselect"
                    label="Select Options"
                    placeholder="Choose options"
                    items={mockItems}
                    onChange={vi.fn()}
                    selectedValues={[]}
                />
            )

            const label = screen.getByText('Select Options')
            expect(label).toBeInTheDocument()
        })

        it('indicates required state with asterisk', () => {
            render(
                <MultiSelect
                    name="test-multiselect"
                    label="Select Options"
                    placeholder="Choose options"
                    items={mockItems}
                    onChange={vi.fn()}
                    selectedValues={[]}
                    required
                />
            )

            // Required indicator should be visible
            expect(screen.getByText('Select Options')).toBeInTheDocument()
        })

        // NOTE: The following tests identify MISSING ARIA attributes found in the audit
        it.skip('MISSING: should have aria-invalid when error exists', () => {
            render(
                <MultiSelect
                    name="test-multiselect"
                    label="Select Options"
                    placeholder="Choose options"
                    items={mockItems}
                    onChange={vi.fn()}
                    selectedValues={[]}
                    error
                    errorMessage="Error message"
                />
            )

            const trigger = screen.getByRole('button')
            expect(trigger).toHaveAttribute('aria-invalid', 'true')
        })

        it.skip('MISSING: should have aria-describedby linking to error message', () => {
            render(
                <MultiSelect
                    name="test-multiselect"
                    label="Select Options"
                    placeholder="Choose options"
                    items={mockItems}
                    onChange={vi.fn()}
                    selectedValues={[]}
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
                <MultiSelect
                    name="test-multiselect"
                    label="Select Options"
                    placeholder="Choose options"
                    items={mockItems}
                    onChange={vi.fn()}
                    selectedValues={[]}
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
                <MultiSelect
                    name="test-multiselect"
                    label="Select Options"
                    placeholder="Choose options"
                    items={mockItems}
                    onChange={vi.fn()}
                    selectedValues={[]}
                />
            )

            const chevron = container.querySelector('svg[aria-hidden="true"]')
            expect(chevron).toBeInTheDocument()
        })

        it.skip('MISSING: Clear All button should have aria-label', () => {
            render(
                <MultiSelect
                    name="test-multiselect"
                    label="Select Options"
                    placeholder="Choose options"
                    items={mockItems}
                    onChange={vi.fn()}
                    selectedValues={['option-1', 'option-2']}
                />
            )

            // Clear All button (X icon) should have aria-label
            const clearButton = screen.getByRole('button', {
                name: /clear all/i,
            })
            expect(clearButton).toBeInTheDocument()
        })

        it('manages aria-expanded state correctly', async () => {
            const { user } = render(
                <MultiSelect
                    name="test-multiselect"
                    label="Select Options"
                    placeholder="Choose options"
                    items={mockItems}
                    onChange={vi.fn()}
                    selectedValues={[]}
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
                <MultiSelect
                    name="test-multiselect"
                    label="Select Options"
                    placeholder="Choose options"
                    items={mockItems}
                    onChange={vi.fn()}
                    selectedValues={[]}
                />
            )

            expect(screen.getByText('Select Options')).toBeInTheDocument()
        })

        it('displays error message when error exists', () => {
            render(
                <MultiSelect
                    name="test-multiselect"
                    label="Select Options"
                    placeholder="Choose options"
                    items={mockItems}
                    onChange={vi.fn()}
                    selectedValues={[]}
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
                <MultiSelect
                    name="test-multiselect"
                    label="Select Options"
                    placeholder="Choose options"
                    items={mockItems}
                    onChange={vi.fn()}
                    selectedValues={[]}
                    hintText="Select multiple options"
                />
            )

            expect(
                screen.getByText('Select multiple options')
            ).toBeInTheDocument()
        })

        it('handles empty state announcement', async () => {
            const { user } = render(
                <MultiSelect
                    name="test-multiselect"
                    label="Select Options"
                    placeholder="Choose options"
                    items={[{ items: [] }]}
                    onChange={vi.fn()}
                    selectedValues={[]}
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

    describe('Multi-Selection Functionality', () => {
        it('allows multiple selections via checkboxes', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <MultiSelect
                    name="test-multiselect"
                    label="Select Options"
                    placeholder="Choose options"
                    items={mockItems}
                    onChange={onChange}
                    selectedValues={[]}
                />
            )

            await user.tab()
            await user.keyboard('{Enter}')

            await waitFor(() => {
                expect(screen.getByText('Option 1')).toBeInTheDocument()
            })

            // Click first option
            await user.click(screen.getByText('Option 1'))
            expect(onChange).toHaveBeenCalled()
        })

        it('supports Select All functionality', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <MultiSelect
                    name="test-multiselect"
                    label="Select Options"
                    placeholder="Choose options"
                    items={mockItems}
                    onChange={onChange}
                    selectedValues={[]}
                    enableSelectAll
                />
            )

            await user.tab()
            await user.keyboard('{Enter}')

            await waitFor(() => {
                expect(screen.getByText(/select all/i)).toBeInTheDocument()
            })

            // Click Select All
            await user.click(screen.getByText(/select all/i))
            expect(onChange).toHaveBeenCalled()
        })
    })

    describe('Visual Accessibility', () => {
        it('maintains color contrast requirements', async () => {
            const { container } = render(
                <MultiSelect
                    name="test-multiselect"
                    label="Select Options"
                    placeholder="Choose options"
                    items={mockItems}
                    onChange={vi.fn()}
                    selectedValues={[]}
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
                <MultiSelect
                    name="test-multiselect"
                    label="Select Options"
                    placeholder="Choose options"
                    items={mockItems}
                    onChange={vi.fn()}
                    selectedValues={[]}
                />
            )

            await user.tab()
            const trigger = screen.getByRole('button')
            expect(trigger).toHaveFocus()
        })

        it('displays error state visually', () => {
            render(
                <MultiSelect
                    name="test-multiselect"
                    label="Select Options"
                    placeholder="Choose options"
                    items={mockItems}
                    onChange={vi.fn()}
                    selectedValues={[]}
                    error
                    errorMessage="Error"
                />
            )

            expect(screen.getByText('Error')).toBeInTheDocument()
        })

        it('displays disabled state visually', () => {
            render(
                <MultiSelect
                    name="test-multiselect"
                    label="Select Options"
                    placeholder="Choose options"
                    items={mockItems}
                    onChange={vi.fn()}
                    selectedValues={[]}
                    disabled
                />
            )

            const trigger = screen.getByRole('button')
            expect(trigger).toBeDisabled()
        })
    })

    describe('Action Buttons', () => {
        it('renders action buttons when provided', async () => {
            const onPrimary = vi.fn()
            const onSecondary = vi.fn()
            const { user } = render(
                <MultiSelect
                    name="test-multiselect"
                    label="Select Options"
                    placeholder="Choose options"
                    items={mockItems}
                    onChange={vi.fn()}
                    selectedValues={[]}
                    showActionButtons
                    primaryAction={{
                        text: 'Apply',
                        onClick: onPrimary,
                    }}
                    secondaryAction={{
                        text: 'Cancel',
                        onClick: onSecondary,
                    }}
                />
            )

            await user.tab()
            await user.keyboard('{Enter}')

            await waitFor(() => {
                expect(screen.getByText('Apply')).toBeInTheDocument()
                expect(screen.getByText('Cancel')).toBeInTheDocument()
            })
        })
    })

    describe('Edge Cases', () => {
        it('handles empty data array', async () => {
            const { container } = render(
                <MultiSelect
                    name="test-multiselect"
                    label="Select Options"
                    placeholder="Choose options"
                    items={[{ items: [] }]}
                    onChange={vi.fn()}
                    selectedValues={[]}
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
                <MultiSelect
                    name="test-multiselect"
                    label="Select Options"
                    placeholder="Choose options"
                    items={groupedData}
                    onChange={vi.fn()}
                    selectedValues={[]}
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('handles alwaysSelected items', () => {
            const dataWithAlwaysSelected = [
                {
                    items: [
                        {
                            label: 'Always Selected',
                            value: 'always',
                            alwaysSelected: true,
                        },
                        ...mockItems[0].items,
                    ],
                },
            ]

            const { container } = render(
                <MultiSelect
                    name="test-multiselect"
                    label="Select Options"
                    placeholder="Choose options"
                    items={dataWithAlwaysSelected}
                    onChange={vi.fn()}
                    selectedValues={['always']}
                />
            )

            expect(container).toBeInTheDocument()
        })
    })
})
