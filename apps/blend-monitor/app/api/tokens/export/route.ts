import { NextRequest, NextResponse } from 'next/server'
import { Pool } from 'pg'
import { ExportService, ExportOptions } from '@/backend/services/exportService'

// Database connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:
        process.env.NODE_ENV === 'production'
            ? { rejectUnauthorized: false }
            : false,
})

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        // Validate request body
        const { format, options = {}, delivery = 'download' } = body

        if (
            !format ||
            !['json', 'css', 'scss', 'js', 'dtcg'].includes(format)
        ) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Invalid format. Must be one of: json, css, scss, js, dtcg',
                },
                { status: 400 }
            )
        }

        // Set default options
        const exportOptions: ExportOptions = {
            format,
            includeFoundation: options.includeFoundation ?? true,
            includeComponents: options.includeComponents ?? true,
            foundationCollections: options.foundationCollections,
            componentCollections: options.componentCollections,
            categories: options.categories,
            components: options.components,
            includeInactive: options.includeInactive ?? false,
        }

        // Validate that at least one type is included
        if (
            !exportOptions.includeFoundation &&
            !exportOptions.includeComponents
        ) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Must include at least foundation tokens or component tokens',
                },
                { status: 400 }
            )
        }

        // Create export service and generate export
        const exportService = new ExportService(pool)
        const result = await exportService.exportTokens(exportOptions)

        if (delivery === 'response') {
            // Return export data in response
            return NextResponse.json({
                success: true,
                data: {
                    content: result.content,
                    filename: result.filename,
                    mimeType: result.mimeType,
                    size: result.size,
                },
            })
        } else {
            // Return file download
            const content =
                typeof result.content === 'string'
                    ? result.content
                    : JSON.stringify(result.content, null, 2)

            const response = new NextResponse(content)

            response.headers.set('Content-Type', result.mimeType)
            response.headers.set(
                'Content-Disposition',
                `attachment; filename="${result.filename}"`
            )
            response.headers.set('Content-Length', result.size.toString())

            return response
        }
    } catch (error) {
        console.error('Error exporting tokens:', error)

        return NextResponse.json(
            {
                success: false,
                error: 'Failed to export tokens',
                details:
                    error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        )
    }
}

