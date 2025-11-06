import {
    Button,
    ButtonSize,
    ButtonType,
} from '../../../../packages/blend/lib/components/Button'
import {
    addSnackbar,
    SnackbarVariant,
} from '../../../../packages/blend/lib/components/Snackbar'
import { StyledToast } from '../../../../packages/blend/lib/components/Snackbar/Snackbar'

const SnackbarDemo = () => {
    const showInfoSnackbar = () => {
        addSnackbar({
            header: 'Information',
            description: 'This is an informational message for the user.',
            variant: SnackbarVariant.INFO,
        })
    }

    const showSuccessSnackbar = () => {
        addSnackbar({
            header: 'Success',
            description: 'Your action was completed successfully!',
            variant: SnackbarVariant.SUCCESS,
        })
    }

    const showWarningSnackbar = () => {
        addSnackbar({
            header: 'Warning',
            description: 'Please be careful with this action.',
            variant: SnackbarVariant.WARNING,
        })
    }

    const showErrorSnackbar = () => {
        addSnackbar({
            header: 'Error',
            description: 'Something went wrong. Please try again.',
            variant: SnackbarVariant.ERROR,
        })
    }

    const showSnackbarWithAction = () => {
        addSnackbar({
            header: 'New Update Available',
            description: 'A new version of the application is available.',
            variant: SnackbarVariant.INFO,
            actionButton: {
                label: 'Update Now',
                onClick: () => {
                    console.log('Update action triggered')
                },
            },
        })
    }

    const showSnackbarWithCustomClose = () => {
        addSnackbar({
            header: 'Custom Close Handler',
            description: 'This snackbar has a custom close handler.',
            variant: SnackbarVariant.INFO,
            onClose: () => {
                console.log('Custom close handler triggered')
            },
        })
    }

    return (
        <div className="p-6 flex flex-col gap-6">
            {/* Component Description */}
            <div className="mb-4">
                <h1 className="text-2xl font-semibold mb-4">
                    Snackbar Component
                </h1>
                <p className="text-base text-gray-600">
                    Snackbars provide brief notifications or feedback messages
                    to users. They appear temporarily at the top of the screen
                    and can include actions.
                </p>
            </div>

            {/* StyledToast Playground */}
            <div className="flex flex-col gap-6">
                <h2 className="text-lg font-semibold">
                    StyledToast Playground
                </h2>
                <p className="text-sm text-gray-600">
                    Interactive preview of StyledToast component in all variants
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Info Variant */}
                    <div className="space-y-3">
                        <h3 className="text-md font-medium text-blue-800">
                            Info Variant
                        </h3>
                        <StyledToast
                            data-snackbar="popUpSnackbar"
                            header={'Data synced successfully'}
                            description={
                                'Your dashboard now shows the latest data. Please check it once'
                            }
                            variant={SnackbarVariant.INFO}
                            onClose={() => {}}
                            actionButton={{
                                label: 'View Dashboard',
                                onClick: () => {
                                    console.log(
                                        'View Dashboard action triggered'
                                    )
                                },
                            }}
                        />
                    </div>

                    {/* Success Variant */}
                    <div className="space-y-3">
                        <h3 className="text-md font-medium text-green-800">
                            Success Variant
                        </h3>
                        <StyledToast
                            header={'Payment processed successfully'}
                            description={
                                'Your payment of $150.00 has been processed and confirmed'
                            }
                            variant={SnackbarVariant.SUCCESS}
                            onClose={() => {}}
                            actionButton={{
                                label: 'View Receipt',
                                onClick: () => {
                                    console.log('View Receipt action triggered')
                                },
                            }}
                        />
                    </div>

                    {/* Warning Variant */}
                    <div className="space-y-3">
                        <h3 className="text-md font-medium text-yellow-800">
                            Warning Variant
                        </h3>
                        <StyledToast
                            header={'Storage space running low'}
                            description={
                                'You have used 95% of your storage. Consider upgrading your plan'
                            }
                            variant={SnackbarVariant.WARNING}
                            onClose={() => {}}
                            actionButton={{
                                label: 'Upgrade Plan',
                                onClick: () => {
                                    console.log('Upgrade Plan action triggered')
                                },
                            }}
                        />
                    </div>

                    {/* Error Variant */}
                    <div className="space-y-3">
                        <h3 className="text-md font-medium text-red-800">
                            Error Variant
                        </h3>
                        <StyledToast
                            header={'Connection failed'}
                            description={
                                'Unable to connect to the server. Please check your internet connection'
                            }
                            variant={SnackbarVariant.ERROR}
                            onClose={() => {}}
                            actionButton={{
                                label: 'Retry',
                                onClick: () => {
                                    console.log('Retry action triggered')
                                },
                            }}
                        />
                    </div>
                </div>

                {/* Toast without action button */}
                <div className="space-y-3">
                    <h3 className="text-md font-medium">
                        Without Action Button
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <StyledToast
                            header={'Settings updated'}
                            description={
                                'Your account preferences have been saved successfully'
                            }
                            variant={SnackbarVariant.SUCCESS}
                            onClose={() => {}}
                        />
                        <StyledToast
                            header={'Session expired'}
                            description={
                                'Please log in again to continue using the application'
                            }
                            variant={SnackbarVariant.WARNING}
                            onClose={() => {}}
                        />
                    </div>
                </div>
            </div>

            {/* Basic Variants */}
            <div className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold">Snackbar Variants</h2>
                <div className="flex gap-4 flex-wrap">
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        size={ButtonSize.MEDIUM}
                        onClick={showInfoSnackbar}
                        text="Info Snackbar"
                    />
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        size={ButtonSize.MEDIUM}
                        onClick={showSuccessSnackbar}
                        text="Success Snackbar"
                    />
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        size={ButtonSize.MEDIUM}
                        onClick={showWarningSnackbar}
                        text="Warning Snackbar"
                    />
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        size={ButtonSize.MEDIUM}
                        onClick={showErrorSnackbar}
                        text="Error Snackbar"
                    />
                </div>
            </div>

            {/* Advanced Usage */}
            <div className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold">Advanced Usage</h2>
                <div className="flex gap-4 flex-wrap">
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.MEDIUM}
                        onClick={showSnackbarWithAction}
                        text="Snackbar with Action"
                    />
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.MEDIUM}
                        onClick={showSnackbarWithCustomClose}
                        text="Custom Close Handler"
                    />
                </div>
            </div>

            {/* Position Examples */}
            <div className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold">Position Options</h2>
                <p className="text-sm text-gray-600">
                    Control where snackbars appear on the screen.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.MEDIUM}
                        onClick={() =>
                            addSnackbar({
                                header: 'Top Left',
                                description: 'Snackbar appears at top left',
                                variant: SnackbarVariant.INFO,
                                position: 'top-left',
                            })
                        }
                        text="Top Left"
                    />
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.MEDIUM}
                        onClick={() =>
                            addSnackbar({
                                header: 'Top Center',
                                description: 'Snackbar appears at top center',
                                variant: SnackbarVariant.SUCCESS,
                                position: 'top-center',
                            })
                        }
                        text="Top Center"
                    />
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.MEDIUM}
                        onClick={() =>
                            addSnackbar({
                                header: 'Top Right',
                                description: 'Snackbar appears at top right',
                                variant: SnackbarVariant.WARNING,
                                position: 'top-right',
                            })
                        }
                        text="Top Right"
                    />
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.MEDIUM}
                        onClick={() =>
                            addSnackbar({
                                header: 'Bottom Left',
                                description: 'Snackbar appears at bottom left',
                                variant: SnackbarVariant.ERROR,
                                position: 'bottom-left',
                            })
                        }
                        text="Bottom Left"
                    />
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.MEDIUM}
                        onClick={() =>
                            addSnackbar({
                                header: 'Bottom Center',
                                description:
                                    'Snackbar appears at bottom center',
                                variant: SnackbarVariant.INFO,
                                position: 'bottom-center',
                            })
                        }
                        text="Bottom Center"
                    />
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.MEDIUM}
                        onClick={() =>
                            addSnackbar({
                                header: 'Bottom Right',
                                description: 'Snackbar appears at bottom right',
                                variant: SnackbarVariant.SUCCESS,
                                position: 'bottom-right',
                            })
                        }
                        text="Bottom Right"
                    />
                </div>
            </div>

            {/* Usage Examples */}
            <div className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold">Usage Examples</h2>
                <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="text-sm font-medium mb-2">
                            Basic Snackbar
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                            Simple notification with header and description.
                        </p>
                        <Button
                            buttonType={ButtonType.SECONDARY}
                            size={ButtonSize.SMALL}
                            onClick={() =>
                                addSnackbar({
                                    header: 'Basic Notification',
                                    description:
                                        'This is a basic snackbar notification.',
                                    variant: SnackbarVariant.INFO,
                                })
                            }
                            text="Show Basic"
                        />
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="text-sm font-medium mb-2">
                            Snackbar with Action
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                            Notification with an action button for user
                            interaction.
                        </p>
                        <Button
                            buttonType={ButtonType.SECONDARY}
                            size={ButtonSize.SMALL}
                            onClick={() =>
                                addSnackbar({
                                    header: 'Action Required',
                                    description:
                                        'Please confirm your email address.',
                                    variant: SnackbarVariant.WARNING,
                                    actionButton: {
                                        label: 'Confirm',
                                        onClick: () =>
                                            console.log(
                                                'Email confirmation triggered'
                                            ),
                                    },
                                })
                            }
                            text="Show with Action"
                        />
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="text-sm font-medium mb-2">
                            Auto-dismiss Snackbar
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                            Notification that automatically disappears after a
                            set time.
                        </p>
                        <Button
                            buttonType={ButtonType.SECONDARY}
                            size={ButtonSize.SMALL}
                            onClick={() =>
                                addSnackbar({
                                    header: 'Auto Dismiss',
                                    description:
                                        'This notification will disappear automatically.',
                                    variant: SnackbarVariant.SUCCESS,
                                })
                            }
                            text="Show Auto-dismiss"
                        />
                    </div>
                </div>
            </div>

            {/* Multiple Snackbars Demo */}
            <div className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold">Multiple Snackbars</h2>
                <p className="text-sm text-gray-600">
                    Test how multiple snackbars stack and behave when shown in
                    sequence.
                </p>
                <div className="flex gap-4 flex-wrap">
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.MEDIUM}
                        onClick={() => {
                            addSnackbar({
                                header: 'First Notification',
                                description: 'This is the first notification.',
                                variant: SnackbarVariant.INFO,
                            })
                            setTimeout(() => {
                                addSnackbar({
                                    header: 'Second Notification',
                                    description:
                                        'This is the second notification.',
                                    variant: SnackbarVariant.SUCCESS,
                                })
                            }, 500)
                            setTimeout(() => {
                                addSnackbar({
                                    header: 'Third Notification',
                                    description:
                                        'This is the third notification.',
                                    variant: SnackbarVariant.WARNING,
                                })
                            }, 1000)
                        }}
                        text="Show Multiple"
                    />
                </div>
            </div>

            {/* Variant Showcase */}
            <div className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold">All Variants Showcase</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
                        <h3 className="text-sm font-medium text-blue-800 mb-2">
                            Info Variant
                        </h3>
                        <p className="text-sm text-blue-600 mb-3">
                            Used for general information and neutral messages.
                        </p>
                        <Button
                            buttonType={ButtonType.PRIMARY}
                            size={ButtonSize.SMALL}
                            onClick={showInfoSnackbar}
                            text="Show Info"
                        />
                    </div>

                    <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                        <h3 className="text-sm font-medium text-green-800 mb-2">
                            Success Variant
                        </h3>
                        <p className="text-sm text-green-600 mb-3">
                            Used for successful operations and positive
                            feedback.
                        </p>
                        <Button
                            buttonType={ButtonType.SUCCESS}
                            size={ButtonSize.SMALL}
                            onClick={showSuccessSnackbar}
                            text="Show Success"
                        />
                    </div>

                    <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                        <h3 className="text-sm font-medium text-yellow-800 mb-2">
                            Warning Variant
                        </h3>
                        <p className="text-sm text-yellow-600 mb-3">
                            Used for warnings and cautionary messages.
                        </p>
                        <Button
                            buttonType={ButtonType.SECONDARY}
                            size={ButtonSize.SMALL}
                            onClick={showWarningSnackbar}
                            text="Show Warning"
                        />
                    </div>

                    <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                        <h3 className="text-sm font-medium text-red-800 mb-2">
                            Error Variant
                        </h3>
                        <p className="text-sm text-red-600 mb-3">
                            Used for errors and critical messages.
                        </p>
                        <Button
                            buttonType={ButtonType.DANGER}
                            size={ButtonSize.SMALL}
                            onClick={showErrorSnackbar}
                            text="Show Error"
                        />
                    </div>
                </div>
            </div>

            {/* Snackbar Component (required for the toasts to appear) */}
            {/* <Snackbar position="top-right" /> */}
        </div>
    )
}

export default SnackbarDemo
