import React from 'react'
import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest'
import { render, screen, cleanup } from '../../test-utils'
import { axe } from 'jest-axe'
import { StyledToast } from '../../../lib/components/SnackbarV2'
import { SnackbarV2Variant } from '../../../lib/components/SnackbarV2/snackbarV2.types'

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

describe('SnackbarV2 Accessibility', () => {
    beforeEach(() => {
        cleanup()
    })

    afterEach(() => {
        cleanup()
    })

    describe('WCAG 2.1 AA Compliance - Critical Violations', () => {
        it('passes axe-core validation for basic snackbar', async () => {
            const { container } = render(
                <StyledToast
                    header="Success"
                    description="Operation completed successfully"
                    variant={SnackbarV2Variant.SUCCESS}
                    onClose={() => {}}
                    toastId="test-1"
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('passes axe-core validation for all variants', async () => {
            const variants = [
                SnackbarV2Variant.INFO,
                SnackbarV2Variant.SUCCESS,
                SnackbarV2Variant.WARNING,
                SnackbarV2Variant.ERROR,
            ]

            for (const variant of variants) {
                const { container } = render(
                    <StyledToast
                        header={`${variant} Snackbar`}
                        description={`Testing ${variant} variant`}
                        variant={variant}
                        onClose={() => {}}
                        toastId={`test-${variant}`}
                    />
                )
                const results = await axe(container)
                expect(results).toHaveNoViolations()
            }
        })

        it('passes axe-core validation with action button', async () => {
            const { container } = render(
                <StyledToast
                    header="File deleted"
                    description="The file has been permanently deleted"
                    variant={SnackbarV2Variant.INFO}
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
    })

    describe('WCAG 1.1.1 Non-text Content', () => {
        it('decorative icons have aria-hidden="true"', () => {
            const { container } = render(
                <StyledToast
                    header="Info"
                    description="This is an information message"
                    variant={SnackbarV2Variant.INFO}
                    onClose={() => {}}
                    toastId="test-3"
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
                    variant={SnackbarV2Variant.SUCCESS}
                    onClose={() => {}}
                    toastId="test-4"
                />
            )

            const closeButton = container.querySelector(
                '[data-element="close-button"]'
            )
            const closeIcon = closeButton?.querySelector('svg')
            expect(closeIcon).toHaveAttribute('aria-hidden', 'true')
        })
    })

    describe('WCAG 1.3.1 Info and Relationships', () => {
        it('uses role="status" for informational messages', () => {
            render(
                <StyledToast
                    header="Info"
                    description="This is an information message"
                    variant={SnackbarV2Variant.INFO}
                    onClose={() => {}}
                    toastId="test-5"
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
                    variant={SnackbarV2Variant.ERROR}
                    onClose={() => {}}
                    toastId="test-6"
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
                    variant={SnackbarV2Variant.WARNING}
                    onClose={() => {}}
                    toastId="test-7"
                />
            )

            const snackbar = screen.getByRole('alert')
            expect(snackbar).toBeInTheDocument()
        })

        it('establishes aria-labelledby relationship', () => {
            const { container } = render(
                <StyledToast
                    header="Test Header"
                    description="Test description"
                    variant={SnackbarV2Variant.INFO}
                    onClose={() => {}}
                    toastId="test-8"
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
                    variant={SnackbarV2Variant.INFO}
                    onClose={() => {}}
                    toastId="test-9"
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
                    variant={SnackbarV2Variant.INFO}
                    onClose={() => {}}
                    toastId="test-10"
                />
            )

            const snackbar = container.querySelector('[role="status"]')
            const descriptionId = snackbar?.getAttribute('aria-describedby')
            expect(descriptionId).toBeFalsy()
        })
    })

    describe('WCAG 2.1.1 Keyboard', () => {
        it('close button is keyboard accessible', () => {
            render(
                <StyledToast
                    header="Test"
                    variant={SnackbarV2Variant.INFO}
                    onClose={() => {}}
                    toastId="test-11"
                />
            )

            const closeButton = screen.getByLabelText('Close notification')
            expect(closeButton).toBeInTheDocument()

            closeButton.focus()
            expect(document.activeElement).toBe(closeButton)
        })

        it('action button is keyboard accessible', () => {
            render(
                <StyledToast
                    header="Test"
                    variant={SnackbarV2Variant.INFO}
                    onClose={() => {}}
                    actionButton={{
                        label: 'Undo',
                        onClick: () => {},
                    }}
                    toastId="test-12"
                />
            )

            const actionButton = screen.getByLabelText('Undo')
            expect(actionButton).toBeInTheDocument()

            actionButton.focus()
            expect(document.activeElement).toBe(actionButton)
        })
    })

    describe('WCAG 4.1.2 Name, Role, Value', () => {
        it('snackbar has programmatically determinable role', () => {
            render(
                <StyledToast
                    header="Test"
                    variant={SnackbarV2Variant.INFO}
                    onClose={() => {}}
                    toastId="test-13"
                />
            )

            const snackbar = screen.getByRole('status')
            expect(snackbar).toBeInTheDocument()
        })

        it('close button has accessible name', () => {
            render(
                <StyledToast
                    header="Test"
                    variant={SnackbarV2Variant.INFO}
                    onClose={() => {}}
                    toastId="test-14"
                />
            )

            const closeButton = screen.getByLabelText('Close notification')
            expect(closeButton).toBeInTheDocument()
        })

        it('action button has accessible name', () => {
            render(
                <StyledToast
                    header="Test"
                    variant={SnackbarV2Variant.INFO}
                    onClose={() => {}}
                    actionButton={{
                        label: 'Undo',
                        onClick: () => {},
                    }}
                    toastId="test-15"
                />
            )

            const actionButton = screen.getByLabelText('Undo')
            expect(actionButton).toBeInTheDocument()
        })
    })
})
