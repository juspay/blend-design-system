import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test-utils'
import { axe } from 'jest-axe'
import AlertV2 from '../../../lib/components/AlertV2/AlertV2'
import {
    AlertV2Type,
    AlertV2SubType,
    AlertV2ActionPosition,
} from '../../../lib/components/AlertV2/alertV2.types'
import { MockIcon } from '../../test-utils'

describe('AlertV2 Accessibility', () => {
    describe('WCAG 2.0, 2.1, 2.2 Compliance (Level A, AA, AAA)', () => {
        it('meets WCAG standards for default alert (axe-core validation)', async () => {
            const { container } = render(
                <AlertV2
                    heading="Test Alert"
                    description="This is a test alert message"
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for all alert types', async () => {
            const types = [
                AlertV2Type.PRIMARY,
                AlertV2Type.SUCCESS,
                AlertV2Type.WARNING,
                AlertV2Type.ERROR,
                AlertV2Type.PURPLE,
                AlertV2Type.ORANGE,
                AlertV2Type.NEUTRAL,
            ]

            for (const type of types) {
                const { container } = render(
                    <AlertV2
                        heading={`${type} Alert`}
                        description={`Testing ${type} type`}
                        type={type}
                    />
                )
                const results = await axe(container)
                expect(results).toHaveNoViolations()
            }
        })

        it('meets WCAG standards for all alert subtypes', async () => {
            const subTypes = [AlertV2SubType.SUBTLE, AlertV2SubType.NO_FILL]

            for (const subType of subTypes) {
                const { container } = render(
                    <AlertV2
                        heading={`${subType} Alert`}
                        description={`Testing ${subType} subtype`}
                        subType={subType}
                    />
                )
                const results = await axe(container)
                expect(results).toHaveNoViolations()
            }
        })

        it('meets WCAG standards with icon slot (1.1.1 Non-text Content)', async () => {
            const { container } = render(
                <AlertV2
                    heading="Alert with Icon"
                    description="This alert has an icon"
                    slot={<MockIcon />}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with actions (2.1.1 Keyboard)', async () => {
            const handlePrimary = vi.fn()
            const handleSecondary = vi.fn()
            const { container } = render(
                <AlertV2
                    heading="Alert with Actions"
                    description="This alert has action buttons"
                    actions={{
                        primaryAction: {
                            text: 'Primary',
                            onClick: handlePrimary,
                        },
                        secondaryAction: {
                            text: 'Secondary',
                            onClick: handleSecondary,
                        },
                    }}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with close button (2.1.1 Keyboard)', async () => {
            const handleClose = vi.fn()
            const { container } = render(
                <AlertV2
                    heading="Dismissible Alert"
                    description="This alert can be closed"
                    closeButton={{
                        show: true,
                        onClick: handleClose,
                    }}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('ARIA Attributes and Roles', () => {
        it('has role="alert" on root element', () => {
            const { container } = render(
                <AlertV2 heading="Test" description="Test" />
            )
            const alert = container.querySelector('[role="alert"]')
            expect(alert).toBeInTheDocument()
        })

        it('has aria-live="assertive" on root element', () => {
            const { container } = render(
                <AlertV2 heading="Test" description="Test" />
            )
            const alert = container.querySelector('[role="alert"]')
            expect(alert).toHaveAttribute('aria-live', 'assertive')
        })

        it('has aria-atomic="true" on root element', () => {
            const { container } = render(
                <AlertV2 heading="Test" description="Test" />
            )
            const alert = container.querySelector('[role="alert"]')
            expect(alert).toHaveAttribute('aria-atomic', 'true')
        })

        it('has aria-labelledby pointing to heading id', () => {
            render(<AlertV2 heading="Test Heading" description="Test" />)
            const alert = screen.getByRole('alert')
            const heading = screen.getByText('Test Heading')

            expect(alert).toHaveAttribute('aria-labelledby')
            expect(heading).toHaveAttribute('id')
            expect(alert.getAttribute('aria-labelledby')).toBe(
                heading.getAttribute('id')
            )
        })

        it('has aria-describedby pointing to description id', () => {
            render(<AlertV2 heading="Test" description="Test Description" />)
            const alert = screen.getByRole('alert')
            const description = screen.getByText('Test Description')

            expect(alert).toHaveAttribute('aria-describedby')
            expect(description).toHaveAttribute('id')
            expect(alert.getAttribute('aria-describedby')).toBe(
                description.getAttribute('id')
            )
        })

        it('does not set aria-labelledby when heading is not provided', () => {
            render(<AlertV2 description="Test" />)
            const alert = screen.getByRole('alert')
            expect(alert).not.toHaveAttribute('aria-labelledby')
        })

        it('does not set aria-describedby when description is not provided', () => {
            render(<AlertV2 heading="Test" />)
            const alert = screen.getByRole('alert')
            expect(alert).not.toHaveAttribute('aria-describedby')
        })

        it('has aria-hidden="true" on icon container', () => {
            render(
                <AlertV2
                    heading="Test"
                    description="Test"
                    slot={<MockIcon />}
                />
            )
            const iconContainer = screen.getByTestId('mock-icon').parentElement
            expect(iconContainer).toHaveAttribute('aria-hidden', 'true')
        })

        it('has aria-label="Close" on close button', () => {
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
            expect(closeButton).toHaveAttribute('aria-label', 'Close')
        })

        it('has aria-label on primary action button', () => {
            render(
                <AlertV2
                    heading="Test"
                    description="Test"
                    actions={{
                        primaryAction: {
                            text: 'Save',
                            onClick: vi.fn(),
                        },
                    }}
                />
            )
            const primaryButton = screen.getByText('Save')
            expect(primaryButton).toHaveAttribute('aria-label', 'Save action')
        })

        it('has aria-label on secondary action button', () => {
            render(
                <AlertV2
                    heading="Test"
                    description="Test"
                    actions={{
                        secondaryAction: {
                            text: 'Cancel',
                            onClick: vi.fn(),
                        },
                    }}
                />
            )
            const secondaryButton = screen.getByText('Cancel')
            expect(secondaryButton).toHaveAttribute(
                'aria-label',
                'Cancel action'
            )
        })

        it('has aria-hidden="true" on separator', () => {
            const { container } = render(
                <AlertV2
                    heading="Test"
                    description="Test"
                    actions={{
                        position: AlertV2ActionPosition.RIGHT,
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
            expect(separator).toHaveAttribute('aria-hidden', 'true')
        })

        it('has role="separator" on separator element', () => {
            const { container } = render(
                <AlertV2
                    heading="Test"
                    description="Test"
                    actions={{
                        position: AlertV2ActionPosition.RIGHT,
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
            expect(separator).toBeInTheDocument()
        })
    })

    describe('Semantic HTML', () => {
        it('uses h3 element for heading', () => {
            render(<AlertV2 heading="Semantic Test" description="Test" />)
            const heading = screen.getByText('Semantic Test')
            expect(heading.tagName).toBe('H3')
        })

        it('uses p element for description', () => {
            render(<AlertV2 heading="Test" description="Semantic Test" />)
            const description = screen.getByText('Semantic Test')
            expect(description.tagName).toBe('P')
        })
    })

    describe('Keyboard Interaction (WCAG 2.1.1 Keyboard)', () => {
        it('close button is keyboard accessible', () => {
            render(
                <AlertV2
                    heading="Keyboard Test"
                    description="Testing keyboard"
                    closeButton={{
                        show: true,
                        onClick: vi.fn(),
                    }}
                />
            )
            const closeButton = screen.getByLabelText('Close')
            closeButton.focus()
            expect(document.activeElement).toBe(closeButton)
        })

        it('primary action button is keyboard accessible', () => {
            render(
                <AlertV2
                    heading="Keyboard Test"
                    description="Testing keyboard"
                    actions={{
                        primaryAction: {
                            text: 'Action',
                            onClick: vi.fn(),
                        },
                    }}
                />
            )
            const actionButton = screen.getByText('Action')
            actionButton.focus()
            expect(document.activeElement).toBe(actionButton)
        })

        it('secondary action button is keyboard accessible', () => {
            render(
                <AlertV2
                    heading="Keyboard Test"
                    description="Testing keyboard"
                    actions={{
                        secondaryAction: {
                            text: 'Action',
                            onClick: vi.fn(),
                        },
                    }}
                />
            )
            const actionButton = screen.getByText('Action')
            actionButton.focus()
            expect(document.activeElement).toBe(actionButton)
        })

        it('close button can be activated with Enter key', async () => {
            const handleClose = vi.fn()
            const { user } = render(
                <AlertV2
                    heading="Enter Test"
                    description="Testing Enter"
                    closeButton={{
                        show: true,
                        onClick: handleClose,
                    }}
                />
            )
            const closeButton = screen.getByLabelText('Close')
            closeButton.focus()
            await user.keyboard('{Enter}')
            expect(handleClose).toHaveBeenCalledTimes(1)
        })

        it('action button can be activated with Enter key', async () => {
            const handleAction = vi.fn()
            const { user } = render(
                <AlertV2
                    heading="Enter Test"
                    description="Testing Enter"
                    actions={{
                        primaryAction: {
                            text: 'Action',
                            onClick: handleAction,
                        },
                    }}
                />
            )
            const actionButton = screen.getByText('Action')
            actionButton.focus()
            await user.keyboard('{Enter}')
            expect(handleAction).toHaveBeenCalledTimes(1)
        })

        it('action button can be activated with Space key', async () => {
            const handleAction = vi.fn()
            const { user } = render(
                <AlertV2
                    heading="Space Test"
                    description="Testing Space"
                    actions={{
                        primaryAction: {
                            text: 'Action',
                            onClick: handleAction,
                        },
                    }}
                />
            )
            const actionButton = screen.getByText('Action')
            actionButton.focus()
            await user.keyboard(' ')
            expect(handleAction).toHaveBeenCalledTimes(1)
        })
    })
})
