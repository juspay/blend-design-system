import { useCallback, memo } from 'react'
import { FlatList, ScrollView, View, type ListRenderItem } from 'react-native'
import { DropdownItem } from './DropdownItem'
import { DropdownSeparator } from './DropdownSeparator'
import { Text } from '../../../primitives/Text'
import type {
    DropdownFlatRow,
    DropdownItemAdapter,
    DropdownItemTokens,
} from './dropdown.types'

/**
 * Renders a list of `DropdownFlatRow`s — either in a `ScrollView` (default)
 * or a `FlatList` (when `enableVirtualization` is set and the row count
 * exceeds the threshold).
 *
 * Renders label rows as styled text, separator rows as `DropdownSeparator`,
 * and item rows as `DropdownItem`.
 */
export type DropdownListProps<TItem = unknown> = {
    rows: DropdownFlatRow<TItem>[]
    itemTokens: DropdownItemTokens
    separatorColor: string
    separatorHeight?: string | number
    separatorMargin?: string | number
    labelColor: string
    labelFontSize: string | number
    labelFontWeight: string | number
    labelPaddingTop?: string | number
    labelPaddingBottom?: string | number
    onItemPress: (item: DropdownItemAdapter<TItem>['item']) => void
    enableVirtualization?: boolean
    virtualizationThreshold?: number
    testID?: string
}

const VIRTUALIZATION_THRESHOLD = 30

function DropdownListImpl<TItem>({
    rows,
    itemTokens,
    separatorColor,
    separatorHeight = 1,
    separatorMargin,
    labelColor,
    labelFontSize,
    labelFontWeight,
    labelPaddingTop,
    labelPaddingBottom,
    onItemPress,
    enableVirtualization = false,
    virtualizationThreshold = VIRTUALIZATION_THRESHOLD,
    testID,
}: DropdownListProps<TItem>) {
    const renderItem = useCallback<ListRenderItem<DropdownFlatRow<TItem>>>(
        ({ item: row }) => (
            <RowRenderer
                row={row}
                itemTokens={itemTokens}
                separatorColor={separatorColor}
                separatorHeight={separatorHeight}
                separatorMargin={separatorMargin}
                labelColor={labelColor}
                labelFontSize={labelFontSize}
                labelFontWeight={labelFontWeight}
                labelPaddingTop={labelPaddingTop}
                labelPaddingBottom={labelPaddingBottom}
                onItemPress={onItemPress}
            />
        ),
        [
            itemTokens,
            separatorColor,
            separatorHeight,
            separatorMargin,
            labelColor,
            labelFontSize,
            labelFontWeight,
            labelPaddingTop,
            labelPaddingBottom,
            onItemPress,
        ]
    )

    const keyExtractor = useCallback(
        (row: DropdownFlatRow<TItem>) => row.id,
        []
    )

    const shouldVirtualize =
        enableVirtualization && rows.length > virtualizationThreshold

    if (shouldVirtualize) {
        return (
            <FlatList
                data={rows}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                testID={testID}
                keyboardShouldPersistTaps="handled"
            />
        )
    }

    return (
        <ScrollView
            testID={testID}
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled
        >
            {rows.map((row) => (
                <RowRenderer
                    key={row.id}
                    row={row}
                    itemTokens={itemTokens}
                    separatorColor={separatorColor}
                    separatorHeight={separatorHeight}
                    separatorMargin={separatorMargin}
                    labelColor={labelColor}
                    labelFontSize={labelFontSize}
                    labelFontWeight={labelFontWeight}
                    labelPaddingTop={labelPaddingTop}
                    labelPaddingBottom={labelPaddingBottom}
                    onItemPress={onItemPress}
                />
            ))}
        </ScrollView>
    )
}

type RowRendererProps<TItem> = {
    row: DropdownFlatRow<TItem>
    itemTokens: DropdownItemTokens
    separatorColor: string
    separatorHeight: string | number
    separatorMargin?: string | number
    labelColor: string
    labelFontSize: string | number
    labelFontWeight: string | number
    labelPaddingTop?: string | number
    labelPaddingBottom?: string | number
    onItemPress: (item: DropdownItemAdapter<TItem>['item']) => void
}

function RowRenderer<TItem>({
    row,
    itemTokens,
    separatorColor,
    separatorHeight,
    separatorMargin,
    labelColor,
    labelFontSize,
    labelFontWeight,
    labelPaddingTop,
    labelPaddingBottom,
    onItemPress,
}: RowRendererProps<TItem>) {
    if (row.type === 'separator') {
        return (
            <DropdownSeparator
                color={separatorColor}
                height={separatorHeight}
                margin={separatorMargin}
            />
        )
    }

    if (row.type === 'label') {
        return (
            <View
                style={{
                    paddingTop: labelPaddingTop as number | undefined,
                    paddingBottom: labelPaddingBottom as number | undefined,
                }}
            >
                <Text
                    fontSize={labelFontSize}
                    fontWeight={labelFontWeight}
                    color={labelColor}
                >
                    {row.label}
                </Text>
            </View>
        )
    }

    if (!row.item) return null

    return (
        <DropdownItem
            adapter={row.item}
            tokens={itemTokens}
            onPress={onItemPress as (item: unknown) => void}
        />
    )
}

export const DropdownList = memo(
    DropdownListImpl
) as unknown as typeof DropdownListImpl
;(DropdownList as { displayName?: string }).displayName = 'DropdownList'
