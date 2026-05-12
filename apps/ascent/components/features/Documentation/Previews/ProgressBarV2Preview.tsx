'use client'
import {
    ProgressBarV2,
    ProgressBarV2Size,
    ProgressBarV2Variant,
} from '@juspay/blend-design-system'
import React from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const ProgressBarV2Preview = () => {
    const tsCode = `import {
    ProgressBarV2,
    ProgressBarV2Size,
    ProgressBarV2Variant
} from '@juspay/blend-design-system'

function MyComponent() {
    return (
        <>
            <ProgressBarV2
                value={75}
                variant={ProgressBarV2Variant.LINEAR}
                size={ProgressBarV2Size.MD}
                showLabel={true}
            />
            <ProgressBarV2
                value={60}
                variant={ProgressBarV2Variant.CIRCULAR}
                size={ProgressBarV2Size.LG}
                showLabel={true}
            />
        </>
    )
}`

    const reCode = `type progressBarV2Variant = [#linear | #circular]
type progressBarV2Size = [#sm | #md | #lg]

@react.component
let make = () => {
  <>
    <ProgressBarV2Binding
      value={75}
      variant=#linear
      size=#md
      showLabel={true}
    />
    <ProgressBarV2Binding
      value={60}
      variant=#circular
      size=#lg
      showLabel={true}
    />
  </>
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~value: int,
  ~min: int=?,
  ~max: int=?,
  ~variant: [#linear | #circular]=?,
  ~appearance: [#solid | #segmented]=?,
  ~size: [#sm | #md | #lg]=?,
  ~showLabel: bool=?,
) => React.element = "ProgressBarV2"`

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <div className="flex flex-col items-center gap-8 w-full max-w-sm">
                <ProgressBarV2
                    value={75}
                    variant={ProgressBarV2Variant.LINEAR}
                    size={ProgressBarV2Size.MD}
                    showLabel={true}
                />
                <ProgressBarV2
                    value={60}
                    variant={ProgressBarV2Variant.CIRCULAR}
                    size={ProgressBarV2Size.LG}
                    showLabel={true}
                />
            </div>
        </ComponentPreview>
    )
}

export default ProgressBarV2Preview
