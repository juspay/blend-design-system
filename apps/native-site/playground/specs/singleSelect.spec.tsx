import { useState } from 'react'
import { View } from 'react-native'
import { SingleSelect } from 'blend-native'
import type { SingleSelectV2GroupType } from 'blend-native'
import { SelectAlignment, SelectSize, SelectVariant } from 'blend-native'
import { enumOptions } from '../types'
import type { ComponentSpec } from '../types'

type SingleSelectPlaygroundProps = {
    size: SelectSize
    variant: SelectVariant
    alignment: SelectAlignment
    search: boolean
    disabled: boolean
    error: boolean
    hintText: boolean
}

const GROUPS: SingleSelectV2GroupType[] = [
    {
        groupLabel: 'Fruits',
        items: [
            { value: 'apple', label: 'Apple' },
            { value: 'banana', label: 'Banana' },
            { value: 'mango', label: 'Mango' },
        ],
    },
    {
        groupLabel: 'Vegetables',
        items: [
            { value: 'carrot', label: 'Carrot' },
            { value: 'spinach', label: 'Spinach' },
        ],
    },
]

function SingleSelectPreview({
    size,
    variant,
    alignment,
    search,
    disabled,
    error,
    hintText,
}: SingleSelectPlaygroundProps) {
    const [selected, setSelected] = useState('')
    const [open, setOpen] = useState(false)
    return (
        <View style={{ width: 320 }}>
            <SingleSelect
                placeholder="Pick a fruit"
                items={GROUPS}
                selected={selected}
                onSelect={setSelected}
                open={open}
                onOpenChange={setOpen}
                size={size}
                variant={variant}
                alignment={alignment}
                search={search ? { show: true } : undefined}
                disabled={disabled}
                error={
                    error
                        ? { show: true, message: 'Selection is required' }
                        : undefined
                }
                hintText={hintText ? 'Select one option' : undefined}
            />
        </View>
    )
}

const spec: ComponentSpec<SingleSelectPlaygroundProps> = {
    name: 'SingleSelect',
    summary:
        'Trigger button that opens a dropdown panel; selecting an item fires onSelect(value) and closes. Supports search, error state, disabled, and mobile bottom-sheet mode.',
    mode: 'inline',
    defaults: {
        size: SelectSize.MD,
        variant: SelectVariant.CONTAINER,
        alignment: SelectAlignment.START,
        search: false,
        disabled: false,
        error: false,
        hintText: false,
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
            kind: 'select',
            key: 'alignment',
            label: 'Alignment',
            options: enumOptions(SelectAlignment, 'SelectAlignment'),
        },
        { kind: 'toggle', key: 'search', label: 'Search', group: 'Content' },
        { kind: 'toggle', key: 'disabled', label: 'Disabled', group: 'State' },
        { kind: 'toggle', key: 'error', label: 'Error', group: 'State' },
        {
            kind: 'toggle',
            key: 'hintText',
            label: 'Hint text',
            group: 'Content',
        },
    ],
    render: (props) => <SingleSelectPreview {...props} />,
    wrapSnippet: (inner) =>
        inner.replace(
            /\n\/>$/,
            '\n    placeholder="Pick a fruit"\n    items={GROUPS}\n    selected={selected}\n    onSelect={setSelected}\n/>'
        ),
}

export default spec
