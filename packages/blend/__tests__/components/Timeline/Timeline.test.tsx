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
import { getTimelineTokens } from '../../../lib/components/Timeline/timeline.token'
import {
    getLineTop,
    getLineBottom,
} from '../../../lib/components/Timeline/utils'
import { Theme } from '../../../lib/context/theme.enum'
import { FOUNDATION_THEME } from '../../../lib/tokens'

/**
 * Collects every injected stylesheet rule that targets one of the element's
 * styled-components classes (including pseudo-state rules such as `:hover`).
 * jsdom cannot apply pseudo-classes via getComputedStyle, so state styles are
 * asserted against the injected CSS itself (same approach as the Slider
 * custom foundation tests).
 */
const getElementCss = (element: Element): string => {
    const classes = Array.from(element.classList)
    const allCss = Array.from(document.head.querySelectorAll('style'))
        .map((style) => style.textContent ?? '')
        .join('\n')
    return classes
        .flatMap(
            (cls) =>
                allCss.match(
                    new RegExp(`\\.${cls}(?::[a-zA-Z-]+)?\\s*\\{[^{}]*\\}`, 'g')
                ) ?? []
        )
        .join('\n')
}

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

        it('has no axe violations when blocks are selectable with a selected block', async () => {
            const { container } = render(
                <Timeline>
                    <Timeline.Header
                        title="Payment Initiated"
                        timestamp="4:00 PM"
                        isSelectable
                    >
                        <Timeline.Substep
                            title="Transaction Created"
                            isSelectable
                            isSelected
                        />
                    </Timeline.Header>
                    <Timeline.Node text="Comment" isSelectable isSelected />
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

    describe('State tokens', () => {
        it('light theme uses gray 50 for hover and gray 150 for selected', () => {
            const states = getTimelineTokens(FOUNDATION_THEME).sm.states
            expect(states.hover.backgroundColor).toBe(
                FOUNDATION_THEME.colors.gray[50]
            )
            expect(states.selected.backgroundColor).toBe(
                FOUNDATION_THEME.colors.gray[150]
            )
        })

        it('dark theme resolves hover and selected state tokens', () => {
            const states = getTimelineTokens(FOUNDATION_THEME, Theme.DARK).sm
                .states
            expect(states.hover.backgroundColor).toBe(
                FOUNDATION_THEME.colors.gray[800]
            )
            expect(states.selected.backgroundColor).toBe(
                FOUNDATION_THEME.colors.gray[700]
            )
        })
    })

    describe('Interactive states', () => {
        it('Node is not interactive by default', () => {
            const { container } = render(
                <Timeline>
                    <Timeline.Node text="Plain node" />
                </Timeline>
            )
            const node = container.querySelector(
                '[data-timeline-node="true"]'
            ) as HTMLElement
            expect(node).not.toHaveAttribute('role')
            expect(node).not.toHaveAttribute('tabindex')
            const css = getElementCss(node)
            expect(css).not.toMatch(/:hover/)
        })

        it('Node exposes button semantics and hover styles when isSelectable', () => {
            const { container } = render(
                <Timeline>
                    <Timeline.Node text="Selectable node" isSelectable />
                </Timeline>
            )
            const node = container.querySelector(
                '[data-timeline-node="true"]'
            ) as HTMLElement
            expect(node).toHaveAttribute('role', 'button')
            expect(node).toHaveAttribute('tabindex', '0')
            const css = getElementCss(node)
            expect(css).toMatch(/:hover[^{]*\{[^}]*#F5F7FA/)
            expect(css).toMatch(/:focus-visible[^{]*\{[^}]*#F5F7FA/)
        })

        it('Node renders selected background when isSelected', () => {
            const { container } = render(
                <Timeline>
                    <Timeline.Node
                        text="Selected node"
                        isSelectable
                        isSelected
                    />
                </Timeline>
            )
            const node = container.querySelector(
                '[data-timeline-node="true"]'
            ) as HTMLElement
            const css = getElementCss(node)
            expect(css).toMatch(/background-color:\s*#ECEFF3/)
        })

        it('selected Node keeps selected background on hover (selected wins)', () => {
            const { container } = render(
                <Timeline>
                    <Timeline.Node
                        text="Selected node"
                        isSelectable
                        isSelected
                    />
                </Timeline>
            )
            const node = container.querySelector(
                '[data-timeline-node="true"]'
            ) as HTMLElement
            const css = getElementCss(node)
            expect(css).not.toMatch(/:hover[^{]*\{[^}]*#F5F7FA/)
        })

        it('Node fires onClick for click, Enter and Space when isSelectable', async () => {
            const user = userEvent.setup()
            const onClick = vi.fn()
            const { container } = render(
                <Timeline>
                    <Timeline.Node text="Node" isSelectable onClick={onClick} />
                </Timeline>
            )
            const node = container.querySelector(
                '[data-timeline-node="true"]'
            ) as HTMLElement

            await user.click(node)
            expect(onClick).toHaveBeenCalledTimes(1)

            node.focus()
            await user.keyboard('{Enter}')
            expect(onClick).toHaveBeenCalledTimes(2)

            await user.keyboard(' ')
            expect(onClick).toHaveBeenCalledTimes(3)
        })

        it('Node does not fire onClick on Enter when not selectable', async () => {
            const user = userEvent.setup()
            const onClick = vi.fn()
            const { container } = render(
                <Timeline>
                    <Timeline.Node text="Node" onClick={onClick} />
                </Timeline>
            )
            const node = container.querySelector(
                '[data-timeline-node="true"]'
            ) as HTMLElement
            node.focus()
            await user.keyboard('{Enter}')
            expect(onClick).not.toHaveBeenCalled()
        })

        it('Node consumer onKeyDown runs and can suppress keyboard activation', async () => {
            const user = userEvent.setup()
            const onClick = vi.fn()
            const onKeyDown = vi.fn(
                (event: React.KeyboardEvent<HTMLDivElement>) => {
                    event.preventDefault()
                }
            )
            const { container } = render(
                <Timeline>
                    <Timeline.Node
                        text="Node"
                        isSelectable
                        onClick={onClick}
                        onKeyDown={onKeyDown}
                    />
                </Timeline>
            )
            const node = container.querySelector(
                '[data-timeline-node="true"]'
            ) as HTMLElement
            node.focus()
            await user.keyboard('{Enter}')
            expect(onKeyDown).toHaveBeenCalledTimes(1)
            expect(onClick).not.toHaveBeenCalled()
        })

        it('Substep exposes button semantics, selected background and keyboard activation', async () => {
            const user = userEvent.setup()
            const onClick = vi.fn()
            const { container } = render(
                <Timeline>
                    <Timeline.Substep
                        title="Substep"
                        isSelectable
                        isSelected
                        onClick={onClick}
                    />
                </Timeline>
            )
            const substep = container.querySelector(
                '[data-timeline-substep="true"]'
            ) as HTMLElement
            expect(substep).toHaveAttribute('role', 'button')
            expect(substep).toHaveAttribute('tabindex', '0')
            const css = getElementCss(substep)
            expect(css).toMatch(/background-color:\s*#ECEFF3/)
            expect(css).toMatch(/:hover[^{]*\{[^}]*#ECEFF3/)

            substep.focus()
            await user.keyboard('{Enter}')
            expect(onClick).toHaveBeenCalledTimes(1)
        })

        it('Header row (not the root) is the interactive target when isSelectable', () => {
            const { container } = render(
                <Timeline>
                    <Timeline.Header title="Header" isSelectable />
                </Timeline>
            )
            const root = container.querySelector(
                '[data-timeline-header="true"]'
            ) as HTMLElement
            const row = container.querySelector(
                '[data-timeline-header-row="true"]'
            ) as HTMLElement
            expect(root).not.toHaveAttribute('role')
            expect(root).not.toHaveAttribute('tabindex')
            expect(row).toHaveAttribute('role', 'button')
            expect(row).toHaveAttribute('tabindex', '0')
            const css = getElementCss(row)
            expect(css).toMatch(/:hover[^{]*\{[^}]*#F5F7FA/)
        })

        it('Header row renders selected background when isSelected', () => {
            const { container } = render(
                <Timeline>
                    <Timeline.Header title="Header" isSelected />
                </Timeline>
            )
            const row = container.querySelector(
                '[data-timeline-header-row="true"]'
            ) as HTMLElement
            const css = getElementCss(row)
            expect(css).toMatch(/background-color:\s*#ECEFF3/)
        })

        it('clicking a nested Substep does not trigger the Header onClick (individual states)', async () => {
            const user = userEvent.setup()
            const onHeaderClick = vi.fn()
            const onSubstepClick = vi.fn()
            render(
                <Timeline>
                    <Timeline.Header
                        title="Header"
                        isSelectable
                        onClick={onHeaderClick}
                    >
                        <Timeline.Substep
                            title="Nested step"
                            isSelectable
                            onClick={onSubstepClick}
                        />
                    </Timeline.Header>
                </Timeline>
            )
            await user.click(screen.getByText('Nested step'))
            expect(onSubstepClick).toHaveBeenCalledTimes(1)
            expect(onHeaderClick).not.toHaveBeenCalled()

            await user.click(screen.getByText('Header'))
            expect(onHeaderClick).toHaveBeenCalledTimes(1)
            expect(onSubstepClick).toHaveBeenCalledTimes(1)
        })

        it('Header keyboard activation fires onClick on the row', async () => {
            const user = userEvent.setup()
            const onClick = vi.fn()
            render(
                <Timeline>
                    <Timeline.Header
                        title="Header"
                        isSelectable
                        onClick={onClick}
                    />
                </Timeline>
            )
            const row = screen
                .getByText('Header')
                .closest('[data-timeline-header-row="true"]') as HTMLElement
            row.focus()
            await user.keyboard('{Enter}')
            expect(onClick).toHaveBeenCalledTimes(1)
        })

        it('non-selectable Header keeps onClick on the root (legacy behaviour)', async () => {
            const user = userEvent.setup()
            const onClick = vi.fn()
            render(
                <Timeline>
                    <Timeline.Header title="Header" onClick={onClick}>
                        <Timeline.Substep title="Nested step" />
                    </Timeline.Header>
                </Timeline>
            )
            await user.click(screen.getByText('Header'))
            expect(onClick).toHaveBeenCalledTimes(1)
        })

        it('track, indicator dots and label mask stay layered above block backgrounds', () => {
            const { container } = render(
                <Timeline>
                    <Timeline.Label text="JAN 15, 2025" />
                    <Timeline.Header title="Header" isSelectable>
                        <Timeline.Substep title="Nested" />
                    </Timeline.Header>
                </Timeline>
            )
            const line = container.querySelector(
                '[data-timeline-line="true"]'
            ) as HTMLElement
            expect(getElementCss(line)).toMatch(/z-index:\s*1/)

            const mask = container.querySelector(
                '[data-timeline-label="true"] > div'
            ) as HTMLElement
            expect(getElementCss(mask)).toMatch(/z-index:\s*2/)
        })

        it('interactive blocks have vertical padding for nicer state backgrounds', () => {
            const { container } = render(
                <Timeline>
                    <Timeline.Header title="Header" isSelectable>
                        <Timeline.Substep title="Nested" isSelectable />
                    </Timeline.Header>
                    <Timeline.Node text="Node" isSelectable />
                </Timeline>
            )
            const row = container.querySelector(
                '[data-timeline-header-row="true"]'
            ) as HTMLElement
            const substep = container.querySelector(
                '[data-timeline-substep="true"]'
            ) as HTMLElement
            const node = container.querySelector(
                '[data-timeline-node="true"]'
            ) as HTMLElement
            for (const el of [row, substep, node]) {
                const css = getElementCss(el)
                expect(css).toMatch(/padding-top:\s*8px/)
                expect(css).toMatch(/padding-bottom:\s*8px/)
                expect(css).toMatch(/padding-left:\s*12px/)
                expect(css).toMatch(/padding-right:\s*12px/)
            }
        })

        it('state backgrounds start at the text content and leave the rail un-highlighted', () => {
            const { container } = render(
                <Timeline>
                    <Timeline.Header title="Header" isSelectable />
                    <Timeline.Substep title="Step" isSelectable />
                    <Timeline.Node text="Node" isSelectable />
                </Timeline>
            )
            const row = container.querySelector(
                '[data-timeline-header-row="true"]'
            ) as HTMLElement
            const substep = container.querySelector(
                '[data-timeline-substep="true"]'
            ) as HTMLElement
            const node = container.querySelector(
                '[data-timeline-node="true"]'
            ) as HTMLElement

            expect(getElementCss(row)).toMatch(/margin-left:\s*28px/)
            expect(getElementCss(node)).toMatch(/margin-left:\s*28px/)
            expect(getElementCss(substep)).toMatch(/margin-left:\s*40px/)

            const rowDot = row.children[0] as HTMLElement
            const nodeDot = node.children[0] as HTMLElement
            const substepConnector = substep.children[0] as HTMLElement

            expect(getElementCss(rowDot)).toMatch(/left:\s*-17\.5px/)
            expect(getElementCss(nodeDot)).toMatch(/left:\s*-17\.5px/)
            expect(getElementCss(substepConnector)).toMatch(/left:\s*-27px/)
        })
    })

    describe('Line layout math (padding-aware)', () => {
        const makeElement = (
            attributes: Record<string, string>,
            offsets: { top?: number; height?: number } = {}
        ): HTMLElement => {
            const el = document.createElement('div')
            Object.entries(attributes).forEach(([key, value]) =>
                el.setAttribute(key, value)
            )
            if (offsets.top !== undefined)
                Object.defineProperty(el, 'offsetTop', { value: offsets.top })
            if (offsets.height !== undefined)
                Object.defineProperty(el, 'offsetHeight', {
                    value: offsets.height,
                })
            return el
        }

        const baseOptions = {
            indicatorHeightPx: 6,
            indicatorTopPx: 6,
            labelCircleHeightPx: 10,
            blockPaddingYPx: 8,
        }

        it('node endpoints include block vertical padding', () => {
            const container = document.createElement('div')
            const node = makeElement(
                { 'data-timeline-node': 'true' },
                { top: 40 }
            )
            container.appendChild(node)

            expect(getLineTop(container, baseOptions)).toBe(40 + 8 + 6 + 6)
            expect(getLineBottom(container, baseOptions)).toBe(40 + 8 + 6 + 3)
        })

        it('node endpoints stay legacy-compatible without the padding option', () => {
            const container = document.createElement('div')
            const legacyOptions = {
                indicatorHeightPx: 6,
                indicatorTopPx: 6,
                labelCircleHeightPx: 10,
            }
            const node = makeElement(
                { 'data-timeline-node': 'true' },
                { top: 40 }
            )
            container.appendChild(node)

            expect(getLineTop(container, legacyOptions)).toBe(40 + 6 + 6)
            expect(getLineBottom(container, legacyOptions)).toBe(40 + 6 + 3)
        })

        it('substep endpoints include block vertical padding', () => {
            const container = document.createElement('div')
            const substep = makeElement(
                { 'data-timeline-substep': 'true' },
                { top: 10 }
            )
            container.appendChild(substep)

            expect(getLineTop(container, baseOptions)).toBe(10 + 8 + 6)
            expect(getLineBottom(container, baseOptions)).toBe(10 + 8 + 3)
        })

        it('header endpoints use the row center and ignore padding', () => {
            const container = document.createElement('div')
            const header = makeElement(
                { 'data-timeline-header': 'true' },
                { top: 0 }
            )
            const row = makeElement({}, { top: 0, height: 38 })
            header.appendChild(row)
            container.appendChild(header)

            expect(getLineTop(container, baseOptions)).toBe(38 / 2 + 3)
            expect(getLineBottom(container, baseOptions)).toBe(38 / 2)
        })

        it('header with substeps wrapper bottom follows the connector offset', () => {
            const container = document.createElement('div')
            const header = makeElement(
                { 'data-timeline-header': 'true' },
                { top: 0 }
            )
            const row = makeElement({}, { top: 0, height: 38 })
            const wrapper = makeElement({}, { top: 58 })
            header.appendChild(row)
            header.appendChild(wrapper)
            container.appendChild(header)

            expect(getLineBottom(container, baseOptions)).toBe(58 + 8)
        })
    })
})
