import { MenuTokensType } from './menu.tokens'
import { Skeleton, SkeletonVariant } from '../Skeleton'
import Block from '../Primitives/Block/Block'
import { MenuSkeletonProps } from './types'

const MenuSkeleton = ({
    menuTokens,
    skeleton,
}: {
    menuTokens: MenuTokensType
    skeleton: MenuSkeletonProps
}) => {
    return (
        <Block
            display="flex"
            paddingX={menuTokens.item.padding.x}
            paddingY={menuTokens.item.padding.y}
            marginY={menuTokens.item.margin.y}
            marginX={menuTokens.item.margin.x}
            borderRadius={menuTokens.item.borderRadius}
            flexDirection="column"
            gap={menuTokens.item.gap}
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

export default MenuSkeleton
