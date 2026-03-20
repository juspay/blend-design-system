import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen, MockIcon } from '../../test-utils'
import type { BreadcrumbV2TokensType } from '../../../lib/components/BreadcrumbV2/breadcrumbV2.tokens'
import BreadcrumbV2Skeleton from '../../../lib/components/BreadcrumbV2/BreadcrumbV2Skeleton'
import BreadcrumbV2StartIcon from '../../../lib/components/BreadcrumbV2/BreadcrumbV2StartIcon'
import BreadcrumbV2EndIcon from '../../../lib/components/BreadcrumbV2/BreadcrumbV2EndIcon'

const mockBreadcrumbTokens = {
    gap: '0px',
    item: {
        padding: '8px 12px',
        gap: '6px',
        text: {
            fontSize: '14px',
            fontWeight: 500,
            color: {
                default: '#888',
                hover: '#111',
                active: '#333',
            },
        },
    },
    ellipsis: {
        color: '#888',
        borderRadius: '6px',
        size: 14,
    },
    separator: {
        color: '#888',
    },
} satisfies BreadcrumbV2TokensType

describe('BreadcrumbV2 subcomponents (direct render)', () => {
    describe('BreadcrumbV2Skeleton', () => {
        it('renders skeleton block and omits separator when active', () => {
            const { container } = render(
                <BreadcrumbV2Skeleton
                    breadcrumbTokens={mockBreadcrumbTokens}
                    skeletonVariant="pulse"
                    isActive
                />
            )
            expect(
                container.querySelector(
                    '[data-element="breadcrumb-v2-skeleton"]'
                )
            ).toBeInTheDocument()
            // !isActive branch skipped — no "/" from this component
            expect(container.textContent).not.toContain('/')
        })

        it('renders trailing separator when not active', () => {
            const { container } = render(
                <BreadcrumbV2Skeleton
                    breadcrumbTokens={mockBreadcrumbTokens}
                    skeletonVariant="pulse"
                    isActive={false}
                />
            )
            expect(
                container.querySelector(
                    '[data-element="breadcrumb-v2-skeleton"]'
                )
            ).toBeInTheDocument()
            expect(container.textContent).toContain('/')
        })
    })

    describe('BreadcrumbV2StartIcon', () => {
        it('wraps children in leading-icon block', () => {
            render(
                <BreadcrumbV2StartIcon>
                    <MockIcon />
                </BreadcrumbV2StartIcon>
            )
            const iconHost = document.querySelector(
                '[data-element="leading-icon"]'
            )
            expect(iconHost).toBeInTheDocument()
            expect(iconHost).toHaveAttribute('aria-hidden', 'true')
            expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
        })

        it('exposes displayName', () => {
            expect(BreadcrumbV2StartIcon.displayName).toBe(
                'Breadcrumb.StartIcon'
            )
        })
    })

    describe('BreadcrumbV2EndIcon', () => {
        it('wraps children in trailing-icon block', () => {
            render(
                <BreadcrumbV2EndIcon>
                    <span data-testid="end-child">›</span>
                </BreadcrumbV2EndIcon>
            )
            const iconHost = document.querySelector(
                '[data-element="trailing-icon"]'
            )
            expect(iconHost).toBeInTheDocument()
            expect(iconHost).toHaveAttribute('aria-hidden', 'true')
            expect(screen.getByTestId('end-child')).toBeInTheDocument()
        })

        it('exposes displayName', () => {
            expect(BreadcrumbV2EndIcon.displayName).toBe('Breadcrumb.EndIcon')
        })
    })
})
