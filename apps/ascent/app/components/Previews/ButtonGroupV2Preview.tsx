'use client'
import { ButtonGroupV2, ButtonV2, ButtonTypeV2 } from 'blend-v1'
import React from 'react'
import ComponentPreview from './ComponentPreview'

const ButtonGroupV2Preview = () => {
    const tsCode = `import { ButtonGroupV2, ButtonV2, ButtonTypeV2 } from "blend-v1";

function MyComponent() {
  return (
    <ButtonGroupV2 stacked={true}>
      <ButtonV2 text="Cancel" buttonType={ButtonTypeV2.SUCCESS} />
      <ButtonV2 text="Save" buttonType={ButtonTypeV2.PRIMARY} />
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
                <ButtonV2 text="Cancel" buttonType={ButtonTypeV2.SUCCESS} />
                <ButtonV2 text="Save" buttonType={ButtonTypeV2.PRIMARY} />
            </ButtonGroupV2>
        </ComponentPreview>
    )
}

export default ButtonGroupV2Preview
