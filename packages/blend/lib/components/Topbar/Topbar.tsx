import { forwardRef } from 'react'
import { PanelsTopLeft, ArrowLeft, UserIcon } from 'lucide-react'
import styled from 'styled-components'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import type { TopbarProps } from './types'
import { FOUNDATION_THEME } from '../../tokens'
import { useBreakpoints } from '../../hooks/useBreakPoints'
import { SingleSelect } from '../SingleSelect'
import { SelectMenuVariant } from '../Select/types'

const ToggleButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: transparent;
    border-radius: ${FOUNDATION_THEME.border.radius[10]};
    cursor: pointer;
    padding: ${FOUNDATION_THEME.unit[9]};
    transition: background-color 0.15s ease;

    &:hover {
        background-color: ${FOUNDATION_THEME.colors.gray[100]};
    }
`

const ActionButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: transparent;
    border-radius: ${FOUNDATION_THEME.border.radius[8]};
    cursor: pointer;
    padding: ${FOUNDATION_THEME.unit[8]};
    transition: background-color 0.15s ease;
    min-width: ${FOUNDATION_THEME.unit[40]};
    height: ${FOUNDATION_THEME.unit[40]};

    &:hover {
        background-color: ${FOUNDATION_THEME.colors.gray[100]};
    }

    &:active {
        background-color: ${FOUNDATION_THEME.colors.gray[150]};
    }
`

const TenantIconButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: transparent;
    border-radius: ${FOUNDATION_THEME.border.radius[8]};
    cursor: pointer;
    transition: background-color 0.15s ease;

    &:hover {
        background-color: ${FOUNDATION_THEME.colors.gray[100]};
    }

    &:active {
        background-color: ${FOUNDATION_THEME.colors.gray[150]};
    }
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
        const isMobile = innerWidth < 1024

        if (isMobile) {
            const renderLeftSection = () => {
                if (leftAction) {
                    return leftAction
                }

                if (showBackButton) {
                    return (
                        <ActionButton onClick={onBackClick}>
                            <ArrowLeft
                                color={FOUNDATION_THEME.colors.gray[600]}
                                size={FOUNDATION_THEME.unit[20]}
                            />
                        </ActionButton>
                    )
                }

                return (
                    <Block
                        display="flex"
                        alignItems="center"
                        gap={FOUNDATION_THEME.unit[6]}
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
                                        <TenantIconButton>
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
                                    variant="body.md"
                                    color={FOUNDATION_THEME.colors.gray[400]}
                                    fontWeight={400}
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
                                                            width: FOUNDATION_THEME
                                                                .unit[16],
                                                            height: FOUNDATION_THEME
                                                                .unit[16],
                                                        }}
                                                    />
                                                ),
                                            })
                                        ),
                                    },
                                ]}
                                selected={merchantInfo.selected}
                                onSelect={merchantInfo.onSelect}
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
                    zIndex="10"
                    borderBottom={`${FOUNDATION_THEME.border.width[1]} solid ${FOUNDATION_THEME.colors.gray[200]}`}
                    display="flex"
                    alignItems="center"
                    gap={FOUNDATION_THEME.unit[12]}
                    padding={`${FOUNDATION_THEME.unit[12]} ${FOUNDATION_THEME.unit[16]}`}
                    backgroundColor="hsla(0, 0%, 100%, 0.95)"
                    style={{
                        backdropFilter: 'blur(10px)',
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
                                    fontWeight={600}
                                    color={FOUNDATION_THEME.colors.gray[800]}
                                    truncate
                                >
                                    {title}
                                </Text>
                            ))}
                    </Block>

                    <Block
                        display="flex"
                        alignItems="center"
                        gap={FOUNDATION_THEME.unit[8]}
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
                height={FOUNDATION_THEME.unit[68]}
                position="sticky"
                top="0"
                zIndex="10"
                borderBottom={`${FOUNDATION_THEME.border.width[1]} solid ${FOUNDATION_THEME.colors.gray[200]}`}
                display="flex"
                alignItems="center"
                gap={FOUNDATION_THEME.unit[16]}
                padding={`${FOUNDATION_THEME.unit[16]} ${FOUNDATION_THEME.unit[32]}`}
                backgroundColor="hsla(0, 0%, 100%, 0.8)"
                style={{
                    backdropFilter: 'blur(10px)',
                }}
            >
                {!isExpanded && (
                    <Block
                        display="flex"
                        alignItems="center"
                        gap={FOUNDATION_THEME.unit[16]}
                        width="fit-content"
                        flexShrink={0}
                    >
                        {showToggleButton && (
                            <ToggleButton onClick={onToggleExpansion}>
                                <PanelsTopLeft
                                    color={FOUNDATION_THEME.colors.gray[600]}
                                    size={FOUNDATION_THEME.unit[14]}
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
