import { forwardRef } from 'react'
import Block from '../Primitives/Block/Block'

const VerticalLine = forwardRef<
    HTMLDivElement,
    {
        color?: string
        height?: string
    }
>(({ color = '#CACFD8', height = '100%' }, ref) => {
    return (
        <Block
            ref={ref}
            width="1px"
            height={height}
            backgroundColor={color}
            minHeight={32}
            style={{ flex: 1 }}
        />
    )
})

export default VerticalLine
