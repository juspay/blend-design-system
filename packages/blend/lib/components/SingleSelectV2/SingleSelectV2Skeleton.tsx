import { forwardRef } from 'react'
import Block from '../Primitives/Block/Block'
import { SingleSelectV2SkeletonProps } from './types'
import { SingleSelectV2TokensType } from './singleSelectV2.tokens'
import { Skeleton, SkeletonVariant } from '../Skeleton'

export type SingleSelectV2SkeletonComponentProps = {
    singleSelectTokens: SingleSelectV2TokensType
    skeleton: SingleSelectV2SkeletonProps
}

const SingleSelectV2Skeleton = forwardRef<
    HTMLDivElement,
    SingleSelectV2SkeletonComponentProps
>(({ singleSelectTokens, skeleton }, ref) => {
    return (
        <Block
            ref={ref}
            padding={singleSelectTokens.popover.item.padding}
            display="flex"
            flexDirection="column"
            gap={singleSelectTokens.popover.item.gap || 4}
            borderRadius={singleSelectTokens.popover.item.borderRadius}
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
})

SingleSelectV2Skeleton.displayName = 'SingleSelectV2Skeleton'

export default SingleSelectV2Skeleton
