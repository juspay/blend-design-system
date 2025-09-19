import styled from 'styled-components'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { TabsVariant, TabsSize } from './types'
import type { TabsTokensType } from './tabs.token'
import { foundationToken } from '../../foundationToken'

export const StyledTabs = styled(TabsPrimitive.Root)`
    width: 100%;
`

export const StyledTabsContent = styled(TabsPrimitive.Content)<{
    $tabsToken: TabsTokensType
}>(() => ({
    width: '100%',
    outline: 'none',
    position: 'relative',
    transition: 'all 0.2s ease-in-out',
}))

export const StyledTabsList = styled(TabsPrimitive.List)<{
    $variant: TabsVariant
    $size: TabsSize
    $expanded: boolean
    $fitContent: boolean
    $tabsToken: TabsTokensType
}>((props) => ({
    display: 'flex',
    width: props.$fitContent ? 'fit-content' : '100%',
    alignItems: 'center',
    gap: props.$tabsToken.gap,
    border: 'none',
    position: 'relative',
    padding: props.$tabsToken.container.padding[props.$variant],
    backgroundColor: props.$tabsToken.container.backgroundColor[props.$variant],
    borderRadius: props.$tabsToken.container.borderRadius[props.$variant],

    ...(props.$expanded &&
        !props.$fitContent && {
            justifyContent: 'space-between',
            '& > *': {
                flex: 1,
                textAlign: 'center',
            },
        }),
}))

export const StyledTabsTrigger = styled(TabsPrimitive.Trigger)<{
    $variant: TabsVariant
    $size: TabsSize
    $tabsToken: TabsTokensType
}>((props) => ({
    display: 'inline-flex',
    gap: props.$tabsToken.trigger.gap,
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    padding: props.$tabsToken.padding[props.$size][props.$variant],
    fontSize: props.$tabsToken.text.fontSize[props.$size],
    fontWeight: props.$tabsToken.text.fontWeight[props.$size],
    color: props.$tabsToken.text.color[props.$variant].default,
    backgroundColor: props.$tabsToken.backgroundColor[props.$variant].default,
    borderRadius:
        props.$tabsToken.borderRadius[props.$size][props.$variant].default,
    border: props.$tabsToken.border[props.$variant].default,
    transition: 'all 0.2s ease-in-out',
    outline: 'none',
    position: 'relative',
    cursor: 'pointer',

    "&:hover:not([data-state='active']):not(:disabled)": {
        color: props.$tabsToken.text.color[props.$variant].hover,
        backgroundColor: props.$tabsToken.backgroundColor[props.$variant].hover,
    },

    "&[data-state='active']": {
        color: props.$tabsToken.text.color[props.$variant].active,
        backgroundColor:
            props.$tabsToken.backgroundColor[props.$variant].active,
        fontWeight: props.$tabsToken.text.fontWeight[props.$size],
        zIndex: 1,

        ...(props.$variant === TabsVariant.UNDERLINE && {
            '&::after': {
                content: "''",
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: '-1px',
                height: props.$tabsToken.trigger.underline.height,
                backgroundColor: props.$tabsToken.trigger.underline.color,
                zIndex: 2,
            },
        }),
    },

    '&:focus-visible:not(:disabled)': {
        outline: 'none',
    },

    '&:disabled': {
        color: props.$tabsToken.text.color[props.$variant].disabled,
        opacity: foundationToken.opacity[50],
        pointerEvents: 'none',
        cursor: 'not-allowed',
    },
}))

export const IconContainer = styled.span<{
    $tabsToken: TabsTokensType
}>((props) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: props.$tabsToken.trigger.gap,
}))
