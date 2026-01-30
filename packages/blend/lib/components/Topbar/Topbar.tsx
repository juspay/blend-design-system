import { forwardRef, useState } from 'react'
import { ArrowLeft, ChevronDown } from 'lucide-react'
import Block from '../Primitives/Block/Block'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import Text from '../Text/Text'
import type { TopbarProps } from './types'
import { useBreakpoints } from '../../hooks/useBreakPoints'
import { SingleSelect } from '../SingleSelect'
import { SelectMenuSize, SelectMenuVariant } from '../Select/types'
import { useComponentToken } from '../../context/useComponentToken'
import type { ResponsiveTopbarTokens } from './topbar.tokens'
import { BREAKPOINTS } from '../../breakpoints/breakPoints'

/**
 * Helper to check if Topbar is in controlled mode
 */
const isControlledTopbar = (isVisible: boolean | undefined): boolean => {
    return isVisible !== undefined
}

const Topbar = forwardRef<HTMLDivElement, TopbarProps>(
    (
        {
            children,
            isExpanded,
            isVisible: controlledIsVisible,
            // @ts-expect-error - onVisibilityChange is part of the controlled API but not used internally
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onVisibilityChange,
            defaultIsVisible = true,
            sidebarTopSlot,
            topbar,
            leftAction,
            rightActions,
            showBackButton = false,
            onBackClick,
            leftPanel,
            merchantInfo,
        },
        ref
    ) => {
        const isControlled = isControlledTopbar(controlledIsVisible)
        const [internalVisible] = useState<boolean>(defaultIsVisible)

        const isVisible = isControlled ? controlledIsVisible! : internalVisible

        const { innerWidth } = useBreakpoints()
        const isMobile = innerWidth < BREAKPOINTS.lg
        const tokens = useComponentToken('TOPBAR') as ResponsiveTopbarTokens
        const topBarToken = isMobile ? tokens.sm : tokens.lg

        if (!isVisible) {
            return null
        }
        if (isMobile) {
            const renderLeftSection = () => {
                if (leftAction) {
                    return leftAction
                }

                if (showBackButton) {
                    return (
                        <PrimitiveButton
                            type="button"
                            onClick={onBackClick}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            border="none"
                            backgroundColor="transparent"
                            borderRadius={topBarToken.actionButton.borderRadius}
                            cursor="pointer"
                            padding={topBarToken.actionButton.padding}
                            minWidth={topBarToken.actionButton.minWidth}
                            height={topBarToken.actionButton.height}
                            aria-label="Go back"
                            style={{
                                transition: topBarToken.actionButton.transition,
                            }}
                            _hover={{
                                backgroundColor:
                                    topBarToken.actionButton.backgroundColor
                                        .hover,
                            }}
                        >
                            <ArrowLeft
                                color={topBarToken.actionButton.icon.color}
                                size={topBarToken.actionButton.icon.size}
                                aria-hidden="true"
                            />
                        </PrimitiveButton>
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
                                    size={SelectMenuSize.MEDIUM}
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
                                        <PrimitiveButton
                                            type="button"
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            border="none"
                                            backgroundColor="transparent"
                                            borderRadius={
                                                topBarToken.tenantIconButton
                                                    .borderRadius
                                            }
                                            cursor="pointer"
                                            minHeight={
                                                topBarToken.tenantIconButton
                                                    .minHeight
                                            }
                                            aria-label={`Select tenant: ${leftPanel.selected || leftPanel.items[0]?.label || 'tenant'}`}
                                            style={{
                                                transition:
                                                    topBarToken.tenantIconButton
                                                        .transition,
                                            }}
                                            _hover={{
                                                backgroundColor:
                                                    topBarToken.tenantIconButton
                                                        .backgroundColor.hover,
                                            }}
                                        >
                                            <span aria-hidden="true">
                                                {leftPanel.items.find(
                                                    (item) =>
                                                        (item.value ||
                                                            item.label) ===
                                                        leftPanel.selected
                                                )?.icon ||
                                                    leftPanel.items[0]?.icon}
                                            </span>
                                        </PrimitiveButton>
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
                                                slot1: merchant.icon,
                                            })
                                        ),
                                    },
                                ]}
                                selected={merchantInfo.selected}
                                onSelect={merchantInfo.onSelect}
                                customTrigger={
                                    <PrimitiveButton
                                        type="button"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        border="none"
                                        backgroundColor="transparent"
                                        cursor="pointer"
                                        gap={
                                            topBarToken.merchantSelectTrigger
                                                .gap
                                        }
                                        padding="0"
                                        width="100%"
                                        overflow="hidden"
                                        aria-label={`Select merchant: ${
                                            merchantInfo.items.find(
                                                (merchant) =>
                                                    merchant.value ===
                                                    merchantInfo.selected
                                            )?.label || 'Select Merchant'
                                        }`}
                                    >
                                        <Block
                                            display="flex"
                                            alignItems="center"
                                            gap={
                                                topBarToken
                                                    .merchantSelectTrigger.gap
                                            }
                                        >
                                            {merchantInfo.items.find(
                                                (merchant) =>
                                                    merchant.value ===
                                                    merchantInfo.selected
                                            )?.icon && (
                                                <span aria-hidden="true">
                                                    {
                                                        merchantInfo.items.find(
                                                            (merchant) =>
                                                                merchant.value ===
                                                                merchantInfo.selected
                                                        )?.icon
                                                    }
                                                </span>
                                            )}
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
                                    </PrimitiveButton>
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
                    position="sticky"
                    top="0"
                    borderBottom={topBarToken.borderBottom}
                    display="flex"
                    alignItems="center"
                    gap={topBarToken.gap}
                    padding={topBarToken.padding}
                    backgroundColor={topBarToken.backgroundColor}
                    style={{
                        backdropFilter: topBarToken.backdropFilter,
                    }}
                    justifyContent="space-between"
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
                data-topbar="topbar"
                ref={ref}
                width="100%"
                top="0"
                borderBottom={topBarToken.borderBottom}
                display="flex"
                alignItems="center"
                gap={topBarToken.gap}
                padding={topBarToken.padding}
                backgroundColor={topBarToken.backgroundColor}
                style={{
                    backdropFilter: topBarToken.backdropFilter,
                }}
                maxHeight={'68px'}
                minHeight={'64px'}
            >
                {!isExpanded && sidebarTopSlot}
                <Block flexGrow={1}>{topbar || children}</Block>
            </Block>
        )
    }
)

Topbar.displayName = 'Topbar'

export default Topbar
