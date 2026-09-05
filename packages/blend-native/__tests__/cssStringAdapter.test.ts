import { describe, it, expect } from 'vitest'
import {
    parseDimension,
    parseSize,
    parseBorder,
    parseBorderRadius,
    parseBoxShadow,
    parseBackground,
} from '../src/adapters/cssStringAdapter'

describe('parseDimension', () => {
    it.each([
        ['6px', 6],
        ['1.5px', 1.5],
        ['0', 0],
        ['0px', 0],
        ['-4px', -4],
        ['9999px', 9999],
        [24, 24],
    ])('parses %o -> %o', (input, expected) => {
        expect(parseDimension(input as string | number)).toBe(expected)
    })

    it.each([
        // Must NOT fall back to parseFloat: these all yield a plausible-but
        // -wrong number under parseFloat and would silently mislay out.
        ['12abc'],
        ['50em'],
        ['100%'],
        ['calc(1px + 2px)'],
        ['min-content'],
        ['auto'],
        [''],
        ['   '],
    ])('rejects %o', (input) => {
        expect(parseDimension(input)).toBeUndefined()
    })

    it('rejects non-finite numbers', () => {
        expect(parseDimension(NaN)).toBeUndefined()
        expect(parseDimension(Infinity)).toBeUndefined()
    })

    it('returns undefined for nullish input', () => {
        expect(parseDimension(undefined)).toBeUndefined()
    })
})

describe('parseSize', () => {
    it.each([
        [24, 24],
        ['24px', 24],
        ['0', 0],
        // The bug this function exists to prevent: parseFloat('100%') is 100,
        // which RN renders as 100 *pixels* rather than full width.
        ['100%', '100%'],
        ['50%', '50%'],
        ['33.5%', '33.5%'],
        ['auto', 'auto'],
        // No RN equivalent; `auto` is the closest shrink-to-fit behaviour.
        ['fit-content', 'auto'],
    ])('parses %o -> %o', (input, expected) => {
        expect(parseSize(input as string | number)).toBe(expected)
    })

    it.each([
        ['min-content'],
        ['max-content'],
        ['calc(100% - 4px)'],
        ['50em'],
        ['12abc'],
        [''],
    ])('rejects %o rather than guessing', (input) => {
        expect(parseSize(input)).toBeUndefined()
    })

    it('does not degrade on adversarial percentage input', () => {
        // Guards the CodeQL polynomial-regex finding: a long run of digits
        // must not cause catastrophic backtracking.
        const hostile = `${'0'.repeat(50000)}%`
        const start = Date.now()
        parseSize(hostile)
        expect(Date.now() - start).toBeLessThan(1000)
    })
})

describe('parseBorder', () => {
    it('parses the shorthand Blend tokens emit', () => {
        expect(parseBorder('1px solid #E1E4EA')).toEqual({
            borderWidth: 1,
            borderColor: '#E1E4EA',
            borderStyle: 'solid',
        })
    })

    it('parses fractional widths', () => {
        expect(parseBorder('1.5px solid #1A56DB')).toEqual({
            borderWidth: 1.5,
            borderColor: '#1A56DB',
            borderStyle: 'solid',
        })
    })

    it('emits borderStyle: dashed, which Upload needs for its drop zone', () => {
        expect(parseBorder('2px dashed #000')).toEqual({
            borderWidth: 2,
            borderColor: '#000',
            borderStyle: 'dashed',
        })
    })

    it('emits borderStyle: dotted', () => {
        expect(parseBorder('1px dotted #333')).toEqual({
            borderWidth: 1,
            borderColor: '#333',
            borderStyle: 'dotted',
        })
    })

    it.each([['none'], ['transparent'], [undefined], ['garbage']])(
        'returns {} for %o',
        (input) => {
            expect(parseBorder(input)).toEqual({})
        }
    )
})

