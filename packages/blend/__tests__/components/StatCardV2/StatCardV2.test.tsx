import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '../../test-utils'
import StatCardV2 from '../../../lib/components/StatCardV2/StatCardV2'
import {
    StatCardV2ArrowDirection,
    StatCardV2ChangeType,
    StatCardV2Variant,
} from '../../../lib/components/StatCardV2/statcardV2.types'
import { ChartV2Options } from '../../../lib/components/ChartsV2'

// ─── Heavy dependency mocks ──────────────────────────────────────────────────

vi.mock('../../../lib/components/ChartsV2', () => ({
    ChartV2: () => <div data-testid="chart-v2" />,
}))

vi.mock('../../../lib/components/ProgressBar', () => ({
    ProgressBar: ({ value }: { value: number }) => (
        <div data-testid="progress-bar" data-value={value} />
    ),
    ProgressBarSize: { SMALL: 'small' },
    ProgressBarVariant: { SEGMENTED: 'segmented' },
}))

vi.mock('../../../lib/components/Tooltip', () => ({
    Tooltip: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

vi.mock('../../../lib/components/Skeleton/Skeleton', () => {
    const MockSkeleton = (props: Record<string, unknown>) => (
        <div data-testid="skeleton" {...props} />
    )
    return {
        default: MockSkeleton,
        Skeleton: MockSkeleton,
        SkeletonVariant: { pulse: 'pulse' },
    }
})

vi.mock('../../../lib/components/SingleSelect/SingleSelect', () => ({
    default: ({ label, selected }: { label?: string; selected?: string }) => (
        <div
            data-single-select={label ?? 'single-select'}
            data-selected={selected ?? ''}
        />
    ),
}))

// ─── Breakpoints mock (mutable so tests can flip sm/md) ──────────────────────

let mockBreakPointLabel: 'sm' | 'md' = 'md'
vi.mock('../../../lib/hooks/useBreakPoints', () => ({
    useBreakpoints: () => ({ breakPointLabel: mockBreakPointLabel }),
    BREAKPOINTS: {},
}))

// ─── Complete token shape required by StatCardV2 and all subcomponents ───────

const valueTokens = {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 32,
    color: '#000',
}

vi.mock('../../../lib/hooks/useResponsiveTokens', () => ({
    useResponsiveTokens: () => ({
        height: '200px',
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 16,
        paddingRight: 16,
        border: '1px solid transparent',
        borderRadius: 8,
        backgroundColor: '#ffffff',
        boxShadow: 'none',
        maxWidth: '100%',
        minWidth: '0',
        width: '100%',
        topContainer: {
            gap: 8,
            dataContainer: {
                gap: 8,
                titleContainer: {
                    gap: 4,
                    title: {
                        fontSize: 12,
                        fontWeight: 500,
                        lineHeight: 16,
                        color: '#333',
                    },
                    helpIcon: {
                        width: 16,
                        color: { default: '#666' },
                    },
                },
                statsContainer: {
                    gap: 8,
                    value: {
                        number: { ...valueTokens },
                        chart: { ...valueTokens },
                        progress: { ...valueTokens },
                    },
                    changeContainer: {
                        gap: 4,
                        arrow: {
                            width: 12,
                            height: 12,
                            color: {
                                increase: '#00A63E',
                                decrease: '#F04438',
                            },
                        },
                        change: {
                            fontSize: 12,
                            fontWeight: 500,
                            lineHeight: 16,
                            color: {
                                increase: '#00A63E',
                                decrease: '#F04438',
                            },
                        },
                    },
                },
                subtitle: {
                    fontSize: 12,
                    fontWeight: 400,
                    lineHeight: 16,
                    color: '#666',
                },
            },
        },
    }),
}))

// ─── Test data ────────────────────────────────────────────────────────────────

const baseProps = {
    title: 'Approval rate',
    subtitle: 'Last 24 hours',
    value: '83.24%',
    change: {
        value: '10.00',
        changeType: StatCardV2ChangeType.INCREASE,
        leftSymbol: '+',
        rightSymbol: '%',
    },
} as const

const chartOptions = (data: number[]) =>
    ({ series: [{ data }] }) as unknown as ChartV2Options

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('StatCardV2 Component', () => {
    beforeEach(() => {
        mockBreakPointLabel = 'md'
    })

    // ── Rendering ────────────────────────────────────────────────────────────

    describe('Rendering', () => {
        it('renders title and value', () => {
            render(<StatCardV2 {...baseProps} />)
            expect(screen.getByText('Approval rate')).toBeInTheDocument()
            expect(screen.getByText('83.24%')).toBeInTheDocument()
        })

        it('renders subtitle on large screens', () => {
            render(<StatCardV2 {...baseProps} />)
            expect(screen.getByText('Last 24 hours')).toBeInTheDocument()
        })

        it('does not render subtitle on small screens', () => {
            mockBreakPointLabel = 'sm'
            render(<StatCardV2 {...baseProps} />)
            expect(screen.queryByText('Last 24 hours')).not.toBeInTheDocument()
        })

        it('renders help icon when helpIconText is provided', () => {
            const { container } = render(
                <StatCardV2 {...baseProps} helpIconText="Tooltip info" />
            )
            const helpIcon = container.querySelector(
                '[data-element="help-icon"]'
            )
            expect(helpIcon).toBeInTheDocument()
        })

        it('does not render help icon when helpIconText is absent', () => {
            const { container } = render(<StatCardV2 {...baseProps} />)
            expect(
                container.querySelector('[data-element="help-icon"]')
            ).not.toBeInTheDocument()
        })

        it('renders action icon on large screens', () => {
            const { container } = render(
                <StatCardV2
                    {...baseProps}
                    actionIcon={<span data-testid="action-icon" />}
                />
            )
            expect(screen.getByTestId('action-icon')).toBeInTheDocument()
            expect(
                container.querySelector('[data-element="action-icon"]')
            ).toBeInTheDocument()
        })

        it('does not render action icon on small screens', () => {
            mockBreakPointLabel = 'sm'
            render(
                <StatCardV2
                    {...baseProps}
                    actionIcon={<span data-testid="action-icon" />}
                />
            )
            expect(screen.queryByTestId('action-icon')).not.toBeInTheDocument()
        })
    })

    // ── Data Attributes ───────────────────────────────────────────────────────

    describe('Data Attributes', () => {
        it('has data-element="statcard-header" on title', () => {
            const { container } = render(<StatCardV2 {...baseProps} />)
            expect(
                container.querySelector('[data-element="statcard-header"]')
            ).toBeInTheDocument()
        })

        it('has data-element="statcard-data" on value', () => {
            const { container } = render(<StatCardV2 {...baseProps} />)
            expect(
                container.querySelector('[data-element="statcard-data"]')
            ).toBeInTheDocument()
        })

        it('has data-element="statcard-delta" on change block', () => {
            const { container } = render(<StatCardV2 {...baseProps} />)
            expect(
                container.querySelector('[data-element="statcard-delta"]')
            ).toBeInTheDocument()
        })

        it('has data-status="increase" on increase change', () => {
            const { container } = render(<StatCardV2 {...baseProps} />)
            const changeText = container.querySelector(
                '[data-status="increase"]'
            )
            expect(changeText).toBeInTheDocument()
        })

        it('has data-status="decrease" on decrease change', () => {
            const { container } = render(
                <StatCardV2
                    {...baseProps}
                    change={{
                        value: '5.00',
                        changeType: StatCardV2ChangeType.DECREASE,
                    }}
                />
            )
            const changeText = container.querySelector(
                '[data-status="decrease"]'
            )
            expect(changeText).toBeInTheDocument()
        })

        it('has data-element="statcard-subtitle" on subtitle', () => {
            const { container } = render(<StatCardV2 {...baseProps} />)
            expect(
                container.querySelector('[data-element="statcard-subtitle"]')
            ).toBeInTheDocument()
        })
    })

    // ── ARIA / Accessibility ──────────────────────────────────────────────────

    describe('ARIA', () => {
        it('has role="region" on root element', () => {
            const { container } = render(<StatCardV2 {...baseProps} />)
            expect(
                container.querySelector('[role="region"]')
            ).toBeInTheDocument()
        })

        it('root element has aria-label', () => {
            const { container } = render(<StatCardV2 {...baseProps} />)
            const region = container.querySelector('[role="region"]')
            expect(region).toHaveAttribute('aria-label')
        })

        it('root accessible name comes from aria-label', () => {
            const { container } = render(<StatCardV2 {...baseProps} />)
            const region = container.querySelector('[role="region"]')
            const labelledBy = region?.getAttribute('aria-labelledby')
            expect(labelledBy).toBeNull()
            expect(region).toHaveAttribute('aria-label')
        })

        it('root has aria-describedby when subtitle is provided', () => {
            const { container } = render(<StatCardV2 {...baseProps} />)
            const region = container.querySelector('[role="region"]')
            expect(region).toHaveAttribute('aria-describedby')
        })

        it('root does not have aria-describedby when subtitle is absent', () => {
            const { container } = render(
                <StatCardV2 title="Title" value="100" />
            )
            const region = container.querySelector('[role="region"]')
            expect(region).not.toHaveAttribute('aria-describedby')
        })
    })

    // ── No-data state ─────────────────────────────────────────────────────────

    describe('No-data state', () => {
        it('renders fallback "--" when no value, change, progress or chart data', () => {
            render(<StatCardV2 title="Empty" subtitle="No data" />)
            expect(screen.getByText('--')).toBeInTheDocument()
        })

        it('still shows title in no-data state', () => {
            render(<StatCardV2 title="Empty card" />)
            expect(screen.getByText('Empty card')).toBeInTheDocument()
        })

        it('shows subtitle in no-data state on large screens', () => {
            render(<StatCardV2 title="T" subtitle="No data yet" />)
            expect(screen.getByText('No data yet')).toBeInTheDocument()
        })
    })

    // ── Skeleton ──────────────────────────────────────────────────────────────

    describe('Skeleton', () => {
        it('renders the skeleton wrapper when skeleton.show is true', () => {
            const { container } = render(
                <StatCardV2
                    {...baseProps}
                    skeleton={{ show: true, variant: 'pulse' }}
                />
            )
            // Region is always rendered; progress bar / chart are not
            expect(
                container.querySelector('[role="region"]')
            ).toBeInTheDocument()
            expect(
                container.querySelector('[data-testid="progress-bar"]')
            ).not.toBeInTheDocument()
            expect(
                container.querySelector('[data-testid="chart-v2"]')
            ).not.toBeInTheDocument()
        })
    })

    // ── Change display ────────────────────────────────────────────────────────

    describe('Change display', () => {
        it('renders change value with left and right symbols', () => {
            render(<StatCardV2 {...baseProps} />)
            expect(screen.getByText(/\+/)).toBeInTheDocument()
            expect(screen.getByText(/10\.00/)).toBeInTheDocument()
        })

        it('does not render change block when change is absent', () => {
            const { container } = render(<StatCardV2 title="T" value="100" />)
            expect(
                container.querySelector('[data-element="statcard-delta"]')
            ).not.toBeInTheDocument()
        })

        it('renders arrow-up for UP arrow direction', () => {
            const { container } = render(
                <StatCardV2
                    {...baseProps}
                    change={{
                        value: '5',
                        changeType: StatCardV2ChangeType.INCREASE,
                        arrowDirection: StatCardV2ArrowDirection.UP,
                    }}
                />
            )
            expect(
                container.querySelector('[data-element="change-arrow"]')
            ).toBeInTheDocument()
        })

        it('renders arrow-down for DOWN arrow direction', () => {
            const { container } = render(
                <StatCardV2
                    {...baseProps}
                    change={{
                        value: '5',
                        changeType: StatCardV2ChangeType.DECREASE,
                        arrowDirection: StatCardV2ArrowDirection.DOWN,
                    }}
                />
            )
            expect(
                container.querySelector('[data-element="change-arrow"]')
            ).toBeInTheDocument()
        })
    })

    // ── Chart variant ─────────────────────────────────────────────────────────

    describe('Chart variant', () => {
        it('renders ChartV2 when series data is present', () => {
            render(
                <StatCardV2
                    {...baseProps}
                    variant={StatCardV2Variant.CHART}
                    options={chartOptions([9, 11, 13])}
                />
            )
            expect(screen.getByTestId('chart-v2')).toBeInTheDocument()
        })

        it('renders chart region with role="img"', () => {
            const { container } = render(
                <StatCardV2
                    {...baseProps}
                    variant={StatCardV2Variant.CHART}
                    options={chartOptions([1, 2, 3])}
                />
            )
            expect(container.querySelector('[role="img"]')).toBeInTheDocument()
        })

        it('renders "--" fallback when chart series data is empty', () => {
            render(
                <StatCardV2
                    {...baseProps}
                    variant={StatCardV2Variant.CHART}
                    options={chartOptions([])}
                />
            )
            expect(screen.getByText('--')).toBeInTheDocument()
        })

        it('renders "--" fallback when options are not provided', () => {
            render(
                <StatCardV2 {...baseProps} variant={StatCardV2Variant.CHART} />
            )
            expect(screen.getByText('--')).toBeInTheDocument()
        })
    })

    // ── Progress bar variant ──────────────────────────────────────────────────

    describe('Progress bar variant', () => {
        it('renders ProgressBar when progressValue is provided', () => {
            render(
                <StatCardV2
                    {...baseProps}
                    variant={StatCardV2Variant.PROGRESS_BAR}
                    progressValue={75}
                />
            )
            const bar = screen.getByTestId('progress-bar')
            expect(bar).toBeInTheDocument()
            expect(bar).toHaveAttribute('data-value', '75')
        })

        it('renders "--" fallback when progressValue is absent', () => {
            render(
                <StatCardV2
                    {...baseProps}
                    variant={StatCardV2Variant.PROGRESS_BAR}
                />
            )
            expect(screen.getByText('--')).toBeInTheDocument()
        })
    })

    // ── Responsive dropdown ───────────────────────────────────────────────────

    describe('Responsive dropdown', () => {
        const dropdownProps = {
            label: 'Currency',
            placeholder: 'Select',
            items: [{ items: [{ label: 'USD', value: 'USD' }] }],
            selected: 'USD',
            onSelect: vi.fn(),
        }

        it('renders dropdown on small screens', () => {
            mockBreakPointLabel = 'sm'
            const { container } = render(
                <StatCardV2 {...baseProps} dropdownProps={dropdownProps} />
            )
            expect(
                container.querySelector('[data-single-select="Currency"]')
            ).toBeInTheDocument()
        })

        it('does not render dropdown on large screens', () => {
            const { container } = render(
                <StatCardV2 {...baseProps} dropdownProps={dropdownProps} />
            )
            expect(
                container.querySelector('[data-single-select="Currency"]')
            ).not.toBeInTheDocument()
        })

        it('renders dropdown in no-data state on small screens', () => {
            mockBreakPointLabel = 'sm'
            const { container } = render(
                <StatCardV2 title="T" dropdownProps={dropdownProps} />
            )
            expect(
                container.querySelector('[data-single-select="Currency"]')
            ).toBeInTheDocument()
        })
    })
})
