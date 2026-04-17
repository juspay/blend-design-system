import { useState } from 'react'
import {
    NumberInputV2,
    NumberInputV2Direction,
} from '../../../../packages/blend/lib/components/InputsV2/NumberInputV2'
import { InputSizeV2 } from '../../../../packages/blend/lib/components/InputsV2/inputV2.types'
import { SingleSelect } from '../../../../packages/blend/lib/components/SingleSelect'
import { Switch } from '../../../../packages/blend/lib/components/Switch'
import { addSnackbar } from '../../../../packages/blend/lib/components/Snackbar'
import { Theme } from '../../../../packages/blend/lib/context/theme.enum'
import { useTheme } from '../../../../packages/blend/lib/context/ThemeContext'
import { Weight, Ruler } from 'lucide-react'

const NumberInputV2Demo = () => {
    const { theme } = useTheme()
    const [playgroundValue, setPlaygroundValue] = useState<number | null>(null)
    const [playgroundSize, setPlaygroundSize] = useState<InputSizeV2>(
        InputSizeV2.MD
    )
    const [playgroundStep, setPlaygroundStep] = useState('1')
    const [playgroundMin, setPlaygroundMin] = useState<string | undefined>(
        undefined
    )
    const [playgroundMax, setPlaygroundMax] = useState<string | undefined>(
        undefined
    )
    const [isDisabled, setIsDisabled] = useState(false)
    const [hasError, setHasError] = useState(false)
    const [isRequired, setIsRequired] = useState(false)
    const [showMin, setShowMin] = useState(false)
    const [showMax, setShowMax] = useState(false)
    const [preventNegative, setPreventNegative] = useState(false)
    const [unit, setUnit] = useState('')
    const [unitDirection, setUnitDirection] = useState<NumberInputV2Direction>(
        NumberInputV2Direction.RIGHT
    )

    // Options for selects
    const sizeOptions = [
        { value: InputSizeV2.SM, label: 'Small' },
        { value: InputSizeV2.MD, label: 'Medium' },
        { value: InputSizeV2.LG, label: 'Large' },
    ]
    const unitDirectionOptions = [
        { value: NumberInputV2Direction.LEFT, label: 'Left' },
        { value: NumberInputV2Direction.RIGHT, label: 'Right' },
    ]
    const unitOptions = [
        { value: '', label: 'None' },
        { value: 'kg', label: 'kg' },
        { value: 'lbs', label: 'lbs' },
        { value: 'g', label: 'g' },
        { value: 'mg', label: 'mg' },
        { value: 'mcg', label: 'mcg' },
        { value: 'iu', label: 'iu' },
        { value: 'pascal', label: 'pascal' },
        { value: 'long_unit', label: 'long_unit' },
    ]

    const stepOptions = [
        { value: '0.1', label: '0.1' },
        { value: '0.5', label: '0.5' },
        { value: '1', label: '1' },
        { value: '5', label: '5' },
        { value: '10', label: '10' },
    ]

    const minOptions = [
        { value: '0', label: '0' },
        { value: '10', label: '10' },
        { value: '50', label: '50' },
        { value: '100', label: '100' },
    ]

    const maxOptions = [
        { value: '50', label: '50' },
        { value: '100', label: '100' },
        { value: '500', label: '500' },
        { value: '1000', label: '1000' },
    ]

    return (
        <div className="p-8 space-y-12">
            {/* Playground Section */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">
                    Number Input V2 Playground
                </h2>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <NumberInputV2
                            data-id={'Enter value'}
                            data-input-name="playground-value"
                            name="playground-value"
                            label={{ text: 'Value', subtext: '' }}
                            value={playgroundValue}
                            onChange={(e) =>
                                setPlaygroundValue(
                                    e.target.value === ''
                                        ? null
                                        : Number(e.target.value)
                                )
                            }
                            placeholder="Enter value"
                            size={InputSizeV2.MD}
                        />

                        <SingleSelect
                            label="Unit"
                            items={[{ items: unitOptions }]}
                            selected={unit}
                            onSelect={(value) => setUnit(value as string)}
                            placeholder="Select unit"
                        />
                        <SingleSelect
                            label="Unit Direction"
                            items={[{ items: unitDirectionOptions }]}
                            selected={unitDirection}
                            onSelect={(value) =>
                                setUnitDirection(
                                    value as NumberInputV2Direction
                                )
                            }
                            placeholder="Select unit direction"
                        />

                        <SingleSelect
                            label="Size"
                            items={[{ items: sizeOptions }]}
                            selected={playgroundSize}
                            onSelect={(value) =>
                                setPlaygroundSize(value as InputSizeV2)
                            }
                            placeholder="Select size"
                        />

                        <SingleSelect
                            label="Step"
                            items={[{ items: stepOptions }]}
                            selected={playgroundStep}
                            onSelect={(value) => setPlaygroundStep(value)}
                            placeholder="Select step"
                        />

                        <SingleSelect
                            label="Min Value"
                            items={[{ items: minOptions }]}
                            selected={playgroundMin || ''}
                            onSelect={(value) => setPlaygroundMin(value)}
                            placeholder="Select min"
                        />

                        <SingleSelect
                            label="Max Value"
                            items={[{ items: maxOptions }]}
                            selected={playgroundMax || ''}
                            onSelect={(value) => setPlaygroundMax(value)}
                            placeholder="Select max"
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <Switch
                            label="Show Min"
                            checked={showMin}
                            onChange={() => setShowMin(!showMin)}
                        />
                        <Switch
                            label="Show Max"
                            checked={showMax}
                            onChange={() => setShowMax(!showMax)}
                        />
                        <Switch
                            label="Prevent Negative"
                            checked={preventNegative}
                            onChange={() =>
                                setPreventNegative(!preventNegative)
                            }
                        />
                        <Switch
                            label="Disabled"
                            checked={isDisabled}
                            onChange={() => setIsDisabled(!isDisabled)}
                        />
                        <Switch
                            label="Error State"
                            checked={hasError}
                            onChange={() => setHasError(!hasError)}
                        />
                        <Switch
                            label="Required"
                            checked={isRequired}
                            onChange={() => setIsRequired(!isRequired)}
                        />
                    </div>

                    <div
                        className={`min-h-40 rounded-2xl w-full flex justify-center items-center outline-1 outline-gray-200 p-8 ${
                            theme === Theme.DARK
                                ? 'border-gray-700 bg-gray-900'
                                : 'border-gray-300 bg-gray-50'
                        }`}
                    >
                        <div className="w-full max-w-md">
                            <NumberInputV2
                                slot={{
                                    left: <Weight size={46} />,
                                    right: <Ruler size={46} />,
                                }}
                                unitDirection={unitDirection}
                                unit={unit}
                                label={{
                                    text: 'Your Label',
                                    subtext: 'This is a sublabel',
                                }}
                                value={playgroundValue}
                                onChange={(e) =>
                                    setPlaygroundValue(
                                        e.target.value === ''
                                            ? null
                                            : Number(e.target.value)
                                    )
                                }
                                placeholder="Enter number..."
                                size={playgroundSize}
                                step={Number(playgroundStep)}
                                min={
                                    showMin && playgroundMin != null
                                        ? Number(playgroundMin)
                                        : undefined
                                }
                                max={
                                    showMax && playgroundMax != null
                                        ? Number(playgroundMax)
                                        : undefined
                                }
                                preventNegative={preventNegative}
                                disabled={isDisabled}
                                error={{
                                    show: hasError,
                                    message: 'This field has an error',
                                }}
                                hintText="This is a hint text"
                                helpIconText="This is help text for the number input"
                                required={isRequired}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Min/Max Examples */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Min/Max Examples</h2>

                {/* Interactive Min/Max Demo */}
                <div className="space-y-4 p-6 bg-gray-50 rounded-lg border-2 border-blue-200">
                    <h3 className="text-lg font-semibold text-blue-900">
                        🎯 Interactive Min/Max Demo (Try it!)
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        This demo shows the fixed min/max behavior: Try typing
                        values outside the range (e.g., 3 or 40), then blur the
                        input to see it clamp and show an error. Use the stepper
                        buttons to see them disable at boundaries.
                    </p>
                    <div className="max-w-md">
                        <NumberInputV2
                            label={{
                                text: 'Value (Min: 5, Max: 10)',
                                subtext: '',
                            }}
                            value={playgroundValue}
                            onChange={(e) => {
                                const newValue =
                                    e.target.value === ''
                                        ? null
                                        : Number(e.target.value)
                                setPlaygroundValue(newValue)
                            }}
                            placeholder="Try typing 3 or 40..."
                            min={5}
                            max={10}
                            step={1}
                            hintText="Type 3 or 40, then blur to see clamping"
                        />
                    </div>
                    <div className="mt-4 p-4 bg-white rounded border border-gray-200">
                        <p className="text-xs font-mono text-gray-700">
                            <strong>Expected behavior:</strong>
                            <br />
                            • Down arrow disabled when value ≤ 5<br />
                            • Up arrow disabled when value ≥ 10
                            <br />
                            • Typing 40 → blurs to 10 with error
                            <br />• Typing 3 → blurs to 5 with error
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Prevent Negative (preventNegative)
                        </h3>
                        <NumberInputV2
                            label={{
                                text: 'Positive Numbers Only',
                                subtext: '',
                            }}
                            value={0}
                            onChange={() => {}}
                            placeholder="Cannot type negative"
                            preventNegative
                            hintText="Try typing a negative number"
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Min 0 (min prop)
                        </h3>
                        <NumberInputV2
                            label={{
                                text: 'Min 0 with validation',
                                subtext: '',
                            }}
                            value={0}
                            onChange={() => {}}
                            placeholder="Min 0"
                            min={0}
                            hintText="Down arrow disabled at 0"
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Max Only</h3>
                        <NumberInputV2
                            label={{ text: 'Max 100', subtext: '' }}
                            value={50}
                            onChange={() => {}}
                            placeholder="Max 100"
                            max={100}
                            hintText="Up arrow disabled at 100"
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Min & Max</h3>
                        <NumberInputV2
                            label={{ text: '0 to 100', subtext: '' }}
                            value={50}
                            onChange={() => {}}
                            placeholder="0 to 100"
                            min={0}
                            max={100}
                            hintText="Try typing outside range"
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Age Range</h3>
                        <NumberInputV2
                            label={{ text: 'Age (0-120)', subtext: '' }}
                            value={25}
                            onChange={() => {}}
                            placeholder="Enter age"
                            min={0}
                            max={120}
                            step={1}
                            hintText="Valid age range"
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Percentage</h3>
                        <NumberInputV2
                            label={{ text: 'Percentage (0-100)', subtext: '' }}
                            value={50}
                            onChange={() => {}}
                            placeholder="0-100%"
                            min={0}
                            max={100}
                            step={1}
                            hintText="0 to 100 percent"
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Temperature</h3>
                        <NumberInputV2
                            label={{ text: 'Temperature (°C)', subtext: '' }}
                            value={20}
                            onChange={() => {}}
                            placeholder="-50 to 50°C"
                            min={-50}
                            max={50}
                            step={0.1}
                            hintText="Valid temperature range"
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Strict Range (5-10)
                        </h3>
                        <NumberInputV2
                            label={{ text: 'Strict Range', subtext: '' }}
                            value={7}
                            onChange={() => {}}
                            placeholder="5 to 10"
                            min={5}
                            max={10}
                            step={1}
                            hintText="Type 3 or 40 to see clamping"
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Small Range (10-20)
                        </h3>
                        <NumberInputV2
                            label={{ text: 'Small Range', subtext: '' }}
                            value={15}
                            onChange={() => {}}
                            placeholder="10 to 20"
                            min={10}
                            max={20}
                            step={1}
                            hintText="Test stepper buttons at boundaries"
                        />
                    </div>
                </div>
            </div>

            {/* Interactive Examples */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Interactive Examples</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Controlled Input
                        </h3>
                        <NumberInputV2
                            label={{ text: 'Controlled', subtext: '' }}
                            value={playgroundValue}
                            onChange={(e) =>
                                setPlaygroundValue(
                                    e.target.value === ''
                                        ? null
                                        : Number(e.target.value)
                                )
                            }
                            placeholder="Type here..."
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Clickable Demo
                        </h3>
                        <div
                            className="p-4 border rounded cursor-pointer hover:bg-gray-50"
                            onClick={() => {
                                addSnackbar({
                                    header: 'Demo clicked!',
                                })
                            }}
                        >
                            <NumberInputV2
                                label={{
                                    text: 'Click the container',
                                    subtext: '',
                                }}
                                value={0}
                                onChange={() => {}}
                                placeholder="Click outside the input"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Real-world Examples */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Real-world Examples</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Quantity</h3>
                        <NumberInputV2
                            label={{ text: 'Quantity', subtext: '' }}
                            value={1}
                            onChange={() => {}}
                            placeholder="Enter quantity"
                            min={1}
                            max={999}
                            step={1}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Price</h3>
                        <NumberInputV2
                            label={{ text: 'Price ($)', subtext: '' }}
                            value={0}
                            onChange={() => {}}
                            placeholder="0.00"
                            min={0}
                            step={0.01}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Rating</h3>
                        <NumberInputV2
                            label={{ text: 'Rating', subtext: '' }}
                            value={5}
                            onChange={() => {}}
                            placeholder="1-5 stars"
                            min={1}
                            max={5}
                            step={0.5}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Weight</h3>
                        <NumberInputV2
                            label={{ text: 'Weight (kg)', subtext: '' }}
                            value={0}
                            onChange={() => {}}
                            placeholder="Enter weight"
                            min={0}
                            step={0.1}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Distance</h3>
                        <NumberInputV2
                            label={{ text: 'Distance (km)', subtext: '' }}
                            value={0}
                            onChange={() => {}}
                            placeholder="Enter distance"
                            min={0}
                            step={0.1}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Score</h3>
                        <NumberInputV2
                            label={{ text: 'Score', subtext: '' }}
                            value={0}
                            onChange={() => {}}
                            placeholder="0-100"
                            min={0}
                            max={100}
                            step={1}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NumberInputV2Demo
