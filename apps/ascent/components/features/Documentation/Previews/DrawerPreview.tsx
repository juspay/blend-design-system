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
} from '@juspay/blend-design-system/deprecated/drawer'
import {
    Button,
    ButtonType,
} from '@juspay/blend-design-system/deprecated/button'
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
} from "@juspay/blend-design-system/deprecated/drawer";
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

    return (
        <ComponentPreview ts={tsCode}>
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
                                <div className="pb-4">
                                    <p className="mb-4 text-muted-foreground">
                                        This is the main content area of the
                                        drawer. You can place any content here.
                                    </p>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="p-3 bg-surface rounded-md">
                                            Option 1
                                        </div>

                                        <div className="p-3 bg-surface rounded-md">
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
