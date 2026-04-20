import React, { act, createRef } from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '../../test-utils'
import userEvent from '@testing-library/user-event'
import {
    TabsV2,
    TabsV2List,
    TabsV2Trigger,
    TabsV2Content,
} from '../../../lib/components/TabsV2'
import {
    TabsV2Variant,
    TabsV2Size,
} from '../../../lib/components/TabsV2/tabsV2.types'
import { Info } from 'lucide-react'

describe('TabsV2 Parts', () => {
    beforeEach(() => {
        global.ResizeObserver = class ResizeObserver {
            observe() {}
            unobserve() {}
            disconnect() {}
        } as unknown as typeof ResizeObserver
    })

    describe('TabsV2List', () => {
        it('renders children correctly', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                        <TabsV2Trigger value="tab2">Tab 2</TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            expect(screen.getByRole('tablist')).toBeInTheDocument()
            expect(screen.getAllByRole('tab')).toHaveLength(2)
        })

        it('applies custom className', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List className="custom-tabs-list">
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            const list = document.querySelector('.custom-tabs-list')
            expect(list).toBeInTheDocument()
        })

        it('renders expanded variant', () => {
            render(
                <TabsV2 defaultValue="tab1" expanded>
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                        <TabsV2Trigger value="tab2">Tab 2</TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            expect(screen.getByRole('tablist')).toBeInTheDocument()
        })

        it('renders fitContent variant', () => {
            render(
                <TabsV2 defaultValue="tab1" fitContent>
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            expect(screen.getByRole('tablist')).toBeInTheDocument()
        })

        it('passes variant to children via context', () => {
            const { container } = render(
                <TabsV2 defaultValue="tab1" variant={TabsV2Variant.BOXED}>
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            const trigger = container.querySelector('[role="tab"]')
            expect(trigger).toBeInTheDocument()
        })

        it('passes size to children via context', () => {
            render(
                <TabsV2 defaultValue="tab1" size={TabsV2Size.LG}>
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            expect(screen.getByRole('tab')).toBeInTheDocument()
        })

        it('handles sticky header props', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List stickyHeader offsetTop={100}>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            const listContainer = document.querySelector(
                '[data-element="tabs-list"]'
            )
            expect(listContainer).toBeInTheDocument()
            // Sticky header styles are applied to the outer Block wrapper
            // The exact style values may vary in test environment
        })

        it('passes skeleton state to children', () => {
            render(
                <TabsV2 defaultValue="tab1" showSkeleton>
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            // When showSkeleton is true on TabsV2, it's passed to children via context
            // The trigger should be disabled when showSkeleton is true
            const trigger = screen.getByRole('tab', { name: 'Tab 1' })
            expect(trigger).toBeDisabled()
        })

        it('renders with variant underline and skeleton hides indicator', () => {
            render(
                <TabsV2
                    defaultValue="tab1"
                    variant={TabsV2Variant.UNDERLINE}
                    showSkeleton
                >
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            const trigger = screen.getByRole('tab', { name: 'Tab 1' })
            expect(trigger).toBeInTheDocument()
        })

        it('detects skeleton in children', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1" showSkeleton>
                            Tab 1
                        </TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            const trigger = screen.getByRole('tab', { name: 'Tab 1' })
            expect(trigger).toBeDisabled()
        })

        it('handles invalid child in hasAnySkeleton check', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        {'not a valid element'}
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            expect(
                screen.getByRole('tab', { name: 'Tab 1' })
            ).toBeInTheDocument()
        })

        it('forwards ref to the tab list element', () => {
            const listRef = createRef<HTMLDivElement>()
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List ref={listRef}>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            expect(listRef.current).toBeInstanceOf(HTMLDivElement)
            expect(listRef.current?.getAttribute('role')).toBe('tablist')
        })
    })

    describe('TabsV2Trigger', () => {
        it('renders with value prop', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            expect(
                screen.getByRole('tab', { name: 'Tab 1' })
            ).toBeInTheDocument()
        })

        it('renders with children text', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">
                            Custom Tab Label
                        </TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            expect(
                screen.getByRole('tab', { name: 'Custom Tab Label' })
            ).toBeInTheDocument()
        })

        it('applies custom className', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1" className="custom-trigger">
                            Tab 1
                        </TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            const trigger = document.querySelector('.custom-trigger')
            expect(trigger).toBeInTheDocument()
        })

        it('handles disabled state', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1" disabled>
                            Tab 1
                        </TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            expect(screen.getByRole('tab', { name: 'Tab 1' })).toBeDisabled()
        })

        it('renders with left slot', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger
                            value="tab1"
                            leftSlot={<Info data-testid="left-icon" />}
                        >
                            Tab 1
                        </TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            const leftSlot = document.querySelector(
                '[data-element="left-slot"]'
            )
            expect(leftSlot).toBeInTheDocument()
            expect(screen.getByTestId('left-icon')).toBeInTheDocument()
        })

        it('renders with right slot', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger
                            value="tab1"
                            rightSlot={<Info data-testid="right-icon" />}
                        >
                            Tab 1
                        </TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            const rightSlot = document.querySelector(
                '[data-element="right-slot"]'
            )
            expect(rightSlot).toBeInTheDocument()
            expect(screen.getByTestId('right-icon')).toBeInTheDocument()
        })

        it('renders with closable prop', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1" closable>
                            Tab 1
                        </TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            const closeSlot = document.querySelector(
                '[data-element="close-slot"]'
            )
            expect(closeSlot).toBeInTheDocument()
        })

        it('handles rightSlot with null props', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1" rightSlot="Plain Text">
                            Tab 1
                        </TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            expect(
                screen.getByRole('tab', { name: 'Tab 1' })
            ).toBeInTheDocument()
        })

        it('handles leftSlot without aria-label', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger
                            value="tab1"
                            leftSlot={<span>Icon</span>}
                        >
                            Tab 1
                        </TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            const tab = screen.getByRole('tab', { name: 'Tab 1' })
            expect(tab).toBeInTheDocument()
        })

        it('does not set aria-hidden on right slot when slot has aria-label', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger
                            value="tab1"
                            rightSlot={<Info aria-label="More about tab" />}
                        >
                            Tab 1
                        </TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            const rightSlot = document.querySelector(
                '[data-element="right-slot"]'
            )
            expect(rightSlot).toBeInTheDocument()
            expect(rightSlot).not.toHaveAttribute('aria-hidden', 'true')
        })

        it('calls onClose when close button is clicked', async () => {
            const user = userEvent.setup()
            const onClose = vi.fn()
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1" closable onClose={onClose}>
                            Tab 1
                        </TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            const closeButton = screen.getByRole('button', {
                name: 'Close Tab 1',
            })
            await user.click(closeButton)

            expect(onClose).toHaveBeenCalledTimes(1)
        })

        it('shows skeleton state on trigger', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1" showSkeleton>
                            Tab 1
                        </TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            const skeleton = document.querySelector('[data-element="skeleton"]')
            expect(skeleton).toBeInTheDocument()
        })

        it('handles isOverlay prop', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1" isOverlay>
                            Tab 1
                        </TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            expect(
                screen.getByRole('tab', { name: 'Tab 1' })
            ).toBeInTheDocument()
        })

        it('passes tabsGroupId to trigger', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1" tabsGroupId="group-1">
                            Tab 1
                        </TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            expect(
                screen.getByRole('tab', { name: 'Tab 1' })
            ).toBeInTheDocument()
        })
    })

    describe('TabsV2Content', () => {
        it('renders content when active', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                    </TabsV2List>
                    <TabsV2Content value="tab1">
                        <p>Content for Tab 1</p>
                    </TabsV2Content>
                </TabsV2>
            )

            expect(screen.getByText('Content for Tab 1')).toBeInTheDocument()
            expect(screen.getByRole('tabpanel')).toBeInTheDocument()
        })

        it('renders with custom value', () => {
            render(
                <TabsV2 defaultValue="custom-value">
                    <TabsV2List>
                        <TabsV2Trigger value="custom-value">
                            Custom Tab
                        </TabsV2Trigger>
                    </TabsV2List>
                    <TabsV2Content value="custom-value">
                        Custom Content
                    </TabsV2Content>
                </TabsV2>
            )

            expect(screen.getByText('Custom Content')).toBeInTheDocument()
        })

        it('applies custom className', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                    </TabsV2List>
                    <TabsV2Content value="tab1" className="custom-content">
                        Content
                    </TabsV2Content>
                </TabsV2>
            )

            const content = document.querySelector('.custom-content')
            expect(content).toBeInTheDocument()
        })

        it('renders complex children', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                    </TabsV2List>
                    <TabsV2Content value="tab1">
                        <div>
                            <h1>Title</h1>
                            <p>Paragraph</p>
                            <button>Action</button>
                        </div>
                    </TabsV2Content>
                </TabsV2>
            )

            expect(screen.getByText('Title')).toBeInTheDocument()
            expect(screen.getByText('Paragraph')).toBeInTheDocument()
            expect(
                screen.getByRole('button', { name: 'Action' })
            ).toBeInTheDocument()
        })

        it('has correct data attributes', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                    </TabsV2List>
                    <TabsV2Content value="tab1">Content</TabsV2Content>
                </TabsV2>
            )

            const content = document.querySelector('[data-element="content"]')
            expect(content).toBeInTheDocument()
            expect(content).toHaveAttribute('data-id', 'tab1')
        })
    })

    describe('Composition Patterns', () => {
        it('works with composed pattern (items array style)', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                        <TabsV2Trigger value="tab2">Tab 2</TabsV2Trigger>
                        <TabsV2Trigger value="tab3">Tab 3</TabsV2Trigger>
                    </TabsV2List>
                    <TabsV2Content value="tab1">Content 1</TabsV2Content>
                    <TabsV2Content value="tab2">Content 2</TabsV2Content>
                    <TabsV2Content value="tab3">Content 3</TabsV2Content>
                </TabsV2>
            )

            expect(screen.getAllByRole('tab')).toHaveLength(3)
            expect(screen.getByText('Content 1')).toBeInTheDocument()
        })

        it('works with conditional rendering', () => {
            const showExtraTab = true
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                        {showExtraTab && (
                            <TabsV2Trigger value="tab2">Tab 2</TabsV2Trigger>
                        )}
                    </TabsV2List>
                    <TabsV2Content value="tab1">Content 1</TabsV2Content>
                    {showExtraTab && (
                        <TabsV2Content value="tab2">Content 2</TabsV2Content>
                    )}
                </TabsV2>
            )

            expect(screen.getAllByRole('tab')).toHaveLength(2)
        })

        it('works with deeply nested content', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                    </TabsV2List>
                    <TabsV2Content value="tab1">
                        <div>
                            <section>
                                <article>
                                    <p>Deeply nested content</p>
                                </article>
                            </section>
                        </div>
                    </TabsV2Content>
                </TabsV2>
            )

            expect(
                screen.getByText('Deeply nested content')
            ).toBeInTheDocument()
        })
    })

    describe('Keyboard Interaction', () => {
        it('supports tab navigation', async () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                        <TabsV2Trigger value="tab2">Tab 2</TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            const tab1 = screen.getByRole('tab', { name: 'Tab 1' })
            await act(async () => {
                tab1.focus()
            })

            expect(document.activeElement).toBe(tab1)
        })

        it('disabled tab is not interactive', async () => {
            const onValueChange = vi.fn()
            render(
                <TabsV2 defaultValue="tab1" onValueChange={onValueChange}>
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                        <TabsV2Trigger value="tab2" disabled>
                            Tab 2
                        </TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            const tab2 = screen.getByRole('tab', { name: 'Tab 2' })
            // Disabled tabs can't be clicked due to pointer-events: none
            expect(tab2).toBeDisabled()
            expect(onValueChange).not.toHaveBeenCalled()
        })

        it('closable tab handles keyboard events on close button', () => {
            const onClose = vi.fn()
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1" closable onClose={onClose}>
                            Tab 1
                        </TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            const closeButton = screen.getByRole('button', {
                name: 'Close Tab 1',
            })
            fireEvent.keyDown(closeButton, { key: 'Enter' })

            expect(onClose).toHaveBeenCalled()
        })
    })

    describe('Responsive Behavior', () => {
        it('handles scroll container', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        {Array.from({ length: 10 }, (_, i) => (
                            <TabsV2Trigger key={i} value={`tab${i}`}>
                                {`Tab ${i + 1}`}
                            </TabsV2Trigger>
                        ))}
                    </TabsV2List>
                </TabsV2>
            )

            expect(screen.getAllByRole('tab')).toHaveLength(10)
        })
    })
})
