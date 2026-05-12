'use client'
import {
    SnackbarV2,
    Button,
    ButtonType,
    addSnackbarV2,
} from '@juspay/blend-design-system'
import React from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const SnackbarV2Preview = () => {
    const tsCode = `import {
    SnackbarV2,
    addSnackbarV2,
    SnackbarV2Variant
} from '@juspay/blend-design-system'

function App() {
    return (
        <SnackbarV2
            position="top-right"
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
) => React.element = "SnackbarV2"

@module("@juspay/blend-design-system")
external toast: (
  ~header: string,
  ~description: string=?,
  ~variant: [#info | #success | #warning | #error]=?,
) => unit = "toast"`

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
