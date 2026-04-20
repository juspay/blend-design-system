import { forwardRef } from 'react'
import Block from '../Primitives/Block/Block'
import { Skeleton, SkeletonVariant } from '../Skeleton'
import type { MultiSelectV2TokensType } from './multiSelectV2.tokens'
import type { SelectV2SkeletonProps } from '../SelectV2/selectV2.shared.types'

export type MultiSelectV2SkeletonComponentProps = {
    multiSelectTokens: MultiSelectV2TokensType
    skeleton: SelectV2SkeletonProps
}

const MultiSelectV2Skeleton = forwardRef<
    HTMLDivElement,
    MultiSelectV2SkeletonComponentProps
>(({ multiSelectTokens, skeleton }, ref) => {
    return (
        <Block
            ref={ref}
            style={{
                paddingTop: multiSelectTokens.menu.item.paddingTop,
                paddingRight: multiSelectTokens.menu.item.paddingRight,
                paddingBottom: multiSelectTokens.menu.item.paddingBottom,
                paddingLeft: multiSelectTokens.menu.item.paddingLeft,
            }}
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
})

MultiSelectV2Skeleton.displayName = 'MultiSelectV2Skeleton'

export default MultiSelectV2Skeleton
