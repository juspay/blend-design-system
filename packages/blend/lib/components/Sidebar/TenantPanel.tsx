import React from 'react'
import { MoreHorizontal } from 'lucide-react'
import Block from '../Primitives/Block/Block'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import { SingleSelect } from '../SingleSelect'
import {
    SelectMenuVariant,
    SelectMenuAlignment,
    SelectMenuSide,
} from '../Select/types'
import { FOUNDATION_THEME } from '../../tokens'
import { arrangeTenants } from './utils'
import type { TenantItem } from './types'
import { Tooltip } from '../Tooltip'
import { TooltipSide, TooltipSize } from '../Tooltip/types'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import type { SidebarTokenType } from './sidebar.tokens'

type TenantPanelProps = {
    items: TenantItem[]
    selected: string
    onSelect: (label: string) => void
    maxVisibleItems?: number
    tenantSlot1?: React.ReactNode
    tenantSlot2?: React.ReactNode
    tenantFooter?: React.ReactNode
}

const TenantPanel: React.FC<TenantPanelProps> = ({
    items,
    selected,
    onSelect,
    maxVisibleItems = 5,
    tenantSlot1,
    tenantSlot2,
    tenantFooter,
}) => {
    const tokens = useResponsiveTokens<SidebarTokenType>('SIDEBAR')
    const { visibleTenants, hiddenTenants, hasMoreTenants } = arrangeTenants(
        items,
        selected,
        maxVisibleItems
    )

    return (
        <Block
            width={tokens.leftPanel.width}
            height="100%"
            borderRight={tokens.leftPanel.borderRight}
            backgroundColor={tokens.leftPanel.backgroundColor}
            display="flex"
            flexDirection="column"
            gap={tokens.leftPanel.gap}
            alignItems="center"
            padding={`${tokens.leftPanel.padding.y} ${tokens.leftPanel.padding.x}`}
        >
            {visibleTenants.map((tenant, index) => (
                <TenantItem
                    key={index}
                    tenant={tenant}
                    isSelected={selected === tenant.label}
                    onSelect={() => onSelect(tenant.label)}
                />
            ))}

            {hasMoreTenants && (
                <TenantOverflowMenu
                    hiddenTenants={hiddenTenants}
                    onSelect={onSelect}
                />
            )}

            {(tenantSlot1 || tenantSlot2) && (
                <Block
                    marginTop="auto"
                    display="flex"
                    flexDirection="column"
                    gap={tokens.leftPanel.gap}
                    alignItems="center"
                >
                    {tenantSlot1 && (
                        <Block
                            width={tokens.leftPanel.item.width}
                            height={tokens.leftPanel.item.width}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            {tenantSlot1}
                        </Block>
                    )}

                    {tenantSlot2 && (
                        <Block
                            width={tokens.leftPanel.item.width}
                            height={tokens.leftPanel.item.width}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            {tenantSlot2}
                        </Block>
                    )}
                </Block>
            )}

            {tenantFooter && (
                <Block
                    width={tokens.leftPanel.item.width}
                    height={tokens.leftPanel.item.width}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    marginTop={tenantSlot1 || tenantSlot2 ? undefined : 'auto'}
                >
                    {tenantFooter}
                </Block>
            )}
        </Block>
    )
}

const TenantItem: React.FC<{
    tenant: TenantItem
    isSelected: boolean
    onSelect: () => void
}> = ({ tenant, isSelected, onSelect }) => {
    const tokens = useResponsiveTokens<SidebarTokenType>('SIDEBAR')

    return (
        <Tooltip
            content={tenant.label}
            side={TooltipSide.RIGHT}
            delayDuration={500}
            size={TooltipSize.SMALL}
        >
            <PrimitiveButton
                type="button"
                onClick={onSelect}
                backgroundColor={tokens.leftPanel.item.backgroundColor.default}
                width={tokens.leftPanel.item.width}
                height={tokens.leftPanel.item.width}
                borderRadius={tokens.leftPanel.item.borderRadius}
                display="flex"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                border={
                    isSelected
                        ? tokens.leftPanel.item.border.active
                        : tokens.leftPanel.item.border.default
                }
                style={{
                    transition: 'all 75ms ease',
                }}
                _hover={{
                    backgroundColor:
                        tokens.leftPanel.item.backgroundColor.hover,
                    outline: isSelected
                        ? tokens.leftPanel.item.border.active
                        : tokens.leftPanel.item.border.hover,
                }}
            >
                {tenant.icon}
            </PrimitiveButton>
        </Tooltip>
    )
}

const TenantOverflowMenu: React.FC<{
    hiddenTenants: TenantItem[]
    onSelect: (label: string) => void
}> = ({ hiddenTenants, onSelect }) => {
    const tokens = useResponsiveTokens<SidebarTokenType>('SIDEBAR')

    return (
        <Block position="relative">
            <SingleSelect
                placeholder=""
                variant={SelectMenuVariant.NO_CONTAINER}
                side={SelectMenuSide.RIGHT}
                alignment={SelectMenuAlignment.START}
                sideOffset={4}
                maxMenuHeight={300}
                minMenuWidth={200}
                enableSearch={true}
                searchPlaceholder="Search tenants..."
                items={[
                    {
                        items: hiddenTenants.map((tenant) => ({
                            label: tenant.label,
                            value: tenant.value || tenant.label,
                            slot1: tenant.icon,
                            tooltip: tenant.label,
                            tooltipProps: {
                                side: TooltipSide.RIGHT,
                                size: TooltipSize.SMALL,
                                delayDuration: 500,
                            },
                        })),
                    },
                ]}
                selected=""
                onSelect={(value) => {
                    const selectedTenant = hiddenTenants.find(
                        (t) => (t.value || t.label) === value
                    )
                    if (selectedTenant) {
                        onSelect(selectedTenant.label)
                    }
                }}
                customTrigger={
                    <PrimitiveButton
                        type="button"
                        border="none"
                        backgroundColor={
                            tokens.leftPanel.item.backgroundColor.default
                        }
                        width={tokens.leftPanel.item.width}
                        height={tokens.leftPanel.item.width}
                        borderRadius={tokens.leftPanel.item.borderRadius}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        cursor="pointer"
                        title="More tenants"
                        outline={tokens.leftPanel.item.border.default}
                        style={{
                            transition: 'all 75ms ease',
                        }}
                        _hover={{
                            backgroundColor:
                                tokens.leftPanel.item.backgroundColor.hover,
                        }}
                    >
                        <MoreHorizontal
                            style={{
                                width: FOUNDATION_THEME.unit[16],
                                height: FOUNDATION_THEME.unit[16],
                            }}
                            color={FOUNDATION_THEME.colors.gray[600]}
                        />
                    </PrimitiveButton>
                }
            />
        </Block>
    )
}

export default TenantPanel
