'use client'
import { Alert, AlertVariant, AlertStyle } from 'blend-v1'
import React from 'react'
import ComponentPreview from './ComponentPreview'

const AlertPreview = () => {
    const tsCode = `import { Alert, AlertVariant, AlertStyle } from "blend-v1";

function MyComponent() {
  return (
    <Alert
      heading="Success!"
      description="Your changes have been saved successfully."
      variant={AlertVariant.SUCCESS}
      style={AlertStyle.SUBTLE}
      onClose={() => console.log("closed")}
    />
  );
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

    const bindingCode = `@module("blend-v1") @react.component
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
                heading="Success!"
                description="Your changes have been saved successfully."
                variant={AlertVariant.SUCCESS}
                style={AlertStyle.SUBTLE}
                onClose={() => console.log('closed')}
            />
        </ComponentPreview>
    )
}

export default AlertPreview
