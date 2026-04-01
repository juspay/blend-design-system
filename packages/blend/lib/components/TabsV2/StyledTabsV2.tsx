import styled from 'styled-components'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { TabsV2Variant, TabsV2Size } from './tabsV2.types'
import type { TabsV2TokensType } from './tabsV2.tokens'
import { FOUNDATION_THEME } from '../../tokens'

export const StyledTabsRoot = styled(TabsPrimitive.Root)<{
    $tabsToken: TabsV2TokensType
}>((props) => ({
    width: props.$tabsToken.width,
}))

export const StyledTabsContent = styled(TabsPrimitive.Content)<{
    $tabsToken: TabsV2TokensType
}>((props) => ({
    width: props.$tabsToken.width,
    outline: props.$tabsToken.outline,
    position: 'relative',
}))

export const StyledTabsList = styled(TabsPrimitive.List)<{
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
    gap: props.$tabsToken.tabList.gap,
    position: 'relative',
    paddingTop:
        props.$tabsToken.tabList.padding[props.$size][props.$variant].top,
    paddingRight:
        props.$tabsToken.tabList.padding[props.$size][props.$variant].right,
    paddingBottom:
        props.$tabsToken.tabList.padding[props.$size][props.$variant].bottom,
    paddingLeft:
        props.$tabsToken.tabList.padding[props.$size][props.$variant].left,
    backgroundColor: props.$tabsToken.tabList.backgroundColor[props.$variant],
    borderRadius:
        props.$tabsToken.tabList.borderRadius[props.$size][props.$variant],

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
                bottom: props.$tabsToken.tabList.activeIndicator.position
                    .bottom,
                height: props.$tabsToken.tabList.activeIndicator.height,
                backgroundColor: props.$tabsToken.tabList.activeIndicator.color,
                scale: 'var(--tabs-indicator-width, 0.125) 1',
                translate: 'var(--tabs-indicator-left, 0) 0',
                transformOrigin: 'left',
                transition: props.$tabsToken.tabList.activeIndicator.transition,
                zIndex: props.$tabsToken.tabList.activeIndicator.zIndex,
            },
        }),
}))

export const StyledTabsTrigger = styled(TabsPrimitive.Trigger)<{
    $variant: TabsV2Variant
    $size: TabsV2Size
    $tabsToken: TabsV2TokensType
    $isOverlay?: boolean
}>((props) => ({
    display: 'inline-flex',
    gap: props.$tabsToken.tabList.trigger.gap,
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    paddingTop:
        props.$tabsToken.tabList.trigger.padding[props.$size][props.$variant]
            .top,
    paddingRight:
        props.$tabsToken.tabList.trigger.padding[props.$size][props.$variant]
            .right,
    paddingBottom:
        props.$tabsToken.tabList.trigger.padding[props.$size][props.$variant]
            .bottom,
    paddingLeft:
        props.$tabsToken.tabList.trigger.padding[props.$size][props.$variant]
            .left,
    fontSize: props.$tabsToken.tabList.trigger.text.fontSize[props.$size],
    fontWeight: props.$tabsToken.tabList.trigger.text.fontWeight[props.$size],
    color: props.$isOverlay
        ? props.$tabsToken.tabList.trigger.text.color[props.$variant].active
        : props.$tabsToken.tabList.trigger.text.color[props.$variant].default,
    backgroundColor: props.$isOverlay
        ? 'transparent'
        : props.$tabsToken.tabList.trigger.backgroundColor[props.$variant]
              .default,
    borderRadius:
        props.$tabsToken.tabList.trigger.borderRadius[props.$size][
            props.$variant
        ],
    border: props.$isOverlay
        ? 'none'
        : props.$tabsToken.tabList.trigger.border[props.$variant],
    transition: props.$tabsToken.tabList.trigger.transition,
    position: 'relative',
    cursor: 'pointer',
    overflow: 'visible',

    ...(!props.$isOverlay && {
        "&:hover:not([data-state='active']):not(:disabled)": {
            color: props.$tabsToken.tabList.trigger.text.color[props.$variant]
                .hover,
            backgroundColor:
                props.$tabsToken.tabList.trigger.backgroundColor[props.$variant]
                    .hover,
            borderRadius:
                props.$tabsToken.tabList.trigger.borderRadius[props.$size][
                    props.$variant
                ],
        },

        "&[data-state='active']": {
            color: props.$tabsToken.tabList.trigger.text.color[props.$variant]
                .active,
            backgroundColor: 'transparent',
            fontWeight:
                props.$tabsToken.tabList.trigger.text.fontWeight[props.$size],
            borderRadius:
                props.$tabsToken.tabList.trigger.borderRadius[props.$size][
                    props.$variant
                ],
            zIndex: 1,
        },
    }),

    '&:disabled': {
        color: props.$tabsToken.tabList.trigger.text.color[props.$variant]
            .disabled,
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
    gap: props.$tabsToken.tabList.trigger.gap,
    maxWidth: props.$tabsToken.tabList.trigger.icon.maxWidth,
    maxHeight: props.$tabsToken.tabList.trigger.icon.maxWidth,
    color: 'inherit',
}))
