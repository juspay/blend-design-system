import Block from '../Primitives/Block/Block'
import { Skeleton, SkeletonVariant } from '../Skeleton'
import { MultiSelectTokensType } from './multiSelect.tokens'
import { MultiSelectSkeletonProps } from './types'

const MultiSelectSkeleton = ({
    multiSelectTokens,
    skeleton,
}: {
    multiSelectTokens: MultiSelectTokensType
    skeleton: MultiSelectSkeletonProps
}) => {
    return (
        <Block
            padding={multiSelectTokens.menu.item.padding}
            display="flex"
            flexDirection="column"
            gap={multiSelectTokens.menu.item.gap || 4}
            borderRadius={multiSelectTokens.menu.item.borderRadius}
            outline="none"
            border="none"
            width="100%"
            maxWidth="100%"
        >
            {Array.from({ length: skeleton.count || 3 }).map((_, index) => (
                <Skeleton
                    key={index}
                    width="100%"
                    height="33px"
                    variant={(skeleton.variant as SkeletonVariant) || 'pulse'}
                />
            ))}
        </Block>
    )
}

export default MultiSelectSkeleton
