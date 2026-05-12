'use client'
import { PopoverV2, Button, ButtonType } from '@juspay/blend-design-system'
import React from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const PopoverV2Preview = () => {
    const tsCode = `import { PopoverV2, Button, ButtonType } from '@juspay/blend-design-system'

function MyComponent() {
    return (
        <PopoverV2
            heading="Confirm Action"
            description="Are you sure you want to proceed with this action?"
            trigger={<Button text="Open Popover" buttonType={ButtonType.PRIMARY} />}
            primaryAction={{
                text: 'Confirm',
                buttonType: ButtonType.PRIMARY,
                onClick: () => console.log('Confirmed')
            }}
            secondaryAction={{
                text: 'Cancel',
                buttonType: ButtonType.SECONDARY,
                onClick: () => console.log('Cancelled')
            }}
        />
    )
}`

    const reCode = `@react.component
let make = () => {
  <PopoverV2Binding
    heading="Confirm Action"
    description="Are you sure you want to proceed?"
    trigger={<ButtonBinding text="Open Popover" />}
    primaryAction={{text: "Confirm", onClick: () => ()}}
    secondaryAction={{text: "Cancel", onClick: () => ()}}
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~trigger: React.element,
  ~children: React.element=?,
  ~heading: string=?,
  ~description: string=?,
  ~showCloseButton: bool=?,
  ~primaryAction: {text: string, buttonType: string, onClick: unit => unit}=?,
  ~secondaryAction: {text: string, buttonType: string, onClick: unit => unit}=?,
  ~size: [#sm | #md | #lg]=?,
) => React.element = "PopoverV2"`

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <PopoverV2
                heading="Confirm Action"
                description="Are you sure you want to proceed with this action?"
                trigger={
                    <Button
                        text="Open Popover"
                        buttonType={ButtonType.PRIMARY}
                    />
                }
                primaryAction={{
                    text: 'Confirm',
                    buttonType: ButtonType.PRIMARY,
                    onClick: () => console.log('Confirmed'),
                }}
                secondaryAction={{
                    text: 'Cancel',
                    buttonType: ButtonType.SECONDARY,
                    onClick: () => console.log('Cancelled'),
                }}
            />
        </ComponentPreview>
    )
}

export default PopoverV2Preview
