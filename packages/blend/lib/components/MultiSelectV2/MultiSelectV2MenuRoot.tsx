import * as RadixMenu from '@radix-ui/react-dropdown-menu'
import styled from 'styled-components'
import { dropdownContentAnimations } from '../MultiSelect/multiSelect.animations'
import { SELECT_V2_MENU_Z_INDEX } from '../SelectV2/selectV2.constants'
import type { MenuRootProps } from './multiSelectV2.types'

const Content = styled(RadixMenu.Content)`
    position: relative;
    z-index: ${SELECT_V2_MENU_Z_INDEX};
    display: flex;
    flex-direction: column;
    overflow: hidden;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
    scrollbar-color: transparent transparent;

    &[data-state='closed'] {
        pointer-events: none;
    }

    &::-webkit-scrollbar {
        display: none;
    }

    ${dropdownContentAnimations}
`

const MultiSelectV2MenuRoot = ({
    open,
    onOpenChange,
    disabled,
    trigger,
    menuId,
    alignment,
    side,
    sideOffset,
    alignOffset,
    collisionBoundary,
    contentStyle,
    onContentKeyDown,
    contentRef,
    onInteractOutside,
    onPointerDownOutside,
    children,
}: MenuRootProps) => {
    return (
        <RadixMenu.Root modal={false} open={open} onOpenChange={onOpenChange}>
            <RadixMenu.Trigger asChild disabled={disabled}>
                {trigger}
            </RadixMenu.Trigger>
            <RadixMenu.Portal>
                <Content
                    id={menuId}
                    ref={contentRef}
                    data-dropdown="dropdown"
                    role="listbox"
                    aria-multiselectable="true"
                    align={alignment}
                    side={side}
                    sideOffset={sideOffset}
                    alignOffset={alignOffset}
                    avoidCollisions
                    collisionBoundary={collisionBoundary}
                    style={contentStyle}
                    onKeyDown={onContentKeyDown}
                    onInteractOutside={onInteractOutside}
                    onPointerDownOutside={onPointerDownOutside}
                >
                    {children}
                </Content>
            </RadixMenu.Portal>
        </RadixMenu.Root>
    )
}

MultiSelectV2MenuRoot.displayName = 'MultiSelectV2MenuRoot'

export default MultiSelectV2MenuRoot
