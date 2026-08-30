import { View } from 'react-native'
import { Skeleton } from '../Skeleton'
import type { ChartSkeletonProps } from './chart.types'

/**
 * Loading placeholder for `Chart` — mirrors web's `ChartV2Skeleton`.
 */
function ChartSkeleton({
    variant = 'pulse',
    height = 400,
}: Omit<ChartSkeletonProps, 'show'>) {
    return (
        <View style={{ gap: 16, padding: 8, width: '100%' }}>
            <Skeleton variant={variant} style={{ width: '40%', height: 40 }} />
            <Skeleton variant={variant} style={{ height }} />
        </View>
    )
}

export default ChartSkeleton
