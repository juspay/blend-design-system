import Block from '../Primitives/Block/Block'
import { BreadcrumbCompoundIconProps } from './breadcrumbV2.types'

const BreadcrumbV2StartIcon = ({ children }: BreadcrumbCompoundIconProps) => {
    return (
        <Block data-element="leading-icon" contentCentered aria-hidden="true">
            {children}
        </Block>
    )
}

BreadcrumbV2StartIcon.displayName = 'Breadcrumb.StartIcon'

export default BreadcrumbV2StartIcon
