import { Skeleton, SkeletonVariant } from '../Skeleton'
import type { StatCardV2SkeletonProps } from './statcardV2.types'

const StatCardV2Skeleton = ({
    skeleton,
    maxWidth,
    minWidth,
}: {
    skeleton: StatCardV2SkeletonProps
    maxWidth: string | number
    minWidth: string | number
}) => {
    return (
        <Skeleton
            variant={skeleton.variant as SkeletonVariant}
            width="100%"
            height={skeleton.height || '106px'}
            maxWidth={maxWidth}
            minWidth={minWidth}
        />
    )
}

export default StatCardV2Skeleton
