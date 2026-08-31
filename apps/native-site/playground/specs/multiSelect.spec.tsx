import { useEffect, useState } from 'react'
import { MultiSelect, MultiSelectSelectionTagType } from 'blend-native'
import type { MultiSelectGroupType, MultiSelectNativeProps } from 'blend-native'
import { addProps } from '../snippet'
import { enumOptions } from '../types'
import type { ComponentSpec } from '../types'

const GROUPS: MultiSelectGroupType[] = [
    {
        groupLabel: 'Methods',
        items: [
            { label: 'UPI', value: 'upi' },
            { label: 'Cards', value: 'cards' },
            { label: 'Netbanking', value: 'netbanking' },
            { label: 'Wallets', value: 'wallets', disabled: true },
        ],
    },
]

/** `selectedValues` is controlled; the preview holds it locally. */
function LiveMultiSelect(props: MultiSelectNativeProps) {
    const [values, setValues] = useState(props.selectedValues)
    useEffect(() => setValues(props.selectedValues), [props.selectedValues])
    return (
        <MultiSelect
            {...props}
            selectedValues={values}
            onSelectionChange={setValues}
        />
    )
}

const spec: ComponentSpec<MultiSelectNativeProps> = {
    name: 'MultiSelect',
    summary:
        'Checkbox rows that keep the surface open on toggle, a COUNT/TEXT selection tag on the trigger, tri-state select-all, and one onSelectionChange per gesture.',
    mode: 'inline',
    defaults: {
        label: 'Payment methods',
        placeholder: 'Choose methods',
        items: GROUPS,
        selectedValues: [],
        selectionTagType: MultiSelectSelectionTagType.COUNT,
    },
    controls: [
        {
            kind: 'select',
            key: 'selectionTagType',
            label: 'Selection tag',
            options: enumOptions(
                MultiSelectSelectionTagType,
                'MultiSelectSelectionTagType'
            ),
        },
        {
            kind: 'text',
            key: 'label',
            label: 'Label',
            group: 'Content',
            always: true,
        },
        {
            kind: 'toggle',
            key: 'enableSelectAll',
            label: 'Select all',
            group: 'State',
        },
        {
            kind: 'toggle',
            key: 'showClearButton',
            label: 'Clear button',
            group: 'State',
        },
        {
            kind: 'toggle',
            key: 'search',
            label: 'Search',
            group: 'State',
            on: { show: true },
            off: undefined,
            onCode: '{ show: true }',
        },
        {
            kind: 'toggle',
            key: 'showActionButtons',
            label: 'Action bar',
            group: 'State',
        },
        {
            kind: 'toggle',
            key: 'primaryAction',
            label: 'Apply action',
            group: 'State',
            on: { text: 'Apply', onClick: () => {} },
            off: undefined,
            onCode: "{ text: 'Apply', onClick: apply }",
        },
    ],
    render: (props) => <LiveMultiSelect {...props} />,
    wrapSnippet: (inner) =>
        addProps(inner, [
            'selectedValues={values}',
            'onSelectionChange={setValues}',
        ]),
}

export default spec
