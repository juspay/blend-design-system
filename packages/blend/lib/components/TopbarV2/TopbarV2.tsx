import { forwardRef, useState } from 'react'
import { ArrowLeft, ChevronDown } from 'lucide-react'
import Block from '../Primitives/Block/Block'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import Text from '../Text/Text'
import type { TopbarV2Props } from './types'
import { useBreakpoints } from '../../hooks/useBreakPoints'
import { SingleSelect } from '../SingleSelect'
import { SelectMenuSize, SelectMenuVariant } from '../Select/types'
import { useComponentToken } from '../../context/useComponentToken'
import type { ResponsiveTopbarV2Tokens } from './topbarV2.tokens'
import { BREAKPOINTS } from '../../breakpoints/breakPoints'
import Seperator from '../common/Seperator'

const isControlledTopbarV2 = (isVisible: boolean | undefined): boolean =>
    isVisible !== undefined

const TopbarV2 = forwardRef<HTMLDivElement, TopbarV2Props>(
    (
        {
            children,
            isExpanded,
            isVisible: controlledIsVisible,
            onVisibilityChange,
            onToggleExpansion,
            showToggleButton,
            panelOnlyMode,
            ariaControls,
            defaultIsVisible = true,
            sidebarTopSlot,
            topbar,
            leftAction,
            rightActions,
            showBackButton = false,
            onBackClick,
            secondarySidebar,
            merchantInfo,
        },
        ref
    ) => {
        const isControlled = isControlledTopbarV2(controlledIsVisible)
        const [internalVisible] = useState<boolean>(defaultIsVisible)
        const isVisible = isControlled ? controlledIsVisible! : internalVisible

        // Preserve signature parity: these props are accepted for future
        // controlled-visibility UI but not yet wired to any internal trigger.
        void onVisibilityChange
        void onToggleExpansion
        void showToggleButton
        void panelOnlyMode
        void ariaControls

        const { innerWidth } = useBreakpoints()
        const isMobile = innerWidth < BREAKPOINTS.lg
        const tokens = useComponentToken('TOPBARV2') as ResponsiveTopbarV2Tokens
        const topBarToken = isMobile ? tokens.sm : tokens.lg
        const selectedMerchant = merchantInfo?.items.find(
            (m) => m.value === merchantInfo.selected
        )

        if (!isVisible) return null

        if (isMobile) {
            const renderLeftSection = () => {
                if (leftAction) return leftAction

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
                                size={
                                    topBarToken.actionButton.icon
                                        .size as unknown as number
                                }
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
                        {secondarySidebar?.items?.length ? (
                            <SingleSelect
                                placeholder=""
                                variant={SelectMenuVariant.NO_CONTAINER}
                                size={SelectMenuSize.MEDIUM}
                                items={[
                                    {
                                        items: secondarySidebar.items.map(
                                            (item) => ({
                                                label: item.label,
                                                value: item.value,
                                                slot1: item.icon,
                                            })
                                        ),
                                    },
                                ]}
                                selected={secondarySidebar.selected}
                                onSelect={secondarySidebar.onSelect}
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
                                        aria-label={`Select tenant: ${
                                            secondarySidebar.selected ||
                                            secondarySidebar.items[0]?.label ||
                                            'tenant'
                                        }`}
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
                                            {secondarySidebar.items.find(
                                                (item) =>
                                                    item.value ===
                                                    secondarySidebar.selected
                                            )?.icon ??
                                                secondarySidebar.items[0]?.icon}
                                        </span>
                                    </PrimitiveButton>
                                }
                            />
                        ) : null}

                        {secondarySidebar?.items?.length && merchantInfo ? (
                            <Text
                                variant="heading.md"
                                color={topBarToken.leftSection.divider.color}
                                fontWeight={
                                    topBarToken.leftSection.divider.fontWeight
                                }
                            >
                                /
                            </Text>
                        ) : null}

                        {merchantInfo ? (
                            <SingleSelect
                                placeholder="Select Merchant"
                                variant={SelectMenuVariant.NO_CONTAINER}
                                items={[
                                    {
                                        items: merchantInfo.items.map((m) => ({
                                            label: m.label,
                                            value: m.value,
                                            slot1: m.icon,
                                        })),
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
                                                (m) =>
                                                    m.value ===
                                                    merchantInfo.selected
                                            )?.label ?? 'Select Merchant'
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
                                                (m) =>
                                                    m.value ===
                                                    merchantInfo.selected
                                            )?.icon ? (
                                                <span aria-hidden="true">
                                                    {
                                                        merchantInfo.items.find(
                                                            (m) =>
                                                                m.value ===
                                                                merchantInfo.selected
                                                        )?.icon
                                                    }
                                                </span>
                                            ) : null}
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
                                                    (m) =>
                                                        m.value ===
                                                        merchantInfo.selected
                                                )?.label ?? 'Select Merchant'}
                                            </Text>
                                        </Block>
                                        <ChevronDown
                                            size={
                                                topBarToken
                                                    .merchantSelectTrigger.icon
                                                    .size as unknown as number
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
                        ) : null}
                    </Block>
                )
            }

            return (
                <Block
                    ref={ref}
                    width="100%"
                    position="sticky"
                    top="0"
                    zIndex={topBarToken.zIndex}
                    borderBottom={topBarToken.borderBottom}
                    display="flex"
                    alignItems="center"
                    gap={topBarToken.gap}
                    padding={topBarToken.padding}
                    backgroundColor={topBarToken.backgroundColor}
                    style={{ backdropFilter: topBarToken.backdropFilter }}
                    justifyContent="space-between"
                    maxHeight={topBarToken.height}
                    minHeight={topBarToken.height}
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
                position="sticky"
                top="0"
                zIndex={topBarToken.zIndex}
                borderBottom={topBarToken.borderBottom}
                display="flex"
                alignItems="center"
                gap={topBarToken.gap}
                padding={topBarToken.padding}
                backgroundColor={topBarToken.backgroundColor}
                style={{ backdropFilter: topBarToken.backdropFilter }}
                maxHeight={topBarToken.height}
                minHeight={topBarToken.height}
            >
                {!isExpanded && sidebarTopSlot}
                {!isExpanded && (merchantInfo || topbar || children) && (
                    <Seperator
                        width={String(topBarToken.separator.width)}
                        color={String(topBarToken.separator.color)}
                    />
                )}
                <Block flexGrow={1}>{topbar || children}</Block>
            </Block>
        )
    }
)

TopbarV2.displayName = 'TopbarV2'

export default TopbarV2
