import React, { forwardRef, Children } from 'react'
import Block from '../../Primitives/Block/Block'
import type { ButtonGroupV2Props } from './types'
import { getButtonGroupPosition, getButtonGroupGap } from './utils'

const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupV2Props>(
    ({ stacked = false, gap, children }, ref) => {
        const totalChildren = Children.count(children)
        const groupGap = getButtonGroupGap(stacked, gap)

        if (!stacked) {
            return (
                <Block
                    ref={ref}
                    display="flex"
                    alignItems="stretch"
                    gap={groupGap}
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
                ref={ref}
                display="flex"
                alignItems="stretch"
                gap={groupGap}
                data-button-group="true"
                data-button-group-stacked="true"
                data-button-group-count={totalChildren}
            >
                {Children.map(children, (child, index) => {
                    if (!React.isValidElement(child)) return child

                    const position = getButtonGroupPosition(
                        index,
                        totalChildren
                    )

                    return React.cloneElement(child, {
                        ...child.props,
                        key: child.key || index,
                        buttonGroupPosition: position,
                    })
                })}
            </Block>
        )
    }
)

ButtonGroup.displayName = 'ButtonGroup'

export default ButtonGroup
