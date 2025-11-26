import { Skeleton, SkeletonVariant } from '../Skeleton'
import { StatCardSkeletonProps } from './types'

const StatCardSkeleton = ({
    skeleton,
    maxWidth,
    minWidth,
}: {
    skeleton: StatCardSkeletonProps
    maxWidth: string | number
    minWidth: string | number
}) => {
    return (
        <Skeleton
            variant={skeleton.variant as SkeletonVariant}
            width="100%"
            height={skeleton.height || '133px'}
            maxWidth={maxWidth}
            minWidth={minWidth}
        />
    )
}

export default StatCardSkeleton
