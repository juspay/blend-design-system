import React from 'react'
import Block from '../../Primitives/Block/Block'
import type { MobileNavigationItem as MobileNavigationItemType } from '../types'
import type { MobileNavigationTokenType } from './mobile.tokens'
import MobileNavigationItem from './MobileNavigationItem'
import { getMobileNavigationFillerCount } from './utils'

type SecondaryRowProps = {
    row: MobileNavigationItemType[]
    rowIndex: number
    isLastRow: boolean
    tokens: MobileNavigationTokenType
    onItemSelect: (item: MobileNavigationItemType) => void
    primaryVisibleLimit: number
}

const SecondaryRow: React.FC<SecondaryRowProps> = ({
    row,
    rowIndex,
    isLastRow,
    tokens,
    onItemSelect,
    primaryVisibleLimit,
}) => {
    const fillerCount = getMobileNavigationFillerCount(
        row.length,
        primaryVisibleLimit
    )
    const padding = isLastRow
        ? tokens.secondaryRow.padding.last
        : tokens.secondaryRow.padding.default

    return (
        <Block
            aria-label="More navigation options"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap={tokens.secondaryRow.gap}
            width="100%"
            marginTop={tokens.secondaryRow.marginTop}
            paddingTop={padding.top}
            paddingRight={padding.right}
            paddingBottom={padding.bottom}
            paddingLeft={padding.left}
        >
            {row.map((item, index) => (
                <MobileNavigationItem
                    key={`${item.label}-secondary-${rowIndex}-${index}`}
                    item={item}
                    index={index + rowIndex * row.length}
                    tokens={tokens}
                    onSelect={onItemSelect}
                />
            ))}
            {Array.from({ length: fillerCount }).map((_, emptyIndex) => (
                <Block
                    key={`empty-${rowIndex}-${emptyIndex}`}
                    width={tokens.item.width}
                    height={tokens.item.height}
                    aria-hidden="true"
                />
            ))}
        </Block>
    )
}

export default SecondaryRow
