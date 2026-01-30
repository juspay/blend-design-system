import React from 'react'
import { PanelsTopLeft, UserIcon } from 'lucide-react'
import Block from '../Primitives/Block/Block'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import { SingleSelect } from '../SingleSelect'
import { SelectMenuVariant } from '../Select/types'
import { SelectMenuSize } from '../SingleSelect'
import { FOUNDATION_THEME } from '../../tokens'
import type { SidebarMerchantInfo } from './types'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import type { SidebarTokenType } from './sidebar.tokens'
import { Tooltip } from '../Tooltip'

type SidebarHeaderProps = {
    sidebarTopSlot?: React.ReactNode
    merchantInfo?: SidebarMerchantInfo
    isExpanded: boolean
    isScrolled: boolean
    sidebarCollapseKey: string
    onToggle: () => void
    sidebarNavId?: string
    hideToggleButton?: boolean
    iconOnlyMode?: boolean
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({
    sidebarTopSlot,
    merchantInfo,
    isExpanded,
    isScrolled,
    sidebarCollapseKey,
    onToggle,
    sidebarNavId,
    hideToggleButton = false,
    iconOnlyMode = false,
}) => {
    const tokens = useResponsiveTokens<SidebarTokenType>('SIDEBAR')

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

            {!iconOnlyMode &&
                (sidebarTopSlot ? (
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
                ))}

            {!hideToggleButton && (
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
                        aria-label={`${isExpanded ? 'Collapse' : 'Expand'} sidebar. Press ${sidebarCollapseKey} to toggle.`}
                        aria-expanded={isExpanded}
                        aria-controls={
                            isExpanded && sidebarNavId
                                ? sidebarNavId
                                : undefined
                        }
                        title={`${isExpanded ? 'Collapse' : 'Expand'} sidebar (${sidebarCollapseKey})`}
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
                            aria-hidden="true"
                        />
                        <span
                            style={{
                                position: 'absolute',
                                width: '1px',
                                height: '1px',
                                padding: 0,
                                margin: '-1px',
                                overflow: 'hidden',
                                clip: 'rect(0, 0, 0, 0)',
                                whiteSpace: 'nowrap',
                                borderWidth: 0,
                            }}
                        >
                            {isExpanded ? 'Collapse' : 'Expand'} sidebar
                        </span>
                    </PrimitiveButton>
                </Tooltip>
            )}
        </Block>
    )
}

export default SidebarHeader
