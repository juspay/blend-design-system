import React from 'react'
import Link from 'next/link'
import { COMPONENT_REGISTRY } from '@/docs/components'
import {
    DOCS_CONFIG,
    COMPONENT_CARD_STYLES,
    PAGE_LAYOUT,
    ARROW_ICON_PATH,
} from './config'

const page = () => {
    return (
        <div className={PAGE_LAYOUT.wrapper}>
            <div className={PAGE_LAYOUT.content}>
                <article className={PAGE_LAYOUT.article}>
                    <h1 className={PAGE_LAYOUT.title}>Components</h1>
                    <p className={PAGE_LAYOUT.subtitle}>
                        {DOCS_CONFIG.defaultDescription}
                    </p>

                    <div className={PAGE_LAYOUT.grid}>
                        {COMPONENT_REGISTRY.map((component) => (
                            <Link
                                key={component.slug}
                                href={`/docs/components/${component.slug}`}
                                className={COMPONENT_CARD_STYLES.container}
                                data-nav-content
                            >
                                <div className={COMPONENT_CARD_STYLES.content}>
                                    <div
                                        className={
                                            COMPONENT_CARD_STYLES.iconContainer
                                        }
                                    >
                                        <div
                                            className={
                                                COMPONENT_CARD_STYLES.iconColor
                                            }
                                        >
                                            {component.icon}
                                        </div>
                                    </div>
                                    <div
                                        className={
                                            COMPONENT_CARD_STYLES.textContainer
                                        }
                                    >
                                        <h3
                                            className={
                                                COMPONENT_CARD_STYLES.title
                                            }
                                        >
                                            {component.title}
                                        </h3>
                                        <p
                                            className={
                                                COMPONENT_CARD_STYLES.description
                                            }
                                        >
                                            {component.description}
                                        </p>
                                    </div>
                                    <div
                                        className={COMPONENT_CARD_STYLES.arrow}
                                    >
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            className={
                                                COMPONENT_CARD_STYLES.arrowIcon
                                            }
                                        >
                                            <path d={ARROW_ICON_PATH} />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </article>
            </div>
            <div className={PAGE_LAYOUT.toc}>
                <div className={PAGE_LAYOUT.tocSticky}>
                    {/* Empty TOC space to maintain layout consistency */}
                </div>
            </div>
        </div>
    )
}

export default page
