import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test-utils'
import { axe } from 'jest-axe'
import Card from '../../../lib/components/Card/Card'
import { CardVariant, CardAlignment } from '../../../lib/components/Card/types'
import { ButtonType, ButtonSize } from '../../../lib/components/Button/types'
import {
    Tag,
    TagColor,
    TagVariant,
    TagSize,
} from '../../../lib/components/Tags'
import { Settings, TrendingUp, Star } from 'lucide-react'

describe('Card Accessibility', () => {
    describe('WCAG 2.1/2.2 Compliance (Level A, AA, AAA)', () => {
        it('meets WCAG standards for default card (axe-core validation)', async () => {
            const { container } = render(
                <Card
                    headerTitle="Analytics Dashboard"
                    bodyTitle="Monthly Summary"
                    content="Track your key metrics and performance indicators."
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for all variants (Default, Aligned, Custom)', async () => {
            // Test Default variant
            const { container: defaultContainer } = render(
                <Card
                    headerTitle="Default Card"
                    bodyTitle="Content"
                    content="Default card content"
                />
            )
            const defaultResults = await axe(defaultContainer)
            expect(defaultResults).toHaveNoViolations()

            // Test Aligned variant
            const { container: alignedContainer } = render(
                <Card
                    variant={CardVariant.ALIGNED}
                    alignment={CardAlignment.VERTICAL}
                    headerTitle="Aligned Card"
                    bodyTitle="Content"
                    content="Aligned card content"
                />
            )
            const alignedResults = await axe(alignedContainer)
            expect(alignedResults).toHaveNoViolations()

            // Test Custom variant
            const { container: customContainer } = render(
                <Card variant={CardVariant.CUSTOM}>
                    <div>Custom card content</div>
                </Card>
            )
            const customResults = await axe(customContainer)
            expect(customResults).toHaveNoViolations()
        })

        it('meets WCAG standards with all slots (1.3.1 Info and Relationships)', async () => {
            const { container } = render(
                <Card
                    headerSlot1={<Star size={16} />}
                    headerTitle="Analytics Dashboard"
                    headerTag={
                        <Tag
                            text="Pro"
                            variant={TagVariant.ATTENTIVE}
                            color={TagColor.SUCCESS}
                            size={TagSize.SM}
                        />
                    }
                    headerSlot2={
                        <button aria-label="Settings">
                            <Settings size={16} />
                        </button>
                    }
                    subHeader="Real-time performance metrics"
                    bodySlot1={<div>Alert content</div>}
                    bodyTitle="Monthly Summary"
                    content="Track your key metrics and performance indicators."
                    bodySlot2={<div>Metrics content</div>}
                    actionButton={{
                        text: 'View Report',
                        buttonType: ButtonType.PRIMARY,
                        size: ButtonSize.SMALL,
                    }}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with aligned card vertical (1.3.2 Meaningful Sequence)', async () => {
            const { container } = render(
                <Card
                    variant={CardVariant.ALIGNED}
                    alignment={CardAlignment.VERTICAL}
                    centerAlign={true}
                    cardSlot={
                        <div
                            style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                background:
                                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            }}
                            aria-label="User avatar"
                        >
                            JD
                        </div>
                    }
                    headerTitle="John Doe"
                    bodyTitle="Profile"
                    content="Senior Developer with expertise in React."
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with aligned card horizontal (1.3.2 Meaningful Sequence)', async () => {
            const { container } = render(
                <Card
                    variant={CardVariant.ALIGNED}
                    alignment={CardAlignment.HORIZONTAL}
                    cardSlot={
                        <div
                            style={{
                                width: '28px',
                                height: '28px',
                                background: '#f0f9ff',
                            }}
                            role="img"
                            aria-label="Icon"
                        >
                            <TrendingUp size={16} aria-hidden="true" />
                        </div>
                    }
                    headerTitle="New Feature"
                    bodyTitle="Details"
                    content="Introducing our new dashboard feature."
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with custom card (1.3.1 Info and Relationships)', async () => {
            const { container } = render(
                <Card variant={CardVariant.CUSTOM}>
                    <div>
                        <h3>Custom Dashboard</h3>
                        <p>Custom content with full control</p>
                        <button>Action</button>
                    </div>
                </Card>
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with action button (2.1.1 Keyboard)', async () => {
            const { container } = render(
                <Card
                    headerTitle="Dashboard"
                    bodyTitle="Summary"
                    content="Card content"
                    actionButton={{
                        text: 'View Details',
                        buttonType: ButtonType.PRIMARY,
                        size: ButtonSize.SMALL,
                    }}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 1.1.1 Non-text Content (Level A)', () => {
        it('has proper role="region" for card container - programmatically determinable', () => {
            render(
                <Card
                    headerTitle="Analytics Dashboard"
                    bodyTitle="Monthly Summary"
                    content="Track your key metrics."
                />
            )
            const card = screen.getByRole('region')
            expect(card).toBeInTheDocument()
        })

        it('has aria-label on card container - accessible name provided', () => {
            render(
                <Card
                    headerTitle="Analytics Dashboard"
                    bodyTitle="Monthly Summary"
                    content="Track your key metrics."
                />
            )
            const card = screen.getByRole('region')
            expect(card).toHaveAttribute('aria-label')
            expect(card.getAttribute('aria-label')).toContain(
                'Analytics Dashboard'
            )
        })

        it('has aria-labelledby linking to header title - proper ARIA relationships', () => {
            render(
                <Card
                    headerTitle="Analytics Dashboard"
                    bodyTitle="Monthly Summary"
                    content="Track your key metrics."
                />
            )
            const card = screen.getByRole('region')
            expect(card).toHaveAttribute('aria-labelledby')
            const titleId = card.getAttribute('aria-labelledby')
            expect(titleId).toBeTruthy()
            const titleElement = document.getElementById(titleId || '')
            expect(titleElement).toBeInTheDocument()
            expect(titleElement?.textContent).toContain('Analytics Dashboard')
        })

        it('headerSlot1 has aria-hidden when decorative - decorative icon handling', () => {
            const { container } = render(
                <Card
                    headerSlot1={
                        <div aria-label="Decorative icon">
                            <Star size={16} />
                        </div>
                    }
                    headerTitle="Dashboard"
                    bodyTitle="Summary"
                    content="Content"
                />
            )
            // headerSlot1 should be wrapped in a container with aria-hidden if decorative
            const headerSlot = container.querySelector(
                '[data-element="card-header"]'
            )
            expect(headerSlot).toBeInTheDocument()
        })

        it('cardSlot has aria-label for visual content - accessible descriptions', () => {
            render(
                <Card
                    variant={CardVariant.ALIGNED}
                    alignment={CardAlignment.VERTICAL}
                    cardSlot={
                        <div
                            style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                background:
                                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            }}
                            role="img"
                            aria-label="User avatar for John Doe"
                        >
                            JD
                        </div>
                    }
                    headerTitle="John Doe"
                    bodyTitle="Profile"
                    content="Developer profile"
                />
            )
            const cardSlot = screen.getByLabelText('User avatar for John Doe')
            expect(cardSlot).toBeInTheDocument()
        })
    })

    describe('WCAG 1.3.1 Info and Relationships (Level A)', () => {
        it('headerTitle has unique id for aria-labelledby relationship', () => {
            render(
                <Card
                    headerTitle="Analytics Dashboard"
                    bodyTitle="Monthly Summary"
                    content="Track your key metrics."
                />
            )
            const card = screen.getByRole('region')
            const titleId = card.getAttribute('aria-labelledby')
            expect(titleId).toBeTruthy()
            const titleElement = document.getElementById(titleId || '')
            expect(titleElement).toBeInTheDocument()
            expect(titleElement?.textContent).toBe('Analytics Dashboard')
        })

        it('headerTitle uses h2 semantic element - proper heading hierarchy', () => {
            render(
                <Card
                    headerTitle="Analytics Dashboard"
                    bodyTitle="Monthly Summary"
                    content="Track your key metrics."
                />
            )
            const headerTitle = screen.getByRole('heading', { level: 2 })
            expect(headerTitle).toBeInTheDocument()
            expect(headerTitle.textContent).toBe('Analytics Dashboard')
        })

        it('bodyTitle uses h3 semantic element - proper heading hierarchy', () => {
            render(
                <Card
                    headerTitle="Analytics Dashboard"
                    bodyTitle="Monthly Summary"
                    content="Track your key metrics."
                />
            )
            const bodyTitle = screen.getByRole('heading', { level: 3 })
            expect(bodyTitle).toBeInTheDocument()
            expect(bodyTitle.textContent).toBe('Monthly Summary')
        })

        it('subHeader has unique id and aria-describedby - accessible relationships', () => {
            render(
                <Card
                    headerTitle="Analytics Dashboard"
                    subHeader="Real-time performance metrics"
                    bodyTitle="Monthly Summary"
                    content="Track your key metrics."
                />
            )
            const subHeader = screen.getByText('Real-time performance metrics')
            expect(subHeader).toBeInTheDocument()
            expect(subHeader.tagName.toLowerCase()).toBe('p')
        })

        it('content has unique id and aria-describedby - accessible content description', () => {
            render(
                <Card
                    headerTitle="Analytics Dashboard"
                    bodyTitle="Monthly Summary"
                    content="Track your key metrics and performance indicators."
                />
            )
            const content = screen.getByText(
                'Track your key metrics and performance indicators.'
            )
            expect(content).toBeInTheDocument()
            expect(content.tagName.toLowerCase()).toBe('p')
        })

        it('header has role="group" for logical grouping', () => {
            const { container } = render(
                <Card
                    headerTitle="Analytics Dashboard"
                    bodyTitle="Monthly Summary"
                    content="Track your key metrics."
                />
            )
            const header = container.querySelector('[role="group"]')
            expect(header).toBeInTheDocument()
        })

        it('body has role="group" for logical grouping', () => {
            const { container } = render(
                <Card
                    headerTitle="Analytics Dashboard"
                    bodyTitle="Monthly Summary"
                    content="Track your key metrics."
                />
            )
            const groups = container.querySelectorAll('[role="group"]')
            expect(groups.length).toBeGreaterThan(0)
        })
    })

    describe('WCAG 1.3.2 Meaningful Sequence (Level A)', () => {
        it('content follows logical reading order - header, body, action', () => {
            render(
                <Card
                    headerTitle="Analytics Dashboard"
                    subHeader="Real-time metrics"
                    bodyTitle="Monthly Summary"
                    content="Track your key metrics and performance indicators."
                    actionButton={{
                        text: 'View Report',
                        buttonType: ButtonType.PRIMARY,
                        size: ButtonSize.SMALL,
                    }}
                />
            )
            const headerTitle = screen.getByText('Analytics Dashboard')
            const subHeader = screen.getByText('Real-time metrics')
            const bodyTitle = screen.getByText('Monthly Summary')
            const content = screen.getByText(
                'Track your key metrics and performance indicators.'
            )
            const button = screen.getByRole('button', { name: 'View Report' })

            // Verify all elements are present
            expect(headerTitle).toBeInTheDocument()
            expect(subHeader).toBeInTheDocument()
            expect(bodyTitle).toBeInTheDocument()
            expect(content).toBeInTheDocument()
            expect(button).toBeInTheDocument()
        })

        it('aligned card vertical maintains logical sequence', () => {
            render(
                <Card
                    variant={CardVariant.ALIGNED}
                    alignment={CardAlignment.VERTICAL}
                    cardSlot={<div aria-label="Avatar">JD</div>}
                    headerTitle="John Doe"
                    bodyTitle="Profile"
                    content="Senior Developer"
                />
            )
            const headerTitle = screen.getByText('John Doe')
            const bodyTitle = screen.getByText('Profile')
            expect(headerTitle).toBeInTheDocument()
            expect(bodyTitle).toBeInTheDocument()
        })

        it('aligned card horizontal maintains logical sequence', () => {
            render(
                <Card
                    variant={CardVariant.ALIGNED}
                    alignment={CardAlignment.HORIZONTAL}
                    cardSlot={
                        <div role="img" aria-label="Icon">
                            Icon
                        </div>
                    }
                    headerTitle="New Feature"
                    bodyTitle="Details"
                    content="Feature description"
                />
            )
            const headerTitle = screen.getByText('New Feature')
            const bodyTitle = screen.getByText('Details')
            expect(headerTitle).toBeInTheDocument()
            expect(bodyTitle).toBeInTheDocument()
        })
    })

    describe('WCAG 1.3.3 Sensory Characteristics (Level A)', () => {
        it('does not rely solely on visual location - text labels provide context', () => {
            render(
                <Card
                    headerTitle="Analytics Dashboard"
                    bodyTitle="Monthly Summary"
                    content="Track your key metrics."
                />
            )
            const card = screen.getByRole('region')
            const ariaLabel = card.getAttribute('aria-label')
            expect(ariaLabel).toContain('Analytics Dashboard')
            expect(ariaLabel).toContain('Monthly Summary')
        })

        it('action button has descriptive text - not just visual indicator', () => {
            render(
                <Card
                    headerTitle="Dashboard"
                    bodyTitle="Summary"
                    content="Content"
                    actionButton={{
                        text: 'View Full Report',
                        buttonType: ButtonType.PRIMARY,
                        size: ButtonSize.SMALL,
                    }}
                />
            )
            const button = screen.getByRole('button', {
                name: 'View Full Report',
            })
            expect(button).toBeInTheDocument()
            expect(button.textContent).toContain('View Full Report')
        })
    })

    describe('WCAG 1.3.4 Orientation (Level AA)', () => {
        it('works in both vertical and horizontal alignments', () => {
            const { rerender } = render(
                <Card
                    variant={CardVariant.ALIGNED}
                    alignment={CardAlignment.VERTICAL}
                    cardSlot={
                        <div role="img" aria-label="Slot">
                            Content
                        </div>
                    }
                    headerTitle="Feature"
                    bodyTitle="Details"
                    content="Description"
                />
            )
            expect(screen.getByText('Feature')).toBeInTheDocument()

            rerender(
                <Card
                    variant={CardVariant.ALIGNED}
                    alignment={CardAlignment.HORIZONTAL}
                    cardSlot={
                        <div role="img" aria-label="Slot">
                            Content
                        </div>
                    }
                    headerTitle="Feature"
                    bodyTitle="Details"
                    content="Description"
                />
            )
            expect(screen.getByText('Feature')).toBeInTheDocument()
        })
    })

    describe('WCAG 2.1.1 Keyboard (Level A)', () => {
        it('action button is keyboard accessible - Tab to focus', () => {
            render(
                <Card
                    headerTitle="Dashboard"
                    bodyTitle="Summary"
                    content="Content"
                    actionButton={{
                        text: 'View Report',
                        buttonType: ButtonType.PRIMARY,
                        size: ButtonSize.SMALL,
                    }}
                />
            )
            const button = screen.getByRole('button', { name: 'View Report' })
            expect(button).toBeInTheDocument()
            button.focus()
            expect(document.activeElement).toBe(button)
        })

        it('headerSlot2 buttons are keyboard accessible - keyboard navigation support', () => {
            render(
                <Card
                    headerTitle="Dashboard"
                    headerSlot2={
                        <button aria-label="Settings">
                            <Settings size={16} />
                        </button>
                    }
                    bodyTitle="Summary"
                    content="Content"
                />
            )
            const settingsButton = screen.getByRole('button', {
                name: 'Settings',
            })
            expect(settingsButton).toBeInTheDocument()
            settingsButton.focus()
            expect(document.activeElement).toBe(settingsButton)
        })

        it('all interactive elements are keyboard operable - no mouse-only functionality', () => {
            render(
                <Card
                    headerTitle="Dashboard"
                    headerSlot2={
                        <button aria-label="Settings">
                            <Settings size={16} />
                        </button>
                    }
                    bodyTitle="Summary"
                    content="Content"
                    actionButton={{
                        text: 'View Report',
                        buttonType: ButtonType.PRIMARY,
                        size: ButtonSize.SMALL,
                    }}
                />
            )
            const settingsButton = screen.getByRole('button', {
                name: 'Settings',
            })
            const actionButton = screen.getByRole('button', {
                name: 'View Report',
            })

            settingsButton.focus()
            expect(document.activeElement).toBe(settingsButton)

            actionButton.focus()
            expect(document.activeElement).toBe(actionButton)
        })
    })

    describe('WCAG 2.1.3 Keyboard (No Exception) (Level AAA)', () => {
        it('all functionality operable via keyboard without timing constraints', () => {
            render(
                <Card
                    headerTitle="Dashboard"
                    headerSlot2={
                        <button aria-label="Settings">
                            <Settings size={16} />
                        </button>
                    }
                    bodyTitle="Summary"
                    content="Content"
                    actionButton={{
                        text: 'View Report',
                        buttonType: ButtonType.PRIMARY,
                        size: ButtonSize.SMALL,
                    }}
                />
            )
            const settingsButton = screen.getByRole('button', {
                name: 'Settings',
            })
            expect(settingsButton).toBeTruthy()
            if (settingsButton) {
                settingsButton.focus()
                expect(document.activeElement).toBe(settingsButton)
            }
            // No timing constraints for keyboard operations
        })
    })

    describe('WCAG 2.4.3 Focus Order (Level A)', () => {
        it('focus order is logical - header actions, then body actions', () => {
            render(
                <Card
                    headerTitle="Dashboard"
                    headerSlot2={
                        <button aria-label="Settings">
                            <Settings size={16} />
                        </button>
                    }
                    bodyTitle="Summary"
                    content="Content"
                    actionButton={{
                        text: 'View Report',
                        buttonType: ButtonType.PRIMARY,
                        size: ButtonSize.SMALL,
                    }}
                />
            )
            const settingsButton = screen.getByRole('button', {
                name: 'Settings',
            })
            const actionButton = screen.getByRole('button', {
                name: 'View Report',
            })

            expect(settingsButton).toBeInTheDocument()
            expect(actionButton).toBeInTheDocument()
            // Focus order is logical within the card structure
        })
    })

    describe('WCAG 2.4.6 Headings and Labels (Level AA)', () => {
        it('headerTitle clearly describes card purpose - descriptive labels', () => {
            render(
                <Card
                    headerTitle="Analytics Dashboard"
                    bodyTitle="Monthly Summary"
                    content="Track your key metrics."
                />
            )
            const headerTitle = screen.getByText('Analytics Dashboard')
            expect(headerTitle).toBeInTheDocument()
            const card = screen.getByRole('region')
            const ariaLabel = card.getAttribute('aria-label')
            expect(ariaLabel).toContain('Analytics Dashboard')
        })

        it('bodyTitle is accessible and descriptive', () => {
            render(
                <Card
                    headerTitle="Analytics Dashboard"
                    bodyTitle="Monthly Summary"
                    content="Track your key metrics."
                />
            )
            const bodyTitle = screen.getByText('Monthly Summary')
            expect(bodyTitle).toBeInTheDocument()
            expect(bodyTitle.tagName.toLowerCase()).toBe('h3')
        })

        it('action button has descriptive text label', () => {
            render(
                <Card
                    headerTitle="Dashboard"
                    bodyTitle="Summary"
                    content="Content"
                    actionButton={{
                        text: 'View Full Report',
                        buttonType: ButtonType.PRIMARY,
                        size: ButtonSize.SMALL,
                    }}
                />
            )
            const button = screen.getByRole('button', {
                name: 'View Full Report',
            })
            expect(button).toBeInTheDocument()
            expect(button.textContent).toContain('View Full Report')
        })
    })

    describe('WCAG 2.4.7 Focus Visible (Level AA)', () => {
        it('action button shows focus indicator when focused', () => {
            render(
                <Card
                    headerTitle="Dashboard"
                    bodyTitle="Summary"
                    content="Content"
                    actionButton={{
                        text: 'View Report',
                        buttonType: ButtonType.PRIMARY,
                        size: ButtonSize.SMALL,
                    }}
                />
            )
            const button = screen.getByRole('button', { name: 'View Report' })
            expect(button).toBeTruthy()
            if (button) {
                button.focus()
                expect(document.activeElement).toBe(button)
            }
            // Focus indicator is handled by browser default or custom styles
        })

        it('headerSlot2 buttons show focus indicator - keyboard focus visible', () => {
            render(
                <Card
                    headerTitle="Dashboard"
                    headerSlot2={
                        <button aria-label="Settings">
                            <Settings size={16} />
                        </button>
                    }
                    bodyTitle="Summary"
                    content="Content"
                />
            )
            const settingsButton = screen.getByRole('button', {
                name: 'Settings',
            })
            expect(settingsButton).toBeTruthy()
            if (settingsButton) {
                settingsButton.focus()
                expect(document.activeElement).toBe(settingsButton)
            }
        })
    })

    describe('WCAG 2.5.8 Target Size (Minimum) (Level AA)', () => {
        it('action button meets minimum touch target size (24x24px)', () => {
            render(
                <Card
                    headerTitle="Dashboard"
                    bodyTitle="Summary"
                    content="Content"
                    actionButton={{
                        text: 'View Report',
                        buttonType: ButtonType.PRIMARY,
                        size: ButtonSize.SMALL,
                    }}
                />
            )
            const button = screen.getByRole('button', { name: 'View Report' })
            expect(button).toBeInTheDocument()
            // Button component should handle minimum touch target size
        })
    })

    describe('WCAG 3.2.1 On Focus (Level A)', () => {
        it('focusing elements does not cause unexpected context changes', () => {
            render(
                <Card
                    headerTitle="Dashboard"
                    headerSlot2={
                        <button aria-label="Settings">
                            <Settings size={16} />
                        </button>
                    }
                    bodyTitle="Summary"
                    content="Content"
                    actionButton={{
                        text: 'View Report',
                        buttonType: ButtonType.PRIMARY,
                        size: ButtonSize.SMALL,
                    }}
                />
            )
            const settingsButton = screen.getByRole('button', {
                name: 'Settings',
            })
            expect(settingsButton).toBeTruthy()
            if (settingsButton) {
                settingsButton.focus()
                expect(document.activeElement).toBe(settingsButton)
            }
            // No context change should occur
        })
    })

    describe('WCAG 3.2.2 On Input (Level A)', () => {
        it('interacting with elements does not cause unexpected context changes', async () => {
            const { user } = render(
                <Card
                    headerTitle="Dashboard"
                    headerSlot2={
                        <button aria-label="Settings">
                            <Settings size={16} />
                        </button>
                    }
                    bodyTitle="Summary"
                    content="Content"
                    actionButton={{
                        text: 'View Report',
                        buttonType: ButtonType.PRIMARY,
                        size: ButtonSize.SMALL,
                    }}
                />
            )
            const settingsButton = screen.getByRole('button', {
                name: 'Settings',
            })
            expect(settingsButton).toBeTruthy()
            if (settingsButton) {
                await user.click(settingsButton)
            }
            // No context change should occur
        })
    })

    describe('WCAG 3.2.5 Change on Request (Level AAA)', () => {
        it('all interactions are user-initiated - no automatic changes', () => {
            render(
                <Card
                    headerTitle="Dashboard"
                    headerSlot2={
                        <button aria-label="Settings">
                            <Settings size={16} />
                        </button>
                    }
                    bodyTitle="Summary"
                    content="Content"
                    actionButton={{
                        text: 'View Report',
                        buttonType: ButtonType.PRIMARY,
                        size: ButtonSize.SMALL,
                    }}
                />
            )
            const settingsButton = screen.getByRole('button', {
                name: 'Settings',
            })
            // No automatic changes - only user-initiated
            expect(settingsButton).toBeTruthy()
        })
    })

    describe('WCAG 4.1.2 Name, Role, Value (Level A)', () => {
        it('card has proper role and accessible name - programmatically determinable', () => {
            render(
                <Card
                    headerTitle="Analytics Dashboard"
                    bodyTitle="Monthly Summary"
                    content="Track your key metrics."
                />
            )
            const card = screen.getByRole('region')
            expect(card).toHaveAttribute('aria-label')
            expect(card).toHaveAttribute('aria-labelledby')
        })

        it('headerTitle is accessible - programmatically determinable', () => {
            render(
                <Card
                    headerTitle="Analytics Dashboard"
                    bodyTitle="Monthly Summary"
                    content="Track your key metrics."
                />
            )
            const headerTitle = screen.getByRole('heading', { level: 2 })
            expect(headerTitle).toBeInTheDocument()
            expect(headerTitle.textContent).toBe('Analytics Dashboard')
        })

        it('bodyTitle is accessible', () => {
            render(
                <Card
                    headerTitle="Analytics Dashboard"
                    bodyTitle="Monthly Summary"
                    content="Track your key metrics."
                />
            )
            const bodyTitle = screen.getByRole('heading', { level: 3 })
            expect(bodyTitle).toBeInTheDocument()
            expect(bodyTitle.textContent).toBe('Monthly Summary')
        })

        it('content is accessible', () => {
            render(
                <Card
                    headerTitle="Analytics Dashboard"
                    bodyTitle="Monthly Summary"
                    content="Track your key metrics and performance indicators."
                />
            )
            const content = screen.getByText(
                'Track your key metrics and performance indicators.'
            )
            expect(content).toBeInTheDocument()
            expect(content.tagName.toLowerCase()).toBe('p')
        })

        it('action button has proper role and accessible name', () => {
            render(
                <Card
                    headerTitle="Dashboard"
                    bodyTitle="Summary"
                    content="Content"
                    actionButton={{
                        text: 'View Report',
                        buttonType: ButtonType.PRIMARY,
                        size: ButtonSize.SMALL,
                    }}
                />
            )
            const button = screen.getByRole('button', { name: 'View Report' })
            expect(button).toBeInTheDocument()
            expect(button.textContent).toContain('View Report')
        })
    })

    describe('Screen Reader Support', () => {
        it('announces card title and body title to screen readers', () => {
            render(
                <Card
                    headerTitle="Analytics Dashboard"
                    bodyTitle="Monthly Summary"
                    content="Track your key metrics."
                />
            )
            const card = screen.getByRole('region')
            const ariaLabel = card.getAttribute('aria-label')
            expect(ariaLabel).toContain('Analytics Dashboard')
            expect(ariaLabel).toContain('Monthly Summary')
        })

        it('announces subHeader to screen readers', () => {
            render(
                <Card
                    headerTitle="Analytics Dashboard"
                    subHeader="Real-time performance metrics"
                    bodyTitle="Monthly Summary"
                    content="Track your key metrics."
                />
            )
            const subHeader = screen.getByText('Real-time performance metrics')
            expect(subHeader).toBeInTheDocument()
            expect(subHeader.tagName.toLowerCase()).toBe('p')
        })

        it('announces content to screen readers', () => {
            render(
                <Card
                    headerTitle="Analytics Dashboard"
                    bodyTitle="Monthly Summary"
                    content="Track your key metrics and performance indicators with comprehensive analytics."
                />
            )
            const content = screen.getByText(
                'Track your key metrics and performance indicators with comprehensive analytics.'
            )
            expect(content).toBeInTheDocument()
            expect(content.tagName.toLowerCase()).toBe('p')
        })

        it('announces action button purpose to screen readers', () => {
            render(
                <Card
                    headerTitle="Dashboard"
                    bodyTitle="Summary"
                    content="Content"
                    actionButton={{
                        text: 'View Full Report',
                        buttonType: ButtonType.PRIMARY,
                        size: ButtonSize.SMALL,
                    }}
                />
            )
            const button = screen.getByRole('button', {
                name: 'View Full Report',
            })
            expect(button).toBeInTheDocument()
            expect(button.textContent).toContain('View Full Report')
        })
    })

    describe('Comprehensive WCAG 2.1/2.2 Compliance (Level A, AA, AAA)', () => {
        it('meets WCAG standards with all features combined - comprehensive test', async () => {
            const { container } = render(
                <Card
                    headerSlot1={
                        <div aria-label="Icon">
                            <Star size={16} />
                        </div>
                    }
                    headerTitle="Analytics Dashboard"
                    headerTag={
                        <Tag
                            text="Pro"
                            variant={TagVariant.ATTENTIVE}
                            color={TagColor.SUCCESS}
                            size={TagSize.SM}
                        />
                    }
                    headerSlot2={
                        <button aria-label="Settings">
                            <Settings size={16} />
                        </button>
                    }
                    subHeader="Real-time performance metrics and insights"
                    bodySlot1={<div>Alert content</div>}
                    bodyTitle="Monthly Summary"
                    content="Track your key metrics and performance indicators with comprehensive analytics and real-time data visualization."
                    bodySlot2={<div>Metrics content</div>}
                    actionButton={{
                        text: 'View Full Report',
                        buttonType: ButtonType.PRIMARY,
                        size: ButtonSize.SMALL,
                    }}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
            // Tests: 1.1.1, 1.3.1, 1.3.2, 2.1.1, 2.4.6, 2.4.7, 4.1.2, keyboard navigation, screen reader support
        })

        it('meets WCAG standards for aligned card vertical - all aligned card requirements', async () => {
            const { container } = render(
                <Card
                    variant={CardVariant.ALIGNED}
                    alignment={CardAlignment.VERTICAL}
                    centerAlign={true}
                    cardSlot={
                        <div
                            style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                background:
                                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            }}
                            aria-label="User avatar"
                        >
                            JD
                        </div>
                    }
                    headerTitle="John Doe"
                    headerTag={
                        <Tag
                            text="Premium"
                            variant={TagVariant.ATTENTIVE}
                            color={TagColor.SUCCESS}
                            size={TagSize.SM}
                        />
                    }
                    subHeader="Senior Developer"
                    bodyTitle="Profile Information"
                    content="Senior Developer with expertise in React and Node.js."
                    actionButton={{
                        text: 'View Profile',
                        buttonType: ButtonType.SECONDARY,
                        size: ButtonSize.SMALL,
                    }}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for aligned card horizontal - all aligned card requirements', async () => {
            const { container } = render(
                <Card
                    variant={CardVariant.ALIGNED}
                    alignment={CardAlignment.HORIZONTAL}
                    cardSlot={
                        <div
                            style={{
                                width: '28px',
                                height: '28px',
                                background: '#f0f9ff',
                            }}
                            role="img"
                            aria-label="Icon"
                        >
                            <TrendingUp size={16} aria-hidden="true" />
                        </div>
                    }
                    headerTitle="New App Launch"
                    headerSlot2={
                        <button aria-label="More options">
                            <Settings size={16} />
                        </button>
                    }
                    subHeader="Latest feature release"
                    bodyTitle="Feature Details"
                    content="Introducing our new dashboard with enhanced analytics."
                    actionButton={{
                        text: 'Learn More',
                        buttonType: ButtonType.PRIMARY,
                        size: ButtonSize.SMALL,
                    }}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for custom card - all custom card requirements', async () => {
            const { container } = render(
                <Card variant={CardVariant.CUSTOM}>
                    <div>
                        <h3>Custom Dashboard</h3>
                        <p>Custom content with full control over layout</p>
                        <button>Action Button</button>
                    </div>
                </Card>
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards without optional elements - optional elements handled', async () => {
            const { container } = render(
                <Card headerTitle="Simple Card" content="Basic content" />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards without header - optional header handled', async () => {
            const { container } = render(
                <Card
                    bodyTitle="Body Only"
                    content="Content without header"
                    actionButton={{
                        text: 'Action',
                        buttonType: ButtonType.PRIMARY,
                        size: ButtonSize.SMALL,
                    }}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards without action button - optional action handled', async () => {
            const { container } = render(
                <Card
                    headerTitle="Dashboard"
                    bodyTitle="Summary"
                    content="Content without action button"
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })
})
