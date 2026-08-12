'use client'
import {
    SnackbarV2,
    ButtonV2 as Button,
    ButtonV2Type as ButtonType,
    addSnackbarV2,
} from '@juspay/blend-design-system'
import React from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const SnackbarV2Preview = () => {
    const tsCode = `import {
    SnackbarV2,
    addSnackbarV2,
    SnackbarV2Variant,
    SnackbarV2Position
} from '@juspay/blend-design-system'

function App() {
    return (
        <SnackbarV2
            position={SnackbarV2Position.TOP_RIGHT}
            dismissOnClickAway={true}
        />
    )
}

// Show toast
addSnackbarV2({
    header: 'Success!',
    description: 'Changes saved.',
    variant: SnackbarV2Variant.SUCCESS,
})`

    const reCode = `@react.component
let make = () => {
  <SnackbarV2Binding position=#"top-right" dismissOnClickAway={true} />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~position: [#"top-left" | #"top-right" | #"bottom-left" | #"bottom-right" | #"top-center" | #"bottom-center"]=?,
  ~dismissOnClickAway: bool=?,
  ~maxWidth: string=?,
) => React.element = "SnackbarV2"

@module("@juspay/blend-design-system")
external addSnackbarV2: (
  ~header: string,
  ~description: string=?,
  ~variant: [#info | #success | #warning | #error]=?,
  ~slot: React.element=?,
  ~duration: int=?,
  ~position: [#"top-left" | #"top-right" | #"bottom-left" | #"bottom-right" | #"top-center" | #"bottom-center"]=?,
  ~actionButton: {label: string, onClick: unit => unit, autoDismiss?: bool}=?,
  ~onClose: unit => unit=?,
  ~maxWidth: string=?,
  ~minWidth: string=?,
  ~width: string=?,
) => unit = "addSnackbarV2"`

    const showToast = () => {
        addSnackbarV2({
            header: 'Success!',
            description: 'Your changes have been saved successfully.',
        })
    }

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <>
                <Button
                    text="Show Toast"
                    buttonType={ButtonType.PRIMARY}
                    onClick={showToast}
                />
                <SnackbarV2 />
            </>
        </ComponentPreview>
    )
}

export default SnackbarV2Preview
