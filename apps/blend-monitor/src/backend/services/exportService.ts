import { Pool } from 'pg'

export interface ExportOptions {
    format: 'json' | 'css' | 'scss' | 'js' | 'dtcg'
    includeFoundation: boolean
    includeComponents: boolean
    foundationCollections?: string[]
    componentCollections?: string[]
    categories?: string[]
    components?: string[]
    includeInactive?: boolean
}

export interface ExportResult {
    content: string | object
    filename: string
    mimeType: string
    size: number
}

export interface FoundationTokenData {
    id: string
    collection_id: string
    category: string
    subcategory?: string
    token_key: string
    token_value: string
    is_active: boolean
    collection_name: string
}

export interface ComponentTokenData {
    id: string
    collection_id: string
    token_path: string
    foundation_token_reference: string
    breakpoint: string
    is_active: boolean
    component_name: string
    collection_name: string
}

export class ExportService {
    private pool: Pool

    constructor(pool: Pool) {
        this.pool = pool
    }

    async exportTokens(options: ExportOptions): Promise<ExportResult> {
        const foundationTokens = options.includeFoundation
            ? await this.aggregateFoundationTokens(options)
            : []

        const componentTokens = options.includeComponents
            ? await this.aggregateComponentTokens(options)
            : []

        switch (options.format) {
            case 'json':
                return this.generateJsonExport(
                    foundationTokens,
                    componentTokens,
                    options
                )
            case 'css':
                return this.generateCssExport(
                    foundationTokens,
                    componentTokens,
                    options
                )
            case 'scss':
                return this.generateScssExport(
                    foundationTokens,
                    componentTokens,
                    options
                )
            case 'js':
                return this.generateJsExport(
                    foundationTokens,
                    componentTokens,
                    options
                )
            case 'dtcg':
                return this.generateDtcgExport(
                    foundationTokens,
                    componentTokens,
                    options
                )
            default:
                throw new Error(`Unsupported export format: ${options.format}`)
        }
    }

    private async aggregateFoundationTokens(
        options: ExportOptions
    ): Promise<FoundationTokenData[]> {
        const client = await this.pool.connect()

        try {
            let query = `
                SELECT 
                    ft.id,
                    ft.collection_id,
                    ft.category,
                    ft.subcategory,
                    ft.token_key,
                    ft.token_value,
                    ft.is_active,
                    ftc.name as collection_name
                FROM foundation_tokens ft
                JOIN foundation_token_collections ftc ON ft.collection_id = ftc.id
                WHERE 1=1
            `

            const params: any[] = []
            let paramIndex = 1

            if (!options.includeInactive) {
                query += ` AND ft.is_active = true`
            }

            if (
                options.foundationCollections &&
                options.foundationCollections.length > 0
            ) {
                query += ` AND ftc.name = ANY($${paramIndex})`
                params.push(options.foundationCollections)
                paramIndex++
            }

            if (options.categories && options.categories.length > 0) {
                query += ` AND ft.category = ANY($${paramIndex})`
                params.push(options.categories)
                paramIndex++
            }

            query += ` ORDER BY ft.category, ft.subcategory, ft.token_key`

            const result = await client.query(query, params)
            return result.rows
        } finally {
            client.release()
        }
    }

    private async aggregateComponentTokens(
        options: ExportOptions
    ): Promise<ComponentTokenData[]> {
        const client = await this.pool.connect()

        try {
            let query = `
                SELECT 
                    ct.id,
                    ct.collection_id,
                    ct.token_path,
                    ct.foundation_token_reference,
                    ct.breakpoint,
                    ct.is_active,
                    cc.component_name,
                    cc.name as collection_name
                FROM component_tokens ct
                JOIN component_token_collections cc ON ct.collection_id = cc.id
                WHERE 1=1
            `

            const params: any[] = []
            let paramIndex = 1

            if (!options.includeInactive) {
                query += ` AND ct.is_active = true`
            }

            if (
                options.componentCollections &&
                options.componentCollections.length > 0
            ) {
                query += ` AND cc.name = ANY($${paramIndex})`
                params.push(options.componentCollections)
                paramIndex++
            }

            if (options.components && options.components.length > 0) {
                query += ` AND cc.component_name = ANY($${paramIndex})`
                params.push(options.components)
                paramIndex++
            }

            query += ` ORDER BY cc.component_name, ct.token_path`

            const result = await client.query(query, params)
            return result.rows
        } finally {
            client.release()
        }
    }

