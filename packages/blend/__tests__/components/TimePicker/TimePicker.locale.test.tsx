import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test-utils'
import { TimePicker } from '../../../lib/components/TimePicker'
import {
    formatTimeValue,
    getTimePlaceholder,
} from '../../../lib/components/shared/datetime/timeCore'

const JAPANESE: Record<string, string> = {
    'time-picker.label.am': '午前',
    'time-picker.label.pm': '午後',
}
const t = (key: string) => JAPANESE[key]
const ja = { providerProps: { locale: 'ja-JP', t } }

const at = (hours: number, minutes: number) => ({
    hours,
    minutes,
    seconds: 0,
})

/**
 * The period column already showed 午前/午後, but the trigger text and its
 * placeholder still printed English AM/PM.
 */
describe('TimePicker day period locale', () => {
    it('keeps English AM/PM with no provider locale', () => {
        render(<TimePicker value={at(14, 30)} />)

        expect(
            screen.getByRole('button', { name: /time picker/i })
        ).toHaveTextContent('2:30 PM')
    })

    it('uses the translated day period in the trigger and placeholder', () => {
        const { unmount } = render(<TimePicker value={at(14, 30)} />, ja)
        expect(
            screen.getByRole('button', { name: /time picker/i })
        ).toHaveTextContent('2:30 午後')
        unmount()

        render(<TimePicker />, ja)
        expect(
            screen.getByRole('button', { name: /time picker/i })
        ).toHaveTextContent('hh:mm 午前')
    })

    it('keeps the pure helpers English unless day periods are passed', () => {
        expect(formatTimeValue(at(9, 5))).toBe('9:05 AM')
        expect(getTimePlaceholder({ showSeconds: true })).toBe('hh:mm:ss AM')
        expect(
            formatTimeValue(at(9, 5), { dayPeriods: { am: 'a', pm: 'p' } })
        ).toBe('9:05 a')
    })
})
