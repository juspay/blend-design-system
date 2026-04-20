import { CSSObject } from 'styled-components'
import Block from '../../../Primitives/Block/Block'

type InputSlotPosition = 'left' | 'right'

type InputSlotProps = {
    position: InputSlotPosition
    slotRef: React.RefObject<HTMLDivElement | null>
    top: number
    bottom: number
    left: number
    right: number
    dataElement: string
    children: React.ReactNode
    maxHeight?: CSSObject['maxHeight']
}

const InputSlots = ({
    position,
    slotRef,
    top,
    bottom,
    left,
    right,
    dataElement,
    children,
}: InputSlotProps) => (
    <Block
        data-element={dataElement}
        ref={slotRef}
        position="absolute"
        top={top}
        bottom={bottom}
        left={position === 'left' ? left : undefined}
        right={position === 'right' ? right : undefined}
        contentCentered
    >
        {children}
    </Block>
)

InputSlots.displayName = 'InputSlots'
export default InputSlots
