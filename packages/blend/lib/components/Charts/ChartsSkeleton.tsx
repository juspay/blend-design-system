import { FOUNDATION_THEME } from '../../tokens'
import Block from '../Primitives/Block/Block'
import { Skeleton, SkeletonVariant } from '../Skeleton'

const ChartsSkeleton = ({
    skeletonVariant = 'pulse',
    height = 400,
}: {
    skeletonVariant?: SkeletonVariant
    height?: number
}) => {
    return (
        <Block
            display="flex"
            width="100%"
            height={height}
            gap={FOUNDATION_THEME.unit[16]}
            padding={FOUNDATION_THEME.unit[16]}
            flexDirection="column"
        >
            <Skeleton variant={skeletonVariant} width="40%" height={'40px'} />
            <Skeleton variant={skeletonVariant} height={height} />
        </Block>
    )
}

export default ChartsSkeleton
