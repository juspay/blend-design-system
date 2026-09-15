import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { styled } from 'styled-components'

const HeaderWrapper = styled.th<{
    $isDragging: boolean
    $isDisabled: boolean
    $hoverBackground?: string
}>`
    opacity: ${(props) => (props.$isDragging ? 0.5 : 1)};
    transition: all 0.2s ease;
    user-select: none;

    &:hover {
        background-color: ${(props) =>
            props.$isDisabled ? 'transparent' : props.$hoverBackground};
    }
`

type DraggableColumnHeaderProps = Omit<
    React.ThHTMLAttributes<HTMLTableCellElement>,
    'children'
> & {
    id: string
    children: (dragHandleProps: {
        listeners?: ReturnType<typeof useSortable>['listeners']
        attributes?: ReturnType<typeof useSortable>['attributes']
    }) => React.ReactNode
    style?: React.CSSProperties
    disabled?: boolean
    hoverBackground?: string
    'data-table-column-heading'?: string
}

export const DraggableColumnHeader: React.FC<DraggableColumnHeaderProps> = ({
    id,
    children,
    style,
    disabled = false,
    hoverBackground,
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
            $hoverBackground={hoverBackground}
            {...attributes}
            {...props}
        >
            {children({ listeners, attributes })}
        </HeaderWrapper>
    )
}

DraggableColumnHeader.displayName = 'DraggableColumnHeader'
