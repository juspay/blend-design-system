import { InputSize, TextInput } from 'blend-native'
import type { TextInputNativeProps } from 'blend-native'
import InputShowcase from '../../components/InputShowcase'
import { SEARCH_SLOT } from './slots'
import { enumOptions } from '../types'
import type { ComponentSpec } from '../types'

const ERROR = { show: true, message: 'Enter a valid merchant reference' }

const spec: ComponentSpec<TextInputNativeProps> = {
    name: 'TextInput',
    summary:
        'Label, field and footer in one column. Uncontrolled out of the box (`defaultValue`), controlled when `value` is passed. The floating-label mode and the embedded dropdown are web-only for now — both are omitted from the type rather than accepted and ignored.',
    mode: 'inline',
    gallery: InputShowcase,
    defaults: {
        label: 'Merchant reference',
        placeholder: 'ord_9f2c41ab77e3',
        size: InputSize.MD,
    },
    controls: [
        {
            kind: 'select',
            key: 'size',
            label: 'Size',
            options: enumOptions(InputSize, 'InputSize'),
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
        {
            kind: 'toggle',
            key: 'leftSlot',
            label: 'Left slot',
            group: 'Content',
            on: SEARCH_SLOT,
            off: undefined,
            onCode: '{ slot: <Search size={16} /> }',
        },
        {
            kind: 'toggle',
            key: 'required',
            label: 'Required',
            group: 'State',
        },
        {
            kind: 'toggle',
            key: 'disabled',
            label: 'Disabled',
            group: 'State',
        },
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
    render: (props) => <TextInput {...props} style={{ width: 260 }} />,
}

export default spec
