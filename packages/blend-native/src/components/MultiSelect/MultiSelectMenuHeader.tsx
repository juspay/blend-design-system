import { memo, useCallback } from 'react'
import { Check, Minus } from 'lucide-react-native'
import { type MultiSelectV2TokensType } from '@juspay/blend-design-system/node'
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
 * Header row for the MultiSelect dropdown: optional select-all checkbox
 * row + optional search input. The parent only mounts this header when at
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

    return (
        <Block
            width="100%"
            background={String(headerTokens.backgroundColor)}
            style={{
                paddingTop: 8,
                ...parseBottomBorder(headerTokens.borderBottom),
            }}
        >
            {enableSelectAll ? (
                <Pressable
                    flexDirection="row"
                    alignItems="center"
                    gap={8}
                    width="100%"
                    paddingTop={selectAllTokens.paddingTop}
                    paddingRight={
                        headerTokens.selectAllRowPaddingRight ??
                        selectAllTokens.paddingRight
                    }
                    paddingBottom={selectAllTokens.paddingBottom}
                    paddingLeft={
                        headerTokens.selectAllRowPaddingLeft ??
                        selectAllTokens.paddingLeft
                    }
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
                    {/* Checkbox indicator */}
                    <Block
                        width={16}
                        height={16}
                        borderRadius={4}
                        background={
                            allSelected || someSelected
                                ? '#2563EB'
                                : 'transparent'
                        }
                        style={{
                            borderWidth: 2,
                            borderColor:
                                allSelected || someSelected
                                    ? '#2563EB'
                                    : '#D1D5DB',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {allSelected ? (
                            <Check size={12} color="#FFFFFF" />
                        ) : someSelected ? (
                            <Minus size={12} color="#FFFFFF" />
                        ) : null}
                    </Block>
                    <Text fontSize={14} fontWeight="500" color="#374151">
                        {selectAllText}
                    </Text>
                </Pressable>
            ) : null}

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
        </Block>
    )
}

export const MultiSelectMenuHeader = memo(MultiSelectMenuHeaderImpl)
MultiSelectMenuHeader.displayName = 'MultiSelectMenuHeader'
