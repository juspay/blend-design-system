import { describe, it, expect } from 'vitest'
import {
    SECONDS_PER_DAY,
    MIN_TIME,
    MAX_TIME,
    applyTimeValueToDate,
    clampTimeValue,
    createTimeValue,
    formatTimeValue,
    from12Hour,
    generateHourOptions,
    generateMinuteOptions,
    generateSecondOptions,
    generateTimeSlots,
    getTimePlaceholder,
    isTimeWithinBounds,
    parseTimeInput,
    secondsToTimeValue,
    snapToMinuteStep,
    timeValueFromDate,
    timeValueFromString,
    timeValueToSeconds,
    timeValueToString,
    to12Hour,
    type TimeValue,
} from '../../../lib/components/shared/datetime/timeCore'

const t = (hours: number, minutes = 0, seconds = 0): TimeValue => ({
    hours,
    minutes,
    seconds,
})

describe('timeCore', () => {
    describe('createTimeValue', () => {
        it('builds a canonical value with defaulted minutes and seconds', () => {
            expect(createTimeValue(9)).toEqual(t(9, 0, 0))
            expect(createTimeValue(9, 30, 15)).toEqual(t(9, 30, 15))
        })

        it('clamps each unit into its valid range', () => {
            expect(createTimeValue(30, 90, 90)).toEqual(t(23, 59, 59))
            expect(createTimeValue(-5, -5, -5)).toEqual(t(0, 0, 0))
        })

        it('truncates fractional inputs', () => {
            expect(createTimeValue(9.9, 30.7, 15.2)).toEqual(t(9, 30, 15))
        })
    })

    describe('timeValueToSeconds / secondsToTimeValue', () => {
        it('converts a time value to seconds since midnight', () => {
            expect(timeValueToSeconds(t(0, 0, 0))).toBe(0)
            expect(timeValueToSeconds(t(1, 0, 0))).toBe(3600)
            expect(timeValueToSeconds(t(14, 30, 15))).toBe(52215)
            expect(timeValueToSeconds(t(23, 59, 59))).toBe(SECONDS_PER_DAY - 1)
        })

        it('converts seconds back to a time value', () => {
            expect(secondsToTimeValue(0)).toEqual(t(0, 0, 0))
            expect(secondsToTimeValue(52215)).toEqual(t(14, 30, 15))
            expect(secondsToTimeValue(SECONDS_PER_DAY - 1)).toEqual(
                t(23, 59, 59)
            )
        })

        it('round-trips every quarter hour of the day', () => {
            for (let total = 0; total < SECONDS_PER_DAY; total += 900) {
                const value = secondsToTimeValue(total)
                expect(timeValueToSeconds(value)).toBe(total)
            }
        })

        it('normalises values at or beyond 24h back into the day', () => {
            expect(secondsToTimeValue(SECONDS_PER_DAY)).toEqual(t(0, 0, 0))
            expect(secondsToTimeValue(SECONDS_PER_DAY + 3661)).toEqual(
                t(1, 1, 1)
            )
            expect(secondsToTimeValue(SECONDS_PER_DAY * 3 + 60)).toEqual(
                t(0, 1, 0)
            )
        })

        it('normalises negative values by wrapping backwards', () => {
            expect(secondsToTimeValue(-1)).toEqual(t(23, 59, 59))
            expect(secondsToTimeValue(-3600)).toEqual(t(23, 0, 0))
            expect(secondsToTimeValue(-SECONDS_PER_DAY)).toEqual(t(0, 0, 0))
            expect(secondsToTimeValue(-SECONDS_PER_DAY - 60)).toEqual(
                t(23, 59, 0)
            )
        })

        it('truncates fractional seconds before normalising', () => {
            expect(secondsToTimeValue(90.9)).toEqual(t(0, 1, 30))
        })
    })

    describe('timeValueFromDate / applyTimeValueToDate', () => {
        it('reads the time-of-day off a Date', () => {
            const date = new Date(2024, 0, 15, 14, 30, 15)
            expect(timeValueFromDate(date)).toEqual(t(14, 30, 15))
        })

        it('applies a time onto a date without mutating the original', () => {
            const date = new Date(2024, 0, 15, 9, 0, 0)
            const next = applyTimeValueToDate(date, t(22, 45, 30))

            expect(next.getFullYear()).toBe(2024)
            expect(next.getMonth()).toBe(0)
            expect(next.getDate()).toBe(15)
            expect(timeValueFromDate(next)).toEqual(t(22, 45, 30))
            expect(next.getMilliseconds()).toBe(0)
            expect(date.getHours()).toBe(9)
        })
    })

    describe('formatTimeValue', () => {
        it('formats 12h without seconds by default', () => {
            expect(formatTimeValue(t(14, 30, 15))).toBe('2:30 PM')
        })

        it('formats 12h with seconds', () => {
            expect(
                formatTimeValue(t(14, 30, 15), {
                    format: '12h',
                    showSeconds: true,
                })
            ).toBe('2:30:15 PM')
        })

        it('formats 24h without seconds', () => {
            expect(formatTimeValue(t(14, 30, 15), { format: '24h' })).toBe(
                '14:30'
            )
        })

        it('formats 24h with seconds', () => {
            expect(
                formatTimeValue(t(14, 30, 15), {
                    format: '24h',
                    showSeconds: true,
                })
            ).toBe('14:30:15')
        })

        it('renders midnight as 12:00 AM in 12h and 00:00 in 24h', () => {
            expect(formatTimeValue(t(0, 0, 0), { format: '12h' })).toBe(
                '12:00 AM'
            )
            expect(formatTimeValue(t(0, 0, 0), { format: '24h' })).toBe('00:00')
        })

        it('renders noon as 12:00 PM in 12h and 12:00 in 24h', () => {
            expect(formatTimeValue(t(12, 0, 0), { format: '12h' })).toBe(
                '12:00 PM'
            )
            expect(formatTimeValue(t(12, 0, 0), { format: '24h' })).toBe(
                '12:00'
            )
        })

        it('pads minutes and seconds but not the 12h hour', () => {
            expect(formatTimeValue(t(9, 5, 3), { showSeconds: true })).toBe(
                '9:05:03 AM'
            )
            expect(
                formatTimeValue(t(9, 5, 3), {
                    format: '24h',
                    showSeconds: true,
                })
            ).toBe('09:05:03')
        })

        it('handles the last minute of the day', () => {
            expect(formatTimeValue(t(23, 59, 59), { showSeconds: true })).toBe(
                '11:59:59 PM'
            )
            expect(formatTimeValue(t(23, 59, 59), { format: '24h' })).toBe(
                '23:59'
            )
        })
    })

    describe('getTimePlaceholder', () => {
        it('matches the shape of what formatTimeValue produces', () => {
            expect(getTimePlaceholder()).toBe('hh:mm AM')
            expect(getTimePlaceholder({ showSeconds: true })).toBe(
                'hh:mm:ss AM'
            )
            expect(getTimePlaceholder({ format: '24h' })).toBe('HH:mm')
            expect(
                getTimePlaceholder({ format: '24h', showSeconds: true })
            ).toBe('HH:mm:ss')
        })
    })

    describe('timeValueToString / timeValueFromString', () => {
        it('serialises to HH:mm by default and HH:mm:ss with seconds', () => {
            expect(timeValueToString(t(9, 5, 3))).toBe('09:05')
            expect(timeValueToString(t(9, 5, 3), true)).toBe('09:05:03')
            expect(timeValueToString(t(0, 0, 0), true)).toBe('00:00:00')
            expect(timeValueToString(t(23, 59, 59), true)).toBe('23:59:59')
        })

        it('parses canonical strings', () => {
            expect(timeValueFromString('09:05')).toEqual(t(9, 5, 0))
            expect(timeValueFromString('09:05:03')).toEqual(t(9, 5, 3))
            expect(timeValueFromString('23:59:59')).toEqual(t(23, 59, 59))
        })

        it('accepts single-digit units and surrounding whitespace', () => {
            expect(timeValueFromString('9:5')).toEqual(t(9, 5, 0))
            expect(timeValueFromString('  09:05  ')).toEqual(t(9, 5, 0))
        })

        it('round-trips through both serialisation widths', () => {
            const samples = [
                t(0, 0, 0),
                t(9, 5, 3),
                t(14, 30, 15),
                t(23, 59, 59),
            ]
            for (const value of samples) {
                expect(
                    timeValueFromString(timeValueToString(value, true))
                ).toEqual(value)
                expect(timeValueFromString(timeValueToString(value))).toEqual({
                    ...value,
                    seconds: 0,
                })
            }
        })

        it('returns null for invalid strings', () => {
            expect(timeValueFromString('')).toBeNull()
            expect(timeValueFromString('abc')).toBeNull()
            expect(timeValueFromString('24:00')).toBeNull()
            expect(timeValueFromString('12:60')).toBeNull()
            expect(timeValueFromString('12:30:60')).toBeNull()
            expect(timeValueFromString('12')).toBeNull()
            expect(timeValueFromString('12:30 PM')).toBeNull()
            expect(timeValueFromString('1230')).toBeNull()
            expect(timeValueFromString('12:30:45:60')).toBeNull()
        })
    })

    describe('to12Hour / from12Hour', () => {
        it('maps midnight and noon onto 12', () => {
            expect(to12Hour(0)).toEqual({ hour: 12, period: 'AM' })
            expect(to12Hour(12)).toEqual({ hour: 12, period: 'PM' })
        })

        it('maps the rest of the day', () => {
            expect(to12Hour(1)).toEqual({ hour: 1, period: 'AM' })
            expect(to12Hour(11)).toEqual({ hour: 11, period: 'AM' })
            expect(to12Hour(13)).toEqual({ hour: 1, period: 'PM' })
            expect(to12Hour(23)).toEqual({ hour: 11, period: 'PM' })
        })

        it('converts 12 AM to 0 and 12 PM to 12', () => {
            expect(from12Hour(12, 'AM')).toBe(0)
            expect(from12Hour(12, 'PM')).toBe(12)
        })

        it('converts the rest of the day', () => {
            expect(from12Hour(1, 'AM')).toBe(1)
            expect(from12Hour(11, 'AM')).toBe(11)
            expect(from12Hour(1, 'PM')).toBe(13)
            expect(from12Hour(11, 'PM')).toBe(23)
        })

        it('round-trips every hour of the day', () => {
            for (let hours = 0; hours < 24; hours++) {
                const { hour, period } = to12Hour(hours)
                expect(from12Hour(hour, period)).toBe(hours)
            }
        })
    })

    describe('isTimeWithinBounds', () => {
        it('is true when no bounds are supplied', () => {
            expect(isTimeWithinBounds(t(0, 0, 0))).toBe(true)
            expect(isTimeWithinBounds(t(23, 59, 59))).toBe(true)
        })

        it('treats both bounds as inclusive', () => {
            expect(isTimeWithinBounds(t(9, 0), t(9, 0), t(17, 0))).toBe(true)
            expect(isTimeWithinBounds(t(17, 0), t(9, 0), t(17, 0))).toBe(true)
        })

        it('rejects values outside the bounds', () => {
            expect(isTimeWithinBounds(t(8, 59, 59), t(9, 0), t(17, 0))).toBe(
                false
            )
            expect(isTimeWithinBounds(t(17, 0, 1), t(9, 0), t(17, 0))).toBe(
                false
            )
        })

        it('honours a lone min or a lone max', () => {
            expect(isTimeWithinBounds(t(8, 0), t(9, 0))).toBe(false)
            expect(isTimeWithinBounds(t(23, 0), t(9, 0))).toBe(true)
            expect(isTimeWithinBounds(t(18, 0), undefined, t(17, 0))).toBe(
                false
            )
            expect(isTimeWithinBounds(t(0, 0), undefined, t(17, 0))).toBe(true)
        })

        it('compares at second granularity', () => {
            expect(
                isTimeWithinBounds(t(9, 0, 0), t(9, 0, 1), t(17, 0, 0))
            ).toBe(false)
            expect(
                isTimeWithinBounds(t(9, 0, 1), t(9, 0, 1), t(17, 0, 0))
            ).toBe(true)
        })
    })

    describe('clampTimeValue', () => {
        it('leaves values already inside the bounds untouched', () => {
            expect(clampTimeValue(t(12, 30), t(9, 0), t(17, 0))).toEqual(
                t(12, 30, 0)
            )
        })

        it('leaves values at the bounds untouched', () => {
            expect(clampTimeValue(t(9, 0), t(9, 0), t(17, 0))).toEqual(
                t(9, 0, 0)
            )
            expect(clampTimeValue(t(17, 0), t(9, 0), t(17, 0))).toEqual(
                t(17, 0, 0)
            )
        })

        it('raises values below the minimum', () => {
            expect(clampTimeValue(t(6, 0), t(9, 0), t(17, 0))).toEqual(
                t(9, 0, 0)
            )
            expect(clampTimeValue(t(0, 0, 0), t(9, 30, 15))).toEqual(
                t(9, 30, 15)
            )
        })

        it('lowers values above the maximum', () => {
            expect(clampTimeValue(t(22, 0), t(9, 0), t(17, 0))).toEqual(
                t(17, 0, 0)
            )
            expect(
                clampTimeValue(t(23, 59, 59), undefined, t(17, 45, 30))
            ).toEqual(t(17, 45, 30))
        })

        it('is a no-op when no bounds are supplied', () => {
            expect(clampTimeValue(t(14, 30, 15))).toEqual(t(14, 30, 15))
        })

        it('lets the minimum win when the bounds are inverted', () => {
            expect(clampTimeValue(t(12, 0), t(17, 0), t(9, 0))).toEqual(
                t(17, 0, 0)
            )
            expect(clampTimeValue(t(0, 0), t(17, 0), t(9, 0))).toEqual(
                t(17, 0, 0)
            )
            expect(clampTimeValue(t(23, 0), t(17, 0), t(9, 0))).toEqual(
                t(17, 0, 0)
            )
        })

        it('clamps against the exported day bounds', () => {
            expect(clampTimeValue(t(12, 0), MIN_TIME, MAX_TIME)).toEqual(
                t(12, 0, 0)
            )
            expect(MIN_TIME).toEqual(t(0, 0, 0))
            expect(MAX_TIME).toEqual(t(23, 59, 59))
        })
    })

    describe('generateTimeSlots', () => {
        it('produces 96 quarter-hour slots for a full day by default', () => {
            const slots = generateTimeSlots()
            expect(slots).toHaveLength(96)
            expect(slots[0]).toEqual(t(0, 0, 0))
            expect(slots[1]).toEqual(t(0, 15, 0))
            expect(slots[4]).toEqual(t(1, 0, 0))
            expect(slots[95]).toEqual(t(23, 45, 0))
        })

        it('always emits zero seconds', () => {
            expect(
                generateTimeSlots().every((slot) => slot.seconds === 0)
            ).toBe(true)
        })

        it('honours a custom step', () => {
            expect(generateTimeSlots({ stepMinutes: 30 })).toHaveLength(48)
            expect(generateTimeSlots({ stepMinutes: 60 })).toHaveLength(24)
            expect(generateTimeSlots({ stepMinutes: 1 })).toHaveLength(1440)
            expect(generateTimeSlots({ stepMinutes: 20 }).slice(0, 4)).toEqual([
                t(0, 0, 0),
                t(0, 20, 0),
                t(0, 40, 0),
                t(1, 0, 0),
            ])
        })

        it('treats steps below 1 as 1', () => {
            expect(generateTimeSlots({ stepMinutes: 0 })).toHaveLength(1440)
            expect(generateTimeSlots({ stepMinutes: -5 })).toHaveLength(1440)
        })

        it('restricts the list to [minTime, maxTime] inclusively', () => {
            const slots = generateTimeSlots({
                minTime: t(9, 0),
                maxTime: t(11, 0),
            })
            expect(slots).toEqual([
                t(9, 0, 0),
                t(9, 15, 0),
                t(9, 30, 0),
                t(9, 45, 0),
                t(10, 0, 0),
                t(10, 15, 0),
                t(10, 30, 0),
                t(10, 45, 0),
                t(11, 0, 0),
            ])
        })

        it('stops at the max minute within the final hour', () => {
            const slots = generateTimeSlots({
                minTime: t(9, 0),
                maxTime: t(9, 40),
            })
            expect(slots).toEqual([t(9, 0, 0), t(9, 15, 0), t(9, 30, 0)])
        })

        it('restarts the step grid at :00 on every new hour (legacy semantics)', () => {
            const slots = generateTimeSlots({
                minTime: t(10, 7),
                maxTime: t(11, 59),
            })
            expect(slots).toEqual([
                t(10, 7, 0),
                t(10, 22, 0),
                t(10, 37, 0),
                t(10, 52, 0),
                t(11, 0, 0),
                t(11, 15, 0),
                t(11, 30, 0),
                t(11, 45, 0),
            ])
        })

        it('only offsets the first hour, never later ones', () => {
            const slots = generateTimeSlots({
                stepMinutes: 30,
                minTime: t(8, 10),
                maxTime: t(10, 0),
            })
            expect(slots).toEqual([
                t(8, 10, 0),
                t(8, 40, 0),
                t(9, 0, 0),
                t(9, 30, 0),
                t(10, 0, 0),
            ])
        })

        it('ignores the seconds component of the bounds', () => {
            const slots = generateTimeSlots({
                minTime: t(9, 0, 59),
                maxTime: t(9, 30, 59),
            })
            expect(slots).toEqual([t(9, 0, 0), t(9, 15, 0), t(9, 30, 0)])
        })

        it('returns an empty list when the bounds are inverted', () => {
            expect(
                generateTimeSlots({ minTime: t(17, 0), maxTime: t(9, 0) })
            ).toEqual([])
        })

        it('emits a single slot when min and max are the same instant', () => {
            expect(
                generateTimeSlots({ minTime: t(9, 30), maxTime: t(9, 30) })
            ).toEqual([t(9, 30, 0)])
        })
    })

    describe('generateHourOptions', () => {
        it('lists 0-23 for the 24h format', () => {
            const hours = generateHourOptions('24h')
            expect(hours).toHaveLength(24)
            expect(hours[0]).toBe(0)
            expect(hours[23]).toBe(23)
        })

        it('defaults to the 24h format', () => {
            expect(generateHourOptions()).toEqual(generateHourOptions('24h'))
        })

        it('lists 12,1..11 for the 12h format', () => {
            const hours = generateHourOptions('12h')
            expect(hours).toHaveLength(12)
            expect(hours).toEqual([12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
        })
    })

    describe('generateMinuteOptions / generateSecondOptions', () => {
        it('lists every minute by default', () => {
            const minutes = generateMinuteOptions()
            expect(minutes).toHaveLength(60)
            expect(minutes[0]).toBe(0)
            expect(minutes[59]).toBe(59)
        })

        it('honours a step', () => {
            expect(generateMinuteOptions(15)).toEqual([0, 15, 30, 45])
            expect(generateMinuteOptions(5)).toHaveLength(12)
            expect(generateMinuteOptions(30)).toEqual([0, 30])
            expect(generateMinuteOptions(60)).toEqual([0])
        })

        it('never emits a value at or beyond 60', () => {
            expect(generateMinuteOptions(7)).toEqual([
                0, 7, 14, 21, 28, 35, 42, 49, 56,
            ])
        })

        it('treats steps below 1 as 1 and truncates fractional steps', () => {
            expect(generateMinuteOptions(0)).toHaveLength(60)
            expect(generateMinuteOptions(-1)).toHaveLength(60)
            expect(generateMinuteOptions(15.9)).toEqual([0, 15, 30, 45])
        })

        it('generates seconds the same way', () => {
            expect(generateSecondOptions()).toHaveLength(60)
            expect(generateSecondOptions(15)).toEqual([0, 15, 30, 45])
            expect(generateSecondOptions(0)).toHaveLength(60)
        })
    })

    describe('snapToMinuteStep', () => {
        it('is a no-op for a step of 1', () => {
            const value = t(9, 37, 12)
            expect(snapToMinuteStep(value, 1)).toBe(value)
        })

        it('rounds to the nearest step', () => {
            expect(snapToMinuteStep(t(9, 7), 15)).toEqual(t(9, 0, 0))
            expect(snapToMinuteStep(t(9, 8), 15)).toEqual(t(9, 15, 0))
            expect(snapToMinuteStep(t(9, 22), 15)).toEqual(t(9, 15, 0))
            expect(snapToMinuteStep(t(9, 23), 15)).toEqual(t(9, 30, 0))
        })

        it('preserves the seconds component', () => {
            expect(snapToMinuteStep(t(9, 16, 42), 15)).toEqual(t(9, 15, 42))
        })

        it('rolls into the next hour when rounding overflows', () => {
            expect(snapToMinuteStep(t(9, 53, 20), 15)).toEqual(t(10, 0, 20))
        })

        it('wraps past midnight when the last hour overflows', () => {
            expect(snapToMinuteStep(t(23, 53), 15)).toEqual(t(0, 0, 0))
        })

        it('treats steps below 1 as 1', () => {
            const value = t(9, 37, 12)
            expect(snapToMinuteStep(value, 0)).toBe(value)
            expect(snapToMinuteStep(value, -5)).toBe(value)
        })
    })

    describe('parseTimeInput', () => {
        // Fixed clocks so the ambiguous-hour heuristic is deterministic.
        const morning = new Date(2024, 0, 15, 9, 0, 0)
        const afternoon = new Date(2024, 0, 15, 15, 0, 0)

        describe('explicit AM/PM', () => {
            it('parses "2:30 PM"', () => {
                expect(parseTimeInput('2:30 PM')).toEqual(t(14, 30, 0))
            })

            it('parses "2:30 AM"', () => {
                expect(parseTimeInput('2:30 AM')).toEqual(t(2, 30, 0))
            })

            it('parses seconds alongside a period', () => {
                expect(parseTimeInput('2:30:15 PM')).toEqual(t(14, 30, 15))
            })

            it('parses "12 AM" as midnight', () => {
                expect(parseTimeInput('12 AM')).toEqual(t(0, 0, 0))
            })

            it('parses "12 PM" as noon', () => {
                expect(parseTimeInput('12 PM')).toEqual(t(12, 0, 0))
            })

            it('is case-insensitive and tolerates spacing', () => {
                expect(parseTimeInput('2:30 pm')).toEqual(t(14, 30, 0))
                expect(parseTimeInput('2:30pm')).toEqual(t(14, 30, 0))
                expect(parseTimeInput('  2:30   PM  ')).toEqual(t(14, 30, 0))
            })

            it('rejects a 12h hour outside 1-12', () => {
                expect(parseTimeInput('0:30 PM')).toBeNull()
                expect(parseTimeInput('13:30 PM')).toBeNull()
            })
        })

        describe('24-hour input', () => {
            it('parses "14:30"', () => {
                expect(parseTimeInput('14:30')).toEqual(t(14, 30, 0))
            })

            it('parses "14:30:45"', () => {
                expect(parseTimeInput('14:30:45')).toEqual(t(14, 30, 45))
            })

            it('parses "00:00"', () => {
                expect(
                    parseTimeInput('00:00', { ambiguousHourHeuristic: false })
                ).toEqual(t(0, 0, 0))
            })

            it('rejects hours beyond 23 and minutes/seconds beyond 59', () => {
                expect(parseTimeInput('24:00')).toBeNull()
                expect(parseTimeInput('14:60')).toBeNull()
                expect(parseTimeInput('14:30:60')).toBeNull()
            })
        })

        describe('compact input', () => {
            it('parses 4-digit input as HHmm', () => {
                expect(parseTimeInput('1430')).toEqual(t(14, 30, 0))
                expect(
                    parseTimeInput('0930', { ambiguousHourHeuristic: false })
                ).toEqual(t(9, 30, 0))
            })

            it('parses 3-digit input as Hmm', () => {
                expect(
                    parseTimeInput('230', { ambiguousHourHeuristic: false })
                ).toEqual(t(2, 30, 0))
                expect(
                    parseTimeInput('930', { ambiguousHourHeuristic: false })
                ).toEqual(t(9, 30, 0))
            })

            it('rejects compact input with an invalid minute or hour', () => {
                expect(parseTimeInput('1499')).toBeNull()
                expect(parseTimeInput('2530')).toBeNull()
            })

            it('does not accept 1- or 2-digit input', () => {
                expect(parseTimeInput('3')).toBeNull()
                expect(parseTimeInput('14')).toBeNull()
            })
        })

        describe('unparseable input', () => {
            it('returns null for empty and whitespace-only input', () => {
                expect(parseTimeInput('')).toBeNull()
                expect(parseTimeInput('   ')).toBeNull()
            })

            it('returns null for garbage', () => {
                expect(parseTimeInput('abc')).toBeNull()
                expect(parseTimeInput('12:ab')).toBeNull()
                expect(parseTimeInput('--:--')).toBeNull()
                expect(parseTimeInput('2:30 XM')).toBeNull()
                expect(parseTimeInput('12345')).toBeNull()
                expect(parseTimeInput('2:30:15:20')).toBeNull()
            })
        })

        describe('allowSeconds', () => {
            it('accepts seconds by default', () => {
                // Clock injected: bare "12" is ambiguous, so the default
                // heuristic would fold it to 00:30:45 before local noon.
                expect(parseTimeInput('12:30:45', { now: afternoon })).toEqual(
                    t(12, 30, 45)
                )
            })

            it('rejects seconds when allowSeconds is false', () => {
                expect(
                    parseTimeInput('12:30:45', { allowSeconds: false })
                ).toBeNull()
                expect(
                    parseTimeInput('2:30:15 PM', { allowSeconds: false })
                ).toBeNull()
            })

            it('still accepts minute-precision input when allowSeconds is false', () => {
                expect(
                    parseTimeInput('14:30', { allowSeconds: false })
                ).toEqual(t(14, 30, 0))
                expect(
                    parseTimeInput('2:30 PM', { allowSeconds: false })
                ).toEqual(t(14, 30, 0))
            })
        })

        describe('ambiguousHourHeuristic', () => {
            it('leaves 1-12 alone when disabled', () => {
                expect(
                    parseTimeInput('03:00', { ambiguousHourHeuristic: false })
                ).toEqual(t(3, 0, 0))
                expect(
                    parseTimeInput('12:30', { ambiguousHourHeuristic: false })
                ).toEqual(t(12, 30, 0))
            })

            it('cannot parse a bare hour even with the heuristic disabled', () => {
                // "3" matches none of the accepted shapes — the heuristic only
                // decides AM/PM, it never widens what counts as a time.
                expect(
                    parseTimeInput('3', { ambiguousHourHeuristic: false })
                ).toBeNull()
                expect(
                    parseTimeInput('3', { ambiguousHourHeuristic: true })
                ).toBeNull()
            })

            it('guesses PM when the injected clock is in the afternoon', () => {
                expect(
                    parseTimeInput('3:00', {
                        ambiguousHourHeuristic: true,
                        now: afternoon,
                    })
                ).toEqual(t(15, 0, 0))
                expect(
                    parseTimeInput('330', {
                        ambiguousHourHeuristic: true,
                        now: afternoon,
                    })
                ).toEqual(t(15, 30, 0))
            })

            it('guesses AM when the injected clock is in the morning', () => {
                expect(
                    parseTimeInput('3:00', {
                        ambiguousHourHeuristic: true,
                        now: morning,
                    })
                ).toEqual(t(3, 0, 0))
            })

            it('keeps 12 as noon in the afternoon and folds it to midnight in the morning', () => {
                expect(
                    parseTimeInput('12:30', {
                        ambiguousHourHeuristic: true,
                        now: afternoon,
                    })
                ).toEqual(t(12, 30, 0))
                expect(
                    parseTimeInput('12:30', {
                        ambiguousHourHeuristic: true,
                        now: morning,
                    })
                ).toEqual(t(0, 30, 0))
            })

            it('never touches hours already beyond 12', () => {
                expect(
                    parseTimeInput('14:30', {
                        ambiguousHourHeuristic: true,
                        now: afternoon,
                    })
                ).toEqual(t(14, 30, 0))
                expect(
                    parseTimeInput('00:30', {
                        ambiguousHourHeuristic: true,
                        now: afternoon,
                    })
                ).toEqual(t(0, 30, 0))
            })

            it('never applies to input with an explicit period', () => {
                expect(
                    parseTimeInput('3:00 AM', {
                        ambiguousHourHeuristic: true,
                        now: afternoon,
                    })
                ).toEqual(t(3, 0, 0))
            })
        })

        describe('bounds', () => {
            it('returns the value when it sits inside the bounds', () => {
                expect(
                    parseTimeInput('10:30', {
                        ambiguousHourHeuristic: false,
                        minTime: t(9, 0),
                        maxTime: t(17, 0),
                    })
                ).toEqual(t(10, 30, 0))
            })

            it('returns null when the value falls outside the bounds', () => {
                expect(
                    parseTimeInput('08:30', {
                        ambiguousHourHeuristic: false,
                        minTime: t(9, 0),
                        maxTime: t(17, 0),
                    })
                ).toBeNull()
                expect(
                    parseTimeInput('18:30', {
                        ambiguousHourHeuristic: false,
                        minTime: t(9, 0),
                        maxTime: t(17, 0),
                    })
                ).toBeNull()
                expect(
                    parseTimeInput('11:30 PM', { maxTime: t(17, 0) })
                ).toBeNull()
            })

            it('accepts values exactly on the bounds', () => {
                expect(
                    parseTimeInput('09:00', {
                        ambiguousHourHeuristic: false,
                        minTime: t(9, 0),
                        maxTime: t(17, 0),
                    })
                ).toEqual(t(9, 0, 0))
                expect(
                    parseTimeInput('17:00', {
                        ambiguousHourHeuristic: false,
                        minTime: t(9, 0),
                        maxTime: t(17, 0),
                    })
                ).toEqual(t(17, 0, 0))
            })
        })
    })
})
