import styled from "styled-components";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { TabsVariant, TabsSize } from "./types";
import { TabsTokensType } from "./tabs.token";
import { foundationToken } from "../../foundationToken";

export const StyledTabs = styled(TabsPrimitive.Root)`
  width: 100%;
`;

export const StyledTabsContent = styled(TabsPrimitive.Content)<{
  $tabsToken: TabsTokensType;
}>(() => ({
  width: "100%",
  outline: "none",
  position: "relative",
  transition: "all 0.2s ease-in-out",
}));

export const StyledTabsList = styled(TabsPrimitive.List)<{
  $variant: TabsVariant;
  $size: TabsSize;
  $expanded: boolean;
  $fitContent: boolean;
  $tabsToken: TabsTokensType;
}>((props) => ({
  display: "flex",
  width: props.$fitContent ? "fit-content" : "100%",
  alignItems: "center",
  gap: props.$tabsToken.gap[props.$variant],
  border: "none",
  position: "relative",
  padding: props.$tabsToken.list.padding[props.$variant],
  backgroundColor: props.$tabsToken.list.backgroundColor[props.$variant],
  borderRadius: props.$tabsToken.list.borderRadius[props.$variant],
  borderBottom: props.$tabsToken.list.borderBottom[props.$variant],

  ...(props.$expanded &&
    !props.$fitContent && {
      justifyContent: "space-between",
      "& > *": {
        flex: 1,
        textAlign: "center",
      },
    }),
}));

export const StyledTabsTrigger = styled(TabsPrimitive.Trigger)<{
  $variant: TabsVariant;
  $size: TabsSize;
  $tabsToken: TabsTokensType;
}>((props) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  whiteSpace: "nowrap",
  padding: props.$tabsToken.trigger.padding[props.$size],
  fontSize: props.$tabsToken.trigger.fontSize[props.$size],
  fontWeight: props.$tabsToken.trigger.fontWeight[props.$variant].default,
  color: props.$tabsToken.trigger.color[props.$variant].default,
  backgroundColor:
    props.$tabsToken.trigger.backgroundColor[props.$variant].default,
  borderRadius: props.$tabsToken.trigger.borderRadius[props.$variant],
  border: "none",
  transition: "all 0.2s ease-in-out",
  outline: "none",
  position: "relative",
  cursor: "pointer",
  height: props.$tabsToken.trigger.height[props.$size],

  "&:hover:not([data-state='active']):not(:disabled)": {
    color: props.$tabsToken.trigger.color[props.$variant].hover,
    backgroundColor:
      props.$tabsToken.trigger.backgroundColor[props.$variant].hover,
  },

  "&[data-state='active']": {
    color: props.$tabsToken.trigger.color[props.$variant].active,
    backgroundColor:
      props.$tabsToken.trigger.backgroundColor[props.$variant].active,
    fontWeight: props.$tabsToken.trigger.fontWeight[props.$variant].active,
    zIndex: 1,

    ...(props.$variant === TabsVariant.UNDERLINE && {
      "&::after": {
        content: "''",
        position: "absolute",
        left: 0,
        right: 0,
        bottom: "-1px",
        height: props.$tabsToken.underline.height,
        backgroundColor: props.$tabsToken.underline.color,
        zIndex: 2,
      },
    }),
  },

  "&:focus-visible:not(:disabled)": {
    outline: "none",
  },

  "&:disabled": {
    color: props.$tabsToken.trigger.color[props.$variant].disabled,
    opacity: foundationToken.opacity[50],
    pointerEvents: "none",
    cursor: "not-allowed",
  },
}));

export const IconContainer = styled.span<{
  $tabsToken: TabsTokensType;
}>((props) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: props.$tabsToken.trigger.iconGap,
}));
