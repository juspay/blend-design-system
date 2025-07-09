import styled, { css } from "styled-components";
import { RadioSize } from "./types";
import { RadioTokensType } from "./radio.token";
import { useComponentToken } from "../../context/useComponentToken";

export const StyledRadioInput = styled.input<{
  size: RadioSize;
  $isDisabled: boolean;
  $isChecked: boolean;
  $error?: boolean;
}>`
  appearance: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border-radius: 50%;
  margin: 0;
  padding: 0;
  flex-shrink: 0;

  ${({ size, $isChecked, $isDisabled }) => {
    const radioTokens = useComponentToken("RADIO") as RadioTokensType;
    const state = $isDisabled ? "disabled" : "default";
    const indicatorState = $isChecked ? "active" : "inactive";

    return css`
      background-color: ${radioTokens.indicator[indicatorState].background[
        state
      ]};
      border: ${radioTokens.borderWidth[indicatorState][state]}px solid
        ${radioTokens.indicator[indicatorState].border[state]};
      width: ${radioTokens.height[size]};
      height: ${radioTokens.height[size]};

      &::after {
        content: "";
        width: 50%;
        height: 50%;
        border-radius: 50%;
        background-color: ${$isChecked
          ? radioTokens.activeIndicator.active.background[state]
          : "transparent"};
        transform: ${$isChecked ? "scale(1)" : "scale(0)"};
        transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
      }

      &:focus-visible {
        outline: 2px solid
          ${radioTokens.indicator[indicatorState].border[state]};
        outline-offset: 2px;
      }

      &:not(:disabled):hover {
        background-color: ${radioTokens.indicator[indicatorState].background
          .hover};
        border-color: ${radioTokens.indicator[indicatorState].border.hover};
      }

      cursor: ${$isDisabled ? "not-allowed" : "pointer"};
      transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
    `;
  }}
`;
