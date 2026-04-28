import React, { useState } from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '../../test-utils'
import { axe } from 'jest-axe'
import { ModalV2 } from '../../../lib/components/ModalV2'
import { ButtonV2Type } from '../../../lib/components/ButtonV2'

describe('ModalV2', () => {
    describe('Rendering', () => {
        it('renders with title and subtitle', () => {
            render(
                <ModalV2
                    isOpen={true}
                    onClose={vi.fn()}
                    title="Test Modal"
                    subtitle="Test subtitle"
                >
                    <p>Modal content</p>
                </ModalV2>
            )

            expect(screen.getByText('Test Modal')).toBeInTheDocument()
            expect(screen.getByText('Test subtitle')).toBeInTheDocument()
            expect(screen.getByText('Modal content')).toBeInTheDocument()
        })

        it('renders with only title (no subtitle)', () => {
            render(
                <ModalV2 isOpen={true} onClose={vi.fn()} title="Simple Modal">
                    <p>Content</p>
                </ModalV2>
            )

            expect(screen.getByText('Simple Modal')).toBeInTheDocument()
            expect(screen.getByText('Content')).toBeInTheDocument()
        })

        it('does not render when isOpen is false', () => {
            render(
                <ModalV2 isOpen={false} onClose={vi.fn()} title="Hidden Modal">
                    <p>Should not be visible</p>
                </ModalV2>
            )

            expect(screen.queryByText('Hidden Modal')).not.toBeInTheDocument()
        })

        it('renders close button by default', () => {
            render(
                <ModalV2
                    isOpen={true}
                    onClose={vi.fn()}
                    title="Modal with Close"
                >
                    <p>Content</p>
                </ModalV2>
            )

            expect(
                screen.getByRole('button', { name: 'Close modal' })
            ).toBeInTheDocument()
        })

        it('does not render close button when showCloseButton is false', () => {
            render(
                <ModalV2
                    isOpen={true}
                    onClose={vi.fn()}
                    title="Modal without Close"
                    showCloseButton={false}
                >
                    <p>Content</p>
                </ModalV2>
            )

            expect(
                screen.queryByRole('button', { name: 'Close modal' })
            ).not.toBeInTheDocument()
        })
    })

    describe('Actions', () => {
        it('renders primary and secondary action buttons', () => {
            render(
                <ModalV2
                    isOpen={true}
                    onClose={vi.fn()}
                    title="Action Modal"
                    primaryAction={{
                        text: 'Confirm',
                        onClick: vi.fn(),
                        buttonType: ButtonV2Type.PRIMARY,
                    }}
                    secondaryAction={{
                        text: 'Cancel',
                        onClick: vi.fn(),
                        buttonType: ButtonV2Type.SECONDARY,
                    }}
                >
                    <p>Content</p>
                </ModalV2>
            )

            expect(
                screen.getByRole('button', { name: 'Confirm' })
            ).toBeInTheDocument()
            expect(
                screen.getByRole('button', { name: 'Cancel' })
            ).toBeInTheDocument()
        })

        it('calls onClose when close button is clicked', async () => {
            const onClose = vi.fn()
            const { user } = render(
                <ModalV2 isOpen={true} onClose={onClose} title="Closable Modal">
                    <p>Content</p>
                </ModalV2>
            )

            const closeButton = screen.getByRole('button', {
                name: 'Close modal',
            })
            await user.click(closeButton)

            expect(onClose).toHaveBeenCalled()
        })

        it('calls primaryAction.onClick when primary button is clicked', async () => {
            const onPrimaryClick = vi.fn()
            const { user } = render(
                <ModalV2
                    isOpen={true}
                    onClose={vi.fn()}
                    title="Action Modal"
                    primaryAction={{
                        text: 'Save',
                        onClick: onPrimaryClick,
                        buttonType: ButtonV2Type.PRIMARY,
                    }}
                >
                    <p>Content</p>
                </ModalV2>
            )

            const primaryButton = screen.getByRole('button', { name: 'Save' })
            await user.click(primaryButton)

            expect(onPrimaryClick).toHaveBeenCalled()
        })

        it('calls secondaryAction.onClick when secondary button is clicked', async () => {
            const onSecondaryClick = vi.fn()
            const { user } = render(
                <ModalV2
                    isOpen={true}
                    onClose={vi.fn()}
                    title="Action Modal"
                    primaryAction={{
                        text: 'Save',
                        onClick: vi.fn(),
                        buttonType: ButtonV2Type.PRIMARY,
                    }}
                    secondaryAction={{
                        text: 'Cancel',
                        onClick: onSecondaryClick,
                        buttonType: ButtonV2Type.SECONDARY,
                    }}
                >
                    <p>Content</p>
                </ModalV2>
            )

            const secondaryButton = screen.getByRole('button', {
                name: 'Cancel',
            })
            await user.click(secondaryButton)

            expect(onSecondaryClick).toHaveBeenCalled()
        })

        it('renders disabled primary button when disabled is true', () => {
            render(
                <ModalV2
                    isOpen={true}
                    onClose={vi.fn()}
                    title="Disabled Modal"
                    primaryAction={{
                        text: 'Submit',
                        onClick: vi.fn(),
                        buttonType: ButtonV2Type.PRIMARY,
                        disabled: true,
                    }}
                >
                    <p>Content</p>
                </ModalV2>
            )

            const primaryButton = screen.getByRole('button', { name: 'Submit' })
            expect(primaryButton).toBeDisabled()
        })
    })

    describe('Accessibility', () => {
        it('has correct ARIA attributes on dialog', async () => {
            render(
                <ModalV2
                    isOpen={true}
                    onClose={vi.fn()}
                    title="Accessible Modal"
                    subtitle="With subtitle"
                >
                    <p>Content</p>
                </ModalV2>
            )

            const dialog = await waitFor(() => {
                const el = screen.getByRole('dialog')
                expect(el).toBeInTheDocument()
                return el
            })

            expect(dialog).toHaveAttribute('aria-modal', 'true')
            expect(dialog).toHaveAttribute('aria-labelledby')
            expect(dialog).toHaveAttribute('aria-describedby')
        })

        it('modal dialog is focusable', async () => {
            const { user } = render(
                <ModalV2
                    isOpen={true}
                    onClose={vi.fn()}
                    title="Focusable Modal"
                    showCloseButton={false}
                >
                    <button>Inside button</button>
                </ModalV2>
            )

            const insideButton = screen.getByRole('button', {
                name: 'Inside button',
            })
            await user.tab()

            expect(document.activeElement).toBe(insideButton)
        })

        it('meets WCAG standards for basic modal (axe-core)', async () => {
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

        it('meets WCAG standards for modal without subtitle', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <ModalV2
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        title="Modal Title"
                        primaryAction={{
                            text: 'OK',
                            onClick: () => setIsOpen(false),
                            buttonType: ButtonV2Type.PRIMARY,
                        }}
                    >
                        <p>Content</p>
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

        it('meets WCAG standards for modal without actions', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <ModalV2
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        title="Information Modal"
                    >
                        <p>This modal has no action buttons</p>
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

        it('meets WCAG standards for danger action modal', async () => {
            const TestComponent = () => {
                const [isOpen, setIsOpen] = useState(true)

                return (
                    <ModalV2
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        title="Delete Item"
                        subtitle="This action cannot be undone"
                        primaryAction={{
                            text: 'Delete',
                            onClick: () => setIsOpen(false),
                            buttonType: ButtonV2Type.DANGER,
                        }}
                        secondaryAction={{
                            text: 'Cancel',
                            onClick: () => setIsOpen(false),
                            buttonType: ButtonV2Type.SECONDARY,
                        }}
                    >
                        <p>Are you sure you want to delete this item?</p>
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

    describe('Keyboard Navigation', () => {
        it('supports Tab navigation between buttons', async () => {
            const { user } = render(
                <ModalV2
                    isOpen={true}
                    onClose={vi.fn()}
                    title="Keyboard Navigation"
                    primaryAction={{
                        text: 'Save',
                        onClick: vi.fn(),
                        buttonType: ButtonV2Type.PRIMARY,
                    }}
                    secondaryAction={{
                        text: 'Cancel',
                        onClick: vi.fn(),
                        buttonType: ButtonV2Type.SECONDARY,
                    }}
                >
                    <p>Content</p>
                </ModalV2>
            )

            const closeButton = screen.getByRole('button', {
                name: 'Close modal',
            })
            const cancelButton = screen.getByRole('button', { name: 'Cancel' })
            const saveButton = screen.getByRole('button', { name: 'Save' })

            // Tab through buttons
            await user.tab()
            expect(document.activeElement).toBe(closeButton)

            await user.tab()
            expect(document.activeElement).toBe(cancelButton)

            await user.tab()
            expect(document.activeElement).toBe(saveButton)
        })

        it('calls onClose when Escape key is pressed', async () => {
            const onClose = vi.fn()
            const { user } = render(
                <ModalV2 isOpen={true} onClose={onClose} title="Escape Test">
                    <p>Content</p>
                </ModalV2>
            )

            // Press Escape key
            await user.keyboard('{Escape}')

            expect(onClose).toHaveBeenCalled()
        })
    })

    describe('Ref Forwarding', () => {
        it('forwards ref to the modal dialog element', () => {
            const ref = React.createRef<HTMLDivElement>()

            render(
                <ModalV2
                    ref={ref}
                    isOpen={true}
                    onClose={vi.fn()}
                    title="Ref Test"
                >
                    <p>Content</p>
                </ModalV2>
            )

            expect(ref.current).toBeInstanceOf(HTMLDivElement)
            expect(ref.current?.getAttribute('role')).toBe('dialog')
        })
    })
})
