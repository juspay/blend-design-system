'use client'
import { Switch, SwitchSize } from '@juspay/blend-design-system'
import React, { useState } from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const SwitchPreview = () => {
    const [isEnabled, setIsEnabled] = useState(false)

    const tsCode = `import { Switch, SwitchGroup, SwitchSize } from "@juspay/blend-design-system";

function MyComponent() {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <Switch
      checked={isEnabled}
      onChange={setIsEnabled}
      label="Enable notifications"
      size={SwitchSize.MEDIUM}
    />
  );
}`

    return (
        <ComponentPreview ts={tsCode}>
            <Switch
                checked={isEnabled}
                onChange={setIsEnabled}
                label="Enable notifications"
                size={SwitchSize.MEDIUM}
            />
        </ComponentPreview>
    )
}

export default SwitchPreview
