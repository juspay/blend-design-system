import {
    SingleSelect,
    SelectMenuVariant,
    SelectMenuSize,
} from '../../../SingleSelect'
import { User, Settings } from 'lucide-react'

const SingleSelectLightHouse = () => {
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
            {/* Basic SingleSelect - Container */}
            <SingleSelect
                selected=""
                onSelect={(value) => {
                    console.log('Value changed:', value)
                }}
                items={basicItems}
                label="Basic SingleSelect"
                placeholder="Select an option"
                variant={SelectMenuVariant.CONTAINER}
            />

            {/* Basic SingleSelect - No Container */}
            <SingleSelect
                selected=""
                onSelect={(value) => {
                    console.log('Value changed:', value)
                }}
                items={basicItems}
                label="No Container SingleSelect"
                placeholder="Select an option"
                variant={SelectMenuVariant.NO_CONTAINER}
            />

            {/* With Selected Value */}
            <SingleSelect
                selected="option1"
                onSelect={(value) => {
                    console.log('Value changed:', value)
                }}
                items={basicItems}
                label="With Selection"
                placeholder="Select an option"
                variant={SelectMenuVariant.CONTAINER}
            />

            {/* Small Size */}
            <SingleSelect
                selected=""
                onSelect={(value) => {
                    console.log('Value changed:', value)
                }}
                items={basicItems}
                label="Small Size"
                placeholder="Select an option"
                size={SelectMenuSize.SMALL}
                variant={SelectMenuVariant.CONTAINER}
            />

            {/* Medium Size */}
            <SingleSelect
                selected=""
                onSelect={(value) => {
                    console.log('Value changed:', value)
                }}
                items={basicItems}
                label="Medium Size"
                placeholder="Select an option"
                size={SelectMenuSize.MEDIUM}
                variant={SelectMenuVariant.CONTAINER}
            />

            {/* Large Size */}
            <SingleSelect
                selected=""
                onSelect={(value) => {
                    console.log('Value changed:', value)
                }}
                items={basicItems}
                label="Large Size"
                placeholder="Select an option"
                size={SelectMenuSize.LARGE}
                variant={SelectMenuVariant.CONTAINER}
            />

            {/* Disabled */}
            <SingleSelect
                selected=""
                onSelect={(value) => {
                    console.log('Value changed:', value)
                }}
                items={basicItems}
                label="Disabled"
                placeholder="Select an option"
                disabled={true}
                variant={SelectMenuVariant.CONTAINER}
            />

            {/* Required */}
            <SingleSelect
                selected=""
                onSelect={(value) => {
                    console.log('Value changed:', value)
                }}
                items={basicItems}
                label="Required"
                placeholder="Select an option"
                required={true}
                variant={SelectMenuVariant.CONTAINER}
            />

            {/* With Error */}
            <SingleSelect
                selected=""
                onSelect={(value) => {
                    console.log('Value changed:', value)
                }}
                items={basicItems}
                label="With Error"
                placeholder="Select an option"
                error={true}
                errorMessage="Please select an option"
                variant={SelectMenuVariant.CONTAINER}
            />

            {/* With Hint Text */}
            <SingleSelect
                selected=""
                onSelect={(value) => {
                    console.log('Value changed:', value)
                }}
                items={basicItems}
                label="With Hint"
                placeholder="Select an option"
                hintText="Choose one option from the list"
                variant={SelectMenuVariant.CONTAINER}
            />

            {/* With Sublabel */}
            <SingleSelect
                selected=""
                onSelect={(value) => {
                    console.log('Value changed:', value)
                }}
                items={basicItems}
                label="With Sublabel"
                subLabel="Additional information"
                placeholder="Select an option"
                variant={SelectMenuVariant.CONTAINER}
            />

            {/* With Slot */}
            <SingleSelect
                selected=""
                onSelect={(value) => {
                    console.log('Value changed:', value)
                }}
                items={basicItems}
                label="With Slot"
                placeholder="Select an option"
                slot={<User size={16} />}
                variant={SelectMenuVariant.CONTAINER}
            />

            {/* With Grouped Items */}
            <SingleSelect
                selected=""
                onSelect={(value) => {
                    console.log('Value changed:', value)
                }}
                items={groupedItems}
                label="Grouped Items"
                placeholder="Select an option"
                variant={SelectMenuVariant.CONTAINER}
            />

            {/* With Search Disabled */}
            <SingleSelect
                selected=""
                onSelect={(value) => {
                    console.log('Value changed:', value)
                }}
                items={basicItems}
                label="No Search"
                placeholder="Select an option"
                enableSearch={false}
                variant={SelectMenuVariant.CONTAINER}
            />

            {/* With Custom Search Placeholder */}
            <SingleSelect
                selected=""
                onSelect={(value) => {
                    console.log('Value changed:', value)
                }}
                items={basicItems}
                label="Custom Search"
                placeholder="Select an option"
                searchPlaceholder="Type to search..."
                variant={SelectMenuVariant.CONTAINER}
            />

            {/* Full Width */}
            <SingleSelect
                selected=""
                onSelect={(value) => {
                    console.log('Value changed:', value)
                }}
                items={basicItems}
                label="Full Width"
                placeholder="Select an option"
                fullWidth={true}
                variant={SelectMenuVariant.CONTAINER}
            />

            {/* Inline */}
            <SingleSelect
                selected=""
                onSelect={(value) => {
                    console.log('Value changed:', value)
                }}
                items={basicItems}
                label="Inline"
                placeholder="Select an option"
                inline={true}
                variant={SelectMenuVariant.NO_CONTAINER}
            />

            {/* Complex Example */}
            <SingleSelect
                selected="option1"
                onSelect={(value) => {
                    console.log('Value changed:', value)
                }}
                items={groupedItems}
                label="Complex SingleSelect"
                subLabel="Select one option"
                placeholder="Choose an option"
                hintText="Select from the options below"
                required={true}
                slot={<Settings size={16} />}
                size={SelectMenuSize.MEDIUM}
                enableSearch={true}
                searchPlaceholder="Search options..."
                variant={SelectMenuVariant.CONTAINER}
            />
        </>
    )
}

export default SingleSelectLightHouse
