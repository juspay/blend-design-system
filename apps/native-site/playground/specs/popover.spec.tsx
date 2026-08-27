import { StyleSheet, Text, View } from 'react-native'
import { Popover, PopoverSize } from 'blend-native'
import type { PopoverNativeProps } from 'blend-native'
import { enumOptions } from '../types'
import type { ComponentSpec } from '../types'

/**
 * `open`/`onOpenChange` come from the harness (the stage owns overlay
 * visibility); the popover's own trigger renders inside the stage.
 */
type PopoverPlaygroundProps = Omit<
    PopoverNativeProps,
    'trigger' | 'open' | 'onOpenChange'
>

const APPLY = { text: 'Apply' }
const CLEAR = { text: 'Clear' }

const spec: ComponentSpec<PopoverPlaygroundProps> = {
    name: 'Popover',
    summary:
        'On phones it presents as a bottom sheet (what web does with its mobile drawer); on tablets it anchors to the trigger. Header, body and actions come from POPOVERV2 tokens.',
    mode: 'overlay',
    triggerLabel: 'Open the popover',
    defaults: {
        heading: 'Filters',
        description: 'Narrow the settlement list',
        size: PopoverSize.MD,
        showCloseButton: true,
    },
    controls: [
        {
            kind: 'select',
            key: 'size',
            label: 'Size',
            options: enumOptions(PopoverSize, 'PopoverSize'),
        },
        {
            kind: 'text',
            key: 'heading',
            label: 'Heading',
            group: 'Content',
        },
        {
            kind: 'text',
            key: 'description',
            label: 'Description',
            group: 'Content',
        },
        {
            kind: 'toggle',
            key: 'showCloseButton',
            label: 'Close button',
            group: 'State',
        },
        {
            kind: 'toggle',
            key: 'primaryAction',
            label: 'Primary action',
            group: 'State',
            on: APPLY,
            off: undefined,
            onCode: "{ text: 'Apply' }",
        },
        {
            kind: 'toggle',
            key: 'secondaryAction',
            label: 'Secondary action',
            group: 'State',
            on: CLEAR,
            off: undefined,
            onCode: "{ text: 'Clear' }",
        },
    ],
    render: (props, ctx) => (
        <Popover
            {...props}
            trigger={
                <View style={styles.trigger}>
                    <Text style={styles.triggerText}>Open the popover</Text>
                </View>
            }
            open={ctx.open}
            onOpenChange={ctx.setOpen}
        >
            <Text style={styles.body}>
                Any content renders here — form controls, lists, summaries.
            </Text>
        </Popover>
    ),
}

const styles = StyleSheet.create({
    trigger: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: '#1D4ED8',
    },
    triggerText: { color: '#FFFFFF', fontWeight: '600' },
    body: { fontSize: 14, lineHeight: 20, color: '#374151' },
})

export default spec
