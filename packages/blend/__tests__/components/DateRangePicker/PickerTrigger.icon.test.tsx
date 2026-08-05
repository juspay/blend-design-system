import { describe, it, expect } from 'vitest'
import { Clock } from 'lucide-react'
import { render, screen, MockIcon } from '../../test-utils'
import SingleDatePicker from '../../../lib/components/SingleDatePicker/SingleDatePicker'
import { TimePicker } from '../../../lib/components/TimePicker'
import { renderPickerTrigger } from '../../../lib/components/shared/datetime/PickerTrigger'
import { getCalendarToken } from '../../../lib/components/DateRangePicker/dateRangePicker.tokens'
import { DateRangePickerSize } from '../../../lib/components/DateRangePicker/types'
import { FOUNDATION_THEME } from '../../../lib/tokens'

const FIXED_DATE = new Date(2025, 8, 15)

const getDefaultTrigger = () =>
    document.querySelector(
        '[data-element="datepicker-selector"]'
    ) as HTMLElement

/**
 * Branch 4 of `renderPickerTrigger` resolves its leading icon in three steps:
 * `triggerConfig.showIcon === false` wins outright, then `triggerConfig.icon`,
 * then the component's own `defaultIcon`, then the `Calendar` fallback. Only
 * the icon is wrapped in an `aria-hidden` span; the chevron is a bare svg, so
 * it is what distinguishes "no icon" from "no trigger".
 */
describe('renderPickerTrigger icon resolution (branch 4)', () => {
    it('drops the leading icon for showIcon: false but keeps the chevron', () => {
        const { unmount } = render(
            <SingleDatePicker value={FIXED_DATE} onChange={() => {}} />
        )
        const withIcon = getDefaultTrigger()
        expect(
            withIcon.querySelector('span[aria-hidden="true"] svg')
        ).not.toBeNull()
        expect(withIcon.querySelectorAll('svg')).toHaveLength(2)
        unmount()

        render(
            <SingleDatePicker
                value={FIXED_DATE}
                onChange={() => {}}
                triggerConfig={{ showIcon: false }}
            />
        )
        const withoutIcon = getDefaultTrigger()
        expect(withoutIcon.querySelector('span[aria-hidden="true"]')).toBeNull()
        // The chevron survives, so the trigger still renders its affordance.
        expect(withoutIcon.querySelectorAll('svg')).toHaveLength(1)
    })

    it('prefers triggerConfig.icon over the component default icon', () => {
        const { unmount } = render(<TimePicker />)
        // TimePicker passes a Clock as `defaultIcon`, so the Calendar fallback
        // must not be what renders.
        expect(
            getDefaultTrigger().querySelector('.lucide-clock')
        ).not.toBeNull()
        expect(getDefaultTrigger().querySelector('.lucide-calendar')).toBeNull()
        unmount()

        render(
            <SingleDatePicker
                value={FIXED_DATE}
                onChange={() => {}}
                triggerConfig={{ icon: <MockIcon /> }}
            />
        )
        expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
        expect(getDefaultTrigger().querySelector('.lucide-calendar')).toBeNull()
    })

    /**
     * The `triggerConfig.icon || defaultIcon` precedence is unreachable through
     * any public component: `TimePicker` supplies `defaultIcon` but accepts no
     * `triggerConfig`, and `SingleDatePicker` accepts `triggerConfig` but
     * supplies no `defaultIcon`. Exercising it therefore requires calling the
     * render function directly — otherwise swapping the two operands in
     * `PickerTrigger.tsx` passes the entire suite.
     */
    it('resolves triggerConfig.icon ahead of defaultIcon when both are supplied', () => {
        const calendarToken = getCalendarToken(FOUNDATION_THEME).lg

        render(
            renderPickerTrigger({
                displayText: '15/09/2025',
                displayRange: { startDate: FIXED_DATE },
                isOpen: false,
                isDisabled: false,
                size: DateRangePickerSize.MEDIUM,
                calendarToken,
                defaultIcon: <Clock data-testid="default-clock" />,
                triggerConfig: { icon: <MockIcon /> },
                onToggle: () => {},
                ariaLabel: 'Date picker, 15/09/2025',
                dataDatePicker: 'test-Filter',
            })
        )

        expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
        expect(screen.queryByTestId('default-clock')).toBeNull()
    })
})
