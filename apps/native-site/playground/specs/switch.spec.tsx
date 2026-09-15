import { useEffect, useState } from 'react'
import { Switch, SelectorSize } from 'blend-native'
import type { SwitchNativeProps } from 'blend-native'
import { addProps } from '../snippet'
import { enumOptions } from '../types'
import type { ComponentSpec } from '../types'

/** Controlled like web; the preview owns the value so the thumb slides. */
function LiveSwitch(props: SwitchNativeProps) {
    const [checked, setChecked] = useState(props.checked ?? false)
    useEffect(() => setChecked(props.checked ?? false), [props.checked])

    return <Switch {...props} checked={checked} onCheckedChange={setChecked} />
}

const spec: ComponentSpec<SwitchNativeProps> = {
    name: 'Switch',
    summary:
        'Track and thumb from the SWITCHV2 tokens — the travel is computed from them, not hardcoded like web. Slides on the motion layer, jumps under reduce-motion.',
    mode: 'inline',
    defaults: {
        label: 'Auto-settle payouts',
        checked: true,
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
    render: (props) => <LiveSwitch {...props} />,
    wrapSnippet: (inner) => addProps(inner, ['onCheckedChange={setChecked}']),
}

export default spec
