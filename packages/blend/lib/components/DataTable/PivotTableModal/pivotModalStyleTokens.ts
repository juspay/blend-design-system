import { Theme } from '../../../context/theme.enum'
import type { FoundationTokenType } from '../../../tokens/theme.token'
import type { TableTokenType } from '../dataTable.tokens'

export type PivotModalStyleTokens = {
    modal: {
        minWidth: string
        maxWidth: string
        maxHeight: string
        bodyPadding: string
        bodyGap: string
    }
    rightPanel: {
        width: string
        padding: string
        background: string
        border: string
        borderRadius: string
    }
    shell: {
        display: 'grid'
        gridTemplateColumns: string
        height: string
        overflow: 'hidden'
    }
    layout: {
        wideDesktopMinWidth: number
        wideDesktopColumns: string
        fallbackColumns: string
    }
    panelPadding: string
    configPanelBackground: string
    previewPanelBackground: string
    text: {
        sectionTitle: {
            fontSize: string
            fontWeight: number
            color: string
        }
        fieldLabel: {
            fontSize: string
            fontWeight: number
            color: string
        }
        checkboxLabel: {
            fontSize: string
            color: string
        }
    }
    spacing: {
        sectionGap: string
        builderIntroGap: string
        stackGap: string
        controlsRowGap: string
        iconBadgeGap: string
        sectionHeaderMarginBottom: string
    }
    dropZone: {
        emptyMinHeight: string
        padding: string
        borderRadius: string
        border: string
        background: string
    }
    chip: {
        borderRadius: string
        padding: string
        hoverShadow: string
        hoverTranslateY: string
        transition: string
    }
    iconBadge: {
        size: string
        borderRadius: string
        glyphFontSize: string | number
        glyphFontWeight: number
    }
    sectionLabel: {
        fontWeight: number
        fontSize: string | number
        textTransform: 'uppercase'
        letterSpacing: string
    }
    sectionCount: {
        fontSize: string | number
        color: string
    }
    emptyState: {
        titleFontSize: string | number
        titleColor: string
        exampleFontSize: string | number
        exampleColor: string
        padding: string
        titleMarginBottom: string
    }
    fieldRowLabel: {
        fontSize: string | number
        color: string
        marginBottom: string
    }
    removeButton: {
        minWidth: string
        padding: string
        borderRadius: string
        border: string
        background: string
        hoverBackground: string
        iconColor: string
        iconSize: number
    }
    menuCheckIconSize: number
    preview: {
        headerMarginBottom: string
        titleFontWeight: number
        titleFontSize: string | number
        titleMarginBottom: string
        metaFontSize: string
    }
    bodyLineHeight: string
}

/**
 * Layout and typography for the pivot modal, derived from foundation tokens + responsive table tokens.
 * Section chips use `colors.primary` only (see color.tokens).
 */
