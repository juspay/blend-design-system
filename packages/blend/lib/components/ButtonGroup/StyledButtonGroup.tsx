import styled, { css } from "styled-components";
import buttonGroupTokens from "./token";
import { ButtonSize } from "../Button/types";

export const StyledButtonGroup = styled.div`
  display: ${buttonGroupTokens.container.display};
  align-items: ${buttonGroupTokens.container.alignItems};
`;

export const StyledButtonGroupContainer = styled(StyledButtonGroup)<{
  $isStacked: boolean;
  $size: ButtonSize;
}>`
  ${({ $isStacked, $size }) =>
    !$isStacked && `gap: ${buttonGroupTokens.spacing[$size]};`}
`;

export const StyledButtonWrapper = styled.div<{
  $position: "first" | "middle" | "last";
  $isStacked: boolean;
}>`
  display: inline-block;

  ${({ $position, $isStacked }) => {
    if (!$isStacked) return "";

    if ($position === "first") {
      return css`
        & > button {
          border-top-right-radius: ${buttonGroupTokens.stacked.positions.first
            .borderTopRightRadius};
          border-bottom-right-radius: ${buttonGroupTokens.stacked.positions
            .first.borderBottomRightRadius};
          border-right: ${buttonGroupTokens.stacked.positions.first
            .borderRight};
        }
      `;
    } else if ($position === "middle") {
      return css`
        & > button {
          border-radius: ${buttonGroupTokens.stacked.positions.middle
            .borderRadius};
          border-right: ${buttonGroupTokens.stacked.positions.middle
            .borderRight};
        }
      `;
    } else if ($position === "last") {
      return css`
        & > button {
          border-top-left-radius: ${buttonGroupTokens.stacked.positions.last
            .borderTopLeftRadius};
          border-bottom-left-radius: ${buttonGroupTokens.stacked.positions.last
            .borderBottomLeftRadius};
        }
      `;
    }

    return "";
  }}
`;
