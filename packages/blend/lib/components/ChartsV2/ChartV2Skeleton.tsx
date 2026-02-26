import { FOUNDATION_THEME } from '../../tokens'
import Block from '../Primitives/Block/Block'
import { Skeleton, SkeletonVariant } from '../Skeleton'

const ChartV2Skeleton = ({
    skeletonVariant = 'pulse',
    height = 400,
    isExpanded,
}: {
    skeletonVariant?: SkeletonVariant
    height?: number
    isExpanded?: boolean
}) => {
    return (
        <Block
            data-chart="Skeleton"
            role="status"
            aria-live="polite"
            aria-busy={isExpanded}
            display="flex"
            width="100%"
            height={isExpanded ? height : 'auto'}
            gap={FOUNDATION_THEME.unit[16]}
            padding={FOUNDATION_THEME.unit[8]}
            flexDirection="column"
        >
            <Skeleton variant={skeletonVariant} width="40%" height={'40px'} />
            {isExpanded && (
                <Skeleton variant={skeletonVariant} height={height} />
            )}
        </Block>
    )
}

export default ChartV2Skeleton

ChartV2Skeleton.displayName = 'ChartV2Skeleton'
