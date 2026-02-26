import { useState } from 'react'
import { Heart } from 'lucide-react'
import { SingleSelect, TextInput } from '../../../../packages/blend/lib/main'
import { SwitchV2 } from '../../../../packages/blend/lib/components/SwitchV2'
import { useTheme } from '../../../../packages/blend/lib/context/ThemeContext'
import { Theme } from '../../../../packages/blend/lib/context/theme.enum'
import CheckboxV2 from '../../../../packages/blend/lib/components/CheckboxV2/CheckboxV2'
import { SelectorV2Size } from '../../../../packages/blend/lib/components/SelectorV2/selectorV2.types'
import Block from '../../../../packages/blend/lib/components/Primitives/Block/Block'

const CheckboxV2Demo = () => {
    const [checked, setChecked] = useState<boolean | 'indeterminate'>(false)
    const [checkedState, setCheckedState] = useState('Unchecked')
    const [label, setLabel] = useState('CheckboxV2 label')
    const [subLabel, setSubLabel] = useState('CheckboxV2 sub label')
    const [required, setRequired] = useState(false)
    const [error, setError] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [showSlot, setShowSlot] = useState(true)
    const [size, setSize] = useState<SelectorV2Size>(SelectorV2Size.MD)
    const [labelMaxLength, setLabelMaxLength] = useState<number | undefined>()
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
            case 'indeterminate':
                setChecked('indeterminate')
                setCheckedState('Indeterminate')
                break
        }
    }

    return (
        <div className="space-y-6 p-8">
            <h2 className="text-2xl font-bold">🔀 CheckboxV2 Playground</h2>

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
                            onChange={setChecked}
                        />
                        <SwitchV2
                            label="Required"
                            checked={required}
                            onChange={setRequired}
                        />
                        <SwitchV2
                            label="Error"
                            checked={error}
                            onChange={setError}
                        />
                        <SwitchV2
                            label="Disabled"
                            checked={disabled}
                            onChange={setDisabled}
                        />
                        <SwitchV2
                            label="Show Icon Slot"
                            checked={showSlot}
                            onChange={() => setShowSlot(!showSlot)}
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
                                    {
                                        label: 'Indeterminate',
                                        value: 'indeterminate',
                                    },
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
                    <CheckboxV2
                        label={label}
                        id="checkbox-v2-demo"
                        subLabel={subLabel}
                        checked={checked}
                        onCheckedChange={(checked) => {
                            setCheckedState(checked ? 'Checked' : 'Unchecked')
                            setChecked(checked as boolean | 'indeterminate')
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
            </div>
        </div>
    )
}

export default CheckboxV2Demo
