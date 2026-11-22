import React from 'react'
import { figma } from '@figma/code-connect'
import { DataTable, ColumnType } from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR DATATABLE
 *
 * PROP MAPPING DOCUMENTATION
 *
 * 1. FIGMA-ONLY PROPERTIES (not mapped):
 *    - display (VARIANT web/mobile): Responsive presentation variant.
 *      The DataTable renders a mobile card view automatically based on
 *      viewport width. Use `mobileColumnsToShow` to control how many
 *      columns appear in the mobile card layout.
 *    - hscroll (VARIANT true/false): Horizontal scroll behaviour.
 *      Automatic when column widths exceed the container; no prop needed.
 *    - type (VARIANT columnConstruction/rowConstruction): Design-time
 *      construction guide only — not a runtime prop.
 *
 * 2. CODE-ONLY PROPERTIES (not in Figma):
 *    - data: Array of row objects, each keyed by the column `field` names.
 *    - columns: ColumnDefinition[] describing each column's field, header,
 *      type, and options (sorting, filtering, cell rendering).
 *    - idField: Field name used as the unique row identifier.
 *    - enableSearch, pagination, isHoverable: Feature toggles shown in the
 *      example as representative configuration.
 */

figma.connect(
    DataTable,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=18805-438276',
    {
        example: () => (
            <DataTable
                data={[
                    {
                        id: '1',
                        user: {
                            label: 'Alicia Koch',
                            sublabel: 'Designer',
                            imageUrl: 'https://i.pravatar.cc/100?img=1',
                        },
                        status: {
                            text: 'Active',
                            variant: 'subtle',
                            color: 'success',
                        },
                        amount: 276,
                        date: { date: '2025-09-24', format: 'DD MMM YYYY' },
                    },
                    {
                        id: '2',
                        user: {
                            label: 'James Smith',
                            sublabel: 'Developer',
                            imageUrl: 'https://i.pravatar.cc/100?img=2',
                        },
                        status: {
                            text: 'On Leave',
                            variant: 'subtle',
                            color: 'warning',
                        },
                        amount: 4500,
                        date: { date: '2025-10-12', format: 'DD MMM YYYY' },
                    },
                ]}
                columns={[
                    {
                        field: 'user',
                        header: 'User',
                        type: ColumnType.AVATAR,
                        isSortable: true,
                    },
                    {
                        field: 'status',
                        header: 'Status',
                        type: ColumnType.TAG,
                        isSortable: true,
                    },
                    {
                        field: 'amount',
                        header: 'Amount',
                        type: ColumnType.NUMBER,
                        format: 'currency',
                        isSortable: true,
                    },
                    {
                        field: 'date',
                        header: 'Date',
                        type: ColumnType.DATE,
                        dateFormat: 'DD MMM YYYY',
                        isSortable: true,
                    },
                ]}
                idField="id"
                enableSearch
                pagination={{ currentPage: 1, pageSize: 10, totalRows: 2 }}
                isHoverable
            />
        ),

        imports: [
            "import { DataTable, ColumnType } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/DataTable',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-datatable--docs',
            },
        ],
    }
)
