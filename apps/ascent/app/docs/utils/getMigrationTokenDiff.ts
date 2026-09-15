import * as fs from 'fs'
import * as path from 'path'

type TokenProperty = {
    name: string
    value: string
}

type TokenDiff = {
    v1: string
    v2: string
}

const v1ComponentSlugs: Record<string, string> = {
    'chat-input': 'chatinput',
    'code-editor': 'codeblock',
    'key-value-pair': 'keyvaluepair',
    'multi-value-input': 'multivalueinput',
    'number-input': 'numberinput',
    'otp-input': 'otpinput',
    'progress-bar': 'progressbar',
    'search-input': 'searchinput',
    select: 'single-select',
    'text-area': 'textarea',
    'text-input': 'textinput',
}

const v2ComponentSlugs: Record<string, string> = {
    select: 'single-select-v2',
}

const fallbackTokenDiffs: Record<string, TokenDiff> = {
    breadcrumb: {
        v1: `export type BreadcrumbTokens = {
    item: {
        // shared item styling
    }
}`,
        v2: `export type BreadcrumbV2Tokens = {
    ellipsis: {
        color: …
        borderRadius: …
        size: …
    }
    separator: {
        color: …
    }
}`,
    },
    'button-group': {
        v1: `export type ButtonGroupTokens = {
    gap: {
        horizontal: …
        stacked: …
    }
}`,
        v2: `export type ButtonV2Tokens = {
    // Move group visual overrides
    // to child BUTTONV2 tokens.
}`,
    },
    card: {
        v1: `export type CardTokens = {
    padding: { x: …; y: … }
    header: …
    body: …
    footer: …
}`,
        v2: `export type CardV2Tokens = {
    surface: …
    interactive: …
    padding: …
    layout: …
    media: …
    sections: …
}`,
    },
    modal: {
        v1: `export type ModalTokens = {
    padding: { x: …; y: … }
    header: …
    footer: …
}`,
        v2: `export type ModalV2Tokens = {
    padding: { top: …; right: …; bottom: …; left: … }
    headerSlot: …
    divider: …
    closeButton: …
    overlayOffset: …
    lineHeight: …
    skeleton: …
}`,
    },
    topbar: {
        v1: `export type TopbarTokens = {
    // One shared topbar contract
}`,
        v2: `export type TopbarV2Tokens = {
    desktop: …
    mobile: …
    secondarySidebar: …
    merchantSelector: …
}`,
    },
    upload: {
        v1: `export type UploadTokens = {
    header: …
    container: …
    fileList: …
}`,
        v2: `export type UploadV2Tokens = {
    inputLabel: …
    footer: …
    fileList: …
    dropZone: …
    validation: …
    progress: …
}`,
    },
}

const extractTokenType = (source: string) =>
    source.match(
        /## Component Tokens[\s\S]*?```(?:tsx|ts)\n([\s\S]*?)\n```/
    )?.[1]

const getProperties = (tokenType: string): TokenProperty[] => {
    const lines = tokenType.trim().split('\n')
    const properties: TokenProperty[] = []

    for (let index = 0; index < lines.length; index += 1) {
        const match = lines[index].match(/^ {4}([A-Za-z][A-Za-z0-9]*):/)
        if (!match) continue

        let end = index + 1
        while (
            end < lines.length &&
            !/^ {4}[A-Za-z][A-Za-z0-9]*:/.test(lines[end])
        ) {
            end += 1
        }

        const propertyLines = lines.slice(index, end)
        if (end === lines.length && propertyLines.at(-1)?.trim() === '}') {
            propertyLines.pop()
        }

        properties.push({
            name: match[1],
            value: propertyLines.join('\n'),
        })
        index = end - 1
    }

    return properties
}

