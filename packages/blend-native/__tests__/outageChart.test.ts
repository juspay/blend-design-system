import { describe, it, expect } from 'vitest'
import {
    splitTrendByZones,
    computeLanes,
    computeXDomain,
    xToFraction,
} from '../src/components/OutageChart/outageChart.utils'
import type {
    OutageSegment,
    OutageTrendDatum,
    OutageZone,
} from '../src/components/OutageChart/outageChart.types'

const T0 = 1_000_000
const STEP = 100

const TREND: OutageTrendDatum[] = [
    { x: T0, y: 9 },
    { x: T0 + STEP, y: 6 },
    { x: T0 + 2 * STEP, y: 8 },
    { x: T0 + 3 * STEP, y: 7 },
]

const ZONES: OutageZone[] = [
    { from: T0, color: '#f00' },
    { from: T0 + 2 * STEP, color: '#0a0' },
]

const SEGMENTS: OutageSegment[] = [
    { start: T0, end: T0 + STEP, laneLabel: 'Bank A', color: '#f00' },
    {
        start: T0 + STEP,
        end: T0 + 3 * STEP,
        laneLabel: 'Bank A',
        color: '#fa0',
    },
    { start: T0, end: T0 + 2 * STEP, laneLabel: 'Bank B', color: '#0a0' },
]

describe('splitTrendByZones', () => {
    it('returns a single series when no zones are provided', () => {
        const parts = splitTrendByZones(TREND, [])
        expect(parts).toHaveLength(1)
        expect(parts[0].data).toEqual(TREND)
    })

    it('splits points into their zone spans with boundary continuity', () => {
        const parts = splitTrendByZones(TREND, ZONES)
        expect(parts).toHaveLength(2)
        // Zone 1 (red): x in [T0, T0+2*STEP). Includes the boundary point at
        // T0+2*STEP so the segment doesn't end with a gap at the boundary.
        expect(parts[0].color).toBe('#f00')
        expect(parts[0].data.map((d) => d.x)).toEqual([
            T0,
            T0 + STEP,
            T0 + 2 * STEP,
        ])
        // Zone 2 (green): x >= T0+2*STEP. Also includes the shared boundary
        // point on the left for a continuous-looking stroke.
        expect(parts[1].color).toBe('#0a0')
        expect(parts[1].data.map((d) => d.x)).toEqual([
            T0 + STEP,
            T0 + 2 * STEP,
            T0 + 3 * STEP,
        ])
    })

    it('handles empty data', () => {
        expect(splitTrendByZones([], ZONES)).toEqual([])
    })
})

describe('computeLanes', () => {
    it('returns lanes in first-seen order, deduped', () => {
        expect(computeLanes(SEGMENTS)).toEqual(['Bank A', 'Bank B'])
    })

    it('returns an empty list with no segments', () => {
        expect(computeLanes([])).toEqual([])
    })
})

describe('computeXDomain', () => {
    it('covers both trend data and segments', () => {
        const domain = computeXDomain(TREND, SEGMENTS)
        expect(domain.min).toBe(T0)
        expect(domain.max).toBe(T0 + 3 * STEP)
    })

    it('handles an empty input', () => {
        const domain = computeXDomain([], [])
        expect(domain).toEqual({ min: 0, max: 1 })
    })

    it('pads a single-point domain', () => {
        const domain = computeXDomain([{ x: 42, y: 1 }], [])
        expect(domain).toEqual({ min: 42, max: 43 })
    })
})

describe('xToFraction', () => {
    const domain = { min: 0, max: 100 }
    it('maps domain edges to 0 and 1', () => {
        expect(xToFraction(0, domain)).toBe(0)
        expect(xToFraction(100, domain)).toBe(1)
    })
    it('maps interior points linearly', () => {
        expect(xToFraction(25, domain)).toBe(0.25)
        expect(xToFraction(50, domain)).toBe(0.5)
    })
})
