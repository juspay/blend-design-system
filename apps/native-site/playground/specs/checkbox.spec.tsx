import { useEffect, useState } from 'react'
import { Checkbox, SelectorSize } from 'blend-native'
import type { CheckboxNativeProps } from 'blend-native'
import { addProps } from '../snippet'
import { enumOptions } from '../types'
import type { ComponentSpec } from '../types'

/**
 * `checked` is controlled, so the preview holds it locally to stay
 * toggleable; the select control still seeds it (incl. indeterminate).
 */
function LiveCheckbox(props: CheckboxNativeProps) {
    const [checked, setChecked] = useState(props.checked ?? false)
    useEffect(() => setChecked(props.checked ?? false), [props.checked])

    return (
        <Checkbox {...props} checked={checked} onCheckedChange={setChecked} />
    )
}

const spec: ComponentSpec<CheckboxNativeProps> = {
    name: 'Checkbox',
    summary:
        'Controlled selection with an indeterminate state announced as "mixed". The whole row is one pressable, so tapping the label toggles.',
    mode: 'inline',
    defaults: {
        label: 'Enable settlement alerts',
        checked: false,
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
            kind: 'select',
            key: 'checked',
            label: 'Checked',
            group: 'State',
            options: [
                { label: 'Unchecked', value: false },
                { label: 'Checked', value: true },
                {
                    label: 'Indeterminate',
                    value: 'indeterminate',
                    code: "'indeterminate'",
                },
            ],
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
    render: (props) => <LiveCheckbox {...props} />,
    wrapSnippet: (inner) => addProps(inner, ['onCheckedChange={setChecked}']),
}

export default spec
