import Block from '../Primitives/Block/Block'
import { Skeleton } from '../Skeleton'
import type { ModalV2SkeletonProps } from './modalV2.types'

const ModalV2Skeleton: React.FC<ModalV2SkeletonProps> = ({
    modalTokens,
    headerSkeleton,
    bodySkeleton,
    footerSkeleton,

    skeletonVariant,
}) => {
    const {
        show: showHeaderSkeleton = false,
        showDivider: showHeaderDivider = false,
    } = headerSkeleton || {}
    const { show: showBodySkeleton = false, width, height } = bodySkeleton || {}
    const { show: showFooterSkeleton = false } = footerSkeleton || {}

    if (showHeaderSkeleton) {
        return (
            <Block
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
                padding={
                    modalTokens.skeleton.header.paddingTop +
                    ' ' +
                    modalTokens.skeleton.header.paddingBottom
                }
                flexShrink={0}
                gap={modalTokens.skeleton.header.gap}
                borderBottom={
                    showHeaderDivider
                        ? modalTokens.skeleton.header.borderBottom
                        : undefined
                }
            >
                <Block
                    display="flex"
                    flexDirection="column"
                    flexGrow={1}
                    gap={modalTokens.skeleton.header.gap}
                >
                    <Skeleton
                        variant={skeletonVariant}
                        width={modalTokens.skeleton.header.width}
                        height={modalTokens.skeleton.header.height}
                        borderRadius={modalTokens.skeleton.header.borderRadius}
                    />
                </Block>
            </Block>
        )
    }

    if (showBodySkeleton) {
        return (
            <Block
                display="flex"
                flexDirection="column"
                gap={modalTokens.skeleton.body.gap}
            >
                <Skeleton
                    variant={skeletonVariant}
                    width={width || modalTokens.skeleton.body.width}
                    height={height || modalTokens.skeleton.body.height}
                    borderRadius={modalTokens.skeleton.body.borderRadius}
                />
            </Block>
        )
    }

    if (showFooterSkeleton) {
        return null
    }

    return null
}

export default ModalV2Skeleton
