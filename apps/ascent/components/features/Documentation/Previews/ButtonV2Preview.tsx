'use client'
import {
    ButtonV2,
    ButtonV2Type,
    ButtonV2Size,
    ButtonV2SubType,
} from '@juspay/blend-design-system'
import React from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const ButtonV2Preview = () => {
    const tsCode = `import {
    ButtonV2,
    ButtonV2Type,
    ButtonV2Size,
    ButtonV2SubType,
} from '@juspay/blend-design-system'

function MyComponent() {
    return (
        <ButtonV2
            buttonType={ButtonV2Type.PRIMARY}
            size={ButtonV2Size.MEDIUM}
            subType={ButtonV2SubType.DEFAULT}
            text="Click me"
            onClick={() => console.log('Clicked')}
        />
    )
}`

    const reCode = `type buttonV2Type = [#primary | #secondary | #danger | #success]
type buttonV2Size = [#sm | #md | #lg]
type buttonV2SubType = [#default | #iconOnly | #inline]

@react.component
let make = () => {
  <ButtonV2Binding
    buttonType=#primary
    size=#md
    subType=#default
    text="Click me"
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~buttonType: [#primary | #secondary | #danger | #success]=?,
  ~size: [#sm | #md | #lg]=?,
  ~subType: [#default | #iconOnly | #inline]=?,
  ~text: string=?,
  ~leftSlot: {slot: React.element, maxHeight: string}=?,
  ~rightSlot: {slot: React.element, maxHeight: string}=?,
  ~loading: bool=?,
  ~disabled: bool=?,
  ~onClick: unit => unit=?,
  ~width: string=?,
  ~fullWidth: bool=?,
) => React.element = "ButtonV2"`

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <ButtonV2
                buttonType={ButtonV2Type.PRIMARY}
                size={ButtonV2Size.MEDIUM}
                subType={ButtonV2SubType.DEFAULT}
                text="Click me"
                onClick={() => console.log('Clicked')}
            />
        </ComponentPreview>
    )
}

export default ButtonV2Preview
