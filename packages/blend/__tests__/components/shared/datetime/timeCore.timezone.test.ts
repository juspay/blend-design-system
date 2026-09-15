import { describe, it, expect, vi } from 'vitest'
import {
    applyTimeValueToDate,
    createDateFromParts,
    getDateTimeParts,
    isSameCalendarDayInTimezone,
    sanitizeStep,
    timeValueFromDate,
    type TimeValue,
} from '../../../../lib/components/shared/datetime/timeCore'

/**
 * Every assertion here is about an IANA zone, never about the machine zone, so
 * the suite has to pass identically under `TZ=UTC` and `TZ=Asia/Kolkata`. Any
 * `new Date(y, m, d)` or `.getHours()` would break that — build instants from
 * ISO strings or `createDateFromParts`, and read them back through
 * `getDateTimeParts(date, timezone)`.
 */

const t = (hours: number, minutes = 0, seconds = 0): TimeValue => ({
    hours,
    minutes,
    seconds,
})

/** Noon on a local calendar day — never inside a DST gap, in any zone. */
const noonOn = (isoDay: string, timezone: string): Date => {
    const [year, month, day] = isoDay.split('-').map(Number)
    return createDateFromParts(
        { year, month: month - 1, day, hours: 12, minutes: 0, seconds: 0 },
        timezone
    )
}

const localOf = (date: Date, timezone: string): string => {
    const p = getDateTimeParts(date, timezone)
    const pad = (n: number) => String(n).padStart(2, '0')
    return `${p.year}-${pad(p.month + 1)}-${pad(p.day)} ${pad(p.hours)}:${pad(
        p.minutes
    )}:${pad(p.seconds)}`
}

const shiftDay = (isoDay: string, deltaDays: number): string => {
    const [year, month, day] = isoDay.split('-').map(Number)
    const shifted = new Date(Date.UTC(year, month - 1, day + deltaDays))
    const pad = (n: number) => String(n).padStart(2, '0')
    return `${shifted.getUTCFullYear()}-${pad(
        shifted.getUTCMonth() + 1
    )}-${pad(shifted.getUTCDate())}`
}

/**
 * 2025 transition days per zone, plus a plain summer day. Offsets are quarter-
 * hour (`America/St_Johns` -03:30), 45-minute (`Asia/Kathmandu` +05:45) and
 * beyond +12 (`Pacific/Kiritimati` +14) so the resolver is exercised outside
 * whole-hour arithmetic too.
 */
const ZONE_PROBE_DAYS: Record<string, string[]> = {
    // Transitions at local midnight — the case that used to move the day.
    'America/Santiago': ['2025-04-05', '2025-09-07', '2025-06-15'],
    'America/Havana': ['2025-03-09', '2025-11-02', '2025-06-15'],
    'America/New_York': ['2025-03-09', '2025-11-02', '2025-06-15'],
    'Europe/Berlin': ['2025-03-30', '2025-10-26', '2025-06-15'],
    'Australia/Sydney': ['2025-04-06', '2025-10-05', '2025-06-15'],
    'America/St_Johns': ['2025-03-09', '2025-11-02', '2025-06-15'],
    // No DST at all — these must stay boring.
    'Asia/Kolkata': ['2025-03-09', '2025-10-26', '2025-06-15'],
    'Asia/Kathmandu': ['2025-03-09', '2025-10-26', '2025-06-15'],
    'Pacific/Kiritimati': ['2025-03-09', '2025-10-26', '2025-06-15'],
}

const probeDays = (zone: string): string[] => {
    const days = new Set<string>()
    for (const day of ZONE_PROBE_DAYS[zone]) {
        days.add(shiftDay(day, -1))
        days.add(day)
        days.add(shiftDay(day, 1))
    }
    return [...days]
}

const EVERY_MINUTE_OF_INTEREST: TimeValue[] = []
for (let hours = 0; hours < 24; hours++) {
    for (const minutes of [0, 15, 30, 45, 59]) {
        EVERY_MINUTE_OF_INTEREST.push(t(hours, minutes, 0))
    }
}

const zones = Object.keys(ZONE_PROBE_DAYS)

