import { useState } from 'react'
import { UnitInputV2 } from '../../../../packages/blend/lib/components/InputsV2/UnitInputV2'
import { useTheme } from '../../../../packages/blend/lib/context/ThemeContext'
import { Theme } from '../../../../packages/blend/lib/context/theme.enum'
import { UnitInputV2Position } from '../../../../packages/blend/lib/components/InputsV2/UnitInputV2/UnitInputV2.types'
import { InputSizeV2 } from '../../../../packages/blend/lib/components/InputsV2/inputV2.types'
import { SingleSelect } from '../../../../packages/blend/lib/components/SingleSelect'
import {
    Switch,
    SwitchSize,
} from '../../../../packages/blend/lib/components/Switch'
import {
    TextInput,
    TextInputSize,
} from '../../../../packages/blend/lib/components/Inputs/TextInput'
import {
    Weight,
    DollarSign,
    Percent,
    Clock,
    Ruler,
    Thermometer,
    Gauge,
    Zap,
} from 'lucide-react'

const UnitInputV2Demo = () => {
    const { theme } = useTheme()
    const isDarkTheme = theme === Theme.DARK

    // Playground state - using empty value to show floating label behavior
    const [playgroundValue, setPlaygroundValue] = useState<number | undefined>(
        undefined
    )
    const [playgroundSize, setPlaygroundSize] = useState<InputSizeV2>(
        InputSizeV2.LG // Start with LARGE to show floating label on small screens
    )
    const [playgroundUnit, setPlaygroundUnit] = useState('kg')
    const [playgroundUnitPosition, setPlaygroundUnitPosition] =
        useState<UnitInputV2Position>(UnitInputV2Position.RIGHT)
    const [playgroundLabel, setPlaygroundLabel] = useState('Your Label')
    const [playgroundPlaceholder, setPlaygroundPlaceholder] =
        useState('Enter weight')
    const [playgroundSubLabel, setPlaygroundSubLabel] = useState(
        'Enter the weight in kilograms'
    )
    const [playgroundHintText, setPlaygroundHintText] = useState(
        'This is a hint text'
    )
    const [playgroundStep, setPlaygroundStep] = useState(1)
    const [playgroundMin, setPlaygroundMin] = useState<number | undefined>(
        undefined
    )
    const [playgroundMax, setPlaygroundMax] = useState<number | undefined>(
        undefined
    )
    const [playgroundRequired, setPlaygroundRequired] = useState(false)
    const [playgroundDisabled, setPlaygroundDisabled] = useState(false)
    const [playgroundError, setPlaygroundError] = useState(false)
    const [showLeftSlot, setShowLeftSlot] = useState(false)
    const [showRightSlot, setShowRightSlot] = useState(true)
    const [showHelpIcon, setShowHelpIcon] = useState(false)
    const [showMin, setShowMin] = useState(false)
    const [showMax, setShowMax] = useState(false)

    // Example states
    const [weightValue, setWeightValue] = useState(75)
    const [priceValue, setPriceValue] = useState(299.99)
    const [percentageValue, setPercentageValue] = useState(85)
    const [timeValue, setTimeValue] = useState(120)
    const [distanceValue, setDistanceValue] = useState(42.2)
    const [temperatureValue, setTemperatureValue] = useState(25)

    // Options for selects
    const sizeOptions = [
        { value: InputSizeV2.MD, label: 'Medium' },
        { value: InputSizeV2.LG, label: 'Large' },
    ]

    const unitPositionOptions = [
        { value: UnitInputV2Position.LEFT, label: 'Left' },
        { value: UnitInputV2Position.RIGHT, label: 'Right' },
    ]

    const unitOptions = [
        { value: 'kg', label: 'kg (Kilograms)' },
        { value: 'lbs', label: 'lbs (Pounds)' },
        { value: '$', label: '$ (Dollars)' },
        { value: '%', label: '% (Percent)' },
        { value: 'min', label: 'min (Minutes)' },
        { value: 'km', label: 'km (Kilometers)' },
        { value: '°C', label: '°C (Celsius)' },
        { value: 'RPM', label: 'RPM (Revolutions)' },
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

    const getLeftSlotIcon = () => {
        switch (playgroundUnit) {
            case '$':
                return <DollarSign size={16} />
            case '%':
                return <Percent size={16} />
            case 'min':
                return <Clock size={16} />
            case 'km':
                return <Ruler size={16} />
            case '°C':
                return <Thermometer size={16} />
            case 'RPM':
                return <Gauge size={16} />
            default:
                return <Weight size={16} />
        }
    }

    const getRightSlotIcon = () => {
        return <Zap size={16} />
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '32px',
                padding: '20px',
                maxWidth: '1200px',
            }}
        >
            {/* Interactive Playground */}
            <div>
                <h2 style={{ marginBottom: '16px', fontSize: '24px' }}>
                    🎮 Interactive Playground (Unit Input V2)
                </h2>
                <div
                    style={{
                        padding: '16px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        backgroundColor: '#f9fafb',
                        marginBottom: '16px',
                    }}
                >
                    <p
                        style={{
                            margin: '0 0 8px 0',
                            fontSize: '14px',
                            color: '#6b7280',
                        }}
                    >
                        💡 <strong>Tip:</strong> On small screens (mobile), the
                        Large size will show a floating label behavior similar
                        to Airbnb inputs. Resize your browser window to mobile
                        size or use browser dev tools to see the effect!
                    </p>
                    <p
                        style={{
                            margin: '0',
                            fontSize: '14px',
                            color: '#6b7280',
                        }}
                    >
                        When the input is empty (value = 0), the label appears
                        as a placeholder. When you focus/type, the label moves
                        up and the value appears below.
                    </p>
                </div>
                {/* Controls */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                    }}
                >
                    <h3>Controls</h3>

                    <TextInput
                        label="Label"
                        value={playgroundLabel}
                        onChange={(e) => setPlaygroundLabel(e.target.value)}
                        size={TextInputSize.MEDIUM}
                    />

                    <TextInput
                        label="Placeholder"
                        value={playgroundPlaceholder}
                        onChange={(e) =>
                            setPlaygroundPlaceholder(e.target.value)
                        }
                        size={TextInputSize.MEDIUM}
                    />

                    <TextInput
                        label="Sub Label"
                        value={playgroundSubLabel}
                        onChange={(e) => setPlaygroundSubLabel(e.target.value)}
                        size={TextInputSize.MEDIUM}
                    />

                    <TextInput
                        label="Hint Text"
                        value={playgroundHintText}
                        onChange={(e) => setPlaygroundHintText(e.target.value)}
                        size={TextInputSize.MEDIUM}
                    />

                    <SingleSelect
                        label="Size"
                        items={[{ groupLabel: undefined, items: sizeOptions }]}
                        selected={playgroundSize}
                        onSelect={(value) =>
                            setPlaygroundSize(value as InputSizeV2)
                        }
                        placeholder="Select size"
                    />

                    <SingleSelect
                        label="Unit"
                        items={[{ groupLabel: undefined, items: unitOptions }]}
                        selected={playgroundUnit}
                        onSelect={(value) => setPlaygroundUnit(value)}
                        placeholder="Select unit"
                    />

                    <SingleSelect
                        label="Unit Position"
                        items={[
                            {
                                groupLabel: undefined,
                                items: unitPositionOptions,
                            },
                        ]}
                        selected={playgroundUnitPosition}
                        onSelect={(value) =>
                            setPlaygroundUnitPosition(
                                value as UnitInputV2Position
                            )
                        }
                        placeholder="Select position"
                    />

                    <SingleSelect
                        label="Step"
                        items={[{ groupLabel: undefined, items: stepOptions }]}
                        selected={playgroundStep.toString()}
                        onSelect={(value) =>
                            setPlaygroundStep(parseFloat(value))
                        }
                        placeholder="Select step"
                    />

                    <div
                        style={{
                            display: 'flex',
                            gap: '8px',
                            alignItems: 'center',
                        }}
                    >
                        <Switch
                            checked={showMin}
                            onChange={(checked) => setShowMin(checked)}
                            label="Show Min"
                            size={SwitchSize.MEDIUM}
                        />
                        {showMin && (
                            <SingleSelect
                                label="Min Value"
                                items={[
                                    {
                                        groupLabel: undefined,
                                        items: minOptions,
                                    },
                                ]}
                                selected={playgroundMin?.toString() || '0'}
                                onSelect={(value) =>
                                    setPlaygroundMin(parseInt(value))
                                }
                                placeholder="Min"
                            />
                        )}
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            gap: '8px',
                            alignItems: 'center',
                        }}
                    >
                        <Switch
                            checked={showMax}
                            onChange={(checked) => setShowMax(checked)}
                            label="Show Max"
                            size={SwitchSize.MEDIUM}
                        />
                        {showMax && (
                            <SingleSelect
                                label="Max Value"
                                items={[
                                    {
                                        groupLabel: undefined,
                                        items: maxOptions,
                                    },
                                ]}
                                selected={playgroundMax?.toString() || '100'}
                                onSelect={(value) =>
                                    setPlaygroundMax(parseInt(value))
                                }
                                placeholder="Max"
                            />
                        )}
                    </div>

                    <Switch
                        checked={playgroundRequired}
                        onChange={(checked) => setPlaygroundRequired(checked)}
                        label="Required"
                        size={SwitchSize.MEDIUM}
                    />

                    <Switch
                        checked={playgroundDisabled}
                        onChange={(checked) => setPlaygroundDisabled(checked)}
                        label="Disabled"
                        size={SwitchSize.MEDIUM}
                    />

                    <Switch
                        checked={playgroundError}
                        onChange={(checked) => setPlaygroundError(checked)}
                        label="Error State"
                        size={SwitchSize.MEDIUM}
                    />

                    <Switch
                        checked={showHelpIcon}
                        onChange={(checked) => setShowHelpIcon(checked)}
                        label="Help Icon"
                        size={SwitchSize.MEDIUM}
                    />

                    <Switch
                        checked={showLeftSlot}
                        onChange={(checked) => setShowLeftSlot(checked)}
                        label="Left Slot"
                        size={SwitchSize.MEDIUM}
                    />

                    <Switch
                        checked={showRightSlot}
                        onChange={(checked) => setShowRightSlot(checked)}
                        label="Right Slot"
                        size={SwitchSize.MEDIUM}
                    />
                </div>
                <div
                    style={{
                        gap: '24px',
                        padding: '20px',
                        border: isDarkTheme
                            ? '1px solid #374151'
                            : '1px solid #e5e7eb',
                        borderRadius: '8px',
                        backgroundColor: isDarkTheme ? '#111827' : '#f9fafb',
                        marginTop: '16px',
                    }}
                >
                    {/* Preview */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                        }}
                    >
                        <h3
                            style={{
                                margin: 0,
                                color: isDarkTheme ? '#f3f4f6' : undefined,
                            }}
                        >
                            Preview
                        </h3>
                        <div style={{ maxWidth: '400px' }}>
                            <UnitInputV2
                                data-id={'Enter value'}
                                data-input-name={
                                    playgroundValue?.toString() || ''
                                }
                                name={playgroundValue?.toString() || ''}
                                value={playgroundValue}
                                onChange={(e) => {
                                    const newValue = parseFloat(e.target.value)
                                    setPlaygroundValue(
                                        isNaN(newValue) ? 0 : newValue
                                    )
                                }}
                                size={playgroundSize}
                                unit={playgroundUnit}
                                unitPosition={playgroundUnitPosition}
                                label={playgroundLabel}
                                placeholder={playgroundPlaceholder}
                                sublabel={playgroundSubLabel}
                                hintText={playgroundHintText}
                                helpIconHintText={
                                    showHelpIcon
                                        ? 'This is help text'
                                        : undefined
                                }
                                step={playgroundStep}
                                min={showMin ? playgroundMin : undefined}
                                max={showMax ? playgroundMax : undefined}
                                required={playgroundRequired}
                                disabled={playgroundDisabled}
                                error={playgroundError}
                                errorMessage={
                                    playgroundError
                                        ? 'This field has an error'
                                        : undefined
                                }
                                leftSlot={
                                    showLeftSlot ? getLeftSlotIcon() : undefined
                                }
                                rightSlot={
                                    showRightSlot
                                        ? getRightSlotIcon()
                                        : undefined
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* Floating Label Demo */}
            <div>
                <h2 style={{ marginBottom: '16px', fontSize: '24px' }}>
                    📱 Floating Label Demo (Mobile/Small Screen)
                </h2>
                <div
                    style={{
                        padding: '16px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        backgroundColor: '#f9fafb',
                        marginBottom: '16px',
                    }}
                >
                    <p
                        style={{
                            margin: '0 0 8px 0',
                            fontSize: '14px',
                            color: '#6b7280',
                        }}
                    >
                        These examples demonstrate the Airbnb-style floating
                        label behavior. On mobile screens, Large size inputs
                        will show the label as a placeholder when empty, and
                        move the label up when focused or when they have a
                        value.
                    </p>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                        maxWidth: '400px',
                    }}
                >
                    <UnitInputV2
                        value={0}
                        onChange={() => {}}
                        size={InputSizeV2.LG}
                        unit="kg"
                        label="Empty Weight (shows floating effect)"
                        placeholder="Enter weight"
                        sublabel="Try focusing this input on mobile"
                    />
                    <UnitInputV2
                        value={75}
                        onChange={() => {}}
                        size={InputSizeV2.LG}
                        unit="kg"
                        label="Weight with Value (label stays up)"
                        placeholder="Enter weight"
                        sublabel="This input has a value, so label stays up"
                    />
                </div>
            </div>
            {/* Size Examples */}
            <div>
                <h2 style={{ marginBottom: '16px', fontSize: '24px' }}>
                    📏 Size Variations
                </h2>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                    }}
                >
                    <UnitInputV2
                        value={50}
                        onChange={() => {}}
                        size={InputSizeV2.MD}
                        unit="kg"
                        label="Medium Size"
                        placeholder="Enter weight"
                    />
                    <UnitInputV2
                        value={50}
                        onChange={() => {}}
                        size={InputSizeV2.LG}
                        unit="kg"
                        label="Large Size"
                        placeholder="Enter weight"
                    />
                </div>
            </div>
            {/* Unit Position Examples */}
            <div>
                <h2 style={{ marginBottom: '16px', fontSize: '24px' }}>
                    📍 Unit Position Examples
                </h2>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns:
                            'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '16px',
                    }}
                >
                    <UnitInputV2
                        value={299.99}
                        onChange={() => {}}
                        unit="$"
                        unitPosition={UnitInputV2Position.LEFT}
                        label="Price (Left Unit)"
                        placeholder="Enter price"
                        leftSlot={<DollarSign size={16} />}
                    />
                    <UnitInputV2
                        value={85}
                        onChange={() => {}}
                        unit="%"
                        unitPosition={UnitInputV2Position.RIGHT}
                        label="Percentage (Right Unit)"
                        placeholder="Enter percentage"
                        rightSlot={<Percent size={16} />}
                    />
                </div>
            </div>
            {/* Real-world Examples */}
            <div>
                <h2 style={{ marginBottom: '16px', fontSize: '24px' }}>
                    🌍 Real-world Use Cases
                </h2>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns:
                            'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '20px',
                    }}
                >
                    <UnitInputV2
                        value={weightValue}
                        onChange={(e) => {
                            const value = parseFloat(e.target.value)
                            if (!isNaN(value)) setWeightValue(value)
                        }}
                        unit="kg"
                        label="Body Weight"
                        placeholder="Enter weight"
                        sublabel="Your current weight"
                        hintText="Used for BMI calculation"
                        min={30}
                        max={200}
                        step={0.1}
                        leftSlot={<Weight size={16} />}
                    />

                    <UnitInputV2
                        value={priceValue}
                        onChange={(e) => {
                            const value = parseFloat(e.target.value)
                            if (!isNaN(value)) setPriceValue(value)
                        }}
                        unit="$"
                        unitPosition={UnitInputV2Position.LEFT}
                        label="Product Price"
                        placeholder="0.00"
                        sublabel="Enter the product price"
                        min={0}
                        step={0.01}
                        leftSlot={<DollarSign size={16} />}
                    />

                    <UnitInputV2
                        value={percentageValue}
                        onChange={(e) => {
                            const value = parseFloat(e.target.value)
                            if (!isNaN(value)) setPercentageValue(value)
                        }}
                        unit="%"
                        label="Completion Rate"
                        placeholder="Enter percentage"
                        sublabel="Project completion"
                        min={0}
                        max={100}
                        step={1}
                        rightSlot={<Percent size={16} />}
                    />

                    <UnitInputV2
                        value={timeValue}
                        onChange={(e) => {
                            const value = parseFloat(e.target.value)
                            if (!isNaN(value)) setTimeValue(value)
                        }}
                        unit="min"
                        label="Duration"
                        placeholder="Enter minutes"
                        sublabel="Meeting duration"
                        min={15}
                        max={480}
                        step={15}
                        leftSlot={<Clock size={16} />}
                    />

                    <UnitInputV2
                        value={distanceValue}
                        onChange={(e) => {
                            const value = parseFloat(e.target.value)
                            if (!isNaN(value)) setDistanceValue(value)
                        }}
                        unit="km"
                        label="Distance"
                        placeholder="Enter distance"
                        sublabel="Running distance"
                        min={0}
                        step={0.1}
                        rightSlot={<Ruler size={16} />}
                    />

                    <UnitInputV2
                        value={temperatureValue}
                        onChange={(e) => {
                            const value = parseFloat(e.target.value)
                            if (!isNaN(value)) setTemperatureValue(value)
                        }}
                        unit="°C"
                        label="Temperature"
                        placeholder="Enter temperature"
                        sublabel="Room temperature"
                        min={-10}
                        max={50}
                        step={0.5}
                        leftSlot={<Thermometer size={16} />}
                    />
                </div>
            </div>
            {/* State Examples */}
            <div>
                <h2 style={{ marginBottom: '16px', fontSize: '24px' }}>
                    🎭 Component States
                </h2>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                    }}
                >
                    <UnitInputV2
                        value={100}
                        onChange={() => {}}
                        unit="kg"
                        label="Default State"
                        placeholder="Enter weight"
                    />

                    <UnitInputV2
                        value={100}
                        onChange={() => {}}
                        unit="kg"
                        label="Required Field"
                        placeholder="Enter weight"
                        required
                        sublabel="This field is required"
                    />

                    <UnitInputV2
                        value={100}
                        onChange={() => {}}
                        unit="kg"
                        label="Error State"
                        placeholder="Enter weight"
                        error
                        errorMessage="Weight must be between 30-200 kg"
                    />

                    <UnitInputV2
                        value={100}
                        onChange={() => {}}
                        unit="kg"
                        label="Disabled State"
                        placeholder="Enter weight"
                        disabled
                        sublabel="This field is disabled"
                    />

                    <UnitInputV2
                        value={100}
                        onChange={() => {}}
                        unit="kg"
                        label="With Help Icon"
                        placeholder="Enter weight"
                        helpIconHintText="Click for more information about weight input"
                        hintText="This input has additional help available"
                    />
                </div>
            </div>
            {/* With Slots Examples */}
            <div>
                <h2 style={{ marginBottom: '16px', fontSize: '24px' }}>
                    🎰 With Icon Slots
                </h2>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns:
                            'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '16px',
                    }}
                >
                    <UnitInputV2
                        value={75}
                        onChange={() => {}}
                        unit="kg"
                        label="Left Slot Only"
                        placeholder="Enter weight"
                        leftSlot={<Weight size={16} />}
                    />

                    <UnitInputV2
                        value={75}
                        onChange={() => {}}
                        unit="kg"
                        label="Right Slot Only"
                        placeholder="Enter weight"
                        rightSlot={<Zap size={16} />}
                    />

                    <UnitInputV2
                        value={75}
                        onChange={() => {}}
                        unit="kg"
                        label="Both Slots"
                        placeholder="Enter weight"
                        leftSlot={<Weight size={16} />}
                        rightSlot={<Zap size={16} />}
                    />

                    <UnitInputV2
                        value={3000}
                        onChange={() => {}}
                        unit="RPM"
                        label="Engine Speed"
                        placeholder="Enter RPM"
                        leftSlot={<Gauge size={16} />}
                        rightSlot={<Zap size={16} />}
                        min={800}
                        max={8000}
                        step={100}
                    />
                </div>
            </div>
        </div>
    )
}

export default UnitInputV2Demo
