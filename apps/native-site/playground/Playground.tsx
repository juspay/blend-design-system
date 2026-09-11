import { useCallback, useMemo, useState } from 'react'
import {
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import Animated from 'react-native-reanimated'
import { Accordion, AccordionItem, AccordionType } from 'blend-native'
import { RotateCcw } from 'lucide-react-native'
import { MONO_FONT, useChrome } from './chrome'
import ControlPanel from './controls/ControlPanel'
import { buildSnippet } from './snippet'
import type { AnySpec } from './types'
import type { ScrollHandler } from './scroll'

/**
 * One component, one instance, and the controls to reshape it.
 *
 * The stage sits **outside** the ScrollView: the point of the preview is to
 * watch a component change as you change its props, which it cannot do if
 * reaching the controls pushes it off screen. Only the panel scrolls, and
 * the app bar collapses on the way to pay for the height.
 *
 * State is keyed on the spec by the caller (`<Playground key={spec.name} />`),
 * so switching component resets the props without an effect.
 */
export default function Playground({
    spec,
    onScroll,
}: {
    spec: AnySpec
    onScroll?: ScrollHandler
}) {
    const chrome = useChrome()
    const [props, setProps] = useState(spec.defaults)
    const [open, setOpen] = useState(false)

    const onChange = useCallback((key: string, value: unknown) => {
        setProps((current) => ({ ...current, [key]: value }))
    }, [])

    // Both key sets, not just the defaults': a prop the spec has no default
    // for (`loading`, `width`, a slot) is absent from `defaults`, and
    // checking only those keys would leave Reset disabled after changing it
    // — with no other way to undo.
    const dirty = useMemo(() => {
        const current = props as Record<string, unknown>
        const initial = spec.defaults as Record<string, unknown>
        const keys = new Set([...Object.keys(initial), ...Object.keys(current)])
        return [...keys].some((key) => !Object.is(current[key], initial[key]))
    }, [props, spec.defaults])

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
        <View style={[styles.root, { backgroundColor: chrome.bg }]}>
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

            <Animated.ScrollView
                onScroll={onScroll}
                scrollEventThrottle={16}
                contentContainerStyle={styles.scroll}
                keyboardShouldPersistTaps="handled"
            >
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
                            style={[
                                styles.resetLabel,
                                { color: chrome.fgMuted },
                            ]}
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

                {/* Blend's own Accordion, so the harness exercises it too. */}
                <Accordion accordionType={AccordionType.BORDER}>
                    <AccordionItem value="jsx" title="JSX">
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
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
                    </AccordionItem>
                </Accordion>
            </Animated.ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    root: { flex: 1 },
    scroll: { padding: 16, paddingTop: 0, gap: 20, paddingBottom: 40 },
    stage: {
        // Pinned, so it keeps a floor but never grows to crowd the controls.
        minHeight: 150,
        margin: 16,
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
        paddingTop: 16,
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
    codeBody: { paddingHorizontal: 12, paddingVertical: 10, borderRadius: 8 },
    code: {
        fontFamily: Platform.select(MONO_FONT),
        fontSize: 12,
        lineHeight: 18,
    },
})
