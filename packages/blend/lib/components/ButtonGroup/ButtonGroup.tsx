import React from 'react'
import { Children } from 'react'
import Block from '../Primitives/Block/Block'
import type { ButtonGroupProps } from './types'

const ButtonGroupV2: React.FC<ButtonGroupProps> = ({
    stacked = false,
    children,
}) => {
    if (!stacked) {
        return (
            <Block display="flex" gap={10}>
                {children}
            </Block>
        )
    }
    return (
        <Block display="flex" gap={0}>
            {Children.map(children, (child, index) => {
                return React.cloneElement(child, {
                    key: child.key || index,
                    buttonGroupPosition:
                        index === 0
                            ? 'left'
                            : index === Children.count(children) - 1
                              ? 'right'
                              : 'center',
                })
            })}
        </Block>
    )
}

export default ButtonGroupV2
