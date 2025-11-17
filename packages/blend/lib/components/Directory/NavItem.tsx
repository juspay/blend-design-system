import React, { createContext, useContext, useState } from 'react'
import type { NavItemProps } from './types'
import { ChevronDown } from 'lucide-react'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import styled from 'styled-components'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { DirectoryTokenType } from './directory.tokens'
import { handleKeyDown } from './utils'

const StyledElement = styled(Block)<{
    $isLink?: boolean
    $isActive?: boolean
    $tokens: DirectoryTokenType
}>`
    background-color: ${({ $isActive, $tokens }) =>
        $isActive
            ? $tokens.section.itemList.item.backgroundColor.active
            : $tokens.section.itemList.item.backgroundColor.default};
    border: none;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: ${({ $tokens }) => $tokens.section.itemList.item.gap};
    padding: ${({ $tokens }) =>
        `${$tokens.section.itemList.item.padding.y} ${$tokens.section.itemList.item.padding.x}`};
    color: ${({ $isActive, $tokens }) =>
        $isActive
            ? $tokens.section.itemList.item.color.active
            : $tokens.section.itemList.item.color.default};
    font-weight: ${({ $tokens }) => $tokens.section.itemList.item.fontWeight};
    border-radius: ${({ $tokens }) =>
        $tokens.section.itemList.item.borderRadius};
    transition: ${({ $tokens }) => $tokens.section.itemList.item.transition};
    user-select: none;
    cursor: pointer;

    &:hover,
    &:focus {
        background-color: ${({ $isActive, $tokens }) =>
            $isActive
                ? $tokens.section.itemList.item.backgroundColor.active
                : $tokens.section.itemList.item.backgroundColor.hover};
        color: ${({ $isActive, $tokens }) =>
            $isActive
                ? $tokens.section.itemList.item.color.active
                : $tokens.section.itemList.item.color.hover};
        outline: none;
        ring: 0;
    }
`

const ChevronWrapper = styled(Block)<{
    $isExpanded: boolean
    $tokens: DirectoryTokenType
}>`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;

    & > svg {
        width: ${({ $tokens }) => $tokens.section.itemList.item.chevron.width};
        height: ${({ $tokens }) => $tokens.section.itemList.item.chevron.width};
        transition: transform 150ms;
        transform: ${({ $isExpanded }) =>
            $isExpanded ? 'rotate(180deg)' : 'rotate(0)'};
    }
`

const NestedList = styled(Block)<{ $tokens: DirectoryTokenType }>`
    width: 100%;
    padding-left: ${({ $tokens }) =>
        $tokens.section.itemList.nested.paddingLeft};
    margin-top: ${({ $tokens }) => $tokens.section.itemList.nested.marginTop};
    position: relative;

    & > div:first-child {
        position: absolute;
        left: ${({ $tokens }) =>
            $tokens.section.itemList.nested.border.leftOffset};
        top: 0;
        height: 100%;
        width: ${({ $tokens }) => $tokens.section.itemList.nested.border.width};
        background-color: ${({ $tokens }) =>
            $tokens.section.itemList.nested.border.color};
    }
`

const ActiveItemContext = createContext<{
    activeItem: string | null
    setActiveItem: (item: string | null) => void
}>({
    activeItem: null,
    setActiveItem: () => {},
})

export const ActiveItemProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [activeItem, setActiveItem] = useState<string | null>(null)

    return (
        <ActiveItemContext.Provider value={{ activeItem, setActiveItem }}>
            {children}
        </ActiveItemContext.Provider>
    )
}

