import { CSSObject } from "styled-components";
import { FOUNDATION_THEME, ThemeType } from "../../tokens";
import { RadioSize } from "./types";

export type RadioState = "default" | "hover" | "disabled" | "error";
export type RadioIndicatorState = "active" | "inactive";

export type RadioTokensType = Readonly<{
  gap: CSSObject["gap"];
  slotGap: CSSObject["gap"];
  groupGap: CSSObject["gap"];
  indicator: {
    [key in RadioIndicatorState]: {
      background: {
        [key in Exclude<RadioState, "error">]: CSSObject["backgroundColor"];
      };
      border: {
        [key in Exclude<RadioState, "error">]: CSSObject["borderColor"];
      };
    };
  };
  activeIndicator: {
    active: {
      background: {
        [key in Exclude<
          RadioState,
          "hover" | "error"
        >]: CSSObject["backgroundColor"];
      };
    };
  };
  content: {
    label: {
      color: {
        [key in RadioState]: CSSObject["color"];
      };
      font: {
        [key in RadioSize]: {
          fontSize: CSSObject["fontSize"];
          fontWeight: CSSObject["fontWeight"];
        };
      };
    };
    sublabel: {
      color: {
        [key in RadioState]: CSSObject["color"];
      };
      font: {
        [key in RadioSize]: {
          fontSize: CSSObject["fontSize"];
          fontWeight: CSSObject["fontWeight"];
        };
      };
    };
  };
  height: {
    [key in RadioSize]: CSSObject["height"];
  };
  borderWidth: {
    [key in RadioIndicatorState]: {
      [key in Exclude<RadioState, "error">]: number;
    };
  };
  slot: {
    size: {
      [key in RadioSize]: CSSObject["width"];
    };
  };
}>;

export const getRadioTokens = (foundationToken: ThemeType): RadioTokensType => {
  return {
    gap: foundationToken.unit[4],
    slotGap: foundationToken.unit[8],
    groupGap: foundationToken.unit[12],
    indicator: {
      inactive: {
        background: {
          default: foundationToken.colors.gray[0],
          hover: foundationToken.colors.gray[0],
          disabled: foundationToken.colors.gray[50],
        },
        border: {
          default: foundationToken.colors.gray[300],
          hover: foundationToken.colors.primary[600],
          disabled: foundationToken.colors.gray[200],
        },
      },
      active: {
        background: {
          default: foundationToken.colors.gray[0],
          hover: foundationToken.colors.gray[0],
          disabled: foundationToken.colors.gray[50],
        },
        border: {
          default: foundationToken.colors.primary[600],
          hover: foundationToken.colors.primary[700],
          disabled: foundationToken.colors.gray[200],
        },
      },
    },
    activeIndicator: {
      active: {
        background: {
          default: foundationToken.colors.primary[600],
          disabled: foundationToken.colors.gray[200],
        },
      },
    },
    content: {
      label: {
        color: {
          default: foundationToken.colors.gray[900],
          hover: foundationToken.colors.gray[900],
          disabled: foundationToken.colors.gray[400],
          error: foundationToken.colors.red[600],
        },
        font: {
          sm: {
            fontSize: foundationToken.font.size.body.sm.fontSize,
            fontWeight: foundationToken.font.weight[500],
          },
          md: {
            fontSize: foundationToken.font.size.body.md.fontSize,
            fontWeight: foundationToken.font.weight[500],
          },
        },
      },
      sublabel: {
        color: {
          default: foundationToken.colors.gray[400],
          hover: foundationToken.colors.gray[400],
          disabled: foundationToken.colors.gray[200],
          error: foundationToken.colors.gray[400],
        },
        font: {
          sm: {
            fontSize: foundationToken.font.size.body.sm.fontSize,
            fontWeight: foundationToken.font.weight[400],
          },
          md: {
            fontSize: foundationToken.font.size.body.md.fontSize,
            fontWeight: foundationToken.font.weight[400],
          },
        },
      },
    },
    height: {
      sm: foundationToken.unit[16],
      md: foundationToken.unit[20],
    },
    borderWidth: {
      inactive: {
        default: 1,
        hover: 1,
        disabled: 1,
      },
      active: {
        default: 2,
        hover: 2,
        disabled: 1,
      },
    },
    slot: {
      size: {
        sm: foundationToken.unit[12],
        md: foundationToken.unit[12],
      },
    },
  };
};

const radioTokens: RadioTokensType = getRadioTokens(FOUNDATION_THEME);

export default radioTokens;
