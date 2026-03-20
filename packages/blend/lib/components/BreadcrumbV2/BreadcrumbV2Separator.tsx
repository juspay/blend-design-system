import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import Block from '../Primitives/Block/Block'
import { BreadcrumbV2TokensType } from './breadcrumbV2.tokens'
import { BreadcrumbCompoundSeparatorProps } from './breadcrumbV2.types'

const BreadcrumbV2Separator = ({
    children,
}: BreadcrumbCompoundSeparatorProps) => {
    const breadcrumbTokens =
        useResponsiveTokens<BreadcrumbV2TokensType>('BREADCRUMBV2')
    return (
        <Block
            color={breadcrumbTokens.separator.color}
            aria-hidden="true"
            role="separator"
        >
            {children ?? '/'}
        </Block>
    )
}

BreadcrumbV2Separator.displayName = 'Breadcrumb.Separator'

export default BreadcrumbV2Separator
