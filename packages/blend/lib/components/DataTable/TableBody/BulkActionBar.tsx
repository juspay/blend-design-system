import { forwardRef, useState } from 'react'
import { Download } from 'lucide-react'
import { Button } from '../../../main'
import { ButtonSize, ButtonType } from '../../Button/types'
import Block from '../../Primitives/Block/Block'
import PrimitiveText from '../../Primitives/PrimitiveText/PrimitiveText'
import PrimitiveButton from '../../Primitives/PrimitiveButton/PrimitiveButton'
import { FOUNDATION_THEME } from '../../../tokens'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import { TableTokenType } from '../dataTable.tokens'
import { useBreakpoints } from '../../../hooks/useBreakPoints'
import { BREAKPOINTS } from '../../../breakpoints/breakPoints'
import {
    Drawer,
    DrawerTrigger,
    DrawerPortal,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerBody,
} from '../../Drawer'

export type BulkActionBarProps = {
    selectedCount: number
    onExport: () => void
    onDeselectAll: () => void
    customActions?: React.ReactNode
}

const BulkActionBar = forwardRef<HTMLDivElement, BulkActionBarProps>(
    ({ selectedCount, onExport, onDeselectAll, customActions }, ref) => {
        const tableToken = useResponsiveTokens<TableTokenType>('TABLE')
        const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
        const isMobile = breakPointLabel === 'sm'
        const [drawerOpen, setDrawerOpen] = useState(false)

        if (selectedCount === 0) return null

        if (isMobile) {
            return (
                <Block
                    ref={ref}
                    role="region"
                    aria-label={`${selectedCount} row${selectedCount !== 1 ? 's' : ''} selected`}
                    position="absolute"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    borderRadius={tableToken.dataTable.bulkActions.borderRadius}
                    color={tableToken.dataTable.bulkActions.color}
                    backgroundColor={
                        tableToken.dataTable.bulkActions.backgroundColor
                    }
                    zIndex={tableToken.dataTable.bulkActions.zIndex}
                    border={tableToken.dataTable.bulkActions.border}
                    boxShadow={tableToken.dataTable.bulkActions.boxShadow}
                    padding={tableToken.dataTable.bulkActions.padding}
                    gap={tableToken.dataTable.bulkActions.gap}
                    style={{
                        top: tableToken.dataTable.bulkActions.top,
                        left: tableToken.dataTable.bulkActions.left,
                        transform: tableToken.dataTable.bulkActions.transform,
                        height: tableToken.dataTable.bulkActions.height,
                        width: tableToken.dataTable.bulkActions.width,
                        maxWidth: tableToken.dataTable.bulkActions.maxWidth,
                        minWidth: tableToken.dataTable.bulkActions.minWidth,
                    }}
                >
                    <Block
                        display="flex"
                        alignItems="center"
                        gap={tableToken.dataTable.bulkActions.gap}
                        flexShrink={0}
                    >
                        <PrimitiveText
                            style={{
                                fontSize:
                                    tableToken.dataTable.bulkActions.selectText
                                        .fontSize,
                                fontWeight:
                                    tableToken.dataTable.bulkActions.selectText
                                        .fontWeight,
                                color: tableToken.dataTable.bulkActions
                                    .selectText.color,
                                whiteSpace: 'nowrap', // Prevent text wrapping
                            }}
                        >
                            {selectedCount} selected
                        </PrimitiveText>

                        <Block
                            height="24px"
                            width="1px"
                            backgroundColor={FOUNDATION_THEME.colors.gray[300]}
                            flexShrink={0}
                        />
                    </Block>

                    <Block flexShrink={0}>
                        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
                            <DrawerTrigger>
                                <Button
                                    buttonType={ButtonType.SECONDARY}
                                    size={ButtonSize.SMALL}
                                    aria-label={`See actions for ${selectedCount} selected row${selectedCount !== 1 ? 's' : ''}`}
                                    text="See Actions"
                                />
                            </DrawerTrigger>

                            <DrawerPortal>
                                <DrawerOverlay />
                                <DrawerContent contentDriven={true}>
                                    <DrawerHeader>
                                        <Block
                                            display="flex"
                                            justifyContent="center"
                                            alignItems="center"
                                        >
                                            <DrawerTitle>Actions</DrawerTitle>
                                        </Block>
                                    </DrawerHeader>

                                    <DrawerBody>
                                        <Block
                                            display="flex"
                                            flexDirection="column"
                                            gap={FOUNDATION_THEME.unit[16]}
                                        >
                                            <Button
                                                buttonType={
                                                    ButtonType.SECONDARY
                                                }
                                                leadingIcon={
                                                    <Download aria-hidden="true" />
                                                }
                                                aria-label={`Export ${selectedCount} selected row${selectedCount !== 1 ? 's' : ''}`}
                                                size={ButtonSize.MEDIUM}
                                                onClick={() => {
                                                    onExport()
                                                    setDrawerOpen(false)
                                                }}
                                                fullWidth
                                                text="Export"
                                            />

                                            <Button
                                                buttonType={
                                                    ButtonType.SECONDARY
                                                }
                                                aria-label="Deselect all rows"
                                                size={ButtonSize.MEDIUM}
                                                onClick={() => {
                                                    onDeselectAll()
                                                    setDrawerOpen(false)
                                                }}
                                                fullWidth
                                                text="Deselect all"
                                            />

                                            {customActions && (
                                                <Block
                                                    display="flex"
                                                    flexDirection="column"
                                                    gap={
                                                        FOUNDATION_THEME
                                                            .unit[16]
                                                    }
                                                >
                                                    {customActions}
                                                </Block>
                                            )}
                                        </Block>
                                    </DrawerBody>
                                </DrawerContent>
                            </DrawerPortal>
                        </Drawer>
                    </Block>
                </Block>
            )
        }

        return (
            <Block
                ref={ref}
                role="region"
                aria-label={`${selectedCount} row${selectedCount !== 1 ? 's' : ''} selected`}
                position="absolute"
                display="flex"
                alignItems="center"
                borderRadius={tableToken.dataTable.bulkActions.borderRadius}
                color={tableToken.dataTable.bulkActions.color}
                backgroundColor={
                    tableToken.dataTable.bulkActions.backgroundColor
                }
                zIndex={tableToken.dataTable.bulkActions.zIndex}
                gap={tableToken.dataTable.bulkActions.gap}
                border={tableToken.dataTable.bulkActions.border}
                padding={tableToken.dataTable.bulkActions.padding}
                boxShadow={tableToken.dataTable.bulkActions.boxShadow}
                style={{
                    top: tableToken.dataTable.bulkActions.top,
                    left: tableToken.dataTable.bulkActions.left,
                    transform: tableToken.dataTable.bulkActions.transform,
                    height: tableToken.dataTable.bulkActions.height,
                    flexWrap: 'nowrap',
                    overflowX: 'auto',
                }}
            >
                <PrimitiveText
                    style={{
                        fontSize:
                            tableToken.dataTable.bulkActions.selectText
                                .fontSize,
                        fontWeight:
                            tableToken.dataTable.bulkActions.selectText
                                .fontWeight,
                        flex: tableToken.dataTable.bulkActions.selectText.flex,
                        color: tableToken.dataTable.bulkActions.selectText
                            .color,
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                    }}
                >
                    {selectedCount} selected
                </PrimitiveText>

                <Block
                    height="24px"
                    width="1px"
                    backgroundColor={FOUNDATION_THEME.colors.gray[300]}
                    style={{ flexShrink: 0 }}
                />

                <Block style={{ flexShrink: 0 }}>
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        leadingIcon={<Download aria-hidden="true" />}
                        aria-label={`Export ${selectedCount} selected row${selectedCount !== 1 ? 's' : ''}`}
                        size={ButtonSize.SMALL}
                        onClick={onExport}
                    >
                        Export
                    </Button>
                </Block>

                <Block
                    height="24px"
                    width="1px"
                    backgroundColor={FOUNDATION_THEME.colors.gray[300]}
                    style={{ flexShrink: 0 }}
                />

                <PrimitiveButton
                    onClick={onDeselectAll}
                    type="button"
                    aria-label="Deselect all rows"
                    style={{
                        fontSize:
                            tableToken.dataTable.bulkActions.selectText
                                .fontSize,
                        fontWeight:
                            tableToken.dataTable.bulkActions.selectText
                                .fontWeight,
                        color: FOUNDATION_THEME.colors.gray[600],
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                    }}
                >
                    Deselect all
                </PrimitiveButton>

                {customActions && (
                    <Block
                        display="flex"
                        alignItems="center"
                        gap={FOUNDATION_THEME.unit[8]}
                        style={{ flexShrink: 0 }}
                    >
                        {customActions}
                    </Block>
                )}
            </Block>
        )
    }
)

BulkActionBar.displayName = 'BulkActionBar'

export default BulkActionBar
