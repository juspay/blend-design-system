import React, { forwardRef, type ReactNode } from 'react'
import Block from '../../Primitives/Block/Block'
import PrimitiveButton from '../../Primitives/PrimitiveButton/PrimitiveButton'
import PrimitiveText from '../../Primitives/PrimitiveText/PrimitiveText'
import type { MobileNavigationItemProps } from './types'
import { parseUnitValue } from './utils'

const MobileNavigationItem = forwardRef<
    HTMLButtonElement,
    MobileNavigationItemProps
>(({ item, index, tokens, onSelect }, ref) => {
    const isActive = Boolean(item.isSelected)
    const state = isActive ? 'active' : 'default'
    const itemKey = index !== undefined ? `${item.label}-${index}` : item.label
    const leftSlot = item.leftSlot as ReactNode | undefined
    const iconSize = parseUnitValue(tokens.item.icon.width)

    return (
        <PrimitiveButton
            ref={ref}
            key={itemKey}
            type="button"
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={tokens.item.gap}
            width={tokens.item.width}
            height={tokens.item.height}
            borderRadius={tokens.item.borderRadius}
            backgroundColor={tokens.item.backgroundColor[state]}
            color={String(tokens.item.color[state])}
            fontWeight={tokens.item.fontWeight}
            flexShrink={0}
            aria-pressed={isActive}
            aria-label={item.label}
            onClick={() => onSelect(item)}
        >
            <Block
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                gap={tokens.item.gap}
            >
                <Block
                    as="span"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    width={tokens.item.icon.width}
                    height={tokens.item.icon.height}
                    borderRadius={tokens.item.icon.borderRadius}
                    transition={tokens.item.icon.transition}
                    color={String(tokens.item.color[state])}
                    aria-hidden="true"
                >
                    {leftSlot && React.isValidElement(leftSlot)
                        ? React.cloneElement(
                              leftSlot as React.ReactElement<
                                  React.SVGProps<SVGSVGElement>
                              >,
                              {
                                  color: String(tokens.item.color[state]),
                                  width: iconSize,
                                  height: iconSize,
                              }
                          )
                        : item.label.charAt(0)}
                </Block>

                <PrimitiveText
                    as="span"
                    fontSize={tokens.item.text.fontSize}
                    fontWeight={tokens.item.text.fontWeight}
                    textAlign={tokens.item.text.textAlign}
                    truncate
                    color={String(tokens.item.color[state])}
                    style={{
                        width: '100%',
                        maxWidth: String(tokens.item.width),
                    }}
                >
                    {item.label}
                </PrimitiveText>
            </Block>
        </PrimitiveButton>
    )
})

MobileNavigationItem.displayName = 'MobileNavigationItem'

export default MobileNavigationItem
