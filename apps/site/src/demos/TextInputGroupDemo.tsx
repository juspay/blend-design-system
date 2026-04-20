import { useState } from 'react'
import TextInputGroup from '../../../../packages/blend/lib/components/TextInputGroup/TextInputGroup'
import {
    SelectMenuGroupType,
    SingleSelect,
} from '../../../../packages/blend/lib/components/SingleSelect'
import { Switch } from '../../../../packages/blend/lib/components/Switch'
import { SelectMenuVariant } from '../../../../packages/blend/lib/components/Select'
import {
    TextInput,
    TextInputSize,
} from '../../../../packages/blend/lib/components/Inputs/TextInput'

const TextInputGroupDemo = () => {
    const [stacked, setStacked] = useState(false)
    const [gap, setGap] = useState('8')
    const [selectSize, setSelectSize] = useState<TextInputSize>(
        TextInputSize.MEDIUM
    )
    const [count, setCount] = useState('3')
    const [value, setValue] = useState('')
    const [error, setError] = useState(false)

    const sizeOptions: SelectMenuGroupType[] = [
        {
            items: [
                { label: 'Small', value: TextInputSize.SMALL },
                { label: 'Medium', value: TextInputSize.MEDIUM },
                { label: 'Large', value: TextInputSize.LARGE },
            ],
        },
    ]
    const gapOptions: SelectMenuGroupType[] = [
        {
            items: [
                { label: '0px', value: '0' },
                { label: '4px', value: '4' },
                { label: '8px', value: '8' },
                { label: '12px', value: '12' },
                { label: '16px', value: '16' },
                { label: '24px', value: '24' },
            ],
        },
    ]
    const countOptions = [
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
    ]

    const renderTextInputGroup = () => {
        const textInputs = []

        for (let i = 0; i < Number(count); i++) {
            textInputs.push(
                <TextInput
                    size={selectSize}
                    label="Default"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Enter text..."
                    error={error}
                    errorMessage={'This field has an error'}
                />
            )
        }

        return textInputs
    }

    return (
        <div className="space-y-6 p-8">
            <div className="space-y-3">
                <h1 className="text-3xl font-bold">
                    Text Input Group Component
                </h1>
                <p className="text-gray-600">
                    Interactive playground to test Text Input Group with stacked
                    and non-stacked modes.
                </p>
            </div>
            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Playground</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <SingleSelect
                        label="Size"
                        items={sizeOptions}
                        selected={selectSize}
                        onSelect={(value) =>
                            setSelectSize(value as TextInputSize)
                        }
                        placeholder="Select size"
                    />
                    <SingleSelect
                        label="Gap (px)"
                        items={gapOptions}
                        selected={gap}
                        onSelect={(value) => setGap(value as SelectMenuVariant)}
                        placeholder="Select Gap"
                    />
                    <SingleSelect
                        label="Text Input Count"
                        items={[{ items: countOptions }]}
                        selected={count}
                        onSelect={(value) => setCount(value)}
                        placeholder="Select count"
                    />
                    <Switch
                        label="stacked"
                        checked={stacked}
                        onChange={() => setStacked(!stacked)}
                    />
                    <Switch
                        label="error"
                        checked={error}
                        onChange={() => setError(!error)}
                    />
                </div>
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold">Live Preview</h3>
                    <div className="min-h-32 rounded-xl flex justify-center items-center border-2 border-dashed border-gray-300 bg-white p-8">
                        <TextInputGroup
                            stacked={stacked}
                            gap={stacked ? undefined : Number(gap)}
                        >
                            {renderTextInputGroup()}
                        </TextInputGroup>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default TextInputGroupDemo
