import Block from '../Primitives/Block/Block'
import { BreadcrumbCompoundIconProps } from './breadcrumbV2.types'

const BreadcrumbV2EndIcon = ({ children }: BreadcrumbCompoundIconProps) => {
    return (
        <Block data-element="trailing-icon" contentCentered aria-hidden="true">
            {children}
        </Block>
    )
}

BreadcrumbV2EndIcon.displayName = 'Breadcrumb.EndIcon'

export default BreadcrumbV2EndIcon
