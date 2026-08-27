import { StyleSheet, Text, View } from 'react-native'
import { Tooltip, TooltipAlign, TooltipSide, TooltipSize } from 'blend-native'
import type { TooltipNativeProps } from 'blend-native'
import { enumOptions } from '../types'
import type { ComponentSpec } from '../types'

const spec: ComponentSpec<TooltipNativeProps> = {
    name: 'Tooltip',
    summary:
        'Long-press the chip to show it (web opens on hover; there is no hover here). Tap anywhere to dismiss. Anchored at every size, with the arrow pointing at the trigger.',
    mode: 'inline',
    defaults: {
        children: null,
        content: 'Settled to your account today',
        side: TooltipSide.TOP,
        align: TooltipAlign.CENTER,
        size: TooltipSize.SM,
        showArrow: true,
    },
    controls: [
        {
            kind: 'select',
            key: 'side',
            label: 'Side',
            options: enumOptions(TooltipSide, 'TooltipSide'),
        },
        {
            kind: 'select',
            key: 'align',
            label: 'Align',
            options: enumOptions(TooltipAlign, 'TooltipAlign'),
        },
        {
            kind: 'select',
            key: 'size',
            label: 'Size',
            options: enumOptions(TooltipSize, 'TooltipSize'),
        },
        {
            kind: 'text',
            key: 'content',
            label: 'Content',
            group: 'Content',
            always: true,
        },
        { kind: 'toggle', key: 'showArrow', label: 'Arrow', group: 'State' },
    ],
    render: ({ children: _children, content, ...props }) => (
        <Tooltip {...props} content={content}>
            <View style={styles.chip}>
                <Text style={styles.chipText}>Long-press me</Text>
            </View>
        </Tooltip>
    ),
}

const styles = StyleSheet.create({
    chip: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: '#EFF6FF',
        borderWidth: 1,
        borderColor: '#B5CDFB',
    },
    chipText: { color: '#1D4ED8', fontWeight: '600' },
})

export default spec
