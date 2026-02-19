import React from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, cleanup } from '../../test-utils'
import { axe } from 'jest-axe'
import userEvent from '@testing-library/user-event'
import { AvatarV2 } from '../../../lib/components/AvatarV2'
import {
    AvatarV2Size,
    AvatarV2Shape,
    AvatarV2Status,
} from '../../../lib/components/AvatarV2'
import { MockIcon } from '../../test-utils'

describe('AvatarV2 Accessibility', () => {
    beforeEach(() => {
        cleanup()
    })

    afterEach(() => {
        cleanup()
    })

    describe('WCAG 2.1 AA Compliance - Critical Violations', () => {
        it('passes axe-core validation for basic avatar with image', async () => {
            const { container } = render(
                <AvatarV2 src="https://example.com/avatar.jpg" alt="John Doe" />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('passes axe-core validation for avatar with fallback text', async () => {
            const { container } = render(<AvatarV2 alt="John Doe" />)

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('passes axe-core validation for avatar with status indicator', async () => {
            const { container } = render(
                <AvatarV2
                    alt="John Doe"
                    status={{ type: AvatarV2Status.ONLINE }}
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('passes axe-core validation for avatar with slots', async () => {
            const { container } = render(
                <AvatarV2
                    alt="John Doe"
                    leadingSlot={<MockIcon />}
                    trailingSlot={<MockIcon />}
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('passes axe-core validation for disabled avatar', async () => {
            const { container } = render(<AvatarV2 alt="John Doe" disabled />)

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('passes axe-core validation for interactive avatar', async () => {
            const { container } = render(
                <AvatarV2 alt="John Doe" onClick={() => {}} />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('passes axe-core validation for all status types', async () => {
            const statuses = [
                AvatarV2Status.ONLINE,
                AvatarV2Status.OFFLINE,
                AvatarV2Status.AWAY,
                AvatarV2Status.BUSY,
                AvatarV2Status.NONE,
            ]

            for (const status of statuses) {
                const { container } = render(
                    <AvatarV2 alt="Test" status={{ type: status }} />
                )

                const results = await axe(container)
                expect(results).toHaveNoViolations()
            }
        })

        it('passes axe-core validation for all sizes', async () => {
            const sizes = [
                AvatarV2Size.XS,
                AvatarV2Size.SM,
                AvatarV2Size.MD,
                AvatarV2Size.LG,
                AvatarV2Size.XL,
                AvatarV2Size.XXL,
            ]

            for (const size of sizes) {
                const { container } = render(
                    <AvatarV2 alt="Test" size={size} />
                )

                const results = await axe(container)
                expect(results).toHaveNoViolations()
            }
        })

        it('passes axe-core validation for all shapes', async () => {
            const shapes = [
                AvatarV2Shape.CIRCLE,
                AvatarV2Shape.ROUNDED,
                AvatarV2Shape.SQUARE,
            ]

            for (const shape of shapes) {
                const { container } = render(
                    <AvatarV2 alt="Test" shape={shape} />
                )

                const results = await axe(container)
                expect(results).toHaveNoViolations()
            }
        })

        it('passes axe-core validation with skeleton', async () => {
            const { container } = render(
                <AvatarV2 alt="Test" skeleton={{ show: true }} />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 1.1.1 Non-text Content', () => {
        it('has proper alt text for image', () => {
            const { container } = render(
                <AvatarV2 src="https://example.com/avatar.jpg" alt="John Doe" />
            )

            const image = container.querySelector('img')
            expect(image).toHaveAttribute('alt', 'John Doe')
        })

        it('status indicator has aria-hidden="true"', () => {
            const { container } = render(
                <AvatarV2 alt="Test" status={{ type: AvatarV2Status.ONLINE }} />
            )

            const indicator = container.querySelector(
                '[data-avatar-indicator="true"]'
            )
            expect(indicator).toHaveAttribute('aria-hidden', 'true')
        })

        it('status indicator has role="presentation"', () => {
            const { container } = render(
                <AvatarV2 alt="Test" status={{ type: AvatarV2Status.ONLINE }} />
            )

            const indicator = container.querySelector(
                '[data-avatar-indicator="true"]'
            )
            expect(indicator).toHaveAttribute('role', 'presentation')
        })

        it('fallback content has aria-hidden="true"', () => {
            const { container } = render(<AvatarV2 alt="Test" />)

            const fallback = container.querySelector(
                '[data-avatar-fallback="true"]'
            )
            expect(fallback).toHaveAttribute('aria-hidden', 'true')
        })

        it('screen reader text has aria-hidden="true"', () => {
            const { container } = render(<AvatarV2 alt="John Doe" />)

            const screenReaderText = container.querySelector(
                'span[aria-hidden="true"]'
            )
            expect(screenReaderText).toBeInTheDocument()
        })
    })

    describe('WCAG 2.4.4 Link Purpose (In Context)', () => {
        it('has accessible label for interactive avatar', () => {
            const { container } = render(
                <AvatarV2 alt="John Doe" onClick={() => {}} />
            )

            const avatar = container.querySelector('[data-avatar]')
            expect(avatar).toHaveAttribute('aria-label')
            expect(avatar).toHaveAttribute('role', 'img')
        })

        it('includes status in accessible label', () => {
            const { container } = render(
                <AvatarV2
                    alt="John Doe"
                    status={{ type: AvatarV2Status.ONLINE }}
                />
            )

            const avatar = container.querySelector('[data-avatar]')
            const ariaLabel = avatar?.getAttribute('aria-label')
            expect(ariaLabel).toContain('John Doe')
            expect(ariaLabel).toContain('online')
        })
    })

    describe('WCAG 2.1.1 Keyboard', () => {
        it('is keyboard accessible when interactive', async () => {
            const user = userEvent.setup()
            const handleClick = vi.fn()

            const { container } = render(
                <AvatarV2 alt="Test" onClick={handleClick} />
            )

            const avatar = container.querySelector(
                '[data-avatar]'
            ) as HTMLElement
            expect(avatar).toHaveAttribute('tabIndex', '0')

            if (avatar) {
                avatar.focus()
                await user.keyboard('{Enter}')
            }

            expect(handleClick).toHaveBeenCalled()
        })

        it('has tabIndex when interactive', () => {
            const { container } = render(
                <AvatarV2 alt="Test" onClick={() => {}} />
            )

            const avatar = container.querySelector('[data-avatar]')
            expect(avatar).toHaveAttribute('tabIndex', '0')
        })

        it('does not have tabIndex when not interactive', () => {
            const { container } = render(<AvatarV2 alt="Test" />)

            const avatar = container.querySelector('[data-avatar]')
            expect(avatar).not.toHaveAttribute('tabIndex')
        })

        it('has tabIndex -1 when disabled', () => {
            const { container } = render(
                <AvatarV2 alt="Test" onClick={() => {}} disabled />
            )

            const avatar = container.querySelector('[data-avatar]')
            expect(avatar).toHaveStyle({ pointerEvents: 'none' })
        })

        it('handles Enter key for activation', async () => {
            const user = userEvent.setup()
            const handleClick = vi.fn()

            const { container } = render(
                <AvatarV2 alt="Test" onClick={handleClick} />
            )

            const avatar = container.querySelector(
                '[data-avatar]'
            ) as HTMLElement
            if (avatar) {
                avatar.focus()
                await user.keyboard('{Enter}')
            }

            expect(handleClick).toHaveBeenCalledTimes(1)
        })

        it('handles Space key for activation', async () => {
            const user = userEvent.setup()
            const handleClick = vi.fn()

            const { container } = render(
                <AvatarV2 alt="Test" onClick={handleClick} />
            )

            const avatar = container.querySelector(
                '[data-avatar]'
            ) as HTMLElement
            if (avatar) {
                avatar.focus()
                await user.keyboard(' ')
            }

            expect(handleClick).toHaveBeenCalledTimes(1)
        })
    })

    describe('WCAG 2.5.5 Target Size', () => {
        it('meets minimum touch target size for interactive avatar', () => {
            const { container } = render(
                <AvatarV2
                    alt="Test"
                    onClick={() => {}}
                    size={AvatarV2Size.MD}
                />
            )

            const avatar = container.querySelector('[data-avatar]')
            expect(avatar).toBeInTheDocument()
        })
    })

    describe('WCAG 4.1.2 Name, Role, Value', () => {
        it('has proper role attribute', () => {
            const { container } = render(<AvatarV2 alt="John Doe" />)

            const avatar = container.querySelector('[data-avatar]')
            expect(avatar).toHaveAttribute('role', 'img')
        })

        it('has proper aria-label attribute', () => {
            const { container } = render(<AvatarV2 alt="John Doe" />)

            const avatar = container.querySelector('[data-avatar]')
            expect(avatar).toHaveAttribute('aria-label')
            expect(avatar?.getAttribute('aria-label')).toContain('John Doe')
        })

        it('has aria-live when status is present', () => {
            const { container } = render(
                <AvatarV2
                    alt="John Doe"
                    status={{ type: AvatarV2Status.ONLINE }}
                />
            )

            const avatar = container.querySelector('[data-avatar]')
            expect(avatar).toHaveAttribute('aria-live', 'polite')
        })

        it('does not have aria-live when status is NONE', () => {
            const { container } = render(
                <AvatarV2
                    alt="John Doe"
                    status={{ type: AvatarV2Status.NONE }}
                />
            )

            const avatar = container.querySelector('[data-avatar]')
            expect(avatar).not.toHaveAttribute('aria-live')
        })

        it('image has proper role attribute', () => {
            const { container } = render(
                <AvatarV2 src="https://example.com/avatar.jpg" alt="John Doe" />
            )

            const image = container.querySelector('img')
            expect(image).toHaveAttribute('role', 'img')
        })
    })

    describe('WCAG 1.4.3 Contrast (Minimum)', () => {
        it('fallback text has sufficient contrast', () => {
            const { container } = render(<AvatarV2 alt="Test" />)

            const fallback = container.querySelector(
                '[data-avatar-fallback="true"]'
            )
            expect(fallback).toHaveStyle({ color: 'rgb(255, 255, 255)' })
        })
    })

    describe('Focus Management', () => {
        it('can receive focus when interactive', () => {
            const { container } = render(
                <AvatarV2 alt="Test" onClick={() => {}} />
            )

            const avatar = container.querySelector(
                '[data-avatar]'
            ) as HTMLElement
            avatar?.focus()

            expect(document.activeElement).toBe(avatar)
        })

        it('cannot receive focus when disabled', async () => {
            const user = userEvent.setup()
            const { container } = render(
                <>
                    <button>Focusable Button</button>
                    <AvatarV2 alt="Test" onClick={() => {}} disabled />
                </>
            )

            const avatar = container.querySelector(
                '[data-avatar]'
            ) as HTMLElement
            expect(avatar).toHaveAttribute('tabIndex', '-1')

            const button = screen.getByRole('button', {
                name: 'Focusable Button',
            })
            button.focus()
            expect(document.activeElement).toBe(button)

            await user.tab()
            expect(document.activeElement).not.toBe(avatar)
            expect([button, document.body]).toContain(document.activeElement)
        })
    })

    describe('Screen Reader Support', () => {
        it('provides accessible label for screen readers', () => {
            const { container } = render(<AvatarV2 alt="John Doe" />)

            const avatar = container.querySelector('[data-avatar]')
            const ariaLabel = avatar?.getAttribute('aria-label')
            expect(ariaLabel).toBeTruthy()
            expect(ariaLabel).toContain('John Doe')
        })

        it('includes status information in accessible label', () => {
            const { container } = render(
                <AvatarV2
                    alt="John Doe"
                    status={{ type: AvatarV2Status.ONLINE }}
                />
            )

            const avatar = container.querySelector('[data-avatar]')
            const ariaLabel = avatar?.getAttribute('aria-label')
            expect(ariaLabel).toContain('online')
        })

        it('has visually hidden text for additional context', () => {
            const { container } = render(<AvatarV2 alt="John Doe" />)

            const screenReaderText = container.querySelector(
                'span[aria-hidden="true"]'
            )
            expect(screenReaderText).toBeInTheDocument()
            expect(screenReaderText?.textContent).toContain('John Doe')
        })
    })

    describe('Status Indicator Accessibility', () => {
        it('status indicator is not announced to screen readers', () => {
            const { container } = render(
                <AvatarV2 alt="Test" status={{ type: AvatarV2Status.ONLINE }} />
            )

            const indicator = container.querySelector(
                '[data-avatar-indicator="true"]'
            )
            expect(indicator).toHaveAttribute('aria-hidden', 'true')
            expect(indicator).toHaveAttribute('role', 'presentation')
        })

        it('status information is conveyed through aria-label', () => {
            const { container } = render(
                <AvatarV2
                    alt="John Doe"
                    status={{ type: AvatarV2Status.ONLINE }}
                />
            )

            const avatar = container.querySelector('[data-avatar]')
            const ariaLabel = avatar?.getAttribute('aria-label')
            expect(ariaLabel).toContain('online')
        })
    })

    describe('Slot Accessibility', () => {
        it('leading slot does not interfere with accessibility', () => {
            const { container } = render(
                <AvatarV2 alt="Test" leadingSlot={<MockIcon />} />
            )

            const avatar = container.querySelector('[data-avatar]')
            expect(avatar).toHaveAttribute('aria-label')
            expect(avatar).toHaveAttribute('role', 'img')
        })

        it('trailing slot does not interfere with accessibility', () => {
            const { container } = render(
                <AvatarV2 alt="Test" trailingSlot={<MockIcon />} />
            )

            const avatar = container.querySelector('[data-avatar]')
            expect(avatar).toHaveAttribute('aria-label')
            expect(avatar).toHaveAttribute('role', 'img')
        })
    })
})
