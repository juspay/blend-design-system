'use client'
import {
    ProgressBar,
    ProgressBarVariant,
    ProgressBarSize,
} from '@juspay/blend-design-system'
import React, { useState, useEffect } from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const ProgressBarPreview = () => {
    const [progress, setProgress] = useState(65)

    // Animate progress for demonstration
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                const next = prev + 5
                return next > 100 ? 20 : next
            })
        }, 1500)

        return () => clearInterval(interval)
    }, [])

    const tsCode = `import { 
  ProgressBar, 
  ProgressBarVariant, 
  ProgressBarSize, 
  ProgressBarType 
} from "@juspay/blend-design-system";
import { useState } from "react";

function MyComponent() {
  const [progress, setProgress] = useState(65);

  return (
    <div className="space-y-6">
      <div>
        <ProgressBar
          value={progress}
          variant={ProgressBarVariant.SOLID}
          size={ProgressBarSize.MEDIUM}
          showLabel={true}
        />
      </div>
      
      <div>
        <ProgressBar
          value={progress}
          variant={ProgressBarVariant.SEGMENTED}
          size={ProgressBarSize.MEDIUM}
          showLabel={false}
        />
      </div>
      
      <div>
        <ProgressBar
          value={progress}
          variant={ProgressBarVariant.CIRCULAR}
          type={ProgressBarType.SOLID}
          size={ProgressBarSize.MEDIUM}
          showLabel={true}
        />
      </div>
    </div>
  );
}`

    const reCode = `type progressBarVariant = [#solid | #segmented | #circular]
type progressBarSize = [#sm | #md | #lg]
type progressBarType = [#solid | #segmented]

@react.component
let make = (
  ~value: float,
  ~variant: option<progressBarVariant>=?,
  ~size: option<progressBarSize>=?,
  ~type_: option<progressBarType>=?,
  ~showLabel: option<bool>=?,
  ~className: option<string>=?,
) => {
  <ProgressBarBinding
    value
    ?variant
    ?size
    type_=?type_
    ?showLabel
    ?className
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~value: float,
  ~variant: [#solid | #segmented | #circular]=?,
  ~size: [#sm | #md | #lg]=?,
  ~type_: [#solid | #segmented]=?,
  ~showLabel: bool=?,
  ~className: string=?,
) => React.element = "ProgressBar"`

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <div style={{ minWidth: '300px', padding: '16px' }}>
                <ProgressBar
                    value={progress}
                    variant={ProgressBarVariant.SEGMENTED}
                    size={ProgressBarSize.MEDIUM}
                    showLabel={false}
                />
            </div>
        </ComponentPreview>
    )
}

export default ProgressBarPreview
