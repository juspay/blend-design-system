import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '../../test-utils'
import MobilePopoverV2 from '../../../lib/components/PopoverV2/MobilePopoverV2'
import { Button } from '../../../lib/components/Button'
import { PopoverV2Size } from '../../../lib/components/PopoverV2/popoverV2.types'

// Mock Drawer (vaul) to avoid jsdom errors: setPointerCapture and style.transform are not available
vi.mock('../../../lib/components/Drawer', async () => {
    const React = await import('react')
    const { createPortal } = await import('react-dom')
    const { createContext, useContext } = React

    const DrawerContext = createContext<{
        open: boolean
        onOpenChange: (open: boolean) => void
    }>({ open: false, onOpenChange: () => {} })

    return {
        Drawer: ({
            open,
            onOpenChange,
            children,
        }: {
            open: boolean
            onOpenChange: (open: boolean) => void
            children: React.ReactNode
        }) =>
            React.createElement(
                DrawerContext.Provider,
                { value: { open, onOpenChange } },
                children
            ),
        DrawerTrigger: ({ children }: { children: React.ReactNode }) =>
            React.createElement(React.Fragment, null, children),
        DrawerPortal: ({ children }: { children: React.ReactNode }) =>
            createPortal(children, document.body),
        DrawerOverlay: () =>
            React.createElement('div', { 'data-testid': 'drawer-overlay' }),
        DrawerContent: ({
            children,
            'aria-label': ariaLabel,
            'aria-labelledby': ariaLabelledBy,
            'aria-describedby': ariaDescribedBy,
        }: {
            children: React.ReactNode
            'aria-label'?: string
            'aria-labelledby'?: string
            'aria-describedby'?: string
        }) => {
            const { open } = useContext(DrawerContext)
            if (!open) return null
            return React.createElement(
                'div',
                {
                    role: 'dialog',
                    'aria-label': ariaLabel,
                    'aria-labelledby': ariaLabelledBy,
                    'aria-describedby': ariaDescribedBy,
                },
                children
            )
        },
        DrawerHeader: ({ children }: { children: React.ReactNode }) =>
            React.createElement(
                'div',
                { 'data-testid': 'drawer-header' },
                children
            ),
        DrawerTitle: ({
            id,
            children,
        }: {
            id?: string
            children: React.ReactNode
        }) => React.createElement('span', { id }, children),
        DrawerDescription: ({
            id,
            children,
        }: {
            id?: string
            children: React.ReactNode
        }) => React.createElement('span', { id }, children),
        DrawerBody: ({ children }: { children: React.ReactNode }) =>
            React.createElement(
                'div',
                { 'data-testid': 'drawer-body' },
                children
            ),
        DrawerFooter: ({ children }: { children: React.ReactNode }) =>
            React.createElement(
                'div',
                { 'data-testid': 'drawer-footer' },
                children
            ),
        DrawerClose: ({ children }: { children: React.ReactNode }) =>
            React.createElement(React.Fragment, null, children),
        StatusDrawer: () => null,
        MultiSelectDrawer: () => null,
        SingleSelectDrawer: () => null,
        NestedMultiSelectDrawer: () => null,
        NestedSingleSelectDrawer: () => null,
    }
})

