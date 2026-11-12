import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '../../test-utils'
import DateRangePicker from '../../../lib/components/DateRangePicker/DateRangePicker'
import { createCalendarMonthData } from '../../../lib/components/DateRangePicker/utils'

/**
 * Regression cover for the calendar header reported on PR #1834: the grid's
 * weekday names followed the provider locale while the month heading above
 * them stayed English, because `createCalendarMonthData` resolved its month
 * name with no locale.
 *
 * The pair of header assertions is the point. The visible heading has to
 * follow the locale AND the `data-id` attribute built from the same month has
 * to not, because consumer selectors and analytics match on it.
 */
describe('DateRangePicker locale', () => {
    const JUNE = new Date(2025, 5, 15)

    const openCalendar = async (
        locale: string,
        t?: (key: string) => string
    ) => {
        const { user } = render(
            <DateRangePicker
                value={{ startDate: JUNE, endDate: JUNE }}
                onChange={() => {}}
            />,
            { providerProps: { locale, t } }
        )

        // The first `role="button"` is the preset select, which opens a
        // different popover; the calendar hangs off the trigger.
        await user.click(
            document.querySelector(
                '[data-element="datepicker-selector"]'
            ) as HTMLElement
        )

        const headers = await waitFor(() => {
            const found = document.querySelectorAll(
                '[data-element="month-year"]'
            )
            expect(found.length).toBeGreaterThan(0)
            return found
        })

        return Array.from(headers)
    }

    describe('createCalendarMonthData', () => {
        it('localizes monthLabel and pins monthName to English', () => {
            const fr = createCalendarMonthData(2025, 5, 0, 320, 'fr-FR')

            expect(fr.monthLabel).toBe('juin')
            expect(fr.monthName).toBe('June')
        })

        it('falls back to English for monthLabel when no locale is given', () => {
            const data = createCalendarMonthData(2025, 5, 0, 320)

            expect(data.monthLabel).toBe('June')
            expect(data.monthName).toBe('June')
        })
    })

    describe('calendar header', () => {
        it('renders the month heading in the provider locale', async () => {
            const headers = await openCalendar('fr-FR')

            expect(
                headers.some((node) =>
                    /juin\s+2025/i.test(node.textContent ?? '')
                )
            ).toBe(true)
            expect(
                headers.some((node) =>
                    /June\s+2025/.test(node.textContent ?? '')
                )
            ).toBe(false)
        })

        it('keeps the month-year data-id in English for selector stability', async () => {
            const headers = await openCalendar('fr-FR')

            const ids = headers.map((node) => node.getAttribute('data-id'))

            expect(ids).toContain('June 2025')
            expect(ids.some((id) => id?.includes('juin'))).toBe(false)
        })
    })

    describe('trigger', () => {
        it('localizes the default trigger text when no formatConfig is given', async () => {
            render(
                <DateRangePicker
                    value={{ startDate: JUNE, endDate: JUNE }}
                    onChange={() => {}}
                />,
                { providerProps: { locale: 'fr-FR' } }
            )

            const trigger = document.querySelector(
                '[data-element="datepicker-selector"]'
            ) as HTMLElement

            expect(trigger.getAttribute('aria-label')).toMatch(/juin/i)
        })

        it('keeps English when no locale is set on the provider', async () => {
            render(
                <DateRangePicker
                    value={{ startDate: JUNE, endDate: JUNE }}
                    onChange={() => {}}
                />
            )

            const trigger = document.querySelector(
                '[data-element="datepicker-selector"]'
            ) as HTMLElement

            expect(trigger.getAttribute('aria-label')).toMatch(/Jun/)
        })
    })

    describe('footer', () => {
        // The desktop footer lives in `FooterControls` inside
        // DateRangePicker.tsx, a different component from the mobile drawer's
        // `components/ActionButtons.tsx`. Only the latter was migrated at
        // first, which left these two buttons English.
        //
        // Unlike the month heading above, these need a `t`: `locale` drives
        // `Intl` formatting, `t` supplies message text.
        const FRENCH: Record<string, string> = {
            'common.action.cancel': 'Annuler',
            'common.action.apply': 'Appliquer',
        }

        it('localizes the desktop Cancel and Apply buttons via the provider', async () => {
            await openCalendar('fr-FR', (key) => FRENCH[key])

            await waitFor(() => {
                expect(screen.getByText('Annuler')).toBeInTheDocument()
            })
            expect(screen.getByText('Appliquer')).toBeInTheDocument()
        })

        it('falls back to English with no translator', async () => {
            await openCalendar('fr-FR')

            await waitFor(() => {
                expect(screen.getByText('Cancel')).toBeInTheDocument()
            })
            expect(screen.getByText('Apply')).toBeInTheDocument()
        })
    })
})
