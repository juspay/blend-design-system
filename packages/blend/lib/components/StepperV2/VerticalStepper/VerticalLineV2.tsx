import { forwardRef } from 'react'
import Block from '../../Primitives/Block/Block'
import { FOUNDATION_THEME } from '../../../tokens'

const lineFlexStyle = { flex: 1 as const }

const VerticalLineV2 = forwardRef<
    HTMLDivElement,
    {
        color?: string
        height?: string
    }
>(({ color = FOUNDATION_THEME.colors.gray[300], height = '100%' }, ref) => {
    return (
        <Block
            ref={ref}
            width="1px"
            height={height}
            backgroundColor={color}
            minHeight={32}
            style={lineFlexStyle}
        />
    )
})

export default VerticalLineV2