    private generateJsonExport(
        foundationTokens: FoundationTokenData[],
        componentTokens: ComponentTokenData[],
        options: ExportOptions
    ): ExportResult {
        const exportData = {
            metadata: {
                exportedAt: new Date().toISOString(),
                version: '1.0.0',
                foundationCollections: options.foundationCollections || [],
                componentCollections: options.componentCollections || [],
                includeInactive: options.includeInactive || false,
            },
            foundation: this.buildFoundationTokenStructure(foundationTokens),
            components: this.buildComponentTokenStructure(
                componentTokens,
                foundationTokens
            ),
        }

        const content = JSON.stringify(exportData, null, 2)

        return {
            content: exportData,
            filename: `blend-tokens-${new Date().toISOString().split('T')[0]}.json`,
            mimeType: 'application/json',
            size: Buffer.byteLength(content, 'utf8'),
        }
    }

    private generateCssExport(
        foundationTokens: FoundationTokenData[],
        componentTokens: ComponentTokenData[],
        options: ExportOptions
    ): ExportResult {
        const lines = [
            '/* Blend Design System Tokens */',
            `/* Exported: ${new Date().toISOString()} */`,
            '',
            ':root {',
        ]

        // Foundation tokens
        if (foundationTokens.length > 0) {
            lines.push('  /* Foundation Tokens */')

            const groupedTokens = this.groupTokensByCategory(foundationTokens)

            Object.entries(groupedTokens).forEach(([category, tokens]) => {
                lines.push(
                    `  /* ${category.charAt(0).toUpperCase() + category.slice(1)} */`
                )

                tokens.forEach((token) => {
                    const tokenName = token.subcategory
                        ? `--${category}-${token.subcategory}-${token.token_key}`
                        : `--${category}-${token.token_key}`
                    lines.push(`  ${tokenName}: ${token.token_value};`)
                })
                lines.push('')
            })
        }

        // Component tokens
        if (componentTokens.length > 0) {
            lines.push('  /* Component Tokens */')

            const groupedComponents =
                this.groupTokensByComponent(componentTokens)

            Object.entries(groupedComponents).forEach(([component, tokens]) => {
                lines.push(`  /* ${component} */`)

                tokens.forEach((token) => {
                    const tokenName = `--${component.toLowerCase()}-${token.token_path.replace(/\./g, '-')}`
                    const tokenValue = this.resolveTokenReference(
                        token.foundation_token_reference,
                        foundationTokens
                    )
                    lines.push(`  ${tokenName}: ${tokenValue};`)
                })
                lines.push('')
            })
        }

        lines.push('}')

        const content = lines.join('\n')

        return {
            content,
            filename: `blend-tokens-${new Date().toISOString().split('T')[0]}.css`,
            mimeType: 'text/css',
            size: Buffer.byteLength(content, 'utf8'),
        }
    }

    private generateScssExport(
        foundationTokens: FoundationTokenData[],
        componentTokens: ComponentTokenData[],
        options: ExportOptions
    ): ExportResult {
        const lines = [
            '// Blend Design System Tokens',
            `// Exported: ${new Date().toISOString()}`,
            '',
        ]

        // Foundation tokens
        if (foundationTokens.length > 0) {
            lines.push('// Foundation Tokens')

            const groupedTokens = this.groupTokensByCategory(foundationTokens)

            Object.entries(groupedTokens).forEach(([category, tokens]) => {
                lines.push(
                    `// ${category.charAt(0).toUpperCase() + category.slice(1)}`
                )

                tokens.forEach((token) => {
                    const tokenName = token.subcategory
                        ? `$${category}-${token.subcategory}-${token.token_key}`
                        : `$${category}-${token.token_key}`
                    lines.push(`${tokenName}: ${token.token_value};`)
                })
                lines.push('')
            })
        }

        // Component tokens
        if (componentTokens.length > 0) {
            lines.push('// Component Tokens')

            const groupedComponents =
                this.groupTokensByComponent(componentTokens)

            Object.entries(groupedComponents).forEach(([component, tokens]) => {
                lines.push(`// ${component}`)

                tokens.forEach((token) => {
                    const tokenName = `$${component.toLowerCase()}-${token.token_path.replace(/\./g, '-')}`
                    const tokenValue = this.resolveTokenReferenceScss(
                        token.foundation_token_reference,
                        foundationTokens
                    )
                    lines.push(`${tokenName}: ${tokenValue};`)
                })
                lines.push('')
            })
        }

        const content = lines.join('\n')

        return {
            content,
            filename: `blend-tokens-${new Date().toISOString().split('T')[0]}.scss`,
            mimeType: 'text/scss',
            size: Buffer.byteLength(content, 'utf8'),
        }
    }

