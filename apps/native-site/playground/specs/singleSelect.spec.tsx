import { useEffect, useState } from 'react'
import { SelectSize, SelectVariant, SingleSelect } from 'blend-native'
import type {
    SingleSelectGroupType,
    SingleSelectNativeProps,
} from 'blend-native'
import { addProps } from '../snippet'
import { enumOptions } from '../types'
import type { ComponentSpec } from '../types'

const GROUPS: SingleSelectGroupType[] = [
    {
        groupLabel: 'Frequency',
        items: [
            { label: 'Daily', value: 'daily' },
            { label: 'Weekly', value: 'weekly' },
            { label: 'Monthly', value: 'monthly', subLabel: 'On the 1st' },
        ],
    },
]

/** `selected` is controlled; the preview holds it locally to stay usable. */
function LiveSingleSelect(props: SingleSelectNativeProps) {
    const [selected, setSelected] = useState(props.selected)
    useEffect(() => setSelected(props.selected), [props.selected])
    return (
        <SingleSelect
            {...props}
            selected={selected}
            onSelect={setSelected}
            style={undefined}
        />
    )
}

const spec: ComponentSpec<SingleSelectNativeProps> = {
    name: 'SingleSelect',
    summary:
        'Field-shaped trigger opening a flat bottom panel on phones (web parity with usePanelOnMobile) and an anchored dropdown on tablets. Selection closes the surface.',
    mode: 'inline',
    defaults: {
        label: 'Payout frequency',
        placeholder: 'Choose one',
        items: GROUPS,
        selected: '',
        onSelect: () => {},
        size: SelectSize.MD,
        variant: SelectVariant.CONTAINER,
    },
    controls: [
        {
            kind: 'select',
            key: 'size',
            label: 'Size',
            options: enumOptions(SelectSize, 'SelectSize'),
        },
        {
            kind: 'select',
            key: 'variant',
            label: 'Variant',
            options: enumOptions(SelectVariant, 'SelectVariant'),
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
            key: 'hintText',
            label: 'Hint',
            group: 'Content',
        },
        { kind: 'toggle', key: 'required', label: 'Required', group: 'State' },
        { kind: 'toggle', key: 'disabled', label: 'Disabled', group: 'State' },
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
            key: 'error',
            label: 'Error',
            group: 'State',
            on: { show: true, message: 'Pick a frequency' },
            off: undefined,
            onCode: "{ show: true, message: '...' }",
        },
    ],
    render: (props) => <LiveSingleSelect {...props} />,
    wrapSnippet: (inner) =>
        addProps(inner, ['selected={selected}', 'onSelect={setSelected}']),
}

export default spec