describe('timeCore timezone resolution', () => {
    describe('regression: wall-clock times inside a DST gap', () => {
        it('keeps the calendar day when Santiago skips midnight (2025-09-07)', () => {
            // Chile springs forward at 24:00 on 2025-09-06, so 00:00-00:59 on
            // the 7th never happens. Resolving backwards used to answer
            // 2025-09-06 23:00 — the wrong day, which SingleDatePicker commits.
            const zone = 'America/Santiago'
            const picked = noonOn('2025-09-07', zone)
            const applied = applyTimeValueToDate(picked, t(0, 0, 0), zone)

            expect(localOf(applied, zone)).toBe('2025-09-07 01:00:00')
            expect(isSameCalendarDayInTimezone(applied, picked, zone)).toBe(
                true
            )
        })

        it('keeps the calendar day when Havana skips midnight (2025-03-09)', () => {
            const zone = 'America/Havana'
            const picked = noonOn('2025-03-09', zone)
            const applied = applyTimeValueToDate(picked, t(0, 0, 0), zone)

            expect(localOf(applied, zone)).toBe('2025-03-09 01:00:00')
            expect(isSameCalendarDayInTimezone(applied, picked, zone)).toBe(
                true
            )
        })

        it('never resolves a New York gap time earlier than requested (2025-03-09)', () => {
            const zone = 'America/New_York'
            const picked = noonOn('2025-03-09', zone)
            const applied = applyTimeValueToDate(picked, t(2, 30, 0), zone)

            // Used to answer 01:30 — an hour *before* what the user asked for.
            expect(localOf(applied, zone)).toBe('2025-03-09 03:30:00')
        })
    })

    describe('gap policy: resolve forward by the size of the gap', () => {
        const cases: Array<{
            zone: string
            requested: [string, TimeValue]
            local: string
            instant: string
        }> = [
            {
                zone: 'America/New_York',
                requested: ['2025-03-09', t(2, 30, 0)],
                local: '2025-03-09 03:30:00',
                instant: '2025-03-09T07:30:00.000Z',
            },
            {
                zone: 'Europe/Berlin',
                requested: ['2025-03-30', t(2, 30, 0)],
                local: '2025-03-30 03:30:00',
                instant: '2025-03-30T01:30:00.000Z',
            },
            {
                zone: 'Australia/Sydney',
                requested: ['2025-10-05', t(2, 30, 0)],
                local: '2025-10-05 03:30:00',
                instant: '2025-10-04T16:30:00.000Z',
            },
            {
                // -03:30 standard, so the forward shift lands on a half hour.
                zone: 'America/St_Johns',
                requested: ['2025-03-09', t(2, 30, 0)],
                local: '2025-03-09 03:30:00',
                instant: '2025-03-09T06:00:00.000Z',
            },
            {
                zone: 'America/Santiago',
                requested: ['2025-09-07', t(0, 30, 0)],
                local: '2025-09-07 01:30:00',
                instant: '2025-09-07T04:30:00.000Z',
            },
            {
                zone: 'America/Havana',
                requested: ['2025-03-09', t(0, 0, 0)],
                local: '2025-03-09 01:00:00',
                instant: '2025-03-09T05:00:00.000Z',
            },
        ]

        for (const { zone, requested, local, instant } of cases) {
            const [isoDay, time] = requested
            it(`${zone} ${isoDay} ${time.hours}:${String(time.minutes).padStart(
                2,
                '0'
            )} shifts forward to ${local}`, () => {
                const [year, month, day] = isoDay.split('-').map(Number)
                const resolved = createDateFromParts(
                    {
                        year,
                        month: month - 1,
                        day,
                        hours: time.hours,
                        minutes: time.minutes,
                        seconds: time.seconds,
                    },
                    zone
                )
                expect(resolved.toISOString()).toBe(instant)
                expect(localOf(resolved, zone)).toBe(local)
            })
        }

        it('leaves the last existing minute before the gap alone', () => {
            const zone = 'America/New_York'
            const resolved = createDateFromParts(
                {
                    year: 2025,
                    month: 2,
                    day: 9,
                    hours: 1,
                    minutes: 59,
                    seconds: 59,
                },
                zone
            )
            expect(resolved.toISOString()).toBe('2025-03-09T06:59:59.000Z')
            expect(localOf(resolved, zone)).toBe('2025-03-09 01:59:59')
        })

        it('leaves the first existing minute after the gap alone', () => {
            const zone = 'America/New_York'
            const resolved = createDateFromParts(
                {
                    year: 2025,
                    month: 2,
                    day: 9,
                    hours: 3,
                    minutes: 0,
                    seconds: 0,
                },
                zone
            )
            expect(resolved.toISOString()).toBe('2025-03-09T07:00:00.000Z')
            expect(localOf(resolved, zone)).toBe('2025-03-09 03:00:00')
        })
    })

    describe('fold policy: resolve to the first (earlier) occurrence', () => {
        const cases: Array<{
            zone: string
            isoDay: string
            time: TimeValue
            instant: string
            /** The second occurrence, which must NOT be chosen. */
            rejected: string
        }> = [
            {
                zone: 'America/New_York',
                isoDay: '2025-11-02',
                time: t(1, 30, 0),
                instant: '2025-11-02T05:30:00.000Z', // EDT, -04:00
                rejected: '2025-11-02T06:30:00.000Z', // EST, -05:00
            },
            {
                zone: 'Europe/Berlin',
                isoDay: '2025-10-26',
                time: t(2, 30, 0),
                instant: '2025-10-26T00:30:00.000Z', // CEST, +02:00
                rejected: '2025-10-26T01:30:00.000Z', // CET, +01:00
            },
            {
                zone: 'Australia/Sydney',
                isoDay: '2025-04-06',
                time: t(2, 30, 0),
                instant: '2025-04-05T15:30:00.000Z', // AEDT, +11:00
                rejected: '2025-04-05T16:30:00.000Z', // AEST, +10:00
            },
            {
                zone: 'America/St_Johns',
                isoDay: '2025-11-02',
                time: t(1, 30, 0),
                instant: '2025-11-02T04:00:00.000Z', // NDT, -02:30
                rejected: '2025-11-02T05:00:00.000Z', // NST, -03:30
            },
            {
                // Fall-back at local midnight: 23:00-23:59 on the 5th repeats.
                zone: 'America/Santiago',
                isoDay: '2025-04-05',
                time: t(23, 30, 0),
                instant: '2025-04-06T02:30:00.000Z', // -03:00
                rejected: '2025-04-06T03:30:00.000Z', // -04:00
            },
            {
                zone: 'America/Havana',
                isoDay: '2025-11-02',
                time: t(0, 30, 0),
                instant: '2025-11-02T04:30:00.000Z', // CDT, -04:00
                rejected: '2025-11-02T05:30:00.000Z', // CST, -05:00
            },
        ]

        for (const { zone, isoDay, time, instant, rejected } of cases) {
            it(`${zone} ${isoDay} ${time.hours}:${String(time.minutes).padStart(
                2,
                '0'
            )} picks the earlier of the two occurrences`, () => {
                const [year, month, day] = isoDay.split('-').map(Number)
                const resolved = createDateFromParts(
                    {
                        year,
                        month: month - 1,
                        day,
                        hours: time.hours,
                        minutes: time.minutes,
                        seconds: time.seconds,
                    },
                    zone
                )
                expect(resolved.toISOString()).toBe(instant)
                // Both instants really do show the same wall clock — this is a
                // genuine fold, not an artefact of the expected value.
                expect(localOf(new Date(rejected), zone)).toBe(
                    localOf(resolved, zone)
                )
                expect(resolved.getTime()).toBeLessThan(
                    new Date(rejected).getTime()
                )
            })
        }
    })

    describe('calendar-day invariant', () => {
        for (const zone of zones) {
            it(`holds for every minute of every probed day in ${zone}`, () => {
                const failures: string[] = []

                for (const isoDay of probeDays(zone)) {
                    const picked = noonOn(isoDay, zone)
                    for (const time of EVERY_MINUTE_OF_INTEREST) {
                        const applied = applyTimeValueToDate(picked, time, zone)
                        if (
                            !isSameCalendarDayInTimezone(applied, picked, zone)
                        ) {
                            failures.push(
                                `${isoDay} ${time.hours}:${time.minutes} -> ${localOf(
                                    applied,
                                    zone
                                )}`
                            )
                        }
                    }
                }

                expect(failures).toEqual([])
            })
        }
    })

    describe('round-trip', () => {
        for (const zone of zones) {
            it(`reads back exactly what was applied in ${zone}, except inside a gap`, () => {
                const mismatches: string[] = []
                const gapShifts: string[] = []

                for (const isoDay of probeDays(zone)) {
                    const picked = noonOn(isoDay, zone)
                    for (const time of EVERY_MINUTE_OF_INTEREST) {
                        const applied = applyTimeValueToDate(picked, time, zone)
                        const back = timeValueFromDate(applied, zone)
                        if (
                            back.hours === time.hours &&
                            back.minutes === time.minutes &&
                            back.seconds === time.seconds
                        ) {
                            continue
                        }

                        const requestedMinute = time.hours * 60 + time.minutes
                        const gotMinute = back.hours * 60 + back.minutes
                        const label = `${isoDay} ${time.hours}:${time.minutes} -> ${localOf(
                            applied,
                            zone
                        )}`
                        // A shift is only ever allowed forward, and only for a
                        // reading the zone genuinely does not have.
                        if (gotMinute > requestedMinute) gapShifts.push(label)
                        else mismatches.push(label)
                    }
                }

                expect(mismatches).toEqual([])
                // Zones without DST must round-trip perfectly.
                if (
                    zone === 'Asia/Kolkata' ||
                    zone === 'Asia/Kathmandu' ||
                    zone === 'Pacific/Kiritimati'
                ) {
                    expect(gapShifts).toEqual([])
                }
            })
        }

        it('round-trips a seconds-precision value through a fractional-offset zone', () => {
            const zone = 'Asia/Kathmandu' // +05:45
            const picked = noonOn('2025-06-15', zone)
            const applied = applyTimeValueToDate(picked, t(23, 59, 59), zone)

            expect(timeValueFromDate(applied, zone)).toEqual(t(23, 59, 59))
            expect(localOf(applied, zone)).toBe('2025-06-15 23:59:59')
        })

        it('round-trips through a zone beyond +12', () => {
            const zone = 'Pacific/Kiritimati' // +14:00
            const picked = noonOn('2025-06-15', zone)
            const applied = applyTimeValueToDate(picked, t(0, 0, 0), zone)

            expect(applied.toISOString()).toBe('2025-06-14T10:00:00.000Z')
            expect(localOf(applied, zone)).toBe('2025-06-15 00:00:00')
        })
    })

    describe('a gap that swallows the end of a local day', () => {
        // America/Nuuk jumps 2025-03-29 22:59:59 straight to 2025-03-30 00:00,
        // so 23:00-23:59 on the 29th cannot be resolved forward without leaving
        // the day. `applyTimeValueToDate` owes callers the day, so it clamps.
        const zone = 'America/Nuuk'

        it('clamps applyTimeValueToDate to the last instant the day has', () => {
            const picked = noonOn('2025-03-29', zone)
            const applied = applyTimeValueToDate(picked, t(23, 30, 0), zone)

            expect(isSameCalendarDayInTimezone(applied, picked, zone)).toBe(
                true
            )
            expect(localOf(applied, zone)).toBe('2025-03-29 22:59:59')
        })

        it('still lets createDateFromParts resolve forward across midnight', () => {
            const resolved = createDateFromParts(
                {
                    year: 2025,
                    month: 2,
                    day: 29,
                    hours: 23,
                    minutes: 30,
                    seconds: 0,
                },
                zone
            )
            expect(localOf(resolved, zone)).toBe('2025-03-30 00:30:00')
        })
    })

    describe('non-DST behaviour is unchanged', () => {
        it('resolves an ordinary reading in every probed zone', () => {
            const expectations: Array<[string, string]> = [
                ['Asia/Kolkata', '2025-06-15T09:00:00.000Z'], // +05:30
                ['Asia/Kathmandu', '2025-06-15T08:45:00.000Z'], // +05:45
                ['Pacific/Kiritimati', '2025-06-15T00:30:00.000Z'], // +14:00
                ['America/St_Johns', '2025-06-15T17:00:00.000Z'], // -02:30 (NDT)
                ['Europe/Berlin', '2025-06-15T12:30:00.000Z'], // +02:00 (CEST)
            ]

            for (const [zone, instant] of expectations) {
                const resolved = createDateFromParts(
                    {
                        year: 2025,
                        month: 5,
                        day: 15,
                        hours: 14,
                        minutes: 30,
                        seconds: 0,
                    },
                    zone
                )
                expect([zone, resolved.toISOString()]).toEqual([zone, instant])
                expect(localOf(resolved, zone)).toBe('2025-06-15 14:30:00')
            }
        })

        it('leaves the machine-local path alone when no timezone is given', () => {
            const date = new Date(2024, 0, 15, 9, 0, 0, 500)
            const applied = applyTimeValueToDate(date, t(22, 45, 30))

            expect(applied.getFullYear()).toBe(2024)
            expect(applied.getMonth()).toBe(0)
            expect(applied.getDate()).toBe(15)
            expect(applied.getHours()).toBe(22)
            expect(applied.getMinutes()).toBe(45)
            expect(applied.getSeconds()).toBe(30)
            expect(applied.getMilliseconds()).toBe(0)
        })
    })
})

