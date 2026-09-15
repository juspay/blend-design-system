import { StyleSheet, Switch, Text, View } from 'react-native'
import { useChrome } from '../chrome'

/**
 * Boolean control. Uses RN's `Switch`, which is the real platform control on
 * both targets — a UISwitch on iOS, a Material switch on Android.
 */
export default function ToggleControl({
    label,
    value,
    onChange,
}: {
    label: string
    value: boolean
    onChange: (value: boolean) => void
}) {
    const chrome = useChrome()

    return (
        <View style={styles.row}>
            <Text style={[styles.label, { color: chrome.fg }]}>{label}</Text>
            <Switch
                value={value}
                onValueChange={onChange}
                accessibilityLabel={label}
                trackColor={{ false: chrome.border, true: chrome.accent }}
                thumbColor={chrome.bg}
                ios_backgroundColor={chrome.border}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        minHeight: 36,
    },
    label: { fontSize: 13, fontWeight: '500', flexShrink: 1 },
})
