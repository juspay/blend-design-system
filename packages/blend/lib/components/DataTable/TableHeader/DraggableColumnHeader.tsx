import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { styled } from 'styled-components'
import { FOUNDATION_THEME } from '../../../tokens'

const HeaderWrapper = styled.th<{ $isDragging: boolean; $isDisabled: boolean }>`
    opacity: ${(props) => (props.$isDragging ? 0.5 : 1)};
    transition: all 0.2s ease;
    user-select: none;

    &:hover {
        background-color: ${(props) =>
            props.$isDisabled
                ? 'transparent'
                : FOUNDATION_THEME.colors.gray[100]};
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
            {...props}
        >
            {children({ listeners, attributes })}
        </HeaderWrapper>
    )
}

DraggableColumnHeader.displayName = 'DraggableColumnHeader'