describe('hostile input hardening', () => {
    it('falls back to local time for an unknown IANA zone instead of throwing', () => {
        // `timezone` is a public prop typed `string`; a typo used to raise
        // RangeError from Intl during render and white-screen the subtree.
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
        const date = new Date(2025, 0, 15, 9, 30, 0)

        expect(() => getDateTimeParts(date, 'America/New_Yrok')).not.toThrow()
        expect(getDateTimeParts(date, 'America/New_Yrok')).toEqual(
            getDateTimeParts(date)
        )

        // Warns once per bad zone, not once per call.
        getDateTimeParts(date, 'America/New_Yrok')
        expect(warn).toHaveBeenCalledTimes(1)
        warn.mockRestore()
    })

    it('treats an Invalid Date the same with and without a timezone', () => {
        expect(() =>
            getDateTimeParts(new Date(NaN), 'America/New_York')
        ).not.toThrow()
    })

    it('sanitizeStep collapses every non-usable step to 1', () => {
        expect(sanitizeStep(Infinity)).toBe(1)
        expect(sanitizeStep(-Infinity)).toBe(1)
        expect(sanitizeStep(NaN)).toBe(1)
        expect(sanitizeStep(0)).toBe(1)
        expect(sanitizeStep(-5)).toBe(1)
        expect(sanitizeStep(1.9)).toBe(1)
        expect(sanitizeStep(15)).toBe(15)
    })
})
