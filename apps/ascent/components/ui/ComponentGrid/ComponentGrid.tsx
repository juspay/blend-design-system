import React from 'react'
import Link from 'next/link'
import {
    COMPONENT_REGISTRY,
    ComponentCategory,
} from '@/lib/docs/componentRegistry'
import {
    COMPONENT_CARD_STYLES,
    PAGE_LAYOUT,
    ARROW_ICON_PATH,
} from '@/lib/docs/componentGridStyles'

// Category order based on the screenshot
const CATEGORY_ORDER: ComponentCategory[] = [
    'Form Input',
    'Selection',
    'Actions',
    'Navigation',
    'Feedback',
    'Layout',
    'Data',
    'Display',
    'Others',
]

const ComponentCard = ({
    component,
}: {
    component: (typeof COMPONENT_REGISTRY)[0]
}) => (
    <Link
        href={`/docs/components/${component.slug}`}
        className={COMPONENT_CARD_STYLES.container}
        data-nav-content
    >
        <div className={COMPONENT_CARD_STYLES.content}>
            <div className={COMPONENT_CARD_STYLES.iconContainer}>
                <div className={COMPONENT_CARD_STYLES.iconColor}>
                    {component.icon}
                </div>
            </div>
            <div className={COMPONENT_CARD_STYLES.textContainer}>
                <h3 className={COMPONENT_CARD_STYLES.title}>
                    {component.title}
                </h3>
                <p className={COMPONENT_CARD_STYLES.description}>
                    {component.description}
                </p>
            </div>
            <div className={COMPONENT_CARD_STYLES.arrow}>
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={COMPONENT_CARD_STYLES.arrowIcon}
                >
                    <path d={ARROW_ICON_PATH} />
                </svg>
            </div>
        </div>
    </Link>
)

const CategorySection = ({
    category,
    components,
}: {
    category: ComponentCategory
    components: typeof COMPONENT_REGISTRY
}) => {
    if (components.length === 0) return null

    return (
        <div className="space-y-4">
            <h2 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {components.map((component) => (
                    <ComponentCard key={component.slug} component={component} />
                ))}
            </div>
        </div>
    )
}

const ComponentGrid = () => {
    // Group components by category
    const groupedComponents = COMPONENT_REGISTRY.reduce(
        (acc, component) => {
            if (!acc[component.category]) {
                acc[component.category] = []
            }
            acc[component.category].push(component)
            return acc
        },
        {} as Record<ComponentCategory, typeof COMPONENT_REGISTRY>
    )

    return (
        <div className="space-y-12">
            {CATEGORY_ORDER.map((category) => (
                <CategorySection
                    key={category}
                    category={category}
                    components={groupedComponents[category] || []}
                />
            ))}
        </div>
    )
}

export default ComponentGrid
