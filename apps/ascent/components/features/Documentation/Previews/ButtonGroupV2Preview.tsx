'use client'
import {
    ButtonGroupV2,
    ButtonV2,
    ButtonV2Type,
} from '@juspay/blend-design-system'
import React from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const ButtonGroupV2Preview = () => {
    const tsCode = `import { ButtonGroupV2, ButtonV2, ButtonV2Type } from "@juspay/blend-design-system";

function MyComponent() {
  return (
    <ButtonGroupV2 stacked={true}>
      <ButtonV2 text="Cancel" buttonType={ButtonV2Type.SUCCESS} />
      <ButtonV2 text="Save" buttonType={ButtonV2Type.PRIMARY} />
    </ButtonGroupV2>
  );
}`

    const reCode = `type ButtonGroupV2Props = {
  stacked: option<bool>,
  gap: option<string>,
  children: React.element,
}

@react.component
let make = (
  ~stacked: option<bool>=?,
  ~gap: option<string>=?,
  ~children: React.element,
) => {
  <ButtonGroupV2Binding ?stacked ?gap>
    {children}
  </ButtonGroupV2Binding>
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~stacked: bool=?,
  ~gap: string=?,
  ~children: React.element,
) => React.element = "ButtonGroupV2"`

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <ButtonGroupV2 stacked={true}>
                <ButtonV2 text="Cancel" buttonType={ButtonV2Type.SUCCESS} />
                <ButtonV2 text="Save" buttonType={ButtonV2Type.PRIMARY} />
            </ButtonGroupV2>
        </ComponentPreview>
    )
}

export default ButtonGroupV2Preview
