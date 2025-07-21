import React from 'react'
import Link from 'next/link'

// Hardcoded metadata for demo; in a real app, fetch or generate this from MDX frontmatter
const components = [
    {
        slug: 'button',
        title: 'Button',
        description:
            'The Button component is a fundamental UI element used for user interactions.',
    },
    {
        slug: 'button-group',
        title: 'Button Group V2',
        description:
            'The ButtonGroupV2 component is a container that groups multiple Button components together with flexible layout options and automatic positioning.',
    },
    {
        slug: 'alert',
        title: 'Alert',
        description:
            'The Alert component is a versatile notification element used to display important messages to users with multiple variants, styles, and interactive options.',
    },
    {
        slug: 'tag',
        title: 'Tag',
        description:
            'The Tag component is a versatile UI element used for displaying labels, categories, and status indicators with multiple variants, colors, and interactive options.',
    },
    {
        slug: 'split-tag',
        title: 'Split Tag',
        description:
            'The SplitTag component is a specialized tag variant that can be split into multiple sections, useful for displaying complex labels or status indicators.',
    },
    {
        slug: 'tabs',
        title: 'Tabs',
        description:
            'The Tabs component provides a way to organize content into multiple sections that can be switched between, with support for different styles and configurations.',
    },
    {
        slug: 'breadcrumb',
        title: 'Breadcrumb',
        description:
            "The Breadcrumb component provides navigation context by showing the current page's location within a site hierarchy, helping users understand where they are and navigate back.",
    },
    {
        slug: 'accordion',
        title: 'Accordion',
        description:
            'The Accordion component creates collapsible content sections that can expand and collapse, helping to organize information hierarchically and save screen space.',
    },
    // ...add more as needed
]

const page = () => {
    return (
        <div
            className="flex flex-col flex-1 min-h-screen w-full px-4 py-12"
            style={{
                background: 'var(--background)',
                color: 'var(--foreground)',
            }}
        >
            <h1 className="text-4xl font-semibold mb-2 text-[var(--primary)]">
                Components
            </h1>
            <p className="mb-8 text-[var(--muted-foreground)] max-w-2xl">
                Here you can find all the components available in the library.
                We are working on adding more components.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {components.map((comp) => (
                    <Link
                        key={comp.slug}
                        href={`/docs/components/${comp.slug}`}
                        className="block rounded-lg border border-[var(--code-border)] bg-[var(--surface)] hover:bg-[var(--code-background)] transition-colors p-6 shadow-sm group"
                    >
                        <div className="text-xl font-medium text-[var(--primary)] group-hover:underline mb-1">
                            {comp.title}
                        </div>
                        <div className="text-[var(--muted-foreground)] text-sm">
                            {comp.description}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default page
