import { CSSObject } from "styled-components";
import { FOUNDATION_THEME } from "../../../tokens";
import { FoundationTokenType } from "../../../tokens/theme.token";

enum SearchInputState {
  DEFAULT = "default",
  HOVER = "hover",
  FOCUS = "focus",
  ERROR = "error",
}

export type SearchInputTokensType = {
  height: CSSObject["height"];
  width: CSSObject["width"];
  gap: CSSObject["gap"];
  padding: {
    x: CSSObject["padding"];
    y: CSSObject["padding"];
  };
  borderRadius: CSSObject["borderRadius"];
  borderTop: {
    [key in SearchInputState]: CSSObject["borderTop"];
  };
  borderLeft: {
    [key in SearchInputState]: CSSObject["borderTop"];
  };
  borderRight: {
    [key in SearchInputState]: CSSObject["borderRight"];
  };
  borderBottom: {
    [key in SearchInputState]: CSSObject["borderBottom"];
  };
  border?: {
    radius: CSSObject["borderRadius"];
    color: {
      [key in SearchInputState]: CSSObject["borderColor"];
    };
  };
  outline: CSSObject["outline"];
  boxShadow: CSSObject["boxShadow"];
};

const searchInputTokens: Readonly<SearchInputTokensType> = {
  width: "100%",
  height: FOUNDATION_THEME.unit[40],
  gap: FOUNDATION_THEME.unit[8],
  padding: {
    x: FOUNDATION_THEME.unit[8],
    y: FOUNDATION_THEME.unit[8],
  },
  borderRadius: FOUNDATION_THEME.unit[0],
  borderTop: {
    default: "none",
    hover: "none",
    focus: "none",
    error: "none",
  },
  borderLeft: {
    default: "none",
    hover: "none",
    focus: "none",
    error: "none",
  },
  borderRight: {
    default: "none",
    hover: "none",
    focus: "none",
    error: "none",
  },
  borderBottom: {
    default: `1px solid ${FOUNDATION_THEME.colors.gray[200]} !important`,
    hover: `1px solid ${FOUNDATION_THEME.colors.gray[400]} !important`,
    focus: `1px solid ${FOUNDATION_THEME.colors.primary[500]} !important`,
    error: `1px solid ${FOUNDATION_THEME.colors.red[500]} !important`,
  },
  outline: "none",
  boxShadow: FOUNDATION_THEME.shadows.sm,
};

export const getSearchInputTokens = (
  foundationTokens: FoundationTokenType,
): SearchInputTokensType => {
  return {
    width: "100%",
    height: foundationTokens.unit[40],
    gap: foundationTokens.unit[8],
    padding: {
      x: foundationTokens.unit[8],
      y: foundationTokens.unit[8],
    },
    borderRadius: foundationTokens.unit[0],
    borderTop: {
      default: "none",
      hover: "none",
      focus: "none",
      error: "none",
    },
    borderLeft: {
      default: "none",
      hover: "none",
      focus: "none",
      error: "none",
    },
    borderRight: {
      default: "none",
      hover: "none",
      focus: "none",
      error: "none",
    },
    borderBottom: {
      default: `1px solid ${foundationTokens.colors.gray[200]} !important`,
      hover: `1px solid ${foundationTokens.colors.gray[400]} !important`,
      focus: `1px solid ${foundationTokens.colors.primary[500]} !important`,
      error: `1px solid ${foundationTokens.colors.red[500]} !important`,
    },
    outline: "none",
    boxShadow: foundationTokens.shadows.sm,
  };
};

export default searchInputTokens;
