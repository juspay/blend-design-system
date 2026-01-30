import Block from '../Primitives/Block/Block'
import { FOUNDATION_THEME } from '../../tokens'
import { addPxToValue } from '../../global-utils/GlobalUtils'

type SeperatorProps = {
    orientation?: 'horizontal' | 'vertical'
    height?: string
    width?: string
    color?: string
}

const Seperator = ({
    height = addPxToValue(FOUNDATION_THEME.unit[16]),
    width = '1px',
    color = FOUNDATION_THEME.colors.gray[300],
}: SeperatorProps) => {
    return (
        <Block
            as="span"
            aria-hidden="true"
            role="separator"
            width={width}
            height={height}
            backgroundColor={color}
        />
    )
}

export default Seperator
