import { Skeleton, SkeletonVariant } from '../Skeleton'
import { CardSkeletonProps } from './types'

const CardSkeleton = ({
    skeleton,
    maxHeight,
    minHeight,
    maxWidth,
}: {
    skeleton: CardSkeletonProps
    maxHeight?: string
    minHeight?: string
    maxWidth?: string
}) => {
    return (
        <Skeleton
            variant={skeleton.variant as SkeletonVariant}
            width={'100%'}
            height={skeleton.height || '250px'}
            maxHeight={maxHeight}
            minHeight={minHeight}
            maxWidth={maxWidth}
        />
    )
}

export default CardSkeleton
