import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock'
import type { ComponentProps, ReactNode } from 'react'

type BlendCodeBlockProps = Omit<ComponentProps<'pre'>, 'children'> & {
    children?: ReactNode
    language?: string
}

export function BlendCodeBlock({
    children,
    language,
    ...props
}: BlendCodeBlockProps) {
    return (
        <CodeBlock
            {...props}
            className="blend-code-block"
            title={language ?? 'Code'}
            viewportProps={{ className: 'blend-code-viewport' }}
        >
            <Pre>{children}</Pre>
        </CodeBlock>
    )
}
