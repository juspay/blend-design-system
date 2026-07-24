'use client'

import {
    ButtonV2,
    ButtonV2Size,
    ButtonV2SubType,
    ButtonV2Type,
    ModalV2,
} from '@juspay/blend-design-system'
import React, { useState } from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const ModalV2Preview = () => {
    const [isOpen, setIsOpen] = useState(false)

    const tsCode = `import {
    ButtonV2,
    ButtonV2Size,
    ButtonV2SubType,
    ButtonV2Type,
    ModalV2,
} from '@juspay/blend-design-system'
import { useState } from 'react'

function MyComponent() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <ButtonV2
                text="Open Modal"
                buttonType={ButtonV2Type.PRIMARY}
                size={ButtonV2Size.MEDIUM}
                subType={ButtonV2SubType.DEFAULT}
                onClick={() => setIsOpen(true)}
            />

            <ModalV2
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Approve payout"
                subtitle="Review the payout details before approving."
                primaryAction={{
                    text: 'Approve',
                    buttonType: ButtonV2Type.PRIMARY,
                    onClick: () => setIsOpen(false),
                }}
                secondaryAction={{
                    text: 'Cancel',
                    buttonType: ButtonV2Type.SECONDARY,
                    onClick: () => setIsOpen(false),
                }}
            >
                <p>This action will approve the selected payout request.</p>
            </ModalV2>
        </>
    )
}`

    return (
        <ComponentPreview ts={tsCode}>
            <ButtonV2
                text="Open Modal"
                buttonType={ButtonV2Type.PRIMARY}
                size={ButtonV2Size.MEDIUM}
                subType={ButtonV2SubType.DEFAULT}
                onClick={() => setIsOpen(true)}
            />

            <ModalV2
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Approve payout"
                subtitle="Review the payout details before approving."
                primaryAction={{
                    text: 'Approve',
                    buttonType: ButtonV2Type.PRIMARY,
                    onClick: () => setIsOpen(false),
                }}
                secondaryAction={{
                    text: 'Cancel',
                    buttonType: ButtonV2Type.SECONDARY,
                    onClick: () => setIsOpen(false),
                }}
            >
                <p className="text-sm text-muted-foreground">
                    This action will approve the selected payout request and
                    notify the operations team.
                </p>
            </ModalV2>
        </ComponentPreview>
    )
}

export default ModalV2Preview
