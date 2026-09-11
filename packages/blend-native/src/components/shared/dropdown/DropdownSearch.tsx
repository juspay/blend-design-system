import { useCallback } from 'react'
import { Search } from 'lucide-react-native'
import { TextInput } from 'react-native'
import { Block } from '../../../primitives/Block'

/**
 * Search input for the dropdown header. A bordered `TextInput` with a
 * leading search icon. Calls `onChange` on every keystroke; the parent
 * filters via `filterGroups` in `useMemo`.
 */
export type DropdownSearchProps = {
    value: string
    onChange: (text: string) => void
    placeholder?: string
    testID?: string
    accessibilityLabel?: string
}

export function DropdownSearch({
    value,
    onChange,
    placeholder = 'Search...',
    testID,
    accessibilityLabel = 'Search options',
}: DropdownSearchProps) {
    const handleChange = useCallback(
        (text: string) => {
            onChange(text)
        },
        [onChange]
    )

    return (
        <Block
            flexDirection="row"
            alignItems="center"
            gap={8}
            width="100%"
            testID={testID ? `${testID}-search` : undefined}
        >
            <Search size={16} color="#6B7280" />
            <TextInput
                value={value}
                onChangeText={handleChange}
                placeholder={placeholder}
                placeholderTextColor="#9CA3AF"
                accessibilityLabel={accessibilityLabel}
                testID={testID ? `${testID}-search-input` : undefined}
                style={{
                    flex: 1,
                    fontSize: 14,
                    color: '#111827',
                    paddingVertical: 4,
                }}
            />
        </Block>
    )
}

DropdownSearch.displayName = 'DropdownSearch'
