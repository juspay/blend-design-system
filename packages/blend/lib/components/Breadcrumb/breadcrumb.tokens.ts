import { CSSObject } from "styled-components";
import { FOUNDATION_THEME } from "../../tokens";
import { FoundationTokenType } from "../../tokens/theme.token";

type BreadcrumbItemType = "active" | "inactive";

export type BreadcrumbTokenType = {
  height: CSSObject["height"];
  padding: CSSObject["padding"];
  gap: CSSObject["gap"];
  item: {
    padding: CSSObject["padding"];
    gap: CSSObject["gap"];
    fontSize: {
      [key in BreadcrumbItemType]: CSSObject["fontSize"];
    };
    fontWeight: {
      [key in BreadcrumbItemType]: CSSObject["fontWeight"];
    };
    color: {
      [key in BreadcrumbItemType]: CSSObject["color"];
    };
    background: {
      [key in BreadcrumbItemType]: CSSObject["background"];
    };
  };
};

const breadcrumbTokens: BreadcrumbTokenType = {
  height: FOUNDATION_THEME.unit[32],
  padding: FOUNDATION_THEME.unit[0],
  gap: FOUNDATION_THEME.unit[8],
  item: {
    padding: `${FOUNDATION_THEME.unit[4]} ${FOUNDATION_THEME.unit[8]}`,
    gap: FOUNDATION_THEME.unit[8],
    fontSize: {
      active: "12px",
      inactive: "12px",
    },
    fontWeight: {
      active: 500,
      inactive: 500,
    },
    color: {
      active: FOUNDATION_THEME.colors.gray[700],
      inactive: FOUNDATION_THEME.colors.gray[400],
    },
    background: {
      active: "none",
      inactive: "none",
    },
  },
};

export const getBreadcrumbTokens = (
  foundationToken: FoundationTokenType,
): BreadcrumbTokenType => {
  return {
    height: foundationToken.unit[32],
    padding: foundationToken.unit[0],
    gap: foundationToken.unit[8],
    item: {
      padding: `${foundationToken.unit[4]} ${foundationToken.unit[8]}`,
      gap: foundationToken.unit[8],
      fontSize: {
        active: "12px",
        inactive: "12px",
      },
      fontWeight: {
        active: 500,
        inactive: 500,
      },
      color: {
        active: foundationToken.colors.gray[700],
        inactive: foundationToken.colors.gray[400],
      },
      background: {
        active: "none",
        inactive: "none",
      },
    },
  };
};

export default breadcrumbTokens;
