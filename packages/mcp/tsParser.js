import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Parse TypeScript component files to extract accurate prop information
 */
export async function parseComponentFromSource(componentName, libraryPath) {
    try {
        const componentDir = path.join(libraryPath, componentName)

        if (!fs.existsSync(componentDir)) {
            throw new Error(`Component directory not found: ${componentDir}`)
        }

        // Try to find the main component file
        const possibleFiles = [
            path.join(componentDir, `${componentName}.tsx`),
            path.join(componentDir, `${componentName}.ts`),
            path.join(componentDir, 'index.tsx'),
            path.join(componentDir, 'index.ts'),
        ]

        let componentFile = null
        let typesFile = null

        for (const file of possibleFiles) {
            if (fs.existsSync(file)) {
                componentFile = file
                break
            }
        }

        // Look for types file (both .ts and .tsx)
        const possibleTypesFiles = [
            path.join(componentDir, 'types.ts'),
            path.join(componentDir, 'types.tsx'),
        ]

        for (const typesPath of possibleTypesFiles) {
            if (fs.existsSync(typesPath)) {
                typesFile = typesPath
                break
            }
        }

        if (!componentFile) {
            throw new Error(`Component file not found for ${componentName}`)
        }

        const componentContent = fs.readFileSync(componentFile, 'utf-8')
        const typesContent = typesFile
            ? fs.readFileSync(typesFile, 'utf-8')
            : ''

        return parseComponentProps(
            componentName,
            componentContent,
            typesContent
        )
    } catch (error) {
        throw new Error(
            `Failed to parse component ${componentName}: ${error.message}`
        )
    }
}

/**
 * Extract prop information from component and types content
 */
