import React from 'react'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import type { BreadcrumbV2TokensType } from './breadcrumbV2.tokens'

export type BreadcrumbV2PageProps = {
    children: React.ReactNode
}

const BreadcrumbV2Page = ({ children }: BreadcrumbV2PageProps) => {
    const breadcrumbTokens =
        useResponsiveTokens<BreadcrumbV2TokensType>('BREADCRUMBV2')

    return (
        <PrimitiveText
            as="span"
            fontWeight={breadcrumbTokens.item.text.fontWeight}
            fontSize={breadcrumbTokens.item.text.fontSize}
        >
            {children}
        </PrimitiveText>
    )
}

BreadcrumbV2Page.displayName = 'Breadcrumb.Page'

export default BreadcrumbV2Page
