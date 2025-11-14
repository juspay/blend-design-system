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
            gap={tokens.row.item.gap}
            width={tokens.row.item.width}
            height={tokens.row.item.height}
            borderRadius={tokens.row.item.borderRadius}
            backgroundColor={tokens.row.item.backgroundColor[state]}
            color={String(tokens.row.item.color[state])}
            fontWeight={tokens.row.item.fontWeight}
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
                gap={tokens.row.item.gap}
            >
                <Block
                    as="span"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    width={tokens.row.item.icon.width}
                    height={tokens.row.item.icon.height}
                    borderRadius={tokens.row.item.icon.borderRadius}
                    transition={tokens.row.item.icon.transition}
                    color={String(tokens.row.item.color[state])}
                    aria-hidden="true"
                >
                    {item.leftSlot && React.isValidElement(item.leftSlot)
                        ? React.cloneElement(
                              item.leftSlot as React.ReactElement<
                                  React.SVGProps<SVGSVGElement>
                              >,
                              {
                                  color: String(tokens.row.item.color[state]),
                                  width: ICON_SIZE,
                                  height: ICON_SIZE,
                              }
                          )
                        : item.label.charAt(0)}
                </Block>

                <PrimitiveText
                    as="span"
                    fontSize={tokens.row.item.text.fontSize}
                    fontWeight={tokens.row.item.text.fontWeight}
                    textAlign={tokens.row.item.text.textAlign}
                    truncate
                    color={String(tokens.row.item.color[state])}
                    style={{
                        width: '100%',
                        maxWidth: String(tokens.row.item.width),
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
