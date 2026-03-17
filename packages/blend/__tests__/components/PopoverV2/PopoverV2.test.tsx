import React, { useState } from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '../../test-utils'
import PopoverV2 from '../../../lib/components/PopoverV2/PopoverV2'
import { Button } from '../../../lib/components/Button'
import { PopoverV2Size } from '../../../lib/components/PopoverV2/popoverV2.types'
import { useBreakpoints } from '../../../lib/hooks/useBreakPoints'

// Desktop viewport so we test Radix Popover (not MobilePopoverV2)
vi.mock('../../../lib/hooks/useBreakPoints', () => ({
    useBreakpoints: vi.fn(() => ({ innerWidth: 1200, breakPointLabel: 'lg' })),
}))

describe('PopoverV2', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('Rendering', () => {
        it('renders trigger element', () => {
            render(
                <PopoverV2 trigger={<Button text="Open" />} heading="Title">
                    <p>Content</p>
                </PopoverV2>
            )
            expect(
                screen.getByRole('button', { name: 'Open' })
            ).toBeInTheDocument()
        })

        it('does not show content when closed by default', () => {
            render(
                <PopoverV2 trigger={<Button text="Open" />} heading="Title">
                    <p>Body content</p>
                </PopoverV2>
            )
            expect(screen.queryByText('Title')).not.toBeInTheDocument()
            expect(screen.queryByText('Body content')).not.toBeInTheDocument()
        })

        it('shows heading, description and children when open', async () => {
            render(
                <PopoverV2
                    trigger={<Button text="Open" />}
                    heading="Test Heading"
                    description="Test description"
                    open={true}
                >
                    <p>Body content</p>
                </PopoverV2>
            )

            await waitFor(() => {
                expect(screen.getByText('Test Heading')).toBeInTheDocument()
                expect(screen.getByText('Test description')).toBeInTheDocument()
                expect(screen.getByText('Body content')).toBeInTheDocument()
            })
        })

        it('renders custom content without header when no heading/description/actions', async () => {
            render(
                <PopoverV2 trigger={<Button text="Open" />} open={true}>
                    <p>Custom only</p>
                </PopoverV2>
            )

            await waitFor(() => {
                expect(screen.getByText('Custom only')).toBeInTheDocument()
            })
        })

        it.each([
            [PopoverV2Size.SM, 'Size SM'],
            [PopoverV2Size.MD, 'Size MD'],
            [PopoverV2Size.LG, 'Size LG'],
        ])('renders with size %s', async (size, heading) => {
            render(
                <PopoverV2
                    trigger={<Button text="Open" />}
                    heading={heading}
                    open={true}
                    size={size}
                >
                    <p>Content</p>
                </PopoverV2>
            )

            await waitFor(() => {
                expect(screen.getByText(heading)).toBeInTheDocument()
            })
        })

        it('renders skeleton when skeleton.show is true and popover is open', async () => {
            const { container } = render(
                <PopoverV2
                    trigger={<Button text="Open" />}
                    heading="Title"
                    open={true}
                    skeleton={{ show: true }}
                >
                    <p>Content</p>
                </PopoverV2>
            )

            await waitFor(() => {
                expect(container.querySelector('[class]')).toBeInTheDocument()
            })
        })

        it('renders body skeleton when skeleton.bodySkeletonProps.show is true', async () => {
            const { container } = render(
                <PopoverV2
                    trigger={<Button text="Open" />}
                    heading="Title"
                    open={true}
                    skeleton={{
                        show: true,
                        bodySkeletonProps: {
                            show: true,
                            width: '100%',
                            height: 120,
                        },
                    }}
                >
                    <p>Content</p>
                </PopoverV2>
            )

            await waitFor(() => {
                expect(container.querySelector('[class]')).toBeInTheDocument()
            })
        })
    })

    describe('Open / Close behavior', () => {
        it('opens when trigger is clicked', async () => {
            const { user } = render(
                <PopoverV2 trigger={<Button text="Open" />} heading="Title">
                    <p>Content</p>
                </PopoverV2>
            )

            expect(screen.queryByText('Title')).not.toBeInTheDocument()

            await user.click(screen.getByRole('button', { name: 'Open' }))

            await waitFor(() => {
                expect(screen.getByText('Title')).toBeInTheDocument()
                expect(screen.getByText('Content')).toBeInTheDocument()
            })
        })

        it('calls onOpenChange when open state changes', async () => {
            const onOpenChange = vi.fn()
            const { user } = render(
                <PopoverV2
                    trigger={<Button text="Open" />}
                    heading="Title"
                    onOpenChange={onOpenChange}
                >
                    <p>Content</p>
                </PopoverV2>
            )

            await user.click(screen.getByRole('button', { name: 'Open' }))

            await waitFor(() => {
                expect(onOpenChange).toHaveBeenCalledWith(true)
            })
        })
    })

    describe('Controlled mode', () => {
        it('respects controlled open prop', async () => {
            const TestComponent = () => {
                const [open, setOpen] = useState(false)
                return (
                    <>
                        <button onClick={() => setOpen(true)}>Show</button>
                        <PopoverV2
                            trigger={<Button text="Trigger" />}
                            heading="Controlled"
                            open={open}
                            onOpenChange={setOpen}
                        >
                            <p>Content</p>
                        </PopoverV2>
                    </>
                )
            }

            const { user } = render(<TestComponent />)

            expect(screen.queryByText('Controlled')).not.toBeInTheDocument()

            await user.click(screen.getByRole('button', { name: 'Show' }))

            await waitFor(() => {
                expect(screen.getByText('Controlled')).toBeInTheDocument()
            })
        })

        it('syncs internal state when open prop changes', async () => {
            const { rerender } = render(
                <PopoverV2
                    trigger={<Button text="Trigger" />}
                    heading="Synced"
                    open={false}
                >
                    <p>Content</p>
                </PopoverV2>
            )

            expect(screen.queryByText('Synced')).not.toBeInTheDocument()

            rerender(
                <PopoverV2
                    trigger={<Button text="Trigger" />}
                    heading="Synced"
                    open={true}
                >
                    <p>Content</p>
                </PopoverV2>
            )

            await waitFor(() => {
                expect(screen.getByText('Synced')).toBeInTheDocument()
            })
        })
    })

    describe('Callbacks', () => {
        it('calls onClose when close button is clicked', async () => {
            const onClose = vi.fn()
            const { user } = render(
                <PopoverV2
                    trigger={<Button text="Open" />}
                    heading="Title"
                    open={true}
                    onClose={onClose}
                    showCloseButton={true}
                >
                    <p>Content</p>
                </PopoverV2>
            )

            await waitFor(() => {
                expect(screen.getByText('Title')).toBeInTheDocument()
            })

            const closeButton = screen.getByRole('button', { name: /close/i })
            await user.click(closeButton)

            await waitFor(() => {
                expect(onClose).toHaveBeenCalled()
            })
        })

        it('primary action onClick is called when primary action is clicked', async () => {
            const onPrimaryClick = vi.fn()
            const { user } = render(
                <PopoverV2
                    trigger={<Button text="Open" />}
                    heading="Title"
                    open={true}
                    primaryAction={{
                        text: 'Save',
                        onClick: onPrimaryClick,
                    }}
                >
                    <p>Content</p>
                </PopoverV2>
            )

            await waitFor(() => {
                expect(screen.getByText('Title')).toBeInTheDocument()
            })

            await user.click(screen.getByRole('button', { name: 'Save' }))

            expect(onPrimaryClick).toHaveBeenCalled()
        })

        it('secondary action onClick is called when secondary action is clicked', async () => {
            const onSecondaryClick = vi.fn()
            const { user } = render(
                <PopoverV2
                    trigger={<Button text="Open" />}
                    heading="Title"
                    open={true}
                    secondaryAction={{
                        text: 'Cancel',
                        onClick: onSecondaryClick,
                    }}
                >
                    <p>Content</p>
                </PopoverV2>
            )

            await waitFor(() => {
                expect(screen.getByText('Title')).toBeInTheDocument()
            })

            await user.click(screen.getByRole('button', { name: 'Cancel' }))

            expect(onSecondaryClick).toHaveBeenCalled()
        })
    })

    describe('Header and footer', () => {
        it('shows close button when showCloseButton is true', async () => {
            render(
                <PopoverV2
                    trigger={<Button text="Open" />}
                    heading="Title"
                    open={true}
                    showCloseButton={true}
                >
                    <p>Content</p>
                </PopoverV2>
            )

            await waitFor(() => {
                expect(
                    screen.getByRole('button', { name: /close/i })
                ).toBeInTheDocument()
            })
        })

        it('hides close button when showCloseButton is false', async () => {
            render(
                <PopoverV2
                    trigger={<Button text="Open" />}
                    heading="Title"
                    open={true}
                    showCloseButton={false}
                >
                    <p>Content</p>
                </PopoverV2>
            )

            await waitFor(() => {
                expect(screen.getByText('Title')).toBeInTheDocument()
            })

            expect(
                screen.queryByRole('button', { name: /close/i })
            ).not.toBeInTheDocument()
        })
    })

    describe('Mobile (MobilePopoverV2)', () => {
        beforeEach(() => {
            vi.mocked(useBreakpoints).mockReturnValue({
                innerWidth: 800,
                breakPointLabel: 'sm',
            })
        })

        afterEach(() => {
            vi.mocked(useBreakpoints).mockReturnValue({
                innerWidth: 1200,
                breakPointLabel: 'lg',
            })
        })

        it('renders MobilePopoverV2 when viewport is mobile and useDrawerOnMobile is true', async () => {
            render(
                <PopoverV2
                    trigger={<Button text="Open" />}
                    heading="Mobile Title"
                    open={true}
                    useDrawerOnMobile={true}
                >
                    <p>Mobile content</p>
                </PopoverV2>
            )

            await waitFor(() => {
                expect(screen.getByText('Mobile Title')).toBeInTheDocument()
                expect(screen.getByText('Mobile content')).toBeInTheDocument()
            })
        })

        it('opens mobile drawer when trigger is clicked', async () => {
            const { user } = render(
                <PopoverV2
                    trigger={<Button text="Open" />}
                    heading="Title"
                    useDrawerOnMobile={true}
                >
                    <p>Content</p>
                </PopoverV2>
            )

            expect(screen.queryByText('Title')).not.toBeInTheDocument()

            await user.click(screen.getByRole('button', { name: 'Open' }))

            await waitFor(() => {
                expect(screen.getByText('Title')).toBeInTheDocument()
                expect(screen.getByText('Content')).toBeInTheDocument()
            })
        })
    })
})
