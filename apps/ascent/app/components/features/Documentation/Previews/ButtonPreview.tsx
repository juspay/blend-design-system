'use client'
import { ButtonType, Button } from '@juspay/blend-design-system'
import React from 'react'
import ComponentPreview from './ComponentPreview'

const ButtonPreview = () => {
    const tsCode = `import { Button, ButtonVariant, ButtonSize } from "@juspay/blend-design-system";

function MyComponent() {
  return (
    <Button
      variant={ButtonVariant.SECONDARY}
      size={ButtonSize.Medium}
      text="Click me"
      onClick={() => console.log("clicked")}
    />
  );
}`
    const reCode = `type buttonType = [#primary | #secondary | #danger | #success]
type buttonSize = [#sm | #md | #lg]
type buttonSubType = [#default | #iconOnly | #inline]
type buttonActionType = [#button | #submit | #reset]
type justifyContent =
  | @as("flex-start") FlexStart
  | @as("flex-end") FlexEnd
  | @as("center") Center
  | @as("space-between") SpaceBetween
  | @as("space-around") SpaceAround

@react.component
let make = (
  ~buttonType: option<buttonType>=?,
  ~size: option<buttonSize>=?,
  ~disabled: option<bool>=?,
  ~onClick: option<ReactEvent.Mouse.t => unit>=?,
  ~text: option<string>=?,
  ~subType: option<buttonSubType>=?,
  ~loading: option<bool>=?,
  ~leadingIcon: option<React.element>=?,
  ~trailingIcon: option<React.element>=?,
  ~id: option<string>=?,
  ~name: option<string>=?,
  ~justifyContent: option<justifyContent>=?,
  ~type_: option<buttonActionType>=?,
  ~ariaLabel: option<string>=?,
  ~fullWidth: option<bool>=?,
  ~tabIndex: option<int>=?,
  ~dataTestId: option<string>=?,
  ~isCapitalized: bool=false,
) => {
  let widthClass = fullWidth->Option.getOr(false) ? "w-full" : "w-fit"
  <div
    className={\`whitespace-nowrap \${widthClass} \${isCapitalized
        ? "button-capitalised"
        : "button-default"}\`}>
    <ButtonBinding
      ?buttonType
      ?size
      ?disabled
      ?onClick
      ?text
      ?subType
      ?loading
      ?leadingIcon
      ?trailingIcon
      ?id
      ?name
      ?type_
      ?ariaLabel
      ?fullWidth
      ?tabIndex
      ?dataTestId
      justifyContent=?{justifyContent->Option.map(jc => (jc :> string))}
    />
  </div>
}`
    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~buttonType: [#primary | #secondary | #danger | #success]=?,
  ~size: [#sm | #md | #lg]=?,
  ~disabled: bool=?,
  ~onClick: ReactEvent.Mouse.t => unit=?,
  ~className: string=?,
  ~text: string=?,
  ~subType: [#default | #iconOnly | #inline]=?,
  ~loading: bool=?,
  ~children: React.element=?,
  ~leadingIcon: React.element=?,
  ~trailingIcon: React.element=?,
  ~justifyContent: string=?,
  ~id: string=?,
  ~name: string=?,
  ~type_: [#button | #submit | #reset]=?,
  ~ariaLabel: string=?,
  ~fullWidth: bool=?,
  ~tabIndex: int=?,
  ~dataTestId: string=?,
) => React.element = "Button"`
    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <Button text="Click me" buttonType={ButtonType.PRIMARY} />
        </ComponentPreview>
    )
}

export default ButtonPreview
