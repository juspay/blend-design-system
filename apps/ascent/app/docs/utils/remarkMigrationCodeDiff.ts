type MdastNode = {
    type: string
    value?: string
    lang?: string | null
    depth?: number
    children?: MdastNode[]
    name?: string
    attributes?: unknown[]
}

type RemarkMigrationCodeDiffOptions = {
    tokenDiff?: {
        v1: string
        v2: string
    } | null
}

const isVersionedExample = (
    node: MdastNode | undefined,
    version: 'v1' | 'v2'
) =>
    Boolean(
        node?.type === 'code' &&
        node.value?.trimStart().match(new RegExp(`^//\\s*${version}\\b`, 'i'))
    )

const withoutVersionComment = (code: string) =>
    code.replace(/^\s*\/\/\s*v[12][^\n]*\n?/i, '').trim()

const getComponentName = (code: string, fallback: string) =>
    code.match(/<([A-Z][A-Za-z0-9]*)\b/)?.[1] ?? fallback

const getNodeText = (node: MdastNode): string =>
    node.value ?? node.children?.map(getNodeText).join('') ?? ''

const getVersionDescription = (node: MdastNode, version: 'v1' | 'v2') => {
    if (node.type !== 'paragraph') return undefined

    const text = getNodeText(node).replace(/\s+/g, ' ').trim()
    const match = text.match(
        new RegExp(`^${version}(?:\\s+default)?\\s*:\\s*(.+)$`, 'i')
    )

    return match?.[1]
}

const getTokenContractName = (value: string) =>
    value.match(/\b[A-Z][A-Z0-9_]{2,}\b/)?.[0]

const getTokenDiffValues = (v1: string, v2: string, section: MdastNode[]) => {
    const contractNames = section
        .map(getNodeText)
        .flatMap((text) => text.match(/\b[A-Z][A-Z0-9_]{2,}\b/g) ?? [])
    const v1Contract = getTokenContractName(v1) ?? contractNames[0]
    const v2Contract =
        getTokenContractName(v2) ??
        contractNames.find((name) => name.includes('V2')) ??
        contractNames[1]

    if (!v1Contract || !v2Contract) return { v1, v2 }

    return {
        v1: `tokens.${v1Contract}`,
        v2: `tokens.${v2Contract}`,
    }
}

const hasCodeDiff = (nodes: MdastNode[]) =>
    nodes.some(
        (node) =>
            node.type === 'mdxJsxFlowElement' &&
            node.name === 'MigrationCodeDiff'
    )

const createCodeDiff = (
    v1: string,
    v2: string,
    v1Label = 'v1',
    v2Label = 'v2',
    kind: 'api' | 'tokens' = 'api'
): MdastNode => ({
    type: 'mdxJsxFlowElement',
    name: 'MigrationCodeDiff',
    attributes: [
        { type: 'mdxJsxAttribute', name: 'v1', value: v1 },
        { type: 'mdxJsxAttribute', name: 'v2', value: v2 },
        { type: 'mdxJsxAttribute', name: 'v1Label', value: v1Label },
        { type: 'mdxJsxAttribute', name: 'v2Label', value: v2Label },
        { type: 'mdxJsxAttribute', name: 'kind', value: kind },
    ],
    children: [],
})

const getFallbackSummary = (nodes: MdastNode[], expression: RegExp) => {
    const text = nodes
        .filter((node) => node.type === 'paragraph')
        .map(getNodeText)
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim()

    return (
        text
            .split(/(?<=[.!?])\s+/)
            .find((sentence) => expression.test(sentence)) ?? text
    )
}

const addChangeDiffs = (
    parent: MdastNode,
    { tokenDiff }: RemarkMigrationCodeDiffOptions
) => {
    if (!parent.children?.length) return

    const additions: { index: number; node: MdastNode }[] = []

    for (let index = 0; index < parent.children.length; index += 1) {
        const heading = parent.children[index]
        if (heading.type !== 'heading' || heading.depth !== 3) continue

        let sectionEnd = index + 1
        while (
            sectionEnd < parent.children.length &&
            !(
                parent.children[sectionEnd].type === 'heading' &&
                (parent.children[sectionEnd].depth ?? 0) <= 3
            )
        ) {
            sectionEnd += 1
        }

        const section = parent.children.slice(index + 1, sectionEnd)
        if (hasCodeDiff(section)) continue
        const isTokenChange = /tokens?|theme overrides?/i.test(
            getNodeText(heading)
        )

        const v1Index = section.findIndex((node) =>
            getVersionDescription(node, 'v1')
        )
        const v2Index = section.findIndex((node) =>
            getVersionDescription(node, 'v2')
        )

        if (v1Index >= 0 && v2Index >= 0) {
            const v1 = getVersionDescription(section[v1Index], 'v1')
            const v2 = getVersionDescription(section[v2Index], 'v2')
            if (v1 && v2) {
                const tokenValues = isTokenChange
                    ? (tokenDiff ?? getTokenDiffValues(v1, v2, section))
                    : { v1, v2 }

                additions.push({
                    index: index + 1 + v2Index + 1,
                    node: createCodeDiff(
                        tokenValues.v1,
                        tokenValues.v2,
                        'v1',
                        'v2',
                        isTokenChange ? 'tokens' : 'api'
                    ),
                })
                continue
            }
        }

        const fallbackV1 = getFallbackSummary(
            section,
            /\bv1\b|legacy|removed|omit|no longer|uncontrolled|default/i
        )
        const fallbackV2 = getFallbackSummary(
            section,
            /\bv2\b|replace|use|add|controlled|required|new/i
        )
        const tokenValues = isTokenChange
            ? (tokenDiff ?? getTokenDiffValues(fallbackV1, fallbackV2, section))
            : { v1: fallbackV1, v2: fallbackV2 }

        additions.push({
            index: sectionEnd,
            node: createCodeDiff(
                tokenValues.v1,
                tokenValues.v2,
                'v1',
                'v2',
                isTokenChange ? 'tokens' : 'api'
            ),
        })
    }

    additions
        .sort((first, second) => second.index - first.index)
        .forEach(({ index, node }) => parent.children?.splice(index, 0, node))
}

const transformChildren = (
    parent: MdastNode,
    options: RemarkMigrationCodeDiffOptions
) => {
    if (!parent.children?.length) return

    const transformed: MdastNode[] = []

    for (let index = 0; index < parent.children.length; index += 1) {
        const v1 = parent.children[index]
        const v2 = parent.children[index + 1]

        if (isVersionedExample(v1, 'v1') && isVersionedExample(v2, 'v2')) {
            const v1Code = withoutVersionComment(v1.value ?? '')
            const v2Code = withoutVersionComment(v2.value ?? '')

            transformed.push({
                ...createCodeDiff(
                    v1Code,
                    v2Code,
                    getComponentName(v1Code, 'v1'),
                    getComponentName(v2Code, 'v2')
                ),
            })
            index += 1
            continue
        }

        transformed.push(v1)
    }

    parent.children = transformed
    addChangeDiffs(parent, options)
    parent.children.forEach((child) => transformChildren(child, options))
}

export const remarkMigrationCodeDiff =
    (options: RemarkMigrationCodeDiffOptions = {}) =>
    (tree: MdastNode) => {
        transformChildren(tree, options)
    }
