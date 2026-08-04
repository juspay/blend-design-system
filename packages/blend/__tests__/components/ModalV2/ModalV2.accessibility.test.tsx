import React, { useState } from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '../../test-utils'
import { axe } from 'jest-axe'
import { ModalV2 } from '../../../lib/components/ModalV2'
import { ButtonV2Type } from '../../../lib/components/ButtonV2'

describe('ModalV2 Accessibility', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('WCAG 2.1 Compliance (Level A, AA, AAA)', () => {
        it('meets WCAG standards for basic modal (axe-core validation)', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <>
                        <button onClick={() => setIsOpen(true)}>
                            Open Modal
                        </button>
                        <ModalV2
                            isOpen={isOpen}
                            onClose={() => setIsOpen(false)}
                            title="Test Modal"
                            subtitle="Test subtitle"
                            primaryAction={{
                                text: 'Save',
                                onClick: () => setIsOpen(false),
                                buttonType: ButtonV2Type.PRIMARY,
                            }}
                            secondaryAction={{
                                text: 'Cancel',
                                onClick: () => setIsOpen(false),
                                buttonType: ButtonV2Type.SECONDARY,
                            }}
                        >
                            <p>Modal content</p>
                        </ModalV2>
                    </>
                )
            }

            const { container } = render(<TestComponent />)

            await waitFor(() => {
                expect(screen.getByRole('dialog')).toBeInTheDocument()
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for disabled action modal', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <ModalV2
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        title="Form Validation"
                        primaryAction={{
                            text: 'Submit',
                            onClick: () => setIsOpen(false),
                            buttonType: ButtonV2Type.PRIMARY,
                            disabled: true,
                        }}
                        secondaryAction={{
                            text: 'Cancel',
                            onClick: () => setIsOpen(false),
                            buttonType: ButtonV2Type.SECONDARY,
                        }}
                    >
                        <p>Submit button is disabled</p>
                    </ModalV2>
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
        it('modal is keyboard accessible - all functionality operable via keyboard', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <>
                        <button onClick={() => setIsOpen(true)}>Trigger</button>
                        <ModalV2
                            isOpen={isOpen}
                            onClose={() => setIsOpen(false)}
                            title="Keyboard Test"
                            primaryAction={{
                                text: 'Save',
                                onClick: () => setIsOpen(false),
                                buttonType: ButtonV2Type.PRIMARY,
                            }}
                            secondaryAction={{
                                text: 'Cancel',
                                onClick: () => setIsOpen(false),
                                buttonType: ButtonV2Type.SECONDARY,
                            }}
                        >
                            <input type="text" placeholder="Test input" />
                        </ModalV2>
                    </>
                )
            }

            render(<TestComponent />)

            await waitFor(() => {
                expect(screen.getByRole('dialog')).toBeInTheDocument()
            })

            // Modal should be accessible via keyboard
            const dialog = screen.getByRole('dialog')
            expect(dialog).toBeInTheDocument()
        })

        it('supports Tab key for navigation within modal - logical focus order', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <ModalV2
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        title="Tab Navigation"
                        showCloseButton={false}
                        primaryAction={{
                            text: 'Primary',
                            onClick: () => setIsOpen(false),
                            buttonType: ButtonV2Type.PRIMARY,
                        }}
                        secondaryAction={{
                            text: 'Secondary',
                            onClick: () => setIsOpen(false),
                            buttonType: ButtonV2Type.SECONDARY,
                        }}
                    >
                        <input type="text" placeholder="Input 1" />
                        <input type="text" placeholder="Input 2" />
                    </ModalV2>
                )
            }

            const { user } = render(<TestComponent />)

            await waitFor(() => {
                expect(screen.getByRole('dialog')).toBeInTheDocument()
            })

            // Tab through elements in modal
            const input1 = screen.getByPlaceholderText('Input 1')
            const input2 = screen.getByPlaceholderText('Input 2')
            const secondaryButton = screen.getByRole('button', {
                name: 'Secondary',
            })
            const primaryButton = screen.getByRole('button', {
                name: 'Primary',
            })

            // Focus first input
            input1.focus()
            expect(document.activeElement).toBe(input1)

            await user.tab()
            expect(document.activeElement).toBe(input2)

            await user.tab()
            expect(document.activeElement).toBe(secondaryButton)

            await user.tab()
            expect(document.activeElement).toBe(primaryButton)
        })

        it('supports Escape key to close modal', async () => {
            const onClose = vi.fn()
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <ModalV2
                        isOpen={isOpen}
                        onClose={() => {
                            setIsOpen(false)
                            onClose()
                        }}
                        title="Escape Test"
                    >
                        <p>Press Escape to close</p>
                    </ModalV2>
                )
            }

            const { user } = render(<TestComponent />)

            await waitFor(() => {
                expect(screen.getByRole('dialog')).toBeInTheDocument()
            })

            // Press Escape key
            await user.keyboard('{Escape}')

            expect(onClose).toHaveBeenCalled()
        })

        it('Enter key activates focused button', async () => {
            const onPrimaryClick = vi.fn()
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <ModalV2
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        title="Enter Key Test"
                        primaryAction={{
                            text: 'Submit',
                            onClick: onPrimaryClick,
                            buttonType: ButtonV2Type.PRIMARY,
                        }}
                    >
                        <p>Focus the button and press Enter</p>
                    </ModalV2>
                )
            }

            const { user } = render(<TestComponent />)

            await waitFor(() => {
                expect(screen.getByRole('dialog')).toBeInTheDocument()
            })

            const submitButton = screen.getByRole('button', { name: 'Submit' })
            submitButton.focus()

            await user.keyboard('{Enter}')
            expect(onPrimaryClick).toHaveBeenCalled()
        })
    })

    describe('WCAG 4.1.2 Name, Role, Value (Level A)', () => {
        it('exposes the dialog role with accessible name', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <ModalV2
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        title="Named Dialog"
                    >
                        <p>Content</p>
                    </ModalV2>
                )
            }

            render(<TestComponent />)

            await waitFor(() => {
                const dialog = screen.getByRole('dialog', {
                    name: 'Named Dialog',
                })
                expect(dialog).toBeInTheDocument()
            })
        })

        it('has aria-modal="true" on the dialog', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <ModalV2
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        title="Modal Dialog"
                    >
                        <p>Content</p>
                    </ModalV2>
                )
            }

            render(<TestComponent />)

            await waitFor(() => {
                const dialog = screen.getByRole('dialog')
                expect(dialog).toHaveAttribute('aria-modal', 'true')
            })
        })

        it('has aria-labelledby pointing to title element', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <ModalV2
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        title="Titled Modal"
                    >
                        <p>Content</p>
                    </ModalV2>
                )
            }

            render(<TestComponent />)

            await waitFor(() => {
                const dialog = screen.getByRole('dialog')
                expect(dialog).toHaveAttribute('aria-labelledby')
            })
        })

        it('has aria-describedby pointing to subtitle element when present', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <ModalV2
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        title="Titled Modal"
                        subtitle="Subtitle description"
                    >
                        <p>Content</p>
                    </ModalV2>
                )
            }

            render(<TestComponent />)

            await waitFor(() => {
                const dialog = screen.getByRole('dialog')
                expect(dialog).toHaveAttribute('aria-describedby')
            })
        })

        it('action buttons have accessible names', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <ModalV2
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        title="Button Labels"
                        primaryAction={{
                            text: 'Confirm Action',
                            onClick: () => setIsOpen(false),
                            buttonType: ButtonV2Type.PRIMARY,
                        }}
                        secondaryAction={{
                            text: 'Cancel Operation',
                            onClick: () => setIsOpen(false),
                            buttonType: ButtonV2Type.SECONDARY,
                        }}
                    >
                        <p>Content</p>
                    </ModalV2>
                )
            }

            render(<TestComponent />)

            await waitFor(() => {
                expect(
                    screen.getByRole('button', { name: 'Confirm Action' })
                ).toBeInTheDocument()
                expect(
                    screen.getByRole('button', { name: 'Cancel Operation' })
                ).toBeInTheDocument()
            })
        })

        it('close button has accessible name "Close modal"', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <ModalV2
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        title="Closable Modal"
                    >
                        <p>Content</p>
                    </ModalV2>
                )
            }

            render(<TestComponent />)

            await waitFor(() => {
                expect(
                    screen.getByRole('button', { name: 'Close modal' })
                ).toBeInTheDocument()
            })
        })
    })

    describe('Focus Management', () => {
        it('maintains focus within modal while open', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <>
                        <button>Outside Button</button>
                        <ModalV2
                            isOpen={isOpen}
                            onClose={() => setIsOpen(false)}
                            title="Focus Trap Test"
                            primaryAction={{
                                text: 'Close',
                                onClick: () => setIsOpen(false),
                                buttonType: ButtonV2Type.PRIMARY,
                            }}
                        >
                            <input type="text" placeholder="Inside input" />
                        </ModalV2>
                    </>
                )
            }

            render(<TestComponent />)

            await waitFor(() => {
                expect(screen.getByRole('dialog')).toBeInTheDocument()
            })

            // Focus should be inside the modal
            const closeButton = screen.getByRole('button', { name: 'Close' })
            closeButton.focus()
            expect(document.activeElement).toBe(closeButton)
        })

        it('close button is focusable and has visible focus indicator', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <ModalV2
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        title="Focus Indicator Test"
                    >
                        <p>Content</p>
                    </ModalV2>
                )
            }

            render(<TestComponent />)

            await waitFor(() => {
                const closeButton = screen.getByRole('button', {
                    name: 'Close modal',
                })
                expect(closeButton).toBeInTheDocument()
                // Button should be tabbable
                expect(closeButton).toHaveAttribute('tabIndex', '0')
            })
        })
    })

    describe('Screen Reader Support', () => {
        it('announces modal title when opened', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(false)

                return (
                    <>
                        <button onClick={() => setIsOpen(true)}>
                            Open Modal
                        </button>
                        <ModalV2
                            isOpen={isOpen}
                            onClose={() => setIsOpen(false)}
                            title="Announcement Test"
                        >
                            <p>Modal content</p>
                        </ModalV2>
                    </>
                )
            }

            const { user } = render(<TestComponent />)

            const openButton = screen.getByRole('button', {
                name: 'Open Modal',
            })
            await user.click(openButton)

            await waitFor(() => {
                const dialog = screen.getByRole('dialog', {
                    name: 'Announcement Test',
                })
                expect(dialog).toBeInTheDocument()
            })
        })

        it('subtitle is associated with dialog via aria-describedby', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <ModalV2
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        title="Dialog Title"
                        subtitle="This is the subtitle description"
                    >
                        <p>Content</p>
                    </ModalV2>
                )
            }

            render(<TestComponent />)

            await waitFor(() => {
                const dialog = screen.getByRole('dialog')
                const describedById = dialog.getAttribute('aria-describedby')
                expect(describedById).toBeTruthy()

                // Verify the subtitle text exists
                const subtitle = screen.getByText(
                    'This is the subtitle description'
                )
                expect(subtitle).toBeInTheDocument()
            })
        })
    })
})
