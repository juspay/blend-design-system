import { useState } from 'react'
import { Hash } from 'lucide-react'
import { SingleSelect, TextInput } from '../../../../packages/blend/lib/main'
import { SwitchV2 } from '../../../../packages/blend/lib/components/SelectorV2/SwitchV2'
import { SelectorV2Size } from '../../../../packages/blend/lib/components/SelectorV2/selectorV2.types'
import { useTheme } from '../../../../packages/blend/lib/context/ThemeContext'
import { Theme } from '../../../../packages/blend/lib/context/theme.enum'

const SwitchV2Demo = () => {
    const [checked, setChecked] = useState(false)
    const [label, setLabel] = useState('SwitchV2 label')
    const [subLabel, setSubLabel] = useState('SwitchV2 sub label')
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

    return (
        <div className="space-y-6 p-8">
            <h2 className="text-2xl font-bold">🔀 SwitchV2 Playground</h2>

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
                            checked={checked}
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

                <SingleSelect
                    label="Size"
                    placeholder="Select size"
                    items={[
                        {
                            items: [
                                { label: 'Small', value: SelectorV2Size.SM },
                                { label: 'Medium', value: SelectorV2Size.MD },
                            ],
                        },
                    ]}
                    selected={size}
                    onSelect={(value) => setSize(value as SelectorV2Size)}
                />

                <div
                    className={`min-h-32 p-8 rounded-xl flex justify-center items-center border-2 border-dashed ${
                        theme === Theme.DARK
                            ? 'border-gray-700 bg-gray-900'
                            : 'border-gray-300 bg-gray-50'
                    }`}
                >
                    <SwitchV2
                        label={label}
                        subLabel={subLabel}
                        checked={checked}
                        onCheckedChange={setChecked}
                        required={required}
                        error={error}
                        disabled={disabled}
                        size={size}
                        slot={
                            showSlot ? { slot: <Hash size={16} /> } : undefined
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

export default SwitchV2Demo
