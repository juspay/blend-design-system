import { useEffect, useState } from 'react'
import { InputSize, NumberInput, NumberInputDirection } from 'blend-native'
import type { NumberInputNativeProps } from 'blend-native'
import { addProps } from '../snippet'
import { enumOptions } from '../types'
import type { ComponentSpec } from '../types'

/**
 * `value` is controlled (`number | null`), so the preview holds it locally
 * to stay typeable; the snippet says a consumer holds it in their state.
 */
function LiveNumberInput(props: NumberInputNativeProps) {
    const [value, setValue] = useState<number | null>(props.value)
    useEffect(() => setValue(props.value), [props.value])

    return (
        <NumberInput
            {...props}
            value={value}
            onValueChange={setValue}
            style={{ width: 260 }}
        />
    )
}

const spec: ComponentSpec<NumberInputNativeProps> = {
    name: 'NumberInput',
    summary:
        'Numeric field that sanitizes typing and clamps on blur. Steppers render when there is no unit (web parity); announced as an adjustable with increment/decrement accessibility actions.',
    mode: 'inline',
    defaults: {
        value: 1250,
        label: 'Amount',
        min: 0,
        max: 100000,
        size: InputSize.MD,
        unitDirection: NumberInputDirection.RIGHT,
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
            key: 'unit',
            label: 'Unit',
            group: 'Content',
            placeholder: 'INR — replaces the steppers',
        },
        {
            kind: 'select',
            key: 'unitDirection',
            label: 'Unit side',
            options: enumOptions(NumberInputDirection, 'NumberInputDirection'),
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
    ],
    render: (props) => <LiveNumberInput {...props} />,
    // `value` is controlled and lives in the consumer's state.
    wrapSnippet: (inner) =>
        addProps(inner, ['value={value}', 'onValueChange={setValue}']),
}

export default spec
