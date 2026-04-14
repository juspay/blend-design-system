import type { FoundationTokenType } from '../../../tokens/theme.token'
import type { TableTokenType } from '../dataTable.tokens'

/** Chip / badge colors for pivot builder sections (all from foundation color tokens). */
export type PivotModalSectionAccent = {
    background: string
    border: string
    text: string
    icon: string
}

export type PivotModalStyleTokens = {
    modal: {
        minWidth: string
        maxWidth: string
        maxHeight: string
    }
    shell: {
        display: 'grid'
        gridTemplateColumns: string
        height: string
        overflow: 'hidden'
    }
    panelPadding: string
    configPanelBackground: string
    previewPanelBackground: string
    /** Same primary palette for every section — no ad-hoc palettes. */
    sectionAccent: {
        row: PivotModalSectionAccent
        column: PivotModalSectionAccent
        value: PivotModalSectionAccent
        filter: PivotModalSectionAccent
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
    valueFieldTitle: {
        fontSize: string | number
        fontWeight: number
    }
    menuCheckIconSize: number
    preview: {
        headerMarginBottom: string
        titleFontWeight: number
        titleFontSize: string | number
        titleMarginBottom: string
        metaFontSize: string
    }
    builder: {
        titleFontWeight: number
        titleFontSize: string
        bodyFontSize: string
        bodyLineHeight: string
        bodyMarginTop: string
    }
}

/**
 * Layout and typography for the pivot modal, derived from foundation tokens + responsive table tokens.
 * Section chips use `colors.primary` only (see color.tokens).
 */
export const getPivotModalStyleTokens = (
    f: FoundationTokenType,
    tableToken: TableTokenType
): PivotModalStyleTokens => {
    const { dataTable, header } = tableToken
    const cell = dataTable.table.body.cell
    const primary = f.colors.primary

    const sectionAccent: PivotModalSectionAccent = {
        background: primary[50] as string,
        border: primary[200] as string,
        text: primary[700] as string,
        icon: primary[600] as string,
    }

    const configColumnWidth = `calc(${f.unit[350]} + ${f.unit[32]})`

    return {
        modal: {
            minWidth: 'min(95vw, 120rem)',
            maxWidth: '95vw',
            maxHeight: '92vh',
        },
        shell: {
            display: 'grid',
            gridTemplateColumns: `1fr ${configColumnWidth}`,
            height: `min(${dataTable.maxHeight}, 85vh)`,
            overflow: 'hidden',
        },
        panelPadding: f.unit[16],
        configPanelBackground: f.colors.gray[50] as string,
        previewPanelBackground: dataTable.table.body.backgroundColor as string,
        sectionAccent: {
            row: sectionAccent,
            column: sectionAccent,
            value: sectionAccent,
            filter: sectionAccent,
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
            border: `2px dashed ${f.colors.gray[200]}`,
            background: f.colors.gray[0] as string,
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
            color: f.colors.gray[600] as string,
        },
        emptyState: {
            titleFontSize: f.font.size.body.md.fontSize,
            titleColor: f.colors.gray[500] as string,
            exampleFontSize: f.font.size.body.sm.fontSize,
            exampleColor: f.colors.gray[400] as string,
            padding: f.unit[16],
            titleMarginBottom: f.unit[8],
        },
        fieldRowLabel: {
            fontSize: f.font.size.body.sm.fontSize,
            color: f.colors.gray[600] as string,
            marginBottom: f.unit[8],
        },
        removeButton: {
            minWidth: f.unit[28],
            padding: f.unit[4],
            borderRadius: f.border.radius[4],
            border: `${f.border.width[1]} solid ${f.colors.gray[300]}`,
            background: f.colors.gray[0] as string,
            hoverBackground: f.colors.gray[100] as string,
            iconColor: f.colors.gray[600] as string,
            iconSize: Number.parseInt(String(f.unit[14]), 10) || 14,
        },
        valueFieldTitle: {
            fontSize: f.font.size.body.md.fontSize,
            fontWeight: 600,
        },
        menuCheckIconSize: Number.parseInt(String(f.unit[16]), 10) || 16,
        preview: {
            headerMarginBottom: f.unit[16],
            titleFontWeight: 600,
            titleFontSize: f.font.size.body.md.fontSize,
            titleMarginBottom: f.unit[4],
            metaFontSize: cell.fontSize as string,
        },
        builder: {
            titleFontWeight: header.title.fontWeight as number,
            titleFontSize: header.title.fontSize as string,
            bodyFontSize: cell.fontSize as string,
            bodyLineHeight: header.description.lineHeight as string,
            bodyMarginTop: f.unit[4],
        },
    } as PivotModalStyleTokens
}
