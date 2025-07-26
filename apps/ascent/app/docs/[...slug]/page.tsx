import fs from 'fs'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'
import { useMDXComponents } from '@/mdx-components'
import React from 'react'
import { PageMetadata } from '../utils/getFileContent'
import TableOfContents from '@/app/components/TableOfContents'
import { extractHeadings } from '../utils/toc'
import { BugIcon } from 'lucide-react'
import { generateBreadcrumbItems } from '../utils/generateBreadcrumbs'
import { Metadata } from 'next'

// Generate static params for all MDX files
export async function generateStaticParams() {
    const contentDir = path.join(process.cwd(), 'app', 'docs', 'content')
    const paths: { slug: string[] }[] = []

    const scanDirectory = (dir: string, basePath: string[] = []) => {
        const entries = fs.readdirSync(dir, { withFileTypes: true })

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name)

            if (entry.isDirectory()) {
                // Recursively scan subdirectories
                scanDirectory(fullPath, [...basePath, entry.name])
            } else if (entry.name.endsWith('.mdx')) {
                if (entry.name === 'page.mdx') {
                    // For page.mdx files, use the directory path
                    paths.push({ slug: basePath })
                } else {
                    // For other MDX files, add the filename without extension
                    const fileName = entry.name.replace('.mdx', '')
                    paths.push({ slug: [...basePath, fileName] })
                }
            }
        }
    }

    scanDirectory(contentDir)

    // Also add the root path for getting-started.mdx
    paths.push({ slug: ['getting-started'] })

    return paths
}

