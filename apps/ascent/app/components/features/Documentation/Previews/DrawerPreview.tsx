'use client'
import {
    Drawer,
    DrawerTrigger,
    DrawerPortal,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerBody,
    DrawerFooter,
    DrawerClose,
    Button,
    ButtonType,
} from '@juspay/blend-design-system'
import React, { useState } from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const DrawerPreview = () => {
    const [isOpen, setIsOpen] = useState(false)

    const tsCode = `import { 
  Drawer, 
  DrawerTrigger, 
  DrawerPortal,
  DrawerOverlay,
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle, 
  DrawerDescription, 
  DrawerBody, 
  DrawerFooter, 
  DrawerClose, 
  Button, 
  ButtonType 
} from "@juspay/blend-design-system";
import { useState } from "react";

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger>
        <Button
          text="Open Drawer"
          buttonType={ButtonType.PRIMARY}
        />
      </DrawerTrigger>
      
      <DrawerPortal>
        <DrawerOverlay />
        <DrawerContent direction="bottom">
          <DrawerHeader>
            <DrawerTitle>Example Drawer</DrawerTitle>
            <DrawerDescription>
              This is a sample drawer component demonstration
            </DrawerDescription>
          </DrawerHeader>
          
          <DrawerBody>
            <div className="space-y-4">
              <p>This is the main content area of the drawer.</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-100 rounded">Item 1</div>
                <div className="p-3 bg-gray-100 rounded">Item 2</div>
              </div>
            </div>
          </DrawerBody>
          
          <DrawerFooter>
            <DrawerClose>
              <Button
                text="Close"
                buttonType={ButtonType.SECONDARY}
              />
            </DrawerClose>
            <Button
              text="Save"
              buttonType={ButtonType.PRIMARY}
              onClick={() => {
                console.log("Saved");
                setIsOpen(false);
              }}
            />
          </DrawerFooter>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
}`

    const reCode = `type drawerDirection = [#top | #bottom | #left | #right]

@react.component
let make = (
  ~open: option<bool>=?,
  ~onOpenChange: option<bool => unit>=?,
  ~direction: option<drawerDirection>=?,
  ~modal: option<bool>=?,
  ~dismissible: option<bool>=?,
  ~showHandle: option<bool>=?,
  ~handle: option<React.element>=?,
  ~nested: option<bool>=?,
  ~snapPoints: option<array<string>>=?,
  ~activeSnapPoint: option<string>=?,
  ~onSnapPointChange: option<string => unit>=?,
  ~fadeFromIndex: option<int>=?,
  ~snapToSequentialPoint: option<bool>=?,
  ~mobileOffset: option<{
    "top": option<string>,
    "bottom": option<string>,
    "left": option<string>,
    "right": option<string>
  }>=?,
  ~className: option<string>=?,
  ~overlayClassName: option<string>=?,
  ~style: option<ReactDOM.Style.t>=?,
  ~children: React.element,
) => {
  <DrawerBinding
    ?open
    ?onOpenChange
    ?direction
    ?modal
    ?dismissible
    ?showHandle
    ?handle
    ?nested
    ?snapPoints
    ?activeSnapPoint
    ?onSnapPointChange
    ?fadeFromIndex
    ?snapToSequentialPoint
    ?mobileOffset
    ?className
    ?overlayClassName
    ?style
    children
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~open: bool=?,
  ~onOpenChange: bool => unit=?,
  ~direction: [#top | #bottom | #left | #right]=?,
  ~modal: bool=?,
  ~dismissible: bool=?,
  ~showHandle: bool=?,
  ~handle: React.element=?,
  ~nested: bool=?,
  ~snapPoints: array<string>=?,
  ~activeSnapPoint: string=?,
  ~onSnapPointChange: string => unit=?,
  ~fadeFromIndex: int=?,
  ~snapToSequentialPoint: bool=?,
  ~mobileOffset: {
    "top": string=?,
    "bottom": string=?,
    "left": string=?,
    "right": string=?,
  }=?,
  ~className: string=?,
  ~overlayClassName: string=?,
  ~style: ReactDOM.Style.t=?,
  ~children: React.element,
) => React.element = "Drawer"`

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <div style={{ minWidth: '300px' }}>
                <Drawer open={isOpen} onOpenChange={setIsOpen}>
                    <DrawerTrigger>
                        <Button
                            text="Open Drawer"
                            buttonType={ButtonType.PRIMARY}
                        />
                    </DrawerTrigger>

                    <DrawerPortal>
                        <DrawerOverlay />
                        <DrawerContent direction="bottom">
                            <DrawerHeader>
                                <DrawerTitle>Example Drawer</DrawerTitle>
                                <DrawerDescription>
                                    This is a sample drawer component
                                    demonstration
                                </DrawerDescription>
                            </DrawerHeader>

                            <DrawerBody>
                                <div style={{ padding: '0 0 16px 0' }}>
                                    <p
                                        style={{
                                            marginBottom: '16px',
                                            color: '#6b7280',
                                        }}
                                    >
                                        This is the main content area of the
                                        drawer. You can place any content here.
                                    </p>
                                    <div
                                        style={{
                                            display: 'grid',
                                            gridTemplateColumns: '1fr 1fr',
                                            gap: '12px',
                                        }}
                                    >
                                        <div
                                            style={{
                                                padding: '12px',
                                                backgroundColor: '#f3f4f6',
                                                borderRadius: '6px',
                                            }}
                                        >
                                            Option 1
                                        </div>
                                        <div
                                            style={{
                                                padding: '12px',
                                                backgroundColor: '#f3f4f6',
                                                borderRadius: '6px',
                                            }}
                                        >
                                            Option 2
                                        </div>
                                    </div>
                                </div>
                            </DrawerBody>

                            <DrawerFooter>
                                <DrawerClose>
                                    <Button
                                        text="Close"
                                        buttonType={ButtonType.SECONDARY}
                                    />
                                </DrawerClose>
                                <Button
                                    text="Save"
                                    buttonType={ButtonType.PRIMARY}
                                    onClick={() => {
                                        console.log('Saved')
                                        setIsOpen(false)
                                    }}
                                />
                            </DrawerFooter>
                        </DrawerContent>
                    </DrawerPortal>
                </Drawer>
            </div>
        </ComponentPreview>
    )
}

export default DrawerPreview
