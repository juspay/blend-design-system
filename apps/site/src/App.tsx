import { useState } from 'react'
import {
    MultiSelect,
    MultiSelectVariant,
    MultiSelectMenuSize,
    MultiSelectSelectionTagType,
} from '../../../packages/blend/lib/main'

function App() {
    const [selectedValues1, setSelectedValues1] = useState<string[]>([])
    const [selectedValues2, setSelectedValues2] = useState<string[]>([])
    const [selectedValues3, setSelectedValues3] = useState<string[]>([])
    const [selectedValues4, setSelectedValues4] = useState<string[]>([])
    const [selectedValues5, setSelectedValues5] = useState<string[]>([])
    const [selectedValues6, setSelectedValues6] = useState<string[]>([])
    const [selectedValues7, setSelectedValues7] = useState<string[]>([])
    const [selectedValues8, setSelectedValues8] = useState<string[]>([])
    const [selectedValues9, setSelectedValues9] = useState<string[]>([])
    const [selectedValues10, setSelectedValues10] = useState<string[]>([])
    const [selectedValues11, setSelectedValues11] = useState<string[]>([])
    const [selectedValues12, setSelectedValues12] = useState<string[]>([])
    const [selectedValues13, setSelectedValues13] = useState<string[]>([])
    const [selectedValues14, setSelectedValues14] = useState<string[]>([])
    const [selectedValues15, setSelectedValues15] = useState<string[]>([])

    const items = [
        {
            items: [
                { label: 'Option 1', value: 'option1' },
                { label: 'Option 2', value: 'option2' },
                { label: 'Option 3', value: 'option3' },
                { label: 'Option 4', value: 'option4' },
                { label: 'Option 5', value: 'option5' },
            ],
        },
    ]

    const itemsWithGroups = [
        {
            groupLabel: 'Frontend',
            items: [
                { label: 'React', value: 'react' },
                { label: 'Vue', value: 'vue' },
                { label: 'Angular', value: 'angular' },
            ],
        },
        {
            groupLabel: 'Backend',
            items: [
                { label: 'Node.js', value: 'nodejs' },
                { label: 'Python', value: 'python' },
                { label: 'Java', value: 'java' },
            ],
            showSeparator: true,
        },
    ]

    const createHandler = (
        setter: React.Dispatch<React.SetStateAction<string[]>>
    ) => {
        return (value: string) => {
            setter((prev) => {
                if (prev.includes(value)) {
                    return prev.filter((v) => v !== value)
                }
                return [...prev, value]
            })
        }
    }

    return (
        <main className="w-screen min-h-screen bg-gray-100 p-8 space-y-8">
            {/* Default - Container Variant */}
            <MultiSelect
                label="Default MultiSelect"
                placeholder="Choose options"
                items={items}
                selectedValues={selectedValues1}
                onChange={createHandler(setSelectedValues1)}
            />

            {/* Small Size */}
            <MultiSelect
                label="Small Size"
                placeholder="Choose options"
                items={items}
                selectedValues={selectedValues2}
                onChange={createHandler(setSelectedValues2)}
                size={MultiSelectMenuSize.SMALL}
            />

            {/* Large Size */}
            <MultiSelect
                label="Large Size"
                placeholder="Choose options"
                items={items}
                selectedValues={selectedValues3}
                onChange={createHandler(setSelectedValues3)}
                size={MultiSelectMenuSize.LARGE}
            />

            {/* No Container Variant */}
            <MultiSelect
                label="No Container Variant"
                placeholder="Choose options"
                items={items}
                selectedValues={selectedValues4}
                onChange={createHandler(setSelectedValues4)}
                variant={MultiSelectVariant.NO_CONTAINER}
            />

            {/* Text Selection Tag */}
            <MultiSelect
                label="Text Selection Tag"
                placeholder="Choose options"
                items={items}
                selectedValues={selectedValues5}
                onChange={createHandler(setSelectedValues5)}
                selectionTagType={MultiSelectSelectionTagType.TEXT}
            />

            {/* With Groups */}
            <MultiSelect
                label="With Groups"
                placeholder="Choose technologies"
                items={itemsWithGroups}
                selectedValues={selectedValues6}
                onChange={createHandler(setSelectedValues6)}
            />

            {/* Required Field */}
            <MultiSelect
                label="Required Field"
                placeholder="Choose options"
                items={items}
                selectedValues={selectedValues7}
                onChange={createHandler(setSelectedValues7)}
                required={true}
            />

            {/* With Hint Text */}
            <MultiSelect
                label="With Hint Text"
                placeholder="Choose options"
                items={items}
                selectedValues={selectedValues8}
                onChange={createHandler(setSelectedValues8)}
                hintText="Select multiple options from the list"
            />

            {/* Error State */}
            <MultiSelect
                label="Error State"
                placeholder="Choose options"
                items={items}
                selectedValues={selectedValues9}
                onChange={createHandler(setSelectedValues9)}
                error={true}
                errorMessage="Please select at least one option"
            />

            {/* Disabled State */}
            <MultiSelect
                label="Disabled State"
                placeholder="Cannot select"
                items={items}
                selectedValues={selectedValues10}
                onChange={createHandler(setSelectedValues10)}
                disabled={true}
            />

            {/* With Select All */}
            <MultiSelect
                label="With Select All"
                placeholder="Choose options"
                items={items}
                selectedValues={selectedValues11}
                onChange={createHandler(setSelectedValues11)}
                enableSelectAll={true}
                selectAllText="Select All Options"
            />

            {/* Without Search */}
            <MultiSelect
                label="Without Search"
                placeholder="Choose options"
                items={items}
                selectedValues={selectedValues12}
                onChange={createHandler(setSelectedValues12)}
                enableSearch={false}
            />

            {/* With Sublabel */}
            <MultiSelect
                label="With Sublabel"
                sublabel="Choose your preferred options"
                placeholder="Choose options"
                items={items}
                selectedValues={selectedValues13}
                onChange={createHandler(setSelectedValues13)}
            />

            {/* Full Width */}
            <MultiSelect
                label="Full Width"
                placeholder="Choose options"
                items={items}
                selectedValues={selectedValues14}
                onChange={createHandler(setSelectedValues14)}
                fullWidth={true}
            />

            {/* With Max Selections */}
            <MultiSelect
                label="Max 3 Selections"
                placeholder="Choose up to 3 options"
                items={items}
                selectedValues={selectedValues15}
                onChange={createHandler(setSelectedValues15)}
                maxSelections={3}
            />
        </main>
    )
}

export default App
