import { useState } from 'react'
import { TextInput } from '../../../../packages/blend/lib/main'
import {
    SnackbarV2,
    addSnackbarV2,
    StyledToast,
    SnackbarV2Variant,
    SnackbarV2Position,
} from '../../../../packages/blend/lib/components/SnackbarV2'
import Switch from '../../../../packages/blend/lib/components/Switch/Switch'
import SingleSelect from '../../../../packages/blend/lib/components/SingleSelect/SingleSelect'
import {
    Button,
    ButtonSize,
    ButtonType,
} from '../../../../packages/blend/lib/components/Button'
import { Star } from 'lucide-react'

const SnackbarV2Demo = () => {
    const [snackbarVariant, setSnackbarVariant] = useState(
        SnackbarV2Variant.INFO
    )
    const [header, setHeader] = useState('SnackbarV2 header')
    const [description, setDescription] = useState('SnackbarV2 description')
    const [showActionButton, setShowActionButton] = useState(true)
    const [useCustomSlot, setUseCustomSlot] = useState(false)
    const [position, setPosition] = useState<SnackbarV2Position>(
        SnackbarV2Position.BOTTOM_RIGHT
    )
    const [dismissOnClickAway, setDismissOnClickAway] = useState(false)

    const variantOptions = [
        { value: SnackbarV2Variant.INFO, label: 'Info' },
        { value: SnackbarV2Variant.SUCCESS, label: 'Success' },
        { value: SnackbarV2Variant.WARNING, label: 'Warning' },
        { value: SnackbarV2Variant.ERROR, label: 'Error' },
    ]

    const positionOptions = [
        { value: SnackbarV2Position.TOP_LEFT, label: 'Top Left' },
        { value: SnackbarV2Position.TOP_RIGHT, label: 'Top Right' },
        { value: SnackbarV2Position.BOTTOM_LEFT, label: 'Bottom Left' },
        { value: SnackbarV2Position.BOTTOM_RIGHT, label: 'Bottom Right' },
        { value: SnackbarV2Position.TOP_CENTER, label: 'Top Center' },
        { value: SnackbarV2Position.BOTTOM_CENTER, label: 'Bottom Center' },
    ]

    const customSlot = useCustomSlot ? (
        <Star size={16} color="#fbbf24" />
    ) : undefined

    const showSnackbar = () => {
        addSnackbarV2({
            header,
            description: description || undefined,
            variant: snackbarVariant,
            slot: customSlot,
            actionButton: showActionButton
                ? {
                      label: 'Action',
                      onClick: () => console.log('Action clicked'),
                      autoDismiss: true,
                  }
                : undefined,
            position,
        })
    }

    return (
        <div className="space-y-6 p-8">
            <h2 className="text-2xl font-bold">SnackbarV2 Playground</h2>
            <div className="space-y-6">
                <div className="space-y-4">
                    <TextInput
                        label="Header"
                        value={header}
                        onChange={(e) => setHeader(e.target.value)}
                        placeholder="Enter header"
                    />
                    <TextInput
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter description"
                    />
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Select Options</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <SingleSelect
                            label="Variant"
                            placeholder="Select Variant"
                            items={[{ items: variantOptions }]}
                            selected={snackbarVariant}
                            onSelect={(value) =>
                                setSnackbarVariant(value as SnackbarV2Variant)
                            }
                        />
                        <SingleSelect
                            label="Position"
                            placeholder="Select Position"
                            items={[{ items: positionOptions }]}
                            selected={position}
                            onSelect={(value) =>
                                setPosition(value as SnackbarV2Position)
                            }
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Toggle Options</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                        <Switch
                            label="Show Action Button"
                            checked={showActionButton}
                            onChange={() =>
                                setShowActionButton(!showActionButton)
                            }
                        />
                        <Switch
                            label="Use Custom Slot"
                            checked={useCustomSlot}
                            onChange={() => setUseCustomSlot(!useCustomSlot)}
                        />
                        <Switch
                            label="Dismiss on Click Away"
                            checked={dismissOnClickAway}
                            onChange={() =>
                                setDismissOnClickAway(!dismissOnClickAway)
                            }
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Live Preview</h3>
                    <div className="min-h-32 p-8 rounded-xl flex justify-center items-center border-2 border-dashed border-gray-300 bg-gray-50">
                        <div className="w-full max-w-md">
                            <StyledToast
                                header={header}
                                description={description || undefined}
                                variant={snackbarVariant}
                                slot={customSlot}
                                onClose={() => console.log('Close clicked')}
                                actionButton={
                                    showActionButton
                                        ? {
                                              label: 'Action',
                                              onClick: () =>
                                                  console.log('Action clicked'),
                                              autoDismiss: true,
                                          }
                                        : undefined
                                }
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Actions</h3>
                    <div className="flex gap-4 flex-wrap">
                        <Button
                            buttonType={ButtonType.PRIMARY}
                            size={ButtonSize.MEDIUM}
                            onClick={showSnackbar}
                            text="Show Snackbar"
                        />
                    </div>
                </div>
            </div>

            <SnackbarV2
                position={position}
                dismissOnClickAway={dismissOnClickAway}
            />
        </div>
    )
}

export default SnackbarV2Demo
