import { useState } from 'react'
import { StyleSheet, Text as RNText, View } from 'react-native'
import {
    BottomSheet,
    Button,
    ButtonType,
    Tag,
    TagColor,
    TagType,
} from '@juspay/blend-native'

/**
 * BottomSheet verification: open/dismiss via drag, backdrop, and the
 * Android back button. What to check on device (not react-native-web):
 *
 * - the sheet slides from the bottom edge with no flash-in-place
 * - drag follows the finger, springs back below the dismiss threshold
 * - a downward fling dismisses; an upward fling never does
 * - reduce-motion in OS settings turns the slide into a fade
 * - the home-indicator inset pads the content (with SafeAreaProvider)
 */
export default function SheetShowcase() {
    const [open, setOpen] = useState(false)
    const [tallOpen, setTallOpen] = useState(false)

    return (
        <View style={styles.column}>
            <Button
                buttonType={ButtonType.PRIMARY}
                text="Open sheet"
                onPress={() => setOpen(true)}
            />
            <Button
                buttonType={ButtonType.SECONDARY}
                text="Open tall sheet (height cap)"
                onPress={() => setTallOpen(true)}
            />

            <BottomSheet
                open={open}
                onClose={() => setOpen(false)}
                accessibilityLabel="Example sheet"
                testID="showcase-sheet"
            >
                <View style={styles.sheetBody}>
                    <RNText style={styles.title}>Bottom sheet</RNText>
                    <RNText style={styles.copy}>
                        Drag down to dismiss, tap the backdrop, or press the
                        Android back button.
                    </RNText>
                    <View style={styles.row}>
                        <Tag
                            text="Foundation"
                            type={TagType.SUBTLE}
                            color={TagColor.PRIMARY}
                        />
                        <Tag
                            text="Gesture-driven"
                            type={TagType.SUBTLE}
                            color={TagColor.SUCCESS}
                        />
                    </View>
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        text="Close"
                        onPress={() => setOpen(false)}
                    />
                </View>
            </BottomSheet>

            <BottomSheet
                open={tallOpen}
                onClose={() => setTallOpen(false)}
                accessibilityLabel="Tall sheet"
            >
                <View style={styles.sheetBody}>
                    <RNText style={styles.title}>Height cap</RNText>
                    {Array.from({ length: 30 }, (_, i) => (
                        <RNText key={i} style={styles.copy}>
                            Row {i + 1} — content beyond the 90% cap should
                            scroll inside your own ScrollView, not grow the
                            sheet.
                        </RNText>
                    ))}
                </View>
            </BottomSheet>
        </View>
    )
}

const styles = StyleSheet.create({
    column: { gap: 12 },
    sheetBody: { padding: 20, gap: 12 },
    row: { flexDirection: 'row', gap: 8 },
    title: { fontSize: 18, fontWeight: '700', color: '#1A1C23' },
    copy: { fontSize: 14, color: '#4A4F5A' },
})
