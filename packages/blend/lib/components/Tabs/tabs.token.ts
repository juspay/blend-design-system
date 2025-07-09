import { CSSObject } from "styled-components";
import { FOUNDATION_THEME, ThemeType } from "../../tokens";
import { TabsVariant, TabsSize } from "./types";

export type TabsState = "default" | "hover" | "active" | "disabled";

export type TabsTokensType = {
  gap: {
    [key in TabsVariant]: CSSObject["gap"];
  };

  list: {
    padding: {
      [key in TabsVariant]: CSSObject["padding"];
    };
    backgroundColor: {
      [key in TabsVariant]: CSSObject["backgroundColor"];
    };
    borderRadius: {
      [key in TabsVariant]: CSSObject["borderRadius"];
    };
    borderBottom: {
      [key in TabsVariant]: CSSObject["borderBottom"];
    };
  };

  trigger: {
    height: {
      [key in TabsSize]: CSSObject["height"];
    };
    padding: {
      [key in TabsSize]: CSSObject["padding"];
    };
    fontSize: {
      [key in TabsSize]: CSSObject["fontSize"];
    };

    iconGap: CSSObject["gap"];

    fontWeight: {
      [key in TabsVariant]: {
        [key in TabsState]?: CSSObject["fontWeight"];
      };
    };
    color: {
      [key in TabsVariant]: {
        [key in TabsState]?: CSSObject["color"];
      };
    };
    backgroundColor: {
      [key in TabsVariant]: {
        [key in TabsState]?: CSSObject["backgroundColor"];
      };
    };
    borderRadius: {
      [key in TabsVariant]: CSSObject["borderRadius"];
    };
  };

  underline: {
    height: CSSObject["height"];
    color: CSSObject["color"];
  };
};

export const getTabsTokens = (foundationToken: ThemeType): TabsTokensType => {
  return {
    gap: {
      [TabsVariant.UNDERLINE]: foundationToken.unit[12],
      [TabsVariant.BOXED]: foundationToken.unit[4],
      [TabsVariant.FLOATING]: foundationToken.unit[8],
    },

    list: {
      padding: {
        [TabsVariant.UNDERLINE]: "0",
        [TabsVariant.BOXED]: foundationToken.unit[4],
        [TabsVariant.FLOATING]: "0",
      },
      backgroundColor: {
        [TabsVariant.UNDERLINE]: "transparent",
        [TabsVariant.BOXED]: foundationToken.colors.gray[50],
        [TabsVariant.FLOATING]: "transparent",
      },
      borderRadius: {
        [TabsVariant.UNDERLINE]: "0",
        [TabsVariant.BOXED]: foundationToken.border.radius[8],
        [TabsVariant.FLOATING]: "0",
      },
      borderBottom: {
        [TabsVariant.UNDERLINE]: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
        [TabsVariant.BOXED]: "none",
        [TabsVariant.FLOATING]: "none",
      },
    },

    trigger: {
      height: {
        [TabsSize.MD]: foundationToken.unit[36],
        [TabsSize.LG]: foundationToken.unit[40],
      },
      padding: {
        [TabsSize.MD]: `0 ${foundationToken.unit[12]}`,
        [TabsSize.LG]: `0 ${foundationToken.unit[12]}`,
      },
      fontSize: {
        [TabsSize.MD]: foundationToken.font.size.body.md.fontSize,
        [TabsSize.LG]: foundationToken.font.size.body.md.fontSize,
      },

      iconGap: foundationToken.unit[8],

      fontWeight: {
        [TabsVariant.UNDERLINE]: {
          default: foundationToken.font.weight[500],
          active: foundationToken.font.weight[600],
        },
        [TabsVariant.BOXED]: {
          default: foundationToken.font.weight[500],
          active: foundationToken.font.weight[600],
        },
        [TabsVariant.FLOATING]: {
          default: foundationToken.font.weight[500],
          active: foundationToken.font.weight[600],
        },
      },
      color: {
        [TabsVariant.UNDERLINE]: {
          default: foundationToken.colors.gray[500],
          hover: foundationToken.colors.gray[600],
          active: foundationToken.colors.gray[700],
          disabled: foundationToken.colors.gray[400],
        },
        [TabsVariant.BOXED]: {
          default: foundationToken.colors.gray[500],
          hover: foundationToken.colors.gray[600],
          active: foundationToken.colors.gray[700],
          disabled: foundationToken.colors.gray[400],
        },
        [TabsVariant.FLOATING]: {
          default: foundationToken.colors.gray[500],
          hover: foundationToken.colors.gray[700],
          active: foundationToken.colors.gray[700],
          disabled: foundationToken.colors.gray[400],
        },
      },
      backgroundColor: {
        [TabsVariant.UNDERLINE]: {
          default: "transparent",
          hover: "transparent",
          active: "transparent",
        },
        [TabsVariant.BOXED]: {
          default: "transparent",
          hover: foundationToken.colors.gray[0],
          active: foundationToken.colors.gray[0],
        },
        [TabsVariant.FLOATING]: {
          default: "transparent",
          hover: foundationToken.colors.gray[50],
          active: foundationToken.colors.gray[100],
        },
      },
      borderRadius: {
        [TabsVariant.UNDERLINE]: "0",
        [TabsVariant.BOXED]: foundationToken.border.radius[8],
        [TabsVariant.FLOATING]: foundationToken.border.radius[8],
      },
    },

    underline: {
      height: foundationToken.border.width[2],
      color: foundationToken.colors.gray[700],
    },
  };
};

const tabsTokens: TabsTokensType = getTabsTokens(FOUNDATION_THEME);

export default tabsTokens;
