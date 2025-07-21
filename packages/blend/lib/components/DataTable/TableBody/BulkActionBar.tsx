import { forwardRef } from 'react'
import { Download } from 'lucide-react'
import { Button } from '../../../main'
import { ButtonSize, ButtonType } from '../../Button/types'
import Block from '../../Primitives/Block/Block'
import PrimitiveText from '../../Primitives/PrimitiveText/PrimitiveText'
import PrimitiveButton from '../../Primitives/PrimitiveButton/PrimitiveButton'
import { FOUNDATION_THEME } from '../../../tokens'
import { useComponentToken } from '../../../context/useComponentToken'
import { TableTokenType } from '../dataTable.tokens'

export type BulkActionBarProps = {
    selectedCount: number
    onExport: () => void
    onDeselectAll: () => void
    customActions?: React.ReactNode
}

const BulkActionBar = forwardRef<HTMLDivElement, BulkActionBarProps>(
    ({ selectedCount, onExport, onDeselectAll, customActions }, ref) => {
        const tableToken = useComponentToken('TABLE') as TableTokenType
        if (selectedCount === 0) return null

        return (
            <Block
                ref={ref}
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
                // minWidth={tableToken.dataTable.bulkActions.minWidth}
                style={{
                    top: tableToken.dataTable.bulkActions.top,
                    left: tableToken.dataTable.bulkActions.left,
                    transform: tableToken.dataTable.bulkActions.transform,
                    height: tableToken.dataTable.bulkActions.height,
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
                    }}
                >
                    {selectedCount} selected
                </PrimitiveText>

                <Block
                    height="24px"
                    width="1px"
                    backgroundColor={FOUNDATION_THEME.colors.gray[300]}
                />

                <Button
                    buttonType={ButtonType.SECONDARY}
                    leadingIcon={<Download />}
                    size={ButtonSize.SMALL}
                    onClick={onExport}
                >
                    Export
                </Button>

                <Block
                    height="24px"
                    width="1px"
                    backgroundColor={FOUNDATION_THEME.colors.gray[300]}
                />

                <PrimitiveButton
                    onClick={onDeselectAll}
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
                    }}
                >
                    Deselect all
                </PrimitiveButton>

                {customActions && (
                    <Block
                        display="flex"
                        alignItems="center"
                        gap={FOUNDATION_THEME.unit[8]}
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
