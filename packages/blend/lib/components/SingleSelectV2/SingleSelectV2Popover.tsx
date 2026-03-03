import * as RadixMenu from '@radix-ui/react-dropdown-menu'
import styled from 'styled-components'
import { menuContentAnimations } from './singleSelectV2.animations'
import type { MenuPopoverProps } from './types'

const Content = styled(RadixMenu.Content)`
    position: relative;
    z-index: 101;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
    scrollbar-color: transparent transparent;
    ${menuContentAnimations}
`

const SingleSelectV2Popover = ({
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
    children,
}: MenuPopoverProps) => {
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
                    align={alignment}
                    side={side}
                    sideOffset={sideOffset}
                    alignOffset={alignOffset}
                    avoidCollisions
                    collisionBoundary={collisionBoundary}
                    style={contentStyle}
                    onKeyDown={onContentKeyDown}
                >
                    {children}
                </Content>
            </RadixMenu.Portal>
        </RadixMenu.Root>
    )
}

export default SingleSelectV2Popover
