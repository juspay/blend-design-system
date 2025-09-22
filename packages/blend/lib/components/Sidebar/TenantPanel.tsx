import React from 'react'
import { MoreHorizontal } from 'lucide-react'
import Block from '../Primitives/Block/Block'
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
import { TooltipSide } from '../Tooltip/types'

type TenantPanelProps = {
    items: TenantItem[]
    selected: string
    onSelect: (label: string) => void
    maxVisibleItems?: number
}

const TenantPanel: React.FC<TenantPanelProps> = ({
    items,
    selected,
    onSelect,
    maxVisibleItems = 5,
}) => {
    const { visibleTenants, hiddenTenants, hasMoreTenants } = arrangeTenants(
        items,
        selected,
        maxVisibleItems
    )

    return (
        <Block
            width="fit-content"
            height="100%"
            borderRight={`1px solid ${FOUNDATION_THEME.colors.gray[200]}`}
            backgroundColor={FOUNDATION_THEME.colors.gray[25]}
            display="flex"
            flexDirection="column"
            gap={FOUNDATION_THEME.unit[16]}
            alignItems="center"
            padding="10px"
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
        </Block>
    )
}

const TenantItem: React.FC<{
    tenant: TenantItem
    isSelected: boolean
    onSelect: () => void
}> = ({ tenant, isSelected, onSelect }) => (
    <Tooltip
        content={tenant.label}
        side={TooltipSide.RIGHT}
        delayDuration={500}
    >
        <Block
            border="none"
            backgroundColor={
                isSelected ? FOUNDATION_THEME.colors.gray[150] : 'transparent'
            }
            width={FOUNDATION_THEME.unit[32]}
            height={FOUNDATION_THEME.unit[32]}
            borderRadius={FOUNDATION_THEME.border.radius[4]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            style={{
                outline: `1px solid ${FOUNDATION_THEME.colors.gray[150]}`,
                transitionDuration: '75ms',
                color: isSelected
                    ? FOUNDATION_THEME.colors.gray[1000]
                    : FOUNDATION_THEME.colors.gray[600],
            }}
            _hover={{
                backgroundColor: FOUNDATION_THEME.colors.gray[50],
                color: FOUNDATION_THEME.colors.gray[600],
            }}
            onClick={onSelect}
        >
            <Block
                style={{
                    color: isSelected
                        ? FOUNDATION_THEME.colors.gray[1000]
                        : FOUNDATION_THEME.colors.gray[600],
                }}
            >
                {React.isValidElement(tenant.icon)
                    ? React.cloneElement(
                          tenant.icon as React.ReactElement<any>,
                          {
                              color: isSelected
                                  ? FOUNDATION_THEME.colors.gray[1000]
                                  : FOUNDATION_THEME.colors.gray[600],
                          }
                      )
                    : tenant.icon}
            </Block>
        </Block>
    </Tooltip>
)

const TenantOverflowMenu: React.FC<{
    hiddenTenants: TenantItem[]
    onSelect: (label: string) => void
}> = ({ hiddenTenants, onSelect }) => (
    <Tooltip
        content="More tenants"
        side={TooltipSide.RIGHT}
        delayDuration={500}
    >
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
                    <Block
                        border="none"
                        backgroundColor="transparent"
                        width={FOUNDATION_THEME.unit[32]}
                        height={FOUNDATION_THEME.unit[32]}
                        borderRadius={FOUNDATION_THEME.border.radius[4]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        cursor="pointer"
                        style={{
                            outline: `1px solid ${FOUNDATION_THEME.colors.gray[150]}`,
                            transitionDuration: '75ms',
                        }}
                        _hover={{
                            backgroundColor: FOUNDATION_THEME.colors.gray[50],
                        }}
                    >
                        <MoreHorizontal
                            style={{
                                width: FOUNDATION_THEME.unit[16],
                                height: FOUNDATION_THEME.unit[16],
                            }}
                            color={FOUNDATION_THEME.colors.gray[600]}
                        />
                    </Block>
                }
            />
        </Block>
    </Tooltip>
)

export default TenantPanel
