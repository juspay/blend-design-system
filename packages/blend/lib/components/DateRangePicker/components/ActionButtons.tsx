import React from 'react'
import Block from '../../Primitives/Block/Block'
import { ButtonType, ButtonSize, Button, Tooltip } from '../../../main'
import type { ActionButtonsProps } from '../types'
import { useBreakpoints } from '../../../hooks/useBreakPoints'
import { getMobileToken } from './mobile.tokens'
import { FOUNDATION_THEME } from '../../../tokens'

const ActionButtons: React.FC<ActionButtonsProps> = ({
    onCancel,
    onApply,
    isDisabled = false,
    isApplyDisabled = false,
    applyDisabledMessage,
}) => {
    const { innerWidth } = useBreakpoints()
    const tokens =
        getMobileToken(FOUNDATION_THEME)[innerWidth >= 1024 ? 'lg' : 'sm']

    return (
        <Block
            display="flex"
            gap={tokens.footer.gap}
            paddingX={tokens.footer.padding.x}
            paddingY={tokens.footer.padding.y}
            borderTop={tokens.footer.borderTop}
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
                <Tooltip
                    content={isApplyDisabled ? applyDisabledMessage : undefined}
                    open={isApplyDisabled ? undefined : false}
                >
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        size={ButtonSize.LARGE}
                        fullWidth={true}
                        disabled={isDisabled || isApplyDisabled}
                        onClick={onApply}
                        text="Apply Date"
                    />
                </Tooltip>
            </Block>
        </Block>
    )
}

export default ActionButtons
