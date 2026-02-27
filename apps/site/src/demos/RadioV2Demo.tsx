import { useEffect, useState } from 'react'
import { Heart, Star } from 'lucide-react'
import {
    addSnackbar,
    SingleSelect,
    Switch,
    TextInput,
} from '../../../../packages/blend/lib/main'
import { SwitchV2 } from '../../../../packages/blend/lib/components/SelectorV2/SwitchV2'
import { useTheme } from '../../../../packages/blend/lib/context/ThemeContext'
import { Theme } from '../../../../packages/blend/lib/context/theme.enum'
import Block from '../../../../packages/blend/lib/components/Primitives/Block/Block'
import { SelectorV2Size } from '../../../../packages/blend/lib/components/SelectorV2/selectorV2.types'
import RadioV2 from '../../../../packages/blend/lib/components/SelectorV2/RadioV2/RadioV2'
import RadioGroupV2 from '../../../../packages/blend/lib/components/SelectorV2/RadioV2/RadioGroupV2'
const RadioV2Demo = () => {
    const [checked, setChecked] = useState<boolean>(false)
    const [checkedState, setCheckedState] = useState('Unchecked')
    const [label, setLabel] = useState('RadioV2 label')
    const [subLabel, setSubLabel] = useState('RadioV2 sub label')
    const [required, setRequired] = useState(false)
    const [error, setError] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [showSlot, setShowSlot] = useState(true)
    const [size, setSize] = useState<SelectorV2Size>(SelectorV2Size.MD)
    const [labelMaxLength, setLabelMaxLength] = useState<number | undefined>()
    const [groupValue, setGroupValue] = useState('option1')
    const [groupDisabled, setGroupDisabled] = useState(false)
    const [groupLabel, setGroupLabel] = useState('Select an option')
    const [subLabelMaxLength, setSubLabelMaxLength] = useState<
        number | undefined
    >()
    const { theme } = useTheme()

    const handlePlaygroundStateChange = (state: string) => {
        switch (state) {
            case 'checked':
                setChecked(true)
                setCheckedState('Checked')
                break
            case 'unchecked':
                setChecked(false)
                setCheckedState('Unchecked')
                break
        }
    }
    useEffect(() => {
        setCheckedState(checked ? 'Checked' : 'Unchecked')
    }, [checked])

    return (
        <div className="space-y-6 p-8">
            <h2 className="text-2xl font-bold">🔀 RadioV2 Playground</h2>

            <div className="space-y-6">
                <div className="space-y-4">
                    <TextInput
                        label="Label"
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                        placeholder="Enter label"
                    />
                    <TextInput
                        label="Sub Label"
                        value={subLabel}
                        onChange={(e) => setSubLabel(e.target.value)}
                        placeholder="Enter sub label"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TextInput
                            label="Label Max Length"
                            type="number"
                            value={
                                labelMaxLength !== undefined
                                    ? String(labelMaxLength)
                                    : ''
                            }
                            onChange={(e) =>
                                setLabelMaxLength(
                                    e.target.value
                                        ? Number(e.target.value)
                                        : undefined
                                )
                            }
                            placeholder="Optional"
                        />
                        <TextInput
                            label="Sub Label Max Length"
                            type="number"
                            value={
                                subLabelMaxLength !== undefined
                                    ? String(subLabelMaxLength)
                                    : ''
                            }
                            onChange={(e) =>
                                setSubLabelMaxLength(
                                    e.target.value
                                        ? Number(e.target.value)
                                        : undefined
                                )
                            }
                            placeholder="Optional"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Toggle Options</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <SwitchV2
                            label="Checked"
                            checked={checked as boolean}
                            onCheckedChange={setChecked}
                        />
                        <SwitchV2
                            label="Required"
                            checked={required}
                            onCheckedChange={setRequired}
                        />
                        <SwitchV2
                            label="Error"
                            checked={error}
                            onCheckedChange={setError}
                        />
                        <SwitchV2
                            label="Disabled"
                            checked={disabled}
                            onCheckedChange={setDisabled}
                        />
                        <SwitchV2
                            label="Show Icon Slot"
                            checked={showSlot}
                            onCheckedChange={() => setShowSlot(!showSlot)}
                        />
                    </div>
                </div>

                <Block display="flex" gap={20}>
                    <SingleSelect
                        label="Size"
                        placeholder="Select size"
                        items={[
                            {
                                items: [
                                    {
                                        label: 'Small',
                                        value: SelectorV2Size.SM,
                                    },
                                    {
                                        label: 'Medium',
                                        value: SelectorV2Size.MD,
                                    },
                                ],
                            },
                        ]}
                        selected={size}
                        onSelect={(value) => setSize(value as SelectorV2Size)}
                    />
                    <SingleSelect
                        label="Checked"
                        placeholder="Select size"
                        items={[
                            {
                                items: [
                                    { label: 'Checked', value: 'checked' },
                                    { label: 'Unchecked', value: 'unchecked' },
                                ],
                            },
                        ]}
                        selected={checkedState as string}
                        onSelect={(value) =>
                            handlePlaygroundStateChange(value as string)
                        }
                    />
                </Block>

                <div
                    className={`min-h-32 p-8 rounded-xl flex justify-center items-center border-2 border-dashed ${
                        theme === Theme.DARK
                            ? 'border-gray-700 bg-gray-900'
                            : 'border-gray-300 bg-gray-50'
                    }`}
                >
                    <RadioV2
                        label={label}
                        id="checkbox-v2-demo"
                        subLabel={subLabel}
                        checked={checked}
                        onCheckedChange={(checked) => {
                            setCheckedState(checked ? 'Checked' : 'Unchecked')
                            setChecked(checked.target.checked)
                        }}
                        required={required}
                        error={error}
                        disabled={disabled}
                        size={size}
                        slot={
                            showSlot ? { slot: <Heart size={16} /> } : undefined
                        }
                        maxLength={{
                            label: labelMaxLength,
                            subLabel: subLabelMaxLength,
                        }}
                    />
                </div>
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold">
                        RadioGroup Playground
                    </h2>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <TextInput
                                label="Group Label"
                                value={groupLabel}
                                onChange={(e) => setGroupLabel(e.target.value)}
                                placeholder="Enter group label"
                            />
                            <div className="flex items-center gap-6">
                                <Switch
                                    label="Group Disabled"
                                    checked={groupDisabled}
                                    onChange={() =>
                                        setGroupDisabled(!groupDisabled)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        className={`min-h-32 p-8 rounded-xl flex justify-center items-center border-2 border-dashed ${
                            theme === Theme.DARK
                                ? 'border-gray-700 bg-gray-900'
                                : 'border-gray-300 bg-gray-50'
                        }`}
                    >
                        <RadioGroupV2
                            name="playground-group"
                            label={groupLabel}
                            value={groupValue}
                            onChange={(value) => {
                                setGroupValue(value)
                                addSnackbar({
                                    header: `Selected: ${value}`,
                                })
                            }}
                            disabled={groupDisabled}
                        >
                            <RadioV2
                                label="Option 1"
                                value="option1"
                                size={SelectorV2Size.MD}
                            />
                            <RadioV2
                                label="Option 2"
                                value="option2"
                                size={SelectorV2Size.MD}
                                subLabel="This option has a description"
                            />
                            <RadioV2
                                label="Option 3"
                                value="option3"
                                size={SelectorV2Size.MD}
                                slot={{
                                    slot: (
                                        <Star
                                            size={16}
                                            className="text-yellow-500"
                                        />
                                    ),
                                }}
                            />
                        </RadioGroupV2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RadioV2Demo
