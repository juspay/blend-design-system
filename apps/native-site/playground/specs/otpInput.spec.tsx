import { OTPInput } from 'blend-native'
import type { OTPInputNativeProps } from 'blend-native'
import { numberOptions } from '../types'
import type { ComponentSpec } from '../types'

const spec: ComponentSpec<OTPInputNativeProps> = {
    name: 'OTPInput',
    summary:
        'One-time-code cells: paste or SMS autofill spreads across them, Backspace on an empty cell steps back, and the first cell carries the OS autofill hooks.',
    mode: 'inline',
    defaults: {
        label: 'Verification code',
        length: 6,
        hintText: 'Sent to +91 •• ••• 4821',
    },
    controls: [
        {
            kind: 'segmented',
            key: 'length',
            label: 'Length',
            options: numberOptions([4, 5, 6]),
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
            key: 'hintText',
            label: 'Hint',
            group: 'Content',
        },
        { kind: 'toggle', key: 'error', label: 'Error', group: 'State' },
        {
            kind: 'text',
            key: 'errorMessage',
            label: 'Error message',
            group: 'State',
            placeholder: 'Shown when error is on',
        },
        { kind: 'toggle', key: 'required', label: 'Required', group: 'State' },
        { kind: 'toggle', key: 'disabled', label: 'Disabled', group: 'State' },
    ],
    render: (props) => <OTPInput {...props} />,
}

export default spec
