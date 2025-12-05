import { useState } from 'react'
import { NumberInput, NumberInputSize } from '../../../Inputs'

const NumberInputLightHouse = () => {
    const [age, setAge] = useState<number | undefined>(undefined)
    const [income, setIncome] = useState<number | undefined>(5000)
    const [percentage, setPercentage] = useState<number | undefined>(50)

    return (
        <div className="flex flex-col gap-4">
            {/* Basic NumberInput */}
            <NumberInput
                label="Age"
                placeholder="Enter your age"
                value={age}
                onChange={(e) =>
                    setAge(
                        e.target.value
                            ? parseInt(e.target.value, 10)
                            : undefined
                    )
                }
                min={0}
                max={120}
                step={1}
            />

            {/* Pre-filled value */}
            <NumberInput
                label="Monthly Income"
                placeholder="Enter your income"
                sublabel="Before taxes and deductions"
                value={income}
                onChange={(e) =>
                    setIncome(
                        e.target.value ? parseFloat(e.target.value) : undefined
                    )
                }
                min={0}
                step={100}
                hintText="Enter your gross monthly income"
                required
            />

            {/* Percentage field */}
            <NumberInput
                label="Completion Percentage"
                placeholder="0"
                value={percentage}
                onChange={(e) =>
                    setPercentage(
                        e.target.value ? parseFloat(e.target.value) : undefined
                    )
                }
                min={0}
                max={100}
                step={0.5}
                hintText="Between 0 and 100"
            />

            {/* Error state */}
            <NumberInput
                label="Age (Error Example)"
                placeholder="Enter your age"
                value={150}
                onChange={() => {}}
                min={0}
                max={120}
                error
                errorMessage="Age must be between 0 and 120"
            />

            {/* Disabled state */}
            <NumberInput
                label="Disabled NumberInput"
                value={42}
                onChange={() => {}}
                disabled
                hintText="This field is disabled"
            />

            {/* Required field */}
            <NumberInput
                label="Required Amount"
                placeholder="Enter amount"
                value={undefined}
                onChange={() => {}}
                required
                hintText="This field is required"
            />

            {/* Different sizes */}
            <NumberInput
                label="Medium Size"
                placeholder="Medium number input"
                value={undefined}
                onChange={() => {}}
            />
            <NumberInput
                label="Large Size"
                placeholder="Large number input"
                value={undefined}
                onChange={() => {}}
                size={NumberInputSize.LARGE}
            />
        </div>
    )
}

export default NumberInputLightHouse
