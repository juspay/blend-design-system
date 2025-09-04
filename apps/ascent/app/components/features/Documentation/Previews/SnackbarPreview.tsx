'use client'
import {
    Snackbar,
    addSnackbar,
    SnackbarVariant,
    Button,
    ButtonType,
} from '@juspay/blend-design-system'
import React from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const SnackbarPreview = () => {
    const tsCode = `import { Snackbar, addSnackbar, SnackbarVariant, Button, ButtonType } from "@juspay/blend-design-system";

function MyComponent() {
  const showSuccessSnackbar = () => {
    addSnackbar({
      header: "Document saved successfully",
      description: "Your changes have been saved and are now available.",
      variant: SnackbarVariant.SUCCESS,
      onClose: () => console.log("Snackbar closed"),
      actionButton: {
        label: "View",
        onClick: () => console.log("View clicked"),
      },
    });
  };

  return (
    <div>
      <Button 
        buttonType={ButtonType.SUCCESS}
        onClick={showSuccessSnackbar}
      >
        Show Success Notification
      </Button>
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
  ~duration: option<int>=?
) => {
  AddSnackbarBinding.addSnackbar(
    ~header,
    ?description,
    ?variant,
    ?onClose,
    ?actionButton,
    ?duration
  )
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: unit => React.element = "Snackbar"

@module("@juspay/blend-design-system")
external addSnackbar: (
  ~header: string,
  ~description: string=?,
  ~variant: [#info | #success | #warning | #error]=?,
  ~onClose: unit => unit=?,
  ~actionButton: {label: string, onClick: unit => unit}=?,
  ~duration: int=?
) => unit = "addSnackbar"`

    const showSuccessSnackbar = () => {
        addSnackbar({
            header: 'Document saved successfully',
            description: 'Your changes have been saved and are now available.',
            variant: SnackbarVariant.SUCCESS,
            onClose: () => console.log('Snackbar closed'),
            actionButton: {
                label: 'View',
                onClick: () => console.log('View clicked'),
            },
        })
    }

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <div style={{ minWidth: '300px' }}>
                <Button
                    buttonType={ButtonType.SUCCESS}
                    onClick={showSuccessSnackbar}
                    text="Show Success Notification"
                ></Button>
            </div>

            {/* Snackbar component - must be rendered for the preview to work */}
            <Snackbar />
        </ComponentPreview>
    )
}

export default SnackbarPreview
