'use client'
import { ButtonGroupV2, Button, ButtonType } from 'blend-v1'
import React from 'react'
import ComponentPreview from './ComponentPreview'

const ButtonGroupV2Preview = () => {
    const tsCode = `import { ButtonGroupV2, Button, ButtonType } from "blend-v1";

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

    const bindingCode = `@module("blend-v1") @react.component
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
            <ButtonGroupV2 stacked={true}>
                <Button text="Cancel" buttonType={ButtonType.SUCCESS} />
                <Button text="Save" buttonType={ButtonType.PRIMARY} />
            </ButtonGroupV2>
        </ComponentPreview>
    )
}

export default ButtonGroupV2Preview
