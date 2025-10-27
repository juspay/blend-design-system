import React from 'react'
import { Children } from 'react'
import Block from '../Primitives/Block/Block'
import type { ButtonGroupProps } from './types'

const ButtonGroup: React.FC<ButtonGroupProps> = ({
    stacked = false,
    children,
}) => {
    const totalChildren = Children.count(children)

    if (!stacked) {
        return (
            <Block
                display="flex"
                gap={10}
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
            gap={0}
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

                return React.cloneElement(child, {
                    ...child.props,
                    key: child.key || index,
                    buttonGroupPosition: position,
                })
            })}
        </Block>
    )
}

export default ButtonGroup
