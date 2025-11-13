import React, { forwardRef } from 'react'
import Block from '../../Primitives/Block/Block'
import PrimitiveButton from '../../Primitives/PrimitiveButton/PrimitiveButton'
import PrimitiveText from '../../Primitives/PrimitiveText/PrimitiveText'
import type { MobileNavigationItem as MobileNavigationItemType } from '../types'
import type { MobileNavigationTokenType } from './mobile.tokens'

const ICON_SIZE = 20

type MobileNavigationItemProps = {
    item: MobileNavigationItemType
    index?: number
    tokens: MobileNavigationTokenType
    onSelect: (item: MobileNavigationItemType) => void
}

const MobileNavigationItem = forwardRef<
    HTMLButtonElement,
    MobileNavigationItemProps
>(({ item, index, tokens, onSelect }, ref) => {
    const isActive = Boolean(item.isSelected)
    const state = isActive ? 'active' : 'default'
    const itemKey = index !== undefined ? `${item.label}-${index}` : item.label

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
                    {item.leftSlot && React.isValidElement(item.leftSlot)
                        ? React.cloneElement(
                              item.leftSlot as React.ReactElement<
                                  React.SVGProps<SVGSVGElement>
                              >,
                              {
                                  color: String(tokens.item.color[state]),
                                  width: ICON_SIZE,
                                  height: ICON_SIZE,
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
