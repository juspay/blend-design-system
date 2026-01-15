import React from 'react'
import type { SectionProps } from './types'
import { ChevronDown } from 'lucide-react'
import NavItem from './NavItem'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import styled from 'styled-components'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { DirectoryTokenType } from './directory.tokens'

const ChevronWrapper = styled(Block)<{ $isOpen: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;

    & > svg {
        width: 16px;
        height: 16px;
        transition: transform 150ms;
        transform: ${({ $isOpen }) =>
            $isOpen ? 'rotate(180deg)' : 'rotate(0)'};
    }
`

const Section = ({
    section,
    sectionIndex,
    // totalSections,
    onNavigateBetweenSections,
    idPrefix,
    iconOnlyMode = false,
}: SectionProps) => {
    const tokens = useResponsiveTokens<DirectoryTokenType>('DIRECTORY')
    const [isOpen, setIsOpen] = React.useState(section.defaultOpen !== false)
    const sectionRef = React.useRef<HTMLDivElement>(null)
    const headerRef = React.useRef<HTMLDivElement>(null)
    const itemRefs = React.useRef<Array<React.RefObject<HTMLElement | null>>>(
        []
    )

    React.useEffect(() => {
        if (section.items) {
            itemRefs.current = section.items.map(() =>
                React.createRef<HTMLElement | null>()
            )
        }
    }, [section.items])

    const toggleSection = () => {
        setIsOpen(!isOpen)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            toggleSection()
        } else if (e.key === 'ArrowDown') {
            e.preventDefault()
            if (!isOpen) {
                setIsOpen(true)
            } else {
                const firstItem = sectionRef.current
                    ?.querySelector('ul')
                    ?.querySelector('button, a')
                if (firstItem) {
                    ;(firstItem as HTMLElement).focus()
                } else {
                    onNavigateBetweenSections('down', sectionIndex)
                }
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            onNavigateBetweenSections('up', sectionIndex)
        }
    }

    const handleItemNavigation = (
        direction: 'up' | 'down',
        currentIndex: number
    ) => {
        if (direction === 'up') {
            if (currentIndex === 0) {
                headerRef.current?.focus()
            } else {
                const prevItem = sectionRef.current
                    ?.querySelector('ul')
                    ?.querySelectorAll('button, a')[currentIndex - 1]
                if (prevItem) {
                    ;(prevItem as HTMLElement).focus()
                }
            }
        } else {
            if (currentIndex === (section.items?.length || 0) - 1) {
                onNavigateBetweenSections('down', sectionIndex)
            } else {
                const nextItem = sectionRef.current
                    ?.querySelector('ul')
                    ?.querySelectorAll('button, a')[currentIndex + 1]
                if (nextItem) {
                    ;(nextItem as HTMLElement).focus()
                }
            }
        }
    }

    const isCollapsible = section.isCollapsible !== false

    return (
        <Block
            display="flex"
            flexDirection="column"
            gap={iconOnlyMode ? '8px' : tokens.section.gap}
            width="100%"
            ref={sectionRef}
            data-state={isOpen ? 'open' : 'closed'}
            key={`section-${sectionIndex}`}
            data-element="sidebar-section"
            data-id={section.label || `section-${sectionIndex}`}
            data-status={isOpen ? 'expanded' : 'collapsed'}
        >
            {section.label && !iconOnlyMode && (
                <Block
                    display="flex"
                    alignItems="center"
                    paddingX={tokens.section.header.padding.x}
                    paddingY={tokens.section.header.padding.y}
                    // userSelect="none"
                    cursor={isCollapsible ? 'pointer' : undefined}
                    ref={headerRef}
                    // $isCollapsible={isCollapsible}
                    onClick={isCollapsible ? toggleSection : undefined}
                    onKeyDown={isCollapsible ? handleKeyDown : undefined}
                    role={isCollapsible ? 'button' : undefined}
                    tabIndex={isCollapsible ? 0 : undefined}
                    aria-expanded={
                        isCollapsible ? (isOpen ? true : false) : undefined
                    }
                    aria-controls={
                        isCollapsible && isOpen
                            ? `${idPrefix || ''}section-content-${sectionIndex}`
                            : undefined
                    }
                    aria-label={
                        isCollapsible && section.label
                            ? `${section.label}, ${isOpen ? 'expanded' : 'collapsed'}`
                            : undefined
                    }
                >
                    <Text
                        variant="body.sm"
                        color={tokens.section.header.label.color}
                        fontWeight={tokens.section.header.label.fontWeight}
                    >
                        {section.label.toUpperCase()}
                    </Text>
                    {isCollapsible && (
                        <ChevronWrapper $isOpen={isOpen} aria-hidden="true">
                            <ChevronDown
                                color={tokens.section.header.chevron.color}
                                size={tokens.section.header.chevron.width}
                            />
                        </ChevronWrapper>
                    )}
                </Block>
            )}

            {iconOnlyMode && sectionIndex > 0 && (
                <Block
                    width="32px"
                    height="1px"
                    backgroundColor={tokens.section.header.label.color}
                    style={{
                        opacity: 0.2,
                        margin: '0 auto 8px auto',
                    }}
                    role="separator"
                    aria-hidden="true"
                />
            )}

            {section.items && isOpen && (
                <ul
                    style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: tokens.section.itemList.gap,
                    }}
                    id={`${idPrefix || ''}section-content-${sectionIndex}`}
                    role="list"
                    aria-label={
                        section.label
                            ? `${section.label} navigation`
                            : undefined
                    }
                >
                    {section.items.map((item, itemIdx) => (
                        <NavItem
                            key={itemIdx}
                            item={item}
                            index={itemIdx}
                            itemPath={item.label}
                            iconOnlyMode={iconOnlyMode}
                            onNavigate={handleItemNavigation}
                        />
                    ))}
                </ul>
            )}
        </Block>
    )
}

export default Section
