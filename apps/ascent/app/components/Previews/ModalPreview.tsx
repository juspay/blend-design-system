'use client'
import { Modal, ButtonType } from 'blend-v1'
import React, { useState } from 'react'
import ComponentPreview from './ComponentPreview'

const ModalPreview = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenWithActions, setIsOpenWithActions] = useState(false)
    const [isOpenSimple, setIsOpenSimple] = useState(false)

    const tsCode = `import { Modal, ButtonType, ButtonSize, ButtonSubType } from "blend-v1";
import { useState } from "react";

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Modal Title"
        subtitle="Optional subtitle for the modal"
        primaryAction={{
          text: "Save",
          buttonType: ButtonType.PRIMARY,
          onClick: () => {
            console.log("Primary action clicked");
            setIsOpen(false);
          },
        }}
        secondaryAction={{
          text: "Cancel",
          buttonType: ButtonType.SECONDARY,
          onClick: () => setIsOpen(false),
        }}
      >
        <div>Modal content goes here</div>
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

    const bindingCode = `@module("blend-v1") @react.component
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
            <div className="m-4 space-y-4">
                {/* Basic Modal */}
                <div>
                    <button
                        onClick={() => setIsOpen(true)}
                        className="text-sm px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                    >
                        Open Basic Modal
                    </button>

                    <Modal
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        title="Basic Modal"
                        subtitle="This is a basic modal with title and subtitle"
                    >
                        <div className="space-y-4">
                            <p className="text-gray-600">
                                This is the content area of the modal. You can
                                put any content here.
                            </p>
                            <div className="bg-gray-50 p-3 rounded">
                                <p className="text-sm text-gray-700">
                                    Modal features include:
                                </p>
                                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                                    <li>• Backdrop click to close</li>
                                    <li>• Close button in header</li>
                                    <li>• Scrollable content area</li>
                                    <li>• Responsive design</li>
                                </ul>
                            </div>
                        </div>
                    </Modal>
                </div>

                {/* Modal with Actions */}
                <div>
                    <button
                        onClick={() => setIsOpenWithActions(true)}
                        className="text-sm px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600"
                    >
                        Open Modal with Actions
                    </button>

                    <Modal
                        isOpen={isOpenWithActions}
                        onClose={() => setIsOpenWithActions(false)}
                        title="Modal with Actions"
                        subtitle="This modal has primary and secondary actions"
                        primaryAction={{
                            text: 'Save Changes',
                            buttonType: ButtonType.PRIMARY,
                            onClick: () => {
                                console.log('Primary action clicked')
                                setIsOpenWithActions(false)
                            },
                        }}
                        secondaryAction={{
                            text: 'Cancel',
                            buttonType: ButtonType.SECONDARY,
                            onClick: () => setIsOpenWithActions(false),
                        }}
                    >
                        <div className="space-y-4">
                            <p className="text-gray-600">
                                This modal demonstrates the footer with action
                                buttons.
                            </p>
                            <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
                                <p className="text-sm text-yellow-800">
                                    <strong>Note:</strong> The footer
                                    automatically appears when you provide
                                    primaryAction or secondaryAction props.
                                </p>
                            </div>
                        </div>
                    </Modal>
                </div>

                {/* Simple Modal */}
                <div>
                    <button
                        onClick={() => setIsOpenSimple(true)}
                        className="text-sm px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600"
                    >
                        Open Simple Modal
                    </button>

                    <Modal
                        isOpen={isOpenSimple}
                        onClose={() => setIsOpenSimple(false)}
                        showCloseButton={false}
                        closeOnBackdropClick={false}
                    >
                        <div className="text-center space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800">
                                Simple Modal
                            </h3>
                            <p className="text-gray-600">
                                This modal has no header, no footer, and no
                                close button. You'll need to implement your own
                                close mechanism.
                            </p>
                            <button
                                onClick={() => setIsOpenSimple(false)}
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                            >
                                Close Modal
                            </button>
                        </div>
                    </Modal>
                </div>
            </div>
        </ComponentPreview>
    )
}

export default ModalPreview