const getStructuralSignature = (value: string) => ({
    keyDepth: (value.match(/\[key in/g) ?? []).length,
    nestedNames: [...value.matchAll(/^ {8}([A-Za-z][A-Za-z0-9]*):/gm)]
        .map((match) => match[1])
        .join(','),
})

const isMajorStructuralChange = (v1: string, v2: string) => {
    const v1Signature = getStructuralSignature(v1)
    const v2Signature = getStructuralSignature(v2)

    return (
        v1Signature.keyDepth !== v2Signature.keyDepth ||
        v1Signature.nestedNames !== v2Signature.nestedNames
    )
}

const previewProperty = (property: TokenProperty) => {
    const keyLevels = [...property.value.matchAll(/\[key in ([^\]]+)\]/g)].map(
        (match) => match[1]
    )
    const nestedNames = [
        ...new Set(
            [...property.value.matchAll(/^ {8}([A-Za-z][A-Za-z0-9]*):/gm)].map(
                (match) => match[1]
            )
        ),
    ]

    if (nestedNames.length) {
        return [
            `    ${property.name}: {`,
            ...nestedNames.slice(0, 6).map((name) => `        ${name}: …`),
            '    }',
        ].join('\n')
    }

    if (keyLevels.length) {
        return [
            `    ${property.name}: {`,
            ...keyLevels.map(
                (key, index) => `${'    '.repeat(index + 2)}[key in ${key}]: {`
            ),
            `${'    '.repeat(keyLevels.length + 2)}…`,
            ...keyLevels.map(
                (_, index) => `${'    '.repeat(keyLevels.length + 1 - index)}}`
            ),
            '    }',
        ].join('\n')
    }

    return `    ${property.name}: …`
}

const getTypeName = (tokenType: string, fallback: string) =>
    tokenType.match(/export type ([A-Za-z0-9_]+)\s*=/)?.[1] ?? fallback

const buildSnippet = (typeName: string, properties: TokenProperty[]) =>
    `export type ${typeName} = {\n${properties
        .map(previewProperty)
        .join('\n\n')}\n}`

export const getMigrationTokenDiff = (filePath: string): TokenDiff | null => {
    const migrationSlug = path.basename(filePath, '.mdx')
    const v1Slug = v1ComponentSlugs[migrationSlug] ?? migrationSlug
    const v2Slug = v2ComponentSlugs[migrationSlug] ?? `${migrationSlug}-v2`
    const contentDir = path.join(
        process.cwd(),
        'app',
        'docs',
        'content',
        'components'
    )
    const v1Path = path.join(contentDir, `${v1Slug}.mdx`)
    const v2Path = path.join(contentDir, `${v2Slug}.mdx`)

    if (!fs.existsSync(v1Path) || !fs.existsSync(v2Path))
        return fallbackTokenDiffs[migrationSlug] ?? null

    const v1TokenType = extractTokenType(fs.readFileSync(v1Path, 'utf8'))
    const v2TokenType = extractTokenType(fs.readFileSync(v2Path, 'utf8'))
    if (!v1TokenType || !v2TokenType)
        return fallbackTokenDiffs[migrationSlug] ?? null

    const v1Properties = getProperties(v1TokenType)
    const v2Properties = getProperties(v2TokenType)
    const v2ByName = new Map(
        v2Properties.map((property) => [property.name, property])
    )
    const v1ByName = new Map(
        v1Properties.map((property) => [property.name, property])
    )
    const removed = v1Properties.filter(
        (property) => !v2ByName.has(property.name)
    )
    const added = v2Properties.filter(
        (property) => !v1ByName.has(property.name)
    )
    const changed = v1Properties.filter((property) => {
        const v2Property = v2ByName.get(property.name)
        return (
            v2Property &&
            isMajorStructuralChange(property.value, v2Property.value)
        )
    })
    const changedV2 = changed
        .map((property) => v2ByName.get(property.name))
        .filter((property): property is TokenProperty => Boolean(property))

    const v1Changes = [...removed, ...changed].slice(0, 5)
    const v2Changes = [...added, ...changedV2].slice(0, 5)
    if (!v1Changes.length || !v2Changes.length)
        return fallbackTokenDiffs[migrationSlug] ?? null

    return {
        v1: buildSnippet(getTypeName(v1TokenType, 'V1Tokens'), v1Changes),
        v2: buildSnippet(getTypeName(v2TokenType, 'V2Tokens'), v2Changes),
    }
}
