import { useState } from 'react'
import { Modal, Pressable, ScrollView, StyleSheet, Text } from 'react-native'
import { Check, ChevronDown } from 'lucide-react-native'
import { useChrome } from '../chrome'
import type { Option } from '../types'

/**
 * Value picker for controls with more options than fit inline. Built on RN's
 * own `Modal` rather than Blend's `BottomSheet` — see `chrome.ts` for why
 * the harness does not consume the library it inspects.
 */
export default function SelectControl({
    label,
    options,
    value,
    onChange,
}: {
    label: string
    options: readonly Option<unknown>[]
    value: unknown
    onChange: (value: unknown) => void
}) {
    const chrome = useChrome()
    const [open, setOpen] = useState(false)
    const current = options.find((option) => Object.is(option.value, value))

    return (
        <>
            <Pressable
                onPress={() => setOpen(true)}
                accessibilityRole="button"
                accessibilityLabel={`${label}: ${current?.label ?? 'none'}`}
                accessibilityHint="Opens the value list"
                style={[
                    styles.trigger,
                    {
                        backgroundColor: chrome.surfaceAlt,
                        borderColor: chrome.border,
                    },
                ]}
            >
                <Text style={[styles.triggerLabel, { color: chrome.fg }]}>
                    {current?.label ?? '—'}
                </Text>
                <ChevronDown size={16} color={chrome.fgMuted} />
            </Pressable>

            <Modal
                visible={open}
                transparent
                animationType="fade"
                onRequestClose={() => setOpen(false)}
            >
                <Pressable
                    style={[styles.scrim, { backgroundColor: chrome.scrim }]}
                    onPress={() => setOpen(false)}
                    accessibilityRole="button"
                    accessibilityLabel="Close the value list"
                >
                    {/* Swallows presses so a tap on the sheet itself does not
                        fall through to the scrim's dismiss handler. */}
                    <Pressable
                        style={[
                            styles.sheet,
                            {
                                backgroundColor: chrome.bg,
                                borderColor: chrome.border,
                            },
                        ]}
                        onPress={() => {}}
                    >
                        <Text style={[styles.title, { color: chrome.fgMuted }]}>
                            {label}
                        </Text>
                        <ScrollView>
                            {options.map((option) => {
                                const selected = Object.is(option.value, value)
                                return (
                                    <Pressable
                                        key={option.label}
                                        accessibilityRole="menuitem"
                                        accessibilityState={{ selected }}
                                        onPress={() => {
                                            onChange(option.value)
                                            setOpen(false)
                                        }}
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
                                        {selected ? (
                                            <Check
                                                size={16}
                                                color={chrome.accent}
                                            />
                                        ) : null}
                                    </Pressable>
                                )
                            })}
                        </ScrollView>
                    </Pressable>
                </Pressable>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    trigger: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
        minHeight: 40,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        borderWidth: 1,
    },
    triggerLabel: { fontSize: 13, fontWeight: '500', flexShrink: 1 },
    scrim: { flex: 1, justifyContent: 'flex-end' },
    sheet: {
        maxHeight: '70%',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderWidth: StyleSheet.hairlineWidth,
        paddingTop: 12,
        paddingBottom: 28,
        paddingHorizontal: 8,
    },
    title: {
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 0.6,
        textTransform: 'uppercase',
        paddingHorizontal: 12,
        paddingBottom: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 44,
        paddingHorizontal: 12,
    },
    rowLabel: { fontSize: 15, flexShrink: 1 },
})
