import React from 'react'
import Block from '../Primitives/Block/Block'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import type { SidebarTokenType } from './sidebar.tokens'
import Skeleton from '../Skeleton/Skeleton'
import { getSkeletonState } from '../Skeleton/utils'

type SidebarFooterProps = {
    footer?: React.ReactNode
    showSkeleton?: boolean
    skeletonVariant?: 'pulse' | 'wave' | 'shimmer'
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({
    footer,
    showSkeleton = false,
    skeletonVariant = 'pulse',
}) => {
    const tokens = useResponsiveTokens<SidebarTokenType>('SIDEBAR')
    const { shouldShowSkeleton } = getSkeletonState(showSkeleton)

    return (
        <Block
            width="100%"
            backgroundColor={tokens.footer.backgroundColor}
            height="64px"
            position="sticky"
            bottom="0"
            zIndex="10"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap="12px"
            padding={`${tokens.footer.padding.y} ${tokens.footer.padding.x}`}
            borderTop={tokens.footer.borderTop}
        >
            {shouldShowSkeleton ? (
                <Skeleton
                    variant={skeletonVariant}
                    loading
                    padding="0"
                    display="flex"
                    width="100%"
                    height="40px"
                    borderRadius="6px"
                />
            ) : (
                footer
            )}
        </Block>
    )
}

export default SidebarFooter