describe('parseBorderRadius', () => {
    it('parses a single value', () => {
        expect(parseBorderRadius('10px')).toBe(10)
    })

    it('parses the pill radius Tag uses for its rounded subType', () => {
        expect(parseBorderRadius('9999px')).toBe(9999)
    })

    it('parses the 4-corner shorthand a group position produces', () => {
        expect(parseBorderRadius('10px 0 0 10px')).toEqual({
            borderTopLeftRadius: 10,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 10,
        })
    })

    it('parses the fully-collapsed centre-position radius', () => {
        expect(parseBorderRadius('0px 0px 0px 0px')).toEqual({
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 0,
        })
    })

    it.each([[undefined], ['none'], ['']])(
        'returns undefined for %o',
        (input) => {
            expect(parseBorderRadius(input)).toBeUndefined()
        }
    )

    it.each([['50%'], ['12abc'], ['10px 50% 0 0']])(
        'refuses non-length corners like %o instead of parseFloat-ing them',
        (input) => {
            expect(parseBorderRadius(input)).toBeUndefined()
        }
    )
})

describe('parseBoxShadow', () => {
    it('parses a simple outer shadow', () => {
        expect(parseBoxShadow('0px 2px 8px rgba(0,0,0,0.07)')).toMatchObject({
            shadowColor: 'rgb(0, 0, 0)',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.07,
        })
    })

    it('does not mistake rgba() channel values for offsets', () => {
        // The commas inside rgba() must not be read as shadow separators,
        // and 255/255/255 must not be picked up as x/y/blur.
        const parsed = parseBoxShadow('0px 1px 2px rgba(255, 255, 255, 0.5)')
        expect(parsed?.shadowOffset).toEqual({ width: 0, height: 1 })
        expect(parsed?.shadowOpacity).toBe(0.5)
    })

    it('returns null for inset shadows, which RN cannot render', () => {
        expect(parseBoxShadow('inset 0 1px 2px #000')).toBeNull()
    })

    it('skips an inset shadow to find the first outer one', () => {
        const parsed = parseBoxShadow('inset 0 1px 2px #000, 0 4px 6px #111')
        expect(parsed?.shadowOffset).toEqual({ width: 0, height: 4 })
    })

    it.each([[undefined], ['none']])('returns null for %o', (input) => {
        expect(parseBoxShadow(input)).toBeNull()
    })
})