    private generateJsExport(
        foundationTokens: FoundationTokenData[],
        componentTokens: ComponentTokenData[],
        options: ExportOptions
    ): ExportResult {
        const exportData = {
            foundation: this.buildFoundationTokenStructure(foundationTokens),
            components: this.buildComponentTokenStructure(
                componentTokens,
                foundationTokens,
                true
            ),
        }

        const lines = [
            '// Blend Design System Tokens',
            `// Exported: ${new Date().toISOString()}`,
            '',
            'export const tokens = ' +
                JSON.stringify(exportData, null, 2) +
                ' as const;',
            '',
            'export type Tokens = typeof tokens;',
        ]

        const content = lines.join('\n')

        return {
            content,
            filename: `blend-tokens-${new Date().toISOString().split('T')[0]}.ts`,
            mimeType: 'text/typescript',
            size: Buffer.byteLength(content, 'utf8'),
        }
    }

    private generateDtcgExport(
        foundationTokens: FoundationTokenData[],
        componentTokens: ComponentTokenData[],
        options: ExportOptions
    ): ExportResult {
        const dtcgData: any = {
            $schema: 'https://design-tokens.github.io/community-group/format/',
            $metadata: {
                exportedAt: new Date().toISOString(),
                tool: 'Blend Tokenizer',
                version: '1.0.0',
            },
        }

        // Add foundation tokens
        foundationTokens.forEach((token) => {
            const category = token.category
            const subcategory = token.subcategory
            const key = token.token_key

            if (!dtcgData[category]) {
                dtcgData[category] = {}
            }

            const tokenType = this.getDtcgTokenType(category)

            if (subcategory) {
                if (!dtcgData[category][subcategory]) {
                    dtcgData[category][subcategory] = {}
                }
                dtcgData[category][subcategory][key] = {
                    $type: tokenType,
                    $value: token.token_value,
                }
            } else {
                dtcgData[category][key] = {
                    $type: tokenType,
                    $value: token.token_value,
                }
            }
        })

        // Add component tokens
        if (componentTokens.length > 0) {
            dtcgData.components = {}

            const groupedComponents =
                this.groupTokensByComponent(componentTokens)

            Object.entries(groupedComponents).forEach(([component, tokens]) => {
                dtcgData.components[component.toLowerCase()] = {}

                tokens.forEach((token) => {
                    const pathParts = token.token_path.split('.')
                    let current = dtcgData.components[component.toLowerCase()]

                    for (let i = 0; i < pathParts.length - 1; i++) {
                        if (!current[pathParts[i]]) {
                            current[pathParts[i]] = {}
                        }
                        current = current[pathParts[i]]
                    }

                    const finalKey = pathParts[pathParts.length - 1]
                    current[finalKey] = {
                        $type: 'color', // Default to color, could be enhanced
                        $value: `{${token.foundation_token_reference}}`,
                    }
                })
            })
        }

        const content = JSON.stringify(dtcgData, null, 2)

        return {
            content: dtcgData,
            filename: `blend-tokens-${new Date().toISOString().split('T')[0]}.dtcg.json`,
            mimeType: 'application/json',
            size: Buffer.byteLength(content, 'utf8'),
        }
    }

