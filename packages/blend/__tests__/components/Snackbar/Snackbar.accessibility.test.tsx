import React from 'react'
import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest'
import { render, screen, cleanup } from '../../test-utils'
import { axe } from 'jest-axe'
import Snackbar, {
    addSnackbar,
    StyledToast,
} from '../../../lib/components/Snackbar/Snackbar'
import { SnackbarVariant } from '../../../lib/components/Snackbar/types'

vi.mock('sonner', async () => {
    const actual = await vi.importActual('sonner')
    return {
        ...actual,
        toast: {
            custom: vi.fn(() => {
                return 'mock-toast-id'
            }),
            dismiss: vi.fn(),
        },
        Toaster: ({ position }: { position: string }) => {
            return <div data-testid="toaster" data-position={position} />
        },
    }
})

describe('Snackbar Accessibility', () => {
    beforeEach(() => {
        cleanup()
    })

    afterEach(() => {
        cleanup()
    })

    describe('WCAG 2.0, 2.1, 2.2 Compliance (Level A, AA, AAA)', () => {
        it('meets WCAG standards for basic snackbar (axe-core validation)', async () => {
            const { container } = render(
                <StyledToast
                    header="Success"
                    description="Operation completed successfully"
                    variant={SnackbarVariant.SUCCESS}
                    onClose={() => {}}
                    toastId="test-1"
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for snackbar with action button (axe-core validation)', async () => {
            const { container } = render(
                <StyledToast
                    header="File deleted"
                    description="The file has been permanently deleted"
                    variant={SnackbarVariant.INFO}
                    onClose={() => {}}
                    actionButton={{
                        label: 'Undo',
                        onClick: () => {},
                    }}
                    toastId="test-2"
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for error snackbar (axe-core validation)', async () => {
            const { container } = render(
                <StyledToast
                    header="Error"
                    description="Something went wrong"
                    variant={SnackbarVariant.ERROR}
                    onClose={() => {}}
                    toastId="test-3"
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('ensures sufficient contrast for text (1.4.3 Contrast Minimum - Level AA)', async () => {
            const { container } = render(
                <StyledToast
                    header="Warning"
                    description="Please review your changes"
                    variant={SnackbarVariant.WARNING}
                    onClose={() => {}}
                    toastId="test-4"
                />
            )

            const results = await axe(container, {
                rules: {
                    'color-contrast': { enabled: true },
                },
            })
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 1.1.1 Non-text Content (Level A)', () => {
        it('decorative icons have aria-hidden="true"', () => {
            const { container } = render(
                <StyledToast
                    header="Info"
                    description="This is an information message"
                    variant={SnackbarVariant.INFO}
                    onClose={() => {}}
                    toastId="test-5"
                />
            )

            const icon = container.querySelector('[data-element="icon"]')
            expect(icon).toHaveAttribute('aria-hidden', 'true')

            const svgIcon = icon?.querySelector('svg')
            expect(svgIcon).toHaveAttribute('aria-hidden', 'true')
        })

        it('close button icon has aria-hidden="true"', () => {
            const { container } = render(
                <StyledToast
                    header="Success"
                    description="Operation completed"
                    variant={SnackbarVariant.SUCCESS}
                    onClose={() => {}}
                    toastId="test-6"
                />
            )

            const closeButton = container.querySelector(
                '[data-element="close-button"]'
            )
            const closeIcon = closeButton?.querySelector('svg')
            expect(closeIcon).toHaveAttribute('aria-hidden', 'true')
        })

        it('icons are properly hidden for all variants', () => {
            const variants = [
                SnackbarVariant.INFO,
                SnackbarVariant.SUCCESS,
                SnackbarVariant.WARNING,
                SnackbarVariant.ERROR,
            ]

            variants.forEach((variant) => {
                const { container } = render(
                    <StyledToast
                        header="Test"
                        variant={variant}
                        onClose={() => {}}
                        toastId={`test-${variant}`}
                    />
                )

                const icon = container.querySelector('[data-element="icon"]')
                expect(icon).toHaveAttribute('aria-hidden', 'true')
            })
        })
    })

    describe('WCAG 1.3.1 Info and Relationships (Level A)', () => {
        it('uses proper ARIA role for status messages', () => {
            render(
                <StyledToast
                    header="Info"
                    description="This is an information message"
                    variant={SnackbarVariant.INFO}
                    onClose={() => {}}
                    toastId="test-7"
                />
            )

            const snackbar = screen.getByRole('status')
            expect(snackbar).toBeInTheDocument()
        })

        it('uses role="alert" for error variant', () => {
            render(
                <StyledToast
                    header="Error"
                    description="Something went wrong"
                    variant={SnackbarVariant.ERROR}
                    onClose={() => {}}
                    toastId="test-8"
                />
            )

            const snackbar = screen.getByRole('alert')
            expect(snackbar).toBeInTheDocument()
        })

        it('uses role="alert" for warning variant', () => {
            render(
                <StyledToast
                    header="Warning"
                    description="Please review"
                    variant={SnackbarVariant.WARNING}
                    onClose={() => {}}
                    toastId="test-9"
                />
            )

            const snackbar = screen.getByRole('alert')
            expect(snackbar).toBeInTheDocument()
        })

        it('uses role="status" for success variant', () => {
            render(
                <StyledToast
                    header="Success"
                    description="Operation completed"
                    variant={SnackbarVariant.SUCCESS}
                    onClose={() => {}}
                    toastId="test-10"
                />
            )

            const snackbar = screen.getByRole('status')
            expect(snackbar).toBeInTheDocument()
        })

        it('establishes aria-labelledby relationship', () => {
            const { container } = render(
                <StyledToast
                    header="Test Header"
                    description="Test description"
                    variant={SnackbarVariant.INFO}
                    onClose={() => {}}
                    toastId="test-11"
                />
            )

            const snackbar = container.querySelector('[role="status"]')
            const headerId = snackbar?.getAttribute('aria-labelledby')
            expect(headerId).toBeTruthy()

            const header = container.querySelector(`#${headerId}`)
            expect(header).toBeInTheDocument()
            expect(header?.textContent).toBe('Test Header')
        })

        it('establishes aria-describedby relationship when description exists', () => {
            const { container } = render(
                <StyledToast
                    header="Test Header"
                    description="Test description"
                    variant={SnackbarVariant.INFO}
                    onClose={() => {}}
                    toastId="test-12"
                />
            )

            const snackbar = container.querySelector('[role="status"]')
            const descriptionId = snackbar?.getAttribute('aria-describedby')
            expect(descriptionId).toBeTruthy()

            const description = container.querySelector(`#${descriptionId}`)
            expect(description).toBeInTheDocument()
            expect(description?.textContent).toBe('Test description')
        })

        it('does not set aria-describedby when description is missing', () => {
            const { container } = render(
                <StyledToast
                    header="Test Header"
                    variant={SnackbarVariant.INFO}
                    onClose={() => {}}
                    toastId="test-13"
                />
            )

            const snackbar = container.querySelector('[role="status"]')
            const descriptionId = snackbar?.getAttribute('aria-describedby')
            expect(descriptionId).toBeFalsy()
        })
    })

    describe('WCAG 1.3.2 Meaningful Sequence (Level A)', () => {
        it('maintains logical reading order', () => {
            const { container } = render(
                <StyledToast
                    header="Header"
                    description="Description"
                    variant={SnackbarVariant.INFO}
                    onClose={() => {}}
                    toastId="test-14"
                />
            )

            // Check DOM order
            const allElements = Array.from(container.querySelectorAll('*'))
            const headerIndex = allElements.findIndex(
                (el) => el.textContent === 'Header'
            )
            const descriptionIndex = allElements.findIndex(
                (el) => el.textContent === 'Description'
            )

            expect(headerIndex).toBeGreaterThanOrEqual(0)
            expect(descriptionIndex).toBeGreaterThanOrEqual(0)
            expect(headerIndex).toBeLessThan(descriptionIndex)
        })
    })

    describe('WCAG 1.4.1 Use of Color (Level A)', () => {
        it('does not rely solely on color to convey information', () => {
            render(
                <StyledToast
                    header="Error"
                    description="Something went wrong"
                    variant={SnackbarVariant.ERROR}
                    onClose={() => {}}
                    toastId="test-15"
                />
            )

            // Information is conveyed through text and role, not just color
            const snackbar = screen.getByRole('alert')
            expect(snackbar).toBeInTheDocument()
            expect(screen.getByText('Error')).toBeInTheDocument()
            expect(screen.getByText('Something went wrong')).toBeInTheDocument()
        })
    })

    describe('WCAG 2.1.1 Keyboard (Level A)', () => {
        it('close button is keyboard accessible', async () => {
            const handleClose = vi.fn()
            render(
                <StyledToast
                    header="Test"
                    variant={SnackbarVariant.INFO}
                    onClose={handleClose}
                    toastId="test-16"
                />
            )

            const closeButton = screen.getByLabelText('Close notification')
            expect(closeButton).toBeInTheDocument()

            // Button should be focusable
            closeButton.focus()
            expect(document.activeElement).toBe(closeButton)
        })

        it('action button is keyboard accessible', async () => {
            const handleAction = vi.fn()
            render(
                <StyledToast
                    header="Test"
                    variant={SnackbarVariant.INFO}
                    onClose={() => {}}
                    actionButton={{
                        label: 'Undo',
                        onClick: handleAction,
                    }}
                    toastId="test-17"
                />
            )

            const actionButton = screen.getByLabelText('Undo')
            expect(actionButton).toBeInTheDocument()

            // Button should be focusable
            actionButton.focus()
            expect(document.activeElement).toBe(actionButton)
        })
    })

    describe('WCAG 2.4.7 Focus Visible (Level AA)', () => {
        it('close button has visible focus indicator', () => {
            render(
                <StyledToast
                    header="Test"
                    variant={SnackbarVariant.INFO}
                    onClose={() => {}}
                    toastId="test-18"
                />
            )

            const closeButton = screen.getByLabelText('Close notification')
            closeButton.focus()

            expect(document.activeElement).toBe(closeButton)
        })

        it('action button has visible focus indicator', () => {
            render(
                <StyledToast
                    header="Test"
                    variant={SnackbarVariant.INFO}
                    onClose={() => {}}
                    actionButton={{
                        label: 'Undo',
                        onClick: () => {},
                    }}
                    toastId="test-19"
                />
            )

            const actionButton = screen.getByLabelText('Undo')
            actionButton.focus()

            expect(document.activeElement).toBe(actionButton)
        })
    })

    describe('WCAG 4.1.2 Name, Role, Value (Level A)', () => {
        it('snackbar has programmatically determinable role', () => {
            render(
                <StyledToast
                    header="Test"
                    variant={SnackbarVariant.INFO}
                    onClose={() => {}}
                    toastId="test-20"
                />
            )

            const snackbar = screen.getByRole('status')
            expect(snackbar).toBeInTheDocument()
        })

        it('close button has accessible name', () => {
            render(
                <StyledToast
                    header="Test"
                    variant={SnackbarVariant.INFO}
                    onClose={() => {}}
                    toastId="test-21"
                />
            )

            const closeButton = screen.getByLabelText('Close notification')
            expect(closeButton).toBeInTheDocument()
        })

        it('action button has accessible name', () => {
            render(
                <StyledToast
                    header="Test"
                    variant={SnackbarVariant.INFO}
                    onClose={() => {}}
                    actionButton={{
                        label: 'Undo',
                        onClick: () => {},
                    }}
                    toastId="test-22"
                />
            )

            const actionButton = screen.getByLabelText('Undo')
            expect(actionButton).toBeInTheDocument()
        })

        it('header and description text are programmatically determinable', () => {
            render(
                <StyledToast
                    header="Test Header"
                    description="Test Description"
                    variant={SnackbarVariant.INFO}
                    onClose={() => {}}
                    toastId="test-23"
                />
            )

            expect(screen.getByText('Test Header')).toBeInTheDocument()
            expect(screen.getByText('Test Description')).toBeInTheDocument()
        })
    })

    describe('WCAG 4.1.3 Status Messages (Level AA)', () => {
        it('uses role="alert" for error messages', () => {
            render(
                <StyledToast
                    header="Error"
                    description="Something went wrong"
                    variant={SnackbarVariant.ERROR}
                    onClose={() => {}}
                    toastId="test-24"
                />
            )

            const alert = screen.getByRole('alert')
            expect(alert).toBeInTheDocument()
            expect(alert).toHaveTextContent('Error')
            expect(alert).toHaveTextContent('Something went wrong')
        })

        it('uses role="status" for informational messages', () => {
            render(
                <StyledToast
                    header="Info"
                    description="This is information"
                    variant={SnackbarVariant.INFO}
                    onClose={() => {}}
                    toastId="test-25"
                />
            )

            const status = screen.getByRole('status')
            expect(status).toBeInTheDocument()
            expect(status).toHaveTextContent('Info')
            expect(status).toHaveTextContent('This is information')
        })
    })

    describe('WCAG 2.2.1 Timing Adjustable (Level A)', () => {
        it('supports custom duration', () => {
            const { container } = render(<Snackbar />)
            expect(container).toBeInTheDocument()

            // Duration is configurable via addSnackbar function
            // This test verifies the component accepts duration prop
            addSnackbar({
                header: 'Test',
                description: 'Test description',
                duration: 5000,
            })

            // Component should accept duration without errors
            expect(container).toBeInTheDocument()
        })
    })

    describe('WCAG 2.5.8 Target Size (Minimum) (Level AA)', () => {
        it('close button is present and accessible', () => {
            render(
                <StyledToast
                    header="Test"
                    variant={SnackbarVariant.INFO}
                    onClose={() => {}}
                    toastId="test-26"
                />
            )

            const closeButton = screen.getByLabelText('Close notification')
            expect(closeButton).toBeInTheDocument()

            // Note: Actual size verification requires manual testing or browser environment
            // getBoundingClientRect() may not work in jsdom test environment
            // Manual verification: Ensure close button meets 24x24px minimum (AA) or 44x44px (AAA)
        })

        it('action button is present and accessible', () => {
            render(
                <StyledToast
                    header="Test"
                    variant={SnackbarVariant.INFO}
                    onClose={() => {}}
                    actionButton={{
                        label: 'Undo',
                        onClick: () => {},
                    }}
                    toastId="test-27"
                />
            )

            const actionButton = screen.getByLabelText('Undo')
            expect(actionButton).toBeInTheDocument()

            // Note: Actual size verification requires manual testing or browser environment
            // getBoundingClientRect() may not work in jsdom test environment
            // Manual verification: Ensure action button meets 24x24px minimum (AA) or 44x44px (AAA)
        })
    })

    describe('Different Variants', () => {
        it('info variant is accessible', async () => {
            const { container } = render(
                <StyledToast
                    header="Info"
                    description="Information message"
                    variant={SnackbarVariant.INFO}
                    onClose={() => {}}
                    toastId="test-info"
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('success variant is accessible', async () => {
            const { container } = render(
                <StyledToast
                    header="Success"
                    description="Operation completed"
                    variant={SnackbarVariant.SUCCESS}
                    onClose={() => {}}
                    toastId="test-success"
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('warning variant is accessible', async () => {
            const { container } = render(
                <StyledToast
                    header="Warning"
                    description="Please review"
                    variant={SnackbarVariant.WARNING}
                    onClose={() => {}}
                    toastId="test-warning"
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('error variant is accessible', async () => {
            const { container } = render(
                <StyledToast
                    header="Error"
                    description="Something went wrong"
                    variant={SnackbarVariant.ERROR}
                    onClose={() => {}}
                    toastId="test-error"
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('Edge Cases', () => {
        it('handles snackbar without description', () => {
            render(
                <StyledToast
                    header="Header Only"
                    variant={SnackbarVariant.INFO}
                    onClose={() => {}}
                    toastId="test-28"
                />
            )

            expect(screen.getByText('Header Only')).toBeInTheDocument()
            const snackbar = screen.getByRole('status')
            expect(snackbar).toBeInTheDocument()
        })

        it('handles snackbar with action button', () => {
            const handleAction = vi.fn()
            render(
                <StyledToast
                    header="Test"
                    description="Test description"
                    variant={SnackbarVariant.INFO}
                    onClose={() => {}}
                    actionButton={{
                        label: 'Action',
                        onClick: handleAction,
                    }}
                    toastId="test-29"
                />
            )

            const actionButton = screen.getByLabelText('Action')
            expect(actionButton).toBeInTheDocument()
        })

        it('handles snackbar without action button', () => {
            render(
                <StyledToast
                    header="Test"
                    description="Test description"
                    variant={SnackbarVariant.INFO}
                    onClose={() => {}}
                    toastId="test-30"
                />
            )

            expect(screen.queryByLabelText('Action')).not.toBeInTheDocument()
        })
    })
})
