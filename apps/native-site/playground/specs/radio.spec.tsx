import { useState } from 'react'
import { View } from 'react-native'
import { Radio, SelectorSize } from 'blend-native'
import type { RadioNativeProps } from 'blend-native'
import { addProps, indent, replaceProp } from '../snippet'
import { enumOptions } from '../types'
import type { ComponentSpec } from '../types'

/**
 * There is no RadioGroup on either platform — the caller owns selection,
 * one Radio per option. The preview renders a pair sharing local state so
 * selecting actually moves.
 */
function LiveRadioPair(props: RadioNativeProps) {
    const [selected, setSelected] = useState<'a' | 'b'>('a')

    return (
        <View style={{ gap: 12 }}>
            <Radio
                {...props}
                checked={selected === 'a'}
                onCheckedChange={() => setSelected('a')}
            />
            <Radio
                {...props}
                label="Weekly digest"
                subLabel={undefined}
                checked={selected === 'b'}
                onCheckedChange={() => setSelected('b')}
            />
        </View>
    )
}

const spec: ComponentSpec<RadioNativeProps> = {
    name: 'Radio',
    summary:
        'Selection is caller-owned (no RadioGroup on web either): one Radio per option, checked driven from your state. Pressing a selected radio is a no-op.',
    mode: 'inline',
    defaults: {
        label: 'Instant notifications',
        size: SelectorSize.MD,
    },
    controls: [
        {
            kind: 'select',
            key: 'size',
            label: 'Size',
            options: enumOptions(SelectorSize, 'SelectorSize'),
        },
        {
            kind: 'text',
            key: 'label',
            label: 'Label',
            group: 'Content',
            always: true,
        },
        {
            kind: 'text',
            key: 'subLabel',
            label: 'Sub label',
            group: 'Content',
            placeholder: 'optional',
        },
        { kind: 'toggle', key: 'required', label: 'Required', group: 'State' },
        { kind: 'toggle', key: 'error', label: 'Error', group: 'State' },
        { kind: 'toggle', key: 'disabled', label: 'Disabled', group: 'State' },
    ],
    render: (props) => <LiveRadioPair {...props} />,
    wrapSnippet: (inner) => {
        const first = addProps(inner, [
            "checked={selected === 'a'}",
            "onCheckedChange={() => setSelected('a')}",
        ])
        const second = addProps(
            replaceProp(inner, 'label', '"Weekly digest"'),
            [
                "checked={selected === 'b'}",
                "onCheckedChange={() => setSelected('b')}",
            ]
        )
        return `<View style={{ gap: 12 }}>\n${indent(first)}\n${indent(second)}\n</View>`
    },
}

export default spec
