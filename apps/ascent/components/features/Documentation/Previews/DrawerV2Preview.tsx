'use client'
import {
    DrawerV2,
    DrawerV2Content,
    DrawerV2Overlay,
    DrawerV2Portal,
    DrawerV2Title,
    ButtonV2,
    ButtonV2Type,
} from '@juspay/blend-design-system'
import React, { useState } from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const DrawerV2Preview = () => {
    const [isOpen, setIsOpen] = useState(false)

    const tsCode = `import {
    DrawerV2,
    DrawerV2Content,
    DrawerV2Overlay,
    DrawerV2Portal,
    DrawerV2Title,
    ButtonV2,
    ButtonV2Type,
} from '@juspay/blend-design-system'
import { useState } from 'react'

function MyComponent() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <ButtonV2
                text="Open Drawer"
                buttonType={ButtonV2Type.PRIMARY}
                onClick={() => setIsOpen(true)}
            />
            <DrawerV2 open={isOpen} onOpenChange={setIsOpen}>
                <DrawerV2Portal>
                    <DrawerV2Overlay className="fixed inset-0 bg-black/40 z-50" />
                    <DrawerV2Content className="fixed inset-x-0 bottom-0 bg-white p-6 rounded-t-xl z-50 max-h-[80vh]">
                        <DrawerV2Title>Drawer Title</DrawerV2Title>
                        <div className="p-4">
                            <p>Your content here</p>
                        </div>
                        <ButtonV2
                            text="Close"
                            buttonType={ButtonV2Type.SECONDARY}
                            onClick={() => setIsOpen(false)}
                        />
                    </DrawerV2Content>
                </DrawerV2Portal>
            </DrawerV2>
        </>
    )
}`

    const reCode = `@react.component
let make = () => {
  let (isOpen, setIsOpen) = React.useState(() => false)

  <>
    <ButtonV2Binding
      text="Open Drawer"
      buttonType=#primary
      onClick={_ => setIsOpen(_ => true)}
    />
    <DrawerV2Binding open={isOpen} onOpenChange={setIsOpen}>
      <DrawerV2PortalBinding>
        <DrawerV2OverlayBinding className="fixed inset-0 bg-black/40 z-50" />
        <DrawerV2ContentBinding className="fixed inset-x-0 bottom-0 bg-white p-6 rounded-t-xl z-50 max-h-[80vh]">
          <DrawerV2TitleBinding>{React.string("Drawer Title")}</DrawerV2TitleBinding>
          <div className="p-4">
            <p>{React.string("Your content here")}</p>
          </div>
          <ButtonV2Binding
            text="Close"
            buttonType=#secondary
            onClick={_ => setIsOpen(_ => false)}
          />
        </DrawerV2ContentBinding>
      </DrawerV2PortalBinding>
    </DrawerV2Binding>
  </>
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~children: React.element,
  ~open: bool=?,
  ~onOpenChange: bool => unit=?,
) => React.element = "DrawerV2"`

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <div className="flex flex-col items-center gap-4">
                <ButtonV2
                    text="Open Drawer"
                    buttonType={ButtonV2Type.PRIMARY}
                    onClick={() => setIsOpen(true)}
                />
                <DrawerV2 open={isOpen} onOpenChange={setIsOpen}>
                    <DrawerV2Portal>
                        <DrawerV2Overlay className="fixed inset-0 bg-black/40 z-50" />
                        <DrawerV2Content className="fixed inset-x-0 bottom-0 bg-white p-6 rounded-t-xl z-50 max-h-[80vh]">
                            <DrawerV2Title className="text-lg font-semibold mb-2">
                                Drawer Content
                            </DrawerV2Title>
                            <p className="text-gray-600 mb-4">
                                This is a sample drawer content area.
                            </p>
                            <ButtonV2
                                text="Close"
                                buttonType={ButtonV2Type.SECONDARY}
                                onClick={() => setIsOpen(false)}
                            />
                        </DrawerV2Content>
                    </DrawerV2Portal>
                </DrawerV2>
            </div>
        </ComponentPreview>
    )
}

export default DrawerV2Preview
