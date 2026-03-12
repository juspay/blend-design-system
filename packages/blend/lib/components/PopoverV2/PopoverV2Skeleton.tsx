import Block from '../Primitives/Block/Block'
import { Skeleton, type SkeletonVariant } from '../Skeleton'
import { PopoverV2TokenType } from './popoverV2.token'
import { PopoverV2Size } from './popoverV2.types'

const PopoverV2Skeleton = ({
    popoverTokens,
    size,
    headerSkeleton,
    bodySkeleton,
    footerSkeleton,
    skeletonVariant,
}: {
    popoverTokens: PopoverV2TokenType
    size: PopoverV2Size
    headerSkeleton?: {
        show: boolean
        showCloseButton: boolean
    }
    bodySkeleton?: {
        show: boolean
        width: string
        height: string | number
    }
    footerSkeleton?: {
        show: boolean
    }
    skeletonVariant: SkeletonVariant
}) => {
    const { show: showHeaderSkeleton = false } = headerSkeleton || {}
    const {
        show: showBodySkeleton = false,
        width: bodySkeletonWidth = '100%',
        height: bodySkeletonHeight = 200,
    } = bodySkeleton || {}
    const { show: showFooterSkeleton = false } = footerSkeleton || {}

    const gap = popoverTokens.gap[size]
    const topContainerGap = popoverTokens.TopContainer.gap[size]
    const borderRadius = popoverTokens.borderRadius[size]

    if (showHeaderSkeleton) {
        return (
            <Block display="flex" flexDirection="column" gap={gap}>
                <Block
                    display="flex"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    gap={topContainerGap}
                >
                    <Block
                        display="flex"
                        flexDirection="column"
                        flexGrow={1}
                        gap={topContainerGap}
                    >
                        <Skeleton
                            variant={skeletonVariant}
                            width="70%"
                            height={20}
                            borderRadius={borderRadius}
                        />
                    </Block>
                </Block>
            </Block>
        )
    }

    if (showBodySkeleton) {
        return (
            <Block display="flex" flexDirection="column" gap={gap}>
                <Skeleton
                    variant={skeletonVariant}
                    width={bodySkeletonWidth || '100%'}
                    height={bodySkeletonHeight || 200}
                    borderRadius={borderRadius}
                />
            </Block>
        )
    }

    if (showFooterSkeleton) {
        return null
    }

    return null
}

export default PopoverV2Skeleton
