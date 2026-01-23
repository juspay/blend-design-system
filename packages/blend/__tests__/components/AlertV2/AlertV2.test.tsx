import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test-utils'
import AlertV2 from '../../../lib/components/AlertV2/AlertV2'
import {
    AlertV2Type,
    AlertV2SubType,
    AlertV2ActionPosition,
} from '../../../lib/components/AlertV2/alertV2.types'
import { MockIcon } from '../../test-utils'

describe('AlertV2 Component', () => {
    describe('Rendering', () => {
        it('renders with heading and description', () => {
            render(
                <AlertV2
                    heading="Test Alert"
                    description="This is a test alert message"
                />
            )
            expect(screen.getByText('Test Alert')).toBeInTheDocument()
            expect(
                screen.getByText('This is a test alert message')
            ).toBeInTheDocument()
        })

        it('renders with only heading', () => {
            render(<AlertV2 heading="Heading Only" />)
            expect(screen.getByText('Heading Only')).toBeInTheDocument()
        })

        it('renders with only description', () => {
            render(<AlertV2 description="Description Only" />)
            expect(screen.getByText('Description Only')).toBeInTheDocument()
        })

        it('renders without heading or description', () => {
            const { container } = render(<AlertV2 />)
            const alert = container.querySelector('[role="alert"]')
            expect(alert).toBeInTheDocument()
        })

        it('renders with slot/icon', () => {
            render(
                <AlertV2
                    heading="Icon Alert"
                    description="Has an icon"
                    slot={<MockIcon />}
                />
            )
            expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
        })

        it('does not render slot when not provided', () => {
            render(<AlertV2 heading="No Icon" description="No icon here" />)
            const iconContainer = screen.queryByTestId('mock-icon')
            expect(iconContainer).not.toBeInTheDocument()
        })
    })

    describe('Alert Types', () => {
        it.each([
            [AlertV2Type.PRIMARY, 'primary'],
            [AlertV2Type.SUCCESS, 'success'],
            [AlertV2Type.WARNING, 'warning'],
            [AlertV2Type.ERROR, 'error'],
            [AlertV2Type.PURPLE, 'purple'],
            [AlertV2Type.ORANGE, 'orange'],
            [AlertV2Type.NEUTRAL, 'neutral'],
        ])('renders %s type correctly', (type, typeLabel) => {
            const { container } = render(
                <AlertV2
                    heading={`${typeLabel} Alert`}
                    description={`Testing ${typeLabel} type`}
                    type={type}
                />
            )
            const alert = container.querySelector('[role="alert"]')
            expect(alert).toBeInTheDocument()
        })
    })

    describe('Alert SubTypes', () => {
        it.each([
            [AlertV2SubType.SUBTLE, 'subtle'],
            [AlertV2SubType.NO_FILL, 'noFill'],
        ])('renders %s subtype correctly', (subType, subTypeLabel) => {
            const { container } = render(
                <AlertV2
                    heading={`${subTypeLabel} Alert`}
                    description={`Testing ${subTypeLabel} subtype`}
                    subType={subType}
                />
            )
            const alert = container.querySelector('[role="alert"]')
            expect(alert).toBeInTheDocument()
        })

        it('defaults to SUBTLE subtype when not provided', () => {
            const { container } = render(
                <AlertV2
                    heading="Default Subtype"
                    description="Testing default"
                />
            )
            const alert = container.querySelector('[role="alert"]')
            expect(alert).toBeInTheDocument()
        })
    })

    describe('Actions', () => {
        it('renders primary action', () => {
            const handlePrimary = vi.fn()
            render(
                <AlertV2
                    heading="Action Alert"
                    description="Has primary action"
                    actions={{
                        primaryAction: {
                            text: 'Save',
                            onClick: handlePrimary,
                        },
                    }}
                />
            )
            const primaryButton = screen.getByText('Save')
            expect(primaryButton).toBeInTheDocument()
        })

        it('renders secondary action', () => {
            const handleSecondary = vi.fn()
            render(
                <AlertV2
                    heading="Action Alert"
                    description="Has secondary action"
                    actions={{
                        secondaryAction: {
                            text: 'Cancel',
                            onClick: handleSecondary,
                        },
                    }}
                />
            )
            const secondaryButton = screen.getByText('Cancel')
            expect(secondaryButton).toBeInTheDocument()
        })

        it('renders both primary and secondary actions', () => {
            const handlePrimary = vi.fn()
            const handleSecondary = vi.fn()
            render(
                <AlertV2
                    heading="Actions Alert"
                    description="Has both actions"
                    actions={{
                        primaryAction: {
                            text: 'Confirm',
                            onClick: handlePrimary,
                        },
                        secondaryAction: {
                            text: 'Cancel',
                            onClick: handleSecondary,
                        },
                    }}
                />
            )
            expect(screen.getByText('Confirm')).toBeInTheDocument()
            expect(screen.getByText('Cancel')).toBeInTheDocument()
        })

        it('calls primary action onClick when clicked', async () => {
            const handlePrimary = vi.fn()
            const { user } = render(
                <AlertV2
                    heading="Click Test"
                    description="Testing click"
                    actions={{
                        primaryAction: {
                            text: 'Click Me',
                            onClick: handlePrimary,
                        },
                    }}
                />
            )
            const primaryButton = screen.getByText('Click Me')
            await user.click(primaryButton)
            expect(handlePrimary).toHaveBeenCalledTimes(1)
        })

        it('calls secondary action onClick when clicked', async () => {
            const handleSecondary = vi.fn()
            const { user } = render(
                <AlertV2
                    heading="Click Test"
                    description="Testing click"
                    actions={{
                        secondaryAction: {
                            text: 'Click Me',
                            onClick: handleSecondary,
                        },
                    }}
                />
            )
            const secondaryButton = screen.getByText('Click Me')
            await user.click(secondaryButton)
            expect(handleSecondary).toHaveBeenCalledTimes(1)
        })

        it('does not render actions container when actions are not provided', () => {
            render(
                <AlertV2 heading="No Actions" description="No actions here" />
            )
            const primaryAction = screen.queryByText('Save')
            const secondaryAction = screen.queryByText('Cancel')
            expect(primaryAction).not.toBeInTheDocument()
            expect(secondaryAction).not.toBeInTheDocument()
        })
    })

    describe('Action Position', () => {
        it('renders actions at bottom position by default', () => {
            const handlePrimary = vi.fn()
            const { container } = render(
                <AlertV2
                    heading="Bottom Actions"
                    description="Actions at bottom"
                    actions={{
                        primaryAction: {
                            text: 'Action',
                            onClick: handlePrimary,
                        },
                    }}
                />
            )
            const alert = container.querySelector('[role="alert"]')
            expect(alert).toBeInTheDocument()
            expect(screen.getByText('Action')).toBeInTheDocument()
        })

        it('renders actions at right position', () => {
            const handlePrimary = vi.fn()
            const { container } = render(
                <AlertV2
                    heading="Right Actions"
                    description="Actions at right"
                    actions={{
                        position: AlertV2ActionPosition.RIGHT,
                        primaryAction: {
                            text: 'Action',
                            onClick: handlePrimary,
                        },
                    }}
                />
            )
            const alert = container.querySelector('[role="alert"]')
            expect(alert).toBeInTheDocument()
            expect(screen.getByText('Action')).toBeInTheDocument()
        })

        it('renders separator when actions are at right and close button is shown', () => {
            const handleClose = vi.fn()
            const { container } = render(
                <AlertV2
                    heading="Separator Test"
                    description="Testing separator"
                    actions={{
                        position: AlertV2ActionPosition.RIGHT,
                        primaryAction: {
                            text: 'Action',
                            onClick: vi.fn(),
                        },
                    }}
                    closeButton={{
                        show: true,
                        onClick: handleClose,
                    }}
                />
            )
            const separator = container.querySelector('[role="separator"]')
            expect(separator).toBeInTheDocument()
        })

        it('does not render separator when actions are at bottom', () => {
            const { container } = render(
                <AlertV2
                    heading="No Separator"
                    description="No separator for bottom"
                    actions={{
                        position: AlertV2ActionPosition.BOTTOM,
                        primaryAction: {
                            text: 'Action',
                            onClick: vi.fn(),
                        },
                    }}
                    closeButton={{
                        show: true,
                        onClick: vi.fn(),
                    }}
                />
            )
            const separator = container.querySelector('[role="separator"]')
            expect(separator).not.toBeInTheDocument()
        })

        it('does not render separator when close button is hidden', () => {
            const { container } = render(
                <AlertV2
                    heading="No Separator"
                    description="No separator without close"
                    actions={{
                        position: AlertV2ActionPosition.RIGHT,
                        primaryAction: {
                            text: 'Action',
                            onClick: vi.fn(),
                        },
                    }}
                    closeButton={{
                        show: false,
                        onClick: vi.fn(),
                    }}
                />
            )
            const separator = container.querySelector('[role="separator"]')
            expect(separator).not.toBeInTheDocument()
        })
    })

    describe('Close Button', () => {
        it('renders close button by default', () => {
            render(<AlertV2 heading="Closeable" description="Can be closed" />)
            const closeButton = screen.getByLabelText('Close')
            expect(closeButton).toBeInTheDocument()
        })

        it('renders close button when show is true', () => {
            const handleClose = vi.fn()
            render(
                <AlertV2
                    heading="Closeable"
                    description="Can be closed"
                    closeButton={{
                        show: true,
                        onClick: handleClose,
                    }}
                />
            )
            const closeButton = screen.getByLabelText('Close')
            expect(closeButton).toBeInTheDocument()
        })

        it('does not render close button when show is false', () => {
            render(
                <AlertV2
                    heading="Not Closeable"
                    description="Cannot be closed"
                    closeButton={{
                        show: false,
                        onClick: vi.fn(),
                    }}
                />
            )
            const closeButton = screen.queryByLabelText('Close')
            expect(closeButton).not.toBeInTheDocument()
        })

        it('calls closeButton onClick when clicked', async () => {
            const handleClose = vi.fn()
            const { user } = render(
                <AlertV2
                    heading="Close Test"
                    description="Testing close"
                    closeButton={{
                        show: true,
                        onClick: handleClose,
                    }}
                />
            )
            const closeButton = screen.getByLabelText('Close')
            await user.click(closeButton)
            expect(handleClose).toHaveBeenCalledTimes(1)
        })

        it('uses default onClick handler when not provided', async () => {
            const { user } = render(
                <AlertV2
                    heading="Default Handler"
                    description="Testing default"
                    closeButton={{
                        show: true,
                    }}
                />
            )
            const closeButton = screen.getByLabelText('Close')
            // Should not throw error
            await user.click(closeButton)
            expect(closeButton).toBeInTheDocument()
        })
    })

    describe('Data Attributes', () => {
        it('has data-alert attribute with heading value', () => {
            const { container } = render(
                <AlertV2 heading="Test Alert" description="Test" />
            )
            const alert = container.querySelector('[data-alert="Test Alert"]')
            expect(alert).toBeInTheDocument()
        })

        it('has data-alert attribute with default value when heading is not provided', () => {
            const { container } = render(<AlertV2 description="Test" />)
            const alert = container.querySelector('[data-alert="blend-alert"]')
            expect(alert).toBeInTheDocument()
        })

        it('has data-element="icon" on icon container', () => {
            render(
                <AlertV2
                    heading="Icon Test"
                    description="Testing icon"
                    slot={<MockIcon />}
                />
            )
            const iconContainer = screen.getByTestId('mock-icon').parentElement
            expect(iconContainer).toHaveAttribute('data-element', 'icon')
        })

        it('has data-element="header" on heading', () => {
            render(<AlertV2 heading="Header Test" description="Test" />)
            const heading = screen.getByText('Header Test')
            expect(heading).toHaveAttribute('data-element', 'header')
        })

        it('has data-id attribute on heading with heading text', () => {
            render(<AlertV2 heading="Header Test" description="Test" />)
            const heading = screen.getByText('Header Test')
            expect(heading).toHaveAttribute('data-id', 'Header Test')
        })

        it('has data-element="description" on description', () => {
            render(<AlertV2 heading="Test" description="Description Test" />)
            const description = screen.getByText('Description Test')
            expect(description).toHaveAttribute('data-element', 'description')
        })

        it('has data-id attribute on description with description text', () => {
            render(<AlertV2 heading="Test" description="Description Test" />)
            const description = screen.getByText('Description Test')
            expect(description).toHaveAttribute('data-id', 'Description Test')
        })

        it('has data-element="primary-action" on primary action button', () => {
            render(
                <AlertV2
                    heading="Test"
                    description="Test"
                    actions={{
                        primaryAction: {
                            text: 'Primary',
                            onClick: vi.fn(),
                        },
                    }}
                />
            )
            const primaryButton = screen.getByText('Primary')
            expect(primaryButton).toHaveAttribute(
                'data-element',
                'primary-action'
            )
        })

        it('has data-id attribute on primary action with action text', () => {
            render(
                <AlertV2
                    heading="Test"
                    description="Test"
                    actions={{
                        primaryAction: {
                            text: 'Primary Action',
                            onClick: vi.fn(),
                        },
                    }}
                />
            )
            const primaryButton = screen.getByText('Primary Action')
            expect(primaryButton).toHaveAttribute('data-id', 'Primary Action')
        })

        it('has data-element="secondary-action" on secondary action button', () => {
            render(
                <AlertV2
                    heading="Test"
                    description="Test"
                    actions={{
                        secondaryAction: {
                            text: 'Secondary',
                            onClick: vi.fn(),
                        },
                    }}
                />
            )
            const secondaryButton = screen.getByText('Secondary')
            expect(secondaryButton).toHaveAttribute(
                'data-element',
                'secondary-action'
            )
        })

        it('has data-id attribute on secondary action with action text', () => {
            render(
                <AlertV2
                    heading="Test"
                    description="Test"
                    actions={{
                        secondaryAction: {
                            text: 'Secondary Action',
                            onClick: vi.fn(),
                        },
                    }}
                />
            )
            const secondaryButton = screen.getByText('Secondary Action')
            expect(secondaryButton).toHaveAttribute(
                'data-id',
                'Secondary Action'
            )
        })

        it('has data-element="close-button" on close button', () => {
            render(
                <AlertV2
                    heading="Test"
                    description="Test"
                    closeButton={{
                        show: true,
                        onClick: vi.fn(),
                    }}
                />
            )
            const closeButton = screen.getByLabelText('Close')
            expect(closeButton).toHaveAttribute('data-element', 'close-button')
        })
    })

    describe('Dimensions', () => {
        it('applies custom width', () => {
            const { container } = render(
                <AlertV2 heading="Test" description="Test" width="500px" />
            )
            const alert = container.querySelector('[role="alert"]')
            expect(alert).toHaveStyle({ width: '500px' })
        })

        it('applies custom maxWidth', () => {
            const { container } = render(
                <AlertV2 heading="Test" description="Test" maxWidth="800px" />
            )
            const alert = container.querySelector('[role="alert"]')
            expect(alert).toHaveStyle({ maxWidth: '800px' })
        })

        it('applies custom minWidth', () => {
            const { container } = render(
                <AlertV2 heading="Test" description="Test" minWidth="200px" />
            )
            const alert = container.querySelector('[role="alert"]')
            expect(alert).toHaveStyle({ minWidth: '200px' })
        })
    })

    describe('Ref Forwarding', () => {
        it('forwards ref to root element', () => {
            const ref = React.createRef<HTMLDivElement>()
            render(<AlertV2 heading="Test" description="Test" ref={ref} />)
            expect(ref.current).toBeInstanceOf(HTMLDivElement)
            expect(ref.current).toHaveAttribute('role', 'alert')
        })
    })

    describe('Edge Cases', () => {
        it('handles empty string heading', () => {
            render(<AlertV2 heading="" description="Test" />)
            const alert = screen.getByRole('alert')
            expect(alert).toBeInTheDocument()
        })

        it('handles empty string description', () => {
            render(<AlertV2 heading="Test" description="" />)
            const alert = screen.getByRole('alert')
            expect(alert).toBeInTheDocument()
        })

        it('handles very long heading text', () => {
            const longHeading = 'A'.repeat(500)
            render(<AlertV2 heading={longHeading} description="Test" />)
            expect(screen.getByText(longHeading)).toBeInTheDocument()
        })

        it('handles very long description text', () => {
            const longDescription = 'B'.repeat(500)
            render(<AlertV2 heading="Test" description={longDescription} />)
            expect(screen.getByText(longDescription)).toBeInTheDocument()
        })

        it('handles multiple rapid clicks on action button', async () => {
            const handleAction = vi.fn()
            const { user } = render(
                <AlertV2
                    heading="Rapid Click"
                    description="Testing rapid clicks"
                    actions={{
                        primaryAction: {
                            text: 'Action',
                            onClick: handleAction,
                        },
                    }}
                />
            )
            const actionButton = screen.getByText('Action')
            await user.click(actionButton)
            await user.click(actionButton)
            await user.click(actionButton)
            expect(handleAction).toHaveBeenCalledTimes(3)
        })

        it('handles multiple rapid clicks on close button', async () => {
            const handleClose = vi.fn()
            const { user } = render(
                <AlertV2
                    heading="Rapid Close"
                    description="Testing rapid closes"
                    closeButton={{
                        show: true,
                        onClick: handleClose,
                    }}
                />
            )
            const closeButton = screen.getByLabelText('Close')
            await user.click(closeButton)
            await user.click(closeButton)
            await user.click(closeButton)
            expect(handleClose).toHaveBeenCalledTimes(3)
        })
    })

    describe('Component Composition', () => {
        it('renders all elements together correctly', () => {
            const handlePrimary = vi.fn()
            const handleSecondary = vi.fn()
            const handleClose = vi.fn()

            render(
                <AlertV2
                    heading="Complete Alert"
                    description="Has everything"
                    type={AlertV2Type.SUCCESS}
                    subType={AlertV2SubType.SUBTLE}
                    slot={<MockIcon />}
                    actions={{
                        position: AlertV2ActionPosition.RIGHT,
                        primaryAction: {
                            text: 'Confirm',
                            onClick: handlePrimary,
                        },
                        secondaryAction: {
                            text: 'Cancel',
                            onClick: handleSecondary,
                        },
                    }}
                    closeButton={{
                        show: true,
                        onClick: handleClose,
                    }}
                />
            )

            expect(screen.getByText('Complete Alert')).toBeInTheDocument()
            expect(screen.getByText('Has everything')).toBeInTheDocument()
            expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
            expect(screen.getByText('Confirm')).toBeInTheDocument()
            expect(screen.getByText('Cancel')).toBeInTheDocument()
            expect(screen.getByLabelText('Close')).toBeInTheDocument()
        })
    })
})
