import { CSSObject } from 'styled-components'

export enum InteractionStateEnums {
    DEFAULT = 'default',
    FOCUSED = 'focused',
    HOVER = 'hover',
    ACTIVE = 'active',
    DISABLED = 'disabled',
}

export enum PaddingDirectionEnums {
    TOP = 'top',
    RIGHT = 'right',
    BOTTOM = 'bottom',
    LEFT = 'left',
}

export enum PositionEnums {
    TOP = 'top',
    RIGHT = 'right',
    BOTTOM = 'bottom',
    LEFT = 'left',
}

export type DimensionTypes = {
    width?: CSSObject['width']
    height?: CSSObject['height']
    minWidth?: CSSObject['minWidth']
    maxWidth?: CSSObject['maxWidth']
    minHeight?: CSSObject['minHeight']
    maxHeight?: CSSObject['maxHeight']
}

export type EventHandlerTypes = {
    onClick?: React.MouseEventHandler<HTMLElement>
    onChange?: React.ChangeEventHandler<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
    onMouseEnter?: React.MouseEventHandler<HTMLElement>
    onMouseLeave?: React.MouseEventHandler<HTMLElement>
    onMouseOver?: React.MouseEventHandler<HTMLElement>
    onMouseOut?: React.MouseEventHandler<HTMLElement>
    onFocus?: React.FocusEventHandler<HTMLElement>
    onBlur?: React.FocusEventHandler<HTMLElement>
    onKeyDown?: React.KeyboardEventHandler<HTMLElement>
    onKeyUp?: React.KeyboardEventHandler<HTMLElement>
    onSubmit?: React.FormEventHandler<HTMLFormElement>
    onReset?: React.FormEventHandler<HTMLFormElement>
    onCopy?: React.ClipboardEventHandler<HTMLElement>
    onCut?: React.ClipboardEventHandler<HTMLElement>
    onPaste?: React.ClipboardEventHandler<HTMLElement>
    onSelect?: React.ClipboardEventHandler<HTMLElement>
    onDrag?: React.DragEventHandler<HTMLElement>
    onDragEnd?: React.DragEventHandler<HTMLElement>
    onDragEnter?: React.DragEventHandler<HTMLElement>
    onDragLeave?: React.DragEventHandler<HTMLElement>
    onDragOver?: React.DragEventHandler<HTMLElement>
    onDragStart?: React.DragEventHandler<HTMLElement>
    onDrop?: React.DragEventHandler<HTMLElement>
    onScroll?: React.UIEventHandler<HTMLElement>
    onWheel?: React.WheelEventHandler<HTMLElement>
    onResize?: React.UIEventHandler<HTMLElement>
    onScrollEnd?: React.UIEventHandler<HTMLElement>
}
