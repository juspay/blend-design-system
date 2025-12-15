import React, {
    createContext,
    useContext,
    useState,
    useMemo,
    useCallback,
} from 'react'
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

type ActiveItemContextValue = {
    activeItem: string | null
    setActiveItem: (item: string | null) => void
    isControlled: boolean
}

// Create context without default value to force usage within provider
const ActiveItemContext = createContext<ActiveItemContextValue | null>(null)

// Hook to safely use the context with error handling
const useActiveItemContext = () => {
    const context = useContext(ActiveItemContext)
    if (!context) {
        throw new Error(
            'useActiveItemContext must be used within ActiveItemProvider'
        )
    }
    return context
}

// Improved Provider Props
type ActiveItemProviderProps = {
    children: React.ReactNode
    /**
     * Controlled mode: Parent controls the active item
     * If provided, internal state is ignored
     */
    activeItem?: string | null
    /**
     * Callback when active item changes (for controlled mode)
     */
    onActiveItemChange?: (item: string | null) => void
    /**
     * Initial active item (for uncontrolled mode)
     */
    defaultActiveItem?: string | null
}

export const ActiveItemProvider: React.FC<ActiveItemProviderProps> = ({
    children,
    activeItem: controlledActiveItem,
    onActiveItemChange,
    defaultActiveItem = null,
}) => {
    const [internalActiveItem, setInternalActiveItem] = useState<string | null>(
        defaultActiveItem
    )

    const isControlled = controlledActiveItem !== undefined

    const activeItem = isControlled ? controlledActiveItem! : internalActiveItem

    const setActiveItem = useCallback(
        (item: string | null) => {
            if (isControlled) {
                onActiveItemChange?.(item)
            } else {
                setInternalActiveItem(item)
            }
        },
        [isControlled, onActiveItemChange]
    )

    const contextValue = useMemo<ActiveItemContextValue>(
        () => ({
            activeItem,
            setActiveItem,
            isControlled,
        }),
        [activeItem, setActiveItem, isControlled]
    )

    return (
        <ActiveItemContext.Provider value={contextValue}>
            {children}
        </ActiveItemContext.Provider>
    )
}

const NavItem = ({
    item,
    index,
    onNavigate,
    itemPath = item.label,
}: NavItemProps) => {
    const tokens = useResponsiveTokens<DirectoryTokenType>('DIRECTORY')
    const [isExpanded, setIsExpanded] = React.useState(false)
    const { activeItem, setActiveItem } = useActiveItemContext()
    const hasChildren = item.items && item.items.length > 0
    const isActive =
        item.isSelected !== undefined
            ? item.isSelected && !hasChildren
            : !hasChildren &&
              (activeItem === itemPath || activeItem === item.label)

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
        } else {
            setActiveItem(itemPath)
            item.onClick?.()
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
                aria-expanded={
                    hasChildren ? (isExpanded ? true : false) : undefined
                }
                aria-label={item.label}
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
                    role="list"
                    aria-label={`${item.label} submenu`}
                >
                    {item.items &&
                        item.items.map((childItem, childIdx) => (
                            <NavItem
                                key={childIdx}
                                item={childItem}
                                index={childIdx}
                                itemPath={`${itemPath}/${childItem.label}`}
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
