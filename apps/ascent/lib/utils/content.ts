import { useMDXComponents } from '@/mdx-components'
import fs from 'fs'
import { compileMDX } from 'next-mdx-remote/rsc'
import path from 'path'

export interface PageMetadata {
    title?: string
    description?: string
    category?: string
    tags?: string[]
    author?: string
    date?: string
    image?: string
    keywords?: string
    [key: string]: any
}

export async function getFileContent(slugArray: string[]) {
    const basePath = path.join(process.cwd(), 'app', 'docs', 'content')

    let filePath =
        path.join(
            basePath,
            Array.isArray(slugArray) ? slugArray.join('/') : slugArray
        ) + '.mdx'
    if (!fs.existsSync(filePath)) {
        filePath = path.join(basePath, ...slugArray, 'page.mdx')
        if (!fs.existsSync(filePath)) {
            return null
        }
    }

    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { frontmatter } = await compileMDX({
        source: fileContent,
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                remarkPlugins: [],
                rehypePlugins: [],
            },
        },
        components: useMDXComponents(),
    })

    return frontmatter as PageMetadata
}
