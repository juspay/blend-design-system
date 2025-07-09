import { CSSObject } from "styled-components";
import { PopoverSize } from "./types";
import { FOUNDATION_THEME } from "../../tokens";
import { FoundationTokenType } from "../../tokens/theme.token";

export type PopoverTokenType = {
  background: CSSObject["backgroundColor"];
  border: CSSObject["border"];
  shadow: CSSObject["boxShadow"];
  gap: CSSObject["gap"];
  zIndex: CSSObject["zIndex"];
  borderRadius: CSSObject["borderRadius"];
  headerContainer: {
    heading: {
      fontSize: {
        [key in PopoverSize]: CSSObject["fontSize"];
      };
      fontWeight: {
        [key in PopoverSize]: CSSObject["fontWeight"];
      };
      color: {
        [key in PopoverSize]: CSSObject["color"];
      };
    };
    description: {
      fontSize: {
        [key in PopoverSize]: CSSObject["fontSize"];
      };
      color: {
        [key in PopoverSize]: CSSObject["color"];
      };
      fontWeight: {
        [key in PopoverSize]: CSSObject["fontWeight"];
      };
    };
  };
  footer: {
    justifyContent: CSSObject["justifyContent"];
    gap: CSSObject["gap"];
  };
};

export const getPopoverTokens = (
  foundationTokens: FoundationTokenType,
): PopoverTokenType => {
  return {
    background: foundationTokens.colors.gray[0],
    border: foundationTokens.border.radius[8],
    shadow: foundationTokens.shadows.lg,
    gap: foundationTokens.unit[12],
    zIndex: 1000,
    borderRadius: foundationTokens.border.radius[8],
    headerContainer: {
      heading: {
        fontSize: {
          small: "14px",
          medium: "16px",
        },
        fontWeight: {
          small: FOUNDATION_THEME.font.weight[600],
          medium: FOUNDATION_THEME.font.weight[600],
        },
        color: {
          small: foundationTokens.colors.gray[900],
          medium: foundationTokens.colors.gray[900],
        },
      },
      description: {
        fontSize: {
          small: "12px",
          medium: "14px",
        },
        fontWeight: {
          small: FOUNDATION_THEME.font.weight[500],
          medium: FOUNDATION_THEME.font.weight[500],
        },
        color: {
          small: foundationTokens.colors.gray[500],
          medium: foundationTokens.colors.gray[500],
        },
      },
    },
    footer: {
      justifyContent: "flex-end",
      gap: foundationTokens.unit[12],
    },
  };
};
