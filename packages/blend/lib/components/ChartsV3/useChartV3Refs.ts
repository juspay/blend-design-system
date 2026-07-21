import { useEffect, useState, type RefObject } from 'react'
import type { ChartV3, ChartV3ReactRefObject } from './chartV3.types'

const useChartV3Refs = (
    refs: ReadonlyArray<RefObject<ChartV3ReactRefObject | null>>
): ChartV3[] => {
    const [charts, setCharts] = useState<ChartV3[]>([])

    useEffect(() => {
        const poll = () => {
            const next = refs
                .map((ref) => ref.current?.getChart() ?? null)
                .filter((chart): chart is ChartV3 => chart !== null)

            if (next.length === refs.length) {
                setCharts(next)
                return true
            }

            return false
        }

        if (!poll()) {
            const id = setInterval(poll, 50)
            return () => clearInterval(id)
        }
    }, [refs])

    return charts
}

export default useChartV3Refs
