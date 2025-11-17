import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
import { styled } from 'styled-components'
import Block from '../../Primitives/Block/Block'
import { FOUNDATION_THEME } from '../../../tokens'

const DragHandleWrapper = styled.div<{ isDragging: boolean }>`
    cursor: ${(props) => (props.isDragging ? 'grabbing' : 'grab')};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${FOUNDATION_THEME.unit[4]};
    opacity: 0;
    transition: opacity 0.2s ease;
    color: ${FOUNDATION_THEME.colors.gray[400]};
    flex-shrink: 0;

    &:hover {
        color: ${FOUNDATION_THEME.colors.gray[600]};
    }
`

const HeaderWrapper = styled.th<{ isDragging: boolean; isDisabled: boolean }>`
    opacity: ${(props) => (props.isDragging ? 0.5 : 1)};
    cursor: ${(props) => (props.isDisabled ? 'default' : 'inherit')};
    transition: opacity 0.2s ease;

    &:hover ${DragHandleWrapper} {
        opacity: ${(props) => (props.isDisabled ? 0 : 1)};
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
        transition,
    }

    return (
        <HeaderWrapper
            ref={setNodeRef}
            style={{ ...style, ...dragStyle }}
            isDragging={isDragging}
            isDisabled={disabled}
            {...props}
        >
            <Block
                display="flex"
                alignItems="center"
                gap={FOUNDATION_THEME.unit[8]}
                width="100%"
            >
                {!disabled && (
                    <DragHandleWrapper
                        {...attributes}
                        {...listeners}
                        isDragging={isDragging}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <GripVertical size={16} />
                    </DragHandleWrapper>
                )}
                <Block flexGrow={1} minWidth={0}>
                    {children}
                </Block>
            </Block>
        </HeaderWrapper>
    )
}

DraggableColumnHeader.displayName = 'DraggableColumnHeader'
