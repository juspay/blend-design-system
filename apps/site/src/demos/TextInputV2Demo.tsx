import { useEffect, useRef, useState } from 'react'
import { TextInputV2 } from '../../../../packages/blend/lib/components/InputsV2/TextInputV2'
import { TextInput } from '../../../../packages/blend/lib/main'
import { addSnackbar } from '../../../../packages/blend/lib/components/Snackbar'
import { InputSizeV2 } from '../../../../packages/blend/lib/components/InputsV2/inputV2.types'
import Switch from '../../../../packages/blend/lib/components/Switch/Switch'
import SingleSelect from '../../../../packages/blend/lib/components/SingleSelect/SingleSelect'
import { Search, X } from 'lucide-react'
import { useTheme } from '../../../../packages/blend/lib/context/ThemeContext'
import { Theme } from '../../../../packages/blend/lib/context/theme.enum'

const sizeOptions = [
    { value: InputSizeV2.SM, label: 'Small' },
    { value: InputSizeV2.MD, label: 'Medium' },
    { value: InputSizeV2.LG, label: 'Large' },
]

const TextInputV2Demo = () => {
    const [value, setValue] = useState('')
    const [label, setLabel] = useState('Label')
    const [subLabel, setSubLabel] = useState('Sub Label')
    const [hintText, setHintText] = useState('Hint Text')
    const [placeholder, setPlaceholder] = useState('Enter')
    const [size, setSize] = useState<InputSizeV2>(InputSizeV2.SM)
    const [disabled, setDisabled] = useState(false)
    const [required, setRequired] = useState(false)
    const [showError, setShowError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('Something went wrong')
    const [showHelpIcon, setShowHelpIcon] = useState(false)
    const [helpIconText, setHelpIconText] = useState('Help tooltip text')
    const [showLeftSlot, setShowLeftSlot] = useState(false)
    const [showRightSlot, setShowRightSlot] = useState(false)
    const [showLabel, setShowLabel] = useState(true)
    const [showSubLabel, setShowSubLabel] = useState(true)
    const [showHintText, setShowHintText] = useState(true)

    const ref = useRef<HTMLInputElement>(null)
    const { theme } = useTheme()

    useEffect(() => {
        if (ref.current) {
            ref.current.focus()
        }
    }, [])

    return (
        <div className="space-y-6 p-8">
            <h2 className="text-2xl font-bold">TextInputV2 Playground</h2>
            <div className="space-y-6">
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TextInput
                            label="Label"
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                            placeholder="Label text"
                        />
                        <TextInput
                            label="Sub Label"
                            value={subLabel}
                            onChange={(e) => setSubLabel(e.target.value)}
                            placeholder="Sub label text"
                        />
                        <TextInput
                            label="Hint Text"
                            value={hintText}
                            onChange={(e) => setHintText(e.target.value)}
                            placeholder="Hint text (footer)"
                        />
                        <TextInput
                            label="Placeholder"
                            value={placeholder}
                            onChange={(e) => setPlaceholder(e.target.value)}
                            placeholder="Input placeholder"
                        />
                        {showError && (
                            <TextInput
                                label="Error Message"
                                value={errorMessage}
                                onChange={(e) =>
                                    setErrorMessage(e.target.value)
                                }
                                placeholder="Error message"
                            />
                        )}
                        {showHelpIcon && (
                            <TextInput
                                label="Help Icon Tooltip"
                                value={helpIconText}
                                onChange={(e) =>
                                    setHelpIconText(e.target.value)
                                }
                                placeholder="Help tooltip text"
                            />
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Select Options</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <SingleSelect
                            label="Size"
                            placeholder="Select Size"
                            items={[{ items: sizeOptions }]}
                            selected={size}
                            onSelect={(value) => setSize(value as InputSizeV2)}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Toggle Options</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Switch
                            label="Show Label"
                            checked={showLabel}
                            onChange={() => setShowLabel(!showLabel)}
                        />
                        <Switch
                            label="Show Sub Label"
                            checked={showSubLabel}
                            onChange={() => setShowSubLabel(!showSubLabel)}
                        />
                        <Switch
                            label="Show Hint Text"
                            checked={showHintText}
                            onChange={() => setShowHintText(!showHintText)}
                        />
                        <Switch
                            label="Disabled"
                            checked={disabled}
                            onChange={() => setDisabled(!disabled)}
                        />
                        <Switch
                            label="Required"
                            checked={required}
                            onChange={() => setRequired(!required)}
                        />
                        <Switch
                            label="Show Error"
                            checked={showError}
                            onChange={() => setShowError(!showError)}
                        />
                        <Switch
                            label="Help Icon"
                            checked={showHelpIcon}
                            onChange={() => setShowHelpIcon(!showHelpIcon)}
                        />
                        <Switch
                            label="Left Slot (Icon)"
                            checked={showLeftSlot}
                            onChange={() => setShowLeftSlot(!showLeftSlot)}
                        />
                        <Switch
                            label="Right Slot (Icon)"
                            checked={showRightSlot}
                            onChange={() => setShowRightSlot(!showRightSlot)}
                        />
                    </div>
                </div>

                <div
                    className={`min-h-32 rounded-xl flex justify-center items-center border-2 border-dashed p-8 ${
                        theme === Theme.DARK
                            ? 'border-gray-700 bg-gray-900'
                            : 'border-gray-300 bg-gray-50'
                    }`}
                >
                    <div className="w-full max-w-md">
                        <TextInputV2
                            ref={ref}
                            label={showLabel ? label : undefined}
                            subLabel={showSubLabel ? subLabel : undefined}
                            hintText={showHintText ? hintText : undefined}
                            placeholder={placeholder}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            size={size}
                            disabled={disabled}
                            required={required}
                            error={
                                showError
                                    ? { show: true, message: errorMessage }
                                    : { show: false, message: '' }
                            }
                            helpIconText={
                                showHelpIcon
                                    ? {
                                          text: helpIconText,
                                          onClick: () =>
                                              addSnackbar({
                                                  header: 'Help icon clicked!',
                                              }),
                                      }
                                    : undefined
                            }
                            leftSlot={
                                showLeftSlot
                                    ? {
                                          slot: <Search size={16} />,
                                          maxHeight: '100%',
                                      }
                                    : undefined
                            }
                            rightSlot={
                                showRightSlot
                                    ? {
                                          slot: (
                                              <X aria-label="Clear" size={16} />
                                          ),
                                          maxHeight: '100%',
                                      }
                                    : undefined
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TextInputV2Demo