// GET endpoint for export preview
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const format = searchParams.get('format') || 'json'
        const includeFoundation =
            searchParams.get('includeFoundation') !== 'false'
        const includeComponents =
            searchParams.get('includeComponents') !== 'false'
        const limit = parseInt(searchParams.get('limit') || '10')

        if (!['json', 'css', 'scss', 'js', 'dtcg'].includes(format)) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Invalid format. Must be one of: json, css, scss, js, dtcg',
                },
                { status: 400 }
            )
        }

        const exportOptions: ExportOptions = {
            format: format as any,
            includeFoundation,
            includeComponents,
            includeInactive: false,
        }

        const exportService = new ExportService(pool)

        // Get limited data for preview
        const foundationTokens = includeFoundation
            ? (
                  await exportService['aggregateFoundationTokens'](
                      exportOptions
                  )
              ).slice(0, limit)
            : []

        const componentTokens = includeComponents
            ? (
                  await exportService['aggregateComponentTokens'](exportOptions)
              ).slice(0, limit)
            : []

        // Generate preview based on format
        let preview = ''

        switch (format) {
            case 'json':
                const jsonData = {
                    metadata: {
                        exportedAt: new Date().toISOString(),
                        version: '1.0.0',
                        preview: true,
                        limitedTo: limit,
                    },
                    foundation:
                        exportService['buildFoundationTokenStructure'](
                            foundationTokens
                        ),
                    components: exportService['buildComponentTokenStructure'](
                        componentTokens,
                        foundationTokens
                    ),
                }
                preview = JSON.stringify(jsonData, null, 2)
                break

            case 'css':
                const cssLines = [
                    '/* Blend Design System Tokens - Preview */',
                    `/* Limited to ${limit} tokens per type */`,
                    '',
                    ':root {',
                ]

                if (foundationTokens.length > 0) {
                    cssLines.push('  /* Foundation Tokens (Preview) */')
                    foundationTokens.slice(0, 5).forEach((token) => {
                        const tokenName = token.subcategory
                            ? `--${token.category}-${token.subcategory}-${token.token_key}`
                            : `--${token.category}-${token.token_key}`
                        cssLines.push(`  ${tokenName}: ${token.token_value};`)
                    })
                    if (foundationTokens.length > 5) {
                        cssLines.push(
                            `  /* ... and ${foundationTokens.length - 5} more foundation tokens */`
                        )
                    }
                    cssLines.push('')
                }

                cssLines.push('}')
                preview = cssLines.join('\n')
                break

            case 'scss':
                const scssLines = [
                    '// Blend Design System Tokens - Preview',
                    `// Limited to ${limit} tokens per type`,
                    '',
                ]

                if (foundationTokens.length > 0) {
                    scssLines.push('// Foundation Tokens (Preview)')
                    foundationTokens.slice(0, 5).forEach((token) => {
                        const tokenName = token.subcategory
                            ? `$${token.category}-${token.subcategory}-${token.token_key}`
                            : `$${token.category}-${token.token_key}`
                        scssLines.push(`${tokenName}: ${token.token_value};`)
                    })
                    if (foundationTokens.length > 5) {
                        scssLines.push(
                            `// ... and ${foundationTokens.length - 5} more foundation tokens`
                        )
                    }
                }

                preview = scssLines.join('\n')
                break

            case 'js':
                const jsData = {
                    foundation: exportService['buildFoundationTokenStructure'](
                        foundationTokens.slice(0, 5)
                    ),
                    components: exportService['buildComponentTokenStructure'](
                        componentTokens.slice(0, 5),
                        foundationTokens,
                        true
                    ),
                }

                const jsLines = [
                    '// Blend Design System Tokens - Preview',
                    `// Limited to ${limit} tokens per type`,
                    '',
                    'export const tokens = ' +
                        JSON.stringify(jsData, null, 2) +
                        ' as const;',
                    '',
                    'export type Tokens = typeof tokens;',
                ]
                preview = jsLines.join('\n')
                break

            case 'dtcg':
                const dtcgData: any = {
                    $schema:
                        'https://design-tokens.github.io/community-group/format/',
                    $metadata: {
                        exportedAt: new Date().toISOString(),
                        tool: 'Blend Tokenizer',
                        version: '1.0.0',
                        preview: true,
                        limitedTo: limit,
                    },
                }

                foundationTokens.slice(0, 5).forEach((token) => {
                    if (!dtcgData[token.category]) {
                        dtcgData[token.category] = {}
                    }

                    const tokenType = exportService['getDtcgTokenType'](
                        token.category
                    )

                    if (token.subcategory) {
                        if (!dtcgData[token.category][token.subcategory]) {
                            dtcgData[token.category][token.subcategory] = {}
                        }
                        dtcgData[token.category][token.subcategory][
                            token.token_key
                        ] = {
                            $type: tokenType,
                            $value: token.token_value,
                        }
                    } else {
                        dtcgData[token.category][token.token_key] = {
                            $type: tokenType,
                            $value: token.token_value,
                        }
                    }
                })

                preview = JSON.stringify(dtcgData, null, 2)
                break
        }

        return NextResponse.json({
            success: true,
            data: {
                preview,
                stats: {
                    foundationTokens: foundationTokens.length,
                    componentTokens: componentTokens.length,
                    totalPreviewTokens:
                        foundationTokens.length + componentTokens.length,
                    limitedTo: limit,
                },
            },
        })
    } catch (error) {
        console.error('Error generating export preview:', error)

        return NextResponse.json(
            {
                success: false,
                error: 'Failed to generate export preview',
                details:
                    error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        )
    }
}
