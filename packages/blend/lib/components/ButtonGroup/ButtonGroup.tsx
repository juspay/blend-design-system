import React from 'react'
import { Children } from 'react'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import Block from '../Primitives/Block/Block'
import type { ButtonGroupTokensType } from './buttonGroup.tokens'
import type { ButtonGroupProps } from './types'

const ButtonGroup: React.FC<ButtonGroupProps> = ({
    stacked = false,
    children,
}) => {
    const tokens = useResponsiveTokens<ButtonGroupTokensType>('BUTTON_GROUP')
    const totalChildren = Children.count(children)
    const gap = stacked ? tokens.gap.stacked : tokens.gap.default

    if (!stacked) {
        return (
            <Block
                display="flex"
                alignItems="stretch"
                gap={gap}
                data-button-group="true"
                data-button-group-stacked="false"
                data-button-group-count={totalChildren}
            >
                {children}
            </Block>
        )
    }
    return (
        <Block
            display="flex"
            alignItems="stretch"
            gap={gap}
            data-button-group="true"
            data-button-group-stacked="true"
            data-button-group-count={totalChildren}
        >
            {Children.map(children, (child, index) => {
                const position =
                    index === 0
                        ? 'left'
                        : index === totalChildren - 1
                          ? 'right'
                          : 'center'

                return (
                    <React.Fragment key={child.key || index}>
                        {index > 0 && (
                            <Block
                                aria-hidden="true"
                                data-button-group-separator="true"
                                width={0}
                                flexShrink={0}
                                borderLeft={`${tokens.separator.width} solid ${tokens.separator.color}`}
                            />
                        )}
                        {React.cloneElement(child, {
                            ...child.props,
                            key: child.key || index,
                            buttonGroupPosition: position,
                        })}
                    </React.Fragment>
                )
            })}
        </Block>
    )
}

export default ButtonGroup
