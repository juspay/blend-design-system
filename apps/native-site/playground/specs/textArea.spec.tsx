import { TextArea } from 'blend-native'
import type { TextAreaNativeProps } from 'blend-native'
import { numberOptions } from '../types'
import type { ComponentSpec } from '../types'

const ERROR = { show: true, message: 'Keep the note under 500 characters' }

const spec: ComponentSpec<TextAreaNativeProps> = {
    name: 'TextArea',
    summary:
        'Multiline field whose minimum height comes from `rows`. Uncontrolled out of the box; `resize` and the floating-label mode are web-only and omitted from the type.',
    mode: 'inline',
    defaults: {
        label: 'Dispute note',
        placeholder: 'Describe what the customer reported',
        rows: 3,
    },
    controls: [
        {
            kind: 'select',
            key: 'rows',
            label: 'Rows',
            options: numberOptions([2, 3, 5]),
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
        {
            kind: 'text',
            key: 'placeholder',
            label: 'Placeholder',
            group: 'Content',
        },
        {
            kind: 'text',
            key: 'hintText',
            label: 'Hint',
            group: 'Content',
            placeholder: 'Shown under the field',
        },
        { kind: 'toggle', key: 'required', label: 'Required', group: 'State' },
        { kind: 'toggle', key: 'disabled', label: 'Disabled', group: 'State' },
        {
            kind: 'toggle',
            key: 'error',
            label: 'Error',
            group: 'State',
            on: ERROR,
            off: undefined,
            onCode: "{ show: true, message: '...' }",
        },
    ],
    render: (props) => <TextArea {...props} style={{ width: 280 }} />,
}

export default spec
