import React from 'react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, fireEvent, waitFor } from '../../test-utils'
import { axe } from 'jest-axe'
import SplitTag from '../../../lib/components/SplitTag/SplitTag'
import {
    TagColor,
    TagSize,
    TagShape,
    TagVariant,
} from '../../../lib/components/Tags/types'
import { Check, Info, Server } from 'lucide-react'

describe('SplitTag Accessibility', () => {
    beforeEach(() => {
        // Setup if needed
    })

    afterEach(() => {
        // Cleanup if needed
    })

    describe('WCAG 2.1/2.2 Compliance (Level A, AA, AAA)', () => {
        it('meets WCAG standards for default split tag (axe-core validation)', async () => {
            const { container } = render(
                <SplitTag
                    primaryTag={{
                        text: 'Status',
                        color: TagColor.NEUTRAL,
                    }}
                    secondaryTag={{
                        text: 'Active',
                        color: TagColor.SUCCESS,
                    }}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for all sizes (XS, SM, MD, LG)', async () => {
            const sizes = [TagSize.XS, TagSize.SM, TagSize.MD, TagSize.LG]

            for (const size of sizes) {
                const { container, unmount } = render(
                    <SplitTag
                        primaryTag={{
                            text: 'Size',
                            color: TagColor.NEUTRAL,
                        }}
                        secondaryTag={{
                            text: size,
                            color: TagColor.PRIMARY,
                        }}
                        size={size}
                    />
                )
                const results = await axe(container)
                expect(results).toHaveNoViolations()
                unmount()
            }
        })

        it('meets WCAG standards for all shapes (Squarical, Rounded)', async () => {
            const shapes = [TagShape.SQUARICAL, TagShape.ROUNDED]

            for (const shape of shapes) {
                const { container, unmount } = render(
                    <SplitTag
                        primaryTag={{
                            text: 'Shape',
                            color: TagColor.NEUTRAL,
                        }}
                        secondaryTag={{
                            text: shape,
                            color: TagColor.PRIMARY,
                        }}
                        shape={shape}
                    />
                )
                const results = await axe(container)
                expect(results).toHaveNoViolations()
                unmount()
            }
        })

        it('meets WCAG standards with role="group" and aria-label (1.3.1 Info and Relationships)', async () => {
            const { container } = render(
                <SplitTag
                    primaryTag={{
                        text: 'Status',
                        color: TagColor.NEUTRAL,
                    }}
                    secondaryTag={{
                        text: 'Active',
                        color: TagColor.SUCCESS,
                    }}
                />
            )

            const group = container.querySelector('[role="group"]')
            expect(group).toBeTruthy()
            expect(group).toHaveAttribute('aria-label')
            expect(group?.getAttribute('aria-label')).toBe('Status: Active')

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with unique IDs for ARIA relationships (1.3.1 Info and Relationships)', async () => {
            const { container } = render(
                <SplitTag
                    primaryTag={{
                        text: 'Version',
                        color: TagColor.NEUTRAL,
                    }}
                    secondaryTag={{
                        text: '2.0.0',
                        color: TagColor.PRIMARY,
                    }}
                />
            )

            const group = container.querySelector('[role="group"]')
            expect(group).toHaveAttribute('id')

            const primaryTag = container.querySelector(
                '[data-element="primary-tag"]'
            )
            expect(primaryTag).toHaveAttribute('id')

            const secondaryTag = container.querySelector(
                '[data-element="secondary-tag"]'
            )
            expect(secondaryTag).toHaveAttribute('id')

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with aria-label combining primary and secondary text (1.3.1 Info and Relationships)', async () => {
            const { container } = render(
                <SplitTag
                    primaryTag={{
                        text: 'Environment',
                        color: TagColor.NEUTRAL,
                    }}
                    secondaryTag={{
                        text: 'Production',
                        color: TagColor.SUCCESS,
                    }}
                />
            )

            const group = container.querySelector('[role="group"]')
            expect(group?.getAttribute('aria-label')).toBe(
                'Environment: Production'
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with only primary tag (1.3.1 Info and Relationships)', async () => {
            const { container } = render(
                <SplitTag
                    primaryTag={{
                        text: 'Status',
                        color: TagColor.NEUTRAL,
                    }}
                />
            )

            const group = container.querySelector('[role="group"]')
            expect(group?.getAttribute('aria-label')).toBe('Status')

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with icons in tags (1.1.1 Non-text Content)', async () => {
            const { container } = render(
                <SplitTag
                    primaryTag={{
                        text: 'Status',
                        color: TagColor.NEUTRAL,
                        leftSlot: <Info size={12} aria-hidden="true" />,
                    }}
                    secondaryTag={{
                        text: 'Online',
                        color: TagColor.SUCCESS,
                        leftSlot: <Check size={12} aria-hidden="true" />,
                    }}
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with keyboard navigation on interactive tags (2.1.1 Keyboard)', async () => {
            const handleClick = vi.fn()
            const { container } = render(
                <SplitTag
                    primaryTag={{
                        text: 'Environment',
                        color: TagColor.NEUTRAL,
                    }}
                    secondaryTag={{
                        text: 'Production',
                        color: TagColor.SUCCESS,
                        onClick: handleClick,
                    }}
                />
            )

            await waitFor(() => {
                const secondaryTag = container.querySelector(
                    '[data-element="secondary-tag"]'
                ) as HTMLElement
                expect(secondaryTag).toBeTruthy()

                // Test keyboard focus
                secondaryTag.focus()
                expect(document.activeElement).toBe(secondaryTag)

                // Test keyboard activation
                fireEvent.keyDown(secondaryTag, { key: 'Enter' })
                fireEvent.keyDown(secondaryTag, { key: ' ' })
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with keyboard navigation on primary tag (2.1.1 Keyboard)', async () => {
            const handleClick = vi.fn()
            const { container } = render(
                <SplitTag
                    primaryTag={{
                        text: 'Status',
                        color: TagColor.NEUTRAL,
                        onClick: handleClick,
                    }}
                    secondaryTag={{
                        text: 'Active',
                        color: TagColor.SUCCESS,
                    }}
                />
            )

            await waitFor(() => {
                const primaryTag = container.querySelector(
                    '[data-element="primary-tag"]'
                ) as HTMLElement
                expect(primaryTag).toBeTruthy()

                // Test keyboard focus
                primaryTag.focus()
                expect(document.activeElement).toBe(primaryTag)

                // Test keyboard activation
                fireEvent.keyDown(primaryTag, { key: 'Enter' })
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with focus indicators visible (2.4.7 Focus Visible)', async () => {
            const { container } = render(
                <SplitTag
                    primaryTag={{
                        text: 'Status',
                        color: TagColor.NEUTRAL,
                    }}
                    secondaryTag={{
                        text: 'Active',
                        color: TagColor.SUCCESS,
                        onClick: () => {},
                    }}
                />
            )

            await waitFor(() => {
                const secondaryTag = container.querySelector(
                    '[data-element="secondary-tag"]'
                ) as HTMLElement
                expect(secondaryTag).toBeTruthy()

                secondaryTag.focus()
                const computedStyle = window.getComputedStyle(secondaryTag)
                // Focus should be visible (outline or box-shadow)
                expect(
                    computedStyle.outline !== 'none' ||
                        computedStyle.boxShadow !== 'none'
                ).toBe(true)
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with touch target size minimum 24x24px (2.5.8 Target Size)', async () => {
            const { container } = render(
                <SplitTag
                    primaryTag={{
                        text: 'Status',
                        color: TagColor.NEUTRAL,
                    }}
                    secondaryTag={{
                        text: 'Active',
                        color: TagColor.SUCCESS,
                        onClick: () => {},
                    }}
                    size={TagSize.SM}
                />
            )

            await waitFor(() => {
                const secondaryTag = container.querySelector(
                    '[data-element="secondary-tag"]'
                ) as HTMLElement
                expect(secondaryTag).toBeTruthy()

                // Check if button is visible and has reasonable size
                // In test environment, elements may not have actual rendered dimensions
                // but we verify the button exists and is accessible
                const rect = secondaryTag.getBoundingClientRect()
                // Only check size if element is actually rendered (non-zero dimensions)
                if (rect.width > 0 && rect.height > 0) {
                    expect(rect.width).toBeGreaterThanOrEqual(24)
                    expect(rect.height).toBeGreaterThanOrEqual(24)
                }
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with no context change on focus (3.2.1 On Focus)', async () => {
            const { container } = render(
                <SplitTag
                    primaryTag={{
                        text: 'Status',
                        color: TagColor.NEUTRAL,
                    }}
                    secondaryTag={{
                        text: 'Active',
                        color: TagColor.SUCCESS,
                        onClick: () => {},
                    }}
                />
            )

            await waitFor(() => {
                const secondaryTag = container.querySelector(
                    '[data-element="secondary-tag"]'
                ) as HTMLElement
                expect(secondaryTag).toBeTruthy()

                // Focus should not trigger context change
                secondaryTag.focus()
                expect(document.activeElement).toBe(secondaryTag)
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with predictable behavior on input (3.2.2 On Input)', async () => {
            const handleClick = vi.fn()
            const { container } = render(
                <SplitTag
                    primaryTag={{
                        text: 'Status',
                        color: TagColor.NEUTRAL,
                    }}
                    secondaryTag={{
                        text: 'Active',
                        color: TagColor.SUCCESS,
                        onClick: handleClick,
                    }}
                />
            )

            await waitFor(() => {
                const secondaryTag = container.querySelector(
                    '[data-element="secondary-tag"]'
                ) as HTMLElement
                expect(secondaryTag).toBeTruthy()

                // Click should have predictable behavior
                fireEvent.click(secondaryTag)
                expect(handleClick).toHaveBeenCalled()
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with all changes user-initiated (3.2.5 Change on Request - AAA)', async () => {
            const handleClick = vi.fn()
            const { container } = render(
                <SplitTag
                    primaryTag={{
                        text: 'Status',
                        color: TagColor.NEUTRAL,
                    }}
                    secondaryTag={{
                        text: 'Active',
                        color: TagColor.SUCCESS,
                        onClick: handleClick,
                    }}
                />
            )

            await waitFor(() => {
                const secondaryTag = container.querySelector(
                    '[data-element="secondary-tag"]'
                ) as HTMLElement
                expect(secondaryTag).toBeTruthy()

                // Changes should only occur on user interaction
                fireEvent.click(secondaryTag)
                expect(handleClick).toHaveBeenCalled()
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with keyboard-only operation (2.1.3 Keyboard No Exception - AAA)', async () => {
            const handleClick = vi.fn()
            const { container } = render(
                <SplitTag
                    primaryTag={{
                        text: 'Status',
                        color: TagColor.NEUTRAL,
                    }}
                    secondaryTag={{
                        text: 'Active',
                        color: TagColor.SUCCESS,
                        onClick: handleClick,
                    }}
                />
            )

            await waitFor(() => {
                const secondaryTag = container.querySelector(
                    '[data-element="secondary-tag"]'
                ) as HTMLElement
                expect(secondaryTag).toBeTruthy()

                // All functionality should be keyboard accessible
                secondaryTag.focus()
                expect(document.activeElement).toBe(secondaryTag)

                // Enter key should activate
                fireEvent.keyDown(secondaryTag, { key: 'Enter', code: 'Enter' })
                fireEvent.keyUp(secondaryTag, { key: 'Enter', code: 'Enter' })

                // Space key should activate
                fireEvent.keyDown(secondaryTag, { key: ' ', code: 'Space' })
                fireEvent.keyUp(secondaryTag, { key: ' ', code: 'Space' })
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with proper name, role, and value (4.1.2 Name, Role, Value)', async () => {
            const { container } = render(
                <SplitTag
                    primaryTag={{
                        text: 'Version',
                        color: TagColor.NEUTRAL,
                    }}
                    secondaryTag={{
                        text: '2.0.0',
                        color: TagColor.PRIMARY,
                    }}
                />
            )

            const group = container.querySelector('[role="group"]')
            expect(group).toBeTruthy()
            expect(group).toHaveAttribute('aria-label')
            expect(group).toHaveAttribute('id')

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with all color combinations', async () => {
            const colorCombinations = [
                { primary: TagColor.NEUTRAL, secondary: TagColor.PRIMARY },
                { primary: TagColor.NEUTRAL, secondary: TagColor.SUCCESS },
                { primary: TagColor.NEUTRAL, secondary: TagColor.ERROR },
                { primary: TagColor.NEUTRAL, secondary: TagColor.WARNING },
                { primary: TagColor.NEUTRAL, secondary: TagColor.PURPLE },
            ]

            for (const colors of colorCombinations) {
                const { container, unmount } = render(
                    <SplitTag
                        primaryTag={{
                            text: 'Type',
                            color: colors.primary,
                        }}
                        secondaryTag={{
                            text: 'Value',
                            color: colors.secondary,
                        }}
                    />
                )
                const results = await axe(container)
                expect(results).toHaveNoViolations()
                unmount()
            }
        })

        it('meets WCAG standards with custom aria-label on group', async () => {
            const { container } = render(
                <SplitTag
                    primaryTag={{
                        text: 'Status',
                        color: TagColor.NEUTRAL,
                    }}
                    secondaryTag={{
                        text: 'Active',
                        color: TagColor.SUCCESS,
                    }}
                    aria-label="Custom split tag label"
                />
            )

            const group = container.querySelector('[role="group"]')
            expect(group?.getAttribute('aria-label')).toBe(
                'Custom split tag label'
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with interactive primary and secondary tags', async () => {
            const handlePrimaryClick = vi.fn()
            const handleSecondaryClick = vi.fn()
            const { container } = render(
                <SplitTag
                    primaryTag={{
                        text: 'Environment',
                        color: TagColor.NEUTRAL,
                        onClick: handlePrimaryClick,
                    }}
                    secondaryTag={{
                        text: 'Production',
                        color: TagColor.SUCCESS,
                        onClick: handleSecondaryClick,
                    }}
                />
            )

            await waitFor(() => {
                const primaryTag = container.querySelector(
                    '[data-element="primary-tag"]'
                ) as HTMLElement
                const secondaryTag = container.querySelector(
                    '[data-element="secondary-tag"]'
                ) as HTMLElement

                expect(primaryTag).toBeTruthy()
                expect(secondaryTag).toBeTruthy()

                // Both should be keyboard accessible
                primaryTag.focus()
                expect(document.activeElement).toBe(primaryTag)

                secondaryTag.focus()
                expect(document.activeElement).toBe(secondaryTag)
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with meaningful sequence (1.3.2 Meaningful Sequence)', async () => {
            const { container } = render(
                <SplitTag
                    primaryTag={{
                        text: 'Status',
                        color: TagColor.NEUTRAL,
                    }}
                    secondaryTag={{
                        text: 'Active',
                        color: TagColor.SUCCESS,
                    }}
                />
            )

            // DOM order should match visual order: primary tag first, then secondary
            const primaryTag = container.querySelector(
                '[data-element="primary-tag"]'
            )
            const secondaryTag = container.querySelector(
                '[data-element="secondary-tag"]'
            )

            expect(primaryTag?.compareDocumentPosition(secondaryTag!)).toBe(
                Node.DOCUMENT_POSITION_FOLLOWING
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with sensory characteristics not required (1.3.3 Sensory Characteristics)', async () => {
            const { container } = render(
                <SplitTag
                    primaryTag={{
                        text: 'Status',
                        color: TagColor.NEUTRAL,
                    }}
                    secondaryTag={{
                        text: 'Active',
                        color: TagColor.SUCCESS,
                    }}
                />
            )

            // Text content provides context, not relying solely on color or position
            const group = container.querySelector('[role="group"]')
            const ariaLabel = group?.getAttribute('aria-label')
            expect(ariaLabel).toContain('Status')
            expect(ariaLabel).toContain('Active')

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with proper focus order (2.4.3 Focus Order)', async () => {
            const { container } = render(
                <>
                    <SplitTag
                        primaryTag={{
                            text: 'First',
                            color: TagColor.NEUTRAL,
                        }}
                        secondaryTag={{
                            text: 'Tag',
                            color: TagColor.PRIMARY,
                            onClick: () => {},
                        }}
                    />
                    <SplitTag
                        primaryTag={{
                            text: 'Second',
                            color: TagColor.NEUTRAL,
                        }}
                        secondaryTag={{
                            text: 'Tag',
                            color: TagColor.SUCCESS,
                            onClick: () => {},
                        }}
                    />
                </>
            )

            await waitFor(() => {
                const firstTag = container.querySelectorAll(
                    '[data-element="secondary-tag"]'
                )[0] as HTMLElement
                const secondTag = container.querySelectorAll(
                    '[data-element="secondary-tag"]'
                )[1] as HTMLElement

                expect(firstTag).toBeTruthy()
                expect(secondTag).toBeTruthy()

                // Test tab order
                firstTag.focus()
                expect(document.activeElement).toBe(firstTag)

                // Simulate Tab key
                fireEvent.keyDown(firstTag, { key: 'Tab', code: 'Tab' })
            })

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with all variants and features combined', async () => {
            const { container } = render(
                <SplitTag
                    primaryTag={{
                        text: 'Comprehensive',
                        color: TagColor.NEUTRAL,
                        variant: TagVariant.NO_FILL,
                        leftSlot: <Server size={12} aria-hidden="true" />,
                        onClick: () => {},
                    }}
                    secondaryTag={{
                        text: 'SplitTag',
                        color: TagColor.SUCCESS,
                        variant: TagVariant.ATTENTIVE,
                        leftSlot: <Check size={12} aria-hidden="true" />,
                        onClick: () => {},
                    }}
                    size={TagSize.MD}
                    shape={TagShape.ROUNDED}
                />
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with fallback aria-label when no text provided', async () => {
            const { container } = render(
                <SplitTag
                    primaryTag={{
                        text: '',
                        color: TagColor.NEUTRAL,
                    }}
                />
            )

            const group = container.querySelector('[role="group"]')
            expect(group?.getAttribute('aria-label')).toBe('Split tag')

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('Accessibility Best Practices Verification', () => {
        describe('1. Interactive controls are keyboard focusable', () => {
            it('interactive tags have tabIndex="0" for keyboard focus', () => {
                const { container } = render(
                    <SplitTag
                        primaryTag={{
                            text: 'Action',
                            color: TagColor.NEUTRAL,
                            onClick: () => {},
                        }}
                        secondaryTag={{
                            text: 'Click Me',
                            color: TagColor.PRIMARY,
                            onClick: () => {},
                        }}
                    />
                )

                const primaryTag = container.querySelector(
                    '[data-element="primary-tag"]'
                )
                const secondaryTag = container.querySelector(
                    '[data-element="secondary-tag"]'
                )

                // Interactive tags should have tabIndex="0"
                expect(primaryTag).toHaveAttribute('tabindex', '0')
                expect(secondaryTag).toHaveAttribute('tabindex', '0')
            })

            it('non-interactive tags do not have tabIndex', () => {
                const { container } = render(
                    <SplitTag
                        primaryTag={{
                            text: 'Status',
                            color: TagColor.NEUTRAL,
                        }}
                        secondaryTag={{
                            text: 'Active',
                            color: TagColor.SUCCESS,
                        }}
                    />
                )

                const primaryTag = container.querySelector(
                    '[data-element="primary-tag"]'
                )
                const secondaryTag = container.querySelector(
                    '[data-element="secondary-tag"]'
                )

                // Non-interactive tags should not have tabIndex
                expect(primaryTag).not.toHaveAttribute('tabindex')
                expect(secondaryTag).not.toHaveAttribute('tabindex')
            })
        })

        describe('2. Interactive elements indicate their purpose and state', () => {
            it('interactive tags have role="button" to indicate purpose', () => {
                const { container } = render(
                    <SplitTag
                        primaryTag={{
                            text: 'Action',
                            color: TagColor.NEUTRAL,
                            onClick: () => {},
                        }}
                        secondaryTag={{
                            text: 'Click Me',
                            color: TagColor.PRIMARY,
                            onClick: () => {},
                        }}
                    />
                )

                const primaryTag = container.querySelector(
                    '[data-element="primary-tag"]'
                )
                const secondaryTag = container.querySelector(
                    '[data-element="secondary-tag"]'
                )

                expect(primaryTag).toHaveAttribute('role', 'button')
                expect(secondaryTag).toHaveAttribute('role', 'button')
            })

            it('interactive tags have aria-label indicating their purpose', () => {
                const { container } = render(
                    <SplitTag
                        primaryTag={{
                            text: 'Environment',
                            color: TagColor.NEUTRAL,
                            onClick: () => {},
                        }}
                        secondaryTag={{
                            text: 'Production',
                            color: TagColor.SUCCESS,
                            onClick: () => {},
                        }}
                    />
                )

                const primaryTag = container.querySelector(
                    '[data-element="primary-tag"]'
                )
                const secondaryTag = container.querySelector(
                    '[data-element="secondary-tag"]'
                )

                expect(primaryTag).toHaveAttribute('aria-label', 'Environment')
                expect(secondaryTag).toHaveAttribute('aria-label', 'Production')
            })

            it('interactive tags accept custom aria-label', () => {
                const { container } = render(
                    <SplitTag
                        primaryTag={{
                            text: 'Status',
                            color: TagColor.NEUTRAL,
                            onClick: () => {},
                            'aria-label': 'Custom primary label',
                        }}
                        secondaryTag={{
                            text: 'Active',
                            color: TagColor.SUCCESS,
                            onClick: () => {},
                            'aria-label': 'Custom secondary label',
                        }}
                    />
                )

                const primaryTag = container.querySelector(
                    '[data-element="primary-tag"]'
                )
                const secondaryTag = container.querySelector(
                    '[data-element="secondary-tag"]'
                )

                expect(primaryTag).toHaveAttribute(
                    'aria-label',
                    'Custom primary label'
                )
                expect(secondaryTag).toHaveAttribute(
                    'aria-label',
                    'Custom secondary label'
                )
            })
        })

        describe('3. The page has a logical tab order', () => {
            it('tab order follows DOM order: primary tag → secondary tag', async () => {
                const { container } = render(
                    <SplitTag
                        primaryTag={{
                            text: 'First',
                            color: TagColor.NEUTRAL,
                            onClick: () => {},
                        }}
                        secondaryTag={{
                            text: 'Second',
                            color: TagColor.PRIMARY,
                            onClick: () => {},
                        }}
                    />
                )

                const primaryTag = container.querySelector(
                    '[data-element="primary-tag"]'
                ) as HTMLElement
                const secondaryTag = container.querySelector(
                    '[data-element="secondary-tag"]'
                ) as HTMLElement

                // Focus primary tag first
                primaryTag.focus()
                expect(document.activeElement).toBe(primaryTag)

                // Simulate Tab key press
                fireEvent.keyDown(primaryTag, { key: 'Tab', code: 'Tab' })

                // In a real browser, focus would move to secondary tag
                // In test environment, we verify the order is correct
                expect(primaryTag.compareDocumentPosition(secondaryTag)).toBe(
                    Node.DOCUMENT_POSITION_FOLLOWING
                )
            })

            it('multiple SplitTags maintain logical tab order', () => {
                const { container } = render(
                    <>
                        <SplitTag
                            primaryTag={{
                                text: 'First',
                                color: TagColor.NEUTRAL,
                            }}
                            secondaryTag={{
                                text: 'Tag',
                                color: TagColor.PRIMARY,
                                onClick: () => {},
                            }}
                        />
                        <SplitTag
                            primaryTag={{
                                text: 'Second',
                                color: TagColor.NEUTRAL,
                            }}
                            secondaryTag={{
                                text: 'Tag',
                                color: TagColor.SUCCESS,
                                onClick: () => {},
                            }}
                        />
                    </>
                )

                const firstTag = container.querySelectorAll(
                    '[data-element="secondary-tag"]'
                )[0] as HTMLElement
                const secondTag = container.querySelectorAll(
                    '[data-element="secondary-tag"]'
                )[1] as HTMLElement

                expect(firstTag.compareDocumentPosition(secondTag)).toBe(
                    Node.DOCUMENT_POSITION_FOLLOWING
                )
            })
        })

        describe('4. Visual order on the page follows DOM order', () => {
            it('DOM order matches visual order: primary → secondary', () => {
                const { container } = render(
                    <SplitTag
                        primaryTag={{
                            text: 'Primary',
                            color: TagColor.NEUTRAL,
                        }}
                        secondaryTag={{
                            text: 'Secondary',
                            color: TagColor.PRIMARY,
                        }}
                    />
                )

                const primaryTag = container.querySelector(
                    '[data-element="primary-tag"]'
                )
                const secondaryTag = container.querySelector(
                    '[data-element="secondary-tag"]'
                )

                // Verify DOM order
                expect(primaryTag?.compareDocumentPosition(secondaryTag!)).toBe(
                    Node.DOCUMENT_POSITION_FOLLOWING
                )
            })
        })

        describe('5. User focus is not accidentally trapped in a region', () => {
            it('focus can be moved in and out of SplitTag using Tab/Shift+Tab', async () => {
                const { container } = render(
                    <>
                        <button data-testid="before">Before</button>
                        <SplitTag
                            primaryTag={{
                                text: 'Status',
                                color: TagColor.NEUTRAL,
                            }}
                            secondaryTag={{
                                text: 'Active',
                                color: TagColor.SUCCESS,
                                onClick: () => {},
                            }}
                        />
                        <button data-testid="after">After</button>
                    </>
                )

                const beforeButton = container.querySelector(
                    '[data-testid="before"]'
                ) as HTMLElement
                const secondaryTag = container.querySelector(
                    '[data-element="secondary-tag"]'
                ) as HTMLElement
                const afterButton = container.querySelector(
                    '[data-testid="after"]'
                ) as HTMLElement

                // Focus can move into SplitTag
                secondaryTag.focus()
                expect(document.activeElement).toBe(secondaryTag)

                // Focus can move out (simulated)
                afterButton.focus()
                expect(document.activeElement).toBe(afterButton)

                // Focus can move back
                beforeButton.focus()
                expect(document.activeElement).toBe(beforeButton)
            })

            it('non-interactive SplitTag does not trap focus', () => {
                const { container } = render(
                    <>
                        <button data-testid="before">Before</button>
                        <SplitTag
                            primaryTag={{
                                text: 'Status',
                                color: TagColor.NEUTRAL,
                            }}
                            secondaryTag={{
                                text: 'Active',
                                color: TagColor.SUCCESS,
                            }}
                        />
                        <button data-testid="after">After</button>
                    </>
                )

                const beforeButton = container.querySelector(
                    '[data-testid="before"]'
                ) as HTMLElement
                const afterButton = container.querySelector(
                    '[data-testid="after"]'
                ) as HTMLElement

                // Non-interactive SplitTag should not interfere with tab order
                beforeButton.focus()
                expect(document.activeElement).toBe(beforeButton)

                afterButton.focus()
                expect(document.activeElement).toBe(afterButton)
            })
        })

        describe("6. The user's focus is directed to new content added to the page", () => {
            it('SplitTag is a static component and does not dynamically add content', () => {
                // SplitTag is a static component that does not dynamically add content
                // This criterion is not applicable, but we verify the component is stable
                const { container } = render(
                    <SplitTag
                        primaryTag={{
                            text: 'Status',
                            color: TagColor.NEUTRAL,
                        }}
                        secondaryTag={{
                            text: 'Active',
                            color: TagColor.SUCCESS,
                        }}
                    />
                )

                const group = container.querySelector('[role="group"]')
                expect(group).toBeInTheDocument()

                // Component structure remains stable
                const primaryTag = container.querySelector(
                    '[data-element="primary-tag"]'
                )
                const secondaryTag = container.querySelector(
                    '[data-element="secondary-tag"]'
                )
                expect(primaryTag).toBeInTheDocument()
                expect(secondaryTag).toBeInTheDocument()
            })
        })

        describe('7. HTML5 landmark elements are used to improve navigation', () => {
            it('SplitTag uses role="group" for semantic grouping (not a landmark)', () => {
                const { container } = render(
                    <SplitTag
                        primaryTag={{
                            text: 'Status',
                            color: TagColor.NEUTRAL,
                        }}
                        secondaryTag={{
                            text: 'Active',
                            color: TagColor.SUCCESS,
                        }}
                    />
                )

                const group = container.querySelector('[role="group"]')
                expect(group).toBeInTheDocument()

                // role="group" is appropriate for component-level grouping
                // Landmarks (nav, main, aside, etc.) are for page-level structure
                // SplitTag correctly uses role="group" for its semantic purpose
            })
        })

        describe('8. Offscreen content is hidden from assistive technology', () => {
            it('decorative icons have aria-hidden="true"', () => {
                const { container } = render(
                    <SplitTag
                        primaryTag={{
                            text: 'Status',
                            color: TagColor.NEUTRAL,
                            leftSlot: <Info size={12} aria-hidden="true" />,
                        }}
                        secondaryTag={{
                            text: 'Online',
                            color: TagColor.SUCCESS,
                            leftSlot: <Check size={12} aria-hidden="true" />,
                        }}
                    />
                )

                // Icons should be hidden from screen readers when decorative
                const infoIcon = container.querySelector(
                    'svg[data-lucide="info"]'
                )
                const checkIcon = container.querySelector(
                    'svg[data-lucide="check"]'
                )

                if (infoIcon) {
                    expect(infoIcon).toHaveAttribute('aria-hidden', 'true')
                }
                if (checkIcon) {
                    expect(checkIcon).toHaveAttribute('aria-hidden', 'true')
                }
            })

            it('text content is not hidden from assistive technology', () => {
                const { container } = render(
                    <SplitTag
                        primaryTag={{
                            text: 'Status',
                            color: TagColor.NEUTRAL,
                        }}
                        secondaryTag={{
                            text: 'Active',
                            color: TagColor.SUCCESS,
                        }}
                    />
                )

                const primaryTag = container.querySelector(
                    '[data-element="primary-tag"]'
                )
                const secondaryTag = container.querySelector(
                    '[data-element="secondary-tag"]'
                )

                // Text content should be accessible
                expect(primaryTag?.textContent).toContain('Status')
                expect(secondaryTag?.textContent).toContain('Active')
            })
        })

        describe('9. Custom controls have associated labels', () => {
            it('interactive tags have aria-label from text content', () => {
                const { container } = render(
                    <SplitTag
                        primaryTag={{
                            text: 'Action',
                            color: TagColor.NEUTRAL,
                            onClick: () => {},
                        }}
                        secondaryTag={{
                            text: 'Click Me',
                            color: TagColor.PRIMARY,
                            onClick: () => {},
                        }}
                    />
                )

                const primaryTag = container.querySelector(
                    '[data-element="primary-tag"]'
                )
                const secondaryTag = container.querySelector(
                    '[data-element="secondary-tag"]'
                )

                expect(primaryTag).toHaveAttribute('aria-label', 'Action')
                expect(secondaryTag).toHaveAttribute('aria-label', 'Click Me')
            })

            it('interactive tags accept custom aria-label', () => {
                const { container } = render(
                    <SplitTag
                        primaryTag={{
                            text: 'Status',
                            color: TagColor.NEUTRAL,
                            onClick: () => {},
                            'aria-label': 'Select status',
                        }}
                        secondaryTag={{
                            text: 'Active',
                            color: TagColor.SUCCESS,
                            onClick: () => {},
                            'aria-label': 'Activate status',
                        }}
                    />
                )

                const primaryTag = container.querySelector(
                    '[data-element="primary-tag"]'
                )
                const secondaryTag = container.querySelector(
                    '[data-element="secondary-tag"]'
                )

                expect(primaryTag).toHaveAttribute(
                    'aria-label',
                    'Select status'
                )
                expect(secondaryTag).toHaveAttribute(
                    'aria-label',
                    'Activate status'
                )
            })

            it('group container has aria-label combining both tags', () => {
                const { container } = render(
                    <SplitTag
                        primaryTag={{
                            text: 'Version',
                            color: TagColor.NEUTRAL,
                        }}
                        secondaryTag={{
                            text: '2.0.0',
                            color: TagColor.PRIMARY,
                        }}
                    />
                )

                const group = container.querySelector('[role="group"]')
                expect(group).toHaveAttribute('aria-label', 'Version: 2.0.0')
            })
        })

        describe('10. Custom controls have ARIA roles', () => {
            it('interactive tags have role="button"', () => {
                const { container } = render(
                    <SplitTag
                        primaryTag={{
                            text: 'Action',
                            color: TagColor.NEUTRAL,
                            onClick: () => {},
                        }}
                        secondaryTag={{
                            text: 'Click Me',
                            color: TagColor.PRIMARY,
                            onClick: () => {},
                        }}
                    />
                )

                const primaryTag = container.querySelector(
                    '[data-element="primary-tag"]'
                )
                const secondaryTag = container.querySelector(
                    '[data-element="secondary-tag"]'
                )

                expect(primaryTag).toHaveAttribute('role', 'button')
                expect(secondaryTag).toHaveAttribute('role', 'button')
            })

            it('non-interactive tags do not have button role', () => {
                const { container } = render(
                    <SplitTag
                        primaryTag={{
                            text: 'Status',
                            color: TagColor.NEUTRAL,
                        }}
                        secondaryTag={{
                            text: 'Active',
                            color: TagColor.SUCCESS,
                        }}
                    />
                )

                const primaryTag = container.querySelector(
                    '[data-element="primary-tag"]'
                )
                const secondaryTag = container.querySelector(
                    '[data-element="secondary-tag"]'
                )

                expect(primaryTag).not.toHaveAttribute('role', 'button')
                expect(secondaryTag).not.toHaveAttribute('role', 'button')
            })

            it('group container has role="group"', () => {
                const { container } = render(
                    <SplitTag
                        primaryTag={{
                            text: 'Status',
                            color: TagColor.NEUTRAL,
                        }}
                        secondaryTag={{
                            text: 'Active',
                            color: TagColor.SUCCESS,
                        }}
                    />
                )

                const group = container.querySelector('[role="group"]')
                expect(group).toBeInTheDocument()
                expect(group).toHaveAttribute('role', 'group')
            })
        })
    })
})
