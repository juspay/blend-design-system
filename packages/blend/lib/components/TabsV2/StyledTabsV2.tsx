import styled from 'styled-components'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { TabsV2Variant, TabsV2Size } from './tabsV2.types'
import type { TabsV2TokensType } from './tabsV2.tokens'
import { FOUNDATION_THEME } from '../../tokens'

export const StyledTabsV2Root = styled(TabsPrimitive.Root)`
    width: 100%;
`

export const StyledTabsV2Content = styled(TabsPrimitive.Content)<{
    $tabsToken: TabsV2TokensType
}>(() => ({
    width: '100%',
    outline: 'none',
    position: 'relative',
    transition: 'all 0.2s ease-in-out',
}))

export const StyledTabsV2List = styled(TabsPrimitive.List)<{
    $variant: TabsV2Variant
    $size: TabsV2Size
    $expanded: boolean
    $fitContent: boolean
    $tabsToken: TabsV2TokensType
    $hideIndicator?: boolean
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

    ...(props.$variant === TabsV2Variant.UNDERLINE &&
        !props.$hideIndicator && {
            '&::after': {
                content: "''",
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: '0px',
                height: props.$tabsToken.trigger.activeIndicator.height,
                backgroundColor: props.$tabsToken.trigger.activeIndicator.color,
                scale: 'var(--tabs-indicator-width, 0.125) 1',
                translate: 'var(--tabs-indicator-left, 0) 0',
                transformOrigin: 'left',
                transition:
                    'scale 250ms cubic-bezier(0.4, 0, 0.2, 1), translate 250ms cubic-bezier(0.4, 0, 0.2, 1)',
                zIndex: 2,
            },
        }),
}))

export const StyledTabsV2Trigger = styled(TabsPrimitive.Trigger)<{
    $variant: TabsV2Variant
    $size: TabsV2Size
    $tabsToken: TabsV2TokensType
    $isOverlay?: boolean
}>((props) => ({
    display: 'inline-flex',
    gap: props.$tabsToken.trigger.gap,
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    paddingTop: props.$tabsToken.padding[props.$size][props.$variant].top,
    paddingRight: props.$tabsToken.padding[props.$size][props.$variant].right,
    paddingBottom: props.$tabsToken.padding[props.$size][props.$variant].bottom,
    paddingLeft: props.$tabsToken.padding[props.$size][props.$variant].left,
    fontSize: props.$tabsToken.trigger.text.fontSize[props.$size],
    fontWeight: props.$tabsToken.trigger.text.fontWeight[props.$size],
    color: props.$isOverlay
        ? props.$tabsToken.trigger.text.color[props.$variant].active
        : props.$tabsToken.trigger.text.color[props.$variant].default,
    backgroundColor: props.$isOverlay
        ? 'transparent'
        : props.$tabsToken.backgroundColor[props.$variant].default,
    borderRadius: props.$tabsToken.borderRadius[props.$size][props.$variant],
    border: props.$isOverlay ? 'none' : props.$tabsToken.border[props.$variant],
    transition: 'color 0.2s ease-in-out',
    outline: 'none',
    position: 'relative',
    cursor: 'pointer',
    overflow: 'visible',

    ...(!props.$isOverlay && {
        "&:hover:not([data-state='active']):not(:disabled)": {
            color: props.$tabsToken.trigger.text.color[props.$variant].hover,
            backgroundColor:
                props.$tabsToken.backgroundColor[props.$variant].hover,
            borderRadius:
                props.$tabsToken.borderRadius[props.$size][props.$variant],
        },

        "&[data-state='active']": {
            color: props.$tabsToken.trigger.text.color[props.$variant].active,
            backgroundColor: 'transparent',
            fontWeight: props.$tabsToken.trigger.text.fontWeight[props.$size],
            borderRadius:
                props.$tabsToken.borderRadius[props.$size][props.$variant],
            zIndex: 1,
        },
    }),

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

export const TabsV2IconContainer = styled.span<{
    $tabsToken: TabsV2TokensType
}>((props) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: props.$tabsToken.trigger.gap,
}))
