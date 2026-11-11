import { memo, useCallback } from 'react'
import { View } from 'react-native'
import {
    SelectorV2Size,
    type MultiSelectV2TokensType,
} from '@juspay/blend-design-system/node'
import { Checkbox } from '../Checkbox'
import { Pressable } from '../../primitives/Pressable'
import { Text } from '../../primitives/Text'
import { Block } from '../../primitives/Block'
import { DropdownSearch } from '../shared/dropdown/DropdownSearch'
import { parseBorder } from '../../adapters/cssStringAdapter'
import type { ViewStyle } from 'react-native'

/** Translate a web `borderBottom` shorthand into a bottom-only RN border. */
function parseBottomBorder(
    value: string | number | undefined
): Partial<Pick<ViewStyle, 'borderBottomWidth' | 'borderBottomColor'>> {
    if (value === undefined) return {}
    const parsed = parseBorder(String(value))
    const out: Partial<
        Pick<ViewStyle, 'borderBottomWidth' | 'borderBottomColor'>
    > = {}
    if (parsed.borderWidth !== undefined)
        out.borderBottomWidth = parsed.borderWidth
    if (parsed.borderColor !== undefined)
        out.borderBottomColor = parsed.borderColor
    return out
}

/**
 * Header row for the MultiSelect dropdown: optional search input + optional
 * select-all checkbox row. The parent only mounts this header when at
 * least one of the two is enabled, but each row is gated independently so
 * search alone doesn't imply select-all (and vice versa).
 */
export type MultiSelectMenuHeaderProps = {
    allSelected: boolean
    someSelected: boolean
    selectAllText: string
    onSelectAllToggle: () => void
    enableSelectAll: boolean
    tokens: MultiSelectV2TokensType
    searchValue: string
    onSearchChange: (text: string) => void
    searchPlaceholder?: string
    enableSearch: boolean
    testID?: string
}

function MultiSelectMenuHeaderImpl({
    allSelected,
    someSelected,
    selectAllText,
    onSelectAllToggle,
    enableSelectAll,
    tokens,
    searchValue,
    onSearchChange,
    searchPlaceholder = 'Search...',
    enableSearch,
    testID,
}: MultiSelectMenuHeaderProps) {
    const headerTokens = tokens.menu.header
    const selectAllTokens = tokens.menu.selectAll

    const handlePress = useCallback(() => {
        onSelectAllToggle()
    }, [onSelectAllToggle])

    const labelTokens = tokens.menu.item.optionsLabel
    const checkboxState = allSelected
        ? true
        : someSelected
          ? 'indeterminate'
          : false

    // As web's MultiSelectV2MenuHeader: the search first, then the select-all
    // row (upper-case label, checkbox at the end) with the header's border
    // under it.
    return (
        <Block width="100%" background={String(headerTokens.backgroundColor)}>
            {enableSearch ? (
                <Block
                    paddingTop={8}
                    paddingRight={headerTokens.selectAllRowPaddingRight ?? 8}
                    paddingBottom={4}
                    paddingLeft={headerTokens.selectAllRowPaddingLeft ?? 8}
                >
                    <DropdownSearch
                        value={searchValue}
                        onChange={onSearchChange}
                        placeholder={searchPlaceholder}
                        testID={testID ? `${testID}-search` : undefined}
                    />
                </Block>
            ) : null}

            {enableSelectAll ? (
                <Block
                    paddingLeft={headerTokens.selectAllRowPaddingLeft}
                    paddingRight={headerTokens.selectAllRowPaddingRight}
                    style={parseBottomBorder(headerTokens.borderBottom)}
                >
                    <Pressable
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="space-between"
                        gap={8}
                        width="100%"
                        paddingTop={selectAllTokens.paddingTop}
                        paddingRight={selectAllTokens.paddingRight}
                        paddingBottom={selectAllTokens.paddingBottom}
                        paddingLeft={selectAllTokens.paddingLeft}
                        borderRadius={selectAllTokens.borderRadius}
                        onPress={handlePress}
                        accessibilityRole="checkbox"
                        accessibilityState={{
                            checked: allSelected
                                ? true
                                : someSelected
                                  ? 'mixed'
                                  : false,
                        }}
                        accessibilityLabel={selectAllText}
                        testID={testID ? `${testID}-select-all` : undefined}
                    >
                        <Text
                            fontSize={labelTokens.fontSize}
                            fontWeight={labelTokens.fontWeight}
                            color={String(
                                allSelected
                                    ? labelTokens.color.selected
                                    : labelTokens.color.default
                            )}
                            numberOfLines={1}
                            style={{
                                textTransform: 'uppercase',
                                flexShrink: 1,
                            }}
                        >
                            {selectAllText}
                        </Text>
                        <View pointerEvents="none">
                            <Checkbox
                                checked={checkboxState}
                                size={SelectorV2Size.SM}
                                accessibilityLabel={selectAllText}
                            />
                        </View>
                    </Pressable>
                </Block>
            ) : null}
        </Block>
    )
}

export const MultiSelectMenuHeader = memo(MultiSelectMenuHeaderImpl)
MultiSelectMenuHeader.displayName = 'MultiSelectMenuHeader'
