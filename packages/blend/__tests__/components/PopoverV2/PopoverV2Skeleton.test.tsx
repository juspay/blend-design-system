import React from 'react'
import { describe, it, expect } from 'vitest'
import { render } from '../../test-utils'
import PopoverV2Skeleton from '../../../lib/components/PopoverV2/PopoverV2Skeleton'
import { getPopoverV2Tokens } from '../../../lib/components/PopoverV2/popoverV2.token'
import { FOUNDATION_THEME } from '../../../lib/tokens'
import { Theme } from '../../../lib/context/theme.enum'
import { PopoverV2Size } from '../../../lib/components/PopoverV2/popoverV2.types'

const popoverTokens = getPopoverV2Tokens(FOUNDATION_THEME, Theme.LIGHT).sm

describe('PopoverV2Skeleton', () => {
    describe('header skeleton', () => {
        it('renders header skeleton when headerSkeleton.show is true', () => {
            const { container } = render(
                <PopoverV2Skeleton
                    popoverTokens={popoverTokens}
                    size={PopoverV2Size.MD}
                    headerSkeleton={{ show: true, showCloseButton: false }}
                    skeletonVariant="pulse"
                />
            )

            expect(container.firstChild).not.toBeNull()
            expect(container.firstChild).toBeInTheDocument()
        })

        it('renders header skeleton with showCloseButton true', () => {
            const { container } = render(
                <PopoverV2Skeleton
                    popoverTokens={popoverTokens}
                    size={PopoverV2Size.SM}
                    headerSkeleton={{ show: true, showCloseButton: true }}
                    skeletonVariant="wave"
                />
            )

            expect(container.firstChild).toBeInTheDocument()
        })
    })

    describe('body skeleton', () => {
        it('renders body skeleton when bodySkeleton.show is true', () => {
            const { container } = render(
                <PopoverV2Skeleton
                    popoverTokens={popoverTokens}
                    size={PopoverV2Size.MD}
                    bodySkeleton={{
                        show: true,
                        width: '100%',
                        height: 200,
                    }}
                    skeletonVariant="pulse"
                />
            )

            expect(container.firstChild).not.toBeNull()
            expect(container.firstChild).toBeInTheDocument()
        })

        it('renders body skeleton with custom width and height', () => {
            render(
                <PopoverV2Skeleton
                    popoverTokens={popoverTokens}
                    size={PopoverV2Size.LG}
                    bodySkeleton={{
                        show: true,
                        width: '80%',
                        height: 150,
                    }}
                    skeletonVariant="shimmer"
                />
            )

            expect(document.body).not.toBeEmptyDOMElement()
        })

        it('uses default width and height when bodySkeleton has only show', () => {
            const { container } = render(
                <PopoverV2Skeleton
                    popoverTokens={popoverTokens}
                    size={PopoverV2Size.MD}
                    bodySkeleton={{ show: true, width: '100%', height: 200 }}
                    skeletonVariant="pulse"
                />
            )

            expect(container.firstChild).toBeInTheDocument()
        })
    })

    describe('footer skeleton', () => {
        it('returns null when footerSkeleton.show is true', () => {
            const { container } = render(
                <PopoverV2Skeleton
                    popoverTokens={popoverTokens}
                    size={PopoverV2Size.MD}
                    footerSkeleton={{ show: true }}
                    skeletonVariant="pulse"
                />
            )

            expect(container).toBeEmptyDOMElement()
        })
    })

    describe('no skeleton shown', () => {
        it('returns null when no skeleton prop has show true', () => {
            const { container } = render(
                <PopoverV2Skeleton
                    popoverTokens={popoverTokens}
                    size={PopoverV2Size.MD}
                    skeletonVariant="pulse"
                />
            )

            expect(container).toBeEmptyDOMElement()
        })

        it('returns null when headerSkeleton.show is false', () => {
            const { container } = render(
                <PopoverV2Skeleton
                    popoverTokens={popoverTokens}
                    size={PopoverV2Size.MD}
                    headerSkeleton={{ show: false, showCloseButton: false }}
                    skeletonVariant="pulse"
                />
            )

            expect(container).toBeEmptyDOMElement()
        })

        it('returns null when bodySkeleton.show is false', () => {
            const { container } = render(
                <PopoverV2Skeleton
                    popoverTokens={popoverTokens}
                    size={PopoverV2Size.MD}
                    bodySkeleton={{ show: false, width: '100%', height: 200 }}
                    skeletonVariant="pulse"
                />
            )

            expect(container).toBeEmptyDOMElement()
        })
    })

    describe('defaults with undefined optional props', () => {
        it('uses default bodySkeleton width and height when omitted', () => {
            const { container } = render(
                <PopoverV2Skeleton
                    popoverTokens={popoverTokens}
                    size={PopoverV2Size.MD}
                    bodySkeleton={{
                        show: true,
                        width: '100%',
                        height: 200,
                    }}
                    skeletonVariant="pulse"
                />
            )

            expect(container.firstChild).toBeInTheDocument()
        })
    })
})
