'use client'
import {
    AlertV2,
    AlertV2Type,
    AlertV2SubType,
} from '@juspay/blend-design-system'
import React from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const AlertV2Preview = () => {
    const tsCode = `import { AlertV2, AlertV2Type, AlertV2SubType } from '@juspay/blend-design-system'

function MyComponent() {
    return (
        <AlertV2
            type={AlertV2Type.SUCCESS}
            subType={AlertV2SubType.SUBTLE}
            heading="Success"
            description="Your changes have been saved successfully."
            actions={{
                position: AlertV2ActionPosition.RIGHT,
                primaryAction: {
                    text: 'View Changes',
                    onClick: () => console.log('View clicked')
                }
            }}
            closeButton={{
                show: true,
                onClick: () => console.log('Closed')
            }}
        />
    )
}`

    const reCode = `type alertV2Type = [#primary | #success | #warning | #error | #purple | #orange | #neutral]
type alertV2SubType = [#subtle | #noFill]

@react.component
let make = () => {
  <AlertV2Binding
    type_=#success
    subType=#subtle
    heading="Success"
    description="Your changes have been saved successfully."
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~type_: [#primary | #success | #warning | #error | #purple | #orange | #neutral]=?,
  ~subType: [#subtle | #noFill]=?,
  ~heading: string=?,
  ~description: string=?,
  ~slot: {slot: React.element, maxHeight: string}=?,
  ~actions: {position: [#bottom | #right], primaryAction: {text: string, onClick: unit => unit}}=?,
  ~closeButton: {show: bool, onClick: unit => unit}=?,
) => React.element = "AlertV2"`

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <AlertV2
                type={AlertV2Type.SUCCESS}
                subType={AlertV2SubType.SUBTLE}
                heading="Success"
                description="Your changes have been saved successfully."
                closeButton={{
                    show: true,
                    onClick: () => console.log('Closed'),
                }}
            />
        </ComponentPreview>
    )
}

export default AlertV2Preview
