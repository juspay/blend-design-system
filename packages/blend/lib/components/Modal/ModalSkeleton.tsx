import Block from '../Primitives/Block/Block'
import { FOUNDATION_THEME } from '../../tokens'
import { Skeleton, SkeletonVariant } from '../Skeleton'
import { ModalTokensType } from './modal.tokens'

const ModalSkeleton = ({
    modalTokens,
    headerSkeleton,
    bodySkeleton,
    footerSkeleton,
    skeletonVariant,
}: {
    modalTokens: ModalTokensType
    headerSkeleton?: {
        show: boolean
        showDivider: boolean
        showCloseButton: boolean
    }
    bodySkeleton?: { show: boolean; width: string; height: string | number }
    footerSkeleton?: { show: boolean; showDivider: boolean }
    skeletonVariant: SkeletonVariant
}) => {
    const {
        show: showHeaderSkeleton = false,
        showDivider: showHeaderDivider = false,
        showCloseButton: showHeaderCloseButton = false,
    } = headerSkeleton || {}
    const {
        show: showBodySkeleton = false,
        width: bodySkeletonWidth = '100%',
        height: bodySkeletonHeight = 200,
    } = bodySkeleton || {}
    const {
        show: showFooterSkeleton = false,
        showDivider: showFooterDivider = false,
    } = footerSkeleton || {}

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
                    <Skeleton
                        variant={skeletonVariant}
                        width="40%"
                        height={16}
                        borderRadius={4}
                    />
                </Block>
                {showHeaderCloseButton && (
                    <Skeleton
                        variant={skeletonVariant}
                        width={32}
                        height={32}
                        borderRadius={4}
                    />
                )}
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
                backgroundColor={modalTokens.footer.backgroundColor}
                justifyContent="flex-end"
                gap={modalTokens.footer.gap}
                padding={modalTokens.footer.padding}
                flexShrink={0}
                borderTop={
                    showFooterDivider ? modalTokens.footer.borderTop : undefined
                }
                borderRadius={`0 0 ${modalTokens.borderRadius} ${modalTokens.borderRadius}`}
            >
                <Skeleton
                    variant={skeletonVariant}
                    width={100}
                    height={36}
                    borderRadius={6}
                />
                <Skeleton
                    variant={skeletonVariant}
                    width={100}
                    height={36}
                    borderRadius={6}
                />
            </Block>
        )
    }
}

export default ModalSkeleton
