import { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { BottomSheet } from 'blend-native'
import { Check, ChevronDown } from 'lucide-react-native'
import { useChrome } from '../chrome'
import type { Option } from '../types'

/**
 * Value picker for every non-boolean, non-text prop, presented in Blend's own
 * `BottomSheet`.
 *
 * This is the one place the harness consumes the library it inspects, which
 * is a deliberate exception to the rule in `chrome.ts`: if `BottomSheet`
 * regresses, these pickers go with it. The rows inside are still plain React
 * Native, so a broken sheet is the only failure mode — not a cascade.
 */
export default function SelectControl({
    label,
    options,
    value,
    onChange,
    multiple = false,
}: {
    label: string
    options: readonly Option<unknown>[]
    /** The selected value, or the selected values when `multiple`. */
    value: unknown
    onChange: (value: unknown) => void
    multiple?: boolean
}) {
    const chrome = useChrome()
    const [open, setOpen] = useState(false)

    const selected = multiple && Array.isArray(value) ? value : [value]
    const isSelected = (option: Option<unknown>) =>
        selected.some((entry) => Object.is(entry, option.value))

    const summary = multiple
        ? options
              .filter(isSelected)
              .map((option) => option.label)
              .join(', ')
        : options.find(isSelected)?.label

    const choose = (option: Option<unknown>) => {
        if (!multiple) {
            onChange(option.value)
            setOpen(false)
            return
        }
        // Toggle membership; the sheet stays open so several can be picked.
        const next = isSelected(option)
            ? selected.filter((entry) => !Object.is(entry, option.value))
            : [...selected, option.value]
        onChange(next)
    }

    return (
        <>
            <Pressable
                onPress={() => setOpen(true)}
                accessibilityRole="button"
                accessibilityLabel={`${label}: ${summary || 'none'}`}
                accessibilityHint="Opens the value list"
                android_ripple={{ color: chrome.border }}
                style={[
                    styles.trigger,
                    {
                        backgroundColor: chrome.surfaceAlt,
                        borderColor: chrome.border,
                    },
                ]}
            >
                <Text
                    numberOfLines={1}
                    style={[styles.triggerLabel, { color: chrome.fg }]}
                >
                    {summary || '—'}
                </Text>
                <ChevronDown size={16} color={chrome.fgMuted} />
            </Pressable>

            <BottomSheet
                open={open}
                onClose={() => setOpen(false)}
                accessibilityLabel={label}
                backgroundColor={chrome.bg}
                maxHeightFraction={0.6}
            >
                <View style={styles.sheet}>
                    <Text style={[styles.title, { color: chrome.fgMuted }]}>
                        {label}
                    </Text>
                    <ScrollView>
                        {options.map((option) => {
                            const on = isSelected(option)
                            return (
                                <Pressable
                                    key={option.label}
                                    accessibilityRole={
                                        multiple ? 'checkbox' : 'menuitem'
                                    }
                                    accessibilityState={{
                                        selected: on,
                                        checked: multiple ? on : undefined,
                                    }}
                                    android_ripple={{
                                        color: chrome.surfaceAlt,
                                    }}
                                    onPress={() => choose(option)}
                                    style={styles.row}
                                >
                                    <Text
                                        style={[
                                            styles.rowLabel,
                                            { color: chrome.fg },
                                        ]}
                                    >
                                        {option.label}
                                    </Text>
                                    {on ? (
                                        <Check
                                            size={17}
                                            color={chrome.accent}
                                        />
                                    ) : null}
                                </Pressable>
                            )
                        })}
                    </ScrollView>
                </View>
            </BottomSheet>
        </>
    )
}

const styles = StyleSheet.create({
    trigger: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
        minHeight: 44,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 8,
        borderWidth: 1,
        overflow: 'hidden',
    },
    triggerLabel: { fontSize: 14, fontWeight: '500', flexShrink: 1 },
    sheet: { paddingHorizontal: 8, paddingBottom: 12 },
    title: {
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 0.6,
        textTransform: 'uppercase',
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 48,
        paddingHorizontal: 12,
        borderRadius: 8,
        overflow: 'hidden',
    },
    rowLabel: { fontSize: 15, flexShrink: 1 },
})
