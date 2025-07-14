import { Toaster as Snackbar } from 'sonner'
import { AddToastOptions } from './types'
export declare const addSnackbar: ({
    header,
    description,
    variant,
    onClose,
    actionButton,
}: AddToastOptions) => string | number
export default Snackbar
