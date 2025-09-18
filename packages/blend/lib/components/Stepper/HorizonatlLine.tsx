import Block from '../Primitives/Block/Block'

const HorizonatlLine = ({
    color = '#CACFD8',
    height = '1.2px',
    width = '100%',
}: {
    color?: string
    width?: string
    height?: string
}) => {
    return (
        <Block
            width={width}
            height={height}
            backgroundColor={color}
            style={{ flex: 1 }}
        />
    )
}

export default HorizonatlLine
