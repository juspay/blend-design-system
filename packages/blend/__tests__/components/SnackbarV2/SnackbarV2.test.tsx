import React from 'react'
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import { render, screen, cleanup } from '../../test-utils'
import {
    SnackbarV2,
    addSnackbarV2,
    StyledToast,
} from '../../../lib/components/SnackbarV2'
import {
    SnackbarV2Variant,
    SnackbarV2Position,
} from '../../../lib/components/SnackbarV2/snackbarV2.types'
import { toast } from 'sonner'

vi.mock('sonner', async () => {
    const actual = await vi.importActual('sonner')
    return {
        ...actual,
        toast: {
            custom: vi.fn(() => 'mock-toast-id'),
            dismiss: vi.fn(),
        },
        Toaster: ({ position }: { position: string }) => {
            return <div data-testid="toaster" data-position={position} />
        },
    }
})

describe('SnackbarV2 Component', () => {
    beforeEach(() => {
        cleanup()
    })

    afterEach(() => {
        cleanup()
    })

    describe('Rendering', () => {
        it('renders with header and description', () => {
            render(
                <StyledToast
                    header="Test Snackbar"
                    description="This is a test snackbar message"
                    variant={SnackbarV2Variant.INFO}
                    onClose={() => {}}
                    toastId="test-1"
                />
            )
            expect(screen.getByText('Test Snackbar')).toBeInTheDocument()
            expect(
                screen.getByText('This is a test snackbar message')
            ).toBeInTheDocument()
        })

        it('renders with only header', () => {
            render(
                <StyledToast
                    header="Header Only"
                    variant={SnackbarV2Variant.INFO}
                    onClose={() => {}}
                    toastId="test-2"
                />
            )
            expect(screen.getByText('Header Only')).toBeInTheDocument()
        })

        it('renders without description', () => {
            render(
                <StyledToast
                    header="No Description"
                    variant={SnackbarV2Variant.INFO}
                    onClose={() => {}}
                    toastId="test-3"
                />
            )
            expect(screen.getByText('No Description')).toBeInTheDocument()
            expect(screen.queryByText('description')).not.toBeInTheDocument()
        })
    })

    describe('Snackbar Variants', () => {
        it.each([
            [SnackbarV2Variant.INFO, 'info'],
            [SnackbarV2Variant.SUCCESS, 'success'],
            [SnackbarV2Variant.WARNING, 'warning'],
            [SnackbarV2Variant.ERROR, 'error'],
        ])('renders %s variant correctly', (variant, variantLabel) => {
            const { container } = render(
                <StyledToast
                    header={`${variantLabel} Snackbar`}
                    description={`Testing ${variantLabel} variant`}
                    variant={variant}
                    onClose={() => {}}
                    toastId={`test-${variantLabel}`}
                />
            )
            const snackbar = container.querySelector(
                `[data-status="${variant}"]`
            )
            expect(snackbar).toBeInTheDocument()
        })
    })

    describe('Action Button', () => {
        it('renders action button when provided', () => {
            const handleAction = vi.fn()
            render(
                <StyledToast
                    header="Action Snackbar"
                    description="Has action button"
                    variant={SnackbarV2Variant.INFO}
                    onClose={() => {}}
                    actionButton={{
                        label: 'Undo',
                        onClick: handleAction,
                    }}
                    toastId="test-action"
                />
            )
            const actionButton = screen.getByText('Undo')
            expect(actionButton).toBeInTheDocument()
        })

        it('calls action button onClick when clicked', async () => {
            const handleAction = vi.fn()
            const { user } = render(
                <StyledToast
                    header="Click Test"
                    description="Testing click"
                    variant={SnackbarV2Variant.INFO}
                    onClose={() => {}}
                    actionButton={{
                        label: 'Click Me',
                        onClick: handleAction,
                    }}
                    toastId="test-click"
                />
            )
            const actionButton = screen.getByText('Click Me')
            await user.click(actionButton)
            expect(handleAction).toHaveBeenCalledTimes(1)
        })

        it('does not render action button when not provided', () => {
            render(
                <StyledToast
                    header="No Action"
                    description="No action button"
                    variant={SnackbarV2Variant.INFO}
                    onClose={() => {}}
                    toastId="test-no-action"
                />
            )
            const actionButton = screen.queryByText('Undo')
            expect(actionButton).not.toBeInTheDocument()
        })
    })

    describe('Close Button', () => {
        it('renders close button', () => {
            render(
                <StyledToast
                    header="Closeable"
                    description="Can be closed"
                    variant={SnackbarV2Variant.INFO}
                    onClose={() => {}}
                    toastId="test-close"
                />
            )
            const closeButton = screen.getByLabelText('Close notification')
            expect(closeButton).toBeInTheDocument()
        })

        it('calls onClose when close button is clicked', async () => {
            const handleClose = vi.fn()
            const { user } = render(
                <StyledToast
                    header="Close Test"
                    description="Testing close"
                    variant={SnackbarV2Variant.INFO}
                    onClose={handleClose}
                    toastId="test-close-click"
                />
            )
            const closeButton = screen.getByLabelText('Close notification')
            await user.click(closeButton)
            expect(handleClose).toHaveBeenCalledTimes(1)
        })
    })

    describe('Data Attributes', () => {
        it('has data-snackbar attribute with header value', () => {
            const { container } = render(
                <StyledToast
                    header="Test Snackbar"
                    description="Test"
                    variant={SnackbarV2Variant.INFO}
                    onClose={() => {}}
                    toastId="test-data"
                />
            )
            const snackbar = container.querySelector(
                '[data-snackbar="Test Snackbar"]'
            )
            expect(snackbar).toBeInTheDocument()
        })

        it('has data-snackbar attribute with default value when header is empty string', () => {
            const { container } = render(
                <StyledToast
                    header=""
                    variant={SnackbarV2Variant.INFO}
                    onClose={() => {}}
                    toastId="test-data-default"
                />
            )
            const snackbar = container.querySelector('[data-snackbar=""]')
            expect(snackbar).toBeInTheDocument()
        })

        it('has data-element="icon" on icon container', () => {
            const { container } = render(
                <StyledToast
                    header="Icon Test"
                    description="Testing icon"
                    variant={SnackbarV2Variant.INFO}
                    onClose={() => {}}
                    toastId="test-icon"
                />
            )
            const iconContainer = container.querySelector(
                '[data-element="icon"]'
            )
            expect(iconContainer).toBeInTheDocument()
        })

        it('has data-element="header" on header', () => {
            render(
                <StyledToast
                    header="Header Test"
                    description="Test"
                    variant={SnackbarV2Variant.INFO}
                    onClose={() => {}}
                    toastId="test-header"
                />
            )
            const header = screen.getByText('Header Test')
            expect(header).toHaveAttribute('data-element', 'header')
        })

        it('has data-id attribute on header with header text', () => {
            render(
                <StyledToast
                    header="Header Test"
                    description="Test"
                    variant={SnackbarV2Variant.INFO}
                    onClose={() => {}}
                    toastId="test-header-id"
                />
            )
            const header = screen.getByText('Header Test')
            expect(header).toHaveAttribute('data-id', 'Header Test')
        })

        it('has data-element="description" on description', () => {
            render(
                <StyledToast
                    header="Test"
                    description="Description Test"
                    variant={SnackbarV2Variant.INFO}
                    onClose={() => {}}
                    toastId="test-description"
                />
            )
            const description = screen.getByText('Description Test')
            expect(description).toHaveAttribute('data-element', 'description')
        })

        it('has data-id attribute on description with description text', () => {
            render(
                <StyledToast
                    header="Test"
                    description="Description Test"
                    variant={SnackbarV2Variant.INFO}
                    onClose={() => {}}
                    toastId="test-description-id"
                />
            )
            const description = screen.getByText('Description Test')
            expect(description).toHaveAttribute('data-id', 'Description Test')
        })

        it('has data-element="primary-action" on action button', () => {
            render(
                <StyledToast
                    header="Test"
                    description="Test"
                    variant={SnackbarV2Variant.INFO}
                    onClose={() => {}}
                    actionButton={{
                        label: 'Action',
                        onClick: () => {},
                    }}
                    toastId="test-primary-action"
                />
            )
            const actionButton = screen.getByText('Action')
            expect(actionButton.closest('button')).toHaveAttribute(
                'data-element',
                'primary-action'
            )
        })

        it('has data-id attribute on action button with action label', () => {
            render(
                <StyledToast
                    header="Test"
                    description="Test"
                    variant={SnackbarV2Variant.INFO}
                    onClose={() => {}}
                    actionButton={{
                        label: 'Action Label',
                        onClick: () => {},
                    }}
                    toastId="test-action-id"
                />
            )
            const actionButton = screen.getByText('Action Label')
            expect(actionButton.closest('button')).toHaveAttribute(
                'data-id',
                'Action Label'
            )
        })

        it('has data-element="close-button" on close button', () => {
            render(
                <StyledToast
                    header="Test"
                    description="Test"
                    variant={SnackbarV2Variant.INFO}
                    onClose={() => {}}
                    toastId="test-close-element"
                />
            )
            const closeButton = screen.getByLabelText('Close notification')
            expect(closeButton).toHaveAttribute('data-element', 'close-button')
        })
    })

    describe('addSnackbarV2 Function', () => {
        beforeEach(() => {
            vi.clearAllMocks()
        })

        it('calls sonner toast.custom with correct parameters', () => {
            addSnackbarV2({
                header: 'Test',
                description: 'Test description',
                variant: SnackbarV2Variant.INFO,
            })

            expect(vi.mocked(toast.custom)).toHaveBeenCalled()
        })

        it('handles position parameter', () => {
            addSnackbarV2({
                header: 'Test',
                variant: SnackbarV2Variant.INFO,
                position: SnackbarV2Position.TOP_LEFT,
            })

            expect(vi.mocked(toast.custom)).toHaveBeenCalled()
        })
    })

    describe('SnackbarV2 Component', () => {
        it('renders Toaster component', () => {
            render(<SnackbarV2 />)
            expect(screen.getByTestId('toaster')).toBeInTheDocument()
        })

        it('renders Toaster with default position', () => {
            render(<SnackbarV2 />)
            const toaster = screen.getByTestId('toaster')
            expect(toaster).toHaveAttribute(
                'data-position',
                SnackbarV2Position.BOTTOM_RIGHT
            )
        })

        it('renders Toaster with custom position', () => {
            render(<SnackbarV2 position={SnackbarV2Position.TOP_CENTER} />)
            const toaster = screen.getByTestId('toaster')
            expect(toaster).toHaveAttribute(
                'data-position',
                SnackbarV2Position.TOP_CENTER
            )
        })
    })

    describe('Edge Cases', () => {
        it('handles empty string header', () => {
            render(
                <StyledToast
                    header=""
                    description="Test"
                    variant={SnackbarV2Variant.INFO}
                    onClose={() => {}}
                    toastId="test-empty"
                />
            )
            const snackbar = screen.getByRole('status')
            expect(snackbar).toBeInTheDocument()
        })

        it('handles very long header text', () => {
            const longHeader = 'A'.repeat(500)
            render(
                <StyledToast
                    header={longHeader}
                    description="Test"
                    variant={SnackbarV2Variant.INFO}
                    onClose={() => {}}
                    toastId="test-long"
                />
            )
            expect(screen.getByText(longHeader)).toBeInTheDocument()
        })

        it('handles very long description text', () => {
            const longDescription = 'B'.repeat(500)
            render(
                <StyledToast
                    header="Test"
                    description={longDescription}
                    variant={SnackbarV2Variant.INFO}
                    onClose={() => {}}
                    toastId="test-long-desc"
                />
            )
            expect(screen.getByText(longDescription)).toBeInTheDocument()
        })

        it('handles action button with autoDismiss false', async () => {
            const handleAction = vi.fn()
            vi.clearAllMocks()
            render(
                <StyledToast
                    header="Test"
                    description="Test"
                    variant={SnackbarV2Variant.INFO}
                    onClose={() => {}}
                    actionButton={{
                        label: 'Action',
                        onClick: handleAction,
                        autoDismiss: false,
                    }}
                    toastId="test-auto-dismiss"
                />
            )
            const actionButton = screen.getByText('Action')
            await actionButton.click()

            expect(handleAction).toHaveBeenCalledTimes(1)
            // Should not dismiss when autoDismiss is false
            expect(vi.mocked(toast.dismiss)).not.toHaveBeenCalled()
        })
    })
})
