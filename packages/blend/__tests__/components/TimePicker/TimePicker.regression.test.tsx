import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, within } from '../../test-utils'
import { TimePicker } from '../../../lib/components/TimePicker'
import type { TimeValue } from '../../../lib/components/TimePicker/timePicker.types'
import FOUNDATION_THEME from '../../../lib/tokens/theme.token'
import { getTimePickerLightTokens } from '../../../lib/components/TimePicker/timePicker.light.tokens'
import { getTimePickerDarkTokens } from '../../../lib/components/TimePicker/timePicker.dark.tokens'

if (typeof PointerEvent === 'undefined') {
    // @ts-expect-error - PointerEvent is not available in jsdom test environment
    global.PointerEvent = class PointerEvent extends Event {
        pointerId: number
        bubbles: boolean
        cancelable: boolean
        pointerType: string
        constructor(
            type: string,
            eventInitDict?: {
                pointerId?: number
                bubbles?: boolean
                cancelable?: boolean
                pointerType?: string
            }
        ) {
            super(type, eventInitDict)
            this.pointerId = eventInitDict?.pointerId ?? 0
            this.bubbles = eventInitDict?.bubbles ?? false
            this.cancelable = eventInitDict?.cancelable ?? false
            this.pointerType = eventInitDict?.pointerType ?? 'mouse'
        }
    } as unknown
}

const t = (hours: number, minutes = 0, seconds = 0): TimeValue => ({
    hours,
    minutes,
    seconds,
})

const getTrigger = () => screen.getByRole('button', { name: /time picker/i })

const getColumn = (name: 'Hours' | 'Minutes' | 'Seconds' | 'AM/PM') =>
    screen.getByRole('listbox', { name })

const openColumn = async (
    user: ReturnType<typeof render>['user'],
    name: 'Hours' | 'Minutes' | 'Seconds' | 'AM/PM'
) => {
    await user.click(getTrigger())
    const column = await screen.findByRole('listbox', { name })
    column.focus()
    return column
}

/**
 * Flattens a token tree to `path -> value` so a key missing from one theme
 * shows up as a key-set difference instead of a silently-undefined lookup.
 */
const flatten = (
    value: unknown,
    prefix = '',
    out: Record<string, unknown> = {}
): Record<string, unknown> => {
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
        for (const [key, child] of Object.entries(
            value as Record<string, unknown>
        )) {
            flatten(child, prefix ? `${prefix}.${key}` : key, out)
        }
        return out
    }
    out[prefix] = value
    return out
}

