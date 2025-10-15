'use client'
import { ButtonGroup, Button, ButtonType } from '@juspay/blend-design-system'
import React from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const ButtonGroupPreview = () => {
    const tsCode = `import { ButtonGroup, Button, ButtonType } from "@juspay/blend-design-system";

function MyComponent() {
  return (
    <ButtonGroup stacked={true}>
      <Button text="Cancel" buttonType={ButtonType.SUCCESS} />
      <Button text="Save" buttonType={ButtonType.PRIMARY} />
    </ButtonGroup>
  );
}`

    const reCode = `type ButtonGroupProps = {
  stacked: option<bool>,
  children: React.element,
}

@react.component
let make = (
  ~stacked: option<bool>=?,
  ~children: React.element,
) => {
  <ButtonGroupBinding ?stacked>
    {children}
  </ButtonGroupBinding>
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~stacked: bool=?,
  ~children: React.element,
) => React.element = "ButtonGroup"`

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <ButtonGroup stacked={true}>
                <Button text="Cancel" buttonType={ButtonType.SUCCESS} />
                <Button text="Save" buttonType={ButtonType.PRIMARY} />
            </ButtonGroup>
        </ComponentPreview>
    )
}

export default ButtonGroupPreview
