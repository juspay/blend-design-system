import React from 'react'
import { PanelsTopLeft, UserIcon } from 'lucide-react'
import styled from 'styled-components'
import Block from '../Primitives/Block/Block'
import { SingleSelect } from '../SingleSelect'
import { SelectMenuVariant } from '../Select/types'
import { SelectMenuSize } from '../SingleSelect'
import { Tooltip } from '../Tooltip'
import { FOUNDATION_THEME } from '../../tokens'
import type { SidebarMerchantInfo } from './types'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import type { SidebarTokenType } from './sidebar.tokens'

const ToggleButton = styled.button<{ tokens: SidebarTokenType }>`
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: ${(props) =>
        props.tokens.header.toggleButton.backgroundColor.default};
    border-radius: 10px;
    cursor: pointer;
    padding: 9px;
    transition: background-color 0.15s ease;

    &:hover {
        background-color: ${(props) =>
            props.tokens.header.toggleButton.backgroundColor.hover};
    }
`

type SidebarHeaderProps = {
    sidebarTopSlot?: React.ReactNode
    merchantInfo?: SidebarMerchantInfo
    isExpanded: boolean
    isScrolled: boolean
    sidebarCollapseKey: string
    onToggle: () => void
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({
    sidebarTopSlot,
    merchantInfo,
    isExpanded,
    isScrolled,
    sidebarCollapseKey,
    onToggle,
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

            {sidebarTopSlot ? (
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

            <Tooltip
                content={`${isExpanded ? 'Collapse' : 'Expand'} sidebar (${sidebarCollapseKey})`}
            >
                <ToggleButton
                    tokens={tokens}
                    onClick={onToggle}
                    data-icon="sidebar-hamburger"
                >
                    <PanelsTopLeft
                        color={FOUNDATION_THEME.colors.gray[600]}
                        size={14}
                    />
                </ToggleButton>
            </Tooltip>
        </Block>
    )
}

export default SidebarHeader
