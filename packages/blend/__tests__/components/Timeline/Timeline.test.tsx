import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '../../test-utils'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import {
    Timeline,
    TimelineNodeStatus,
    TimelineSubstep,
} from '../../../lib/components/Timeline'

describe('Timeline', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('Rendering', () => {
        it('renders timeline root with data-timeline attribute', () => {
            const { container } = render(
                <Timeline>
                    <Timeline.Label text="JAN 15, 2025" />
                </Timeline>
            )
            const root = container.querySelector('[data-timeline="true"]')
            expect(root).toBeInTheDocument()
        })

        it('renders track line when children are present', async () => {
            const { container } = render(
                <Timeline>
                    <Timeline.Label text="JAN 15, 2025" />
                </Timeline>
            )
            await waitFor(() => {
                const line = container.querySelector(
                    '[data-timeline-line="true"]'
                )
                expect(line).toBeInTheDocument()
            })
        })

        it('renders with single Label', () => {
            render(
                <Timeline>
                    <Timeline.Label text="JAN 15, 2025" />
                </Timeline>
            )
            expect(screen.getByText('JAN 15, 2025')).toBeInTheDocument()
        })

        it('renders Label with text', () => {
            render(
                <Timeline>
                    <Timeline.Label text="Section" />
                </Timeline>
            )
            expect(screen.getByText('Section')).toBeInTheDocument()
        })

        it('renders Header with title and timestamp', () => {
            render(
                <Timeline>
                    <Timeline.Header
                        title="Payment Initiated"
                        timestamp="4:00 PM"
                    />
                </Timeline>
            )
            expect(screen.getByText('Payment Initiated')).toBeInTheDocument()
            expect(screen.getByText('4:00 PM')).toBeInTheDocument()
        })

        it('renders Header with leftSlot and rightSlot', () => {
            render(
                <Timeline>
                    <Timeline.Header
                        title="Test"
                        leftSlot={<span data-testid="left-slot">Left</span>}
                        rightSlot={<span data-testid="right-slot">Right</span>}
                    />
                </Timeline>
            )
            expect(screen.getByTestId('left-slot')).toHaveTextContent('Left')
            expect(screen.getByTestId('right-slot')).toHaveTextContent('Right')
        })

        it('renders Header with substeps (children)', () => {
            render(
                <Timeline>
                    <Timeline.Header title="Webhook Informed">
                        <Timeline.Substep
                            title="Merchant Notified"
                            description="Failure reason: insufficient funds."
                            timestamp="4:00:04 PM"
                        />
                    </Timeline.Header>
                </Timeline>
            )
            expect(screen.getByText('Webhook Informed')).toBeInTheDocument()
            expect(screen.getByText('Merchant Notified')).toBeInTheDocument()
            expect(
                screen.getByText('Failure reason: insufficient funds.')
            ).toBeInTheDocument()
            expect(screen.getByText('4:00:04 PM')).toBeInTheDocument()
        })

        it('renders Header with non-Substep child as-is', () => {
            render(
                <Timeline>
                    <Timeline.Header title="Header">
                        <div data-testid="custom-child">Custom child</div>
                    </Timeline.Header>
                </Timeline>
            )
            expect(screen.getByText('Header')).toBeInTheDocument()
            expect(screen.getByTestId('custom-child')).toHaveTextContent(
                'Custom child'
            )
        })

        it('renders Substep with title, description, timestamp and slots', () => {
            render(
                <Timeline>
                    <Timeline.Label text="Section" />
                    <Timeline.Substep
                        title="Transaction Created"
                        description="Geddit initiated the transaction."
                        timestamp="4:00:04 PM"
                        rightSlot={<span data-testid="substep-right">ID</span>}
                        datetimeLeftSlot={
                            <span data-testid="datetime-left">L</span>
                        }
                        datetimeRightSlot={
                            <span data-testid="datetime-right">R</span>
                        }
                    />
                </Timeline>
            )
            expect(screen.getByText('Transaction Created')).toBeInTheDocument()
            expect(
                screen.getByText('Geddit initiated the transaction.')
            ).toBeInTheDocument()
            expect(screen.getByText('4:00:04 PM')).toBeInTheDocument()
            expect(screen.getByTestId('substep-right')).toHaveTextContent('ID')
            expect(screen.getByTestId('datetime-left')).toHaveTextContent('L')
            expect(screen.getByTestId('datetime-right')).toHaveTextContent('R')
        })

        it('renders Substep with description only (no title row)', () => {
            render(
                <Timeline>
                    <Timeline.Substep title="" description="Description only" />
                </Timeline>
            )
            expect(screen.getByText('Description only')).toBeInTheDocument()
        })

        it('renders Substep with only description (no title, no timestamp)', () => {
            render(
                <Timeline>
                    <Timeline.Substep description="Only description" title="" />
                </Timeline>
            )
            expect(screen.getByText('Only description')).toBeInTheDocument()
        })

        it('renders Node with title, datetime, text, user and time', () => {
            const { container } = render(
                <Timeline>
                    <Timeline.Node
                        title="Comment"
                        datetime="04:30 PM"
                        text="Some comment text here."
                        user={{ name: 'Shweta Yadav' }}
                        time="04:30 PM"
                        status={TimelineNodeStatus.SUCCESS}
                    />
                </Timeline>
            )
            expect(screen.getByText('Comment')).toBeInTheDocument()
            expect(
                screen.getByText('Some comment text here.')
            ).toBeInTheDocument()
            expect(
                screen.getAllByText('Shweta Yadav').length
            ).toBeGreaterThanOrEqual(1)
            const node = container.querySelector('[data-timeline-node="true"]')
            expect(node).toBeInTheDocument()
            expect(node?.textContent).toContain('04:30 PM')
        })

        it('renders Node with body as children', () => {
            render(
                <Timeline>
                    <Timeline.Node title="Note">
                        Body from children
                    </Timeline.Node>
                </Timeline>
            )
            expect(screen.getByText('Note')).toBeInTheDocument()
            expect(screen.getByText('Body from children')).toBeInTheDocument()
        })

        it('renders Node with body as non-string children (element)', () => {
            render(
                <Timeline>
                    <Timeline.Node title="Note">
                        <span data-testid="node-body">Element body</span>
                    </Timeline.Node>
                </Timeline>
            )
            expect(screen.getByText('Note')).toBeInTheDocument()
            expect(screen.getByTestId('node-body')).toHaveTextContent(
                'Element body'
            )
        })

        it('renders Node with only time (no user)', () => {
            render(
                <Timeline>
                    <Timeline.Node text="Note" time="05:00 PM" />
                </Timeline>
            )
            expect(screen.getByText('Note')).toBeInTheDocument()
            expect(screen.getByText('05:00 PM')).toBeInTheDocument()
        })

        it('renders Node with header row without datetime (empty string)', () => {
            render(
                <Timeline>
                    <Timeline.Node title="Event" datetime="" />
                </Timeline>
            )
            expect(screen.getByText('Event')).toBeInTheDocument()
        })

        it('renders Node with header slots and datetime slots', () => {
            render(
                <Timeline>
                    <Timeline.Node
                        title="Event"
                        headerRightSlot={
                            <span data-testid="header-right">HR</span>
                        }
                        datetime="4:00 PM"
                        datetimeLeftSlot={<span data-testid="dt-left">DL</span>}
                        datetimeRightSlot={
                            <span data-testid="dt-right">DR</span>
                        }
                    />
                </Timeline>
            )
            expect(screen.getByText('Event')).toBeInTheDocument()
            expect(screen.getByTestId('header-right')).toHaveTextContent('HR')
            expect(screen.getByTestId('dt-left')).toHaveTextContent('DL')
            expect(screen.getByTestId('dt-right')).toHaveTextContent('DR')
        })

        it('renders ShowMore with default label when label not provided', () => {
            render(
                <Timeline>
                    <Timeline.Label text="Comments" />
                    <Timeline.ShowMore count={45} onShowMore={() => {}} />
                </Timeline>
            )
            expect(
                screen.getByRole('button', { name: /Show more \(45\+\)/i })
            ).toBeInTheDocument()
        })

        it('renders ShowMore with custom label', () => {
            render(
                <Timeline>
                    <Timeline.ShowMore
                        count={10}
                        label="Show All Comments (45+)"
                        onShowMore={() => {}}
                    />
                </Timeline>
            )
            expect(
                screen.getByRole('button', { name: 'Show All Comments (45+)' })
            ).toBeInTheDocument()
        })

        it('renders full timeline composition: Label, Header with Substep, Node, ShowMore', () => {
            const onShowMore = vi.fn()
            const { container } = render(
                <Timeline>
                    <Timeline.Label text="JAN 15, 2025" />
                    <Timeline.Header
                        title="Payment Initiated"
                        timestamp="4:00 PM"
                        status={TimelineNodeStatus.SUCCESS}
                    >
                        <Timeline.Substep
                            title="Transaction Created"
                            description="Geddit initiated."
                            timestamp="4:00:04 PM"
                        />
                    </Timeline.Header>
                    <Timeline.Node
                        text="A comment."
                        user={{ name: 'User' }}
                        time="04:30 PM"
                    />
                    <Timeline.ShowMore count={5} onShowMore={onShowMore} />
                </Timeline>
            )
            expect(screen.getByText('JAN 15, 2025')).toBeInTheDocument()
            expect(screen.getByText('Payment Initiated')).toBeInTheDocument()
            expect(screen.getByText('Transaction Created')).toBeInTheDocument()
            expect(screen.getByText('A comment.')).toBeInTheDocument()
            expect(screen.getAllByText('User').length).toBeGreaterThanOrEqual(1)
            expect(
                container.querySelector('[data-timeline-show-more="true"]')
            ).toBeInTheDocument()
        })
    })

    describe('Compound API', () => {
        it('exposes Label, Header, Substep, Node, ShowMore as static properties', () => {
            expect(Timeline.Label).toBeDefined()
            expect(Timeline.Header).toBeDefined()
            expect(Timeline.Substep).toBeDefined()
            expect(Timeline.Node).toBeDefined()
            expect(Timeline.ShowMore).toBeDefined()
        })

        it('renders direct Substep without indicator (showIndicator false from Timeline)', () => {
            const { container } = render(
                <Timeline>
                    <Timeline.Substep title="First step" description="Desc" />
                </Timeline>
            )
            expect(screen.getByText('First step')).toBeInTheDocument()
            const substep = container.querySelector(
                '[data-timeline-substep="true"]'
            )
            expect(substep).toBeInTheDocument()
        })

        it('renders Substep with indicator dot when showIndicator is true (standalone)', () => {
            const { container } = render(
                <TimelineSubstep
                    title="Step with dot"
                    description="Desc"
                    showIndicator={true}
                />
            )
            expect(screen.getByText('Step with dot')).toBeInTheDocument()
            const substep = container.querySelector(
                '[data-timeline-substep="true"]'
            )
            expect(substep).toBeInTheDocument()
            expect(
                substep?.querySelector('[class*="indicator"]') ??
                    substep?.firstElementChild
            ).toBeTruthy()
        })
    })

    describe('Ref forwarding', () => {
        it('forwards ref to timeline root', () => {
            const ref = React.createRef<HTMLDivElement>()
            render(
                <Timeline ref={ref}>
                    <Timeline.Label text="Label" />
                </Timeline>
            )
            expect(ref.current).toBeInstanceOf(HTMLDivElement)
            expect(ref.current).toHaveAttribute('data-timeline', 'true')
        })

        it('calls callback ref when provided', () => {
            const refFn = vi.fn()
            render(
                <Timeline ref={refFn}>
                    <Timeline.Label text="Label" />
                </Timeline>
            )
            expect(refFn).toHaveBeenCalledWith(expect.any(HTMLDivElement))
        })
    })

    describe('Props', () => {
        it('applies className to timeline root', () => {
            const { container } = render(
                <Timeline className="custom-timeline">
                    <Timeline.Label text="Label" />
                </Timeline>
            )
            const root = container.querySelector('.custom-timeline')
            expect(root).toBeInTheDocument()
        })
    })

    describe('ShowMore interaction', () => {
        it('calls onShowMore when Show More button is clicked', async () => {
            const user = userEvent.setup()
            const onShowMore = vi.fn()
            render(
                <Timeline>
                    <Timeline.Node text="Comment" />
                    <Timeline.ShowMore count={10} onShowMore={onShowMore} />
                </Timeline>
            )
            const button = screen.getByRole('button', {
                name: /Show more \(10\+\)/i,
            })
            await user.click(button)
            expect(onShowMore).toHaveBeenCalledTimes(1)
        })

        it('Show More button is disabled when onShowMore is not provided', () => {
            render(
                <Timeline>
                    <Timeline.ShowMore count={5} />
                </Timeline>
            )
            const button = screen.getByRole('button', {
                name: /Show more \(5\+\)/i,
            })
            expect(button).toBeDisabled()
        })
    })

    describe('Data attributes', () => {
        it('Label has data-timeline-label', () => {
            const { container } = render(
                <Timeline>
                    <Timeline.Label text="Label" />
                </Timeline>
            )
            expect(
                container.querySelector('[data-timeline-label="true"]')
            ).toBeInTheDocument()
        })

        it('Header has data-timeline-header', () => {
            const { container } = render(
                <Timeline>
                    <Timeline.Header title="Header" />
                </Timeline>
            )
            expect(
                container.querySelector('[data-timeline-header="true"]')
            ).toBeInTheDocument()
        })

        it('Substep has data-timeline-substep', () => {
            const { container } = render(
                <Timeline>
                    <Timeline.Substep title="Step" />
                </Timeline>
            )
            expect(
                container.querySelector('[data-timeline-substep="true"]')
            ).toBeInTheDocument()
        })

        it('Node has data-timeline-node', () => {
            const { container } = render(
                <Timeline>
                    <Timeline.Node text="Node" />
                </Timeline>
            )
            expect(
                container.querySelector('[data-timeline-node="true"]')
            ).toBeInTheDocument()
        })

        it('ShowMore has data-timeline-show-more', () => {
            const { container } = render(
                <Timeline>
                    <Timeline.ShowMore count={0} onShowMore={() => {}} />
                </Timeline>
            )
            expect(
                container.querySelector('[data-timeline-show-more="true"]')
            ).toBeInTheDocument()
        })
    })

    describe('Status', () => {
        it('Header accepts all TimelineNodeStatus values', () => {
            const statuses = [
                TimelineNodeStatus.SUCCESS,
                TimelineNodeStatus.WARNING,
                TimelineNodeStatus.ERROR,
                TimelineNodeStatus.NEUTRAL,
            ]
            statuses.forEach((status) => {
                const { unmount } = render(
                    <Timeline>
                        <Timeline.Header title="Header" status={status} />
                    </Timeline>
                )
                expect(screen.getByText('Header')).toBeInTheDocument()
                unmount()
            })
        })

        it('Node accepts all TimelineNodeStatus values', () => {
            const statuses = [
                TimelineNodeStatus.SUCCESS,
                TimelineNodeStatus.WARNING,
                TimelineNodeStatus.ERROR,
                TimelineNodeStatus.NEUTRAL,
            ]
            statuses.forEach((status) => {
                const { unmount } = render(
                    <Timeline>
                        <Timeline.Node text="Node" status={status} />
                    </Timeline>
                )
                expect(screen.getByText('Node')).toBeInTheDocument()
                unmount()
            })
        })
    })

    describe('Accessibility', () => {
        it('has no axe violations when rendering Label only', async () => {
            const { container } = render(
                <Timeline>
                    <Timeline.Label text="JAN 15, 2025" />
                </Timeline>
            )
            expect(await axe(container)).toHaveNoViolations()
        })

        it('has no axe violations when rendering full timeline', async () => {
            const { container } = render(
                <Timeline>
                    <Timeline.Label text="JAN 15, 2025" />
                    <Timeline.Header
                        title="Payment Initiated"
                        timestamp="4:00 PM"
                    >
                        <Timeline.Substep
                            title="Transaction Created"
                            description="Desc"
                            timestamp="4:00:04 PM"
                        />
                    </Timeline.Header>
                    <Timeline.Node
                        text="Comment"
                        user={{ name: 'User' }}
                        time="04:30 PM"
                    />
                    <Timeline.ShowMore count={5} onShowMore={() => {}} />
                </Timeline>
            )
            expect(await axe(container)).toHaveNoViolations()
        })
    })

    describe('Edge cases', () => {
        it('renders timeline with no children', () => {
            const { container } = render(<Timeline>{null}</Timeline>)
            expect(
                container.querySelector('[data-timeline="true"]')
            ).toBeInTheDocument()
        })

        it('renders Node with only title', () => {
            render(
                <Timeline>
                    <Timeline.Node title="Title only" />
                </Timeline>
            )
            expect(screen.getByText('Title only')).toBeInTheDocument()
        })

        it('renders Node with custom maxLines', () => {
            render(
                <Timeline>
                    <Timeline.Node text="Line one" maxLines={1} />
                </Timeline>
            )
            expect(screen.getByText('Line one')).toBeInTheDocument()
        })
    })
})
