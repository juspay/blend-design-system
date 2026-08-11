import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '../../test-utils'
import { Theme } from '../../../lib/context'
import ThemeProvider from '../../../lib/context/ThemeProvider'
import DateRangePicker from '../../../lib/components/DateRangePicker/DateRangePicker'
import type { DateRange } from '../../../lib/components/DateRangePicker/types'
import FOUNDATION_THEME from '../../../lib/tokens/theme.token'
import { getCalendarToken } from '../../../lib/components/DateRangePicker/dateRangePicker.tokens'
import { getMobileToken } from '../../../lib/components/DateRangePicker/components/mobile.tokens'

const mockViewport = { innerWidth: 1024, breakPointLabel: 'lg' }

vi.mock('../../../lib/hooks/useBreakPoints', () => ({
    useBreakpoints: () => mockViewport,
}))

const createDateRange = (): DateRange => {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - 2)
    startDate.setHours(9, 0, 0, 0)

    const endDate = new Date(startDate)
    endDate.setDate(endDate.getDate() + 3)
    endDate.setHours(17, 30, 0, 0)

    return { startDate, endDate }
}

const getElementsWithInlineBackground = (backgroundColor: string) => {
    const probe = document.createElement('div')
    probe.style.backgroundColor = backgroundColor
    const normalizedColor = probe.style.backgroundColor

    return Array.from(document.querySelectorAll<HTMLElement>('*')).filter(
        (element) => element.style.backgroundColor === normalizedColor
    )
}

describe('DateRangePicker dark theme rendering', () => {
    beforeEach(() => {
        mockViewport.innerWidth = 1024
        mockViewport.breakPointLabel = 'lg'
    })

    it('applies dark tokens to the desktop trigger, calendar surface, and grid', async () => {
        const darkTokens = getCalendarToken(FOUNDATION_THEME, Theme.DARK).lg
        const onChange = vi.fn()

        const { user } = render(
            <ThemeProvider theme={Theme.DARK}>
                <DateRangePicker
                    value={createDateRange()}
                    onChange={onChange}
                    showDateTimePicker={true}
                    showPresets={true}
                />
            </ThemeProvider>
        )

        const trigger = screen.getByRole('button', {
            name: /date range picker/i,
        })
        expect(trigger).toHaveStyle({
            backgroundColor: darkTokens.trigger.dateInput.backgroundColor,
        })

        await user.click(trigger)

        await waitFor(() => {
            expect(screen.getByText('Apply')).toBeInTheDocument()
            expect(
                document.querySelector('[data-element="days"]')
            ).toBeInTheDocument()
        })
        expect(
            document.querySelector('[data-element="days"][aria-pressed="true"]')
        ).toBeInTheDocument()
        expect(
            getElementsWithInlineBackground(darkTokens.calendar.backgroundColor)
                .length
        ).toBeGreaterThan(0)
        expect(screen.getByText('Start')).toBeInTheDocument()
        expect(
            screen.getByRole('textbox', { name: 'Start time' })
        ).toBeInTheDocument()
    })

    it('renders the dark mobile drawer slice with presets, pickers, and footer actions', async () => {
        mockViewport.innerWidth = 375
        mockViewport.breakPointLabel = 'sm'

        const mobileTokens = getMobileToken(FOUNDATION_THEME, Theme.DARK).sm
        render(
            <ThemeProvider theme={Theme.DARK}>
                <DateRangePicker
                    value={createDateRange()}
                    onChange={() => {}}
                    showDateTimePicker={true}
                    showPresets={true}
                    useDrawerOnMobile={true}
                />
            </ThemeProvider>
        )

        fireEvent.click(
            document.querySelector(
                '[data-element="drawer-trigger"]'
            ) as HTMLElement
        )

        const drawer = await screen.findByRole('dialog')
        expect(drawer).toHaveStyle({
            backgroundColor: mobileTokens.drawer.backgroundColor,
        })
        expect(screen.getByText('Today')).toBeInTheDocument()

        fireEvent.click(screen.getByText('Custom'))

        expect(screen.getByText('Year')).toBeInTheDocument()
        expect(screen.getByText('Month')).toBeInTheDocument()
        expect(screen.getByText('Time')).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: 'Cancel' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: 'Apply Date' })
        ).toBeInTheDocument()
        expect(
            getElementsWithInlineBackground(mobileTokens.footer.backgroundColor)
                .length
        ).toBeGreaterThan(0)
    })

    it('selects a dark mobile preset and closes the drawer', async () => {
        mockViewport.innerWidth = 375
        mockViewport.breakPointLabel = 'sm'

        const onChange = vi.fn()
        render(
            <ThemeProvider theme={Theme.DARK}>
                <DateRangePicker
                    onChange={onChange}
                    showPresets={true}
                    useDrawerOnMobile={true}
                />
            </ThemeProvider>
        )

        fireEvent.click(
            document.querySelector(
                '[data-element="drawer-trigger"]'
            ) as HTMLElement
        )
        fireEvent.click(screen.getByText('Today'))

        expect(onChange).toHaveBeenCalledWith(
            expect.objectContaining({
                startDate: expect.any(Date),
                endDate: expect.any(Date),
            })
        )
        await waitFor(() => {
            expect(screen.getByRole('dialog')).toHaveAttribute(
                'data-state',
                'closed'
            )
        })
    })

    it('keeps the no-theme calendar token path on light output', () => {
        const omittedTheme = getCalendarToken(FOUNDATION_THEME)
        const explicitLight = getCalendarToken(FOUNDATION_THEME, Theme.LIGHT)

        expect(omittedTheme).toEqual(explicitLight)
        expect(omittedTheme.lg.trigger.dateInput.backgroundColor).toBe(
            FOUNDATION_THEME.colors.gray[0]
        )
        expect(omittedTheme.lg.calendar.backgroundColor).toBe(
            FOUNDATION_THEME.colors.gray[0]
        )
        expect(
            omittedTheme.lg.calendar.calendarGrid.day.states.rangeDay
                .backgroundColor
        ).toBe(FOUNDATION_THEME.colors.primary[50])
    })
})
