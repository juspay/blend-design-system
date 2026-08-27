import { forwardRef, useState } from 'react'
import { Pressable as RNPressable } from 'react-native'
import type {
    TextInputProps as RNTextInputProps,
    View as RNView,
} from 'react-native'
import { X } from 'lucide-react-native'
import { InputSizeV2 } from '@juspay/blend-design-system/node'
import type { SearchInputV2TokensType } from '@juspay/blend-design-system/node'
import { useNativeTokens } from '../../theme/useNativeTokens'
import { useControllableState } from '../../hooks/useControllableState'
import Block from '../../primitives/Block'
import PrimitiveInput from '../../primitives/PrimitiveInput'
import Slot from '../../primitives/Slot'
import { parseBorder, parseDimension } from '../../adapters/cssStringAdapter'
import type { SearchInputNativeProps } from './searchInput.types'

/**
 * Search field — the native port of web's `SearchInputV2`.
 *
 * Bottom-border-only chrome that re-resolves per state, slots either side,
 * and an automatic clear button (lucide X) once there is text — hidden when
 * `rightSlot` occupies that spot, exactly web's rule. `returnKeyType`
 * defaults to `search`.
 */
const SearchInput = forwardRef<RNView, SearchInputNativeProps>(
    function SearchInput(
        {
            value,
            defaultValue,
            onChangeText,
            error = false,
            allowClear = true,
            onClear,
            clearIcon,
            disabled = false,
            leftSlot,
            rightSlot,
            testID,
            accessibilityLabel,
            style,
            inputRef,
            onFocus,
            onBlur,
            ...rest
        },
        ref
    ) {
        const tokens =
            useNativeTokens<SearchInputV2TokensType>('SEARCH_INPUT_V2')
        const [focused, setFocused] = useState(false)
        const [currentValue, setCurrentValue] = useControllableState<string>(
            value,
            defaultValue ?? '',
            onChangeText
        )

        const state = disabled
            ? 'disabled'
            : error
              ? 'error'
              : focused
                ? 'focus'
                : 'default'
        const container = tokens.inputContainer
        // Web hardcodes SM for every padding lookup — no size prop.
        const size = InputSizeV2.SM

        // Web's `shouldShowSearchInputV2Clear`.
        const showClear =
            allowClear && currentValue.length > 0 && !disabled && !rightSlot

        const handleClear = () => {
            setCurrentValue('')
            onClear?.()
        }

        const handleFocus: NonNullable<RNTextInputProps['onFocus']> = (e) => {
            setFocused(true)
            onFocus?.(e)
        }
        const handleBlur: NonNullable<RNTextInputProps['onBlur']> = (e) => {
            setFocused(false)
            onBlur?.(e)
        }

        const iconSize =
            parseDimension(tokens.icon.width as string | number) ?? 16
        const bottomBorder = parseBorder(String(container.borderBottom[state]))

        return (
            <Block
                ref={ref}
                flexDirection="row"
                alignItems="center"
                gap={8}
                paddingTop={container.paddingTop[size] as string | number}
                paddingBottom={container.paddingBottom[size] as string | number}
                paddingLeft={container.paddingLeft[size] as string | number}
                paddingRight={container.paddingRight[size] as string | number}
                style={[
                    {
                        borderBottomWidth: bottomBorder.borderWidth,
                        borderBottomColor: bottomBorder.borderColor,
                    },
                    style,
                ]}
                testID={testID}
            >
                {leftSlot && (
                    <Slot
                        hidden
                        color={String(tokens.icon.color[state])}
                        maxHeight={iconSize}
                    >
                        {leftSlot}
                    </Slot>
                )}
                <PrimitiveInput
                    ref={inputRef}
                    value={currentValue}
                    onChangeText={setCurrentValue}
                    placeholderColor={String(
                        container.placeholderColor[state] ?? undefined
                    )}
                    fontSize={container.fontSize as string | number}
                    fontWeight={container.fontWeight as string | number}
                    color={String(container.color[state] ?? '#000000')}
                    editable={!disabled}
                    returnKeyType="search"
                    accessibilityLabel={accessibilityLabel ?? 'Search'}
                    accessibilityState={{ disabled }}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    testID={testID ? `${testID}-input` : undefined}
                    {...rest}
                />
                {showClear && (
                    <RNPressable
                        onPress={handleClear}
                        accessibilityRole="button"
                        accessibilityLabel="Clear search"
                        hitSlop={8}
                        testID={testID ? `${testID}-clear` : undefined}
                    >
                        {clearIcon ?? (
                            <X
                                size={iconSize}
                                color={String(tokens.icon.color[state])}
                            />
                        )}
                    </RNPressable>
                )}
                {rightSlot && (
                    <Slot
                        hidden
                        color={String(tokens.icon.color[state])}
                        maxHeight={iconSize}
                    >
                        {rightSlot}
                    </Slot>
                )}
            </Block>
        )
    }
)

SearchInput.displayName = 'SearchInput'

export default SearchInput
