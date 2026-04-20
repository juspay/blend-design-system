import { Snackbar, SnackbarPosition } from '../../../Snackbar'

const SnackbarLightHouse = () => {
    // Note: Snackbar is a provider component that renders toast notifications
    // To show notifications, use addSnackbar() function programmatically
    // Examples of addSnackbar usage:
    // addSnackbar({ header: 'Info', variant: SnackbarVariant.INFO })
    // addSnackbar({ header: 'Success', description: 'Message', variant: SnackbarVariant.SUCCESS })
    // addSnackbar({ header: 'Warning', actionButton: { label: 'Action', onClick: () => {} }, variant: SnackbarVariant.WARNING })
    // addSnackbar({ header: 'Error', onClose: () => {}, variant: SnackbarVariant.ERROR })

    return (
        <>
            {/* Snackbar Provider - Bottom Right */}
            <Snackbar position={SnackbarPosition.BOTTOM_RIGHT} />

            {/* Snackbar Provider - Bottom Left */}
            <Snackbar position={SnackbarPosition.BOTTOM_LEFT} />

            {/* Snackbar Provider - Top Right */}
            <Snackbar position={SnackbarPosition.TOP_RIGHT} />

            {/* Snackbar Provider - Top Left */}
            <Snackbar position={SnackbarPosition.TOP_LEFT} />

            {/* Snackbar Provider - Top Center */}
            <Snackbar position={SnackbarPosition.TOP_CENTER} />

            {/* Snackbar Provider - Bottom Center */}
            <Snackbar position={SnackbarPosition.BOTTOM_CENTER} />
        </>
    )
}

export default SnackbarLightHouse
