'use client'
import {
    Tooltip,
    TooltipSide,
    TooltipSize,
    TooltipSlotDirection,
} from '@juspay/blend-design-system'
import React from 'react'
import ComponentPreview from './ComponentPreview'

const TooltipPreview = () => {
    const tsCode = `import { Tooltip, TooltipSide, TooltipAlign, TooltipSize, TooltipSlotDirection } from "@juspay/blend-design-system";

function MyComponent() {
  return (
    <Tooltip
      content="This is a helpful tooltip"
      side={TooltipSide.TOP}
      align={TooltipAlign.CENTER}
      size={TooltipSize.SMALL}
      showArrow={true}
      delayDuration={300}
    >
      <button>Hover me</button>
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
            <div className="m-4 min-w-100 space-y-8">
                {/* Basic Tooltip */}
                <div className="flex items-center gap-4">
                    <Tooltip content="This is a basic tooltip">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                            Basic Tooltip
                        </button>
                    </Tooltip>
                </div>

                {/* Tooltip with different positions */}
                <div className="flex items-center gap-4">
                    <Tooltip content="Top tooltip" side={TooltipSide.TOP}>
                        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                            Top
                        </button>
                    </Tooltip>

                    <Tooltip content="Right tooltip" side={TooltipSide.RIGHT}>
                        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                            Right
                        </button>
                    </Tooltip>

                    <Tooltip content="Bottom tooltip" side={TooltipSide.BOTTOM}>
                        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                            Bottom
                        </button>
                    </Tooltip>

                    <Tooltip content="Left tooltip" side={TooltipSide.LEFT}>
                        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                            Left
                        </button>
                    </Tooltip>
                </div>

                {/* Tooltip with slot */}
                <div className="flex items-center gap-4">
                    <Tooltip
                        content="Tooltip with icon"
                        slot={<span className="text-yellow-400">⚠️</span>}
                        slotDirection={TooltipSlotDirection.LEFT}
                    >
                        <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
                            With Icon (Left)
                        </button>
                    </Tooltip>

                    <Tooltip
                        content="Tooltip with icon on right"
                        slot={<span className="text-blue-400">ℹ️</span>}
                        slotDirection={TooltipSlotDirection.RIGHT}
                    >
                        <button className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
                            With Icon (Right)
                        </button>
                    </Tooltip>
                </div>

                {/* Large tooltip */}
                <div className="flex items-center gap-4">
                    <Tooltip
                        content="This is a large tooltip with more content to demonstrate the larger size variant"
                        size={TooltipSize.LARGE}
                    >
                        <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                            Large Tooltip
                        </button>
                    </Tooltip>
                </div>

                {/* Tooltip without arrow */}
                <div className="flex items-center gap-4">
                    <Tooltip content="Tooltip without arrow" showArrow={false}>
                        <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                            No Arrow
                        </button>
                    </Tooltip>
                </div>
            </div>
        </ComponentPreview>
    )
}

export default TooltipPreview
