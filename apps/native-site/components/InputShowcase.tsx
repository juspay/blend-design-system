import { useState } from 'react'
import { StyleSheet, Text as RNText, View } from 'react-native'
import { Search, Eye } from 'lucide-react-native'
import { InputSize, TextInput } from 'blend-native'

/**
 * TextInput verification. On device, check:
 *
 * - the border re-resolves on focus (blue) and error (red, wins over focus)
 * - placeholder colour differs from the value colour
 * - the keyboard does not clip descenders at any size
 * - OS font scaling grows the field instead of clipping (package policy)
 */
export default function InputShowcase() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('not-an-email')
    const [password, setPassword] = useState('')

    return (
        <View style={styles.column}>
            <RNText style={styles.heading}>Sizes</RNText>
            {[InputSize.SM, InputSize.MD, InputSize.LG].map((size) => (
                <TextInput
                    key={size}
                    size={size}
                    label={`Name (${size})`}
                    subLabel="as on ID"
                    hintText="Shown on your profile"
                    placeholder="Jane Doe"
                    value={name}
                    onChangeText={setName}
                    required
                />
            ))}

            <RNText style={styles.heading}>States</RNText>
            <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                error={{ show: true, message: 'Enter a valid email address' }}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                label="Disabled"
                value="read only"
                disabled
                hintText="Cannot be edited"
            />

            <RNText style={styles.heading}>Slots</RNText>
            <TextInput
                label="Search"
                placeholder="Search components"
                value={name}
                onChangeText={setName}
                leftSlot={{ slot: <Search size={16} color="#717784" /> }}
            />
            <TextInput
                label="Password"
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                rightSlot={{ slot: <Eye size={16} color="#717784" /> }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    column: { gap: 14 },
    heading: {
        fontSize: 15,
        fontWeight: '600',
        color: '#717784',
        marginTop: 8,
    },
})
