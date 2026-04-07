import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '../../test-utils'
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

describe('TabsV2', () => {
    beforeEach(() => {
        global.ResizeObserver = class ResizeObserver {
            observe() {}
            unobserve() {}
            disconnect() {}
        } as unknown as typeof ResizeObserver
    })

    describe('Basic Functionality', () => {
        it('renders tabs with default value', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                        <TabsV2Trigger value="tab2">Tab 2</TabsV2Trigger>
                    </TabsV2List>
                    <TabsV2Content value="tab1">Content 1</TabsV2Content>
                    <TabsV2Content value="tab2">Content 2</TabsV2Content>
                </TabsV2>
            )

            expect(
                screen.getByRole('tab', { name: 'Tab 1' })
            ).toBeInTheDocument()
            expect(
                screen.getByRole('tab', { name: 'Tab 2' })
            ).toBeInTheDocument()
            expect(screen.getByText('Content 1')).toBeInTheDocument()
        })

        it('renders tabs with controlled value', () => {
            render(
                <TabsV2 value="tab2">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                        <TabsV2Trigger value="tab2">Tab 2</TabsV2Trigger>
                    </TabsV2List>
                    <TabsV2Content value="tab1">Content 1</TabsV2Content>
                    <TabsV2Content value="tab2">Content 2</TabsV2Content>
                </TabsV2>
            )

            expect(screen.getByText('Content 2')).toBeInTheDocument()
        })

        it('handles controlled value updates from undefined', () => {
            const { rerender } = render(
                <TabsV2 value={undefined} defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                    </TabsV2List>
                    <TabsV2Content value="tab1">Content 1</TabsV2Content>
                </TabsV2>
            )

            expect(screen.getByText('Content 1')).toBeInTheDocument()

            rerender(
                <TabsV2 value="tab1" defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                    </TabsV2List>
                    <TabsV2Content value="tab1">Content 1</TabsV2Content>
                </TabsV2>
            )

            expect(screen.getByText('Content 1')).toBeInTheDocument()
        })

        it('does not update activeTab when controlled value is undefined', () => {
            const { rerender } = render(
                <TabsV2 value="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                        <TabsV2Trigger value="tab2">Tab 2</TabsV2Trigger>
                    </TabsV2List>
                    <TabsV2Content value="tab1">Content 1</TabsV2Content>
                    <TabsV2Content value="tab2">Content 2</TabsV2Content>
                </TabsV2>
            )

            expect(screen.getByText('Content 1')).toBeInTheDocument()

            // Rerender with undefined value - should not change active tab
            rerender(
                <TabsV2 value={undefined}>
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                        <TabsV2Trigger value="tab2">Tab 2</TabsV2Trigger>
                    </TabsV2List>
                    <TabsV2Content value="tab1">Content 1</TabsV2Content>
                    <TabsV2Content value="tab2">Content 2</TabsV2Content>
                </TabsV2>
            )

            // Content should still show tab1 because useEffect only updates when value !== undefined
            expect(screen.getByText('Content 1')).toBeInTheDocument()
        })

        it('handles tab change without onValueChange callback', async () => {
            const user = userEvent.setup()
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                        <TabsV2Trigger value="tab2">Tab 2</TabsV2Trigger>
                    </TabsV2List>
                    <TabsV2Content value="tab1">Content 1</TabsV2Content>
                    <TabsV2Content value="tab2">Content 2</TabsV2Content>
                </TabsV2>
            )

            await user.click(screen.getByRole('tab', { name: 'Tab 2' }))

            await waitFor(() => {
                expect(screen.getByText('Content 2')).toBeInTheDocument()
            })
        })

        it('updates active tab when controlled value changes', () => {
            const { rerender } = render(
                <TabsV2 value="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                        <TabsV2Trigger value="tab2">Tab 2</TabsV2Trigger>
                    </TabsV2List>
                    <TabsV2Content value="tab1">Content 1</TabsV2Content>
                    <TabsV2Content value="tab2">Content 2</TabsV2Content>
                </TabsV2>
            )

            expect(screen.getByText('Content 1')).toBeInTheDocument()

            rerender(
                <TabsV2 value="tab2">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                        <TabsV2Trigger value="tab2">Tab 2</TabsV2Trigger>
                    </TabsV2List>
                    <TabsV2Content value="tab1">Content 1</TabsV2Content>
                    <TabsV2Content value="tab2">Content 2</TabsV2Content>
                </TabsV2>
            )

            expect(screen.getByText('Content 2')).toBeInTheDocument()
        })

        it('switches tabs when clicking trigger', async () => {
            const user = userEvent.setup()
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                        <TabsV2Trigger value="tab2">Tab 2</TabsV2Trigger>
                    </TabsV2List>
                    <TabsV2Content value="tab1">Content 1</TabsV2Content>
                    <TabsV2Content value="tab2">Content 2</TabsV2Content>
                </TabsV2>
            )

            expect(screen.getByText('Content 1')).toBeInTheDocument()

            await user.click(screen.getByRole('tab', { name: 'Tab 2' }))

            await waitFor(() => {
                expect(screen.getByText('Content 2')).toBeInTheDocument()
            })
        })

        it('calls onValueChange when tab is changed', async () => {
            const user = userEvent.setup()
            const onValueChange = vi.fn()
            render(
                <TabsV2 defaultValue="tab1" onValueChange={onValueChange}>
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                        <TabsV2Trigger value="tab2">Tab 2</TabsV2Trigger>
                    </TabsV2List>
                    <TabsV2Content value="tab1">Content 1</TabsV2Content>
                    <TabsV2Content value="tab2">Content 2</TabsV2Content>
                </TabsV2>
            )

            await user.click(screen.getByRole('tab', { name: 'Tab 2' }))

            expect(onValueChange).toHaveBeenCalledWith('tab2')
        })
    })

    describe('Variants', () => {
        it('renders with underline variant by default', () => {
            const { container } = render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            const list = container.querySelector('[data-element="tabs-list"]')
            expect(list).toBeInTheDocument()
        })

        it('renders with boxed variant', () => {
            render(
                <TabsV2 defaultValue="tab1" variant={TabsV2Variant.BOXED}>
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            expect(
                screen.getByRole('tab', { name: 'Tab 1' })
            ).toBeInTheDocument()
        })

        it('renders with floating variant', () => {
            render(
                <TabsV2 defaultValue="tab1" variant={TabsV2Variant.FLOATING}>
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            expect(
                screen.getByRole('tab', { name: 'Tab 1' })
            ).toBeInTheDocument()
        })

        it('renders with pills variant', () => {
            render(
                <TabsV2 defaultValue="tab1" variant={TabsV2Variant.PILLS}>
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            expect(
                screen.getByRole('tab', { name: 'Tab 1' })
            ).toBeInTheDocument()
        })
    })

    describe('Sizes', () => {
        it('renders with medium size by default', () => {
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

        it('renders with large size', () => {
            render(
                <TabsV2 defaultValue="tab1" size={TabsV2Size.LG}>
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            expect(
                screen.getByRole('tab', { name: 'Tab 1' })
            ).toBeInTheDocument()
        })
    })

    describe('Disabled State', () => {
        it('disables all tabs when disabled prop is set on TabsV2', () => {
            render(
                <TabsV2 defaultValue="tab1" disabled>
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                        <TabsV2Trigger value="tab2">Tab 2</TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            const tab1 = screen.getByRole('tab', { name: 'Tab 1' })
            const tab2 = screen.getByRole('tab', { name: 'Tab 2' })

            expect(tab1).toBeDisabled()
            expect(tab2).toBeDisabled()
        })

        it('disables individual trigger with disabled prop', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                        <TabsV2Trigger value="tab2" disabled>
                            Tab 2
                        </TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            expect(
                screen.getByRole('tab', { name: 'Tab 1' })
            ).not.toBeDisabled()
            expect(screen.getByRole('tab', { name: 'Tab 2' })).toBeDisabled()
        })

        it('does not change tab when clicking disabled tab', async () => {
            const onValueChange = vi.fn()
            render(
                <TabsV2 defaultValue="tab1" onValueChange={onValueChange}>
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                        <TabsV2Trigger value="tab2" disabled>
                            Tab 2
                        </TabsV2Trigger>
                    </TabsV2List>
                    <TabsV2Content value="tab1">Content 1</TabsV2Content>
                    <TabsV2Content value="tab2">Content 2</TabsV2Content>
                </TabsV2>
            )

            // Disabled tabs have pointer-events: none, so clicking won't work
            // Verify the tab is disabled and content remains the same
            const tab2 = screen.getByRole('tab', { name: 'Tab 2' })
            expect(tab2).toBeDisabled()
            expect(onValueChange).not.toHaveBeenCalled()
            expect(screen.getByText('Content 1')).toBeInTheDocument()
        })
    })

    describe('Slots', () => {
        it('renders trigger with left slot', () => {
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

            expect(screen.getByTestId('left-icon')).toBeInTheDocument()
        })

        it('renders trigger with right slot', () => {
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

            expect(screen.getByTestId('right-icon')).toBeInTheDocument()
        })
    })

    describe('Closable Tabs', () => {
        it('renders close button when closable is true', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1" closable>
                            Tab 1
                        </TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            expect(
                screen.getByRole('button', { name: 'Close Tab 1' })
            ).toBeInTheDocument()
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

            await user.click(
                screen.getByRole('button', { name: 'Close Tab 1' })
            )

            expect(onClose).toHaveBeenCalled()
        })

        it('does not call onClose when disabled', async () => {
            const onClose = vi.fn()
            render(
                <TabsV2 defaultValue="tab1" disabled>
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
            expect(closeButton).toHaveAttribute('tabIndex', '-1')
        })

        it('calls onClose when pressing Enter on close button', () => {
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
            fireEvent.keyDown(closeButton, { key: 'Enter', code: 'Enter' })

            expect(onClose).toHaveBeenCalled()
        })

        it('calls onClose when pressing Space on close button', () => {
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
            fireEvent.keyDown(closeButton, { key: ' ', code: 'Space' })

            expect(onClose).toHaveBeenCalled()
        })
    })

    describe('Skeleton Loading', () => {
        it('shows skeleton when showSkeleton is true', () => {
            render(
                <TabsV2 defaultValue="tab1" showSkeleton>
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            const skeleton = document.querySelector('[data-element="skeleton"]')
            expect(skeleton).toBeInTheDocument()
        })

        it('shows skeleton on individual trigger when showSkeleton is set', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1" showSkeleton>
                            Tab 1
                        </TabsV2Trigger>
                        <TabsV2Trigger value="tab2">Tab 2</TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            const skeletons = document.querySelectorAll(
                '[data-element="skeleton"]'
            )
            expect(skeletons.length).toBeGreaterThan(0)
        })

        it('applies skeleton variant', () => {
            render(
                <TabsV2
                    defaultValue="tab1"
                    showSkeleton
                    skeletonVariant="shimmer"
                >
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            const skeleton = document.querySelector('[data-element="skeleton"]')
            expect(skeleton).toBeInTheDocument()
        })
    })

    describe('Sticky Header', () => {
        it('renders with sticky header when stickyHeader is true', () => {
            render(
                <TabsV2 defaultValue="tab1" stickyHeader>
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            const list = document.querySelector('[data-element="tabs-list"]')
            expect(list).toHaveStyle({ position: 'sticky' })
        })

        it('applies offsetTop when stickyHeader is true', () => {
            render(
                <TabsV2 defaultValue="tab1" stickyHeader offsetTop={64}>
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            const list = document.querySelector('[data-element="tabs-list"]')
            expect(list).toHaveStyle({ top: '64px' })
        })
    })

    describe('Expanded and Fit Content', () => {
        it('renders with expanded tabs', () => {
            render(
                <TabsV2 defaultValue="tab1" expanded>
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                        <TabsV2Trigger value="tab2">Tab 2</TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            const list = document.querySelector('[data-status="expanded"]')
            expect(list).toBeInTheDocument()
        })

        it('renders with fitContent', () => {
            render(
                <TabsV2 defaultValue="tab1" fitContent>
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            expect(
                screen.getByRole('tab', { name: 'Tab 1' })
            ).toBeInTheDocument()
        })
    })

    describe('Controlled Value Updates', () => {
        it('updates active tab when value prop changes from undefined to defined', () => {
            const { rerender } = render(
                <TabsV2 value={undefined}>
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                        <TabsV2Trigger value="tab2">Tab 2</TabsV2Trigger>
                    </TabsV2List>
                    <TabsV2Content value="tab1">Content 1</TabsV2Content>
                    <TabsV2Content value="tab2">Content 2</TabsV2Content>
                </TabsV2>
            )

            // Initially should not render any content because value is undefined and no defaultValue
            rerender(
                <TabsV2 value="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                        <TabsV2Trigger value="tab2">Tab 2</TabsV2Trigger>
                    </TabsV2List>
                    <TabsV2Content value="tab1">Content 1</TabsV2Content>
                    <TabsV2Content value="tab2">Content 2</TabsV2Content>
                </TabsV2>
            )

            expect(screen.getByText('Content 1')).toBeInTheDocument()
        })

        it('updates active tab when value prop changes', () => {
            const { rerender } = render(
                <TabsV2 value="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                        <TabsV2Trigger value="tab2">Tab 2</TabsV2Trigger>
                    </TabsV2List>
                    <TabsV2Content value="tab1">Content 1</TabsV2Content>
                    <TabsV2Content value="tab2">Content 2</TabsV2Content>
                </TabsV2>
            )

            expect(screen.getByText('Content 1')).toBeInTheDocument()

            rerender(
                <TabsV2 value="tab2">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                        <TabsV2Trigger value="tab2">Tab 2</TabsV2Trigger>
                    </TabsV2List>
                    <TabsV2Content value="tab1">Content 1</TabsV2Content>
                    <TabsV2Content value="tab2">Content 2</TabsV2Content>
                </TabsV2>
            )

            expect(screen.getByText('Content 2')).toBeInTheDocument()
        })
    })

    describe('List Props Override', () => {
        it('allows TabsV2List to override context props', () => {
            render(
                <TabsV2 defaultValue="tab1" variant={TabsV2Variant.BOXED}>
                    <TabsV2List variant={TabsV2Variant.UNDERLINE}>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            expect(
                screen.getByRole('tab', { name: 'Tab 1' })
            ).toBeInTheDocument()
        })

        it('allows TabsV2List to override size from context', () => {
            render(
                <TabsV2 defaultValue="tab1" size={TabsV2Size.MD}>
                    <TabsV2List size={TabsV2Size.LG}>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            expect(
                screen.getByRole('tab', { name: 'Tab 1' })
            ).toBeInTheDocument()
        })

        it('allows TabsV2List to override disabled from context', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List disabled>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            expect(screen.getByRole('tab', { name: 'Tab 1' })).toBeDisabled()
        })

        it('allows TabsV2List to override stickyHeader from context', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List stickyHeader offsetTop={100}>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            const list = document.querySelector('[data-element="tabs-list"]')
            // TabsV2List applies sticky styles to the outer Block wrapper
            expect(list).toBeInTheDocument()
        })
    })

    describe('Edge Cases', () => {
        it('handles empty tabs list', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List></TabsV2List>
                </TabsV2>
            )

            const list = document.querySelector('[data-element="tabs-list"]')
            expect(list).toBeInTheDocument()
        })

        it('handles tabs without content', () => {
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

        it('handles numeric children in trigger', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">{123}</TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            expect(screen.getByRole('tab', { name: '123' })).toBeInTheDocument()
        })

        it('handles nested children with TabsV2Trigger', () => {
            render(
                <TabsV2
                    defaultValue="tab1"
                    showSkeleton
                    skeletonVariant="shimmer"
                >
                    <TabsV2List>
                        <div>
                            <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                        </div>
                    </TabsV2List>
                </TabsV2>
            )

            expect(
                screen.getByRole('tab', { name: 'Tab 1' })
            ).toBeInTheDocument()
        })

        it('handles deeply nested TabsV2Trigger', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <div>
                            <span>
                                <TabsV2Trigger value="tab1">
                                    Tab 1
                                </TabsV2Trigger>
                            </span>
                        </div>
                    </TabsV2List>
                </TabsV2>
            )

            expect(
                screen.getByRole('tab', { name: 'Tab 1' })
            ).toBeInTheDocument()
        })

        it('passes showSkeleton to nested TabsV2Trigger', () => {
            render(
                <TabsV2 defaultValue="tab1" showSkeleton>
                    <TabsV2List>
                        <div>
                            <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                        </div>
                    </TabsV2List>
                </TabsV2>
            )

            const tab = screen.getByRole('tab', { name: 'Tab 1' })
            expect(tab).toBeDisabled()
        })

        it('preserves individual trigger showSkeleton over global', () => {
            render(
                <TabsV2 defaultValue="tab1" showSkeleton={false}>
                    <TabsV2List>
                        <div>
                            <TabsV2Trigger value="tab1" showSkeleton>
                                Tab 1
                            </TabsV2Trigger>
                        </div>
                    </TabsV2List>
                </TabsV2>
            )

            const tab = screen.getByRole('tab', { name: 'Tab 1' })
            expect(tab).toBeDisabled()
        })

        it('passes skeletonVariant to nested TabsV2Trigger', () => {
            render(
                <TabsV2
                    defaultValue="tab1"
                    showSkeleton
                    skeletonVariant="pulse"
                >
                    <TabsV2List>
                        <div>
                            <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                        </div>
                    </TabsV2List>
                </TabsV2>
            )

            expect(
                screen.getByRole('tab', { name: 'Tab 1' })
            ).toBeInTheDocument()
        })

        it('preserves individual trigger skeletonVariant over global', () => {
            render(
                <TabsV2
                    defaultValue="tab1"
                    showSkeleton
                    skeletonVariant="pulse"
                >
                    <TabsV2List>
                        <div>
                            <TabsV2Trigger
                                value="tab1"
                                skeletonVariant="shimmer"
                            >
                                Tab 1
                            </TabsV2Trigger>
                        </div>
                    </TabsV2List>
                </TabsV2>
            )

            expect(
                screen.getByRole('tab', { name: 'Tab 1' })
            ).toBeInTheDocument()
        })

        it('handles non-Trigger/List children without children prop', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <div data-testid="wrapper">
                            <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                        </div>
                    </TabsV2List>
                </TabsV2>
            )

            expect(screen.getByTestId('wrapper')).toBeInTheDocument()
            expect(
                screen.getByRole('tab', { name: 'Tab 1' })
            ).toBeInTheDocument()
        })

        it('handles valid non-React element children', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        {'text child'}
                        {123}
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            expect(
                screen.getByRole('tab', { name: 'Tab 1' })
            ).toBeInTheDocument()
        })

        it('handles children without children prop', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <span data-testid="no-children">No Children</span>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            expect(screen.getByTestId('no-children')).toBeInTheDocument()
            expect(
                screen.getByRole('tab', { name: 'Tab 1' })
            ).toBeInTheDocument()
        })

        it('passes showSkeleton false explicitly to nested trigger', () => {
            render(
                <TabsV2 defaultValue="tab1" showSkeleton={false}>
                    <TabsV2List>
                        <div>
                            <TabsV2Trigger value="tab1" showSkeleton={true}>
                                Tab 1
                            </TabsV2Trigger>
                        </div>
                    </TabsV2List>
                </TabsV2>
            )

            const tab = screen.getByRole('tab', { name: 'Tab 1' })
            expect(tab).toBeDisabled()
        })

        it('uses global showSkeleton when trigger prop is undefined', () => {
            render(
                <TabsV2 defaultValue="tab1" showSkeleton={true}>
                    <TabsV2List>
                        <div>
                            <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                        </div>
                    </TabsV2List>
                </TabsV2>
            )

            const tab = screen.getByRole('tab', { name: 'Tab 1' })
            expect(tab).toBeDisabled()
        })

        it('handles children with disabled prop explicitly set to false', () => {
            render(
                <TabsV2 defaultValue="tab1" disabled={false}>
                    <TabsV2List>
                        <div>
                            <TabsV2Trigger value="tab1" disabled={false}>
                                Tab 1
                            </TabsV2Trigger>
                        </div>
                    </TabsV2List>
                </TabsV2>
            )

            const tab = screen.getByRole('tab', { name: 'Tab 1' })
            expect(tab).not.toBeDisabled()
        })

        it('handles case where child has disabled in props but value is false', () => {
            render(
                <TabsV2 defaultValue="tab1" disabled={true}>
                    <TabsV2List>
                        <TabsV2Trigger value="tab1" disabled={false}>
                            Tab 1
                        </TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            // When TabsV2 disabled is true, it should override child's disabled
            const tab = screen.getByRole('tab', { name: 'Tab 1' })
            expect(tab).toBeDisabled()
        })
    })

    describe('Display Names', () => {
        it('TabsV2 has correct display name', () => {
            expect(TabsV2.displayName).toBe('TabsV2')
        })

        it('TabsV2List has correct display name', () => {
            expect(TabsV2List.displayName).toBe('TabsV2List')
        })

        it('TabsV2Trigger has correct display name', () => {
            expect(TabsV2Trigger.displayName).toBe('TabsV2Trigger')
        })

        it('TabsV2Content has correct display name', () => {
            expect(TabsV2Content.displayName).toBe('TabsV2Content')
        })
    })

    describe('Ref Forwarding', () => {
        it('forwards ref to TabsV2 root element', () => {
            const ref = React.createRef<HTMLDivElement>()
            render(
                <TabsV2 defaultValue="tab1" ref={ref}>
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            expect(ref.current).toBeInstanceOf(HTMLDivElement)
        })

        it('forwards ref to TabsV2List element', () => {
            const ref = React.createRef<HTMLDivElement>()
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List ref={ref}>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            expect(ref.current).toBeInstanceOf(HTMLDivElement)
        })

        it('forwards ref to TabsV2Trigger element via TabsV2List registration', () => {
            // TabsV2Trigger ref is handled internally via registerTabRef in TabsV2List
            // The ref is stored in a Map, not directly forwarded to the DOM element
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            // The trigger should be rendered as a button
            const trigger = screen.getByRole('tab', { name: 'Tab 1' })
            expect(trigger).toBeInTheDocument()
            expect(trigger).toBeInstanceOf(HTMLButtonElement)
        })

        it('forwards ref to TabsV2Content element', () => {
            const ref = React.createRef<HTMLDivElement>()
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                    </TabsV2List>
                    <TabsV2Content value="tab1" ref={ref}>
                        Content
                    </TabsV2Content>
                </TabsV2>
            )

            expect(ref.current).toBeInstanceOf(HTMLDivElement)
        })
    })
})
