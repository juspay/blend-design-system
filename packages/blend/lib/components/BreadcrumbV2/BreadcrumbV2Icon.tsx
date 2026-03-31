import Block from '../Primitives/Block/Block'
import type { BreadcrumbCompoundIconProps } from './breadcrumbV2.types'

const BreadcrumbV2Icon = ({ children }: BreadcrumbCompoundIconProps) => {
    return (
        <Block
            data-element="breadcrumb-icon"
            contentCentered
            aria-hidden="true"
        >
            {children}
        </Block>
    )
}

BreadcrumbV2Icon.displayName = 'Breadcrumb.Icon'

export default BreadcrumbV2Icon
