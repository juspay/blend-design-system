import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import Block from '../Primitives/Block/Block'
import Skeleton from '../Skeleton/Skeleton'
import type { CardV2TokensType } from './cardV2.tokens'
import { useCardV2Context } from './CardV2Context'
import type { CardV2SkeletonProps } from './cardV2.types'

export type CardV2SkeletonComponentProps = {
    skeleton?: CardV2SkeletonProps
}

const CardV2Skeleton = ({ skeleton }: CardV2SkeletonComponentProps) => {
    const context = useCardV2Context()
    const responsiveTokens = useResponsiveTokens<CardV2TokensType>('CARDV2')
    const tokens = context?.tokens ?? responsiveTokens

    return (
        <Block display="flex" flexDirection="column" gap={tokens.layout.gap}>
            <Skeleton
                variant={skeleton?.variant}
                width={skeleton?.width ?? '100%'}
                height={skeleton?.height ?? '160px'}
                shape="rounded"
            />
            <Block
                display="flex"
                flexDirection="column"
                gap={tokens.header.gap}
            >
                <Skeleton width="40%" height="18px" shape="rounded" />
                <Skeleton width="70%" height="24px" shape="rounded" />
                <Skeleton width="55%" height="18px" shape="rounded" />
            </Block>
            <Skeleton width="100%" height="18px" shape="rounded" />
            <Skeleton width="84%" height="18px" shape="rounded" />
        </Block>
    )
}

export default CardV2Skeleton
