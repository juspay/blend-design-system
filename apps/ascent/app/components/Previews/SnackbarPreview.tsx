'use client'
import { Snackbar, addSnackbar, SnackbarVariant } from 'blend-v1'
import React, { useState } from 'react'
import ComponentPreview from './ComponentPreview'

const SnackbarPreview = () => {
    const [isToasterVisible, setIsToasterVisible] = useState(false)

    const tsCode = `import { Snackbar, addSnackbar, SnackbarVariant } from "blend-v1";

function MyComponent() {
  const showSnackbar = () => {
    addSnackbar({
      header: "Success!",
      description: "Your action was completed successfully.",
      variant: SnackbarVariant.SUCCESS,
      onClose: () => console.log("Snackbar closed"),
      actionButton: {
        label: "Undo",
        onClick: () => console.log("Undo clicked"),
      },
    });
  };

  return (
    <div>
      <button onClick={showSnackbar}>Show Snackbar</button>
      <Snackbar />
    </div>
  );
}`

    const reCode = `type snackbarVariant = [#info | #success | #warning | #error]

@react.component
let make = () => {
  <SnackbarBinding />
}

let addSnackbar = (
  ~header: string,
  ~description: option<string>=?,
  ~variant: option<snackbarVariant>=?,
  ~onClose: option<unit => unit>=?,
  ~actionButton: option<{label: string, onClick: unit => unit}>=?,
) => {
  AddSnackbarBinding.addSnackbar(
    ~header,
    ?description,
    ?variant,
    ?onClose,
    ?actionButton,
  )
}`

    const bindingCode = `@module("blend-v1") @react.component
external make: unit => React.element = "Snackbar"

@module("blend-v1")
external addSnackbar: (
  ~header: string,
  ~description: string=?,
  ~variant: [#info | #success | #warning | #error]=?,
  ~onClose: unit => unit=?,
  ~actionButton: {label: string, onClick: unit => unit}=?,
) => unit = "addSnackbar"`

    const showInfoSnackbar = () => {
        addSnackbar({
            header: 'Information',
            description:
                'This is an informational message with some additional details.',
            variant: SnackbarVariant.INFO,
            onClose: () => console.log('Info snackbar closed'),
        })
    }

    const showSuccessSnackbar = () => {
        addSnackbar({
            header: 'Success!',
            description: 'Your action was completed successfully.',
            variant: SnackbarVariant.SUCCESS,
            onClose: () => console.log('Success snackbar closed'),
            actionButton: {
                label: 'Undo',
                onClick: () => console.log('Undo clicked'),
            },
        })
    }

    const showWarningSnackbar = () => {
        addSnackbar({
            header: 'Warning',
            description: 'Please review your input before proceeding.',
            variant: SnackbarVariant.WARNING,
            onClose: () => console.log('Warning snackbar closed'),
            actionButton: {
                label: 'Review',
                onClick: () => console.log('Review clicked'),
            },
        })
    }

    const showErrorSnackbar = () => {
        addSnackbar({
            header: 'Error',
            description: 'Something went wrong. Please try again.',
            variant: SnackbarVariant.ERROR,
            onClose: () => console.log('Error snackbar closed'),
            actionButton: {
                label: 'Retry',
                onClick: () => console.log('Retry clicked'),
            },
        })
    }
    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <div className="m-4 min-w-100 space-y-6">
                <div>
                    <h3 className="text-lg font-semibold mb-4">
                        Snackbar Variants
                    </h3>
                    <div className="flex flex-wrap gap-4">
                        <button
                            onClick={showInfoSnackbar}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Info Snackbar
                        </button>
                        <button
                            onClick={showSuccessSnackbar}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                            Success Snackbar
                        </button>
                        <button
                            onClick={showWarningSnackbar}
                            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        >
                            Warning Snackbar
                        </button>
                        <button
                            onClick={showErrorSnackbar}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Error Snackbar
                        </button>
                    </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 text-blue-800">
                        Features:
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-blue-700">
                        <li>Four variants: Info, Success, Warning, Error</li>
                        <li>Optional description text</li>
                        <li>Optional action button</li>
                        <li>Auto-dismiss functionality</li>
                        <li>Manual close button</li>
                        <li>Customizable styling through tokens</li>
                    </ul>
                </div>
            </div>

            {/* Snackbar component - must be rendered for the preview to work */}
            <Snackbar />
        </ComponentPreview>
    )
}

export default SnackbarPreview
