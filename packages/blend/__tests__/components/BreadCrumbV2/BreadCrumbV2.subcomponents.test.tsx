import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen, MockIcon } from '../../test-utils'
import BreadcrumbV2Icon from '../../../lib/components/BreadcrumbV2/BreadcrumbV2Icon'

describe('BreadcrumbV2 subcomponents (direct render)', () => {
    describe('BreadcrumbV2Icon', () => {
        it('wraps children with breadcrumb-icon marker', () => {
            render(
                <BreadcrumbV2Icon>
                    <MockIcon />
                </BreadcrumbV2Icon>
            )
            const iconHost = document.querySelector(
                '[data-element="breadcrumb-icon"]'
            )
            expect(iconHost).toBeInTheDocument()
            expect(iconHost).toHaveAttribute('aria-hidden', 'true')
            expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
        })

        it('exposes displayName', () => {
            expect(BreadcrumbV2Icon.displayName).toBe('Breadcrumb.Icon')
        })
    })
})
