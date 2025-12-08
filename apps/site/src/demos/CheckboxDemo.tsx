import {
    Checkbox,
    CheckboxSize,
} from '../../../../packages/blend/lib/components/Checkbox'
import { Switch } from '../../../../packages/blend/lib/components/Switch'
import { SingleSelect } from '../../../../packages/blend/lib/components/SingleSelect'
import { TextInput } from '../../../../packages/blend/lib/components/Inputs/TextInput'
import { Heart } from 'lucide-react'
import { useState } from 'react'
import { addSnackbar } from '../../../../packages/blend/lib/components/Snackbar'

const CheckboxDemo = () => {
    // Individual Checkbox playground state
    const [playgroundLabel, setPlaygroundLabel] = useState(
        'Accept terms and conditions'
    )
    const [playgroundSubtext, setPlaygroundSubtext] = useState(
        'By checking this box, you agree to our terms'
    )
    const [playgroundSize, setPlaygroundSize] = useState<CheckboxSize>(
        CheckboxSize.MEDIUM
    )
    const [playgroundChecked, setPlaygroundChecked] = useState<
        boolean | 'indeterminate'
    >(false)
    const [playgroundDisabled, setPlaygroundDisabled] = useState(false)
    const [playgroundError, setPlaygroundError] = useState(false)
    const [playgroundRequired, setPlaygroundRequired] = useState(false)
    const [showSubtext, setShowSubtext] = useState(true)
    const [showSlot, setShowSlot] = useState(false)

    // Options for selects
    const sizeOptions = [
        { value: CheckboxSize.SMALL, label: 'Small' },
        { value: CheckboxSize.MEDIUM, label: 'Medium' },
    ]

    const checkedStateOptions = [
        { value: 'unchecked', label: 'Unchecked' },
        { value: 'checked', label: 'Checked' },
        { value: 'indeterminate', label: 'Indeterminate' },
    ]

    const handlePlaygroundStateChange = (state: string) => {
        switch (state) {
            case 'checked':
                setPlaygroundChecked(true)
                break
            case 'unchecked':
                setPlaygroundChecked(false)
                break
            case 'indeterminate':
                setPlaygroundChecked('indeterminate')
                break
        }
    }

    const getPlaygroundStateValue = () => {
        if (playgroundChecked === 'indeterminate') return 'indeterminate'
        return playgroundChecked ? 'checked' : 'unchecked'
    }

    return (
        <div className="p-8 space-y-12">
            {/* Individual Checkbox Playground */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">
                    Individual Checkbox Playground
                </h2>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <TextInput
                            label="Label"
                            value={playgroundLabel}
                            onChange={(e) => setPlaygroundLabel(e.target.value)}
                            placeholder="Enter checkbox label"
                        />

                        <TextInput
                            label="Subtext"
                            value={playgroundSubtext}
                            onChange={(e) =>
                                setPlaygroundSubtext(e.target.value)
                            }
                            placeholder="Enter subtext"
                            disabled={!showSubtext}
                        />

                        <SingleSelect
                            label="Size"
                            items={[{ items: sizeOptions }]}
                            selected={playgroundSize}
                            onSelect={(value) =>
                                setPlaygroundSize(value as CheckboxSize)
                            }
                            placeholder="Select size"
                        />

                        <SingleSelect
                            label="Checked State"
                            items={[{ items: checkedStateOptions }]}
                            selected={getPlaygroundStateValue()}
                            onSelect={(value) =>
                                handlePlaygroundStateChange(value as string)
                            }
                            placeholder="Select state"
                        />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <Switch
                            label="Disabled"
                            checked={playgroundDisabled}
                            onChange={() =>
                                setPlaygroundDisabled(!playgroundDisabled)
                            }
                        />
                        <Switch
                            label="Error"
                            checked={playgroundError}
                            onChange={() =>
                                setPlaygroundError(!playgroundError)
                            }
                        />
                        <Switch
                            label="Required"
                            checked={playgroundRequired}
                            onChange={() =>
                                setPlaygroundRequired(!playgroundRequired)
                            }
                        />
                        <Switch
                            label="Show Subtext"
                            checked={showSubtext}
                            onChange={() => setShowSubtext(!showSubtext)}
                        />
                        <Switch
                            label="Show Slot"
                            checked={showSlot}
                            onChange={() => setShowSlot(!showSlot)}
                        />
                    </div>

                    <div className="min-h-40 rounded-2xl w-full flex justify-center items-center outline-1 outline-gray-200 bg-gray-50">
                        <Checkbox
                            name="playground"
                            maxLength={{ label: 3, subtext: 3 }}
                            checked={playgroundChecked}
                            onCheckedChange={(
                                checked: boolean | 'indeterminate'
                            ) => {
                                console.log(checked)
                                setPlaygroundChecked(checked)
                                addSnackbar({
                                    header: `Checkbox ${checked === 'indeterminate' ? 'indeterminate' : checked ? 'checked' : 'unchecked'}!`,
                                })
                            }}
                            size={playgroundSize}
                            disabled={playgroundDisabled}
                            error={playgroundError}
                            required={playgroundRequired}
                            subtext={
                                showSubtext ? playgroundSubtext : undefined
                            }
                            slot={
                                showSlot ? (
                                    <Heart size={16} className="text-red-500" />
                                ) : undefined
                            }
                            data-element="checkbox"
                            data-id={playgroundLabel}
                            label={playgroundLabel}
                            data-status={
                                playgroundDisabled ? 'disabled' : 'enabled'
                            }
                        >
                            {playgroundLabel}
                        </Checkbox>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckboxDemo
