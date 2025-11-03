'use client'

import React from 'react'
import { createRef, useEffect, useRef } from 'react'
import type { DirectoryProps } from './types'
import Section from './Section'
import Block from '../Primitives/Block/Block'
import { handleSectionNavigation } from './utils'
import { ActiveItemProvider } from './NavItem'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { SidebarTokenType } from '../Sidebar/sidebar.tokens'

const Directory = ({ directoryData, className }: DirectoryProps) => {
    const sectionRefs = useRef<Array<React.RefObject<HTMLDivElement | null>>>(
        []
    )

    const tokens = useResponsiveTokens<SidebarTokenType>('SIDEBAR')
    useEffect(() => {
        sectionRefs.current = directoryData.map(() =>
            createRef<HTMLDivElement | null>()
        )
    }, [directoryData])

    return (
        <ActiveItemProvider>
            <Block
                as="nav"
                width="100%"
                height="100%"
                flexGrow={1}
                display="flex"
                flexDirection="column"
                alignItems="center"
                overflow="auto"
                className={className}
                aria-label="Directory navigation"
                gap={tokens.directory.gap}
                paddingX={tokens.directory.paddingX}
                paddingY={tokens.directory.paddingY}
            >
                {directoryData.map((section, sectionIndex) => (
                    <Section
                        key={sectionIndex}
                        section={section}
                        sectionIndex={sectionIndex}
                        onNavigateBetweenSections={(direction, currentIndex) =>
                            handleSectionNavigation(
                                direction,
                                currentIndex,
                                directoryData.length
                            )
                        }
                    />
                ))}
            </Block>
        </ActiveItemProvider>
    )
}

Directory.displayName = 'Directory'

export default Directory
