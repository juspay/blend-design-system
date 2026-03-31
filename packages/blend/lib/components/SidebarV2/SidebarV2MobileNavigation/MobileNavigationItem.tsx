import type { CSSProperties, ReactNode } from 'react'
import Block from '../../Primitives/Block/Block'
import PrimitiveButton from '../../Primitives/PrimitiveButton/PrimitiveButton'
import type { SidebarV2MobileNavigationItem } from '../types'
import type { MobileNavigationV2TokenType } from './mobile.tokens'

const MobileNavigationItem = ({
    item,
    index,
    tokens,
    onSelect,
}: {
    item: SidebarV2MobileNavigationItem
    index: number
    tokens: MobileNavigationV2TokenType
    onSelect: (item: SidebarV2MobileNavigationItem) => void
}) => {
    const isActive = !!item.isSelected

    const leftSlot = item.leftSlot as ReactNode | undefined

    return (
        <PrimitiveButton
            type="button"
            onClick={() => onSelect(item)}
            display="flex"
            style={{
                flexDirection: 'column',
            }}
            alignItems="center"
            justifyContent="center"
            width={tokens.item.width}
            height={tokens.item.height}
            border="none"
            backgroundColor={tokens.item.backgroundColor.default}
            borderRadius={tokens.item.borderRadius}
            cursor="pointer"
            aria-label={item.label}
            data-element="mobile-navigation-item"
            data-index={String(index)}
        >
            <Block
                display="flex"
                alignItems="center"
                justifyContent="center"
                width={tokens.item.icon.width}
                height={tokens.item.icon.height}
                aria-hidden="true"
                style={{ transition: String(tokens.item.icon.transition) }}
            >
                {leftSlot}
            </Block>
            <Block
                as="span"
                style={{
                    fontSize: String(tokens.item.text.fontSize),
                    fontWeight: Number(tokens.item.text.fontWeight),
                    textAlign: tokens.item.text
                        .textAlign as CSSProperties['textAlign'],
                    color: String(
                        isActive
                            ? tokens.item.color.active
                            : tokens.item.color.default
                    ),
                    lineHeight: String(tokens.itemLabelLineHeight),
                    marginTop: String(tokens.itemLabelMarginTop),
                }}
            >
                {item.label}
            </Block>
        </PrimitiveButton>
    )
}

export default MobileNavigationItem
