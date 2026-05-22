'use client'
import {
    TooltipV2,
    Button,
    ButtonType,
    TooltipV2Side,
    TooltipV2Align,
    TooltipV2Size,
} from '@juspay/blend-design-system'
import React from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const TooltipV2Preview = () => {
    const tsCode = `import {
    TooltipV2,
    Button,
    TooltipV2Side,
    TooltipV2Align,
    TooltipV2Size,
} from '@juspay/blend-design-system'

function MyComponent() {
    return (
        <>
            {/* Top with arrow */}
            <TooltipV2
                content="This is helpful information"
                side={TooltipV2Side.TOP}
                align={TooltipV2Align.CENTER}
                showArrow={true}
            >
                <Button text="Top" />
            </TooltipV2>

            {/* Bottom without arrow */}
            <TooltipV2
                content="Additional details here"
                side={TooltipV2Side.BOTTOM}
                showArrow={false}
            >
                <Button text="Bottom" />
            </TooltipV2>

            {/* Small size */}
            <TooltipV2
                content="Compact tooltip"
                side={TooltipV2Side.TOP}
                size={TooltipV2Size.SM}
                showArrow={true}
            >
                <Button text="Small" />
            </TooltipV2>
        </>
    )
}`

    const reCode = `type tooltipV2Side = [#top | #right | #bottom | #left]
type tooltipV2Align = [#start | #center | #end]
type tooltipV2Size = [#sm | #md | #lg]

@react.component
let make = () => {
  <>
    <TooltipV2Binding
      content="This is helpful information"
      side=#top
      align=#center
      showArrow={true}
    >
      <ButtonBinding text="Top" />
    </TooltipV2Binding>
    <TooltipV2Binding
      content="Additional details here"
      side=#bottom
      showArrow={false}
    >
      <ButtonBinding text="Bottom" />
    </TooltipV2Binding>
    <TooltipV2Binding
      content="Compact tooltip"
      side=#top
      size=#sm
      showArrow={true}
    >
      <ButtonBinding text="Small" />
    </TooltipV2Binding>
  </>
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~content: React.element,
  ~side: [#top | #right | #bottom | #left]=?,
  ~align: [#start | #center | #end]=?,
  ~size: [#sm | #md | #lg]=?,
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
            <div className="flex flex-wrap items-center justify-center gap-4">
                {/* Top with arrow */}
                <TooltipV2
                    content="This is helpful information"
                    side={TooltipV2Side.TOP}
                    align={TooltipV2Align.CENTER}
                    showArrow={true}
                >
                    <Button text="Top" buttonType={ButtonType.PRIMARY} />
                </TooltipV2>

                {/* Bottom without arrow */}
                <TooltipV2
                    content="Additional details here"
                    side={TooltipV2Side.BOTTOM}
                    showArrow={false}
                >
                    <Button text="Bottom" buttonType={ButtonType.SECONDARY} />
                </TooltipV2>

                {/* Small size */}
                <TooltipV2
                    content="Compact tooltip"
                    side={TooltipV2Side.TOP}
                    size={TooltipV2Size.SM}
                    showArrow={true}
                >
                    <Button text="Small" buttonType={ButtonType.SUCCESS} />
                </TooltipV2>
            </div>
        </ComponentPreview>
    )
}

export default TooltipV2Preview
