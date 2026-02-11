'use client'
import { Modal, ButtonType, Button } from '@juspay/blend-design-system'
import React, { useState } from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const ModalPreview = () => {
    const [isOpen, setIsOpen] = useState(false)

    const tsCode = `import { Modal, ButtonType, Button } from "@juspay/blend-design-system";
import { useState } from "react";

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button 
        buttonType={ButtonType.PRIMARY}
        onClick={() => setIsOpen(true)}
      >
        Open Modal
      </Button>
      
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Action"
        subtitle="Please review your changes before proceeding"
        primaryAction={{
          text: "Save Changes",
          buttonType: ButtonType.PRIMARY,
          onClick: () => {
            console.log("Changes saved");
            setIsOpen(false);
          },
        }}
        secondaryAction={{
          text: "Cancel",
          buttonType: ButtonType.SECONDARY,
          onClick: () => setIsOpen(false),
        }}
      >
        <div>
          <p>Are you sure you want to save these changes? This action cannot be undone.</p>
        </div>
      </Modal>
    </>
  );
}`

    return (
        <ComponentPreview ts={tsCode}>
            <div style={{ minWidth: '300px' }}>
                <Button
                    buttonType={ButtonType.PRIMARY}
                    onClick={() => setIsOpen(true)}
                    text="Open Modal"
                ></Button>

                <Modal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title="Confirm Action"
                    subtitle="Please review your changes before proceeding"
                    primaryAction={{
                        text: 'Save Changes',
                        buttonType: ButtonType.PRIMARY,
                        onClick: () => {
                            console.log('Changes saved')
                            setIsOpen(false)
                        },
                    }}
                    secondaryAction={{
                        text: 'Cancel',
                        buttonType: ButtonType.SECONDARY,
                        onClick: () => setIsOpen(false),
                    }}
                >
                    <div style={{ padding: '0 0 16px 0' }}>
                        <p style={{ color: '#6b7280', lineHeight: '1.5' }}>
                            Are you sure you want to save these changes? This
                            action cannot be undone.
                        </p>
                    </div>
                </Modal>
            </div>
        </ComponentPreview>
    )
}

export default ModalPreview
