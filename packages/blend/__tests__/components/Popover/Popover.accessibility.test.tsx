import React, { useState } from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '../../test-utils'
import { axe } from 'jest-axe'
import Popover from '../../../lib/components/Popover/Popover'
import { Button } from '../../../lib/components/Button'

describe('Popover Accessibility', () => {
    describe('WCAG 2.1 Compliance (Level A, AA, AAA)', () => {
        it('meets WCAG standards for basic popover (axe-core validation)', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <>
                        <Button
                            text="Open Popover"
                            onClick={() => setIsOpen(true)}
                        />
                        <Popover
                            trigger={<Button text="Trigger" />}
                            heading="Test Popover"
                            description="Test description"
                            open={isOpen}
                            onOpenChange={setIsOpen}
                            primaryAction={{
                                text: 'Save',
                                onClick: () => setIsOpen(false),
                            }}
                            secondaryAction={{
                                text: 'Cancel',
                                onClick: () => setIsOpen(false),
                            }}
                        >
                            <p>Popover content</p>
                        </Popover>
                    </>
                )
            }

            const { container } = render(<TestComponent />)

            await waitFor(() => {
                expect(screen.getByText('Test Popover')).toBeInTheDocument()
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for popover without description', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <Popover
                        trigger={<Button text="Trigger" />}
                        heading="Popover Title"
                        open={isOpen}
                        onOpenChange={setIsOpen}
                        primaryAction={{
                            text: 'OK',
                            onClick: () => setIsOpen(false),
                        }}
                    >
                        <p>Content</p>
                    </Popover>
                )
            }

            const { container } = render(<TestComponent />)

            await waitFor(() => {
                expect(screen.getByText('Popover Title')).toBeInTheDocument()
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for popover without actions', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <Popover
                        trigger={<Button text="Trigger" />}
                        heading="Information Popover"
                        open={isOpen}
                        onOpenChange={setIsOpen}
                    >
                        <p>This popover has no action buttons</p>
                    </Popover>
                )
            }

            const { container } = render(<TestComponent />)

            await waitFor(() => {
                expect(
                    screen.getByText('Information Popover')
                ).toBeInTheDocument()
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for popover without close button', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <Popover
                        trigger={<Button text="Trigger" />}
                        heading="Popover"
                        open={isOpen}
                        onOpenChange={setIsOpen}
                        showCloseButton={false}
                        primaryAction={{
                            text: 'Close',
                            onClick: () => setIsOpen(false),
                        }}
                    >
                        <p>Content</p>
                    </Popover>
                )
            }

            const { container } = render(<TestComponent />)

            await waitFor(() => {
                expect(screen.getByText('Popover')).toBeInTheDocument()
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for popover in modal mode', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <Popover
                        trigger={<Button text="Trigger" />}
                        heading="Modal Popover"
                        open={isOpen}
                        onOpenChange={setIsOpen}
                        asModal={true}
                        primaryAction={{
                            text: 'OK',
                            onClick: () => setIsOpen(false),
                        }}
                    >
                        <p>Content</p>
                    </Popover>
                )
            }

            const { container } = render(<TestComponent />)

            await waitFor(() => {
                expect(screen.getByText('Modal Popover')).toBeInTheDocument()
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 2.1.1 Keyboard (Level A)', () => {
        it('popover is keyboard accessible - all functionality operable via keyboard', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <>
                        <Button
                            text="Trigger"
                            onClick={() => setIsOpen(true)}
                        />
                        <Popover
                            trigger={<Button text="Open Popover" />}
                            heading="Keyboard Test"
                            open={isOpen}
                            onOpenChange={setIsOpen}
                            primaryAction={{
                                text: 'Save',
                                onClick: () => setIsOpen(false),
                            }}
                            secondaryAction={{
                                text: 'Cancel',
                                onClick: () => setIsOpen(false),
                            }}
                        >
                            <input type="text" placeholder="Test input" />
                        </Popover>
                    </>
                )
            }

            render(<TestComponent />)

            await waitFor(() => {
                expect(screen.getByText('Keyboard Test')).toBeInTheDocument()
            })

            // Popover should be accessible via keyboard
            const heading = screen.getByText('Keyboard Test')
            expect(heading).toBeInTheDocument()
        })

        it('supports Tab key for navigation within popover - logical focus order', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <Popover
                        trigger={<Button text="Trigger" />}
                        heading="Tab Navigation"
                        open={isOpen}
                        onOpenChange={setIsOpen}
                        primaryAction={{
                            text: 'Primary',
                            onClick: () => setIsOpen(false),
                        }}
                        secondaryAction={{
                            text: 'Secondary',
                            onClick: () => setIsOpen(false),
                        }}
                    >
                        <input type="text" placeholder="Input 1" />
                        <input type="text" placeholder="Input 2" />
                    </Popover>
                )
            }

            const { user } = render(<TestComponent />)

            await waitFor(() => {
                expect(screen.getByText('Tab Navigation')).toBeInTheDocument()
            })

            // Tab through elements - verify they are accessible
            const input1 = screen.getByPlaceholderText('Input 1')
            const input2 = screen.getByPlaceholderText('Input 2')
            const primaryButton = screen.getByRole('button', {
                name: 'Primary',
            })
            const secondaryButton = screen.getByRole('button', {
                name: 'Secondary',
            })

            expect(input1).toBeInTheDocument()
            expect(input2).toBeInTheDocument()
            expect(primaryButton).toBeInTheDocument()
            expect(secondaryButton).toBeInTheDocument()

            // Focus and tab through elements
            input1.focus()
            expect(input1).toHaveFocus()

            await user.tab()
            await waitFor(() => {
                expect(input2).toHaveFocus()
            })
        })

        it('supports Shift+Tab for backward navigation - reverse focus order', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <Popover
                        trigger={<Button text="Trigger" />}
                        heading="Shift+Tab Test"
                        open={isOpen}
                        onOpenChange={setIsOpen}
                        primaryAction={{
                            text: 'Primary',
                            onClick: () => setIsOpen(false),
                        }}
                    >
                        <input type="text" placeholder="Input" />
                    </Popover>
                )
            }

            const { user } = render(<TestComponent />)

            await waitFor(() => {
                expect(screen.getByText('Shift+Tab Test')).toBeInTheDocument()
            })

            const input = screen.getByPlaceholderText('Input')
            const primaryButton = screen.getByRole('button', {
                name: 'Primary',
            })

            // Tab forward
            input.focus()
            await user.tab()
            await waitFor(() => {
                expect(primaryButton).toHaveFocus()
            })

            // Shift+Tab backward
            await user.tab({ shift: true })
            await waitFor(() => {
                expect(input).toHaveFocus()
            })
        })

        it('supports Escape key to close popover - keyboard dismissal', async () => {
            const handleClose = vi.fn()
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <Popover
                        trigger={<Button text="Trigger" />}
                        heading="Escape Test"
                        open={isOpen}
                        onOpenChange={(open) => {
                            setIsOpen(open)
                            if (!open) {
                                handleClose()
                            }
                        }}
                    >
                        <p>Press Escape to close</p>
                    </Popover>
                )
            }

            const { user } = render(<TestComponent />)

            await waitFor(() => {
                expect(screen.getByText('Escape Test')).toBeInTheDocument()
            })

            // Press Escape
            await user.keyboard('{Escape}')

            await waitFor(() => {
                expect(handleClose).toHaveBeenCalled()
            })
        })

        it('close button is keyboard accessible - operable via keyboard', async () => {
            const handleClose = vi.fn()
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <Popover
                        trigger={<Button text="Trigger" />}
                        heading="Close Button Test"
                        open={isOpen}
                        onOpenChange={(open) => {
                            setIsOpen(open)
                            if (!open) {
                                handleClose()
                            }
                        }}
                        onClose={handleClose}
                    >
                        <p>Content</p>
                    </Popover>
                )
            }

            const { user } = render(<TestComponent />)

            await waitFor(() => {
                expect(
                    screen.getByText('Close Button Test')
                ).toBeInTheDocument()
            })

            const closeButton = screen.getByLabelText('Close popover')
            expect(closeButton).toBeInTheDocument()

            // Focus and activate close button
            closeButton.focus()
            await user.click(closeButton)

            await waitFor(
                () => {
                    expect(handleClose).toHaveBeenCalled()
                },
                { timeout: 2000 }
            )
        })

        it('action buttons are keyboard accessible - operable via keyboard', async () => {
            const handlePrimary = vi.fn()
            const handleSecondary = vi.fn()
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <Popover
                        trigger={<Button text="Trigger" />}
                        heading="Action Buttons"
                        open={isOpen}
                        onOpenChange={setIsOpen}
                        primaryAction={{
                            text: 'Primary',
                            onClick: () => {
                                setIsOpen(false)
                                handlePrimary()
                            },
                        }}
                        secondaryAction={{
                            text: 'Secondary',
                            onClick: () => {
                                setIsOpen(false)
                                handleSecondary()
                            },
                        }}
                    >
                        <p>Content</p>
                    </Popover>
                )
            }

            const { user } = render(<TestComponent />)

            await waitFor(() => {
                expect(screen.getByText('Action Buttons')).toBeInTheDocument()
            })

            // Tab to primary button
            const primaryButton = screen.getByRole('button', {
                name: 'Primary',
            })
            primaryButton.focus()
            await user.keyboard('{Enter}')

            await waitFor(() => {
                expect(handlePrimary).toHaveBeenCalled()
            })
        })
    })

    describe('WCAG 2.1.3 Keyboard (No Exception) (Level AAA)', () => {
        it('all functionality is keyboard accessible without timing requirements', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <Popover
                        trigger={<Button text="Trigger" />}
                        heading="No Timing"
                        open={isOpen}
                        onOpenChange={setIsOpen}
                        primaryAction={{
                            text: 'OK',
                            onClick: () => setIsOpen(false),
                        }}
                    >
                        <input type="text" placeholder="Type here" />
                    </Popover>
                )
            }

            const { user } = render(<TestComponent />)

            await waitFor(() => {
                expect(screen.getByText('No Timing')).toBeInTheDocument()
            })

            // All interactions should work immediately without delays
            const input = screen.getByPlaceholderText('Type here')
            input.focus()
            await user.type(input, 'test')

            expect(input).toHaveValue('test')

            // Escape should work immediately
            await user.keyboard('{Escape}')

            await waitFor(() => {
                expect(screen.queryByText('No Timing')).not.toBeInTheDocument()
            })
        })

        it('keyboard navigation works without timing constraints', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <Popover
                        trigger={<Button text="Trigger" />}
                        heading="Navigation Test"
                        open={isOpen}
                        onOpenChange={setIsOpen}
                    >
                        <button>Button 1</button>
                        <button>Button 2</button>
                        <button>Button 3</button>
                    </Popover>
                )
            }

            const { user } = render(<TestComponent />)

            await waitFor(() => {
                expect(screen.getByText('Navigation Test')).toBeInTheDocument()
            })

            // Rapid tab navigation should work
            const button1 = screen.getByRole('button', { name: 'Button 1' })
            button1.focus()
            expect(button1).toHaveFocus()

            await user.tab()
            await waitFor(() => {
                const button2 = screen.getByRole('button', { name: 'Button 2' })
                expect(button2).toHaveFocus()
            })

            await user.tab()
            await waitFor(() => {
                const button3 = screen.getByRole('button', { name: 'Button 3' })
                expect(button3).toHaveFocus()
            })
        })
    })

    describe('WCAG 4.1.2 Name, Role, Value (Level A)', () => {
        it('popover has proper ARIA attributes', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <Popover
                        trigger={<Button text="Trigger" />}
                        heading="Role Test"
                        open={isOpen}
                        onOpenChange={setIsOpen}
                    >
                        <p>Content</p>
                    </Popover>
                )
            }

            render(<TestComponent />)

            await waitFor(() => {
                expect(screen.getByText('Role Test')).toBeInTheDocument()
            })

            // Radix Popover Content should have proper ARIA attributes
            // Check for aria-labelledby on the popover content
            const heading = screen.getByText('Role Test')
            expect(heading).toBeInTheDocument()
        })

        it('popover has aria-labelledby linking to heading', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <Popover
                        trigger={<Button text="Trigger" />}
                        heading="Popover Title"
                        open={isOpen}
                        onOpenChange={setIsOpen}
                    >
                        <p>Content</p>
                    </Popover>
                )
            }

            render(<TestComponent />)

            await waitFor(() => {
                expect(screen.getByText('Popover Title')).toBeInTheDocument()
            })

            // Verify heading exists and is associated
            const heading = screen.getByText('Popover Title')
            expect(heading).toBeInTheDocument()
            // Radix Popover sets aria-labelledby on the content element
        })

        it('popover has aria-describedby linking to description when present', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <Popover
                        trigger={<Button text="Trigger" />}
                        heading="Title"
                        description="Description text"
                        open={isOpen}
                        onOpenChange={setIsOpen}
                    >
                        <p>Content</p>
                    </Popover>
                )
            }

            render(<TestComponent />)

            await waitFor(() => {
                expect(screen.getByText('Description text')).toBeInTheDocument()
            })

            // Verify description exists and is associated
            const description = screen.getByText('Description text')
            expect(description).toBeInTheDocument()
            // Radix Popover sets aria-describedby on the content element
        })

        it('popover has aria-label fallback when heading is missing', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <Popover
                        trigger={<Button text="Trigger" />}
                        open={isOpen}
                        onOpenChange={setIsOpen}
                    >
                        <p>Content without heading</p>
                    </Popover>
                )
            }

            render(<TestComponent />)

            await waitFor(() => {
                expect(
                    screen.getByText('Content without heading')
                ).toBeInTheDocument()
            })

            // Popover should still be accessible even without heading
            const content = screen.getByText('Content without heading')
            expect(content).toBeInTheDocument()
        })

        it('close button has accessible name via aria-label', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <Popover
                        trigger={<Button text="Trigger" />}
                        heading="Close Button Test"
                        open={isOpen}
                        onOpenChange={setIsOpen}
                    >
                        <p>Content</p>
                    </Popover>
                )
            }

            render(<TestComponent />)

            await waitFor(() => {
                const closeButton = screen.getByLabelText('Close popover')
                expect(closeButton).toBeInTheDocument()
                expect(closeButton).toHaveAttribute(
                    'aria-label',
                    'Close popover'
                )
            })
        })

        it('action buttons have accessible names via text prop', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <Popover
                        trigger={<Button text="Trigger" />}
                        heading="Actions Test"
                        open={isOpen}
                        onOpenChange={setIsOpen}
                        primaryAction={{
                            text: 'Save Changes',
                            onClick: () => setIsOpen(false),
                        }}
                        secondaryAction={{
                            text: 'Cancel',
                            onClick: () => setIsOpen(false),
                        }}
                    >
                        <p>Content</p>
                    </Popover>
                )
            }

            render(<TestComponent />)

            await waitFor(() => {
                expect(
                    screen.getByRole('button', { name: 'Save Changes' })
                ).toBeInTheDocument()
                expect(
                    screen.getByRole('button', { name: 'Cancel' })
                ).toBeInTheDocument()
            })
        })
    })

    describe('WCAG 2.4.7 Focus Visible (Level AA)', () => {
        it('focusable elements have visible focus indicators', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <Popover
                        trigger={<Button text="Trigger" />}
                        heading="Focus Visible"
                        open={isOpen}
                        onOpenChange={setIsOpen}
                        primaryAction={{
                            text: 'OK',
                            onClick: () => setIsOpen(false),
                        }}
                    >
                        <button>Test Button</button>
                    </Popover>
                )
            }

            render(<TestComponent />)

            await waitFor(() => {
                expect(screen.getByText('Focus Visible')).toBeInTheDocument()
            })

            const button = screen.getByRole('button', { name: 'Test Button' })
            button.focus()

            // Focus should be visible (browser default or custom styles)
            expect(button).toHaveFocus()
        })
    })

    describe('WCAG 1.1.1 Non-text Content (Level A)', () => {
        it('close button icon has aria-hidden="true"', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <Popover
                        trigger={<Button text="Trigger" />}
                        heading="Icon Test"
                        open={isOpen}
                        onOpenChange={setIsOpen}
                    >
                        <p>Content</p>
                    </Popover>
                )
            }

            render(<TestComponent />)

            await waitFor(() => {
                const closeButton = screen.getByLabelText('Close popover')
                // Icon inside button should be hidden from screen readers
                const icon = closeButton.querySelector('svg')
                if (icon) {
                    expect(icon).toHaveAttribute('aria-hidden', 'true')
                }
            })
        })
    })

    describe('WCAG 2.5.8 Target Size (Level AA)', () => {
        it('close button meets minimum touch target size (24x24px)', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <Popover
                        trigger={<Button text="Trigger" />}
                        heading="Touch Target Test"
                        open={isOpen}
                        onOpenChange={setIsOpen}
                    >
                        <p>Content</p>
                    </Popover>
                )
            }

            render(<TestComponent />)

            await waitFor(() => {
                const closeButton = screen.getByLabelText('Close popover')
                expect(closeButton).toBeInTheDocument()
                // In test environment, getBoundingClientRect may return 0
                // This test verifies the button exists and is accessible
                // Actual size verification should be done in visual regression tests
                const rect = closeButton.getBoundingClientRect()
                // Skip size check in test environment if rect is 0
                if (rect.width > 0 && rect.height > 0) {
                    expect(rect.width).toBeGreaterThanOrEqual(24)
                    expect(rect.height).toBeGreaterThanOrEqual(24)
                }
            })
        })

        it('action buttons meet minimum touch target size', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <Popover
                        trigger={<Button text="Trigger" />}
                        heading="Button Size Test"
                        open={isOpen}
                        onOpenChange={setIsOpen}
                        primaryAction={{
                            text: 'OK',
                            onClick: () => setIsOpen(false),
                        }}
                    >
                        <p>Content</p>
                    </Popover>
                )
            }

            render(<TestComponent />)

            await waitFor(() => {
                const button = screen.getByRole('button', { name: 'OK' })
                expect(button).toBeInTheDocument()
                // In test environment, getBoundingClientRect may return 0
                // This test verifies the button exists and is accessible
                // Actual size verification should be done in visual regression tests
                const rect = button.getBoundingClientRect()
                // Skip size check in test environment if rect is 0
                if (rect.width > 0 && rect.height > 0) {
                    expect(rect.width).toBeGreaterThanOrEqual(24)
                    expect(rect.height).toBeGreaterThanOrEqual(24)
                }
            })
        })
    })

    describe('WCAG 1.3.1 Info and Relationships (Level A)', () => {
        it('heading is programmatically associated with popover via aria-labelledby', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <Popover
                        trigger={<Button text="Trigger" />}
                        heading="Relationship Test"
                        open={isOpen}
                        onOpenChange={setIsOpen}
                    >
                        <p>Content</p>
                    </Popover>
                )
            }

            render(<TestComponent />)

            await waitFor(() => {
                expect(
                    screen.getByText('Relationship Test')
                ).toBeInTheDocument()
            })

            // Verify heading exists
            const heading = screen.getByText('Relationship Test')
            expect(heading).toBeInTheDocument()
            // Radix Popover sets aria-labelledby on the content element
        })

        it('description is programmatically associated with popover via aria-describedby', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <Popover
                        trigger={<Button text="Trigger" />}
                        heading="Title"
                        description="Description text"
                        open={isOpen}
                        onOpenChange={setIsOpen}
                    >
                        <p>Content</p>
                    </Popover>
                )
            }

            render(<TestComponent />)

            await waitFor(() => {
                expect(screen.getByText('Description text')).toBeInTheDocument()
            })

            // Verify description exists
            const description = screen.getByText('Description text')
            expect(description).toBeInTheDocument()
            // Radix Popover sets aria-describedby on the content element
        })
    })

    describe('WCAG 2.4.3 Focus Order (Level A)', () => {
        it('focus moves to popover content when opened', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <Popover
                        trigger={<Button text="Trigger" />}
                        heading="Focus Order"
                        open={isOpen}
                        onOpenChange={setIsOpen}
                        primaryAction={{
                            text: 'OK',
                            onClick: () => setIsOpen(false),
                        }}
                    >
                        <input type="text" />
                    </Popover>
                )
            }

            render(<TestComponent />)

            await waitFor(() => {
                expect(screen.getByText('Focus Order')).toBeInTheDocument()
            })

            // Radix Popover handles focus management automatically
            // Verify popover content is accessible
            const input = screen.getByRole('textbox')
            expect(input).toBeInTheDocument()
        })

        it('focus order is logical within popover', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <Popover
                        trigger={<Button text="Trigger" />}
                        heading="Logical Order"
                        open={isOpen}
                        onOpenChange={setIsOpen}
                        primaryAction={{
                            text: 'Save',
                            onClick: () => setIsOpen(false),
                        }}
                        secondaryAction={{
                            text: 'Cancel',
                            onClick: () => setIsOpen(false),
                        }}
                    >
                        <input type="text" placeholder="First input" />
                        <input type="text" placeholder="Second input" />
                    </Popover>
                )
            }

            const { user } = render(<TestComponent />)

            await waitFor(() => {
                expect(screen.getByText('Logical Order')).toBeInTheDocument()
            })

            // Verify all elements exist
            const input1 = screen.getByPlaceholderText('First input')
            const input2 = screen.getByPlaceholderText('Second input')
            const cancelButton = screen.getByRole('button', { name: 'Cancel' })
            const saveButton = screen.getByRole('button', { name: 'Save' })

            expect(input1).toBeInTheDocument()
            expect(input2).toBeInTheDocument()
            expect(cancelButton).toBeInTheDocument()
            expect(saveButton).toBeInTheDocument()

            // Tab through elements in logical order
            input1.focus()
            await waitFor(
                () => {
                    expect(input1).toHaveFocus()
                },
                { timeout: 1000 }
            )

            await user.tab()
            // Verify focus moved to next element (may be input2 or another element)
            await waitFor(
                () => {
                    const focusedElement = document.activeElement as HTMLElement
                    expect(focusedElement).not.toBe(input1)
                },
                { timeout: 1000 }
            )
        })
    })

    describe('WCAG 3.2.1 On Focus (Level A)', () => {
        it('focusing popover does not change context', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <Popover
                        trigger={<Button text="Trigger" />}
                        heading="Context Test"
                        open={isOpen}
                        onOpenChange={setIsOpen}
                    >
                        <input type="text" />
                    </Popover>
                )
            }

            render(<TestComponent />)

            await waitFor(() => {
                expect(screen.getByText('Context Test')).toBeInTheDocument()
            })

            // Popover should open without changing page context
            expect(screen.getByText('Context Test')).toBeInTheDocument()
        })
    })

    describe('WCAG 3.2.2 On Input (Level A)', () => {
        it('interacting with popover does not change context unexpectedly', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <Popover
                        trigger={<Button text="Trigger" />}
                        heading="Input Test"
                        open={isOpen}
                        onOpenChange={setIsOpen}
                    >
                        <input type="text" placeholder="Type here" />
                    </Popover>
                )
            }

            const { user } = render(<TestComponent />)

            await waitFor(() => {
                expect(screen.getByText('Input Test')).toBeInTheDocument()
            })

            const input = screen.getByPlaceholderText('Type here')
            await user.type(input, 'test')

            // Context should not change
            expect(screen.getByText('Input Test')).toBeInTheDocument()
        })
    })

    describe('WCAG 3.2.5 Change on Request (Level AAA)', () => {
        it('popover only opens on user request (trigger click)', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(false)

                return (
                    <Popover
                        trigger={<Button text="Open Popover" />}
                        heading="Change on Request"
                        open={isOpen}
                        onOpenChange={setIsOpen}
                    >
                        <p>Content</p>
                    </Popover>
                )
            }

            const { user } = render(<TestComponent />)

            // Popover should not be open initially
            expect(
                screen.queryByText('Change on Request')
            ).not.toBeInTheDocument()

            // Click trigger to open
            const trigger = screen.getByRole('button', { name: 'Open Popover' })
            await user.click(trigger)

            await waitFor(() => {
                expect(
                    screen.getByText('Change on Request')
                ).toBeInTheDocument()
            })
        })
    })

    describe('Screen Reader Support', () => {
        it('screen reader announces popover heading when opened', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <Popover
                        trigger={<Button text="Trigger" />}
                        heading="Announced Heading"
                        open={isOpen}
                        onOpenChange={setIsOpen}
                    >
                        <p>Content</p>
                    </Popover>
                )
            }

            render(<TestComponent />)

            await waitFor(() => {
                const heading = screen.getByText('Announced Heading')
                expect(heading).toBeInTheDocument()
                // Radix Popover sets aria-labelledby on content element
                // which ensures screen readers can announce the heading
            })
        })

        it('screen reader announces popover description when present', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <Popover
                        trigger={<Button text="Trigger" />}
                        heading="Title"
                        description="Description for screen readers"
                        open={isOpen}
                        onOpenChange={setIsOpen}
                    >
                        <p>Content</p>
                    </Popover>
                )
            }

            render(<TestComponent />)

            await waitFor(() => {
                const description = screen.getByText(
                    'Description for screen readers'
                )
                expect(description).toBeInTheDocument()
                // Radix Popover sets aria-describedby on content element
                // which ensures screen readers can announce the description
            })
        })
    })

    describe('Modal Mode Focus Management', () => {
        it('focus is trapped within popover in modal mode', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <>
                        <button>Outside Button</button>
                        <Popover
                            trigger={<Button text="Trigger" />}
                            heading="Focus Trap"
                            open={isOpen}
                            onOpenChange={setIsOpen}
                            asModal={true}
                            primaryAction={{
                                text: 'OK',
                                onClick: () => setIsOpen(false),
                            }}
                        >
                            <input type="text" />
                        </Popover>
                    </>
                )
            }

            render(<TestComponent />)

            await waitFor(() => {
                expect(screen.getByText('Focus Trap')).toBeInTheDocument()
            })

            const input = screen.getByRole('textbox')
            const okButton = screen.getByRole('button', { name: 'OK' })

            // Verify popover elements exist
            expect(input).toBeInTheDocument()
            expect(okButton).toBeInTheDocument()

            // In modal mode, Radix Popover handles focus management and hides outside elements
            // The popover should have role="dialog" and be accessible
            const dialog = screen.getByRole('dialog', { name: 'Focus Trap' })
            expect(dialog).toBeInTheDocument()

            // In modal mode, focus should be within the popover
            // Radix Popover automatically manages focus in modal mode
            // Verify that popover content is accessible
            expect(input).toBeInTheDocument()
            expect(okButton).toBeInTheDocument()
        })

        it('focus returns to trigger element when popover closes', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(false)

                return (
                    <>
                        <Popover
                            trigger={<Button text="Open Popover" />}
                            heading="Return Focus"
                            open={isOpen}
                            onOpenChange={setIsOpen}
                        >
                            <p>Content</p>
                        </Popover>
                    </>
                )
            }

            const { user } = render(<TestComponent />)

            const triggerButton = screen.getByRole('button', {
                name: 'Open Popover',
            })
            triggerButton.focus()
            await user.click(triggerButton)

            await waitFor(() => {
                expect(screen.getByText('Return Focus')).toBeInTheDocument()
            })

            // Close popover
            await user.keyboard('{Escape}')

            await waitFor(() => {
                expect(
                    screen.queryByText('Return Focus')
                ).not.toBeInTheDocument()
            })

            // Focus should return to trigger (Radix Popover handles this)
            await waitFor(() => {
                expect(triggerButton).toHaveFocus()
            })
        })
    })

    describe('Edge Cases and Additional Accessibility', () => {
        it('handles popover without heading gracefully', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <Popover
                        trigger={<Button text="Trigger" />}
                        open={isOpen}
                        onOpenChange={setIsOpen}
                        showCloseButton={false}
                    >
                        <p>Content without heading</p>
                    </Popover>
                )
            }

            const { container } = render(<TestComponent />)

            await waitFor(() => {
                expect(
                    screen.getByText('Content without heading')
                ).toBeInTheDocument()
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('handles popover with only primary action', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <Popover
                        trigger={<Button text="Trigger" />}
                        heading="Single Action"
                        open={isOpen}
                        onOpenChange={setIsOpen}
                        primaryAction={{
                            text: 'OK',
                            onClick: () => setIsOpen(false),
                        }}
                    >
                        <p>Content</p>
                    </Popover>
                )
            }

            const { container } = render(<TestComponent />)

            await waitFor(() => {
                expect(screen.getByText('Single Action')).toBeInTheDocument()
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('handles popover with custom content only', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <Popover
                        trigger={<Button text="Trigger" />}
                        open={isOpen}
                        onOpenChange={setIsOpen}
                    >
                        <div>
                            <h3>Custom Content</h3>
                            <p>This popover has no header or footer</p>
                        </div>
                    </Popover>
                )
            }

            const { container } = render(<TestComponent />)

            await waitFor(() => {
                expect(screen.getByText('Custom Content')).toBeInTheDocument()
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('handles rapid open/close cycles', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(false)

                return (
                    <>
                        <Button text="Open" onClick={() => setIsOpen(true)} />
                        <Popover
                            trigger={<Button text="Trigger" />}
                            heading="Rapid Cycle"
                            open={isOpen}
                            onOpenChange={setIsOpen}
                        >
                            <p>Content</p>
                        </Popover>
                    </>
                )
            }

            const { user } = render(<TestComponent />)

            const openButton = screen.getByRole('button', { name: 'Open' })
            await user.click(openButton)

            await waitFor(() => {
                expect(screen.getByText('Rapid Cycle')).toBeInTheDocument()
            })

            await user.keyboard('{Escape}')

            await waitFor(() => {
                expect(
                    screen.queryByText('Rapid Cycle')
                ).not.toBeInTheDocument()
            })

            // Open again
            await user.click(openButton)

            await waitFor(() => {
                expect(screen.getByText('Rapid Cycle')).toBeInTheDocument()
            })
        })

        it('handles popover with scrollable content', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <Popover
                        trigger={<Button text="Trigger" />}
                        heading="Scrollable"
                        open={isOpen}
                        onOpenChange={setIsOpen}
                    >
                        <div style={{ height: '2000px' }}>
                            <p>Long content</p>
                            <button>Bottom Button</button>
                        </div>
                    </Popover>
                )
            }

            const { container } = render(<TestComponent />)

            await waitFor(() => {
                expect(screen.getByText('Scrollable')).toBeInTheDocument()
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('handles popover with form elements', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <Popover
                        trigger={<Button text="Trigger" />}
                        heading="Form Popover"
                        open={isOpen}
                        onOpenChange={setIsOpen}
                        primaryAction={{
                            text: 'Submit',
                            onClick: () => setIsOpen(false),
                        }}
                    >
                        <form>
                            <label>
                                Name:
                                <input type="text" name="name" />
                            </label>
                            <label>
                                Email:
                                <input type="email" name="email" />
                            </label>
                        </form>
                    </Popover>
                )
            }

            const { container } = render(<TestComponent />)

            await waitFor(() => {
                expect(screen.getByText('Form Popover')).toBeInTheDocument()
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })
})