describe('parseBackground', () => {
    it('parses a flat hex colour', () => {
        expect(parseBackground('#FFFFFF')).toEqual({
            type: 'flat',
            color: '#FFFFFF',
        })
    })

    it('parses a linear gradient into an RN descriptor', () => {
        const parsed = parseBackground(
            'linear-gradient(180deg, #1A56DB -5%, #2563EB 107.5%)'
        )
        expect(parsed?.type).toBe('gradient')
        if (parsed?.type !== 'gradient') throw new Error('expected gradient')
        expect(parsed.colors).toEqual(['#1A56DB', '#2563EB'])
        // Stops outside [0,1] are clamped — RN's LinearGradient requires it.
        expect(parsed.locations).toEqual([0, 1])
    })

    it.each([['-90deg'], ['180.5deg']])(
        'accepts a %s angle, not just positive integers',
        (angle) => {
            const parsed = parseBackground(
                `linear-gradient(${angle}, #000000, #FFFFFF)`
            )
            expect(parsed?.type).toBe('gradient')
        }
    )

    it('keeps explicit 0% stops instead of redistributing them', () => {
        const parsed = parseBackground(
            'linear-gradient(180deg, #000000 0%, #FFFFFF 0%)'
        )
        if (parsed?.type !== 'gradient') throw new Error('expected gradient')
        expect(parsed.locations).toEqual([0, 0])
    })

    it('resolves mixed specified/unspecified stops the way CSS does', () => {
        const parsed = parseBackground(
            'linear-gradient(180deg, #000000 20%, #FFFFFF)'
        )
        if (parsed?.type !== 'gradient') throw new Error('expected gradient')
        expect(parsed.locations).toEqual([0.2, 1])
    })

    it('interpolates an interior unspecified stop between its neighbours', () => {
        const parsed = parseBackground(
            'linear-gradient(180deg, #000000 0%, #888888, #FFFFFF 100%)'
        )
        if (parsed?.type !== 'gradient') throw new Error('expected gradient')
        expect(parsed.locations).toEqual([0, 0.5, 1])
    })

    it('raises out-of-order stops to the running maximum, per CSS', () => {
        const parsed = parseBackground(
            'linear-gradient(180deg, #000000 80%, #FFFFFF 20%)'
        )
        if (parsed?.type !== 'gradient') throw new Error('expected gradient')
        expect(parsed.locations).toEqual([0.8, 0.8])
    })

    it('degrades an unsupported gradient form to its first color stop', () => {
        expect(
            parseBackground('linear-gradient(to top, #1A56DB, #2563EB)')
        ).toEqual({ type: 'flat', color: '#1A56DB' })
        expect(
            parseBackground('radial-gradient(circle, rgba(0,0,0,0.5), #FFF)')
        ).toEqual({ type: 'flat', color: 'rgba(0,0,0,0.5)' })
    })

    it('never returns a gradient string as a flat "color"', () => {
        const parsed = parseBackground('linear-gradient(to top, red, blue)')
        if (parsed?.type === 'flat') {
            expect(parsed.color).not.toContain('gradient')
        }
    })

    it.each([[undefined], ['none'], ['transparent']])(
        'returns null for %o',
        (input) => {
            expect(parseBackground(input)).toBeNull()
        }
    )

    it.each([['ease-in-out'], ['url(x.png)'], ['inherit'], ['1px solid #000']])(
        'returns null for the non-color value %o',
        (input) => {
            expect(parseBackground(input)).toBeNull()
        }
    )
})

describe('ReDoS resistance', () => {
    // CodeQL flagged both parsers as js/polynomial-redos. The original
    // patterns (`\d*\.?\d+` and `\d+\.?\d*`) were genuinely ambiguous: with no
    // `.` present, a digit run can be divided between the two quantifiers in
    // as many ways as there are digits, so a long non-matching input costs
    // O(n^2). Both now share one pattern where the `.` inside the optional
    // group is mandatory, giving each digit run exactly one valid division.
    //
    // These assert the *shape* of the fix by timing, which is the only way to
    // observe backtracking from the outside.
    const HOSTILE_LENGTH = 100_000

    it.each([
        ['parseDimension', parseDimension],
        ['parseSize', parseSize],
    ])('%s stays linear on a long digit run with no match', (_name, fn) => {
        // Trailing junk forces the engine to exhaust every division.
        const hostile = '9'.repeat(HOSTILE_LENGTH) + '!'
        const start = Date.now()
        expect(fn(hostile)).toBeUndefined()
        expect(Date.now() - start).toBeLessThan(1000)
    })

    it.each([
        ['parseDimension', parseDimension, 'px!'],
        ['parseSize', parseSize, '%!'],
    ])('%s stays linear with a near-miss unit', (_name, fn, suffix) => {
        const hostile = '9'.repeat(HOSTILE_LENGTH) + suffix
        const start = Date.now()
        expect(fn(hostile)).toBeUndefined()
        expect(Date.now() - start).toBeLessThan(1000)
    })

    it('still parses the values it is supposed to', () => {
        // A linear rewrite is worthless if it changed behaviour.
        expect(parseDimension('6px')).toBe(6)
        expect(parseDimension('1.5px')).toBe(1.5)
        expect(parseDimension('-4px')).toBe(-4)
        expect(parseDimension('.5px')).toBe(0.5)
        expect(parseSize('50%')).toBe('50%')
        expect(parseSize('33.5%')).toBe('33.5%')
        expect(parseSize('-5%')).toBe('-5%')
    })
})
