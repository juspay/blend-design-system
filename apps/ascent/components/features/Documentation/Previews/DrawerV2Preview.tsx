'use client'
import { DrawerV2, Button, ButtonType } from '@juspay/blend-design-system'
import React, { useState } from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const DrawerV2Preview = () => {
    const tsCode = `import { DrawerV2, Button } from '@juspay/blend-design-system'
import { useState } from 'react'

function MyComponent() {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Button
                text="Open Drawer"
                onClick={() => setOpen(true)}
            />
            <DrawerV2
                open={open}
                onOpenChange={setOpen}
                direction="right"
            >
                <div className="p-4">
                    <h2>Drawer Content</h2>
                    <p>Your content here</p>
                </div>
            </DrawerV2>
        </>
    )
}`

    const reCode = `@react.component
let make = () => {
  let (open, setOpen) = React.useState(() => false)

  <>
    <ButtonBinding text="Open Drawer" onClick={_ => setOpen(_ => true)} />
    <DrawerV2Binding open={open} onOpenChange={setOpen} direction=#right>
      <div className="p-4">
        <h2>{React.string("Drawer Content")}</h2>
      </div>
    </DrawerV2Binding>
  </>
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~open: bool,
  ~onOpenChange: bool => unit,
  ~direction: [#left | #right | #top | #bottom]=?,
  ~size: string=?,
  ~children: React.element,
) => React.element = "DrawerV2"`

    const [open, setOpen] = useState(false)

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <div className="flex flex-col items-center gap-4">
                <Button
                    text="Open Drawer"
                    buttonType={ButtonType.PRIMARY}
                    onClick={() => setOpen(true)}
                />
                <DrawerV2 open={open} onOpenChange={setOpen} direction="right">
                    <div className="p-6 w-80">
                        <h2 className="text-lg font-semibold mb-2">
                            Drawer Content
                        </h2>
                        <p className="text-gray-600">
                            This is a sample drawer content area.
                        </p>
                    </div>
                </DrawerV2>
            </div>
        </ComponentPreview>
    )
}

export default DrawerV2Preview
