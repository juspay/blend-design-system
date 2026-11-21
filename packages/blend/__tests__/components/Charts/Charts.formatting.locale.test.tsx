import { afterEach, describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test-utils'
import { dateFormat } from '../../../lib/components/Charts/DateTimeFormatter'
import {
    formatNumber,
    getAxisFormatter,
} from '../../../lib/components/Charts/ChartUtils'
import { AxisType } from '../../../lib/components/Charts/types'
import StatCard from '../../../lib/components/StatCard/StatCard'
import StatCardV2 from '../../../lib/components/StatCardV2/StatCardV2'
import { StatCardV2ChangeType } from '../../../lib/components/StatCardV2/statcardV2.tokens.types'
import { buildStatCardV2AriaLabel } from '../../../lib/components/StatCardV2/utils'
import {
    ChangeType,
    StatCardVariant,
} from '../../../lib/components/StatCard/types'

// 2024-09-03 (a Tuesday) 15:04 UTC
const TS = Date.UTC(2024, 8, 3, 15, 4)

describe('chart formatting by locale', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    describe('dateFormat', () => {
        it('keeps the English tables with no locale or en-US', () => {
            const format = '%a %e %b %Y, %I:%M %p (%A, %B)'
            const expected = 'Tue 3 Sep 2024, 03:04 PM (Tuesday, September)'

            expect(dateFormat(format, TS, { useUTC: true })).toBe(expected)
            expect(
                dateFormat(format, TS, { useUTC: true, locale: 'en-US' })
            ).toBe(expected)
        })

        it('uses the locale for month, weekday and day-period names only', () => {
            expect(
                dateFormat('%e %B %Y', TS, { useUTC: true, locale: 'fr-FR' })
            ).toBe('3 septembre 2024')
            expect(
                dateFormat('%A', TS, { useUTC: true, locale: 'fr-FR' })
            ).toBe('mardi')
            expect(
                dateFormat('%I:%M %p', TS, { useUTC: true, locale: 'ja-JP' })
            ).toBe('03:04 午後')
        })
    })

    describe('formatNumber', () => {
        it('keeps the hand-rolled English output', () => {
            expect(formatNumber(1500)).toBe('1.5K')
            expect(formatNumber(2000000, 'en-US')).toBe('2.0M')
            expect(formatNumber(12.3456)).toBe('12.3456')
        })

        it('uses the locale’s compact notation and separators', () => {
            // ICU versions disagree on which no-break space precedes the unit.
            expect(formatNumber(1500, 'fr-FR')).toMatch(/^1,5\sk$/)
            // German and Japanese compact forms start above the thousands.
            expect(formatNumber(1500, 'de-DE')).toBe('1500')
            expect(formatNumber(999.5, 'de-DE')).toBe('999,5')
        })
    })

    describe('getAxisFormatter', () => {
        it('no longer reads the host locale for small currency values', () => {
            // Simulate a non-US machine: the old code called the bare
            // toLocaleString(), so it would have rendered "$1.234,5".
            vi.spyOn(Number.prototype, 'toLocaleString').mockReturnValue('HOST')
            const currency = getAxisFormatter({ type: AxisType.CURRENCY })

            expect(currency(999.5)).toBe('$999.5')
            expect(currency(1500)).toBe('$1.5K')
        })

        it('localizes the number but keeps the $ for other locales', () => {
            const currency = getAxisFormatter(
                { type: AxisType.CURRENCY },
                'fr-FR'
            )
            const percent = getAxisFormatter(
                { type: AxisType.PERCENTAGE },
                'fr-FR'
            )

            expect(currency(1500)).toMatch(/^\$1,5\sk$/)
            expect(percent(12.5)).toBe('12,5%')
        })
    })

    describe('StatCard', () => {
        const props = {
            title: 'Revenue',
            value: '120',
            variant: StatCardVariant.NUMBER,
            change: { value: 12.5, valueType: ChangeType.INCREASE },
        }

        it('keeps the English change badge with no provider locale', () => {
            const { container } = render(<StatCard {...props} />)
            const delta = container.querySelector(
                '[data-element="statcard-delta"]'
            )

            expect(delta).toHaveTextContent('+12.50%')
            expect(delta).toHaveAttribute('data-numeric', '+12.50%')
        })

        it('localizes the badge text and keeps data-numeric English', () => {
            const { container } = render(<StatCard {...props} />, {
                providerProps: { locale: 'fr-FR' },
            })
            const delta = container.querySelector(
                '[data-element="statcard-delta"]'
            )

            expect(delta).toHaveTextContent('+12,50%')
            expect(delta).toHaveAttribute('data-numeric', '+12.50%')
        })

        it('keeps the English accessible card label', () => {
            render(<StatCard {...props} subtitle="Last 30 days" />)

            expect(
                screen.getByLabelText(
                    'Revenue, 120, Last 30 days, increased by 12.50%'
                )
            ).toBeInTheDocument()
        })
    })

    describe('StatCard data-numeric', () => {
        it('shows the localized value but keeps data-numeric English', () => {
            const { container } = render(
                <StatCard
                    title="Revenue"
                    value={1500}
                    variant={StatCardVariant.NUMBER}
                    valueFormatter={AxisType.CURRENCY}
                />,
                { providerProps: { locale: 'fr-FR' } }
            )
            const data = container.querySelector(
                '[data-element="statcard-data"]'
            )

            expect(data?.textContent).toMatch(/^\$1,5\sk$/)
            expect(data).toHaveAttribute('data-numeric', '$1.5K')
        })
    })

    describe('StatCardV2 label', () => {
        const change = {
            value: '10.00',
            rightSymbol: '%',
            changeType: StatCardV2ChangeType.INCREASE,
        }

        it('keeps the English label for direct callers and with no provider', () => {
            expect(
                buildStatCardV2AriaLabel({
                    title: 'Rate',
                    value: '83%',
                    change,
                })
            ).toBe('Rate, 83%, increased by 10.00%')

            render(<StatCardV2 title="Rate" value="83%" change={change} />)
            expect(
                screen.getByLabelText('Rate, 83%, increased by 10.00%')
            ).toBeInTheDocument()
        })

        it('translates the change phrase through the provider', () => {
            const t = (key: string) =>
                key === 'stat-card.a11y.change-increase-v2'
                    ? 'en hausse de {value}'
                    : undefined
            render(<StatCardV2 title="Rate" value="83%" change={change} />, {
                providerProps: { locale: 'fr-FR', t },
            })

            expect(
                // The list separator follows the locale too (French joins the
                // last item with "et").
                screen.getByLabelText('Rate, 83% et en hausse de 10.00%')
            ).toBeInTheDocument()
        })
    })
})
