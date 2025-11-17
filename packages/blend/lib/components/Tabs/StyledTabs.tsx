import styled from 'styled-components'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { TabsVariant, TabsSize } from './types'
import type { TabsTokensType } from './tabs.token'
import { FOUNDATION_THEME } from '../../tokens'

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
    paddingTop:
        props.$tabsToken.container?.padding?.[props.$size]?.[props.$variant]
            ?.top || 0,
    paddingRight:
        props.$tabsToken.container?.padding?.[props.$size]?.[props.$variant]
            ?.right || 0,
    paddingBottom:
        props.$tabsToken.container?.padding?.[props.$size]?.[props.$variant]
            ?.bottom || 0,
    paddingLeft:
        props.$tabsToken.container?.padding?.[props.$size]?.[props.$variant]
            ?.left || 0,
    backgroundColor:
        props.$tabsToken.container?.backgroundColor?.[props.$variant] ||
        'transparent',
    borderRadius:
        props.$tabsToken.container?.borderRadius?.[props.$size]?.[
            props.$variant
        ] || 0,

    ...(props.$expanded &&
        !props.$fitContent && {
            justifyContent: 'space-between',
            '& > *': {
                flex: 1,
                textAlign: 'center',
            },
        }),

    ...(props.$variant === TabsVariant.UNDERLINE && {
        '&::after': {
            content: "''",
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: '-1px',
            height: props.$tabsToken.trigger.activeIndicator.height,
            backgroundColor: props.$tabsToken.trigger.activeIndicator.color,
            scale: 'var(--tabs-indicator-width, 0.125) 1',
            translate: 'var(--tabs-indicator-left, 0) 0',
            transformOrigin: 'left',
            transition: 'scale 220ms, translate 220ms',
            zIndex: 2,
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
    paddingTop: props.$tabsToken.padding[props.$size][props.$variant].top,
    paddingRight: props.$tabsToken.padding[props.$size][props.$variant].right,
    paddingBottom: props.$tabsToken.padding[props.$size][props.$variant].bottom,
    paddingLeft: props.$tabsToken.padding[props.$size][props.$variant].left,
    fontSize: props.$tabsToken.trigger.text.fontSize[props.$size],
    fontWeight: props.$tabsToken.trigger.text.fontWeight[props.$size],
    color: props.$tabsToken.trigger.text.color[props.$variant].default,
    backgroundColor: props.$tabsToken.backgroundColor[props.$variant].default,
    borderRadius: props.$tabsToken.borderRadius[props.$size][props.$variant],
    border: props.$tabsToken.border[props.$variant],
    transition: 'color 0.2s ease-in-out',
    outline: 'none',
    position: 'relative',
    cursor: 'pointer',
    overflow: 'visible',

    "&:hover:not([data-state='active']):not(:disabled)": {
        color: props.$tabsToken.trigger.text.color[props.$variant].hover,
        backgroundColor: props.$tabsToken.backgroundColor[props.$variant].hover,
    },

    "&[data-state='active']": {
        color: props.$tabsToken.trigger.text.color[props.$variant].active,
        backgroundColor: 'transparent',
        fontWeight: props.$tabsToken.trigger.text.fontWeight[props.$size],
        zIndex: 1,
    },

    '&:focus-visible:not(:disabled)': {
        outline: 'none',
    },

    '&:disabled': {
        color: props.$tabsToken.trigger.text.color[props.$variant].disabled,
        opacity: FOUNDATION_THEME.opacity[50],
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
