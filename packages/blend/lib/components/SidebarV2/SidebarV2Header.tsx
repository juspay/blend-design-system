import { useEffect, useState, type ReactNode } from 'react'
import { PanelsTopLeft, UserIcon } from 'lucide-react'
import Block from '../Primitives/Block/Block'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import { SingleSelect } from '../SingleSelect'
import { SelectMenuSize } from '../SingleSelect'
import { SelectMenuVariant } from '../Select/types'
import { Tooltip } from '../Tooltip'
import type { SidebarV2TokensType } from './sidebarV2.tokens'

export type SidebarV2HeaderProps = {
    sidebarTopSlot?: ReactNode
    merchantInfo?: {
        items: Array<{
            label: string
            value: string
            icon?: ReactNode
        }>
        selected: string
        onSelect: (value: string) => void
    }
    isExpanded: boolean
    isScrolled: boolean
    sidebarCollapseKey: string
    onToggle: () => void
    sidebarNavId?: string
    hideToggleButton?: boolean
    iconOnlyMode?: boolean
    tokens: SidebarV2TokensType
}

const SidebarV2Header = ({
    sidebarTopSlot,
    merchantInfo,
    isExpanded,
    isScrolled,
    sidebarCollapseKey,
    onToggle,
    sidebarNavId,
    hideToggleButton = false,
    iconOnlyMode = false,
    tokens,
}: SidebarV2HeaderProps) => {
    const defaultMerchantInfo = {
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
        onSelect: () => {},
    }

    const merchantData = merchantInfo ?? defaultMerchantInfo

    const [selectVisible, setSelectVisible] = useState(!iconOnlyMode)
    useEffect(() => {
        if (iconOnlyMode) {
            setSelectVisible(false)
            return
        }
        const timer = setTimeout(() => setSelectVisible(true), 180)
        return () => clearTimeout(timer)
    }, [iconOnlyMode])

    const headerSlot = sidebarTopSlot ? (
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
    )

    return (
        <Block
            width="100%"
            zIndex={tokens.header.zIndex}
            backgroundColor={tokens.header.backgroundColor}
            display="flex"
            alignItems="center"
            justifyContent={iconOnlyMode ? 'center' : 'space-between'}
            gap={tokens.header.gap}
            padding={`${tokens.header.paddingTop} ${tokens.header.paddingRight} ${tokens.header.paddingBottom} ${tokens.header.paddingLeft}`}
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
                        backgroundColor: String(
                            tokens.header.scrolledBorderColor
                        ),
                        transition: 'opacity 0.2s ease',
                    }}
                />
            )}

            <Block
                flexGrow={iconOnlyMode ? 0 : 1}
                width={iconOnlyMode ? 0 : undefined}
                minWidth={0}
                overflow="hidden"
                opacity={iconOnlyMode ? 0 : selectVisible ? 1 : 0}
                pointerEvents={iconOnlyMode ? 'none' : 'auto'}
                transition="opacity 0.15s ease-out, flex-grow 0.2s ease-out, width 0.2s ease-out"
                display={iconOnlyMode ? 'none' : 'block'}
            >
                {headerSlot}
            </Block>

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
                        borderRadius={tokens.header.toggleButton.borderRadius}
                        cursor="pointer"
                        padding={tokens.header.toggleButton.padding}
                        aria-label={`${isExpanded ? 'Collapse' : 'Expand'} sidebar. Press ${sidebarCollapseKey} to toggle.`}
                        aria-expanded={isExpanded}
                        aria-controls={
                            isExpanded && sidebarNavId
                                ? sidebarNavId
                                : undefined
                        }
                        style={{ transition: 'background-color 0.15s ease' }}
                        _hover={{
                            backgroundColor:
                                tokens.header.toggleButton.backgroundColor
                                    .hover,
                        }}
                    >
                        <PanelsTopLeft
                            color={String(tokens.header.toggleButton.iconColor)}
                            size={
                                tokens.header.toggleButton
                                    .width as unknown as number
                            }
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

export default SidebarV2Header
