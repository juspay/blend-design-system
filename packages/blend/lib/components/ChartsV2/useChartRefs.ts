import { useEffect, useState, type RefObject } from 'react'
import type { ChartV2 } from './chartV2.types'

const useChartRefs = (
    refs: ReadonlyArray<RefObject<{ chart?: ChartV2 } | null>>
): ChartV2[] => {
    const [charts, setCharts] = useState<ChartV2[]>([])
    useEffect(() => {
        const poll = () => {
            const next: ChartV2[] = []
            for (const r of refs) {
                const ch = r.current?.chart
                if (ch) next.push(ch)
            }
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

export default useChartRefs
