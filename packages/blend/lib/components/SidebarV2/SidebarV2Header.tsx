import { type ReactNode } from 'react'
import { PanelsTopLeft } from 'lucide-react'
import Block from '../Primitives/Block/Block'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import { SingleSelectV2 } from '../SingleSelectV2'
import { SingleSelectV2Size, SingleSelectV2Variant } from '../SingleSelectV2'
import { TooltipV2 } from '../TooltipV2/TooltipV2'
import { TooltipV2Side } from '../TooltipV2/tooltipV2.types'
import { VisuallyHidden } from '../../utils/accessibility'
import type { SidebarV2TokensType } from './sidebarV2.tokens'
import { useMessages } from '../../i18n/useMessages'
import { NAVIGATION_MESSAGES } from '../../i18n/catalog/navigation.messages'
import { parseUnitValue } from '../SidebarV2/SidebarV2MobileNavigation/utils'

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
    const { m } = useMessages(NAVIGATION_MESSAGES)
    const headerSlot = sidebarTopSlot ? (
        sidebarTopSlot
    ) : merchantInfo ? (
        <SingleSelectV2
            helpIconText=""
            required={false}
            placeholder={m('navigation.placeholder.select-merchant')}
            aria-label={m('navigation.a11y.select-merchant', {
                name: String(
                    merchantInfo.items.find(
                        (item) => item.value === merchantInfo.selected
                    )?.label ?? m('navigation.placeholder.select-merchant')
                ),
            })}
            variant={SingleSelectV2Variant.NO_CONTAINER}
            size={SingleSelectV2Size.SM}
            items={[
                {
                    items: merchantInfo.items.map((item) => ({
                        label: item.label,
                        value: item.value,
                        slot1: item.icon,
                    })),
                },
            ]}
            selected={merchantInfo.selected}
            onSelect={merchantInfo.onSelect}
        />
    ) : null

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
                    height={tokens.header.borderBottomWidth}
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
                opacity={iconOnlyMode ? 0 : 1}
                pointerEvents={iconOnlyMode ? 'none' : 'auto'}
                transition="opacity 0.15s ease-out, flex-grow 0.2s ease-out, width 0.2s ease-out"
                display={iconOnlyMode ? 'none' : 'block'}
            >
                {headerSlot}
            </Block>

            {!hideToggleButton && (
                <TooltipV2
                    content={m(
                        isExpanded
                            ? 'sidebar.label.collapse-shortcut'
                            : 'sidebar.label.expand-shortcut',
                        { shortcut: String(sidebarCollapseKey) }
                    )}
                    side={TooltipV2Side.RIGHT}
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
                        aria-label={m(
                            isExpanded
                                ? 'sidebar.a11y.collapse-toggle'
                                : 'sidebar.a11y.expand-toggle',
                            { shortcut: String(sidebarCollapseKey) }
                        )}
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
                            size={parseUnitValue(
                                tokens.header.toggleButton.width
                            )}
                            aria-hidden="true"
                        />
                        <VisuallyHidden>
                            {m(
                                isExpanded
                                    ? 'sidebar.action.collapse'
                                    : 'sidebar.action.expand'
                            )}
                        </VisuallyHidden>
                    </PrimitiveButton>
                </TooltipV2>
            )}
        </Block>
    )
}

export default SidebarV2Header