export const getPivotModalStyleTokens = (
    f: FoundationTokenType,
    tableToken: TableTokenType,
    theme: Theme | string = Theme.LIGHT
): PivotModalStyleTokens => {
    // The foundation is theme-neutral, so the grey rung has to be chosen here
    // or the modal stays light inside a dark table.
    const isDark = theme === Theme.DARK || theme === 'dark'
    const GRAY_DARK: Record<number, number> = {
        0: 900,
        25: 800,
        50: 800,
        100: 700,
        150: 700,
        200: 700,
        300: 500,
        400: 400,
        500: 300,
        600: 200,
        700: 100,
        800: 50,
        900: 0,
    }
    const gray = new Proxy({} as Record<number, string>, {
        get: (_t, key) => {
            const rung = Number(key)
            const resolved = isDark ? (GRAY_DARK[rung] ?? rung) : rung
            return (f.colors.gray as Record<number, string>)[resolved]
        },
    })
    const { dataTable, header } = tableToken
    const cell = dataTable.table.body.cell

    const rightPanelMinWidth = '360px'

    return {
        modal: {
            minWidth: 'min(95vw, 120rem)',
            maxWidth: '95vw',
            maxHeight: '92vh',
            bodyPadding: f.unit[20],
            bodyGap: f.unit[16],
        },
        rightPanel: {
            width: rightPanelMinWidth,
            padding: f.unit[20],
            background: gray[0] as string,
            border: `${f.border.width[1]} solid ${gray[200]}`,
            borderRadius: f.border.radius[8],
        },
        shell: {
            display: 'grid',
            gridTemplateColumns: `minmax(0, 1fr) ${rightPanelMinWidth}`,
            height: `min(${dataTable.maxHeight}, 85vh)`,
            overflow: 'hidden',
        },
        layout: {
            wideDesktopMinWidth: 1800,
            wideDesktopColumns: `minmax(0, 4fr) minmax(${rightPanelMinWidth}, 1fr)`,
            fallbackColumns: `minmax(0, 1fr) ${rightPanelMinWidth}`,
        },
        panelPadding: f.unit[16],
        configPanelBackground: gray[50] as string,
        previewPanelBackground: dataTable.table.body.backgroundColor as string,
        text: {
            sectionTitle: {
                fontSize: f.font.size.body.md.fontSize,
                fontWeight: f.font.weight[600],
                color: gray[800] as string,
            },
            fieldLabel: {
                fontSize: f.font.size.body.md.fontSize,
                fontWeight: f.font.weight[500],
                color: gray[800] as string,
            },
            checkboxLabel: {
                fontSize: f.font.size.body.sm.fontSize,
                color: gray[600] as string,
            },
        },
        spacing: {
            sectionGap: f.unit[20],
            builderIntroGap: f.unit[20],
            stackGap: f.unit[8],
            controlsRowGap: f.unit[8],
            iconBadgeGap: f.unit[8],
            sectionHeaderMarginBottom: f.unit[12],
        },
        dropZone: {
            emptyMinHeight: f.unit[80],
            padding: f.unit[12],
            borderRadius: f.border.radius[8],
            border: `2px dashed ${gray[200]}`,
            background: gray[0] as string,
        },
        chip: {
            borderRadius: f.border.radius[6],
            padding: `${f.unit[8]} ${f.unit[12]}`,
            hoverShadow: f.shadows.sm,
            hoverTranslateY: `-${f.unit[1]}`,
            transition: 'box-shadow 0.2s ease, transform 0.2s ease',
        },
        iconBadge: {
            size: f.unit[24],
            borderRadius: f.border.radius[4],
            glyphFontSize: f.font.size.body.sm.fontSize,
            glyphFontWeight: 700,
        },
        sectionLabel: {
            fontWeight: 600,
            fontSize: f.font.size.body.sm.fontSize,
            textTransform: 'uppercase',
            letterSpacing: f.unit[0.5],
        },
        sectionCount: {
            fontSize: f.font.size.body.sm.fontSize,
            color: gray[600] as string,
        },
        emptyState: {
            titleFontSize: f.font.size.body.md.fontSize,
            titleColor: gray[800] as string,
            exampleFontSize: f.font.size.body.sm.fontSize,
            exampleColor: gray[400] as string,
            padding: f.unit[16],
            titleMarginBottom: f.unit[8],
        },
        fieldRowLabel: {
            fontSize: f.font.size.body.sm.fontSize,
            color: gray[600] as string,
            marginBottom: f.unit[8],
        },
        removeButton: {
            minWidth: f.unit[28],
            padding: f.unit[4],
            borderRadius: f.border.radius[4],
            border: `${f.border.width[1]} solid ${gray[300]}`,
            background: gray[0] as string,
            hoverBackground: gray[100] as string,
            iconColor: gray[600] as string,
            iconSize: Number.parseInt(String(f.unit[14]), 10) || 14,
        },
        menuCheckIconSize: Number.parseInt(String(f.unit[16]), 10) || 16,
        preview: {
            headerMarginBottom: f.unit[16],
            titleFontWeight: 600,
            titleFontSize: f.font.size.body.md.fontSize,
            titleMarginBottom: f.unit[4],
            metaFontSize: cell.fontSize as string,
        },
        bodyLineHeight: header.description.lineHeight as string,
    } as PivotModalStyleTokens
}
