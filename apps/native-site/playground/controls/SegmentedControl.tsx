import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useChrome } from '../chrome'
import type { Option } from '../types'

/**
 * Inline option row, for controls with few enough values to read at a
 * glance. `ControlPanel` falls back to `SelectControl` past that point.
 */
export default function SegmentedControl({
    options,
    value,
    onChange,
}: {
    options: readonly Option<unknown>[]
    value: unknown
    onChange: (value: unknown) => void
}) {
    const chrome = useChrome()

    return (
        <View style={styles.row}>
            {options.map((option) => {
                const selected = Object.is(option.value, value)
                return (
                    <Pressable
                        key={option.label}
                        onPress={() => onChange(option.value)}
                        accessibilityRole="radio"
                        accessibilityState={{ selected }}
                        accessibilityLabel={option.label}
                        style={[
                            styles.item,
                            {
                                backgroundColor: selected
                                    ? chrome.accent
                                    : chrome.surfaceAlt,
                                borderColor: selected
                                    ? chrome.accent
                                    : chrome.border,
                            },
                        ]}
                    >
                        <Text
                            style={[
                                styles.label,
                                {
                                    color: selected
                                        ? chrome.accentFg
                                        : chrome.fg,
                                },
                            ]}
                        >
                            {option.label}
                        </Text>
                    </Pressable>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    row: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
    item: {
        paddingVertical: 7,
        paddingHorizontal: 12,
        borderRadius: 8,
        borderWidth: 1,
        // 44pt is the platform minimum for a touch target; these sit in a
        // dense panel, so the row keeps the height and the hit area grows
        // via padding rather than the label.
        minHeight: 34,
        justifyContent: 'center',
    },
    label: { fontSize: 13, fontWeight: '500' },
})
