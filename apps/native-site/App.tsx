import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text as RNText,
} from 'react-native'
import ButtonShowcase from './components/ButtonShowcase'

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <ScrollView contentContainerStyle={styles.scroll}>
                <RNText style={styles.header}>Blend Native — Button</RNText>
                <ButtonShowcase />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scroll: {
        padding: 16,
        gap: 8,
    },
    header: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 16,
        color: '#1A1C23',
    },
})
