import { useCallback, useMemo, useState } from 'react'
import {
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import { ChevronRight, RotateCcw } from 'lucide-react-native'
import { MONO_FONT, useChrome } from './chrome'
import ControlPanel from './controls/ControlPanel'
import { buildSnippet } from './snippet'
import type { AnySpec } from './types'

/**
 * One component, one instance, and the controls to reshape it.
 *
 * State is keyed on the spec by the caller (`<Playground key={spec.name} />`),
 * so switching component resets the props without an effect.
 */
export default function Playground({ spec }: { spec: AnySpec }) {
    const chrome = useChrome()
    const [props, setProps] = useState(spec.defaults)
    const [open, setOpen] = useState(false)
    const [showCode, setShowCode] = useState(false)

    const onChange = useCallback((key: string, value: unknown) => {
        setProps((current) => ({ ...current, [key]: value }))
    }, [])

    const dirty = useMemo(
        () =>
            Object.keys(spec.defaults).some(
                (key) =>
                    !Object.is(
                        (props as Record<string, unknown>)[key],
                        (spec.defaults as Record<string, unknown>)[key]
                    )
            ),
        [props, spec.defaults]
    )

    const snippet = useMemo(
        () =>
            buildSnippet(
                spec.name,
                props,
                spec.defaults,
                spec.controls,
                spec.wrapSnippet
            ),
        [props, spec]
    )

    return (
        <ScrollView
            style={{ backgroundColor: chrome.bg }}
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
        >
            <View
                style={[
                    styles.stage,
                    {
                        backgroundColor: chrome.stage,
                        borderColor: chrome.stageBorder,
                    },
                ]}
            >
                {spec.mode === 'overlay' ? (
                    <Pressable
                        onPress={() => setOpen(true)}
                        accessibilityRole="button"
                        style={[
                            styles.trigger,
                            { backgroundColor: chrome.accent },
                        ]}
                    >
                        <Text
                            style={[
                                styles.triggerLabel,
                                { color: chrome.accentFg },
                            ]}
                        >
                            {spec.triggerLabel ?? `Show ${spec.name}`}
                        </Text>
                    </Pressable>
                ) : null}

                {spec.render(props, { open, setOpen })}
            </View>

            <View style={styles.summaryRow}>
                <Text style={[styles.summary, { color: chrome.fgMuted }]}>
                    {spec.summary}
                </Text>
                <Pressable
                    onPress={() => setProps(spec.defaults)}
                    disabled={!dirty}
                    accessibilityRole="button"
                    accessibilityLabel="Reset to defaults"
                    accessibilityState={{ disabled: !dirty }}
                    style={[
                        styles.reset,
                        {
                            borderColor: chrome.border,
                            opacity: dirty ? 1 : 0.4,
                        },
                    ]}
                >
                    <RotateCcw size={13} color={chrome.fgMuted} />
                    <Text
                        style={[styles.resetLabel, { color: chrome.fgMuted }]}
                    >
                        Reset
                    </Text>
                </Pressable>
            </View>

            <ControlPanel
                controls={spec.controls}
                props={props}
                onChange={onChange}
            />

            <View style={[styles.codeCard, { borderColor: chrome.border }]}>
                <Pressable
                    onPress={() => setShowCode((value) => !value)}
                    accessibilityRole="button"
                    accessibilityState={{ expanded: showCode }}
                    style={styles.codeHeader}
                >
                    {/* The rotation goes on a wrapper View, not on the
                        icon: react-native-svg does not reliably apply a
                        transform passed through to the Svg element. */}
                    <View style={showCode ? styles.chevronOpen : undefined}>
                        <ChevronRight size={14} color={chrome.fgMuted} />
                    </View>
                    <Text style={[styles.codeTitle, { color: chrome.fgMuted }]}>
                        JSX
                    </Text>
                </Pressable>
                {showCode ? (
                    <ScrollView
                        horizontal
                        style={[
                            styles.codeBody,
                            { backgroundColor: chrome.codeBg },
                        ]}
                    >
                        <Text
                            selectable
                            style={[styles.code, { color: chrome.codeFg }]}
                        >
                            {snippet}
                        </Text>
                    </ScrollView>
                ) : null}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scroll: { padding: 16, gap: 20, paddingBottom: 40 },
    stage: {
        minHeight: 168,
        borderRadius: 12,
        // Dashed so a component's own bounds are readable against it —
        // `alignSelf` and width behaviour are invisible on a flush surface.
        // Android renders dashed corners as solid; the boundary still reads.
        borderWidth: 1,
        borderStyle: 'dashed',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
    },
    trigger: {
        paddingVertical: 11,
        paddingHorizontal: 18,
        borderRadius: 10,
        minHeight: 44,
        justifyContent: 'center',
    },
    triggerLabel: { fontSize: 14, fontWeight: '600' },
    summaryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
    },
    summary: { fontSize: 12, lineHeight: 17, flexShrink: 1 },
    reset: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 8,
        borderWidth: 1,
    },
    resetLabel: { fontSize: 12, fontWeight: '500' },
    codeCard: { borderRadius: 10, borderWidth: 1, overflow: 'hidden' },
    codeHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    chevronOpen: { transform: [{ rotate: '90deg' }] },
    codeTitle: {
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 0.6,
        textTransform: 'uppercase',
    },
    codeBody: { paddingHorizontal: 12, paddingVertical: 10 },
    code: {
        fontFamily: Platform.select(MONO_FONT),
        fontSize: 12,
        lineHeight: 18,
    },
})
