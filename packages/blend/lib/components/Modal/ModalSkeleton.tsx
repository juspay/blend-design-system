import Block from '../Primitives/Block/Block'
import { FOUNDATION_THEME } from '../../tokens'
import { Skeleton, type SkeletonVariant } from '../Skeleton'
import type { ModalTokensType } from './modal.tokens'

type HeaderSkeletonConfig = {
    show: boolean
    showDivider: boolean
    showCloseButton: boolean
}

type BodySkeletonConfig = {
    show: boolean
    width: string
    height: string | number
}

type FooterSkeletonConfig = {
    show: boolean
    showDivider: boolean
}

type ModalSkeletonProps = {
    modalTokens: ModalTokensType
    headerSkeleton?: HeaderSkeletonConfig
    bodySkeleton?: BodySkeletonConfig
    footerSkeleton?: FooterSkeletonConfig
    skeletonVariant: SkeletonVariant
}

const ModalSkeleton: React.FC<ModalSkeletonProps> = ({
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
    const {
        show: showBodySkeleton = false,
        width: bodySkeletonWidth = '100%',
        height: bodySkeletonHeight = 300,
    } = bodySkeleton || {}
    const { show: showFooterSkeleton = false } = footerSkeleton || {}

    if (showHeaderSkeleton) {
        return (
            <Block
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
                padding={
                    modalTokens.header.padding.x +
                    ' ' +
                    modalTokens.header.padding.y
                }
                flexShrink={0}
                gap={FOUNDATION_THEME.unit[16]}
                borderBottom={
                    showHeaderDivider
                        ? modalTokens.header.borderBottom
                        : undefined
                }
            >
                <Block
                    display="flex"
                    flexDirection="column"
                    flexGrow={1}
                    gap={FOUNDATION_THEME.unit[4]}
                >
                    <Skeleton
                        variant={skeletonVariant}
                        width="60%"
                        height={24}
                        borderRadius={4}
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
                gap={FOUNDATION_THEME.unit[12]}
            >
                <Skeleton
                    variant={skeletonVariant}
                    width={bodySkeletonWidth || '100%'}
                    height={bodySkeletonHeight || 300}
                    borderRadius={4}
                />
            </Block>
        )
    }

    if (showFooterSkeleton) {
        return null
    }

    return null
}

export default ModalSkeleton
