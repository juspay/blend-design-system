'use client'
import {
    TooltipV2,
    Button,
    ButtonType,
    TooltipV2Side,
} from '@juspay/blend-design-system'
import React from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const TooltipV2Preview = () => {
    const tsCode = `import {
    TooltipV2,
    Button,
    TooltipV2Side
} from '@juspay/blend-design-system'

function MyComponent() {
    return (
        <TooltipV2
            content="This is helpful information"
            side={TooltipV2Side.TOP}
            showArrow={true}
        >
            <Button text="Hover me" />
        </TooltipV2>
    )
}`

    const reCode = `type tooltipV2Side = [#top | #right | #bottom | #left]

@react.component
let make = () => {
  <TooltipV2Binding
    content="This is helpful information"
    side=#top
    showArrow={true}
  >
    <ButtonBinding text="Hover me" />
  </TooltipV2Binding>
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~content: React.element,
  ~side: [#top | #right | #bottom | #left]=?,
  ~align: [#start | #center | #end]=?,
  ~showArrow: bool=?,
  ~delayDuration: int=?,
  ~children: React.element,
) => React.element = "TooltipV2"`

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <TooltipV2
                content="This is helpful information"
                side={TooltipV2Side.TOP}
                showArrow={true}
            >
                <Button text="Hover me" buttonType={ButtonType.PRIMARY} />
            </TooltipV2>
        </ComponentPreview>
    )
}

export default TooltipV2Preview
