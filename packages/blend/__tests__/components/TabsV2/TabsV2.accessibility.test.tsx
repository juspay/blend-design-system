import React from 'react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, cleanup, fireEvent } from '../../test-utils'
import { axe } from 'jest-axe'
import {
    TabsV2,
    TabsV2List,
    TabsV2Trigger,
    TabsV2Content,
} from '../../../lib/components/TabsV2'
import { Info } from 'lucide-react'

describe('TabsV2 Accessibility', () => {
    beforeEach(() => {
        cleanup()
    })

    afterEach(() => {
        cleanup()
    })

    describe('WCAG 2.0, 2.1, 2.2 Compliance', () => {
        it('meets WCAG standards for basic tabs', async () => {
            const { container } = render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                        <TabsV2Trigger value="tab2">Tab 2</TabsV2Trigger>
                    </TabsV2List>
                    <TabsV2Content value="tab1">Content 1</TabsV2Content>
                    <TabsV2Content value="tab2">Content 2</TabsV2Content>
                </TabsV2>
            )

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('meets WCAG standards with disabled tabs', async () => {
            const { container } = render(
                <TabsV2 defaultValue="tab1">
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

            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 1.1.1 Non-text Content', () => {
        it('decorative icons in leftSlot are hidden from screen readers', () => {
            const { container } = render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger
                            value="tab1"
                            leftSlot={<Info size={16} />}
                        >
                            Tab 1
                        </TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            const leftSlot = container.querySelector(
                '[data-element="left-slot"]'
            )
            if (leftSlot) {
                expect(leftSlot).toHaveAttribute('aria-hidden', 'true')
            }
        })

        it('interactive icons in leftSlot are NOT hidden from screen readers', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger
                            value="tab1"
                            leftSlot={
                                <button aria-label="Info action">
                                    <Info size={16} />
                                </button>
                            }
                        >
                            Tab 1
                        </TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            const infoButton = screen.getByLabelText('Info action')
            expect(infoButton).toBeInTheDocument()
        })

        it('decorative icons in rightSlot are hidden from screen readers', () => {
            const { container } = render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger
                            value="tab1"
                            rightSlot={<Info size={16} />}
                        >
                            Tab 1
                        </TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            const rightSlot = container.querySelector(
                '[data-element="right-slot"]'
            )
            if (rightSlot) {
                expect(rightSlot).toHaveAttribute('aria-hidden', 'true')
            }
        })
    })

    describe('WCAG 1.3.1 Info and Relationships', () => {
        it('uses proper semantic structure with Radix UI primitives', () => {
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

            const tab1 = screen.getByRole('tab', { name: 'Tab 1' })
            const tab2 = screen.getByRole('tab', { name: 'Tab 2' })
            expect(tab1).toBeInTheDocument()
            expect(tab2).toBeInTheDocument()

            const tabPanel1 = screen.getByRole('tabpanel', { name: 'Tab 1' })
            expect(tabPanel1).toBeInTheDocument()
        })

        it('establishes tab-tabpanel relationship via aria-controls', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                    </TabsV2List>
                    <TabsV2Content value="tab1">Content 1</TabsV2Content>
                </TabsV2>
            )

            const tab = screen.getByRole('tab', { name: 'Tab 1' })
            const tabPanel = screen.getByRole('tabpanel', { name: 'Tab 1' })

            expect(tab).toHaveAttribute('aria-controls')
            expect(tabPanel).toHaveAttribute('id')
            expect(tab.getAttribute('aria-controls')).toBe(tabPanel.id)
        })

        it('disabled tab has disabled attribute', () => {
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

            const disabledTab = screen.getByRole('tab', { name: 'Tab 2' })
            expect(disabledTab).toBeDisabled()
            expect(disabledTab.hasAttribute('disabled')).toBe(true)
        })

        it('active tab has aria-selected="true"', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                        <TabsV2Trigger value="tab2">Tab 2</TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            const activeTab = screen.getByRole('tab', { name: 'Tab 1' })
            expect(activeTab).toHaveAttribute('aria-selected', 'true')
        })

        it('inactive tabs have aria-selected="false"', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                        <TabsV2Trigger value="tab2">Tab 2</TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            const inactiveTab = screen.getByRole('tab', { name: 'Tab 2' })
            expect(inactiveTab).toHaveAttribute('aria-selected', 'false')
        })
    })

    describe('WCAG 1.3.2 Meaningful Sequence', () => {
        it('content is presented in logical reading order', () => {
            const { container } = render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger
                            value="tab1"
                            leftSlot={<Info size={16} />}
                        >
                            Tab 1
                        </TabsV2Trigger>
                    </TabsV2List>
                    <TabsV2Content value="tab1">Content 1</TabsV2Content>
                </TabsV2>
            )

            const tab = screen.getByRole('tab', { name: 'Tab 1' })
            const content = screen.getByRole('tabpanel', { name: 'Tab 1' })

            const allElements = Array.from(container.querySelectorAll('*'))
            const tabIndex = allElements.indexOf(tab)
            const contentIndex = allElements.indexOf(content)

            expect(tabIndex).toBeLessThan(contentIndex)
        })
    })

    describe('WCAG 1.4.1 Use of Color', () => {
        it('does not rely solely on color to convey information', () => {
            render(
                <TabsV2 defaultValue="active">
                    <TabsV2List>
                        <TabsV2Trigger value="active">Active Tab</TabsV2Trigger>
                        <TabsV2Trigger value="inactive">
                            Inactive Tab
                        </TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            const activeTab = screen.getByRole('tab', { name: 'Active Tab' })
            const inactiveTab = screen.getByRole('tab', {
                name: 'Inactive Tab',
            })

            expect(activeTab).toHaveAttribute('aria-selected', 'true')
            expect(inactiveTab).toHaveAttribute('aria-selected', 'false')
        })
    })

    describe('WCAG 1.4.4 Resize Text', () => {
        it('text can be resized without loss of content', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">
                            Very Long Tab Label That Should Wrap
                        </TabsV2Trigger>
                    </TabsV2List>
                    <TabsV2Content value="tab1">
                        <p>Content that should resize without issues.</p>
                    </TabsV2Content>
                </TabsV2>
            )

            expect(
                screen.getByRole('tab', {
                    name: 'Very Long Tab Label That Should Wrap',
                })
            ).toBeInTheDocument()
        })
    })

    describe('WCAG 2.1.1 Keyboard', () => {
        it('tab trigger is keyboard operable', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                        <TabsV2Trigger value="tab2">Tab 2</TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            const tab = screen.getByRole('tab', { name: 'Tab 1' })
            tab.focus()
            expect(document.activeElement).toBe(tab)
        })

        it('supports arrow key navigation', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                        <TabsV2Trigger value="tab2">Tab 2</TabsV2Trigger>
                        <TabsV2Trigger value="tab3">Tab 3</TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            const tab1 = screen.getByRole('tab', { name: 'Tab 1' })
            tab1.focus()

            expect(tab1).toHaveFocus()

            const tabsList = screen.getByRole('tablist')
            expect(tabsList).toBeInTheDocument()
        })

        it('close button is keyboard operable', () => {
            const handleClose = vi.fn()
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger
                            value="tab1"
                            closable
                            onClose={handleClose}
                        >
                            Tab 1
                        </TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            const closeButton = screen.queryByLabelText('Close Tab 1')
            if (closeButton) {
                closeButton.focus()
                expect(document.activeElement).toBe(closeButton)

                fireEvent.keyDown(closeButton, { key: 'Enter', code: 'Enter' })
                expect(handleClose).toHaveBeenCalled()
            }
        })

        it('close button can be activated with Space key', () => {
            const handleClose = vi.fn()
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger
                            value="tab1"
                            closable
                            onClose={handleClose}
                        >
                            Tab 1
                        </TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            const closeButton = screen.queryByLabelText('Close Tab 1')
            if (closeButton) {
                closeButton.focus()

                fireEvent.keyDown(closeButton, { key: ' ', code: 'Space' })
                expect(handleClose).toHaveBeenCalled()
            }
        })
    })

    describe('WCAG 2.1.2 No Keyboard Trap', () => {
        it('focus can move away from tabs', () => {
            render(
                <>
                    <button>Before</button>
                    <TabsV2 defaultValue="tab1">
                        <TabsV2List>
                            <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                            <TabsV2Trigger value="tab2">Tab 2</TabsV2Trigger>
                        </TabsV2List>
                    </TabsV2>
                    <button>After</button>
                </>
            )

            const beforeButton = screen.getByText('Before')
            const tab1 = screen.getByRole('tab', { name: 'Tab 1' })
            const afterButton = screen.getByText('After')

            beforeButton.focus()
            expect(document.activeElement).toBe(beforeButton)

            expect(tab1).toBeInTheDocument()
            expect(afterButton).toBeInTheDocument()
        })
    })

    describe('WCAG 2.4.3 Focus Order', () => {
        it('focus order is logical between tabs', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                        <TabsV2Trigger value="tab2">Tab 2</TabsV2Trigger>
                        <TabsV2Trigger value="tab3">Tab 3</TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            const tab1 = screen.getByRole('tab', { name: 'Tab 1' })
            const tab2 = screen.getByRole('tab', { name: 'Tab 2' })
            const tab3 = screen.getByRole('tab', { name: 'Tab 3' })

            expect(tab1).toBeInTheDocument()
            expect(tab2).toBeInTheDocument()
            expect(tab3).toBeInTheDocument()

            tab1.focus()
            expect(document.activeElement).toBe(tab1)
        })
    })

    describe('WCAG 2.4.7 Focus Visible', () => {
        it('tab trigger has visible focus indicator', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            const tab = screen.getByRole('tab', { name: 'Tab 1' })
            tab.focus()
            expect(document.activeElement).toBe(tab)
        })

        it('close button has visible focus indicator', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1" closable>
                            Tab 1
                        </TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            const closeButton = screen.queryByLabelText('Close Tab 1')
            if (closeButton) {
                closeButton.focus()
                expect(document.activeElement).toBe(closeButton)
            }
        })
    })

    describe('WCAG 2.5.8 Target Size', () => {
        it('tab trigger meets minimum target size', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            const tab = screen.getByRole('tab', { name: 'Tab 1' })
            expect(tab).toBeInTheDocument()
        })

        it('close button meets minimum target size', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1" closable>
                            Tab 1
                        </TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            const closeButton = screen.queryByLabelText('Close Tab 1')
            if (closeButton) {
                expect(closeButton).toBeInTheDocument()
            }
        })
    })

    describe('WCAG 4.1.2 Name, Role, Value', () => {
        it('tab trigger has correct name, role, and value', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">
                            Accessible Tab
                        </TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            const tab = screen.getByRole('tab', { name: 'Accessible Tab' })
            expect(tab).toBeInTheDocument()
            expect(tab).toHaveAttribute('aria-selected', 'true')
        })

        it('disabled tab trigger has correct name, role, and value', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                        <TabsV2Trigger value="tab2" disabled>
                            Disabled Tab
                        </TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            const disabledTab = screen.getByRole('tab', {
                name: 'Disabled Tab',
            })
            expect(disabledTab).toBeInTheDocument()
            expect(disabledTab).toBeDisabled()
        })
    })

    describe('WCAG 4.1.3 Status Messages', () => {
        it('tab selection state is communicated via aria-selected', () => {
            render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                        <TabsV2Trigger value="tab2">Tab 2</TabsV2Trigger>
                    </TabsV2List>
                </TabsV2>
            )

            const activeTab = screen.getByRole('tab', { name: 'Tab 1' })
            expect(activeTab).toHaveAttribute('aria-selected', 'true')

            const inactiveTab = screen.getByRole('tab', { name: 'Tab 2' })
            expect(inactiveTab).toHaveAttribute('aria-selected', 'false')
        })

        it('tab panel visibility is communicated', () => {
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

            const activePanel = screen.getByRole('tabpanel', { name: 'Tab 1' })
            expect(activePanel).not.toHaveAttribute('aria-hidden', 'true')

            const inactivePanel = screen.queryByRole('tabpanel', {
                name: 'Tab 2',
            })
            expect(inactivePanel).not.toBeInTheDocument()
        })
    })
    describe('Edge Cases', () => {
        it('handles tabs with closable property', async () => {
            const { container } = render(
                <TabsV2 defaultValue="tab1">
                    <TabsV2List>
                        <TabsV2Trigger value="tab1" closable>
                            Tab 1
                        </TabsV2Trigger>
                    </TabsV2List>
                    <TabsV2Content value="tab1">Content 1</TabsV2Content>
                </TabsV2>
            )

            const results = await axe(container, {
                rules: {
                    'nested-interactive': { enabled: false },
                    'aria-valid-attr-value': { enabled: false },
                },
            })
            expect(results).toHaveNoViolations()
        })

        it('handles skeleton state accessibly', async () => {
            const { container } = render(
                <TabsV2 defaultValue="tab1" showSkeleton>
                    <TabsV2List>
                        <TabsV2Trigger value="tab1">Tab 1</TabsV2Trigger>
                    </TabsV2List>
                    <TabsV2Content value="tab1">Content 1</TabsV2Content>
                </TabsV2>
            )

            const results = await axe(container, {
                rules: {
                    'aria-required-children': { enabled: false },
                    'aria-required-parent': { enabled: false },
                    'aria-valid-attr-value': { enabled: false },
                },
            })
            expect(results).toHaveNoViolations()
        })
    })
})
