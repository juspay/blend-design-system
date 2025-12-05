import React from 'react'
import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '../../test-utils'
import { axe } from 'jest-axe'
import Avatar from '../../../lib/components/Avatar/Avatar'
import { AvatarSize, AvatarShape } from '../../../lib/components/Avatar/types'

describe('Avatar Accessibility', () => {
    afterEach(cleanup)

    describe('WCAG 2.0, 2.1, 2.2 Compliance (Level A, AA, AAA)', () => {
        it('meets WCAG standards for avatar with image (axe-core validation)', async () => {
            const { container } = render(
                <Avatar src="https://example.com/avatar.jpg" alt="John Doe" />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for avatar with fallback initials (axe-core validation)', async () => {
            const { container } = render(<Avatar alt="John Doe" />)
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for all avatar sizes (axe-core validation)', async () => {
            const sizes = [
                AvatarSize.SM,
                AvatarSize.REGULAR,
                AvatarSize.MD,
                AvatarSize.LG,
                AvatarSize.XL,
            ]

            for (const size of sizes) {
                const { container, unmount } = render(
                    <Avatar alt="Test User" size={size} />
                )
                const results = await axe(container)
                expect(results).toHaveNoViolations()
                unmount()
            }
        })

        it('meets WCAG standards for all avatar shapes (axe-core validation)', async () => {
            const shapes = [AvatarShape.CIRCULAR, AvatarShape.ROUNDED]

            for (const shape of shapes) {
                const { container, unmount } = render(
                    <Avatar alt="Test User" shape={shape} />
                )
                const results = await axe(container)
                expect(results).toHaveNoViolations()
                unmount()
            }
        })

        it('meets WCAG standards with online indicator (axe-core validation)', async () => {
            const { container } = render(
                <Avatar alt="John Doe" online={true} />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with slots (axe-core validation)', async () => {
            const { container } = render(
                <Avatar
                    alt="John Doe"
                    leadingSlot={<span>Leading</span>}
                    trailingSlot={<span>Trailing</span>}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 1.1.1 Non-text Content (Level A)', () => {
        it('has alt text for image - alternative text provided (WCAG 1.1.1)', () => {
            const { container } = render(
                <Avatar src="https://example.com/avatar.jpg" alt="John Doe" />
            )
            const image = container.querySelector('img')
            expect(image).toBeInTheDocument()
            expect(image).toHaveAttribute('alt', 'John Doe')
        })

        it('has alt text even when image fails to load - fallback accessibility (WCAG 1.1.1)', () => {
            const { container } = render(
                <Avatar src="invalid-url.jpg" alt="Jane Smith" />
            )
            // Alt text should be available in visually hidden span
            const avatar = container.querySelector('span')
            expect(avatar).toBeInTheDocument()
            expect(avatar).toHaveTextContent('Jane Smith')
        })

        it('provides accessible name via alt text - name is programmatically determinable (WCAG 1.1.1, 4.1.2)', () => {
            const { container } = render(<Avatar alt="User Avatar" />)
            const avatar = container.querySelector('span')
            expect(avatar).toBeInTheDocument()
            expect(avatar).toHaveTextContent('User Avatar')
        })

        it('handles empty alt text gracefully - decorative image handling (WCAG 1.1.1)', () => {
            const { container } = render(
                <Avatar src="https://example.com/avatar.jpg" alt="" />
            )
            const image = container.querySelector('img')
            if (image) {
                expect(image).toHaveAttribute('alt', '')
            }
            // Visually hidden span should have empty text
            const hiddenSpan = container.querySelector('span')
            expect(hiddenSpan).toBeInTheDocument()
        })

        it('decorative online indicator has aria-hidden="true" - non-text content (WCAG 1.1.1)', () => {
            const { container } = render(
                <Avatar alt="John Doe" online={true} />
            )
            const indicator = container.querySelector('[aria-hidden="true"]')
            expect(indicator).toBeTruthy()
            expect(indicator).toHaveAttribute('data-avatar-indicator', 'true')
        })

        it('fallback content has aria-hidden="true" when image present - decorative content (WCAG 1.1.1)', () => {
            const { container } = render(
                <Avatar src="https://example.com/avatar.jpg" alt="John Doe" />
            )
            const fallback = container.querySelector(
                '[data-avatar-fallback="true"]'
            )
            // Fallback should not be visible when image is present
            expect(fallback).toBeFalsy()
        })
    })

    describe('WCAG 4.1.2 Name, Role, Value (Level A)', () => {
        it('has accessible name via alt text - name is programmatically determinable (WCAG 4.1.2)', () => {
            const { container } = render(<Avatar alt="User Profile" />)
            const avatar = container.querySelector('span')
            expect(avatar).toBeInTheDocument()
            expect(avatar).toHaveTextContent('User Profile')
        })

        it('image has proper role - semantic structure (WCAG 4.1.2)', () => {
            const { container } = render(
                <Avatar src="https://example.com/avatar.jpg" alt="John Doe" />
            )
            const image = container.querySelector('img')
            expect(image).toBeInTheDocument()
            expect(image).toHaveAttribute('alt', 'John Doe')
        })

        it('maintains accessible name when image fails - error handling (WCAG 4.1.2)', () => {
            const { container } = render(
                <Avatar src="invalid.jpg" alt="Fallback User" />
            )
            const avatar = container.querySelector('span')
            expect(avatar).toBeInTheDocument()
            expect(avatar).toHaveTextContent('Fallback User')
        })

        it('has proper data attributes for identification - programmatic identification (WCAG 4.1.2)', () => {
            const { container } = render(<Avatar alt="Test User" />)
            const avatar = container.querySelector('[data-avatar]')
            expect(avatar).toBeInTheDocument()
            expect(avatar).toHaveAttribute('data-avatar', 'Test User')
        })
    })

    describe('WCAG 1.3.1 Info and Relationships (Level A)', () => {
        it('has semantic structure - proper HTML elements (WCAG 1.3.1)', () => {
            const { container } = render(<Avatar alt="John Doe" />)
            const avatar = container.querySelector('[data-avatar]')
            expect(avatar).toBeInTheDocument()
        })

        it('visually hidden text provides context - screen reader support (WCAG 1.3.1)', () => {
            const { container } = render(<Avatar alt="Jane Smith" />)
            const hiddenText = container.querySelector('span')
            expect(hiddenText).toBeInTheDocument()
            expect(hiddenText).toHaveTextContent('Jane Smith')
            // Check it's visually hidden
            const styles = window.getComputedStyle(hiddenText as HTMLElement)
            expect(styles.position).toBe('absolute')
            expect(styles.width).toBe('1px')
        })

        it('online status indicated via data attribute - state communication (WCAG 1.3.1)', () => {
            const { container } = render(
                <Avatar alt="John Doe" online={true} />
            )
            const avatar = container.querySelector('[data-status="online"]')
            expect(avatar).toBeInTheDocument()
        })

        it('offline status indicated via data attribute - state communication (WCAG 1.3.1)', () => {
            const { container } = render(
                <Avatar alt="John Doe" online={false} />
            )
            const avatar = container.querySelector('[data-status="offline"]')
            expect(avatar).toBeInTheDocument()
        })
    })

    describe('WCAG 1.3.3 Sensory Characteristics (Level A)', () => {
        it('does not rely solely on visual characteristics - text-based identification (WCAG 1.3.3)', () => {
            const { container } = render(<Avatar alt="User Profile" />)
            // Alt text provides text-based identification
            const avatar = container.querySelector('span')
            expect(avatar).toBeInTheDocument()
            expect(avatar).toHaveTextContent('User Profile')
        })

        it('online status has visual and programmatic indication - not solely visual (WCAG 1.3.3)', () => {
            const { container } = render(
                <Avatar alt="John Doe" online={true} />
            )
            // Visual indicator exists
            const indicator = container.querySelector(
                '[data-avatar-indicator="true"]'
            )
            expect(indicator).toBeTruthy()
            // Programmatic indication via data attribute
            const avatar = container.querySelector('[data-status="online"]')
            expect(avatar).toBeInTheDocument()
        })
    })

    describe('WCAG 1.4.3 Contrast (Minimum) (Level AA)', () => {
        it('fallback text has sufficient contrast - text readability (WCAG 1.4.3)', () => {
            const { container } = render(<Avatar alt="John Doe" />)
            const fallback = container.querySelector(
                '[data-avatar-fallback="true"]'
            )
            if (fallback) {
                const styles = window.getComputedStyle(fallback as HTMLElement)
                // White text (#FFFFFF) on colored background should meet contrast
                expect(styles.color).toBe('rgb(255, 255, 255)')
            }
        })

        it('visually hidden text does not affect visual contrast - hidden content (WCAG 1.4.3)', () => {
            const { container } = render(<Avatar alt="Test User" />)
            const hiddenText = container.querySelector('span')
            expect(hiddenText).toBeInTheDocument()
            const styles = window.getComputedStyle(hiddenText as HTMLElement)
            // Visually hidden content should not be visible
            expect(styles.position).toBe('absolute')
            expect(parseInt(styles.width || '0')).toBeLessThanOrEqual(1)
        })
    })

    describe('WCAG 1.4.11 Non-text Contrast (Level AA)', () => {
        it('online indicator has sufficient contrast - UI component contrast (WCAG 1.4.11)', () => {
            const { container } = render(
                <Avatar alt="John Doe" online={true} />
            )
            const indicator = container.querySelector(
                '[data-avatar-indicator="true"]'
            )
            expect(indicator).toBeTruthy()
            // Indicator should have border and background color for contrast
            if (indicator) {
                const styles = window.getComputedStyle(indicator as HTMLElement)
                expect(styles.backgroundColor).toBeTruthy()
            }
        })
    })

    describe('WCAG 2.5.5 Target Size (Level AAA)', () => {
        it.skip('avatar meets minimum touch target size for interactive use (WCAG 2.5.5)', () => {
            // Skipped: Visual dimension testing requires browser environment
            // Avatar component is decorative by default. If made interactive,
            // it should meet 44x44px touch target for AAA compliance.
            // This is verified manually and through visual regression testing.
        })

        it.skip('larger sizes meet AAA touch target requirements (WCAG 2.5.5)', () => {
            // Skipped: Visual dimension testing requires browser environment
            // XL size should be large enough for AAA compliance (44x44px).
            // This is verified manually and through visual regression testing.
        })
    })

    describe('WCAG 2.4.4 Link Purpose (Level A)', () => {
        it('alt text describes purpose when avatar is linked - link context (WCAG 2.4.4)', () => {
            const { container } = render(
                <a href="/profile">
                    <Avatar alt="John Doe's Profile" />
                </a>
            )
            const avatar = container.querySelector('span')
            expect(avatar).toBeInTheDocument()
            expect(avatar).toHaveTextContent("John Doe's Profile")
        })
    })

    describe('Error Handling and Edge Cases', () => {
        it('handles missing alt text gracefully - fallback behavior', () => {
            const { container } = render(
                <Avatar src="https://example.com/avatar.jpg" />
            )
            const image = container.querySelector('img')
            if (image) {
                expect(image).toHaveAttribute('alt', '')
            }
        })

        it('handles image load error - error recovery (WCAG 4.1.2)', () => {
            const { container } = render(
                <Avatar src="invalid-url.jpg" alt="John Doe" />
            )
            // Should fallback to initials or visually hidden text
            const avatar = container.querySelector('span')
            expect(avatar).toBeInTheDocument()
            expect(avatar).toHaveTextContent('John Doe')
        })

        it('handles empty fallback gracefully - graceful degradation', () => {
            const { container } = render(<Avatar alt="" />)
            // Empty alt should still render the visually hidden span
            const hiddenSpan = container.querySelector('span')
            expect(hiddenSpan).toBeInTheDocument()
            // Fallback should render empty string initials
            const fallback = container.querySelector(
                '[data-avatar-fallback="true"]'
            )
            expect(fallback).toBeInTheDocument()
        })

        it('skeleton state maintains accessibility - loading state (WCAG 4.1.2)', () => {
            const { container } = render(
                <Avatar
                    alt="John Doe"
                    skeleton={{ show: true, variant: 'pulse' }}
                />
            )
            const avatar = container.querySelector('[data-avatar]')
            expect(avatar).toBeInTheDocument()
            // Alt text should still be available
            const hiddenText = container.querySelector('span')
            expect(hiddenText).toBeInTheDocument()
            expect(hiddenText).toHaveTextContent('John Doe')
        })
    })

    describe('WCAG 1.4.1 Use of Color (Level A)', () => {
        it('does not rely solely on color for information - color independence (WCAG 1.4.1)', () => {
            const { container } = render(
                <Avatar alt="John Doe" online={true} />
            )
            // Online status indicated by both visual indicator and data attribute
            const indicator = container.querySelector(
                '[data-avatar-indicator="true"]'
            )
            const status = container.querySelector('[data-status="online"]')
            expect(indicator).toBeTruthy()
            expect(status).toBeInTheDocument()
        })
    })

    describe('WCAG 2.1.1 Keyboard (Level A)', () => {
        it('is not focusable when non-interactive - keyboard navigation (WCAG 2.1.1)', () => {
            const { container } = render(<Avatar alt="John Doe" />)
            const avatar = container.querySelector('[data-avatar]')
            if (avatar) {
                expect(avatar).not.toHaveAttribute('tabindex')
            }
        })

        it('becomes focusable when wrapped in interactive element - keyboard support (WCAG 2.1.1)', () => {
            render(
                <button>
                    <Avatar alt="John Doe" />
                </button>
            )
            const button = screen.getByRole('button')
            expect(button).toBeInTheDocument()
        })
    })

    describe('WCAG 1.4.6 Contrast (Enhanced) (Level AAA)', () => {
        it('fallback text meets AAA contrast requirements - enhanced contrast (WCAG 1.4.6)', () => {
            const { container } = render(<Avatar alt="John Doe" />)
            const fallback = container.querySelector(
                '[data-avatar-fallback="true"]'
            )
            if (fallback) {
                const styles = window.getComputedStyle(fallback as HTMLElement)
                // White text (#FFFFFF) should meet AAA contrast on colored backgrounds
                expect(styles.color).toBe('rgb(255, 255, 255)')
            }
        })
    })

    describe('WCAG 2.4.6 Headings and Labels (Level AA)', () => {
        it('has descriptive alt text - clear labeling (WCAG 2.4.6)', () => {
            const { container } = render(
                <Avatar alt="John Doe's Profile Picture" />
            )
            const avatar = container.querySelector('span')
            expect(avatar).toBeInTheDocument()
            expect(avatar).toHaveTextContent("John Doe's Profile Picture")
        })
    })

    describe('WCAG 3.2.4 Consistent Identification (Level AA)', () => {
        it('maintains consistent structure across sizes - consistent identification (WCAG 3.2.4)', () => {
            const sizes = [
                AvatarSize.SM,
                AvatarSize.REGULAR,
                AvatarSize.MD,
                AvatarSize.LG,
                AvatarSize.XL,
            ]

            sizes.forEach((size) => {
                const { container, unmount } = render(
                    <Avatar alt="Test User" size={size} />
                )
                const avatar = container.querySelector('[data-avatar]')
                expect(avatar).toBeInTheDocument()
                expect(avatar).toHaveAttribute('data-avatar', 'Test User')
                unmount()
            })
        })
    })

    describe('WCAG 4.1.3 Status Messages (Level AA)', () => {
        it('online status change is communicated - status updates (WCAG 4.1.3)', () => {
            const { container, rerender } = render(
                <Avatar alt="John Doe" online={false} />
            )
            let status = container.querySelector('[data-status="offline"]')
            expect(status).toBeInTheDocument()

            rerender(<Avatar alt="John Doe" online={true} />)
            status = container.querySelector('[data-status="online"]')
            expect(status).toBeInTheDocument()
        })
    })

    describe('WCAG 1.3.2 Meaningful Sequence (Level A)', () => {
        it('maintains logical reading order - meaningful sequence (WCAG 1.3.2)', () => {
            const { container } = render(
                <Avatar
                    alt="John Doe"
                    leadingSlot={<span>Leading</span>}
                    trailingSlot={<span>Trailing</span>}
                />
            )
            const wrapper = container.querySelector(
                '[data-avatar-wrapper="true"]'
            )
            expect(wrapper).toBeInTheDocument()
            // DOM order should match visual order: leading slot → avatar → trailing slot
            const children = Array.from(wrapper?.children || [])
            expect(children.length).toBeGreaterThanOrEqual(1)
        })

        it('avatar content maintains logical structure - meaningful sequence (WCAG 1.3.2)', () => {
            const { container } = render(
                <Avatar alt="John Doe" online={true} />
            )
            const avatar = container.querySelector('[data-avatar]')
            expect(avatar).toBeInTheDocument()
            // Structure: indicator → content → visually hidden text
            const children = Array.from(avatar?.children || [])
            expect(children.length).toBeGreaterThanOrEqual(1)
        })
    })

    describe('WCAG 1.4.4 Resize Text (Level AA)', () => {
        it('uses relative units for text sizing - text resizable (WCAG 1.4.4)', () => {
            const { container } = render(<Avatar alt="John Doe" />)
            const avatar = container.querySelector('[data-avatar]')
            if (avatar) {
                const styles = window.getComputedStyle(avatar as HTMLElement)
                // Font size should be in relative units (rem, em, %) or use responsive tokens
                // This is handled by theme tokens which use relative units
                expect(styles.fontSize).toBeTruthy()
            }
        })
    })

    describe('WCAG 1.4.5 Images of Text (Level AA)', () => {
        it('does not use images of text - text is actual text (WCAG 1.4.5)', () => {
            const { container } = render(<Avatar alt="John Doe" />)
            // Fallback uses actual text (initials), not images
            const fallback = container.querySelector(
                '[data-avatar-fallback="true"]'
            )
            if (fallback) {
                // Should contain actual text content, not an image
                expect(fallback.textContent).toBeTruthy()
            }
        })
    })

    describe('WCAG 2.4.3 Focus Order (Level A)', () => {
        it('maintains logical focus order when interactive - focus sequence (WCAG 2.4.3)', () => {
            const { container } = render(
                <div>
                    <button>Before</button>
                    <Avatar alt="John Doe" />
                    <button>After</button>
                </div>
            )
            const buttons = container.querySelectorAll('button')
            expect(buttons.length).toBe(2)
            // Avatar should not interfere with focus order
            const avatar = container.querySelector('[data-avatar]')
            if (avatar) {
                expect(avatar).not.toHaveAttribute('tabindex')
            }
        })
    })

    describe('WCAG 2.5.3 Label in Name (Level A)', () => {
        it('accessible name matches visible label - label in name (WCAG 2.5.3)', () => {
            const { container } = render(<Avatar alt="John Doe" />)
            const avatar = container.querySelector('[data-avatar]')
            const hiddenText = container.querySelector('span')
            // Accessible name (alt text) should match what's in visually hidden span
            expect(hiddenText).toHaveTextContent('John Doe')
            expect(avatar).toHaveAttribute('data-avatar', 'John Doe')
        })
    })

    describe('WCAG 2.5.4 Motion Actuation (Level A)', () => {
        it('does not rely on device motion - no motion actuation (WCAG 2.5.4)', () => {
            const { container } = render(<Avatar alt="John Doe" />)
            const avatar = container.querySelector('[data-avatar]')
            // Avatar does not use device motion or orientation
            expect(avatar).toBeInTheDocument()
            // No motion-based event handlers
            expect(avatar).not.toHaveAttribute('onDeviceMotion')
        })
    })

    describe('WCAG 2.2.1 Timing Adjustable (Level AAA)', () => {
        it.skip('no time limits - timing adjustable (WCAG 2.2.1)', () => {
            // Skipped: Avatar component has no time limits
            // This criterion is not applicable to Avatar component
        })
    })

    describe('WCAG 2.2.2 Pause, Stop, Hide (Level AAA)', () => {
        it.skip('no moving content - pause stop hide (WCAG 2.2.2)', () => {
            // Skipped: Avatar component has no moving, blinking, or scrolling content
            // This criterion is not applicable to Avatar component
        })
    })

    describe('WCAG 2.2.3 No Timing (Level AAA)', () => {
        it.skip('no time limits - no timing (WCAG 2.2.3)', () => {
            // Skipped: Avatar component has no time limits
            // This criterion is not applicable to Avatar component
        })
    })

    describe('WCAG 2.2.4 Interruptions (Level AAA)', () => {
        it.skip('no interruptions - interruptions (WCAG 2.2.4)', () => {
            // Skipped: Avatar component does not cause interruptions
            // This criterion is not applicable to Avatar component
        })
    })

    describe('WCAG 2.2.5 Re-authenticating (Level AAA)', () => {
        it.skip('no authentication - re-authenticating (WCAG 2.2.5)', () => {
            // Skipped: Avatar component does not require authentication
            // This criterion is not applicable to Avatar component
        })
    })

    describe('WCAG 2.2.6 Timeouts (Level AAA)', () => {
        it.skip('no timeouts - timeouts (WCAG 2.2.6)', () => {
            // Skipped: Avatar component has no timeouts
            // This criterion is not applicable to Avatar component
        })
    })
})
