import Block from '../Primitives/Block/Block'
import { SingleSelectSkeletonProps } from './types'
import { SingleSelectTokensType } from './singleSelect.tokens'
import { Skeleton, SkeletonVariant } from '../Skeleton'

const SingleSelectSkeleton = ({
    singleSelectTokens,
    skeleton,
}: {
    singleSelectTokens: SingleSelectTokensType
    skeleton: SingleSelectSkeletonProps
}) => {
    return (
        <Block
            padding={singleSelectTokens.menu.item.padding}
            display="flex"
            flexDirection="column"
            gap={singleSelectTokens.menu.item.gap || 4}
            borderRadius={singleSelectTokens.menu.item.borderRadius}
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

export default SingleSelectSkeleton
