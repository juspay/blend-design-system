'use client'
import {
    Tooltip,
    TooltipSide,
    TooltipSize,
    Button,
    ButtonType,
} from '@juspay/blend-design-system'
import React from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const TooltipPreview = () => {
    const tsCode = `import { Tooltip, TooltipSide, TooltipSize, Button, ButtonType } from "@juspay/blend-design-system";

function MyComponent() {
  return (
    <Tooltip
      content="Click to save your changes"
      side={TooltipSide.TOP}
      size={TooltipSize.SMALL}
      showArrow={true}
      delayDuration={300}
    >
      <Button buttonType={ButtonType.PRIMARY}>
        Save Document
      </Button>
    </Tooltip>
  );
}`

    const reCode = `type tooltipSide = [#top | #right | #bottom | #left]
type tooltipAlign = [#start | #center | #end]
type tooltipSize = [#sm | #lg]
type tooltipSlotDirection = [#left | #right]

@react.component
let make = (
  ~content: React.element,
  ~children: React.element,
  ~side: option<tooltipSide>=?,
  ~align: option<tooltipAlign>=?,
  ~showArrow: option<bool>=?,
  ~size: option<tooltipSize>=?,
  ~slot: option<React.element>=?,
  ~slotDirection: option<tooltipSlotDirection>=?,
  ~delayDuration: option<int>=?,
  ~offset: option<int>=?,
  ~open: option<bool>=?,
) => {
  <TooltipBinding
    content
    ?side
    ?align
    ?showArrow
    ?size
    ?slot
    ?slotDirection
    ?delayDuration
    ?offset
    ?open
    children
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~content: React.element,
  ~children: React.element,
  ~side: [#top | #right | #bottom | #left]=?,
  ~align: [#start | #center | #end]=?,
  ~showArrow: bool=?,
  ~size: [#sm | #lg]=?,
  ~slot: React.element=?,
  ~slotDirection: [#left | #right]=?,
  ~delayDuration: int=?,
  ~offset: int=?,
  ~open: bool=?,
) => React.element = "Tooltip"`

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <div style={{ minWidth: '300px', textAlign: 'center' }}>
                <Tooltip
                    content="Click to save your changes"
                    side={TooltipSide.TOP}
                    size={TooltipSize.SMALL}
                    showArrow={true}
                    delayDuration={300}
                >
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        text="Hover for tooltip"
                    >
                        Save Document
                    </Button>
                </Tooltip>
            </div>
        </ComponentPreview>
    )
}

export default TooltipPreview