const NavItem = ({ item, index, onNavigate }: NavItemProps) => {
    const tokens = useResponsiveTokens<DirectoryTokenType>('DIRECTORY')
    const [isExpanded, setIsExpanded] = React.useState(false)
    const { activeItem, setActiveItem } = useContext(ActiveItemContext)
    const isActive =
        item.isSelected !== undefined
            ? item.isSelected
            : activeItem === item.label

    const hasChildren = item.items && item.items.length > 0
    const itemRef = React.useRef<HTMLButtonElement | HTMLAnchorElement>(null)

    const refCallback = React.useCallback(
        (node: HTMLButtonElement | HTMLAnchorElement | null) => {
            itemRef.current = node
        },
        []
    )

    const handleClick = () => {
        if (hasChildren) {
            setIsExpanded(!isExpanded)
        } else if (item.onClick) {
            if (item.isSelected === undefined) {
                setActiveItem(item.label)
            }
            item.onClick()
        }
    }

    const Element = item.href ? 'a' : 'button'
    const elementProps = item.href ? { href: item.href } : {}

    return (
        <li style={{ width: '100%' }}>
            <StyledElement
                as={Element}
                $isLink={!!item.href}
                $isActive={isActive}
                $tokens={tokens}
                {...elementProps}
                ref={refCallback}
                onClick={handleClick}
                onKeyDown={(e: React.KeyboardEvent) =>
                    handleKeyDown(e, {
                        hasChildren,
                        isExpanded,
                        setIsExpanded,
                        handleClick,
                        index,
                        onNavigate,
                    })
                }
                aria-expanded={hasChildren ? isExpanded : undefined}
                role={!item.href ? 'button' : undefined}
                tabIndex={0}
                data-sidebar-selected={isActive}
                data-sidebar-sub-option={item.label}
                data-sidebar-expanded={hasChildren ? isExpanded : undefined}
            >
                <Block
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-start"
                    gap="8px"
                >
                    {item.leftSlot && React.isValidElement(item.leftSlot) && (
                        <Block aria-hidden="true">
                            {React.cloneElement(
                                item.leftSlot as React.ReactElement<
                                    React.SVGProps<SVGSVGElement>
                                >,
                                {
                                    color: isActive
                                        ? tokens.section.itemList.item.color
                                              .active
                                        : tokens.section.itemList.item.color
                                              .default,
                                }
                            )}
                        </Block>
                    )}
                    <Text
                        as="span"
                        variant="body.md"
                        color={
                            isActive
                                ? tokens.section.itemList.item.color.active
                                : tokens.section.itemList.item.color.default
                        }
                    >
                        {item.label}
                    </Text>
                    {item.rightSlot && React.isValidElement(item.rightSlot) && (
                        <Block aria-hidden="true">{item.rightSlot}</Block>
                    )}
                </Block>
                {hasChildren && (
                    <ChevronWrapper
                        $isExpanded={isExpanded}
                        $tokens={tokens}
                        aria-hidden="true"
                    >
                        <ChevronDown
                            color={tokens.section.itemList.item.chevron.color}
                        />
                    </ChevronWrapper>
                )}
            </StyledElement>

            {hasChildren && isExpanded && (
                <NestedList
                    as="ul"
                    $tokens={tokens}
                    role="group"
                    aria-label={`${item.label} submenu`}
                >
                    <Block aria-hidden="true" />
                    {item.items &&
                        item.items.map((childItem, childIdx) => (
                            <NavItem
                                key={childIdx}
                                item={childItem}
                                index={childIdx}
                                onNavigate={(direction, currentIndex) => {
                                    if (
                                        direction === 'up' &&
                                        currentIndex === 0
                                    ) {
                                        itemRef.current?.focus()
                                    } else if (
                                        direction === 'down' &&
                                        currentIndex ===
                                            (item.items?.length || 0) - 1
                                    ) {
                                        onNavigate('down', index)
                                    } else {
                                        const nextIndex =
                                            direction === 'up'
                                                ? Math.max(0, currentIndex - 1)
                                                : Math.min(
                                                      (item.items?.length ||
                                                          0) - 1,
                                                      currentIndex + 1
                                                  )
                                        const nestedItems =
                                            itemRef.current?.parentElement
                                                ?.querySelector('ul')
                                                ?.querySelectorAll('button, a')
                                        if (
                                            nestedItems &&
                                            nestedItems[nextIndex]
                                        ) {
                                            ;(
                                                nestedItems[
                                                    nextIndex
                                                ] as HTMLElement
                                            ).focus()
                                        }
                                    }
                                }}
                            />
                        ))}
                </NestedList>
            )}
        </li>
    )
}

export default NavItem