// Generate metadata for the page
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string[] }>
}): Promise<Metadata> {
    const resolvedParams = await params
    const slugArray = resolvedParams.slug || []
    const basePath = path.join(process.cwd(), 'app', 'docs', 'content')

    let filePath =
        path.join(
            basePath,
            Array.isArray(slugArray) ? slugArray.join('/') : slugArray
        ) + '.mdx'

    if (!fs.existsSync(filePath)) {
        filePath = path.join(basePath, ...slugArray, 'page.mdx')
        if (!fs.existsSync(filePath)) {
            return {
                title: 'Page Not Found',
                description: 'The requested page could not be found.',
            }
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

    const metadata = frontmatter as PageMetadata

    return {
        title: metadata?.title || 'Untitled',
        description: metadata?.description || '',
    }
}

const page = async ({ params }: { params: Promise<{ slug: string[] }> }) => {
    const resolvedParams = await params
    const slugArray = resolvedParams.slug || []
    const basePath = path.join(process.cwd(), 'app', 'docs', 'content')

    let filePath =
        path.join(
            basePath,
            Array.isArray(slugArray) ? slugArray.join('/') : slugArray
        ) + '.mdx'

    if (!fs.existsSync(filePath)) {
        filePath = path.join(basePath, ...slugArray, 'page.mdx')
        if (!fs.existsSync(filePath)) {
            return <div>not found</div>
        }
    }

    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { content, frontmatter } = await compileMDX({
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

    const headings = extractHeadings(fileContent)

    const metadata: PageMetadata = {
        title: (frontmatter as PageMetadata)?.title || 'Untitled',
        description: (frontmatter as PageMetadata)?.description || '',
        category: (frontmatter as PageMetadata)?.category || '',
        tags: (frontmatter as PageMetadata)?.tags || [],
        ...(frontmatter as PageMetadata),
    }

    // Generate breadcrumb items based on the current path
    const breadcrumbItems = generateBreadcrumbItems(
        slugArray,
        metadata.title || 'Untitled'
    )

    return (
        <div className="w-full flex-1 flex">
            <div className="flex-1 gap-2">
                <article className="prose py-10 max-w-[80ch] mx-auto overflow-x-hidden px-4 md:px-2">
                    <PageBreadcrumb items={breadcrumbItems} />
                    <PageHeader metadata={metadata} />

                    {/* <DocArticle content={content} /> */}
                    {content}
                </article>
            </div>
            <div className="doc-toc-ctr max-w-[240px] w-full">
                <div className="sticky top-4">
                    <TableOfContents items={headings} />
                </div>
            </div>
        </div>
    )
}

const PageBreadcrumb = ({
    items,
}: {
    items: Array<{ label: string; href: string }>
}) => {
    return (
        <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center text-sm text-[var(--muted-foreground)]">
                {items.map((item, index) => (
                    <li key={item.href} className="flex items-center">
                        {index > 0 && (
                            <span className="mx-2 text-[var(--muted-foreground)]">
                                <svg
                                    width="15"
                                    height="15"
                                    viewBox="0 0 15 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
                                        fill="currentColor"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </span>
                        )}
                        <a
                            href={item.href}
                            className={`flex items-center gap-2 hover:text-[var(--foreground)] transition-colors ${
                                index === items.length - 1
                                    ? 'text-[var(--foreground)] font-medium'
                                    : 'text-[var(--muted-foreground)]'
                            }`}
                            data-nav-content
                        >
                            <span>{item.label}</span>
                        </a>
                    </li>
                ))}
            </ol>
        </nav>
    )
}

const PageHeader = ({ metadata }: { metadata: PageMetadata }) => {
    return (
        <>
            <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl text-[var(--primary)]">
                {metadata.title}
            </h1>
            <p className="mt-2 text-[var(--muted-foreground)]">
                {metadata.description}
            </p>

            <div className="w-full mt-4 flex flex-wrap items-center gap-4">
                <a
                    href={
                        metadata.RepoFolderName &&
                        metadata.RepoFolderName !== ''
                            ? `https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/${metadata.RepoFolderName}`
                            : 'https://github.com/juspay/blend-design-system'
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] bg-[var(--code-background)] rounded-md p-2"
                    data-nav-content
                >
                    <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                        ></path>
                    </svg>{' '}
                    View on GitHub
                </a>
                <a
                    href="https://github.com/juspay/blend-design-system/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] bg-[var(--code-background)] rounded-md p-2"
                    data-nav-content
                >
                    <BugIcon className="w-4 h-4" />
                    Report an issue
                </a>
                <a
                    href={
                        metadata.storybookLink && metadata.storybookLink !== ''
                            ? `https://juspay.design/storybook/?path=/docs/${metadata.StorybookLink}`
                            : 'https://juspay.design/storybook/?path=/docs/components-accordion--docs'
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] bg-[var(--code-background)] rounded-md p-2"
                    data-nav-content
                >
                    <svg
                        width="15"
                        height="18"
                        viewBox="0 0 15 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1.5108 16.3467L0.969257 1.91694C0.951372 1.44038 1.31678 1.0365 1.79275 1.00675L14.0663 0.239657C14.5508 0.209377 14.9681 0.577576 14.9983 1.06205C14.9995 1.08031 15 1.09859 15 1.11688V16.8407C15 17.3261 14.6065 17.7196 14.1211 17.7196C14.108 17.7196 14.0948 17.7193 14.0817 17.7187L2.34968 17.1918C1.89277 17.1713 1.52796 16.8038 1.5108 16.3467Z"
                            fill="#FF4785"
                        />
                        <mask
                            id="mask0_1_17"
                            style={{ maskType: 'luminance' }}
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                            width="15"
                            height="18"
                        >
                            <path
                                d="M1.5108 16.3467L0.969257 1.91694C0.951372 1.44038 1.31678 1.0365 1.79275 1.00675L14.0663 0.239657C14.5508 0.209377 14.9681 0.577576 14.9983 1.06205C14.9995 1.08031 15 1.09859 15 1.11688V16.8407C15 17.3261 14.6065 17.7196 14.1211 17.7196C14.108 17.7196 14.0948 17.7193 14.0817 17.7187L2.34968 17.1918C1.89277 17.1713 1.52796 16.8038 1.5108 16.3467Z"
                                fill="white"
                            />
                        </mask>
                        <g mask="url(#mask0_1_17)">
                            <path
                                d="M11.3297 2.38669L11.4135 0.370349L13.0991 0.237915L13.1717 2.3173C13.1742 2.38967 13.1176 2.45038 13.0452 2.45291C13.0142 2.45399 12.9839 2.44406 12.9595 2.42487L12.3095 1.91283L11.5399 2.4966C11.4822 2.54036 11.4 2.52907 11.3562 2.47138C11.3378 2.44709 11.3284 2.41715 11.3297 2.38669ZM9.17407 6.82701C9.17407 7.16896 11.4774 7.00507 11.7867 6.76487C11.7867 4.43623 10.5372 3.21256 8.24912 3.21256C5.96108 3.21256 4.67913 4.45527 4.67913 6.31932C4.67913 9.56589 9.06048 9.62802 9.06048 11.3989C9.06048 11.896 8.81707 12.1911 8.28157 12.1911C7.5838 12.1911 7.30794 11.8347 7.34039 10.6231C7.34039 10.3603 4.67913 10.2783 4.598 10.6231C4.39139 13.5593 6.22072 14.4063 8.31403 14.4063C10.3424 14.4063 11.9327 13.3251 11.9327 11.3678C11.9327 7.88824 7.48644 7.98144 7.48644 6.25719C7.48644 5.55817 8.00571 5.46496 8.31403 5.46496C8.63857 5.46496 9.22275 5.52217 9.17407 6.82701Z"
                                fill="white"
                            />
                        </g>
                    </svg>
                    View Storybook
                </a>
            </div>
        </>
    )
}

export default page
