import React from 'react'
import Block from '../../Primitives/Block/Block'
import { ButtonV2, ButtonV2Size, ButtonV2Type } from '../../ButtonV2'
import { TooltipV2 } from '../../TooltipV2'
import type { ActionButtonsProps } from '../types'
import { useBreakpoints } from '../../../hooks/useBreakPoints'
import { getMobileToken } from './mobile.tokens'
import { useTheme } from '../../../context'

const ActionButtons: React.FC<ActionButtonsProps> = ({
    onCancel,
    onApply,
    isDisabled = false,
    isApplyDisabled = false,
    applyDisabledMessage,
}) => {
    const { innerWidth } = useBreakpoints()
    const { foundationTokens, theme } = useTheme()
    const tokens = getMobileToken(foundationTokens, theme)[
        innerWidth >= 1024 ? 'lg' : 'sm'
    ]

    return (
        <Block
            display="flex"
            gap={tokens.footer.gap}
            paddingX={tokens.footer.padding.x}
            paddingY={tokens.footer.padding.y}
            borderTop={tokens.footer.borderTop}
            backgroundColor={tokens.footer.backgroundColor}
        >
            <Block
                flexGrow={1}
                flexShrink={1}
                flexBasis={0}
                style={{ minWidth: 0 }}
            >
                <ButtonV2
                    buttonType={ButtonV2Type.SECONDARY}
                    size={ButtonV2Size.LARGE}
                    width="100%"
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
                {isApplyDisabled ? (
                    <TooltipV2 content={applyDisabledMessage || ''}>
                        <ButtonV2
                            buttonType={ButtonV2Type.PRIMARY}
                            size={ButtonV2Size.LARGE}
                            width="100%"
                            disabled={true}
                            onClick={onApply}
                            text="Apply Date"
                        />
                    </TooltipV2>
                ) : (
                    <ButtonV2
                        buttonType={ButtonV2Type.PRIMARY}
                        size={ButtonV2Size.LARGE}
                        width="100%"
                        disabled={isDisabled}
                        onClick={onApply}
                        text="Apply Date"
                    />
                )}
            </Block>
        </Block>
    )
}

export default ActionButtons
