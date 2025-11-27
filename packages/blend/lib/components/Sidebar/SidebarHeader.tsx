import React from 'react'
import { PanelsTopLeft, UserIcon } from 'lucide-react'
import Block from '../Primitives/Block/Block'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import { SingleSelect } from '../SingleSelect'
import { SelectMenuVariant } from '../Select/types'
import { SelectMenuSize } from '../SingleSelect'
import { Tooltip } from '../Tooltip'
import { FOUNDATION_THEME } from '../../tokens'
import type { SidebarMerchantInfo } from './types'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import type { SidebarTokenType } from './sidebar.tokens'
import Skeleton from '../Skeleton/Skeleton'
import { getSkeletonState } from '../Skeleton/utils'

type SidebarHeaderProps = {
    sidebarTopSlot?: React.ReactNode
    merchantInfo?: SidebarMerchantInfo
    isExpanded: boolean
    isScrolled: boolean
    sidebarCollapseKey: string
    onToggle: () => void
    showSkeleton?: boolean
    skeletonVariant?: 'pulse' | 'wave' | 'shimmer'
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({
    sidebarTopSlot,
    merchantInfo,
    isExpanded,
    isScrolled,
    sidebarCollapseKey,
    onToggle,
    showSkeleton = false,
    skeletonVariant = 'pulse',
}) => {
    const tokens = useResponsiveTokens<SidebarTokenType>('SIDEBAR')
    const { shouldShowSkeleton } = getSkeletonState(showSkeleton)

    const defaultMerchantInfo: SidebarMerchantInfo = {
        items: [
            {
                label: 'juspay',
                value: 'juspay',
                icon: (
                    <UserIcon
                        style={{
                            width: '16px',
                            height: '16px',
                        }}
                    />
                ),
            },
        ],
        selected: 'juspay',
        onSelect: (value: string) => {
            console.log('Selected merchant:', value)
        },
    }

    const merchantData = merchantInfo || defaultMerchantInfo

    return (
        <Block
            width="100%"
            zIndex="10"
            backgroundColor={tokens.header.backgroundColor}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap={tokens.header.gap}
            padding={`${tokens.header.padding.y} ${tokens.header.padding.x}`}
            position="relative"
        >
            {isScrolled && (
                <Block
                    position="absolute"
                    bottom="0"
                    left="0"
                    right="0"
                    height="1px"
                    style={{
                        backgroundColor: '#e5e7eb', // Gray-200 fallback
                        transition: 'opacity 0.2s ease',
                    }}
                />
            )}

            {shouldShowSkeleton ? (
                <Skeleton
                    variant={skeletonVariant}
                    loading
                    padding="0"
                    display="inline-block"
                    width="120px"
                    height="32px"
                    borderRadius="6px"
                />
            ) : sidebarTopSlot ? (
                sidebarTopSlot
            ) : (
                <SingleSelect
                    helpIconText=""
                    required={false}
                    placeholder="Select Merchant"
                    variant={SelectMenuVariant.NO_CONTAINER}
                    size={SelectMenuSize.SMALL}
                    items={merchantData.items.map((item) => ({
                        items: [
                            {
                                label: item.label,
                                value: item.value,
                                slot1: item.icon,
                            },
                        ],
                    }))}
                    selected={merchantData.selected}
                    onSelect={merchantData.onSelect}
                />
            )}

            {shouldShowSkeleton ? (
                <Skeleton
                    variant={skeletonVariant}
                    loading
                    padding="0"
                    display="inline-block"
                    width="36px"
                    height="36px"
                    borderRadius="10px"
                />
            ) : (
                <Tooltip
                    content={`${isExpanded ? 'Collapse' : 'Expand'} sidebar (${sidebarCollapseKey})`}
                >
                    <PrimitiveButton
                        type="button"
                        onClick={onToggle}
                        data-icon="sidebar-hamburger"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        border="none"
                        backgroundColor={
                            tokens.header.toggleButton.backgroundColor.default
                        }
                        borderRadius="10px"
                        cursor="pointer"
                        padding="9px"
                        style={{ transition: 'background-color 0.15s ease' }}
                        _hover={{
                            backgroundColor:
                                tokens.header.toggleButton.backgroundColor
                                    .hover,
                        }}
                    >
                        <PanelsTopLeft
                            color={FOUNDATION_THEME.colors.gray[600]}
                            size={tokens.header.toggleButton.width}
                        />
                    </PrimitiveButton>
                </Tooltip>
            )}
        </Block>
    )
}

export default SidebarHeader
