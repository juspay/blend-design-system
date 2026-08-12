'use client'
import {
    Checkbox,
    CheckboxSize,
} from '@juspay/blend-design-system/deprecated/checkbox'
import React, { useState } from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const CheckboxPreview = () => {
    const [checked, setChecked] = useState(false)

    const tsCode = `import { Checkbox, CheckboxSize } from "@juspay/blend-design-system/deprecated/checkbox";

function MyComponent() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      checked={checked}
      onCheckedChange={setChecked}
      size={CheckboxSize.MEDIUM}
      required={true}
    >
      Accept terms and conditions
    </Checkbox>
  );
}`

    return (
        <ComponentPreview ts={tsCode}>
            <Checkbox
                checked={checked}
                onCheckedChange={(checked) => setChecked(checked === true)}
                size={CheckboxSize.MEDIUM}
                required={true}
            >
                Accept terms and conditions
            </Checkbox>
        </ComponentPreview>
    )
}

export default CheckboxPreview
