'use client'
import { ButtonGroup, Button, ButtonType } from '@juspay/blend-design-system'
import React from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const ButtonGroupV2Preview = () => {
    const tsCode = `import { ButtonGroupV2, Button, ButtonType } from "@juspay/blend-design-system";

function MyComponent() {
  return (
    <ButtonGroupV2 stacked={true}>
      <Button text="Cancel" buttonType={ButtonType.SUCCESS} />
      <Button text="Save" buttonType={ButtonType.PRIMARY} />
    </ButtonGroupV2>
  );
}`

    const reCode = `type buttonGroupV2Props = {
  stacked: option<bool>,
  children: React.element,
}

@react.component
let make = (
  ~stacked: option<bool>=?,
  ~children: React.element,
) => {
  <ButtonGroupV2Binding ?stacked>
    {children}
  </ButtonGroupV2Binding>
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~stacked: bool=?,
  ~children: React.element,
) => React.element = "ButtonGroupV2"`

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

export default ButtonGroupV2Preview