function parseComponentProps(componentName, componentContent, typesContent) {
    const props = []
    const enums = {}

    // Parse enums from types content
    const enumMatches = typesContent.matchAll(/export enum (\w+) \{([^}]+)\}/g)
    for (const match of enumMatches) {
        const enumName = match[1]
        const enumBody = match[2]
        const values = []

        const valueMatches = enumBody.matchAll(
            /(\w+)\s*=\s*['"`]([^'"`]+)['"`]/g
        )
        for (const valueMatch of valueMatches) {
            values.push({
                key: valueMatch[1],
                value: valueMatch[2],
            })
        }

        enums[enumName] = values
    }

    // Parse nested types first (for AlertAction, etc.)
    const nestedTypes = {}
    const nestedTypeMatches = typesContent.matchAll(
        /export type (\w+) = \{([^}]+)\}/g
    )
    for (const match of nestedTypeMatches) {
        const typeName = match[1]
        const typeBody = match[2]
        if (typeName !== `${componentName}Props`) {
            nestedTypes[typeName] = parseTypeBody(typeBody)
        }
    }

    // Parse main component props - handle different naming patterns
    const possiblePropsNames = [
        `${componentName}Props`,
        `${componentName}V2Props`,
        `${componentName}sProps`, // For Charts -> ChartsProps
        `${componentName.slice(0, -1)}Props`, // For components ending in 's'
    ]

    let componentPropsMatch = null
    let propsTypeName = null

    for (const propsName of possiblePropsNames) {
        const pattern = new RegExp(
            `export type (${propsName}) = ([^\\n]+(?:\\n[^\\n]*)*?)(?=\\n\\n|\\nexport|$)`,
            'g'
        )
        const match = pattern.exec(typesContent)
        if (match) {
            componentPropsMatch = match
            propsTypeName = propsName
            break
        }
    }

    if (componentPropsMatch) {
        const propsDefinition = componentPropsMatch[2].trim()

        // Handle intersection types like ButtonV2Props = { ... } & Omit<...>
        if (propsDefinition.includes('&')) {
            const mainTypeMatch = propsDefinition.match(/\{([^}]+)\}/)
            if (mainTypeMatch) {
                const typeBody = mainTypeMatch[1]
                const parsedProps = parseTypeBody(typeBody)
                props.push(
                    ...parsedProps.map((prop) => ({
                        ...prop,
                        propDescription: `${prop.propName} prop for ${componentName}`,
                        category: categorizeProp(prop.propName, prop.propType),
                    }))
                )
            }
        } else if (propsDefinition.startsWith('{')) {
            // Simple type definition
            const typeBodyMatch = propsDefinition.match(/\{([^}]+)\}/)
            if (typeBodyMatch) {
                const typeBody = typeBodyMatch[1]
                const parsedProps = parseTypeBody(typeBody)
                props.push(
                    ...parsedProps.map((prop) => ({
                        ...prop,
                        propDescription: `${prop.propName} prop for ${componentName}`,
                        category: categorizeProp(prop.propName, prop.propType),
                    }))
                )
            }
        }
    }

    return {
        componentName,
        componentDescription: `A ${componentName.toLowerCase()} component for the Blend design system.`,
        props,
        enums,
        nestedTypes,
        requiresThemeProvider:
            componentContent.includes('useComponentToken') ||
            componentContent.includes('useTheme'),
        usageExamples: generateUsageExamples(componentName, props, enums),
    }
}

/**
 * Parse a type body and extract individual properties
 */
function parseTypeBody(typeBody) {
    const props = []

    // Split by lines and process each property
    const lines = typeBody
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line)

    for (const line of lines) {
        // Match property definitions: propName?: Type
        const propMatch = line.match(/^(\w+)(\?)?:\s*(.+?)(?:\/\/.*)?$/)
        if (propMatch) {
            const propName = propMatch[1]
            const isOptional = propMatch[2] === '?'
            let propType = propMatch[3].trim()

            // Clean up the type (remove trailing commas, etc.)
            propType = propType.replace(/,$/, '')

            props.push({
                propName,
                propType,
                required: !isOptional,
                propDefault: isOptional ? 'undefined' : '-',
            })
        }
    }

    return props
}

/**
 * Categorize props based on name and type
 */
function categorizeProp(propName, propType) {
    if (propName.includes('on') && propType.includes('=>')) return 'Events'
    if (
        propName.includes('color') ||
        propName.includes('style') ||
        propName.includes('className')
    )
        return 'Styling'
    if (
        propName.includes('variant') ||
        propName.includes('size') ||
        propName.includes('type')
    )
        return 'Appearance'
    if (
        propName === 'children' ||
        propName.includes('content') ||
        propName.includes('text')
    )
        return 'Content'
    if (
        propName.includes('disabled') ||
        propName.includes('loading') ||
        propName.includes('active')
    )
        return 'State'
    return 'General'
}

/**
 * Generate usage examples based on component props
 */
function generateUsageExamples(componentName, props, enums) {
    const examples = []

    // Basic example
    examples.push({
        title: `Basic ${componentName}`,
        description: `Simple ${componentName.toLowerCase()} usage`,
        code: `<${componentName} />`,
    })

    // Example with required props
    const requiredProps = props.filter((p) => p.required)
    if (requiredProps.length > 0) {
        const propsString = requiredProps
            .map((prop) => {
                if (prop.propType.includes('string')) {
                    return `${prop.propName}="Example ${prop.propName}"`
                } else if (prop.propType.includes('boolean')) {
                    return `${prop.propName}={true}`
                } else if (prop.propType.includes('number')) {
                    return `${prop.propName}={100}`
                } else if (enums[prop.propType]) {
                    const firstEnum = enums[prop.propType][0]
                    return `${prop.propName}={${prop.propType}.${firstEnum.key}}`
                }
                return `${prop.propName}={/* ${prop.propType} */}`
            })
            .join(' ')

        examples.push({
            title: `${componentName} with Required Props`,
            description: `${componentName} with all required properties`,
            code: `<${componentName} ${propsString} />`,
        })
    }

    return examples
}

/**
 * Get all available components from the library path
 */
export function getAvailableComponents(libraryPath) {
    try {
        if (!fs.existsSync(libraryPath)) {
            return []
        }

        const entries = fs.readdirSync(libraryPath, { withFileTypes: true })
        return entries
            .filter((entry) => entry.isDirectory())
            .map((entry) => entry.name)
            .filter((name) => !name.startsWith('.')) // Filter out hidden directories
    } catch (error) {
        return []
    }
}
