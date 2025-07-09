import * as RadixTooltip from "@radix-ui/react-tooltip";
import styled, { CSSObject } from "styled-components";
import {
  TooltipProps,
  TooltipAlign,
  TooltipSide,
  TooltipSize,
  TooltipSlotDirection,
} from "./types";
import { TooltipTokensType } from "./tooltip.tokens";
import Block from "../Primitives/Block/Block";
import Text from "../Text/Text";
import { useComponentToken } from "../../context/useComponentToken";

const Arrow = styled(RadixTooltip.Arrow)<{
  $color: CSSObject["backgroundColor"];
}>`
  fill: ${({ $color }) => $color};
`;

export const Tooltip = ({
  children: trigger,
  content,
  side = TooltipSide.TOP,
  align = TooltipAlign.CENTER,
  showArrow = true,
  size = TooltipSize.SMALL,
  slot,
  slotDirection = TooltipSlotDirection.LEFT,
  delayDuration = 300,
  offset = 5,
  open,
}: TooltipProps) => {
  const tooltipTokens = useComponentToken("TOOLTIP") as TooltipTokensType;
  return (
    <RadixTooltip.Provider delayDuration={delayDuration}>
      <RadixTooltip.Root open={open}>
        <RadixTooltip.Trigger asChild>{trigger}</RadixTooltip.Trigger>
        <RadixTooltip.Content
          side={side}
          align={align}
          sideOffset={offset}
          style={{ zIndex: 1000 }}
        >
          <Block
            display="flex"
            alignItems="center"
            overflow="hidden"
            backgroundColor={tooltipTokens.background}
            padding={tooltipTokens.padding[size]}
            borderRadius={tooltipTokens.borderRadius[size]}
            maxWidth={tooltipTokens.maxWidth[size]}
            gap={tooltipTokens.gap[size]}
          >
            {slot && slotDirection === TooltipSlotDirection.LEFT && (
              <Block contentCentered flexShrink={0}>
                {slot}
              </Block>
            )}
            <Block flexGrow={1} overflow="hidden">
              <Text
                color={tooltipTokens.color}
                variant={tooltipTokens.fontSize[size]}
                fontWeight={tooltipTokens.fontWeight[size]}
              >
                {content}
              </Text>
            </Block>

            {slot && slotDirection === TooltipSlotDirection.RIGHT && (
              <Block contentCentered flexShrink={0}>
                {slot}
              </Block>
            )}
          </Block>
          {showArrow && <Arrow offset={8} $color={tooltipTokens.background} />}
        </RadixTooltip.Content>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};

export default Tooltip;
