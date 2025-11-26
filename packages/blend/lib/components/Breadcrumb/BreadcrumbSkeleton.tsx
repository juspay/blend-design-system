import Block from '../Primitives/Block/Block'
import { FOUNDATION_THEME } from '../../tokens'
import { BreadcrumbTokenType } from './breadcrumb.tokens'
import { Skeleton, SkeletonVariant } from '../Skeleton'

const BreadcrumbSkeleton = ({
    breadcrumbTokens,
    skeletonVariant,
    isActive,
}: {
    breadcrumbTokens: BreadcrumbTokenType
    skeletonVariant: SkeletonVariant
    isActive: boolean
}) => {
    return (
        <>
            <Block
                padding={breadcrumbTokens.item.padding}
                display="flex"
                alignItems="center"
                gap={breadcrumbTokens.item.gap}
            >
                <Skeleton
                    variant={skeletonVariant}
                    width="96px"
                    height={breadcrumbTokens.item.text.fontSize}
                />
            </Block>
            {!isActive && (
                <Block color={FOUNDATION_THEME.colors.gray[400]}>/</Block>
            )}
        </>
    )
}

export default BreadcrumbSkeleton
