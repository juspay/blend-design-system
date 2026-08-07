import { defineConfig, defineDocs } from 'fumadocs-mdx/config'
import { z } from 'zod'

const docSchema = z
    .object({
        title: z.string(),
        description: z.string().optional(),
        category: z.string().optional(),
        tags: z.array(z.string()).optional(),
        author: z.string().optional(),
        date: z.string().optional(),
        image: z.string().optional(),
        keywords: z.string().optional(),
        version: z.number().optional(),
    })
    .passthrough()

export const docs = defineDocs({
    dir: 'app/docs/content',
    docs: {
        files: ['**/*.mdx'],
        schema: docSchema,
    },
})

// Keep the existing Ascent MDX components and CSS in charge of presentation.
// The minimal preset only supplies the MDX compilation/source pipeline.
export default defineConfig({
    mdxOptions: {
        preset: 'minimal',
    },
})
