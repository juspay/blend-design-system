import { StyleSheet, Text, View } from 'react-native'
import { BottomSheet } from 'blend-native'
import type { BottomSheetProps } from 'blend-native'
import { addProps, indent } from '../snippet'
import { numberOptions } from '../types'
import type { ComponentSpec } from '../types'

/**
 * `open` and `onClose` come from the harness rather than from controls — the
 * stage owns visibility for overlay specs — so they are dropped from the
 * spec's prop type and supplied in `render`.
 */
type SheetPlaygroundProps = Omit<BottomSheetProps, 'open' | 'onClose'> & {
    /** Playground-only: how much content to put in, to exercise the cap. */
    paragraphs: number
}

const BODY =
    'Dragging past the halfway point dismisses the sheet when dragToDismiss is on. The sheet never grows past maxHeightFraction of the screen, and scrolls inside that instead.'

const spec: ComponentSpec<SheetPlaygroundProps> = {
    name: 'BottomSheet',
    summary:
        'The gesture-driven sheet the phone modes of Select, Menu and Modal are built on. Also public, for consumer-built sheets.',
    mode: 'overlay',
    triggerLabel: 'Open the sheet',
    defaults: {
        paragraphs: 2,
        showHandle: true,
        dragToDismiss: true,
        dismissOnBackdropPress: true,
        maxHeightFraction: 0.6,
        topRadius: 16,
    },
    controls: [
        {
            kind: 'select',
            key: 'maxHeightFraction',
            label: 'Max height',
            options: [
                { label: '40%', value: 0.4, code: '0.4' },
                { label: '60%', value: 0.6, code: '0.6' },
                { label: '90%', value: 0.9, code: '0.9' },
            ],
        },
        {
            kind: 'select',
            key: 'topRadius',
            label: 'Top radius',
            options: numberOptions([0, 16, 28]),
        },
        {
            kind: 'select',
            key: 'paragraphs',
            label: 'Content length',
            hidden: true,
            options: numberOptions([1, 2, 6]),
        },
        { kind: 'toggle', key: 'showHandle', label: 'Handle', group: 'State' },
        {
            kind: 'toggle',
            key: 'dragToDismiss',
            label: 'Drag to dismiss',
            group: 'State',
        },
        {
            kind: 'toggle',
            key: 'dismissOnBackdropPress',
            label: 'Dismiss on backdrop press',
            group: 'State',
        },
    ],
    render: ({ paragraphs, ...props }, ctx) => (
        <BottomSheet
            {...props}
            open={ctx.open}
            onClose={() => ctx.setOpen(false)}
            accessibilityLabel="Playground sheet"
        >
            <View style={styles.body}>
                <Text style={styles.title}>Sheet</Text>
                {Array.from({ length: paragraphs }, (_, index) => (
                    <Text key={index} style={styles.paragraph}>
                        {BODY}
                    </Text>
                ))}
            </View>
        </BottomSheet>
    ),
    // `open`, `onClose` and the children come from the harness, not from a
    // control, and `open`/`onClose` are required — without them the block
    // would not compile if you pasted it.
    wrapSnippet: (inner) => {
        const withRequired = addProps(inner, [
            'open={open}',
            'onClose={() => setOpen(false)}',
        ])
        return `${withRequired.replace(/\n?\/>$/, '\n>')}\n${indent(
            '<SheetBody />'
        )}\n</BottomSheet>`
    },
}

const styles = StyleSheet.create({
    body: { padding: 20, gap: 12 },
    title: { fontSize: 17, fontWeight: '700' },
    paragraph: { fontSize: 14, lineHeight: 21 },
})

export default spec
