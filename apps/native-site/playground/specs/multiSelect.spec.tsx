import { useState } from 'react'
import { View } from 'react-native'
import { MultiSelect } from 'blend-native'
import type { MultiSelectV2GroupType } from 'blend-native'
import {
    MultiSelectSelectionTagType,
    SelectAlignment,
    SelectSize,
    SelectVariant,
} from 'blend-native'
import { enumOptions } from '../types'
import type { ComponentSpec } from '../types'

type MultiSelectPlaygroundProps = {
    size: SelectSize
    variant: SelectVariant
    alignment: SelectAlignment
    selectionTagType: MultiSelectSelectionTagType
    search: boolean
    enableSelectAll: boolean
    showClearButton: boolean
    showActionButtons: boolean
    disabled: boolean
    error: boolean
}

const GROUPS: MultiSelectV2GroupType[] = [
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

function MultiSelectPreview({
    size,
    variant,
    alignment,
    selectionTagType,
    search,
    enableSelectAll,
    showClearButton,
    showActionButtons,
    disabled,
    error,
}: MultiSelectPlaygroundProps) {
    const [selectedValues, setSelectedValues] = useState<string[]>([])
    const [open, setOpen] = useState(false)
    return (
        <View style={{ width: 320 }}>
            <MultiSelect
                placeholder="Pick fruits"
                items={GROUPS}
                selectedValues={selectedValues}
                onSelectionChange={setSelectedValues}
                open={open}
                onOpenChange={setOpen}
                size={size}
                variant={variant}
                alignment={alignment}
                selectionTagType={selectionTagType}
                search={search ? { show: true } : undefined}
                enableSelectAll={enableSelectAll}
                showClearButton={showClearButton}
                showActionButtons={showActionButtons}
                primaryAction={{
                    text: 'Apply',
                    onClick: () => {},
                }}
                secondaryAction={{
                    text: 'Cancel',
                    onClick: () => {},
                }}
                disabled={disabled}
                error={
                    error
                        ? { show: true, message: 'At least one required' }
                        : undefined
                }
            />
        </View>
    )
}

const spec: ComponentSpec<MultiSelectPlaygroundProps> = {
    name: 'MultiSelect',
    summary:
        'Trigger button opening a multi-select dropdown panel. Supports select-all, clear button, action buttons, search, maxSelections, and mobile bottom-sheet mode.',
    mode: 'inline',
    defaults: {
        size: SelectSize.MD,
        variant: SelectVariant.CONTAINER,
        alignment: SelectAlignment.START,
        selectionTagType: MultiSelectSelectionTagType.COUNT,
        search: false,
        enableSelectAll: false,
        showClearButton: false,
        showActionButtons: false,
        disabled: false,
        error: false,
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
        {
            kind: 'select',
            key: 'selectionTagType',
            label: 'Tag type',
            options: enumOptions(
                MultiSelectSelectionTagType,
                'MultiSelectSelectionTagType'
            ),
        },
        { kind: 'toggle', key: 'search', label: 'Search', group: 'Content' },
        {
            kind: 'toggle',
            key: 'enableSelectAll',
            label: 'Select all',
            group: 'Content',
        },
        {
            kind: 'toggle',
            key: 'showClearButton',
            label: 'Clear button',
            group: 'Content',
        },
        {
            kind: 'toggle',
            key: 'showActionButtons',
            label: 'Action buttons',
            group: 'Content',
        },
        { kind: 'toggle', key: 'disabled', label: 'Disabled', group: 'State' },
        { kind: 'toggle', key: 'error', label: 'Error', group: 'State' },
    ],
    render: (props) => <MultiSelectPreview {...props} />,
    wrapSnippet: (inner) =>
        inner.replace(
            /\n\/>$/,
            '\n    placeholder="Pick fruits"\n    items={GROUPS}\n    selectedValues={selectedValues}\n    onSelectionChange={setSelectedValues}\n/>'
        ),
}

export default spec
