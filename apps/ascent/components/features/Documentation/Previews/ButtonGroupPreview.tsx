'use client'

import { ButtonGroup } from '@juspay/blend-design-system/deprecated/button-group'
import {
    Button,
    ButtonType,
    ButtonSize,
} from '@juspay/blend-design-system/deprecated/button'
import React from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const tsCode = `import { ButtonGroup } from '@juspay/blend-design-system/deprecated/button-group'
import { Button, ButtonType, ButtonSize } from '@juspay/blend-design-system/deprecated/button'

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
