import type { DirectoryTokenType } from '../Directory/directory.tokens.types'
import type { SidebarV3TokensType } from './sidebarV3.tokens.types'

/** Explicit V3 appearance for Directory; consumer DIRECTORY values remain the base. */
export const getSidebarV3DirectoryTokens = (
    directory: DirectoryTokenType,
    sidebar: SidebarV3TokensType
): DirectoryTokenType => {
    const itemList = directory.section.itemList
    const item = itemList.item
    return {
        ...directory,
        section: {
            ...directory.section,
            separator: {
                color: sidebar.navigation.separatorColor,
                height: sidebar.navigation.separatorWidth,
                offset: sidebar.navigation.separatorOffset,
            },
            itemList: {
                ...itemList,
                item: {
                    ...item,
                    transition: `background-color ${sidebar.navigation.feedbackDuration} ${sidebar.navigation.feedbackEasing}, color ${sidebar.navigation.feedbackDuration} ${sidebar.navigation.feedbackEasing}`,
                    backgroundColor: {
                        ...item.backgroundColor,
                        hover: sidebar.navigation.hoverBackgroundColor,
                        active: sidebar.navigation.selectedBackgroundColor,
                        activePath: sidebar.container.backgroundColor,
                    },
                    color: {
                        ...item.color,
                        active: sidebar.navigation.selectedColor,
                        activePath: sidebar.navigation.selectedColor,
                    },
                },
                nested: {
                    ...itemList.nested,
                    border: {
                        ...itemList.nested.border,
                        color: sidebar.navigation.guideColor,
                    },
                    connector: {
                        ...itemList.nested.connector,
                        straightGuideOffset: sidebar.navigation.guideOffset,
                    },
                },
            },
        },
    }
}
