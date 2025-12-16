import {
    MultiSelect,
    MultiSelectVariant,
    MultiSelectMenuSize,
    MultiSelectSelectionTagType,
} from '../../../MultiSelect'
import { User, Settings } from 'lucide-react'

const MultiSelectLightHouse = () => {
    const basicItems = [
        {
            items: [
                { label: 'Option 1', value: 'option1' },
                { label: 'Option 2', value: 'option2' },
                { label: 'Option 3', value: 'option3' },
            ],
        },
    ]

    const groupedItems = [
        {
            groupLabel: 'Group 1',
            items: [
                { label: 'Option 1', value: 'option1' },
                { label: 'Option 2', value: 'option2' },
            ],
        },
        {
            groupLabel: 'Group 2',
            items: [
                { label: 'Option 3', value: 'option3' },
                { label: 'Option 4', value: 'option4' },
            ],
        },
    ]

    return (
        <>
            {/* Basic MultiSelect - Container */}
            <MultiSelect
                selectedValues={[]}
                onChange={(value) => {
                    console.log('Value changed:', value)
                }}
                items={basicItems}
                label="Basic MultiSelect"
                placeholder="Select options"
                variant={MultiSelectVariant.CONTAINER}
            />

            {/* Basic MultiSelect - No Container */}
            <MultiSelect
                selectedValues={[]}
                onChange={(value) => {
                    console.log('Value changed:', value)
                }}
                items={basicItems}
                label="No Container MultiSelect"
                placeholder="Select options"
                variant={MultiSelectVariant.NO_CONTAINER}
            />

            {/* With Selected Values */}
            <MultiSelect
                selectedValues={['option1', 'option2']}
                onChange={(value) => {
                    console.log('Value changed:', value)
                }}
                items={basicItems}
                label="With Selections"
                placeholder="Select options"
                variant={MultiSelectVariant.CONTAINER}
            />

            {/* Small Size */}
            <MultiSelect
                selectedValues={[]}
                onChange={(value) => {
                    console.log('Value changed:', value)
                }}
                items={basicItems}
                label="Small Size"
                placeholder="Select options"
                size={MultiSelectMenuSize.SMALL}
                variant={MultiSelectVariant.CONTAINER}
            />

            {/* Medium Size */}
            <MultiSelect
                selectedValues={[]}
                onChange={(value) => {
                    console.log('Value changed:', value)
                }}
                items={basicItems}
                label="Medium Size"
                placeholder="Select options"
                size={MultiSelectMenuSize.MEDIUM}
                variant={MultiSelectVariant.CONTAINER}
            />

            {/* Large Size */}
            <MultiSelect
                selectedValues={[]}
                onChange={(value) => {
                    console.log('Value changed:', value)
                }}
                items={basicItems}
                label="Large Size"
                placeholder="Select options"
                size={MultiSelectMenuSize.LARGE}
                variant={MultiSelectVariant.CONTAINER}
            />

            {/* Disabled */}
            <MultiSelect
                selectedValues={[]}
                onChange={(value) => {
                    console.log('Value changed:', value)
                }}
                items={basicItems}
                label="Disabled"
                placeholder="Select options"
                disabled={true}
                variant={MultiSelectVariant.CONTAINER}
            />

            {/* Required */}
            <MultiSelect
                selectedValues={[]}
                onChange={(value) => {
                    console.log('Value changed:', value)
                }}
                items={basicItems}
                label="Required"
                placeholder="Select options"
                required={true}
                variant={MultiSelectVariant.CONTAINER}
            />

            {/* With Error */}
            <MultiSelect
                selectedValues={[]}
                onChange={(value) => {
                    console.log('Value changed:', value)
                }}
                items={basicItems}
                label="With Error"
                placeholder="Select options"
                error={true}
                errorMessage="Please select at least one option"
                variant={MultiSelectVariant.CONTAINER}
            />

            {/* With Hint Text */}
            <MultiSelect
                selectedValues={[]}
                onChange={(value) => {
                    console.log('Value changed:', value)
                }}
                items={basicItems}
                label="With Hint"
                placeholder="Select options"
                hintText="Select one or more options"
                variant={MultiSelectVariant.CONTAINER}
            />

            {/* With Sublabel */}
            <MultiSelect
                selectedValues={[]}
                onChange={(value) => {
                    console.log('Value changed:', value)
                }}
                items={basicItems}
                label="With Sublabel"
                sublabel="Additional information"
                placeholder="Select options"
                variant={MultiSelectVariant.CONTAINER}
            />

            {/* With Slot */}
            <MultiSelect
                selectedValues={[]}
                onChange={(value) => {
                    console.log('Value changed:', value)
                }}
                items={basicItems}
                label="With Slot"
                placeholder="Select options"
                slot={<User size={16} />}
                variant={MultiSelectVariant.CONTAINER}
            />

            {/* With Grouped Items */}
            <MultiSelect
                selectedValues={[]}
                onChange={(value) => {
                    console.log('Value changed:', value)
                }}
                items={groupedItems}
                label="Grouped Items"
                placeholder="Select options"
                variant={MultiSelectVariant.CONTAINER}
            />

            {/* With Search Disabled */}
            <MultiSelect
                selectedValues={[]}
                onChange={(value) => {
                    console.log('Value changed:', value)
                }}
                items={basicItems}
                label="No Search"
                placeholder="Select options"
                enableSearch={false}
                variant={MultiSelectVariant.CONTAINER}
            />

            {/* With Select All */}
            <MultiSelect
                selectedValues={[]}
                onChange={(value) => {
                    console.log('Value changed:', value)
                }}
                items={basicItems}
                label="With Select All"
                placeholder="Select options"
                enableSelectAll={true}
                selectAllText="Select All Options"
                variant={MultiSelectVariant.CONTAINER}
            />

            {/* Complex Example */}
            <MultiSelect
                selectedValues={['option1', 'option2']}
                onChange={(value) => {
                    console.log('Value changed:', value)
                }}
                items={groupedItems}
                label="Complex MultiSelect"
                sublabel="Select multiple options"
                placeholder="Choose options"
                hintText="You can select multiple items"
                required={true}
                slot={<Settings size={16} />}
                size={MultiSelectMenuSize.MEDIUM}
                enableSearch={true}
                searchPlaceholder="Search options..."
                enableSelectAll={true}
                maxSelections={5}
                variant={MultiSelectVariant.CONTAINER}
                selectionTagType={MultiSelectSelectionTagType.COUNT}
            />

            {/* With Max Selections */}
            <MultiSelect
                selectedValues={[]}
                onChange={(value) => {
                    console.log('Value changed:', value)
                }}
                items={basicItems}
                label="Max 2 Selections"
                placeholder="Select options"
                maxSelections={2}
                variant={MultiSelectVariant.CONTAINER}
            />

            {/* Full Width */}
            <MultiSelect
                selectedValues={[]}
                onChange={(value) => {
                    console.log('Value changed:', value)
                }}
                items={basicItems}
                label="Full Width"
                placeholder="Select options"
                fullWidth={true}
                variant={MultiSelectVariant.CONTAINER}
            />

            {/* With Action Buttons */}
            <MultiSelect
                selectedValues={['option1']}
                onChange={(value) => {
                    console.log('Value changed:', value)
                }}
                items={basicItems}
                label="With Actions"
                placeholder="Select options"
                showActionButtons={true}
                primaryAction={{
                    text: 'Apply',
                    onClick: (values) => {
                        console.log('Apply clicked:', values)
                    },
                }}
                secondaryAction={{
                    text: 'Cancel',
                    onClick: () => {
                        console.log('Cancel clicked')
                    },
                }}
                variant={MultiSelectVariant.CONTAINER}
            />
        </>
    )
}

export default MultiSelectLightHouse
