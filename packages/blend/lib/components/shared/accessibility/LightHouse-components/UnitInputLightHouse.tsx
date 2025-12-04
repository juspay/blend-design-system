import { useState } from 'react'
import { UnitInput, UnitInputSize, UnitPosition } from '../../../Inputs'

const UnitInputLightHouse = () => {
    const [price, setPrice] = useState<number | undefined>(undefined)
    const [discount, setDiscount] = useState<number | undefined>(10)
    const [weight, setWeight] = useState<number | undefined>(75.5)

    return (
        <div className="flex flex-col gap-4">
            {/* Basic UnitInput */}
            <UnitInput
                label="Price"
                unit="USD"
                unitPosition={UnitPosition.LEFT}
                placeholder="0.00"
                value={price}
                onChange={(e) =>
                    setPrice(
                        e.target.value ? parseFloat(e.target.value) : undefined
                    )
                }
                min={0}
                step={0.01}
            />

            {/* Prefilled / typical states */}
            <UnitInput
                label="Product Price"
                sublabel="Base price before taxes and discounts"
                unit="$"
                unitPosition={UnitPosition.LEFT}
                placeholder="0.00"
                value={price ?? 199.99}
                onChange={(e) =>
                    setPrice(
                        e.target.value ? parseFloat(e.target.value) : undefined
                    )
                }
                hintText="Enter the price in US dollars"
                required
            />

            {/* Percentage discount */}
            <UnitInput
                label="Discount"
                unit="%"
                unitPosition={UnitPosition.RIGHT}
                placeholder="0"
                value={discount}
                onChange={(e) =>
                    setDiscount(
                        e.target.value ? parseFloat(e.target.value) : undefined
                    )
                }
                min={0}
                max={100}
                step={1}
            />

            {/* Error state */}
            <UnitInput
                label="Discount (Error Example)"
                unit="%"
                unitPosition={UnitPosition.RIGHT}
                value={150}
                onChange={() => {}}
                min={0}
                max={100}
                error
                errorMessage="Discount must be between 0% and 100%"
            />

            {/* Weight with unit on right */}
            <UnitInput
                label="Weight"
                unit="kg"
                unitPosition={UnitPosition.RIGHT}
                value={weight}
                onChange={(e) =>
                    setWeight(
                        e.target.value ? parseFloat(e.target.value) : undefined
                    )
                }
                placeholder="0.0"
                min={0}
                step={0.1}
            />

            {/* Disabled examples */}
            <UnitInput
                label="Disabled Empty"
                unit="USD"
                value={undefined}
                onChange={() => {}}
                placeholder="This input is disabled"
                disabled
            />
            <UnitInput
                label="Disabled With Value"
                unit="kg"
                value={42.5}
                onChange={() => {}}
                disabled
            />

            {/* Size variants */}
            <UnitInput
                label="Medium Size"
                unit="USD"
                size={UnitInputSize.MEDIUM}
                value={undefined}
                onChange={() => {}}
                placeholder="Medium unit input"
            />
            <UnitInput
                label="Large Size"
                unit="USD"
                size={UnitInputSize.LARGE}
                value={undefined}
                onChange={() => {}}
                placeholder="Large unit input"
            />
        </div>
    )
}

export default UnitInputLightHouse
