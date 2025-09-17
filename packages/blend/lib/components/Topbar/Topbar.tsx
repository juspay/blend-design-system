import { forwardRef } from 'react'
import { PanelsTopLeft, ArrowLeft, UserIcon, ChevronDown } from 'lucide-react'
import styled from 'styled-components'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import type { TopbarProps } from './types'
import { useBreakpoints } from '../../hooks/useBreakPoints'
import { SingleSelect } from '../SingleSelect'
import { SelectMenuVariant } from '../Select/types'
import { useComponentToken } from '../../context/useComponentToken'
import type { ResponsiveTopbarTokens } from './topbar.tokens'
import { BREAKPOINTS } from '../../breakpoints/breakPoints'

const ToggleButton = styled.button<{ isMobile: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: transparent;
    border-radius: ${({ isMobile }) => {
        const tokens = useComponentToken('TOPBAR') as ResponsiveTopbarTokens
        return isMobile
            ? tokens.sm.toggleButton.borderRadius
            : tokens.lg.toggleButton.borderRadius
    }};
    cursor: pointer;
    padding: ${({ isMobile }) => {
        const tokens = useComponentToken('TOPBAR') as ResponsiveTopbarTokens
        return isMobile
            ? tokens.sm.toggleButton.padding
            : tokens.lg.toggleButton.padding
    }};
    transition: ${({ isMobile }) => {
        const tokens = useComponentToken('TOPBAR') as ResponsiveTopbarTokens
        return isMobile
            ? tokens.sm.toggleButton.transition
            : tokens.lg.toggleButton.transition
    }};

    &:hover {
        background-color: ${({ isMobile }) => {
            const tokens = useComponentToken('TOPBAR') as ResponsiveTopbarTokens
            return isMobile
                ? tokens.sm.toggleButton.backgroundColor.hover
                : tokens.lg.toggleButton.backgroundColor.hover
        }};
    }
`

const ActionButton = styled.button<{ isMobile: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: transparent;
    border-radius: ${({ isMobile }) => {
        const tokens = useComponentToken('TOPBAR') as ResponsiveTopbarTokens
        return isMobile
            ? tokens.sm.actionButton.borderRadius
            : tokens.lg.actionButton.borderRadius
    }};
    cursor: pointer;
    padding: ${({ isMobile }) => {
        const tokens = useComponentToken('TOPBAR') as ResponsiveTopbarTokens
        return isMobile
            ? tokens.sm.actionButton.padding
            : tokens.lg.actionButton.padding
    }};
    transition: ${({ isMobile }) => {
        const tokens = useComponentToken('TOPBAR') as ResponsiveTopbarTokens
        return isMobile
            ? tokens.sm.actionButton.transition
            : tokens.lg.actionButton.transition
    }};
    min-width: ${({ isMobile }) => {
        const tokens = useComponentToken('TOPBAR') as ResponsiveTopbarTokens
        return isMobile
            ? tokens.sm.actionButton.minWidth
            : tokens.lg.actionButton.minWidth
    }};
    height: ${({ isMobile }) => {
        const tokens = useComponentToken('TOPBAR') as ResponsiveTopbarTokens
        return isMobile
            ? tokens.sm.actionButton.height
            : tokens.lg.actionButton.height
    }};

    &:hover {
        background-color: ${({ isMobile }) => {
            const tokens = useComponentToken('TOPBAR') as ResponsiveTopbarTokens
            return isMobile
                ? tokens.sm.actionButton.backgroundColor.hover
                : tokens.lg.actionButton.backgroundColor.hover
        }};
    }

    &:active {
        background-color: ${({ isMobile }) => {
            const tokens = useComponentToken('TOPBAR') as ResponsiveTopbarTokens
            return isMobile
                ? tokens.sm.actionButton.backgroundColor.active
                : tokens.lg.actionButton.backgroundColor.active
        }};
    }
`

const TenantIconButton = styled.button<{ isMobile: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: transparent;
    border-radius: ${({ isMobile }) => {
        const tokens = useComponentToken('TOPBAR') as ResponsiveTopbarTokens
        return isMobile
            ? tokens.sm.tenantIconButton.borderRadius
            : tokens.lg.tenantIconButton.borderRadius
    }};
    cursor: pointer;
    min-height: ${({ isMobile }) => {
        const tokens = useComponentToken('TOPBAR') as ResponsiveTopbarTokens
        return isMobile
            ? tokens.sm.tenantIconButton.minHeight
            : tokens.lg.tenantIconButton.minHeight
    }};
    transition: ${({ isMobile }) => {
        const tokens = useComponentToken('TOPBAR') as ResponsiveTopbarTokens
        return isMobile
            ? tokens.sm.tenantIconButton.transition
            : tokens.lg.tenantIconButton.transition
    }};

    &:hover {
        background-color: ${({ isMobile }) => {
            const tokens = useComponentToken('TOPBAR') as ResponsiveTopbarTokens
            return isMobile
                ? tokens.sm.tenantIconButton.backgroundColor.hover
                : tokens.lg.tenantIconButton.backgroundColor.hover
        }};
    }

    &:active {
        background-color: ${({ isMobile }) => {
            const tokens = useComponentToken('TOPBAR') as ResponsiveTopbarTokens
            return isMobile
                ? tokens.sm.tenantIconButton.backgroundColor.active
                : tokens.lg.tenantIconButton.backgroundColor.active
        }};
    }
`

const MerchantSelectTrigger = styled.button<{ isMobile: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: none;
    background-color: transparent;
    cursor: pointer;
    gap: ${({ isMobile }) => {
        const tokens = useComponentToken('TOPBAR') as ResponsiveTopbarTokens
        return isMobile
            ? tokens.sm.merchantSelectTrigger.gap
            : tokens.lg.merchantSelectTrigger.gap
    }};
    padding: 0;
    width: 100%;
    overflow: hidden;
`

const Topbar = forwardRef<HTMLDivElement, TopbarProps>(
    (
        {
            children,
            isExpanded,
            onToggleExpansion,
            showToggleButton,
            sidebarTopSlot,
            topbar,
            title,
            leftAction,
            rightActions,
            showBackButton = false,
            onBackClick,
            leftPanel,
            merchantInfo,
        },
        ref
    ) => {
        const { innerWidth } = useBreakpoints()
        const isMobile = innerWidth < BREAKPOINTS.lg
        const tokens = useComponentToken('TOPBAR') as ResponsiveTopbarTokens
        const topBarToken = isMobile ? tokens.sm : tokens.lg

        if (isMobile) {
            const renderLeftSection = () => {
                if (leftAction) {
                    return leftAction
                }

                if (showBackButton) {
                    return (
                        <ActionButton isMobile={isMobile} onClick={onBackClick}>
                            <ArrowLeft
                                color={topBarToken.actionButton.icon.color}
                                size={topBarToken.actionButton.icon.size}
                            />
                        </ActionButton>
                    )
                }

                return (
                    <Block
                        display="flex"
                        alignItems="center"
                        gap={topBarToken.leftSection.gap}
                        maxHeight={topBarToken.leftSection.maxHeight}
                    >
                        {leftPanel &&
                            leftPanel.items &&
                            leftPanel.items.length > 0 && (
                                <SingleSelect
                                    placeholder=""
                                    variant={SelectMenuVariant.NO_CONTAINER}
                                    items={[
                                        {
                                            items: leftPanel.items.map(
                                                (tenant) => ({
                                                    label: tenant.label,
                                                    value:
                                                        tenant.value ||
                                                        tenant.label,
                                                    slot1: tenant.icon,
                                                })
                                            ),
                                        },
                                    ]}
                                    selected={leftPanel.selected}
                                    onSelect={leftPanel.onSelect}
                                    customTrigger={
                                        <TenantIconButton isMobile={isMobile}>
                                            {leftPanel.items.find(
                                                (item) =>
                                                    (item.value ||
                                                        item.label) ===
                                                    leftPanel.selected
                                            )?.icon || leftPanel.items[0]?.icon}
                                        </TenantIconButton>
                                    }
                                />
                            )}

                        {leftPanel &&
                            leftPanel.items &&
                            leftPanel.items.length > 0 &&
                            merchantInfo && (
                                <Text
                                    variant="heading.md"
                                    color={
                                        topBarToken.leftSection.divider.color
                                    }
                                    fontWeight={
                                        topBarToken.leftSection.divider
                                            .fontWeight
                                    }
                                >
                                    /
                                </Text>
                            )}

                        {merchantInfo && (
                            <SingleSelect
                                placeholder="Select Merchant"
                                variant={SelectMenuVariant.NO_CONTAINER}
                                items={[
                                    {
                                        items: merchantInfo.items.map(
                                            (merchant) => ({
                                                label: merchant.label,
                                                value: merchant.value,
                                                slot1: merchant.icon || (
                                                    <UserIcon
                                                        style={{
                                                            width: topBarToken
                                                                .merchantSelectTrigger
                                                                .icon.size,
                                                            height: topBarToken
                                                                .merchantSelectTrigger
                                                                .icon.size,
                                                        }}
                                                    />
                                                ),
                                            })
                                        ),
                                    },
                                ]}
                                selected={merchantInfo.selected}
                                onSelect={merchantInfo.onSelect}
                                customTrigger={
                                    <MerchantSelectTrigger isMobile={isMobile}>
                                        <Block
                                            display="flex"
                                            alignItems="center"
                                            gap={
                                                topBarToken
                                                    .merchantSelectTrigger.gap
                                            }
                                        >
                                            {
                                                merchantInfo.items.find(
                                                    (merchant) =>
                                                        merchant.value ===
                                                        merchantInfo.selected
                                                )?.icon
                                            }
                                            <Text
                                                variant="body.md"
                                                color={
                                                    topBarToken
                                                        .merchantSelectTrigger
                                                        .text.color
                                                }
                                                fontWeight={
                                                    topBarToken
                                                        .merchantSelectTrigger
                                                        .text.fontWeight
                                                }
                                                style={{
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                }}
                                            >
                                                {merchantInfo.items.find(
                                                    (merchant) =>
                                                        merchant.value ===
                                                        merchantInfo.selected
                                                )?.label || 'Select Merchant'}
                                            </Text>
                                        </Block>
                                        <ChevronDown
                                            size={
                                                topBarToken
                                                    .merchantSelectTrigger.icon
                                                    .size
                                            }
                                            color={
                                                topBarToken
                                                    .merchantSelectTrigger.icon
                                                    .color
                                            }
                                        />
                                    </MerchantSelectTrigger>
                                }
                            />
                        )}
                    </Block>
                )
            }

            return (
                <Block
                    ref={ref}
                    width="100%"
                    height={topBarToken.height}
                    position={topBarToken.position}
                    top={topBarToken.top}
                    zIndex={topBarToken.zIndex}
                    borderBottom={topBarToken.borderBottom}
                    display="flex"
                    alignItems="center"
                    gap={topBarToken.gap}
                    padding={topBarToken.padding}
                    backgroundColor={topBarToken.backgroundColor}
                    style={{
                        backdropFilter: topBarToken.backdropFilter,
                    }}
                >
                    <Block
                        display="flex"
                        alignItems="center"
                        width="fit-content"
                        flexShrink={0}
                    >
                        {renderLeftSection()}
                    </Block>

                    <Block
                        flexGrow={1}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        minWidth={0}
                    >
                        {children ||
                            (title && (
                                <Text
                                    variant="body.lg"
                                    fontWeight={
                                        topBarToken.centerSection.title
                                            .fontWeight
                                    }
                                    color={
                                        topBarToken.centerSection.title.color
                                    }
                                    truncate
                                >
                                    {title}
                                </Text>
                            ))}
                    </Block>

                    <Block
                        display="flex"
                        alignItems="center"
                        gap={topBarToken.rightSection.gap}
                        width="fit-content"
                        flexShrink={0}
                    >
                        {rightActions}
                    </Block>
                </Block>
            )
        }

        return (
            <Block
                ref={ref}
                width="100%"
                height={topBarToken.height}
                position={topBarToken.position}
                top={topBarToken.top}
                zIndex={topBarToken.zIndex}
                borderBottom={topBarToken.borderBottom}
                display="flex"
                alignItems="center"
                gap={topBarToken.gap}
                padding={topBarToken.padding}
                backgroundColor={topBarToken.backgroundColor}
                style={{
                    backdropFilter: topBarToken.backdropFilter,
                }}
            >
                {!isExpanded && (
                    <Block
                        display="flex"
                        alignItems="center"
                        gap={topBarToken.sidebarSection.gap}
                        width="fit-content"
                        flexShrink={0}
                    >
                        {showToggleButton && (
                            <ToggleButton
                                isMobile={isMobile}
                                onClick={onToggleExpansion}
                            >
                                <PanelsTopLeft
                                    color={topBarToken.toggleButton.icon.color}
                                    size={topBarToken.toggleButton.icon.size}
                                />
                            </ToggleButton>
                        )}
                        {sidebarTopSlot}
                    </Block>
                )}
                <Block flexGrow={1}>{topbar || children}</Block>
            </Block>
        )
    }
)

Topbar.displayName = 'Topbar'

export default Topbar
