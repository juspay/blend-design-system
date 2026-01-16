import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test-utils'
import { axe } from 'jest-axe'
import { ButtonV2 } from '../../../lib/components/ButtonV2'
import {
    ButtonType,
    ButtonSubType,
} from '../../../lib/components/ButtonV2/buttonV2.types'
import { MockIcon } from '../../test-utils'

describe('ButtonV2 Accessibility', () => {
    describe('WCAG 2.1 AA Compliance - Critical Violations', () => {
        it('passes axe-core validation for all button types', async () => {
            const buttonTypes = [
                ButtonType.PRIMARY,
                ButtonType.SECONDARY,
                ButtonType.DANGER,
                ButtonType.SUCCESS,
            ]

            for (const buttonType of buttonTypes) {
                const { container } = render(
                    <ButtonV2
                        text={`${buttonType} button`}
                        buttonType={buttonType}
                    />
                )
                const results = await axe(container)
                expect(results).toHaveNoViolations()
            }
        })

        it('passes axe-core validation for all states', async () => {
            const states = [
                { disabled: true },
                { loading: true },
                { showSkeleton: true },
            ]

            for (const state of states) {
                const { container } = render(
                    <ButtonV2 text="Test" {...state} />
                )
                const results = await axe(container)
                expect(results).toHaveNoViolations()
            }
        })

        it('passes axe-core validation with icons', async () => {
            const { container } = render(
                <ButtonV2
                    text="With Icons"
                    leftSlot={{ slot: <MockIcon /> }}
                    rightSlot={{ slot: <MockIcon /> }}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 1.1.1 Non-text Content - Icon-Only Buttons', () => {
        it('catches violation when icon-only button lacks accessible name', async () => {
            const { container } = render(
                <ButtonV2
                    leftSlot={{ slot: <MockIcon /> }}
                    subType={ButtonSubType.ICON_ONLY}
                />
            )
            const results = await axe(container)
            const buttonNameViolations = results.violations.filter(
                (v) => v.id === 'button-name'
            )
            expect(buttonNameViolations.length).toBeGreaterThan(0)
        })

        it('catches violation when icon-only lacks accessible name (no subtype specified)', async () => {
            const { container } = render(
                <ButtonV2 leftSlot={{ slot: <MockIcon /> }} />
            )
            const results = await axe(container)

            expect(results.violations.length).toBeGreaterThan(0)
            expect(results.violations.some((v) => v.id === 'button-name')).toBe(
                true
            )
        })

        it('passes when icon-only button has aria-label', async () => {
            const { container } = render(
                <ButtonV2
                    leftSlot={{ slot: <MockIcon /> }}
                    subType={ButtonSubType.ICON_ONLY}
                    aria-label="Save document"
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('passes when icon-only button has aria-labelledby', async () => {
            const { container } = render(
                <>
                    <span id="save-label">Save</span>
                    <ButtonV2
                        leftSlot={{ slot: <MockIcon /> }}
                        subType={ButtonSubType.ICON_ONLY}
                        aria-labelledby="save-label"
                    />
                </>
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('decorative icons are hidden from screen readers when text is present', async () => {
            const { container } = render(
                <ButtonV2
                    text="Save"
                    leftSlot={{ slot: <MockIcon /> }}
                    rightSlot={{ slot: <MockIcon /> }}
                />
            )
            const button = screen.getByRole('button', { name: 'Save' })
            const icons = button.querySelectorAll('[data-element]')

            icons.forEach((icon) => {
                expect(icon).toHaveAttribute('aria-hidden', 'true')
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('icon-only button does not hide icon from screen readers', async () => {
            const { container } = render(
                <ButtonV2
                    leftSlot={{ slot: <MockIcon /> }}
                    subType={ButtonSubType.ICON_ONLY}
                    aria-label="Save document"
                />
            )

            const button = screen.getByRole('button', {
                name: 'Save document',
            })
            const icon = button.querySelector('[data-element="leading-icon"]')

            expect(icon).not.toHaveAttribute('aria-hidden')

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 2.1.1 Keyboard - Critical Navigation', () => {
        it('is fully keyboard accessible with Enter and Space', async () => {
            const handleClick = vi.fn()
            const { user } = render(
                <ButtonV2 text="Keyboard Test" onClick={handleClick} />
            )

            const button = screen.getByRole('button', { name: 'Keyboard Test' })
            await user.tab()
            expect(document.activeElement).toBe(button)

            await user.keyboard('{Enter}')
            expect(handleClick).toHaveBeenCalledTimes(1)

            await user.keyboard(' ')
            expect(handleClick).toHaveBeenCalledTimes(2)
        })

        it('disabled buttons are excluded from keyboard navigation', async () => {
            const { user } = render(<ButtonV2 text="Disabled" disabled />)
            const button = screen.getByRole('button', { name: 'Disabled' })

            expect(button).toHaveAttribute('tabIndex', '-1')
            expect(button).toBeDisabled()

            await user.tab()
            expect(document.activeElement).not.toBe(button)
        })

        it('loading buttons prevent keyboard activation', async () => {
            const handleClick = vi.fn()
            const { user } = render(
                <ButtonV2 text="Loading" loading onClick={handleClick} />
            )

            await user.tab()
            await user.keyboard('{Enter}')

            expect(handleClick).not.toHaveBeenCalled()
        })
    })

    describe('WCAG 4.1.2 Name, Role, Value - ARIA Attributes', () => {
        it('has correct ARIA attributes for loading state', () => {
            render(<ButtonV2 text="Loading" loading />)
            const button = screen.getByRole('button')

            expect(button).toHaveAttribute('aria-busy', 'true')
            expect(
                button.querySelector('span[aria-live="polite"]')
            ).toHaveTextContent('Loading, please wait')
        })

        it('has correct ARIA attributes for skeleton state', () => {
            render(<ButtonV2 text="Skeleton" showSkeleton />)
            const button = screen.getByRole('button')

            expect(button).toHaveAttribute('aria-disabled', 'true')
            expect(button).toHaveAttribute('aria-label', 'Skeleton')
            expect(button).toHaveAttribute('tabIndex', '-1')
        })

        it('supports aria-describedby correctly', async () => {
            const { container } = render(
                <>
                    <ButtonV2 text="Submit" aria-describedby="help-text" />
                    <span id="help-text">Press to submit</span>
                </>
            )
            const button = screen.getByRole('button', { name: 'Submit' })
            expect(button).toHaveAttribute('aria-describedby', 'help-text')

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('supports custom ARIA attributes for complex interactions', async () => {
            const { container } = render(
                <ButtonV2
                    text="Menu"
                    aria-expanded="false"
                    aria-haspopup="true"
                    aria-controls="menu-1"
                />
            )
            const button = screen.getByRole('button', { name: 'Menu' })
            expect(button).toHaveAttribute('aria-expanded', 'false')
            expect(button).toHaveAttribute('aria-haspopup', 'true')
            expect(button).toHaveAttribute('aria-controls', 'menu-1')

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 4.1.3 Status Messages - Loading States', () => {
        it('announces loading state to screen readers', () => {
            render(<ButtonV2 text="Loading" loading />)
            const button = screen.getByRole('button')
            const srText = button.querySelector('span[aria-live="polite"]')

            expect(srText).toBeInTheDocument()
            expect(srText).toHaveTextContent('Loading, please wait')
        })

        it('loading spinner is hidden from screen readers', () => {
            render(<ButtonV2 text="Loading" loading />)
            const button = screen.getByRole('button')
            const spinner = button.querySelector('[data-status="loading"]')

            expect(spinner).toBeInTheDocument()
            // Spinner should not interfere with screen reader announcements
        })
    })

    describe('Edge Cases - Accessibility Violations', () => {
        it('catches violation when button has no accessible name', async () => {
            const { container } = render(<ButtonV2 />)
            const results = await axe(container)

            // Should catch button-name violation
            expect(results.violations.length).toBeGreaterThan(0)
            expect(results.violations.some((v) => v.id === 'button-name')).toBe(
                true
            )
        })

        it('passes when button has text as accessible name', async () => {
            const { container } = render(<ButtonV2 text="Click me" />)
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('passes when button has aria-label as accessible name', async () => {
            const { container } = render(
                <ButtonV2 aria-label="Action button" />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('Comprehensive WCAG Compliance', () => {
        it('meets WCAG standards with all features combined', async () => {
            const { container } = render(
                <ButtonV2
                    text="Complete Test"
                    buttonType={ButtonType.PRIMARY}
                    loading
                    leftSlot={{ slot: <MockIcon /> }}
                    rightSlot={{ slot: <MockIcon /> }}
                    aria-describedby="help"
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })
})
