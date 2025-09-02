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

    const reCode = `type buttonTypeV2 = [#primary | #secondary | #danger | #success]
type buttonSizeV2 = [#sm | #md | #lg]
type buttonSubTypeV2 = [#default | #iconOnly | #inline]

type modalButtonAction = {
  text: string,
  buttonType: option<buttonTypeV2>=?,
  size: option<buttonSizeV2>=?,
  subType: option<buttonSubTypeV2>=?,
  onClick: option<unit => unit>=?,
  disabled: option<bool>=?,
  loading: option<bool>=?,
  leadingIcon: option<React.element>=?,
  trailingIcon: option<React.element>=?,
}

@react.component
let make = (
  ~isOpen: bool,
  ~onClose: unit => unit,
  ~title: option<string>=?,
  ~subtitle: option<string>=?,
  ~children: React.element,
  ~primaryAction: option<modalButtonAction>=?,
  ~secondaryAction: option<modalButtonAction>=?,
  ~className: option<string>=?,
  ~showCloseButton: option<bool>=?,
  ~closeOnBackdropClick: option<bool>=?,
  ~headerRightSlot: option<React.element>=?,
  ~showDivider: option<bool>=?,
) => {
  <ModalBinding
    isOpen
    onClose
    ?title
    ?subtitle
    children
    ?primaryAction
    ?secondaryAction
    ?className
    ?showCloseButton
    ?closeOnBackdropClick
    ?headerRightSlot
    ?showDivider
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~isOpen: bool,
  ~onClose: unit => unit,
  ~title: string=?,
  ~subtitle: string=?,
  ~children: React.element,
  ~primaryAction: {
    text: string,
    buttonType: [#primary | #secondary | #danger | #success]=?,
    size: [#sm | #md | #lg]=?,
    subType: [#default | #iconOnly | #inline]=?,
    onClick: unit => unit=?,
    disabled: bool=?,
    loading: bool=?,
    leadingIcon: React.element=?,
    trailingIcon: React.element=?,
  }=?,
  ~secondaryAction: {
    text: string,
    buttonType: [#primary | #secondary | #danger | #success]=?,
    size: [#sm | #md | #lg]=?,
    subType: [#default | #iconOnly | #inline]=?,
    onClick: unit => unit=?,
    disabled: bool=?,
    loading: bool=?,
    leadingIcon: React.element=?,
    trailingIcon: React.element=?,
  }=?,
  ~className: string=?,
  ~showCloseButton: bool=?,
  ~closeOnBackdropClick: bool=?,
  ~headerRightSlot: React.element=?,
  ~showDivider: bool=?,
) => React.element = "Modal"`

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
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
