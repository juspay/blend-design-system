import Block from '../Primitives/Block/Block'
import { FOUNDATION_THEME } from '../../tokens'
import { BreadcrumbV2TokensType } from './BreadcrumbV2.tokens'
import { Skeleton, SkeletonVariant } from '../Skeleton'

const BreadcrumbV2Skeleton = ({
    breadcrumbTokens,
    skeletonVariant,
    isActive,
}: {
    breadcrumbTokens: BreadcrumbV2TokensType
    skeletonVariant: SkeletonVariant
    isActive: boolean
}) => {
    return (
        <>
            <Block
                data-element="breadcrumb-v2-skeleton"
                padding={breadcrumbTokens.item.padding}
                display="flex"
                alignItems="center"
                gap={breadcrumbTokens.item.gap}
            >
                <Skeleton
                    variant={skeletonVariant}
                    width={FOUNDATION_THEME.unit[80]}
                    height={breadcrumbTokens.item.text.fontSize}
                />
            </Block>
            {!isActive && (
                <Block color={FOUNDATION_THEME.colors.gray[400]}>/</Block>
            )}
        </>
    )
}

export default BreadcrumbV2Skeleton
