import React from 'react'
import { FOUNDATION_THEME } from '../../../tokens'
import Block from '../../Primitives/Block/Block'
import { ButtonType, ButtonSize, Button } from '../../../main'
import type { ActionButtonsProps } from '../types'

const ActionButtons: React.FC<ActionButtonsProps> = ({
    onCancel,
    onApply,
    isDisabled = false,
}) => {
    return (
        <Block
            display="flex"
            gap={FOUNDATION_THEME.unit[12]}
            padding={FOUNDATION_THEME.unit[16]}
            backgroundColor="white"
        >
            <Block
                flexGrow={1}
                flexShrink={1}
                flexBasis={0}
                style={{ minWidth: 0 }}
            >
                <Button
                    buttonType={ButtonType.SECONDARY}
                    size={ButtonSize.LARGE}
                    fullWidth={true}
                    disabled={isDisabled}
                    onClick={onCancel}
                    text="Cancel"
                />
            </Block>
            <Block
                flexGrow={1}
                flexShrink={1}
                flexBasis={0}
                style={{ minWidth: 0 }}
            >
                <Button
                    buttonType={ButtonType.PRIMARY}
                    size={ButtonSize.LARGE}
                    fullWidth={true}
                    disabled={isDisabled}
                    onClick={onApply}
                    text="Apply Date"
                />
            </Block>
        </Block>
    )
}

export default ActionButtons