describe('TimePicker regressions', () => {
    /**
     * `moveTo`'s `allowReverse` flag. Only the paging keys set it: they jump a
     * fixed distance and can land inside a fully out-of-bounds tail, where
     * doing nothing would feel broken. Arrow keys must keep strict directional
     * semantics and stay put instead.
     */
    describe('paging out of a fully-disabled run', () => {
        it('reverses when PageDown lands past the maximum', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <TimePicker
                    value={t(10, 0)}
                    format="24h"
                    maxTime={t(12, 0)}
                    onChange={onChange}
                />
            )
            await openColumn(user, 'Hours')

            // +5 lands on 15, which is disabled along with everything after
            // it, so the scan has to walk back down to 12.
            await user.keyboard('{PageDown}')
            expect(onChange).toHaveBeenLastCalledWith(t(12, 0, 0))
        })

        it('reverses when PageUp lands before the minimum', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <TimePicker
                    value={t(2, 0)}
                    format="24h"
                    minTime={t(2, 0)}
                    onChange={onChange}
                />
            )
            await openColumn(user, 'Hours')

            // -5 clamps to index 0, which is disabled up to 02, so the scan
            // walks forward again and lands on the minimum.
            await user.keyboard('{PageUp}')
            expect(onChange).toHaveBeenLastCalledWith(t(2, 0, 0))
        })

        it('does not let ArrowUp bounce back down at the same boundary', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <TimePicker
                    value={t(2, 0)}
                    format="24h"
                    minTime={t(2, 0)}
                    onChange={onChange}
                />
            )
            await openColumn(user, 'Hours')

            await user.keyboard('{ArrowUp}')
            expect(onChange).not.toHaveBeenCalled()
        })
    })

    /**
     * `rawBoundsInverted`. A caller that genuinely inverts the bounds would
     * otherwise disable every option and leave the listboxes keyboard-dead, so
     * the contradictory max is dropped and `clampTimeValue`'s documented "the
     * min wins" rule applies.
     */
    describe('inverted bounds', () => {
        it('keeps the columns usable when minTime is after maxTime', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <TimePicker
                    value={t(18, 0)}
                    format="24h"
                    minTime={t(17, 0)}
                    maxTime={t(9, 0)}
                    onChange={onChange}
                />
            )
            await user.click(getTrigger())
            const hours = await screen.findByRole('listbox', { name: 'Hours' })

            // Everything from 17 up stays selectable: only the min survived.
            expect(
                within(hours).getByRole('option', { name: '20' })
            ).not.toHaveAttribute('aria-disabled')
            expect(
                within(hours).getByRole('option', { name: '08' })
            ).toHaveAttribute('aria-disabled', 'true')

            await user.click(within(hours).getByRole('option', { name: '20' }))
            expect(onChange).toHaveBeenLastCalledWith(t(20, 0, 0))
        })

        it('clamps a value below the surviving minimum up to it', () => {
            render(
                <TimePicker
                    value={t(3, 0)}
                    format="24h"
                    minTime={t(17, 0)}
                    maxTime={t(9, 0)}
                />
            )

            expect(getTrigger()).toHaveTextContent('17:00')
        })
    })

    /**
     * `minuteStep` reaches `snapWithinHour` and `generateMinuteOptions`
     * straight from props. A non-usable step used to survive as
     * `minutes: NaN`, which then serialised as `"09:NaN"` into the hidden
     * form input.
     */
    describe('non-usable minuteStep', () => {
        it('falls back to every minute for Infinity, NaN, zero and negatives', async () => {
            for (const minuteStep of [
                Number.POSITIVE_INFINITY,
                Number.NaN,
                0,
                -5,
            ]) {
                const { user, unmount } = render(
                    <TimePicker
                        value={t(9, 0)}
                        format="24h"
                        minuteStep={minuteStep}
                    />
                )
                await user.click(getTrigger())
                await screen.findByRole('listbox', { name: 'Minutes' })

                expect(
                    within(getColumn('Minutes')).getAllByRole('option')
                ).toHaveLength(60)
                unmount()
            }
        })

        it('never serialises a NaN minute into the hidden form input', async () => {
            const { user } = render(
                <TimePicker
                    format="24h"
                    name="startTime"
                    minuteStep={Number.POSITIVE_INFINITY}
                />
            )
            await user.click(getTrigger())
            const hours = await screen.findByRole('listbox', { name: 'Hours' })
            await user.click(within(hours).getByRole('option', { name: '09' }))

            expect(
                document.querySelector('input[name="startTime"]')
            ).toHaveValue('09:00')
            expect(getTrigger()).toHaveTextContent('09:00')
        })
    })
})

describe('TIME_PICKER light/dark token parity', () => {
    const light = getTimePickerLightTokens(FOUNDATION_THEME)
    const dark = getTimePickerDarkTokens(FOUNDATION_THEME)

    it('exposes both breakpoints in both themes', () => {
        expect(Object.keys(light).sort()).toEqual(['lg', 'sm'])
        expect(Object.keys(dark).sort()).toEqual(['lg', 'sm'])
    })

    // A key present in one theme only resolves to `undefined` at runtime and
    // silently drops the style rather than failing, so compare the key sets.
    it('keeps identical key sets across themes at every breakpoint', () => {
        for (const breakpoint of ['sm', 'lg'] as const) {
            expect(Object.keys(flatten(dark[breakpoint])).sort()).toEqual(
                Object.keys(flatten(light[breakpoint])).sort()
            )
        }
    })

    it('actually recolours every breakpoint', () => {
        for (const breakpoint of ['sm', 'lg'] as const) {
            const lightFlat = flatten(light[breakpoint])
            const darkFlat = flatten(dark[breakpoint])
            const differing = Object.keys(lightFlat).filter(
                (key) => lightFlat[key] !== darkFlat[key]
            )

            expect(differing.length).toBeGreaterThan(0)
        }
    })

    it('recolours the dropdown surface and the option text', () => {
        expect(dark.lg.dropdown.backgroundColor).not.toBe(
            light.lg.dropdown.backgroundColor
        )
        expect(dark.lg.dropdown.option.color.default).not.toBe(
            light.lg.dropdown.option.color.default
        )
    })
})
