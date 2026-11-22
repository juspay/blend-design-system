import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test-utils'
import { TimePicker } from '../../../lib/components/TimePicker'
import SingleDatePicker from '../../../lib/components/SingleDatePicker/SingleDatePicker'
import { DateFormatPreset } from '../../../lib/components/DateRangePicker/types'
import {
    formatTimeValue,
    getTimePlaceholder,
} from '../../../lib/components/shared/datetime/timeCore'
import { createPeriodFormatter } from '../../../lib/components/shared/datetime/dayPeriod'

// Japanese puts the day period first: 午後2:30, not 2:30 午後.
const JAPANESE: Record<string, string> = {
    'time-picker.label.am': '午前',
    'time-picker.label.pm': '午後',
    'time-picker.label.time-with-period': '{period}{time}',
    'time-picker.a11y.trigger': '時刻選択、{value}',
}
const t = (key: string) => JAPANESE[key]
const ja = { providerProps: { locale: 'ja-JP', t } }

const at = (hours: number, minutes: number) => ({
    hours,
    minutes,
    seconds: 0,
})

/**
 * The period column already showed 午前/午後, but the trigger text, its
 * placeholder and its accessible name still printed English AM/PM.
 */
describe('TimePicker day period locale (Accessibility names included)', () => {
    it('keeps English text and name with no provider locale', () => {
        render(<TimePicker value={at(14, 30)} />)

        const trigger = screen.getByRole('button', {
            name: 'Time picker, 2:30 PM',
        })
        expect(trigger).toHaveTextContent('2:30 PM')
    })

    it('lets the locale place the day period and names the trigger in that language', () => {
        render(<TimePicker value={at(14, 30)} />, ja)

        const trigger = screen.getByRole('button', {
            name: '時刻選択、午後2:30',
        })
        expect(trigger).toHaveTextContent('午後2:30')
    })

    it('uses the same pattern for the placeholder', () => {
        render(<TimePicker />, ja)

        expect(
            screen.getByRole('button', { name: /時刻選択/ })
        ).toHaveTextContent('午前hh:mm')
    })

    it('localizes the SingleDatePicker trigger on the formatConfig path too', () => {
        render(
            <SingleDatePicker
                value={new Date(2025, 8, 15, 14, 45)}
                onChange={vi.fn()}
                showTime
                formatConfig={{
                    preset: DateFormatPreset.LONG_SINGLE,
                    timeFormat: '12h',
                }}
            />,
            ja
        )

        expect(screen.getByText(/午後2:45/)).toBeInTheDocument()
    })

    it('keeps the pure helpers English unless a formatter is passed', () => {
        expect(formatTimeValue(at(9, 5))).toBe('9:05 AM')
        expect(getTimePlaceholder({ showSeconds: true })).toBe('hh:mm:ss AM')
        expect(
            formatTimeValue(at(9, 5), {
                formatWithPeriod: createPeriodFormatter(t),
            })
        ).toBe('午前9:05')
        expect(createPeriodFormatter()('2:30', 'PM')).toBe('2:30 PM')
    })
})
