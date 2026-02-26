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
    return (
        <ComponentPreview ts={tsCode}>
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
