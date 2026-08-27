import { StyleSheet, Text, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { useChrome } from './chrome'
import type { ScrollHandler } from './scroll'
import type { AnySpec } from './types'

/**
 * The dense every-variant grid — the format the app had before the
 * playground, kept because it answers a different question. Controls answer
 * "what can this component do?"; a wall of every combination answers "is
 * anything broken?", which is how the Tag descender clipping and the Alert
 * wrapping bug were both caught.
 *
 * The showcase files are reused unchanged. Several specs share one, so a
 * component's gallery may show its neighbours too.
 */
export default function Gallery({
    spec,
    onScroll,
}: {
    spec: AnySpec
    onScroll?: ScrollHandler
}) {
    const chrome = useChrome()
    const Showcase = spec.gallery

    if (!Showcase) {
        return (
            <View style={[styles.empty, { backgroundColor: chrome.bg }]}>
                <Text style={[styles.emptyText, { color: chrome.fgMuted }]}>
                    {spec.name} has no gallery.
                </Text>
            </View>
        )
    }

    return (
        <Animated.ScrollView
            onScroll={onScroll}
            scrollEventThrottle={16}
            style={{ backgroundColor: chrome.bg }}
            contentContainerStyle={styles.scroll}
        >
            <Showcase />
        </Animated.ScrollView>
    )
}

const styles = StyleSheet.create({
    scroll: { padding: 16, paddingBottom: 40, gap: 8 },
    empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    emptyText: { fontSize: 13 },
})
