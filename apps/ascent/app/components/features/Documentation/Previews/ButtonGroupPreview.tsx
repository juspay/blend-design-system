'use client'

import {
    ButtonGroup,
    Button,
    ButtonType,
    ButtonSize,
} from '@juspay/blend-design-system'
import React from 'react'
import ComponentPreview from './ComponentPreview'

const tsCode = `import { ButtonGroup, Button, ButtonType, ButtonSize } from 'blend-v1'

function MyComponent() {
    return (
        <ButtonGroup stacked={false}>
            <Button
                text="Cancel"
                buttonType={ButtonType.SECONDARY}
                size={ButtonSize.MEDIUM}
                onClick={() => console.log('Cancel clicked')}
            />
            <Button
                text="Save Changes"
                buttonType={ButtonType.PRIMARY}
                size={ButtonSize.MEDIUM}
                onClick={() => console.log('Save clicked')}
            />
        </ButtonGroup>
    )
}`

const reCode = `type buttonGroupProps = {
  stacked?: bool,
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

const bindingCode = `@module("blend-v1") @react.component
external make: (
  ~stacked: bool=?,
  ~children: React.element,
) => React.element = "ButtonGroup"`

const ButtonGroupPreview = () => {
    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <ButtonGroup stacked={false}>
                <Button
                    text="Cancel"
                    buttonType={ButtonType.SECONDARY}
                    size={ButtonSize.MEDIUM}
                    onClick={() => console.log('Cancel clicked')}
                />
                <Button
                    text="Save Changes"
                    buttonType={ButtonType.PRIMARY}
                    size={ButtonSize.MEDIUM}
                    onClick={() => console.log('Save clicked')}
                />
            </ButtonGroup>
        </ComponentPreview>
    )
}

export default ButtonGroupPreview