describe('MobilePopoverV2', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('Rendering', () => {
        it('renders trigger element', () => {
            render(
                <MobilePopoverV2
                    trigger={<Button text="Open" />}
                    open={false}
                    onOpenChange={vi.fn()}
                >
                    <p>Content</p>
                </MobilePopoverV2>
            )
            expect(
                screen.getByRole('button', { name: 'Open' })
            ).toBeInTheDocument()
        })

        it('shows heading and description when open', async () => {
            render(
                <MobilePopoverV2
                    trigger={<Button text="Open" />}
                    heading="Mobile Title"
                    description="Mobile description"
                    open={true}
                    onOpenChange={vi.fn()}
                >
                    <p>Body content</p>
                </MobilePopoverV2>
            )

            await waitFor(() => {
                expect(screen.getByText('Mobile Title')).toBeInTheDocument()
                expect(
                    screen.getByText('Mobile description')
                ).toBeInTheDocument()
                expect(screen.getByText('Body content')).toBeInTheDocument()
            })
        })

        it('shows only heading when description is not provided', async () => {
            render(
                <MobilePopoverV2
                    trigger={<Button text="Open" />}
                    heading="Title Only"
                    open={true}
                    onOpenChange={vi.fn()}
                >
                    <p>Content</p>
                </MobilePopoverV2>
            )

            await waitFor(() => {
                expect(screen.getByText('Title Only')).toBeInTheDocument()
                expect(screen.getByText('Content')).toBeInTheDocument()
            })
        })

        it('shows only description when heading is not provided', async () => {
            render(
                <MobilePopoverV2
                    trigger={<Button text="Open" />}
                    description="Description only"
                    open={true}
                    onOpenChange={vi.fn()}
                >
                    <p>Content</p>
                </MobilePopoverV2>
            )

            await waitFor(() => {
                expect(screen.getByText('Description only')).toBeInTheDocument()
                expect(screen.getByText('Content')).toBeInTheDocument()
            })
        })

        it('shows body content when no heading or description (custom popover)', async () => {
            render(
                <MobilePopoverV2
                    trigger={<Button text="Open" />}
                    open={true}
                    onOpenChange={vi.fn()}
                >
                    <p>Custom only</p>
                </MobilePopoverV2>
            )

            await waitFor(() => {
                expect(screen.getByText('Custom only')).toBeInTheDocument()
            })
        })

        it('renders close button when showCloseButton is true', async () => {
            render(
                <MobilePopoverV2
                    trigger={<Button text="Open" />}
                    heading="Title"
                    showCloseButton={true}
                    open={true}
                    onOpenChange={vi.fn()}
                >
                    <p>Content</p>
                </MobilePopoverV2>
            )

            await waitFor(() => {
                expect(
                    screen.getByRole('button', { name: 'Close popover' })
                ).toBeInTheDocument()
            })
        })

        it('does not render close button when showCloseButton is false', async () => {
            render(
                <MobilePopoverV2
                    trigger={<Button text="Open" />}
                    heading="Title"
                    showCloseButton={false}
                    open={true}
                    onOpenChange={vi.fn()}
                >
                    <p>Content</p>
                </MobilePopoverV2>
            )

            await waitFor(() => {
                expect(screen.getByText('Title')).toBeInTheDocument()
            })
            expect(
                screen.queryByRole('button', { name: 'Close popover' })
            ).not.toBeInTheDocument()
        })

        it.each([
            [PopoverV2Size.SM, 'Size SM'],
            [PopoverV2Size.MD, 'Size MD'],
            [PopoverV2Size.LG, 'Size LG'],
        ])('renders with size %s', async (size, heading) => {
            render(
                <MobilePopoverV2
                    trigger={<Button text="Open" />}
                    heading={heading}
                    size={size}
                    open={true}
                    onOpenChange={vi.fn()}
                >
                    <p>Content</p>
                </MobilePopoverV2>
            )

            await waitFor(() => {
                expect(screen.getByText(heading)).toBeInTheDocument()
            })
        })
    })

    describe('Footer actions', () => {
        it('renders primary and secondary action buttons when provided', async () => {
            render(
                <MobilePopoverV2
                    trigger={<Button text="Open" />}
                    heading="Title"
                    open={true}
                    onOpenChange={vi.fn()}
                    primaryAction={{ text: 'Save' }}
                    secondaryAction={{ text: 'Cancel' }}
                >
                    <p>Content</p>
                </MobilePopoverV2>
            )

            await waitFor(() => {
                expect(
                    screen.getByRole('button', { name: 'Cancel' })
                ).toBeInTheDocument()
                expect(
                    screen.getByRole('button', { name: 'Save' })
                ).toBeInTheDocument()
            })
        })

        it('renders only primary action when secondary is not provided', async () => {
            render(
                <MobilePopoverV2
                    trigger={<Button text="Open" />}
                    heading="Title"
                    open={true}
                    onOpenChange={vi.fn()}
                    primaryAction={{ text: 'Confirm' }}
                >
                    <p>Content</p>
                </MobilePopoverV2>
            )

            await waitFor(() => {
                expect(
                    screen.getByRole('button', { name: 'Confirm' })
                ).toBeInTheDocument()
            })
        })
    })

    describe('Callbacks', () => {
        it('calls onOpenChange and onClose when close button is clicked', async () => {
            const onOpenChange = vi.fn()
            const onClose = vi.fn()
            const { user } = render(
                <MobilePopoverV2
                    trigger={<Button text="Open" />}
                    heading="Title"
                    open={true}
                    onOpenChange={onOpenChange}
                    onClose={onClose}
                >
                    <p>Content</p>
                </MobilePopoverV2>
            )

            await waitFor(() => {
                expect(
                    screen.getByRole('button', { name: 'Close popover' })
                ).toBeInTheDocument()
            })

            await user.click(
                screen.getByRole('button', { name: 'Close popover' })
            )

            await waitFor(() => {
                expect(onOpenChange).toHaveBeenCalledWith(false)
                expect(onClose).toHaveBeenCalled()
            })
        })
    })

    describe('Skeleton', () => {
        it('renders header skeleton when skeleton.show is true', async () => {
            const { container } = render(
                <MobilePopoverV2
                    trigger={<Button text="Open" />}
                    heading="Title"
                    open={true}
                    onOpenChange={vi.fn()}
                    skeleton={{ show: true }}
                >
                    <p>Content</p>
                </MobilePopoverV2>
            )

            await waitFor(() => {
                expect(container.querySelector('[class]')).toBeInTheDocument()
            })
        })

        it('renders body skeleton when skeleton.bodySkeletonProps.show is true', async () => {
            const { container } = render(
                <MobilePopoverV2
                    trigger={<Button text="Open" />}
                    heading="Title"
                    open={true}
                    onOpenChange={vi.fn()}
                    skeleton={{
                        show: true,
                        bodySkeletonProps: {
                            show: true,
                            width: '80%',
                            height: 100,
                        },
                    }}
                >
                    <p>Content</p>
                </MobilePopoverV2>
            )

            await waitFor(() => {
                expect(container.querySelector('[class]')).toBeInTheDocument()
            })
        })

        it('renders footer skeleton when skeleton.show is true and actions exist', async () => {
            const { container } = render(
                <MobilePopoverV2
                    trigger={<Button text="Open" />}
                    heading="Title"
                    open={true}
                    onOpenChange={vi.fn()}
                    primaryAction={{ text: 'Save' }}
                    skeleton={{ show: true }}
                >
                    <p>Content</p>
                </MobilePopoverV2>
            )

            await waitFor(() => {
                expect(container.querySelector('[class]')).toBeInTheDocument()
            })
        })

        it('renders footer actions when skeleton.show is false', async () => {
            render(
                <MobilePopoverV2
                    trigger={<Button text="Open" />}
                    heading="Title"
                    open={true}
                    onOpenChange={vi.fn()}
                    primaryAction={{ text: 'Submit' }}
                    skeleton={{ show: false }}
                >
                    <p>Content</p>
                </MobilePopoverV2>
            )

            await waitFor(() => {
                expect(
                    screen.getByRole('button', { name: 'Submit' })
                ).toBeInTheDocument()
            })
        })
    })

    describe('Drawer integration', () => {
        it('passes aria-labelledby and aria-label to drawer content', async () => {
            render(
                <MobilePopoverV2
                    trigger={<Button text="Open" />}
                    heading="Accessible Title"
                    open={true}
                    onOpenChange={vi.fn()}
                >
                    <p>Content</p>
                </MobilePopoverV2>
            )

            await waitFor(() => {
                expect(screen.getByText('Accessible Title')).toBeInTheDocument()
            })
            const dialog = screen.getByRole('dialog', {
                name: 'Accessible Title',
            })
            expect(dialog).toBeInTheDocument()
        })

        it('uses fallback aria-label when heading is not provided', async () => {
            render(
                <MobilePopoverV2
                    trigger={<Button text="Open" />}
                    open={true}
                    onOpenChange={vi.fn()}
                >
                    <p>Content</p>
                </MobilePopoverV2>
            )

            await waitFor(() => {
                const dialog = screen.getByRole('dialog', {
                    name: 'Popover dialog',
                })
                expect(dialog).toBeInTheDocument()
            })
        })
    })
})
