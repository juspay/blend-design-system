import { useCallback, useState, type ReactNode } from 'react'
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import MobileFrame from './MobileFrame'

type Mode = 'mobile' | 'web'

const MODES: Mode[] = ['mobile', 'web']
const ZOOM_STEP = 0.1
const MIN_ZOOM = 0.3
const MAX_ZOOM = 2

export default function PlatformPreview({ children }: { children: ReactNode }) {
    const [mode, setMode] = useState<Mode>('mobile')
    const [fitZoom, setFitZoom] = useState(1)
    const [manualZoom, setManualZoom] = useState<number | null>(null)

    // Stable identity so MobileFrame's measurement effect doesn't tear down
    // and reattach its ResizeObserver on every unrelated re-render.
    const handleFitZoomChange = useCallback((value: number) => {
        setFitZoom(value)
    }, [])

    if (Platform.OS !== 'web') {
        return <>{children}</>
    }

    const zoom = manualZoom ?? fitZoom
    const zoomPercent = Math.round(zoom * 100)

    const selectMode = (value: Mode) => {
        setMode(value)
        setManualZoom(null)
    }

    return (
        <View style={styles.root}>
            {/* Stacked bottom-right, zoom control above the mode switch. */}
            <View style={styles.cornerStack}>
                {mode === 'mobile' ? (
                    <View style={styles.zoomControl}>
                        <Pressable
                            onPress={() =>
                                setManualZoom(
                                    Math.max(MIN_ZOOM, zoom - ZOOM_STEP)
                                )
                            }
                            style={styles.zoomButton}
                        >
                            <Text style={styles.zoomButtonLabel}>-</Text>
                        </Pressable>
                        <Text style={styles.zoomPercentLabel}>
                            {zoomPercent}%
                        </Text>
                        <Pressable
                            onPress={() =>
                                setManualZoom(
                                    Math.min(MAX_ZOOM, zoom + ZOOM_STEP)
                                )
                            }
                            style={styles.zoomButton}
                        >
                            <Text style={styles.zoomButtonLabel}>+</Text>
                        </Pressable>
                    </View>
                ) : null}

                <View style={styles.switcher}>
                    {MODES.map((value) => (
                        <Pressable
                            key={value}
                            onPress={() => selectMode(value)}
                            style={[
                                styles.switchOption,
                                mode === value && styles.switchOptionActive,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.switchLabel,
                                    mode === value && styles.switchLabelActive,
                                ]}
                            >
                                {value === 'mobile' ? 'Mobile' : 'Web'}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            </View>

            {mode === 'mobile' ? (
                <MobileFrame zoom={zoom} onFitZoomChange={handleFitZoomChange}>
                    {children}
                </MobileFrame>
            ) : (
                children
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        position: 'relative',
    },
    cornerStack: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        zIndex: 1000,
        alignItems: 'flex-end',
        gap: 8,
    },
    switcher: {
        flexDirection: 'row',
        gap: 4,
        padding: 4,
        borderRadius: 999,
        backgroundColor: 'rgba(0, 0, 0, 0.55)',
    },
    switchOption: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 999,
    },
    switchOptionActive: {
        backgroundColor: '#ffffff',
    },
    switchLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#ffffff',
    },
    switchLabelActive: {
        color: '#111214',
    },
    zoomControl: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 999,
        backgroundColor: 'rgba(0, 0, 0, 0.55)',
    },
    zoomButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
    },
    zoomButtonLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: '#ffffff',
    },
    zoomPercentLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#ffffff',
        minWidth: 34,
        textAlign: 'center',
    },
})
