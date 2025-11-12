import React from 'react'
import Block from '../../Primitives/Block/Block'
import type { MobileNavigationItem as MobileNavigationItemType } from '../types'
import type { MobileNavigationTokenType } from './mobile.tokens'
import MobileNavigationItem from './MobileNavigationItem'
import PrimaryActionButton from './PrimaryActionButton'
import MoreButton from './MoreButton'

type PrimaryRowProps = {
    leftItems: MobileNavigationItemType[]
    rightItems: MobileNavigationItemType[]
    showPrimaryAction: boolean
    hasSecondaryItems: boolean
    tokens: MobileNavigationTokenType
    onItemSelect: (item: MobileNavigationItemType) => void
    onMoreToggle: () => void
    primaryActionButtonProps?: Omit<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        'type'
    >
}

const PrimaryRow: React.FC<PrimaryRowProps> = ({
    leftItems,
    rightItems,
    showPrimaryAction,
    hasSecondaryItems,
    tokens,
    onItemSelect,
    onMoreToggle,
    primaryActionButtonProps,
}) => {
    return (
        <Block
            role="tablist"
            aria-label="Primary navigation"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap={tokens.primaryRow.gap}
            width="100%"
            minHeight={tokens.primaryRow.minHeight}
            paddingTop={tokens.primaryRow.padding.default.top}
            paddingRight={tokens.primaryRow.padding.default.right}
            paddingBottom={tokens.primaryRow.padding.default.bottom}
            paddingLeft={tokens.primaryRow.padding.default.left}
        >
            {showPrimaryAction ? (
                <>
                    {leftItems.map((item, index) => (
                        <MobileNavigationItem
                            key={`${item.label}-${index}`}
                            item={item}
                            index={index}
                            tokens={tokens}
                            onSelect={onItemSelect}
                        />
                    ))}
                    <PrimaryActionButton
                        tokens={tokens}
                        buttonProps={primaryActionButtonProps}
                    />
                    {rightItems.map((item, index) => (
                        <MobileNavigationItem
                            key={`${item.label}-${index + leftItems.length}`}
                            item={item}
                            index={index + leftItems.length}
                            tokens={tokens}
                            onSelect={onItemSelect}
                        />
                    ))}
                </>
            ) : (
                <>
                    {[...leftItems, ...rightItems].map((item, index) => (
                        <MobileNavigationItem
                            key={`${item.label}-${index}`}
                            item={item}
                            index={index}
                            tokens={tokens}
                            onSelect={onItemSelect}
                        />
                    ))}
                </>
            )}

            {hasSecondaryItems && (
                <MoreButton tokens={tokens} onClick={onMoreToggle} />
            )}
        </Block>
    )
}

export default PrimaryRow
