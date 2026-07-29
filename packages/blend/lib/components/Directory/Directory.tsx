'use client'

import React from 'react'
import { createRef, useEffect, useRef } from 'react'
import type { DirectoryProps } from './types'
import Section from './Section'
import VirtualizedDirectory from './VirtualizedDirectory'
import Block from '../Primitives/Block/Block'
import {
    DEFAULT_END_REACHED_THRESHOLD,
    handleSectionNavigation,
    normalizeDirectoryData,
    useDirectoryEndReached,
} from './utils'
import { ActiveItemProvider, ExpandedItemsProvider } from './NavItem'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { DirectoryTokenType } from './directory.tokens'

const Directory = ({
    directoryData: directoryDataProp,
    idPrefix,
    activeItem,
    onActiveItemChange,
    defaultActiveItem,
    iconOnlyMode = false,
    showHierarchyLines = false,
    hierarchyLineBorderRadius = 0,
    expandedItems,
    defaultExpandedItems,
    onExpandedItemsChange,
    onItemExpand,
    onEndReached,
    endReachedThreshold = DEFAULT_END_REACHED_THRESHOLD,
    enableVirtualization = false,
    virtualization,
}: DirectoryProps) => {
    const directoryData = normalizeDirectoryData(directoryDataProp)
    const sectionRefs = useRef<Array<React.RefObject<HTMLDivElement | null>>>(
        []
    )
    const scrollRef = useRef<HTMLDivElement | null>(null)

    const tokens = useResponsiveTokens<DirectoryTokenType>('DIRECTORY')
    useEffect(() => {
        sectionRefs.current = directoryData.map(() =>
            createRef<HTMLDivElement | null>()
        )
    }, [directoryData])

    useDirectoryEndReached({
        scrollRef,
        onEndReached:
            enableVirtualization && !iconOnlyMode ? undefined : onEndReached,
        threshold: endReachedThreshold,
        contentKey: directoryData,
    })

    if (enableVirtualization && !iconOnlyMode) {
        return (
            <VirtualizedDirectory
                directoryData={directoryData}
                idPrefix={idPrefix}
                activeItem={activeItem}
                onActiveItemChange={onActiveItemChange}
                defaultActiveItem={defaultActiveItem}
                showHierarchyLines={showHierarchyLines}
                hierarchyLineBorderRadius={hierarchyLineBorderRadius}
                expandedItems={expandedItems}
                defaultExpandedItems={defaultExpandedItems}
                onExpandedItemsChange={onExpandedItemsChange}
                onItemExpand={onItemExpand}
                onEndReached={onEndReached}
                endReachedThreshold={endReachedThreshold}
                enableVirtualization={enableVirtualization}
                virtualization={virtualization}
            />
        )
    }

    return (
        <ActiveItemProvider
            activeItem={activeItem}
            onActiveItemChange={onActiveItemChange}
            defaultActiveItem={defaultActiveItem}
        >
            <ExpandedItemsProvider
                expandedItems={expandedItems}
                defaultExpandedItems={defaultExpandedItems}
                onExpandedItemsChange={onExpandedItemsChange}
                onItemExpand={onItemExpand}
            >
                <Block
                    as="nav"
                    ref={scrollRef}
                    width="100%"
                    height="100%"
                    flexGrow={1}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    overflow="auto"
                    aria-label="Directory navigation"
                    gap={iconOnlyMode ? '8px' : tokens.gap}
                    paddingX={iconOnlyMode ? '12px' : tokens.paddingX}
                    paddingY={tokens.paddingY}
                >
                    {directoryData.map((section, sectionIndex) => (
                        <Section
                            key={sectionIndex}
                            section={section}
                            sectionIndex={sectionIndex}
                            idPrefix={idPrefix}
                            iconOnlyMode={iconOnlyMode}
                            showHierarchyLines={showHierarchyLines}
                            hierarchyLineBorderRadius={
                                hierarchyLineBorderRadius
                            }
                            onNavigateBetweenSections={(
                                direction,
                                currentIndex
                            ) =>
                                handleSectionNavigation(
                                    direction,
                                    currentIndex,
                                    directoryData.length
                                )
                            }
                        />
                    ))}
                </Block>
            </ExpandedItemsProvider>
        </ActiveItemProvider>
    )
}

Directory.displayName = 'Directory'

export default Directory
