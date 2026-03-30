import * as React from 'react'
import { Ellipsis } from 'lucide-react'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import MenuV2 from '../MenuV2/MenuV2'
import {
    MenuV2Alignment,
    MenuV2Side,
    type MenuV2GroupType,
} from '../MenuV2/menuV2.types'
import type { BreadcrumbV2TokensType } from './breadcrumbV2.tokens'
import type { BreadcrumbCompoundItemProps } from './breadcrumbV2.types'
import {
    createStubAnchorClickEvent,
    getPlainTextFromReactNode,
    type IndexedBreadcrumbChild,
} from './utils'

export type BreadcrumbV2OverflowMenuProps = {
    menuItems: IndexedBreadcrumbChild[]
    breadcrumbTokens: BreadcrumbV2TokensType
}

const BreadcrumbV2OverflowMenu = ({
    menuItems,
    breadcrumbTokens,
}: BreadcrumbV2OverflowMenuProps) => {
    const [open, setOpen] = React.useState(false)

    const items: MenuV2GroupType[] = React.useMemo(() => {
        if (menuItems.length === 0) return []
        return [
            {
                id: 'breadcrumb-overflow',
                items: menuItems.map(({ el, idx }) => {
                    const props = el.props as BreadcrumbCompoundItemProps
                    const text =
                        getPlainTextFromReactNode(props.children).trim() ||
                        'Breadcrumb'
                    const href = props.href ?? '#'

                    return {
                        id: `breadcrumb-overflow-${idx}`,
                        label: { text },
                        onClick: () => {
                            if (props.onClick) {
                                const event = createStubAnchorClickEvent(href)
                                // Match BreadcrumbV2Item: preventDefault before invoking onClick
                                event.preventDefault()
                                props.onClick(event)
                            } else if (
                                href !== '#' &&
                                typeof window !== 'undefined'
                            ) {
                                window.location.assign(href)
                            }
                        },
                    }
                }),
            },
        ]
    }, [menuItems])

    if (menuItems.length === 0) {
        return null
    }

    const count = menuItems.length

    return (
        <MenuV2
            open={open}
            onOpenChange={setOpen}
            asModal
            alignment={MenuV2Alignment.START}
            side={MenuV2Side.BOTTOM}
            trigger={
                <PrimitiveButton
                    background={'none'}
                    borderRadius={breadcrumbTokens.ellipsis.borderRadius}
                    contentCentered
                    color={breadcrumbTokens.ellipsis.color}
                    marginX={breadcrumbTokens.item.gap}
                    type="button"
                    cursor="pointer"
                >
                    <Ellipsis
                        size={breadcrumbTokens.ellipsis.size}
                        color={breadcrumbTokens.ellipsis.color}
                        aria-hidden
                    />
                </PrimitiveButton>
            }
            triggerProps={{
                'aria-label': `Show ${count} more breadcrumb items`,
                'aria-expanded': open,
                'aria-haspopup': 'menu',
            }}
            items={items}
            dimensions={{ minWidth: 200 }}
        />
    )
}

BreadcrumbV2OverflowMenu.displayName = 'BreadcrumbV2OverflowMenu'

export default BreadcrumbV2OverflowMenu
