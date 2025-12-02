import Block from '../Primitives/Block/Block'
import { FOUNDATION_THEME } from '../../tokens'
import { Skeleton, type SkeletonVariant } from '../Skeleton'
import { PopoverTokenType } from './popover.tokens'
import { PopoverSize } from './types'

const PopoverSkeleton = ({
    popoverTokens,
    size,
    headerSkeleton,
    bodySkeleton,
    footerSkeleton,
    skeletonVariant,
}: {
    popoverTokens: PopoverTokenType
    size: PopoverSize
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
    const {
        show: showHeaderSkeleton = false,
        showCloseButton: showHeaderCloseButton = false,
    } = headerSkeleton || {}
    const {
        show: showBodySkeleton = false,
        width: bodySkeletonWidth = '100%',
        height: bodySkeletonHeight = 200,
    } = bodySkeleton || {}
    const { show: showFooterSkeleton = false } = footerSkeleton || {}

    if (showHeaderSkeleton) {
        return (
            <Block
                display="flex"
                flexDirection="column"
                gap={FOUNDATION_THEME.unit[4]}
            >
                <Block
                    display="flex"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    gap={FOUNDATION_THEME.unit[8]}
                >
                    <Block
                        display="flex"
                        flexDirection="column"
                        flexGrow={1}
                        gap={FOUNDATION_THEME.unit[4]}
                    >
                        <Skeleton
                            variant={skeletonVariant}
                            width="70%"
                            height={20}
                            borderRadius={4}
                        />
                        <Skeleton
                            variant={skeletonVariant}
                            width="50%"
                            height={16}
                            borderRadius={4}
                        />
                    </Block>
                    {showHeaderCloseButton && (
                        <Block size={18} contentCentered>
                            <Skeleton
                                variant={skeletonVariant}
                                width={18}
                                height={18}
                                borderRadius={4}
                            />
                        </Block>
                    )}
                </Block>
            </Block>
        )
    }

    if (showBodySkeleton) {
        return (
            <Block
                display="flex"
                flexDirection="column"
                gap={FOUNDATION_THEME.unit[12]}
            >
                <Skeleton
                    variant={skeletonVariant}
                    width={bodySkeletonWidth || '100%'}
                    height={bodySkeletonHeight || 200}
                    borderRadius={4}
                />
            </Block>
        )
    }

    if (showFooterSkeleton) {
        return (
            <Block
                display="flex"
                alignItems="center"
                gap={popoverTokens.footer.gap[size]}
                justifyContent="flex-end"
            >
                <Skeleton
                    variant={skeletonVariant}
                    width={80}
                    height={32}
                    borderRadius={6}
                />
                <Skeleton
                    variant={skeletonVariant}
                    width={80}
                    height={32}
                    borderRadius={6}
                />
            </Block>
        )
    }

    return null
}

export default PopoverSkeleton
