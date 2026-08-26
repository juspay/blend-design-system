import { StyleSheet, TextInput } from 'react-native'
import { useChrome } from '../chrome'

/** Free-text control, for headings, labels and body copy. */
export default function TextControl({
    label,
    value,
    placeholder,
    onChange,
}: {
    label: string
    value: string
    placeholder?: string
    onChange: (value: string) => void
}) {
    const chrome = useChrome()

    return (
        <TextInput
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            placeholderTextColor={chrome.fgMuted}
            accessibilityLabel={label}
            style={[
                styles.input,
                {
                    color: chrome.fg,
                    backgroundColor: chrome.surfaceAlt,
                    borderColor: chrome.border,
                },
            ]}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        minHeight: 40,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        borderWidth: 1,
        fontSize: 13,
    },
})
