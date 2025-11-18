import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { styled } from 'styled-components'
import { FOUNDATION_THEME } from '../../../tokens'

const HeaderWrapper = styled.th<{ $isDragging: boolean; $isDisabled: boolean }>`
    opacity: ${(props) => (props.$isDragging ? 0.5 : 1)};
    cursor: ${(props) =>
        props.$isDisabled
            ? 'default'
            : props.$isDragging
              ? 'grabbing'
              : 'grab'};
    transition: all 0.2s ease;
    user-select: none;

    &:hover {
        background-color: ${(props) =>
            props.$isDisabled
                ? 'transparent'
                : FOUNDATION_THEME.colors.gray[100]};
    }
`

interface DraggableColumnHeaderProps {
    id: string
    children: React.ReactNode
    style?: React.CSSProperties
    disabled?: boolean
    'data-table-column-heading'?: string
}

export const DraggableColumnHeader: React.FC<DraggableColumnHeaderProps> = ({
    id,
    children,
    style,
    disabled = false,
    ...props
}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id,
        disabled,
    })

    const dragStyle = {
        transform: CSS.Transform.toString(transform),
        transition: transition || 'transform 200ms ease',
    }

    return (
        <HeaderWrapper
            ref={setNodeRef}
            style={{ ...style, ...dragStyle }}
            $isDragging={isDragging}
            $isDisabled={disabled}
            {...attributes}
            {...listeners}
            {...props}
        >
            {children}
        </HeaderWrapper>
    )
}

DraggableColumnHeader.displayName = 'DraggableColumnHeader'
