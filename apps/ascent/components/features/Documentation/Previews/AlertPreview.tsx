'use client'
import { Alert, AlertVariant, AlertStyle } from '@juspay/blend-design-system'
import React from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const AlertPreview = () => {
    const tsCode = `import { Alert, AlertVariant, AlertStyle, AlertActionPlacement } from '@juspay/blend-design-system'

function MyComponent() {
    return (
        <Alert
            heading="Update Available"
            description="A new version of the application is available. Please update to get the latest features."
            variant={AlertVariant.PRIMARY}
            style={AlertStyle.SUBTLE}
            primaryAction={{
                label: "Update Now",
                onClick: () => console.log("Update clicked")
            }}
            secondaryAction={{
                label: "Later",
                onClick: () => console.log("Later clicked")
            }}
            onClose={() => console.log("Alert dismissed")}
        />
    )
}`

    const reCode = `type alertVariant = [#primary | #success | #warning | #error | #purple | #orange | #neutral]
type alertStyle = [#subtle | #noFill]
type alertActionPlacement = [#bottom | #right]
type alertAction = {
  label: string,
  onClick: unit => unit,
}

@react.component
let make = (
  ~heading: string,
  ~description: string,
  ~variant: option<alertVariant>=?,
  ~style: option<alertStyle>=?,
  ~primaryAction: option<alertAction>=?,
  ~secondaryAction: option<alertAction>=?,
  ~onClose: option<unit => unit>=?,
  ~icon: option<React.element>=?,
  ~actionPlacement: option<alertActionPlacement>=?,
) => {
  <AlertBinding
    ?heading
    ?description
    ?variant
    ?style
    ?primaryAction
    ?secondaryAction
    ?onClose
    ?icon
    ?actionPlacement
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~heading: string,
  ~description: string,
  ~variant: [#primary | #success | #warning | #error | #purple | #orange | #neutral]=?,
  ~style: [#subtle | #noFill]=?,
  ~primaryAction: {label: string, onClick: unit => unit}=?,
  ~secondaryAction: {label: string, onClick: unit => unit}=?,
  ~onClose: unit => unit=?,
  ~icon: React.element=?,
  ~actionPlacement: [#bottom | #right]=?,
) => React.element = "Alert"`

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <Alert
                heading="Update Available"
                description="A new version of the application is available. Please update to get the latest features."
                variant={AlertVariant.PRIMARY}
                style={AlertStyle.SUBTLE}
                primaryAction={{
                    label: 'Update Now',
                    onClick: () => console.log('Update clicked'),
                }}
                secondaryAction={{
                    label: 'Later',
                    onClick: () => console.log('Later clicked'),
                }}
                onClose={() => console.log('Alert dismissed')}
            />
        </ComponentPreview>
    )
}

export default AlertPreview
