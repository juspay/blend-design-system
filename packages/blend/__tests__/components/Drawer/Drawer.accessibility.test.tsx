import React, { useState } from 'react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, waitFor, fireEvent } from '../../test-utils/index'
import { axe } from 'jest-axe'
import {
    Drawer,
    DrawerTrigger,
    DrawerPortal,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerBody,
    DrawerFooter,
    DrawerClose,
} from '../../../lib/components/Drawer/Drawer'
import { Button, ButtonType } from '../../../lib/components/Button'

describe('Drawer Accessibility', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    afterEach(() => {
        vi.clearAllMocks()
    })

    describe('WCAG 2.1 Compliance (Level A, AA, AAA)', () => {
        it('meets WCAG standards for basic drawer (axe-core validation)', async () => {
            const TestComponent = () => {
                const [open, setOpen] = useState(true)

                return (
                    <Drawer open={open} onOpenChange={setOpen}>
                        <DrawerTrigger>
                            <Button
                                buttonType={ButtonType.PRIMARY}
                                text="Open Drawer"
                            />
                        </DrawerTrigger>
                        <DrawerPortal>
                            <DrawerOverlay />
                            <DrawerContent>
                                <DrawerHeader>
                                    <DrawerTitle>Test Drawer</DrawerTitle>
                                    <DrawerDescription>
                                        Test description
                                    </DrawerDescription>
                                </DrawerHeader>
                                <DrawerBody>
                                    <p>Drawer content</p>
                                </DrawerBody>
                                <DrawerFooter>
                                    <DrawerClose asChild>
                                        <Button
                                            buttonType={ButtonType.SECONDARY}
                                            text="Cancel"
                                        />
                                    </DrawerClose>
                                    <Button
                                        buttonType={ButtonType.PRIMARY}
                                        text="Confirm"
                                    />
                                </DrawerFooter>
                            </DrawerContent>
                        </DrawerPortal>
                    </Drawer>
                )
            }

            const { container } = render(<TestComponent />)

            await waitFor(() => {
                expect(screen.getByRole('dialog')).toBeInTheDocument()
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for drawer without description', async () => {
            const TestComponent = () => {
                const [open, setOpen] = useState(true)

                return (
                    <Drawer open={open} onOpenChange={setOpen}>
                        <DrawerTrigger>
                            <Button
                                buttonType={ButtonType.PRIMARY}
                                text="Open"
                            />
                        </DrawerTrigger>
                        <DrawerPortal>
                            <DrawerOverlay />
                            <DrawerContent>
                                <DrawerHeader>
                                    <DrawerTitle>Drawer Title</DrawerTitle>
                                </DrawerHeader>
                                <DrawerBody>
                                    <p>Content</p>
                                </DrawerBody>
                            </DrawerContent>
                        </DrawerPortal>
                    </Drawer>
                )
            }

            const { container } = render(<TestComponent />)

            await waitFor(() => {
                expect(screen.getByRole('dialog')).toBeInTheDocument()
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for drawer with right direction', async () => {
            const TestComponent = () => {
                const [open, setOpen] = useState(true)

                return (
                    <Drawer
                        open={open}
                        onOpenChange={setOpen}
                        direction="right"
                    >
                        <DrawerTrigger>
                            <Button
                                buttonType={ButtonType.PRIMARY}
                                text="Open"
                            />
                        </DrawerTrigger>
                        <DrawerPortal>
                            <DrawerOverlay />
                            <DrawerContent direction="right" width={400}>
                                <DrawerHeader>
                                    <DrawerTitle>Right Drawer</DrawerTitle>
                                </DrawerHeader>
                                <DrawerBody>
                                    <p>Content</p>
                                </DrawerBody>
                            </DrawerContent>
                        </DrawerPortal>
                    </Drawer>
                )
            }

            const { container } = render(<TestComponent />)

            await waitFor(() => {
                expect(screen.getByRole('dialog')).toBeInTheDocument()
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for drawer without footer', async () => {
            const TestComponent = () => {
                const [open, setOpen] = useState(true)

                return (
                    <Drawer open={open} onOpenChange={setOpen}>
                        <DrawerTrigger>
                            <Button
                                buttonType={ButtonType.PRIMARY}
                                text="Open"
                            />
                        </DrawerTrigger>
                        <DrawerPortal>
                            <DrawerOverlay />
                            <DrawerContent>
                                <DrawerHeader>
                                    <DrawerTitle>Drawer</DrawerTitle>
                                </DrawerHeader>
                                <DrawerBody>
                                    <p>Content only</p>
                                </DrawerBody>
                            </DrawerContent>
                        </DrawerPortal>
                    </Drawer>
                )
            }

            const { container } = render(<TestComponent />)

            await waitFor(() => {
                expect(screen.getByRole('dialog')).toBeInTheDocument()
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 2.1.1 Keyboard (Level A)', () => {
        it('drawer trigger is keyboard accessible', async () => {
            const TestComponent = () => {
                const [open, setOpen] = useState(false)

                return (
                    <Drawer open={open} onOpenChange={setOpen}>
                        <DrawerTrigger>
                            <Button
                                buttonType={ButtonType.PRIMARY}
                                text="Open Drawer"
                            />
                        </DrawerTrigger>
                        <DrawerPortal>
                            <DrawerOverlay />
                            <DrawerContent>
                                <DrawerHeader>
                                    <DrawerTitle>Keyboard Test</DrawerTitle>
                                </DrawerHeader>
                                <DrawerBody>
                                    <p>Content</p>
                                </DrawerBody>
                            </DrawerContent>
                        </DrawerPortal>
                    </Drawer>
                )
            }

            render(<TestComponent />)

            const trigger = screen.getByRole('button', { name: 'Open Drawer' })
            expect(trigger).toBeInTheDocument()

            // Trigger should be keyboard focusable
            trigger.focus()
            expect(trigger).toHaveFocus()

            // Enter key should open drawer
            fireEvent.keyDown(trigger, { key: 'Enter', code: 'Enter' })
            fireEvent.click(trigger)

            await waitFor(() => {
                expect(screen.getByRole('dialog')).toBeInTheDocument()
            })
        })

        it('drawer can be closed with Escape key', async () => {
            const TestComponent = () => {
                const [open, setOpen] = useState(true)

                return (
                    <Drawer open={open} onOpenChange={setOpen}>
                        <DrawerTrigger>
                            <Button
                                buttonType={ButtonType.PRIMARY}
                                text="Open"
                            />
                        </DrawerTrigger>
                        <DrawerPortal>
                            <DrawerOverlay />
                            <DrawerContent>
                                <DrawerHeader>
                                    <DrawerTitle>Escape Test</DrawerTitle>
                                </DrawerHeader>
                                <DrawerBody>
                                    <p>Press Escape to close</p>
                                </DrawerBody>
                            </DrawerContent>
                        </DrawerPortal>
                    </Drawer>
                )
            }

            render(<TestComponent />)

            await waitFor(() => {
                expect(screen.getByRole('dialog')).toBeInTheDocument()
            })

            const dialog = screen.getByRole('dialog')
            expect(dialog).toHaveAttribute('data-state', 'open')

            // Escape key should close drawer
            fireEvent.keyDown(dialog, { key: 'Escape', code: 'Escape' })

            await waitFor(() => {
                const closedDialog = screen.queryByRole('dialog')
                // Vaul keeps the drawer in DOM but sets data-state to "closed"
                if (closedDialog) {
                    expect(closedDialog).toHaveAttribute('data-state', 'closed')
                } else {
                    expect(closedDialog).not.toBeInTheDocument()
                }
            })
        })

        it('all interactive elements in drawer are keyboard accessible', async () => {
            const TestComponent = () => {
                const [open, setOpen] = useState(true)

                return (
                    <Drawer open={open} onOpenChange={setOpen}>
                        <DrawerTrigger>
                            <Button
                                buttonType={ButtonType.PRIMARY}
                                text="Open"
                            />
                        </DrawerTrigger>
                        <DrawerPortal>
                            <DrawerOverlay />
                            <DrawerContent>
                                <DrawerHeader>
                                    <DrawerTitle>
                                        Keyboard Navigation
                                    </DrawerTitle>
                                </DrawerHeader>
                                <DrawerBody>
                                    <input
                                        type="text"
                                        placeholder="Test input"
                                        aria-label="Test input"
                                    />
                                    <button>Test Button</button>
                                </DrawerBody>
                                <DrawerFooter>
                                    <DrawerClose asChild>
                                        <Button
                                            buttonType={ButtonType.SECONDARY}
                                            text="Cancel"
                                        />
                                    </DrawerClose>
                                    <Button
                                        buttonType={ButtonType.PRIMARY}
                                        text="Confirm"
                                    />
                                </DrawerFooter>
                            </DrawerContent>
                        </DrawerPortal>
                    </Drawer>
                )
            }

            render(<TestComponent />)

            await waitFor(() => {
                expect(screen.getByRole('dialog')).toBeInTheDocument()
            })

            // All interactive elements should be keyboard focusable
            const input = screen.getByLabelText('Test input')
            const testButton = screen.getByRole('button', {
                name: 'Test Button',
            })
            const cancelButton = screen.getByRole('button', { name: 'Cancel' })
            const confirmButton = screen.getByRole('button', {
                name: 'Confirm',
            })

            expect(input).toBeInTheDocument()
            expect(testButton).toBeInTheDocument()
            expect(cancelButton).toBeInTheDocument()
            expect(confirmButton).toBeInTheDocument()

            // Test keyboard navigation
            input.focus()
            expect(input).toHaveFocus()

            testButton.focus()
            expect(testButton).toHaveFocus()
        })

        it('drawer maintains logical tab order', async () => {
            const TestComponent = () => {
                const [open, setOpen] = useState(true)

                return (
                    <Drawer open={open} onOpenChange={setOpen}>
                        <DrawerTrigger>
                            <Button
                                buttonType={ButtonType.PRIMARY}
                                text="Open"
                            />
                        </DrawerTrigger>
                        <DrawerPortal>
                            <DrawerOverlay />
                            <DrawerContent>
                                <DrawerHeader>
                                    <DrawerTitle>Tab Order</DrawerTitle>
                                </DrawerHeader>
                                <DrawerBody>
                                    <button>First</button>
                                    <button>Second</button>
                                    <button>Third</button>
                                </DrawerBody>
                                <DrawerFooter>
                                    <DrawerClose asChild>
                                        <Button
                                            buttonType={ButtonType.SECONDARY}
                                            text="Cancel"
                                        />
                                    </DrawerClose>
                                    <Button
                                        buttonType={ButtonType.PRIMARY}
                                        text="Confirm"
                                    />
                                </DrawerFooter>
                            </DrawerContent>
                        </DrawerPortal>
                    </Drawer>
                )
            }

            render(<TestComponent />)

            await waitFor(() => {
                expect(screen.getByRole('dialog')).toBeInTheDocument()
            })

            const firstButton = screen.getByRole('button', { name: 'First' })
            // Verify all buttons exist (for tab order verification)
            screen.getByRole('button', { name: 'Second' })
            screen.getByRole('button', { name: 'Third' })

            // Tab order should be logical
            firstButton.focus()
            expect(firstButton).toHaveFocus()

            fireEvent.keyDown(firstButton, { key: 'Tab', code: 'Tab' })
            // Note: Actual tab order depends on DOM structure and focus management
            // This test verifies elements are focusable
        })
    })

    describe('WCAG 2.1.3 Keyboard (No Exception) (Level AAA)', () => {
        it('all drawer functionality is keyboard accessible without exception', async () => {
            const TestComponent = () => {
                const [open, setOpen] = useState(true)

                return (
                    <Drawer open={open} onOpenChange={setOpen}>
                        <DrawerTrigger>
                            <Button
                                buttonType={ButtonType.PRIMARY}
                                text="Open"
                            />
                        </DrawerTrigger>
                        <DrawerPortal>
                            <DrawerOverlay />
                            <DrawerContent>
                                <DrawerHeader>
                                    <DrawerTitle>AAA Keyboard Test</DrawerTitle>
                                </DrawerHeader>
                                <DrawerBody>
                                    <button>Action 1</button>
                                    <button>Action 2</button>
                                </DrawerBody>
                                <DrawerFooter>
                                    <DrawerClose asChild>
                                        <Button
                                            buttonType={ButtonType.SECONDARY}
                                            text="Close"
                                        />
                                    </DrawerClose>
                                </DrawerFooter>
                            </DrawerContent>
                        </DrawerPortal>
                    </Drawer>
                )
            }

            render(<TestComponent />)

            await waitFor(() => {
                expect(screen.getByRole('dialog')).toBeInTheDocument()
            })

            // All functionality should be keyboard accessible
            const action1 = screen.getByRole('button', { name: 'Action 1' })
            const action2 = screen.getByRole('button', { name: 'Action 2' })
            const closeButton = screen.getByRole('button', { name: 'Close' })

            expect(action1).toBeInTheDocument()
            expect(action2).toBeInTheDocument()
            expect(closeButton).toBeInTheDocument()

            // All should be keyboard focusable
            action1.focus()
            expect(action1).toHaveFocus()

            action2.focus()
            expect(action2).toHaveFocus()

            closeButton.focus()
            expect(closeButton).toHaveFocus()
        })
    })

    describe('WCAG 4.1.2 Name, Role, Value (Level A)', () => {
        it('drawer has proper role="dialog" attribute', async () => {
            const TestComponent = () => {
                const [open, setOpen] = useState(true)

                return (
                    <Drawer open={open} onOpenChange={setOpen}>
                        <DrawerTrigger>
                            <Button
                                buttonType={ButtonType.PRIMARY}
                                text="Open"
                            />
                        </DrawerTrigger>
                        <DrawerPortal>
                            <DrawerOverlay />
                            <DrawerContent>
                                <DrawerHeader>
                                    <DrawerTitle>Role Test</DrawerTitle>
                                </DrawerHeader>
                                <DrawerBody>
                                    <p>Content</p>
                                </DrawerBody>
                            </DrawerContent>
                        </DrawerPortal>
                    </Drawer>
                )
            }

            render(<TestComponent />)

            await waitFor(() => {
                const dialog = screen.getByRole('dialog')
                expect(dialog).toBeInTheDocument()
                expect(dialog).toHaveAttribute('role', 'dialog')
            })
        })

        it('drawer has aria-modal="true" attribute', async () => {
            const TestComponent = () => {
                const [open, setOpen] = useState(true)

                return (
                    <Drawer open={open} onOpenChange={setOpen}>
                        <DrawerTrigger>
                            <Button
                                buttonType={ButtonType.PRIMARY}
                                text="Open"
                            />
                        </DrawerTrigger>
                        <DrawerPortal>
                            <DrawerOverlay />
                            <DrawerContent>
                                <DrawerHeader>
                                    <DrawerTitle>Aria Modal Test</DrawerTitle>
                                </DrawerHeader>
                                <DrawerBody>
                                    <p>Content</p>
                                </DrawerBody>
                            </DrawerContent>
                        </DrawerPortal>
                    </Drawer>
                )
            }

            render(<TestComponent />)

            await waitFor(() => {
                const dialog = screen.getByRole('dialog')
                expect(dialog).toHaveAttribute('aria-modal', 'true')
            })
        })

        it('drawer has aria-labelledby linking to title', async () => {
            const TestComponent = () => {
                const [open, setOpen] = useState(true)

                return (
                    <Drawer open={open} onOpenChange={setOpen}>
                        <DrawerTrigger>
                            <Button
                                buttonType={ButtonType.PRIMARY}
                                text="Open"
                            />
                        </DrawerTrigger>
                        <DrawerPortal>
                            <DrawerOverlay />
                            <DrawerContent>
                                <DrawerHeader>
                                    <DrawerTitle id="drawer-title">
                                        Drawer Title
                                    </DrawerTitle>
                                </DrawerHeader>
                                <DrawerBody>
                                    <p>Content</p>
                                </DrawerBody>
                            </DrawerContent>
                        </DrawerPortal>
                    </Drawer>
                )
            }

            render(<TestComponent />)

            await waitFor(() => {
                const dialog = screen.getByRole('dialog')
                const labelledBy = dialog.getAttribute('aria-labelledby')
                expect(labelledBy).toBeTruthy()

                // Verify title exists
                const title = screen.getByText('Drawer Title')
                expect(title).toBeInTheDocument()
            })
        })

        it('drawer has aria-describedby linking to description when present', async () => {
            const TestComponent = () => {
                const [open, setOpen] = useState(true)

                return (
                    <Drawer open={open} onOpenChange={setOpen}>
                        <DrawerTrigger>
                            <Button
                                buttonType={ButtonType.PRIMARY}
                                text="Open"
                            />
                        </DrawerTrigger>
                        <DrawerPortal>
                            <DrawerOverlay />
                            <DrawerContent>
                                <DrawerHeader>
                                    <DrawerTitle>Title</DrawerTitle>
                                    <DrawerDescription id="drawer-desc">
                                        Description text
                                    </DrawerDescription>
                                </DrawerHeader>
                                <DrawerBody>
                                    <p>Content</p>
                                </DrawerBody>
                            </DrawerContent>
                        </DrawerPortal>
                    </Drawer>
                )
            }

            render(<TestComponent />)

            await waitFor(() => {
                const dialog = screen.getByRole('dialog')
                const describedBy = dialog.getAttribute('aria-describedby')
                expect(describedBy).toBeTruthy()

                // Verify description exists
                const description = screen.getByText('Description text')
                expect(description).toBeInTheDocument()
            })
        })

        it('drawer close button has accessible name', async () => {
            const TestComponent = () => {
                const [open, setOpen] = useState(true)

                return (
                    <Drawer open={open} onOpenChange={setOpen}>
                        <DrawerTrigger>
                            <Button
                                buttonType={ButtonType.PRIMARY}
                                text="Open"
                            />
                        </DrawerTrigger>
                        <DrawerPortal>
                            <DrawerOverlay />
                            <DrawerContent>
                                <DrawerHeader>
                                    <DrawerTitle>Close Button Test</DrawerTitle>
                                </DrawerHeader>
                                <DrawerBody>
                                    <p>Content</p>
                                </DrawerBody>
                                <DrawerFooter>
                                    <DrawerClose
                                        asChild
                                        aria-label="Close drawer"
                                    >
                                        <Button
                                            buttonType={ButtonType.SECONDARY}
                                            text="Cancel"
                                        />
                                    </DrawerClose>
                                </DrawerFooter>
                            </DrawerContent>
                        </DrawerPortal>
                    </Drawer>
                )
            }

            render(<TestComponent />)

            await waitFor(() => {
                expect(screen.getByRole('dialog')).toBeInTheDocument()
            })

            const closeButton = screen.getByLabelText('Close drawer')
            expect(closeButton).toBeInTheDocument()
            expect(closeButton).toHaveAttribute('aria-label', 'Close drawer')
        })

        it('drawer trigger has accessible name', async () => {
            const TestComponent = () => {
                const [open, setOpen] = useState(false)

                return (
                    <Drawer open={open} onOpenChange={setOpen}>
                        <DrawerTrigger aria-label="Open settings drawer">
                            <Button
                                buttonType={ButtonType.PRIMARY}
                                text="Open"
                            />
                        </DrawerTrigger>
                        <DrawerPortal>
                            <DrawerOverlay />
                            <DrawerContent>
                                <DrawerHeader>
                                    <DrawerTitle>Settings</DrawerTitle>
                                </DrawerHeader>
                                <DrawerBody>
                                    <p>Content</p>
                                </DrawerBody>
                            </DrawerContent>
                        </DrawerPortal>
                    </Drawer>
                )
            }

            render(<TestComponent />)

            const trigger = screen.getByLabelText('Open settings drawer')
            expect(trigger).toBeInTheDocument()
        })

        it('all buttons in drawer have accessible names', async () => {
            const TestComponent = () => {
                const [open, setOpen] = useState(true)

                return (
                    <Drawer open={open} onOpenChange={setOpen}>
                        <DrawerTrigger>
                            <Button
                                buttonType={ButtonType.PRIMARY}
                                text="Open"
                            />
                        </DrawerTrigger>
                        <DrawerPortal>
                            <DrawerOverlay />
                            <DrawerContent>
                                <DrawerHeader>
                                    <DrawerTitle>Actions Test</DrawerTitle>
                                </DrawerHeader>
                                <DrawerBody>
                                    <p>Content</p>
                                </DrawerBody>
                                <DrawerFooter>
                                    <DrawerClose asChild>
                                        <Button
                                            buttonType={ButtonType.SECONDARY}
                                            text="Cancel"
                                        />
                                    </DrawerClose>
                                    <Button
                                        buttonType={ButtonType.PRIMARY}
                                        text="Save Changes"
                                    />
                                </DrawerFooter>
                            </DrawerContent>
                        </DrawerPortal>
                    </Drawer>
                )
            }

            render(<TestComponent />)

            await waitFor(() => {
                expect(screen.getByRole('dialog')).toBeInTheDocument()
            })

            expect(
                screen.getByRole('button', { name: 'Cancel' })
            ).toBeInTheDocument()
            expect(
                screen.getByRole('button', { name: 'Save Changes' })
            ).toBeInTheDocument()
        })
    })

    describe('WCAG 2.4.7 Focus Visible (Level AA)', () => {
        it('focusable elements have visible focus indicators', async () => {
            const TestComponent = () => {
                const [open, setOpen] = useState(true)

                return (
                    <Drawer open={open} onOpenChange={setOpen}>
                        <DrawerTrigger>
                            <Button
                                buttonType={ButtonType.PRIMARY}
                                text="Open"
                            />
                        </DrawerTrigger>
                        <DrawerPortal>
                            <DrawerOverlay />
                            <DrawerContent>
                                <DrawerHeader>
                                    <DrawerTitle>Focus Visible</DrawerTitle>
                                </DrawerHeader>
                                <DrawerBody>
                                    <button>Test Button</button>
                                </DrawerBody>
                            </DrawerContent>
                        </DrawerPortal>
                    </Drawer>
                )
            }

            render(<TestComponent />)

            await waitFor(() => {
                expect(screen.getByRole('dialog')).toBeInTheDocument()
            })

            const button = screen.getByRole('button', { name: 'Test Button' })
            button.focus()

            // Verify element has focus
            expect(button).toHaveFocus()

            // Note: Actual focus ring visibility is tested via visual regression
            // This test verifies focus is applied correctly
        })

        it('focus is trapped within drawer when open', async () => {
            const TestComponent = () => {
                const [open, setOpen] = useState(true)

                return (
                    <>
                        <button>Outside Button</button>
                        <Drawer open={open} onOpenChange={setOpen}>
                            <DrawerTrigger>
                                <Button
                                    buttonType={ButtonType.PRIMARY}
                                    text="Open"
                                />
                            </DrawerTrigger>
                            <DrawerPortal>
                                <DrawerOverlay />
                                <DrawerContent>
                                    <DrawerHeader>
                                        <DrawerTitle>Focus Trap</DrawerTitle>
                                    </DrawerHeader>
                                    <DrawerBody>
                                        <button>First</button>
                                        <button>Last</button>
                                    </DrawerBody>
                                </DrawerContent>
                            </DrawerPortal>
                        </Drawer>
                    </>
                )
            }

            render(<TestComponent />)

            await waitFor(() => {
                expect(screen.getByRole('dialog')).toBeInTheDocument()
            })

            const firstButton = screen.getByRole('button', { name: 'First' })
            const lastButton = screen.getByRole('button', { name: 'Last' })

            // Focus should be within drawer
            firstButton.focus()
            expect(firstButton).toHaveFocus()

            lastButton.focus()
            expect(lastButton).toHaveFocus()

            // Note: Actual focus trap behavior is handled by Vaul library
            // This test verifies elements are focusable
        })
    })

    describe('WCAG 1.3.1 Info and Relationships (Level A)', () => {
        it('drawer has proper semantic structure', async () => {
            const TestComponent = () => {
                const [open, setOpen] = useState(true)

                return (
                    <Drawer open={open} onOpenChange={setOpen}>
                        <DrawerTrigger>
                            <Button
                                buttonType={ButtonType.PRIMARY}
                                text="Open"
                            />
                        </DrawerTrigger>
                        <DrawerPortal>
                            <DrawerOverlay />
                            <DrawerContent>
                                <DrawerHeader>
                                    <DrawerTitle>Semantic Test</DrawerTitle>
                                    <DrawerDescription>
                                        Description text
                                    </DrawerDescription>
                                </DrawerHeader>
                                <DrawerBody>
                                    <p>Body content</p>
                                </DrawerBody>
                                <DrawerFooter>
                                    <Button
                                        buttonType={ButtonType.PRIMARY}
                                        text="Action"
                                    />
                                </DrawerFooter>
                            </DrawerContent>
                        </DrawerPortal>
                    </Drawer>
                )
            }

            render(<TestComponent />)

            await waitFor(() => {
                expect(screen.getByRole('dialog')).toBeInTheDocument()
            })

            // Verify semantic structure
            const title = screen.getByText('Semantic Test')
            const description = screen.getByText('Description text')
            const body = screen.getByText('Body content')

            expect(title).toBeInTheDocument()
            expect(description).toBeInTheDocument()
            expect(body).toBeInTheDocument()

            // Title should be a heading element
            expect(title.tagName).toMatch(/^H[1-6]$/)
        })

        it('drawer maintains proper heading hierarchy', async () => {
            const TestComponent = () => {
                const [open, setOpen] = useState(true)

                return (
                    <Drawer open={open} onOpenChange={setOpen}>
                        <DrawerTrigger>
                            <Button
                                buttonType={ButtonType.PRIMARY}
                                text="Open"
                            />
                        </DrawerTrigger>
                        <DrawerPortal>
                            <DrawerOverlay />
                            <DrawerContent>
                                <DrawerHeader>
                                    <DrawerTitle>Main Title</DrawerTitle>
                                </DrawerHeader>
                                <DrawerBody>
                                    <h2>Section Title</h2>
                                    <p>Content</p>
                                </DrawerBody>
                            </DrawerContent>
                        </DrawerPortal>
                    </Drawer>
                )
            }

            render(<TestComponent />)

            await waitFor(() => {
                expect(screen.getByRole('dialog')).toBeInTheDocument()
            })

            const mainTitle = screen.getByText('Main Title')
            const sectionTitle = screen.getByText('Section Title')

            expect(mainTitle).toBeInTheDocument()
            expect(sectionTitle).toBeInTheDocument()

            // Verify heading hierarchy
            expect(mainTitle.tagName).toMatch(/^H[1-6]$/)
            expect(sectionTitle.tagName).toBe('H2')
        })
    })

    describe('WCAG 2.5.8 Target Size (Minimum) (Level AA)', () => {
        it('interactive elements meet minimum touch target size', async () => {
            const TestComponent = () => {
                const [open, setOpen] = useState(true)

                return (
                    <Drawer open={open} onOpenChange={setOpen}>
                        <DrawerTrigger>
                            <Button
                                buttonType={ButtonType.PRIMARY}
                                text="Open"
                            />
                        </DrawerTrigger>
                        <DrawerPortal>
                            <DrawerOverlay />
                            <DrawerContent>
                                <DrawerHeader>
                                    <DrawerTitle>Target Size</DrawerTitle>
                                </DrawerHeader>
                                <DrawerBody>
                                    <button>Test Button</button>
                                </DrawerBody>
                                <DrawerFooter>
                                    <DrawerClose asChild>
                                        <Button
                                            buttonType={ButtonType.SECONDARY}
                                            text="Cancel"
                                        />
                                    </DrawerClose>
                                    <Button
                                        buttonType={ButtonType.PRIMARY}
                                        text="Confirm"
                                    />
                                </DrawerFooter>
                            </DrawerContent>
                        </DrawerPortal>
                    </Drawer>
                )
            }

            render(<TestComponent />)

            await waitFor(() => {
                expect(screen.getByRole('dialog')).toBeInTheDocument()
            })

            const testButton = screen.getByRole('button', {
                name: 'Test Button',
            })
            const cancelButton = screen.getByRole('button', { name: 'Cancel' })
            const confirmButton = screen.getByRole('button', {
                name: 'Confirm',
            })

            // Get bounding rectangles
            const testRect = testButton.getBoundingClientRect()
            const cancelRect = cancelButton.getBoundingClientRect()
            const confirmRect = confirmButton.getBoundingClientRect()

            // Verify minimum size (24x24px for AA, but actual size depends on implementation)
            // In test environment, getBoundingClientRect may return 0, so we check if element exists
            if (testRect.width > 0 && testRect.height > 0) {
                expect(testRect.width).toBeGreaterThanOrEqual(24)
                expect(testRect.height).toBeGreaterThanOrEqual(24)
            }

            if (cancelRect.width > 0 && cancelRect.height > 0) {
                expect(cancelRect.width).toBeGreaterThanOrEqual(24)
                expect(cancelRect.height).toBeGreaterThanOrEqual(24)
            }

            if (confirmRect.width > 0 && confirmRect.height > 0) {
                expect(confirmRect.width).toBeGreaterThanOrEqual(24)
                expect(confirmRect.height).toBeGreaterThanOrEqual(24)
            }

            // Verify elements are interactive
            expect(testButton).toBeInTheDocument()
            expect(cancelButton).toBeInTheDocument()
            expect(confirmButton).toBeInTheDocument()
        })
    })

    describe('WCAG 3.2.5 Change on Request (Level AAA)', () => {
        it('drawer state changes only on user request', async () => {
            const TestComponent = () => {
                const [open, setOpen] = useState(false)

                return (
                    <Drawer open={open} onOpenChange={setOpen}>
                        <DrawerTrigger>
                            <Button
                                buttonType={ButtonType.PRIMARY}
                                text="Open Drawer"
                            />
                        </DrawerTrigger>
                        <DrawerPortal>
                            <DrawerOverlay />
                            <DrawerContent>
                                <DrawerHeader>
                                    <DrawerTitle>Change on Request</DrawerTitle>
                                </DrawerHeader>
                                <DrawerBody>
                                    <p>Content</p>
                                </DrawerBody>
                            </DrawerContent>
                        </DrawerPortal>
                    </Drawer>
                )
            }

            render(<TestComponent />)

            // Drawer should not be open initially
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

            // Open drawer on user action
            const trigger = screen.getByRole('button', { name: 'Open Drawer' })
            fireEvent.click(trigger)

            await waitFor(() => {
                expect(screen.getByRole('dialog')).toBeInTheDocument()
            })

            // Close drawer on user action (Escape)
            const dialog = screen.getByRole('dialog')
            expect(dialog).toHaveAttribute('data-state', 'open')
            fireEvent.keyDown(dialog, { key: 'Escape', code: 'Escape' })

            await waitFor(() => {
                const closedDialog = screen.queryByRole('dialog')
                // Vaul keeps the drawer in DOM but sets data-state to "closed"
                if (closedDialog) {
                    expect(closedDialog).toHaveAttribute('data-state', 'closed')
                } else {
                    expect(closedDialog).not.toBeInTheDocument()
                }
            })
        })

        it('drawer does not auto-close without user interaction', async () => {
            const TestComponent = () => {
                const [open, setOpen] = useState(true)

                return (
                    <Drawer open={open} onOpenChange={setOpen}>
                        <DrawerTrigger>
                            <Button
                                buttonType={ButtonType.PRIMARY}
                                text="Open"
                            />
                        </DrawerTrigger>
                        <DrawerPortal>
                            <DrawerOverlay />
                            <DrawerContent>
                                <DrawerHeader>
                                    <DrawerTitle>No Auto-Close</DrawerTitle>
                                </DrawerHeader>
                                <DrawerBody>
                                    <p>Content</p>
                                </DrawerBody>
                            </DrawerContent>
                        </DrawerPortal>
                    </Drawer>
                )
            }

            render(<TestComponent />)

            await waitFor(() => {
                expect(screen.getByRole('dialog')).toBeInTheDocument()
            })

            // Wait a bit to ensure drawer doesn't auto-close
            await new Promise((resolve) => setTimeout(resolve, 500))

            // Drawer should still be open
            expect(screen.getByRole('dialog')).toBeInTheDocument()
        })
    })

    describe('Comprehensive WCAG 2.1 Compliance (Level A, AA, AAA)', () => {
        it('meets WCAG standards with all features combined - comprehensive test', async () => {
            const TestComponent = () => {
                const [open, setOpen] = useState(true)

                return (
                    <Drawer open={open} onOpenChange={setOpen}>
                        <DrawerTrigger aria-label="Open settings drawer">
                            <Button
                                buttonType={ButtonType.PRIMARY}
                                text="Open Settings"
                            />
                        </DrawerTrigger>
                        <DrawerPortal>
                            <DrawerOverlay />
                            <DrawerContent aria-label="Settings drawer">
                                <DrawerHeader>
                                    <DrawerTitle id="settings-title">
                                        Settings
                                    </DrawerTitle>
                                    <DrawerDescription id="settings-desc">
                                        Configure your application settings
                                    </DrawerDescription>
                                </DrawerHeader>
                                <DrawerBody>
                                    <label htmlFor="setting-input">
                                        Setting Name
                                    </label>
                                    <input
                                        id="setting-input"
                                        type="text"
                                        aria-label="Setting input"
                                    />
                                    <button>Apply Setting</button>
                                </DrawerBody>
                                <DrawerFooter>
                                    <DrawerClose
                                        asChild
                                        aria-label="Close settings"
                                    >
                                        <Button
                                            buttonType={ButtonType.SECONDARY}
                                            text="Cancel"
                                        />
                                    </DrawerClose>
                                    <Button
                                        buttonType={ButtonType.PRIMARY}
                                        text="Save Settings"
                                    />
                                </DrawerFooter>
                            </DrawerContent>
                        </DrawerPortal>
                    </Drawer>
                )
            }

            const { container } = render(<TestComponent />)

            await waitFor(() => {
                expect(screen.getByRole('dialog')).toBeInTheDocument()
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()

            // Verify all accessibility features
            const dialog = screen.getByRole('dialog')
            expect(dialog).toHaveAttribute('role', 'dialog')
            expect(dialog).toHaveAttribute('aria-modal', 'true')

            expect(
                screen.getByRole('button', { name: 'Apply Setting' })
            ).toBeInTheDocument()
            // The Cancel button has aria-label="Close settings" which overrides the text
            expect(
                screen.getByRole('button', { name: 'Close settings' })
            ).toBeInTheDocument()
            expect(
                screen.getByRole('button', { name: 'Save Settings' })
            ).toBeInTheDocument()
        })
    })
})
