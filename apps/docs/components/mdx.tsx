import { BlendCodeBlock } from '@/components/blend-code-block'
import { AccordionV2Demo } from '@/components/accordion-v2-demo'
import defaultMdxComponents from 'fumadocs-ui/mdx'
import type { MDXComponents } from 'mdx/types'
import { isValidElement } from 'react'

function getLanguage(children: unknown) {
    if (!isValidElement<{ className?: string }>(children)) return undefined

    const language = children.props.className
        ?.split(' ')
        .find((className) => className.startsWith('language-'))
        ?.replace('language-', '')

    return language?.replace('tsx', 'TypeScript').replace('ts', 'TypeScript')
}

export function getMDXComponents(components?: MDXComponents) {
    return {
        ...defaultMdxComponents,
        AccordionV2Demo,
        pre: ({ children, ...props }) => (
            <BlendCodeBlock {...props} language={getLanguage(children)}>
                {children}
            </BlendCodeBlock>
        ),
        ...components,
    } satisfies MDXComponents
}

export const useMDXComponents = getMDXComponents
