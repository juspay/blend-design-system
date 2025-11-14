'use client'

import {
    ButtonGroup,
    Button,
    ButtonType,
    ButtonSize,
} from '@juspay/blend-design-system'
import React from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const tsCode = `import { ButtonGroup, Button, ButtonType, ButtonSize } from 'blend-v1'

function MyComponent() {
    return (
        <ButtonGroup stacked={false}>
            <Button
                text="Cancel"
                buttonType={ButtonType.SECONDARY}
                size={ButtonSize.MEDIUM}
                onClick={() => console.log('Cancel clicked')}
            />
            <Button
                text="Save Changes"
                buttonType={ButtonType.PRIMARY}
                size={ButtonSize.MEDIUM}
                onClick={() => console.log('Save clicked')}
            />
        </ButtonGroup>
    )
}`

const ButtonGroupPreview = () => {
    return (
        <ComponentPreview ts={tsCode}>
            <ButtonGroup stacked={false}>
                <Button
                    text="Cancel"
                    buttonType={ButtonType.SECONDARY}
                    size={ButtonSize.MEDIUM}
                    onClick={() => console.log('Cancel clicked')}
                />
                <Button
                    text="Save Changes"
                    buttonType={ButtonType.PRIMARY}
                    size={ButtonSize.MEDIUM}
                    onClick={() => console.log('Save clicked')}
                />
            </ButtonGroup>
        </ComponentPreview>
    )
}

export default ButtonGroupPreview
