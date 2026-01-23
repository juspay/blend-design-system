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

const SnackbarV2Demo = () => {
    const [snackbarVariant, setSnackbarVariant] = useState(
        SnackbarV2Variant.INFO
    )
    const [header, setHeader] = useState('SnackbarV2 header')
    const [description, setDescription] = useState('SnackbarV2 description')
    const [showActionButton, setShowActionButton] = useState(true)
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

    const showSnackbar = () => {
        addSnackbarV2({
            header,
            description: description || undefined,
            variant: snackbarVariant,
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
            <h2 className="text-2xl font-bold">🍞 SnackbarV2 Playground</h2>
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
                            label="Dismiss on Click Away"
                            checked={dismissOnClickAway}
                            onChange={() =>
                                setDismissOnClickAway(!dismissOnClickAway)
                            }
                        />
                    </div>
                </div>

                {/* StyledToast Preview */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Live Preview</h3>
                    <div className="min-h-32 p-8 rounded-xl flex justify-center items-center border-2 border-dashed border-gray-300 bg-gray-50">
                        <div className="w-full max-w-md">
                            <StyledToast
                                header={header}
                                description={description || undefined}
                                variant={snackbarVariant}
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

                {/* Action Buttons */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Actions</h3>
                    <div className="flex gap-4 flex-wrap">
                        <Button
                            buttonType={ButtonType.PRIMARY}
                            size={ButtonSize.MEDIUM}
                            onClick={showSnackbar}
                            text="Show Snackbar"
                        />
                        <Button
                            buttonType={ButtonType.SECONDARY}
                            size={ButtonSize.MEDIUM}
                            onClick={() => {
                                addSnackbarV2({
                                    header: 'Info Snackbar',
                                    description: 'This is an info notification',
                                    variant: SnackbarV2Variant.INFO,
                                    position,
                                })
                            }}
                            text="Show Info"
                        />
                        <Button
                            buttonType={ButtonType.SUCCESS}
                            size={ButtonSize.MEDIUM}
                            onClick={() => {
                                addSnackbarV2({
                                    header: 'Success Snackbar',
                                    description:
                                        'Your action was completed successfully!',
                                    variant: SnackbarV2Variant.SUCCESS,
                                    position,
                                })
                            }}
                            text="Show Success"
                        />
                        <Button
                            buttonType={ButtonType.SECONDARY}
                            size={ButtonSize.MEDIUM}
                            onClick={() => {
                                addSnackbarV2({
                                    header: 'Warning Snackbar',
                                    description:
                                        'Please be careful with this action',
                                    variant: SnackbarV2Variant.WARNING,
                                    position,
                                })
                            }}
                            text="Show Warning"
                        />
                        <Button
                            buttonType={ButtonType.DANGER}
                            size={ButtonSize.MEDIUM}
                            onClick={() => {
                                addSnackbarV2({
                                    header: 'Error Snackbar',
                                    description:
                                        'Something went wrong. Please try again.',
                                    variant: SnackbarV2Variant.ERROR,
                                    position,
                                })
                            }}
                            text="Show Error"
                        />
                    </div>
                </div>

                {/* Variant Showcase */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                        All Variants Showcase
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
                            <h4 className="text-sm font-medium text-blue-800 mb-2">
                                Info Variant
                            </h4>
                            <p className="text-sm text-blue-600 mb-3">
                                Used for general information and neutral
                                messages.
                            </p>
                            <StyledToast
                                header="Data synced successfully"
                                description="Your dashboard now shows the latest data"
                                variant={SnackbarV2Variant.INFO}
                                onClose={() => {}}
                                actionButton={{
                                    label: 'View Dashboard',
                                    onClick: () =>
                                        console.log('View Dashboard clicked'),
                                }}
                            />
                        </div>

                        <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                            <h4 className="text-sm font-medium text-green-800 mb-2">
                                Success Variant
                            </h4>
                            <p className="text-sm text-green-600 mb-3">
                                Used for successful operations and positive
                                feedback.
                            </p>
                            <StyledToast
                                header="Payment processed successfully"
                                description="Your payment of $150.00 has been processed"
                                variant={SnackbarV2Variant.SUCCESS}
                                onClose={() => {}}
                                actionButton={{
                                    label: 'View Receipt',
                                    onClick: () =>
                                        console.log('View Receipt clicked'),
                                }}
                            />
                        </div>

                        <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                            <h4 className="text-sm font-medium text-yellow-800 mb-2">
                                Warning Variant
                            </h4>
                            <p className="text-sm text-yellow-600 mb-3">
                                Used for warnings and cautionary messages.
                            </p>
                            <StyledToast
                                header="Storage space running low"
                                description="You have used 95% of your storage"
                                variant={SnackbarV2Variant.WARNING}
                                onClose={() => {}}
                                actionButton={{
                                    label: 'Upgrade Plan',
                                    onClick: () =>
                                        console.log('Upgrade Plan clicked'),
                                }}
                            />
                        </div>

                        <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                            <h4 className="text-sm font-medium text-red-800 mb-2">
                                Error Variant
                            </h4>
                            <p className="text-sm text-red-600 mb-3">
                                Used for errors and critical messages.
                            </p>
                            <StyledToast
                                header="Connection failed"
                                description="Unable to connect to the server"
                                variant={SnackbarV2Variant.ERROR}
                                onClose={() => {}}
                                actionButton={{
                                    label: 'Retry',
                                    onClick: () => console.log('Retry clicked'),
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Multiple Snackbars Demo */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                        Multiple Snackbars
                    </h3>
                    <p className="text-sm text-gray-600">
                        Test how multiple snackbars stack and behave when shown
                        in sequence.
                    </p>
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.MEDIUM}
                        onClick={() => {
                            addSnackbarV2({
                                header: 'First Notification',
                                description: 'This is the first notification.',
                                variant: SnackbarV2Variant.INFO,
                                position,
                            })
                            setTimeout(() => {
                                addSnackbarV2({
                                    header: 'Second Notification',
                                    description:
                                        'This is the second notification.',
                                    variant: SnackbarV2Variant.SUCCESS,
                                    position,
                                })
                            }, 500)
                            setTimeout(() => {
                                addSnackbarV2({
                                    header: 'Third Notification',
                                    description:
                                        'This is the third notification.',
                                    variant: SnackbarV2Variant.WARNING,
                                    position,
                                })
                            }, 1000)
                        }}
                        text="Show Multiple"
                    />
                </div>
            </div>

            {/* Snackbar Component (required for the toasts to appear) */}
            <SnackbarV2
                position={position}
                dismissOnClickAway={dismissOnClickAway}
            />
        </div>
    )
}

export default SnackbarV2Demo