    private buildFoundationTokenStructure(
        tokens: FoundationTokenData[]
    ): Record<string, any> {
        const structure: Record<string, any> = {}

        tokens.forEach((token) => {
            const category = token.category
            const subcategory = token.subcategory
            const key = token.token_key
            const value = token.token_value

            if (!structure[category]) {
                structure[category] = {}
            }

            if (subcategory) {
                if (!structure[category][subcategory]) {
                    structure[category][subcategory] = {}
                }
                structure[category][subcategory][key] = value
            } else {
                structure[category][key] = value
            }
        })

        return structure
    }

    private buildComponentTokenStructure(
        componentTokens: ComponentTokenData[],
        foundationTokens: FoundationTokenData[],
        resolveReferences = false
    ): Record<string, any> {
        const structure: Record<string, any> = {}

        const groupedComponents = this.groupTokensByComponent(componentTokens)

        Object.entries(groupedComponents).forEach(([component, tokens]) => {
            structure[component] = {}

            tokens.forEach((token) => {
                const pathParts = token.token_path.split('.')
                let current = structure[component]

                for (let i = 0; i < pathParts.length - 1; i++) {
                    if (!current[pathParts[i]]) {
                        current[pathParts[i]] = {}
                    }
                    current = current[pathParts[i]]
                }

                const finalKey = pathParts[pathParts.length - 1]
                const value = resolveReferences
                    ? this.resolveTokenReferenceValue(
                          token.foundation_token_reference,
                          foundationTokens
                      )
                    : `{${token.foundation_token_reference}}`

                current[finalKey] = value
            })
        })

        return structure
    }

    private groupTokensByCategory(
        tokens: FoundationTokenData[]
    ): Record<string, FoundationTokenData[]> {
        return tokens.reduce(
            (acc, token) => {
                if (!acc[token.category]) {
                    acc[token.category] = []
                }
                acc[token.category].push(token)
                return acc
            },
            {} as Record<string, FoundationTokenData[]>
        )
    }

    private groupTokensByComponent(
        tokens: ComponentTokenData[]
    ): Record<string, ComponentTokenData[]> {
        return tokens.reduce(
            (acc, token) => {
                if (!acc[token.component_name]) {
                    acc[token.component_name] = []
                }
                acc[token.component_name].push(token)
                return acc
            },
            {} as Record<string, ComponentTokenData[]>
        )
    }

    private resolveTokenReference(
        reference: string,
        foundationTokens: FoundationTokenData[]
    ): string {
        const token = this.findFoundationToken(reference, foundationTokens)
        return token ? `var(--${reference.replace(/\./g, '-')})` : reference
    }

    private resolveTokenReferenceScss(
        reference: string,
        foundationTokens: FoundationTokenData[]
    ): string {
        const token = this.findFoundationToken(reference, foundationTokens)
        return token ? `$${reference.replace(/\./g, '-')}` : reference
    }

    private resolveTokenReferenceValue(
        reference: string,
        foundationTokens: FoundationTokenData[]
    ): string {
        const token = this.findFoundationToken(reference, foundationTokens)
        return token ? token.token_value : reference
    }

    private findFoundationToken(
        reference: string,
        foundationTokens: FoundationTokenData[]
    ): FoundationTokenData | null {
        const parts = reference.split('.')
        if (parts.length < 2) return null

        const [category, ...rest] = parts

        return (
            foundationTokens.find((token) => {
                if (token.category !== category) return false

                if (rest.length === 1) {
                    // Direct key match (no subcategory)
                    return !token.subcategory && token.token_key === rest[0]
                } else if (rest.length === 2) {
                    // Subcategory.key match
                    return (
                        token.subcategory === rest[0] &&
                        token.token_key === rest[1]
                    )
                }

                return false
            }) || null
        )
    }

    private getDtcgTokenType(category: string): string {
        const typeMap: Record<string, string> = {
            colors: 'color',
            fontSize: 'dimension',
            fontWeight: 'number',
            lineHeight: 'number',
            spacing: 'dimension',
            borderRadius: 'dimension',
            borderWidth: 'dimension',
            boxShadow: 'shadow',
            opacity: 'number',
        }

        return typeMap[category] || 'string'
    }
}
