import { useState } from 'react'
import { TextInput } from '../../../../packages/blend/lib/main'
import {
    AlertV2,
    AlertV2ActionPosition,
    AlertV2SubType,
    AlertV2Type,
} from '../../../../packages/blend/lib/components/AlertV2'
import Switch from '../../../../packages/blend/lib/components/Switch/Switch'
import SingleSelect from '../../../../packages/blend/lib/components/SingleSelect/SingleSelect'
import { User } from 'lucide-react'

const AlertDemoV2 = () => {
    const [alertType, setAlertType] = useState(AlertV2Type.PRIMARY)
    const [alertSubType, setAlertSubType] = useState(AlertV2SubType.SUBTLE)
    const [heading, setHeading] = useState('AlertV2 heading')
    const [description, setDescription] = useState('AlertV2 description')
    const [showSlot, setShowSlot] = useState(true)
    const [showPrimaryAction, setShowPrimaryAction] = useState(true)
    const [showSecondaryAction, setShowSecondaryAction] = useState(false)
    const [showCloseButton, setShowCloseButton] = useState(true)
    const [actionsPosition, setActionsPosition] =
        useState<AlertV2ActionPosition>(AlertV2ActionPosition.BOTTOM)

    const alertTypeOptions = [
        { value: AlertV2Type.PRIMARY, label: 'Primary' },
        { value: AlertV2Type.SUCCESS, label: 'Success' },
        { value: AlertV2Type.WARNING, label: 'Warning' },
        { value: AlertV2Type.ERROR, label: 'Error' },
        { value: AlertV2Type.PURPLE, label: 'Purple' },
        { value: AlertV2Type.ORANGE, label: 'Orange' },
        { value: AlertV2Type.NEUTRAL, label: 'Neutral' },
    ]

    const alertSubTypeOptions = [
        { value: AlertV2SubType.SUBTLE, label: 'Subtle' },
        { value: AlertV2SubType.NO_FILL, label: 'No Fill' },
    ]

    const actionPositionOptions = [
        { value: AlertV2ActionPosition.BOTTOM, label: 'Bottom' },
        { value: AlertV2ActionPosition.RIGHT, label: 'Right' },
    ]

    const actions =
        showPrimaryAction || showSecondaryAction
            ? {
                  position: actionsPosition,
                  primaryAction: showPrimaryAction
                      ? {
                            text: 'Primary Action',
                            onClick: () => console.log('Primary Action'),
                        }
                      : undefined,
                  secondaryAction: showSecondaryAction
                      ? {
                            text: 'Secondary Action',
                            onClick: () => console.log('Secondary Action'),
                        }
                      : undefined,
              }
            : undefined

    return (
        <div className="space-y-6 p-8">
            <h2 className="text-2xl font-bold">⚠️ AlertV2 Playground</h2>
            <div className="space-y-6">
                <div className="space-y-4">
                    <TextInput
                        label="Heading"
                        value={heading}
                        onChange={(e) => setHeading(e.target.value)}
                        placeholder="Enter heading"
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
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <SingleSelect
                            label="Type"
                            placeholder="Select Type"
                            items={[{ items: alertTypeOptions }]}
                            selected={alertType}
                            onSelect={(value) =>
                                setAlertType(value as AlertV2Type)
                            }
                        />
                        <SingleSelect
                            label="Variant"
                            placeholder="Select Variant"
                            items={[{ items: alertSubTypeOptions }]}
                            selected={alertSubType}
                            onSelect={(value) =>
                                setAlertSubType(value as AlertV2SubType)
                            }
                        />
                        <SingleSelect
                            label="Actions Position"
                            placeholder="Select Position"
                            items={[{ items: actionPositionOptions }]}
                            selected={actionsPosition}
                            onSelect={(value) =>
                                setActionsPosition(
                                    value as AlertV2ActionPosition
                                )
                            }
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Toggle Options</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Switch
                            label="Show Icon Slot"
                            checked={showSlot}
                            onChange={() => setShowSlot(!showSlot)}
                        />
                        <Switch
                            label="Primary Action"
                            checked={showPrimaryAction}
                            onChange={() =>
                                setShowPrimaryAction(!showPrimaryAction)
                            }
                        />
                        <Switch
                            label="Secondary Action"
                            checked={showSecondaryAction}
                            onChange={() =>
                                setShowSecondaryAction(!showSecondaryAction)
                            }
                        />
                        <Switch
                            label="Show Close Button"
                            checked={showCloseButton}
                            onChange={() =>
                                setShowCloseButton(!showCloseButton)
                            }
                        />
                    </div>
                </div>

                <div className="min-h-32 p-8 rounded-xl flex justify-center items-center border-2 border-dashed border-gray-300 bg-gray-50">
                    <AlertV2
                        type={alertType}
                        subType={alertSubType}
                        slot={showSlot ? <User size={16} /> : undefined}
                        heading={heading}
                        description={description}
                        actions={actions}
                        closeButton={{
                            show: showCloseButton,
                            onClick: () => console.log('Close button clicked'),
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default AlertDemoV2
