'use client'

import React from 'react'
import { createRef, useEffect, useRef } from 'react'
import type { DirectoryProps } from './types'
import Section from './Section'
import Block from '../Primitives/Block/Block'
import { handleSectionNavigation } from './utils'
import { ActiveItemProvider } from './NavItem'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { DirectoryTokenType } from './directory.tokens'

const Directory = ({ directoryData, className, idPrefix }: DirectoryProps) => {
    const sectionRefs = useRef<Array<React.RefObject<HTMLDivElement | null>>>(
        []
    )

    const tokens = useResponsiveTokens<DirectoryTokenType>('DIRECTORY')
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
                gap={tokens.gap}
                paddingX={tokens.paddingX}
                paddingY={tokens.paddingY}
            >
                {directoryData.map((section, sectionIndex) => (
                    <Section
                        key={sectionIndex}
                        section={section}
                        sectionIndex={sectionIndex}
                        idPrefix={idPrefix}
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
