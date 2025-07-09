import { CSSObject } from "styled-components";
import { UnitInputSize } from "./types";
import { FOUNDATION_THEME } from "../../../tokens";
import { FoundationTokenType } from "../../../tokens/theme.token";

enum UnitInputState {
  DEFAULT = "default",
  HOVER = "hover",
  FOCUS = "focus",
  ERROR = "error",
  DISABLED = "disabled",
}

export type UnitInputTokensType = {
  input: {
    gap: CSSObject["gap"];
    borderRadius?: CSSObject["borderRadius"];
    boxShadow: CSSObject["boxShadow"];
    paddingX: {
      [key in UnitInputSize]: CSSObject["padding"];
    };
    paddingY: {
      [key in UnitInputSize]: CSSObject["padding"];
    };
    border: {
      [key in UnitInputState]: CSSObject["border"];
    };
    color: {
      [key in UnitInputState]: CSSObject["color"];
    };
    outline: {
      [key in UnitInputState]: CSSObject["outline"];
    };
    backgroundColor: {
      [key in UnitInputState]: CSSObject["backgroundColor"];
    };
  };
};

const unitInputTokens: UnitInputTokensType = {
  input: {
    gap: FOUNDATION_THEME.unit[4],
    borderRadius: FOUNDATION_THEME.border.radius[10],
    boxShadow: FOUNDATION_THEME.shadows.sm,
    paddingX: {
      md: FOUNDATION_THEME.unit[12],
      lg: FOUNDATION_THEME.unit[14],
    },
    paddingY: {
      md: FOUNDATION_THEME.unit[8],
      lg: FOUNDATION_THEME.unit[10],
    },
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
    color: {
      default: FOUNDATION_THEME.colors.gray[800],
      hover: FOUNDATION_THEME.colors.gray[800],
      focus: FOUNDATION_THEME.colors.gray[800],
      error: FOUNDATION_THEME.colors.red[800],
      disabled: FOUNDATION_THEME.colors.gray[300],
    },
    backgroundColor: {
      default: FOUNDATION_THEME.colors.gray[0],
      disabled: FOUNDATION_THEME.colors.gray[50],
      hover: FOUNDATION_THEME.colors.gray[0],
      focus: FOUNDATION_THEME.colors.gray[0],
      error: FOUNDATION_THEME.colors.gray[0],
    },
  },
};

export const getUnitInputTokens = (
  foundationTheme: FoundationTokenType,
): UnitInputTokensType => {
  return {
    input: {
      gap: foundationTheme.unit[4],
      borderRadius: foundationTheme.border.radius[10],
      boxShadow: foundationTheme.shadows.sm,
      paddingX: {
        md: foundationTheme.unit[12],
        lg: foundationTheme.unit[14],
      },
      paddingY: {
        md: foundationTheme.unit[8],
        lg: foundationTheme.unit[10],
      },
      border: {
        default: `1px solid ${foundationTheme.colors.gray[200]}`,
        hover: `1px solid ${foundationTheme.colors.gray[400]}`,
        focus: `1px solid ${foundationTheme.colors.primary[500]}`,
        error: `1px solid ${foundationTheme.colors.red[500]}`,
        disabled: `1px solid ${foundationTheme.colors.gray[200]}`,
      },
      outline: {
        default: "none",
        hover: "none",
        focus: "none",
        error: "none",
        disabled: "none",
      },
      color: {
        default: foundationTheme.colors.gray[800],
        hover: foundationTheme.colors.gray[800],
        focus: foundationTheme.colors.gray[800],
        error: foundationTheme.colors.red[800],
        disabled: foundationTheme.colors.gray[300],
      },
      backgroundColor: {
        default: foundationTheme.colors.gray[0],
        disabled: foundationTheme.colors.gray[50],
        hover: foundationTheme.colors.gray[0],
        focus: foundationTheme.colors.gray[0],
        error: foundationTheme.colors.gray[0],
      },
    },
  };
};

export default unitInputTokens;
