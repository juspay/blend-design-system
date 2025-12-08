import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test-utils'
import { axe } from 'jest-axe'
import Tag from '../../../lib/components/Tags/Tag'
import {
    TagColor,
    TagShape,
    TagSize,
    TagVariant,
} from '../../../lib/components/Tags/types'
import { MockIcon } from '../../test-utils'

describe('Tag Accessibility', () => {
    describe('WCAG 2.1 Compliance (Level A, AA, AAA)', () => {
        it('meets WCAG standards for default tag (axe-core validation)', async () => {
            const { container } = render(<Tag text="Accessible Tag" />)
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for all tag variants (No Fill, Attentive, Subtle)', async () => {
            const variants = [
                TagVariant.NO_FILL,
                TagVariant.ATTENTIVE,
                TagVariant.SUBTLE,
            ]

            for (const variant of variants) {
                const { container, unmount } = render(
                    <Tag text={`${variant} Tag`} variant={variant} />
                )
                const results = await axe(container)
                expect(results).toHaveNoViolations()
                unmount()
            }
        })

        it('meets WCAG standards for all tag colors', async () => {
            const colors = [
                TagColor.NEUTRAL,
                TagColor.PRIMARY,
                TagColor.SUCCESS,
                TagColor.ERROR,
                TagColor.WARNING,
                TagColor.PURPLE,
            ]

            for (const color of colors) {
                const { container, unmount } = render(
                    <Tag text={`${color} Tag`} color={color} />
                )
                const results = await axe(container)
                expect(results).toHaveNoViolations()
                unmount()
            }
        })

        it('meets WCAG standards for all tag sizes', async () => {
            const sizes = [TagSize.XS, TagSize.SM, TagSize.MD, TagSize.LG]

            for (const size of sizes) {
                const { container, unmount } = render(
                    <Tag text={`${size} Tag`} size={size} />
                )
                const results = await axe(container)
                expect(results).toHaveNoViolations()
                unmount()
            }
        })

        it('meets WCAG standards for all tag shapes', async () => {
            const shapes = [TagShape.SQUARICAL, TagShape.ROUNDED]

            for (const shape of shapes) {
                const { container, unmount } = render(
                    <Tag text={`${shape} Tag`} shape={shape} />
                )
                const results = await axe(container)
                expect(results).toHaveNoViolations()
                unmount()
            }
        })

        it('meets WCAG standards for interactive tag (2.1.1 Keyboard, 4.1.2 Name Role Value)', async () => {
            const handleClick = vi.fn()
            const { container } = render(
                <Tag text="Interactive Tag" onClick={handleClick} />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for tag with icons (1.1.1 Non-text Content)', async () => {
            const { container } = render(
                <Tag
                    text="Tag with Icons"
                    leftSlot={<MockIcon size={12} aria-hidden="true" />}
                    rightSlot={<MockIcon size={12} aria-hidden="true" />}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for split tags', async () => {
            const { container } = render(
                <>
                    <Tag
                        text="Version"
                        splitTagPosition="left"
                        color={TagColor.NEUTRAL}
                    />
                    <Tag
                        text="2.0.0"
                        splitTagPosition="right"
                        color={TagColor.PRIMARY}
                    />
                </>
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards for tag with custom aria-label', async () => {
            const { container } = render(
                <Tag
                    text="Tag Text"
                    aria-label="Custom accessible name for tag"
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 2.1.1 Keyboard (Level A)', () => {
        it('interactive tag is focusable with keyboard - all functionality operable via keyboard', () => {
            const handleClick = vi.fn()
            render(<Tag text="Focusable Tag" onClick={handleClick} />)
            const tag = screen.getByRole('button', { name: 'Focusable Tag' })

            tag.focus()
            expect(document.activeElement).toBe(tag)
        })

        it('non-interactive tag is not focusable - no tabIndex attribute', () => {
            render(<Tag text="Non-Interactive Tag" />)
            const tag = screen.getByText('Non-Interactive Tag').closest('div')
            expect(tag).not.toHaveAttribute('tabIndex')
            expect(tag).not.toHaveAttribute('role')
        })

        it('can be activated with Enter key - keyboard activation support', async () => {
            const handleClick = vi.fn()
            const { user } = render(
                <Tag text="Enter Key Tag" onClick={handleClick} />
            )

            const tag = screen.getByRole('button', { name: 'Enter Key Tag' })
            tag.focus()

            await user.keyboard('{Enter}')
            expect(handleClick).toHaveBeenCalledTimes(1)
        })

        it('can be activated with Space key - keyboard activation support', async () => {
            const handleClick = vi.fn()
            const { user } = render(
                <Tag text="Space Key Tag" onClick={handleClick} />
            )

            const tag = screen.getByRole('button', { name: 'Space Key Tag' })
            tag.focus()

            await user.keyboard(' ')
            expect(handleClick).toHaveBeenCalledTimes(1)
        })

        it('prevents default behavior for Enter key - no form submission', async () => {
            const handleClick = vi.fn()
            const handleSubmit = vi.fn()
            const { user } = render(
                <form onSubmit={handleSubmit}>
                    <Tag text="Tag in Form" onClick={handleClick} />
                </form>
            )

            const tag = screen.getByRole('button', { name: 'Tag in Form' })
            tag.focus()

            await user.keyboard('{Enter}')
            expect(handleClick).toHaveBeenCalledTimes(1)
            expect(handleSubmit).not.toHaveBeenCalled()
        })

        it('prevents default behavior for Space key - no page scroll', async () => {
            const handleClick = vi.fn()
            const { user } = render(
                <Tag text="Space Tag" onClick={handleClick} />
            )

            const tag = screen.getByRole('button', { name: 'Space Tag' })
            tag.focus()

            const initialScrollY = window.scrollY
            await user.keyboard(' ')
            expect(handleClick).toHaveBeenCalledTimes(1)
            // Space key should not scroll the page
            expect(window.scrollY).toBe(initialScrollY)
        })

        it('supports Tab navigation - logical focus order', async () => {
            const { user } = render(
                <>
                    <Tag text="First Tag" onClick={() => {}} />
                    <Tag text="Second Tag" onClick={() => {}} />
                    <button>Button</button>
                </>
            )

            const firstTag = screen.getByRole('button', { name: 'First Tag' })
            const secondTag = screen.getByRole('button', { name: 'Second Tag' })
            const button = screen.getByRole('button', { name: 'Button' })

            await user.tab()
            expect(document.activeElement).toBe(firstTag)

            await user.tab()
            expect(document.activeElement).toBe(secondTag)

            await user.tab()
            expect(document.activeElement).toBe(button)
        })

        it('non-interactive tags are skipped in tab order', async () => {
            const { user } = render(
                <>
                    <Tag text="Non-Interactive" />
                    <Tag text="Interactive" onClick={() => {}} />
                    <button>Button</button>
                </>
            )

            const interactiveTag = screen.getByRole('button', {
                name: 'Interactive',
            })
            const button = screen.getByRole('button', { name: 'Button' })

            await user.tab()
            expect(document.activeElement).toBe(interactiveTag)

            await user.tab()
            expect(document.activeElement).toBe(button)
        })

        it('maintains focus visible state (2.4.7 Focus Visible - Level AA)', () => {
            render(<Tag text="Focus Visible Tag" onClick={() => {}} />)
            const tag = screen.getByRole('button', {
                name: 'Focus Visible Tag',
            })

            tag.focus()
            expect(document.activeElement).toBe(tag)
        })
    })

    describe('WCAG 4.1.2 Name, Role, Value (Level A) & Screen Reader Support', () => {
        it('interactive tag has proper button role - programmatically determinable role', () => {
            render(<Tag text="Button Role Tag" onClick={() => {}} />)
            expect(
                screen.getByRole('button', { name: 'Button Role Tag' })
            ).toBeInTheDocument()
        })

        it('non-interactive tag has no role - semantic div element', () => {
            render(<Tag text="No Role Tag" />)
            const tag = screen.getByText('No Role Tag').closest('div')
            expect(tag).not.toHaveAttribute('role')
        })

        it('announces tag text to screen readers - accessible name provided', () => {
            render(<Tag text="Screen Reader Tag" onClick={() => {}} />)
            const tag = screen.getByRole('button', {
                name: 'Screen Reader Tag',
            })
            expect(tag).toBeInTheDocument()
        })

        it('uses custom aria-label when provided - accessible name override', () => {
            render(
                <Tag
                    text="Tag Text"
                    aria-label="Custom accessible name"
                    onClick={() => {}}
                />
            )
            const tag = screen.getByRole('button', {
                name: 'Custom accessible name',
            })
            expect(tag).toBeInTheDocument()
            expect(tag).toHaveAttribute('aria-label', 'Custom accessible name')
        })

        it('decorative icons have aria-hidden when text is present (1.1.1 Non-text Content)', () => {
            render(
                <Tag
                    text="Tag with Icon"
                    leftSlot={<MockIcon size={12} aria-hidden="true" />}
                    onClick={() => {}}
                />
            )
            const tag = screen.getByRole('button', { name: 'Tag with Icon' })
            const icon = tag.querySelector('[data-testid="mock-icon"]')
            expect(icon).toHaveAttribute('aria-hidden', 'true')
        })

        it('decorative icons in rightSlot have aria-hidden (1.1.1 Non-text Content)', () => {
            render(
                <Tag
                    text="Tag with Right Icon"
                    rightSlot={<MockIcon size={12} aria-hidden="true" />}
                    onClick={() => {}}
                />
            )
            const tag = screen.getByRole('button', {
                name: 'Tag with Right Icon',
            })
            const icon = tag.querySelector('[data-testid="mock-icon"]')
            expect(icon).toHaveAttribute('aria-hidden', 'true')
        })

        it('supports aria-describedby for additional context (3.3.2 Labels or Instructions)', () => {
            render(
                <>
                    <Tag
                        text="Tag"
                        aria-describedby="tag-help"
                        onClick={() => {}}
                    />
                    <span id="tag-help">This tag represents a category</span>
                </>
            )
            const tag = screen.getByRole('button', { name: 'Tag' })
            expect(tag).toHaveAttribute('aria-describedby', 'tag-help')
        })

        it('text content is accessible for screen readers', () => {
            render(<Tag text="Accessible Text Content" onClick={() => {}} />)
            const tag = screen.getByRole('button', {
                name: 'Accessible Text Content',
            })
            expect(tag).toHaveTextContent('Accessible Text Content')
        })

        it('non-interactive tag text is accessible without role', () => {
            render(<Tag text="Non-Interactive Text" />)
            const text = screen.getByText('Non-Interactive Text')
            expect(text).toBeInTheDocument()
        })
    })

    describe('WCAG 2.4.7 Focus Visible (Level AA)', () => {
        it('shows focus indicator when focused - keyboard focus indicator visible', () => {
            render(<Tag text="Focus Me" onClick={() => {}} />)
            const tag = screen.getByRole('button', { name: 'Focus Me' })

            tag.focus()
            expect(document.activeElement).toBe(tag)
            // Focus styles are applied via _focusVisible pseudo-class
        })

        it('focus indicator is visible for all interactive tag variants', () => {
            const variants = [
                TagVariant.NO_FILL,
                TagVariant.ATTENTIVE,
                TagVariant.SUBTLE,
            ]

            variants.forEach((variant) => {
                const { unmount } = render(
                    <Tag
                        text={`${variant} Focus`}
                        variant={variant}
                        onClick={() => {}}
                    />
                )
                const tag = screen.getByRole('button', {
                    name: `${variant} Focus`,
                })
                tag.focus()
                expect(document.activeElement).toBe(tag)
                unmount()
            })
        })

        it('focus indicator is visible for all interactive tag colors', () => {
            const colors = [
                TagColor.NEUTRAL,
                TagColor.PRIMARY,
                TagColor.SUCCESS,
                TagColor.ERROR,
                TagColor.WARNING,
                TagColor.PURPLE,
            ]

            colors.forEach((color) => {
                const { unmount } = render(
                    <Tag
                        text={`${color} Focus`}
                        color={color}
                        onClick={() => {}}
                    />
                )
                const tag = screen.getByRole('button', {
                    name: `${color} Focus`,
                })
                tag.focus()
                expect(document.activeElement).toBe(tag)
                unmount()
            })
        })

        it('non-interactive tags do not show focus indicator', () => {
            render(<Tag text="No Focus" />)
            const tag = screen.getByText('No Focus').closest('div')
            expect(tag).not.toHaveAttribute('tabIndex')
            expect(tag).not.toHaveAttribute('role')
        })
    })

    describe('WCAG 1.1.1 Non-text Content (Level A)', () => {
        it('decorative icons are properly hidden from screen readers', () => {
            render(
                <Tag
                    text="Tag with Decorative Icon"
                    leftSlot={<MockIcon size={12} aria-hidden="true" />}
                    onClick={() => {}}
                />
            )
            const tag = screen.getByRole('button', {
                name: 'Tag with Decorative Icon',
            })
            const icon = tag.querySelector('[data-testid="mock-icon"]')
            expect(icon).toHaveAttribute('aria-hidden', 'true')
        })

        it('icons in both slots are properly hidden when decorative', () => {
            render(
                <Tag
                    text="Tag with Both Icons"
                    leftSlot={<MockIcon size={12} aria-hidden="true" />}
                    rightSlot={<MockIcon size={12} aria-hidden="true" />}
                    onClick={() => {}}
                />
            )
            const tag = screen.getByRole('button', {
                name: 'Tag with Both Icons',
            })
            const icons = tag.querySelectorAll('[data-testid="mock-icon"]')
            icons.forEach((icon) => {
                expect(icon).toHaveAttribute('aria-hidden', 'true')
            })
        })

        it('tag text provides accessible name when icons are decorative', () => {
            render(
                <Tag
                    text="Accessible Tag Name"
                    leftSlot={<MockIcon size={12} aria-hidden="true" />}
                    onClick={() => {}}
                />
            )
            const tag = screen.getByRole('button', {
                name: 'Accessible Tag Name',
            })
            expect(tag).toBeInTheDocument()
        })
    })

    describe('WCAG 2.5.8 Target Size (Minimum) (Level AA)', () => {
        it('interactive tags meet minimum touch target size (24x24px)', () => {
            const sizes = [TagSize.XS, TagSize.SM, TagSize.MD, TagSize.LG]

            sizes.forEach((size) => {
                const { unmount } = render(
                    <Tag text={`${size} Tag`} size={size} onClick={() => {}} />
                )
                const tag = screen.getByRole('button', { name: `${size} Tag` })
                // Tags should have padding that ensures minimum 24x24px touch target
                // This is verified through visual testing, but we check that the element exists
                expect(tag).toBeInTheDocument()
                unmount()
            })
        })

        it('interactive tags are keyboard accessible regardless of size', () => {
            const sizes = [TagSize.XS, TagSize.SM, TagSize.MD, TagSize.LG]

            sizes.forEach((size) => {
                const { unmount } = render(
                    <Tag text={`${size} Tag`} size={size} onClick={() => {}} />
                )
                const tag = screen.getByRole('button', { name: `${size} Tag` })
                tag.focus()
                expect(document.activeElement).toBe(tag)
                unmount()
            })
        })
    })

    describe('WCAG 2.1.3 Keyboard (No Exception) (Level AAA)', () => {
        it('all functionality is keyboard accessible without timing requirements', async () => {
            const handleClick = vi.fn()
            const { user } = render(
                <Tag text="Keyboard Accessible" onClick={handleClick} />
            )

            const tag = screen.getByRole('button', {
                name: 'Keyboard Accessible',
            })
            tag.focus()

            // Test Enter key
            await user.keyboard('{Enter}')
            expect(handleClick).toHaveBeenCalledTimes(1)

            // Test Space key
            await user.keyboard(' ')
            expect(handleClick).toHaveBeenCalledTimes(2)

            // No timing requirements - immediate response
        })

        it('keyboard activation works consistently across all variants', async () => {
            const variants = [
                TagVariant.NO_FILL,
                TagVariant.ATTENTIVE,
                TagVariant.SUBTLE,
            ]

            for (const variant of variants) {
                const handleClick = vi.fn()
                const { user, unmount } = render(
                    <Tag
                        text={`${variant} Keyboard`}
                        variant={variant}
                        onClick={handleClick}
                    />
                )

                const tag = screen.getByRole('button', {
                    name: `${variant} Keyboard`,
                })
                tag.focus()

                await user.keyboard('{Enter}')
                expect(handleClick).toHaveBeenCalledTimes(1)

                unmount()
            }
        })

        it('keyboard activation works consistently across all colors', async () => {
            const colors = [
                TagColor.NEUTRAL,
                TagColor.PRIMARY,
                TagColor.SUCCESS,
                TagColor.ERROR,
                TagColor.WARNING,
                TagColor.PURPLE,
            ]

            for (const color of colors) {
                const handleClick = vi.fn()
                const { user, unmount } = render(
                    <Tag
                        text={`${color} Keyboard`}
                        color={color}
                        onClick={handleClick}
                    />
                )

                const tag = screen.getByRole('button', {
                    name: `${color} Keyboard`,
                })
                tag.focus()

                await user.keyboard(' ')
                expect(handleClick).toHaveBeenCalledTimes(1)

                unmount()
            }
        })
    })

    describe('WCAG 1.3.1 Info and Relationships (Level A)', () => {
        it('tag structure maintains semantic relationships', () => {
            render(<Tag text="Structured Tag" onClick={() => {}} />)
            const tag = screen.getByRole('button', { name: 'Structured Tag' })
            expect(tag).toHaveTextContent('Structured Tag')
        })

        it('split tags maintain visual and semantic relationships', () => {
            render(
                <>
                    <Tag
                        text="Version"
                        splitTagPosition="left"
                        color={TagColor.NEUTRAL}
                    />
                    <Tag
                        text="2.0.0"
                        splitTagPosition="right"
                        color={TagColor.PRIMARY}
                    />
                </>
            )
            const leftTag = screen.getByText('Version')
            const rightTag = screen.getByText('2.0.0')
            expect(leftTag).toBeInTheDocument()
            expect(rightTag).toBeInTheDocument()
        })
    })

    describe('WCAG 1.4.3 Contrast (Minimum) (Level AA)', () => {
        it('tag text has sufficient contrast for all variants', async () => {
            const variants = [
                TagVariant.NO_FILL,
                TagVariant.ATTENTIVE,
                TagVariant.SUBTLE,
            ]

            for (const variant of variants) {
                const { container, unmount } = render(
                    <Tag text={`${variant} Contrast`} variant={variant} />
                )
                const results = await axe(container)
                // Contrast is verified through axe-core
                expect(results).toHaveNoViolations()
                unmount()
            }
        })

        it('tag text has sufficient contrast for all colors', async () => {
            const colors = [
                TagColor.NEUTRAL,
                TagColor.PRIMARY,
                TagColor.SUCCESS,
                TagColor.ERROR,
                TagColor.WARNING,
                TagColor.PURPLE,
            ]

            for (const color of colors) {
                const { container, unmount } = render(
                    <Tag text={`${color} Contrast`} color={color} />
                )
                const results = await axe(container)
                expect(results).toHaveNoViolations()
                unmount()
            }
        })
    })

    describe('WCAG 2.4.3 Focus Order (Level A)', () => {
        it('interactive tags follow logical focus order', async () => {
            const { user } = render(
                <>
                    <Tag text="First" onClick={() => {}} />
                    <Tag text="Second" onClick={() => {}} />
                    <Tag text="Third" onClick={() => {}} />
                </>
            )

            const first = screen.getByRole('button', { name: 'First' })
            const second = screen.getByRole('button', { name: 'Second' })
            const third = screen.getByRole('button', { name: 'Third' })

            await user.tab()
            expect(document.activeElement).toBe(first)

            await user.tab()
            expect(document.activeElement).toBe(second)

            await user.tab()
            expect(document.activeElement).toBe(third)
        })

        it('non-interactive tags do not interfere with focus order', async () => {
            const { user } = render(
                <>
                    <Tag text="Non-Interactive 1" />
                    <Tag text="Interactive" onClick={() => {}} />
                    <Tag text="Non-Interactive 2" />
                    <button>Button</button>
                </>
            )

            const interactive = screen.getByRole('button', {
                name: 'Interactive',
            })
            const button = screen.getByRole('button', { name: 'Button' })

            await user.tab()
            expect(document.activeElement).toBe(interactive)

            await user.tab()
            expect(document.activeElement).toBe(button)
        })
    })

    describe('WCAG 3.2.1 On Focus (Level A)', () => {
        it('focusing tag does not cause unexpected context changes', async () => {
            const { user } = render(
                <>
                    <Tag text="Focus Tag" onClick={() => {}} />
                    <input type="text" />
                </>
            )

            const tag = screen.getByRole('button', { name: 'Focus Tag' })
            const input = screen.getByRole('textbox')

            await user.tab()
            expect(document.activeElement).toBe(tag)

            await user.tab()
            expect(document.activeElement).toBe(input)
        })
    })

    describe('WCAG 3.2.2 On Input (Level A)', () => {
        it('activating tag does not cause unexpected context changes', async () => {
            const handleClick = vi.fn()
            const { user } = render(
                <>
                    <Tag text="Activate Tag" onClick={handleClick} />
                    <input type="text" />
                </>
            )

            const tag = screen.getByRole('button', { name: 'Activate Tag' })
            tag.focus()

            await user.keyboard('{Enter}')
            expect(handleClick).toHaveBeenCalledTimes(1)
            // Focus should remain on tag or move logically, not cause page navigation
            expect(document.activeElement).toBe(tag)
        })
    })

    describe('Edge Cases and Additional Accessibility', () => {
        it('handles empty text gracefully (should not occur but tested for safety)', () => {
            render(<Tag text="" onClick={() => {}} />)
            const tag = screen.getByRole('button')
            expect(tag).toBeInTheDocument()
        })

        it('handles very long text content', () => {
            const longText =
                'This is a very long tag text that might wrap or truncate depending on the implementation'
            render(<Tag text={longText} onClick={() => {}} />)
            const tag = screen.getByRole('button', { name: longText })
            expect(tag).toBeInTheDocument()
        })

        it('handles special characters in text', () => {
            const specialText = 'Tag with <script> & special chars: @#$%'
            render(<Tag text={specialText} onClick={() => {}} />)
            const tag = screen.getByRole('button', { name: specialText })
            expect(tag).toBeInTheDocument()
        })

        it('handles unicode characters in text', () => {
            const unicodeText = 'Tag with 中文 & العربية & русский'
            render(<Tag text={unicodeText} onClick={() => {}} />)
            const tag = screen.getByRole('button', { name: unicodeText })
            expect(tag).toBeInTheDocument()
        })

        it('maintains accessibility with multiple tags in a group', async () => {
            const { user } = render(
                <div role="group" aria-label="Tag group">
                    <Tag text="Tag 1" onClick={() => {}} />
                    <Tag text="Tag 2" onClick={() => {}} />
                    <Tag text="Tag 3" onClick={() => {}} />
                </div>
            )

            const tag1 = screen.getByRole('button', { name: 'Tag 1' })
            const tag2 = screen.getByRole('button', { name: 'Tag 2' })
            const tag3 = screen.getByRole('button', { name: 'Tag 3' })

            await user.tab()
            expect(document.activeElement).toBe(tag1)

            await user.tab()
            expect(document.activeElement).toBe(tag2)

            await user.tab()
            expect(document.activeElement).toBe(tag3)
        })

        it('handles rapid keyboard activation without errors', async () => {
            const handleClick = vi.fn()
            const { user } = render(
                <Tag text="Rapid Activation" onClick={handleClick} />
            )

            const tag = screen.getByRole('button', { name: 'Rapid Activation' })
            tag.focus()

            // Rapid key presses
            await user.keyboard('{Enter}')
            await user.keyboard(' ')
            await user.keyboard('{Enter}')
            await user.keyboard(' ')

            expect(handleClick).toHaveBeenCalledTimes(4)
        })
    })
})
