import { useEffect, useState, type RefObject } from 'react'
import type { ChartV3, ChartV3ReactRefObject } from './chartV3.types'

const MAX_REF_POLL_ATTEMPTS = 40
const REF_POLL_INTERVAL_MS = 50

const areChartsEqual = (a: ChartV3[], b: ChartV3[]) =>
    a.length === b.length && a.every((chart, index) => chart === b[index])

const useChartV3Refs = (
    refs: ReadonlyArray<RefObject<ChartV3ReactRefObject | null>>
): ChartV3[] => {
    const [charts, setCharts] = useState<ChartV3[]>([])

    useEffect(() => {
        if (!refs.length) {
            setCharts((current) => (current.length ? [] : current))
            return
        }

        let attempts = 0

        const poll = () => {
            const next = refs
                .map((ref) => ref.current?.getChart() ?? null)
                .filter((chart): chart is ChartV3 => chart !== null)

            attempts += 1

            if (
                next.length === refs.length ||
                attempts >= MAX_REF_POLL_ATTEMPTS
            ) {
                setCharts((current) =>
                    areChartsEqual(current, next) ? current : next
                )
                return true
            }

            return false
        }

        if (!poll()) {
            const id = setInterval(() => {
                if (poll()) clearInterval(id)
            }, REF_POLL_INTERVAL_MS)
            return () => clearInterval(id)
        }
    }, [refs])

    return charts
}

export default useChartV3Refs
