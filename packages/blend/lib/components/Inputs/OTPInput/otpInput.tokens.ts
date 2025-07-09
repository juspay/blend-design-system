import { CSSObject } from "styled-components";
import { FOUNDATION_THEME } from "../../../tokens";
import { FoundationTokenType } from "../../../tokens/theme.token";

enum OTPInputState {
  DEFAULT = "default",
  HOVER = "hover",
  FOCUS = "focus",
  ERROR = "error",
  DISABLED = "disabled",
}

export type OTPInputTokensType = {
  input: {
    gap: CSSObject["gap"];
    borderRadius: CSSObject["borderRadius"];
    boxShadow: CSSObject["boxShadow"];
    padding: CSSObject["padding"];
    outline: {
      [key in OTPInputState]: CSSObject["outline"];
    };
    border: {
      [key in OTPInputState]: CSSObject["border"];
    };
    color: {
      [key in OTPInputState]: CSSObject["color"];
    };
    backgroundColor: {
      [key in OTPInputState]: CSSObject["backgroundColor"];
    };
  };
};

const otpInputTokens: OTPInputTokensType = {
  input: {
    gap: FOUNDATION_THEME.unit[8],
    borderRadius: FOUNDATION_THEME.border.radius[12],
    boxShadow: FOUNDATION_THEME.shadows.sm,
    padding: 8,
    border: {
      default: `1px solid ${FOUNDATION_THEME.colors.gray[200]}`,
      hover: `1px solid ${FOUNDATION_THEME.colors.gray[400]}`,
      focus: `1px solid ${FOUNDATION_THEME.colors.primary[500]}`,
      error: `1px solid ${FOUNDATION_THEME.colors.red[500]}`,
      disabled: `1px solid ${FOUNDATION_THEME.colors.gray[200]}`,
    },
    outline: {
      default: "none",
      hover: "none",
      focus: "none",
      error: "none",
      disabled: "none",
    },
    backgroundColor: {
      default: FOUNDATION_THEME.colors.gray[0],
      disabled: FOUNDATION_THEME.colors.gray[50],
      hover: FOUNDATION_THEME.colors.gray[0],
      focus: FOUNDATION_THEME.colors.gray[0],
      error: FOUNDATION_THEME.colors.gray[0],
    },
    color: {
      default: FOUNDATION_THEME.colors.gray[800],
      hover: FOUNDATION_THEME.colors.gray[800],
      focus: FOUNDATION_THEME.colors.gray[800],
      error: FOUNDATION_THEME.colors.red[800],
      disabled: FOUNDATION_THEME.colors.gray[300],
    },
  },
};

export const getOTPInputTokens = (
  foundationToken: FoundationTokenType,
): OTPInputTokensType => {
  return {
    input: {
      gap: foundationToken.unit[8],
      borderRadius: foundationToken.border.radius[12],
      boxShadow: foundationToken.shadows.sm,
      padding: 8,
      border: {
        default: `1px solid ${foundationToken.colors.gray[200]}`,
        hover: `1px solid ${foundationToken.colors.gray[400]}`,
        focus: `1px solid ${foundationToken.colors.primary[500]}`,
        error: `1px solid ${foundationToken.colors.red[500]}`,
        disabled: `1px solid ${foundationToken.colors.gray[200]}`,
      },
      outline: {
        default: "none",
        hover: "none",
        focus: "none",
        error: "none",
        disabled: "none",
      },
      backgroundColor: {
        default: foundationToken.colors.gray[0],
        disabled: foundationToken.colors.gray[50],
        hover: foundationToken.colors.gray[0],
        focus: foundationToken.colors.gray[0],
        error: foundationToken.colors.gray[0],
      },
      color: {
        default: foundationToken.colors.gray[800],
        hover: foundationToken.colors.gray[800],
        focus: foundationToken.colors.gray[800],
        error: foundationToken.colors.red[800],
        disabled: foundationToken.colors.gray[300],
      },
    },
  };
};

export default otpInputTokens;
