import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useChrome } from './chrome'
import type { SpecGroup } from './specs'

/**
 * Drawer contents: the component list, grouped.
 *
 * The selection is shared by both tabs, so picking a component in Preview
 * and switching to Gallery shows the same component rather than resetting —
 * which is the point of having the two modes side by side.
 */
export default function ComponentDrawer({
    groups,
    value,
    onChange,
}: {
    groups: readonly SpecGroup[]
    value: string
    onChange: (name: string) => void
}) {
    const chrome = useChrome()
    const insets = useSafeAreaInsets()

    return (
        <View style={[styles.root, { backgroundColor: chrome.bg }]}>
            <ScrollView
                contentContainerStyle={[
                    styles.scroll,
                    {
                        paddingTop: 16 + insets.top,
                        paddingBottom: 24 + insets.bottom,
                    },
                ]}
            >
                <Text style={[styles.brand, { color: chrome.fg }]}>
                    Blend Native
                </Text>
                {groups.map((group) => (
                    <View key={group.title} style={styles.group}>
                        <Text
                            style={[
                                styles.groupTitle,
                                { color: chrome.fgMuted },
                            ]}
                        >
                            {group.title}
                        </Text>
                        {group.specs.map((spec) => {
                            const selected = spec.name === value
                            return (
                                <Pressable
                                    key={spec.name}
                                    onPress={() => onChange(spec.name)}
                                    accessibilityRole="menuitem"
                                    accessibilityState={{ selected }}
                                    android_ripple={{
                                        color: chrome.surfaceAlt,
                                    }}
                                    style={[
                                        styles.item,
                                        selected
                                            ? {
                                                  backgroundColor:
                                                      chrome.surfaceAlt,
                                              }
                                            : null,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.itemLabel,
                                            {
                                                color: selected
                                                    ? chrome.accent
                                                    : chrome.fg,
                                                fontWeight: selected
                                                    ? '700'
                                                    : '500',
                                            },
                                        ]}
                                    >
                                        {spec.name}
                                    </Text>
                                </Pressable>
                            )
                        })}
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    root: { flex: 1 },
    scroll: { paddingHorizontal: 12, gap: 20 },
    brand: { fontSize: 18, fontWeight: '700', paddingHorizontal: 8 },
    group: { gap: 2 },
    groupTitle: {
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 0.6,
        textTransform: 'uppercase',
        paddingHorizontal: 8,
        paddingBottom: 6,
    },
    item: {
        minHeight: 44,
        justifyContent: 'center',
        paddingHorizontal: 12,
        borderRadius: 10,
        // Drawer rows are the primary navigation on a phone; keep them at the
        // platform minimum touch height even though the label is short.
        overflow: 'hidden',
    },
    itemLabel: { fontSize: 15 },
})
