import { CSSObject } from "styled-components";
import { FOUNDATION_THEME, ThemeType } from "../../tokens";
import { TagColor, TagShape, TagSize, TagVariant } from "./types";

export type TagTokensType = Readonly<{
  background: {
    [key in TagVariant]: {
      [key in TagColor]: CSSObject["color"];
    };
  };
  color: {
    [key in TagVariant]: {
      [key in TagColor]: CSSObject["color"];
    };
  };
  borderColor: {
    [key in TagVariant]: {
      [key in TagColor]: CSSObject["color"];
    };
  };
  borderRadius: {
    [key in TagShape]: {
      [key in TagSize]: CSSObject["borderRadius"];
    };
  };
  borderWidth: {
    [key in TagVariant]: {
      [key in TagColor]: CSSObject["borderWidth"];
    };
  };
  font: {
    [key in TagSize]: {
      fontSize: CSSObject["fontSize"];
      fontWeight: CSSObject["fontWeight"];
    };
  };
  gap: {
    [key in TagSize]: CSSObject["gap"];
  };
  padding: {
    [key in TagSize]: CSSObject["padding"];
  };
  height: {
    [key in TagSize]: CSSObject["height"];
  };
  slot: {
    size: {
      [key in TagSize]: CSSObject["width"];
    };
  };
}>;

const tagTokens: TagTokensType = {
  background: {
    noFill: {
      neutral: FOUNDATION_THEME.colors.gray[0],
      primary: FOUNDATION_THEME.colors.gray[0],
      success: FOUNDATION_THEME.colors.gray[0],
      error: FOUNDATION_THEME.colors.gray[0],
      warning: FOUNDATION_THEME.colors.gray[0],
      purple: FOUNDATION_THEME.colors.gray[0],
    },
    attentive: {
      neutral: FOUNDATION_THEME.colors.gray[950],
      primary: FOUNDATION_THEME.colors.primary[600],
      success: FOUNDATION_THEME.colors.green[600],
      error: FOUNDATION_THEME.colors.red[600],
      warning: FOUNDATION_THEME.colors.orange[500],
      purple: FOUNDATION_THEME.colors.purple[500],
    },
    subtle: {
      neutral: FOUNDATION_THEME.colors.gray[50],
      primary: FOUNDATION_THEME.colors.primary[50],
      success: FOUNDATION_THEME.colors.green[50],
      error: FOUNDATION_THEME.colors.red[50],
      warning: FOUNDATION_THEME.colors.orange[50],
      purple: FOUNDATION_THEME.colors.purple[50],
    },
  },
  color: {
    noFill: {
      neutral: FOUNDATION_THEME.colors.gray[950],
      primary: FOUNDATION_THEME.colors.primary[800],
      success: FOUNDATION_THEME.colors.green[600],
      error: FOUNDATION_THEME.colors.red[600],
      warning: FOUNDATION_THEME.colors.orange[500],
      purple: FOUNDATION_THEME.colors.purple[500],
    },
    attentive: {
      neutral: FOUNDATION_THEME.colors.gray[0],
      primary: FOUNDATION_THEME.colors.gray[0],
      success: FOUNDATION_THEME.colors.gray[0],
      error: FOUNDATION_THEME.colors.gray[0],
      warning: FOUNDATION_THEME.colors.gray[0],
      purple: FOUNDATION_THEME.colors.gray[0],
    },
    subtle: {
      neutral: FOUNDATION_THEME.colors.gray[950],
      primary: FOUNDATION_THEME.colors.primary[600],
      success: FOUNDATION_THEME.colors.green[600],
      error: FOUNDATION_THEME.colors.red[600],
      warning: FOUNDATION_THEME.colors.orange[600],
      purple: FOUNDATION_THEME.colors.purple[600],
    },
  },
  borderColor: {
    noFill: {
      neutral: FOUNDATION_THEME.colors.gray[950],
      primary: FOUNDATION_THEME.colors.primary[600],
      success: FOUNDATION_THEME.colors.green[600],
      error: FOUNDATION_THEME.colors.red[600],
      warning: FOUNDATION_THEME.colors.orange[500],
      purple: FOUNDATION_THEME.colors.purple[500],
    },
    subtle: {
      neutral: FOUNDATION_THEME.colors.gray[200],
      primary: FOUNDATION_THEME.colors.primary[100],
      success: FOUNDATION_THEME.colors.green[100],
      error: FOUNDATION_THEME.colors.red[100],
      warning: FOUNDATION_THEME.colors.orange[100],
      purple: FOUNDATION_THEME.colors.purple[100],
    },
    attentive: {
      neutral: FOUNDATION_THEME.colors.gray[950],
      primary: FOUNDATION_THEME.colors.primary[600],
      success: FOUNDATION_THEME.colors.green[600],
      error: FOUNDATION_THEME.colors.red[600],
      warning: FOUNDATION_THEME.colors.orange[500],
      purple: FOUNDATION_THEME.colors.purple[500],
    },
  },
  borderRadius: {
    squarical: {
      xs: FOUNDATION_THEME.border.radius[6],
      sm: FOUNDATION_THEME.border.radius[6],
      md: FOUNDATION_THEME.border.radius[6],
      lg: FOUNDATION_THEME.border.radius[8],
    },
    rounded: {
      xs: FOUNDATION_THEME.border.radius.full,
      sm: FOUNDATION_THEME.border.radius.full,
      md: FOUNDATION_THEME.border.radius.full,
      lg: FOUNDATION_THEME.border.radius.full,
    },
  },
  borderWidth: {
    noFill: {
      neutral: 1,
      primary: 1,
      success: 1,
      error: 1,
      warning: 1,
      purple: 1,
    },
    subtle: {
      neutral: 1,
      primary: 1,
      success: 1,
      error: 1,
      warning: 1,
      purple: 1,
    },
    attentive: {
      neutral: 1,
      primary: 1,
      success: 1,
      error: 1,
      warning: 1,
      purple: 1,
    },
  },
  font: {
    xs: {
      fontSize: FOUNDATION_THEME.font.size.body.sm.fontSize,
      fontWeight: FOUNDATION_THEME.font.weight[600],
    },
    sm: {
      fontSize: FOUNDATION_THEME.font.size.body.sm.fontSize,
      fontWeight: FOUNDATION_THEME.font.weight[600],
    },
    md: {
      fontSize: FOUNDATION_THEME.font.size.body.md.fontSize,
      fontWeight: FOUNDATION_THEME.font.weight[600],
    },
    lg: {
      fontSize: FOUNDATION_THEME.font.size.body.md.fontSize,
      fontWeight: FOUNDATION_THEME.font.weight[600],
    },
  },
  gap: {
    xs: FOUNDATION_THEME.unit[6],
    sm: FOUNDATION_THEME.unit[6],
    md: FOUNDATION_THEME.unit[6],
    lg: FOUNDATION_THEME.unit[6],
  },
  padding: {
    xs: `${FOUNDATION_THEME.unit[2]} ${FOUNDATION_THEME.unit[6]}`,
    sm: `${FOUNDATION_THEME.unit[3]} ${FOUNDATION_THEME.unit[8]}`,
    md: `${FOUNDATION_THEME.unit[4]} ${FOUNDATION_THEME.unit[10]}`,
    lg: `${FOUNDATION_THEME.unit[6]} ${FOUNDATION_THEME.unit[12]}`,
  },
  height: {
    xs: FOUNDATION_THEME.unit[20],
    sm: FOUNDATION_THEME.unit[22],
    md: FOUNDATION_THEME.unit[24],
    lg: FOUNDATION_THEME.unit[28],
  },
  slot: {
    size: {
      xs: FOUNDATION_THEME.unit[12],
      sm: FOUNDATION_THEME.unit[12],
      md: FOUNDATION_THEME.unit[12],
      lg: FOUNDATION_THEME.unit[12],
    },
  },
};

export const getTagTokens = (foundationToken: ThemeType): TagTokensType => {
  return {
    background: {
      noFill: {
        neutral: foundationToken.colors.gray[0],
        primary: foundationToken.colors.gray[0],
        success: foundationToken.colors.gray[0],
        error: foundationToken.colors.gray[0],
        warning: foundationToken.colors.gray[0],
        purple: foundationToken.colors.gray[0],
      },
      attentive: {
        neutral: foundationToken.colors.gray[950],
        primary: foundationToken.colors.primary[600],
        success: foundationToken.colors.green[600],
        error: foundationToken.colors.red[600],
        warning: foundationToken.colors.orange[500],
        purple: foundationToken.colors.purple[500],
      },
      subtle: {
        neutral: foundationToken.colors.gray[50],
        primary: foundationToken.colors.primary[50],
        success: foundationToken.colors.green[50],
        error: foundationToken.colors.red[50],
        warning: foundationToken.colors.orange[50],
        purple: foundationToken.colors.purple[50],
      },
    },
    color: {
      noFill: {
        neutral: foundationToken.colors.gray[950],
        primary: foundationToken.colors.primary[800],
        success: foundationToken.colors.green[600],
        error: foundationToken.colors.red[600],
        warning: foundationToken.colors.orange[500],
        purple: foundationToken.colors.purple[500],
      },
      attentive: {
        neutral: foundationToken.colors.gray[0],
        primary: foundationToken.colors.gray[0],
        success: foundationToken.colors.gray[0],
        error: foundationToken.colors.gray[0],
        warning: foundationToken.colors.gray[0],
        purple: foundationToken.colors.gray[0],
      },
      subtle: {
        neutral: foundationToken.colors.gray[950],
        primary: foundationToken.colors.primary[600],
        success: foundationToken.colors.green[600],
        error: foundationToken.colors.red[600],
        warning: foundationToken.colors.orange[600],
        purple: foundationToken.colors.purple[600],
      },
    },
    borderColor: {
      noFill: {
        neutral: foundationToken.colors.gray[950],
        primary: foundationToken.colors.primary[600],
        success: foundationToken.colors.green[600],
        error: foundationToken.colors.red[600],
        warning: foundationToken.colors.orange[500],
        purple: foundationToken.colors.purple[500],
      },
      subtle: {
        neutral: foundationToken.colors.gray[200],
        primary: foundationToken.colors.primary[100],
        success: foundationToken.colors.green[100],
        error: foundationToken.colors.red[100],
        warning: foundationToken.colors.orange[100],
        purple: foundationToken.colors.purple[100],
      },
      attentive: {
        neutral: foundationToken.colors.gray[950],
        primary: foundationToken.colors.primary[600],
        success: foundationToken.colors.green[600],
        error: foundationToken.colors.red[600],
        warning: foundationToken.colors.orange[500],
        purple: foundationToken.colors.purple[500],
      },
    },
    borderRadius: {
      squarical: {
        xs: foundationToken.border.radius[6],
        sm: foundationToken.border.radius[6],
        md: foundationToken.border.radius[6],
        lg: foundationToken.border.radius[8],
      },
      rounded: {
        xs: foundationToken.border.radius.full,
        sm: foundationToken.border.radius.full,
        md: foundationToken.border.radius.full,
        lg: foundationToken.border.radius.full,
      },
    },
    borderWidth: {
      noFill: {
        neutral: 1,
        primary: 1,
        success: 1,
        error: 1,
        warning: 1,
        purple: 1,
      },
      subtle: {
        neutral: 1,
        primary: 1,
        success: 1,
        error: 1,
        warning: 1,
        purple: 1,
      },
      attentive: {
        neutral: 1,
        primary: 1,
        success: 1,
        error: 1,
        warning: 1,
        purple: 1,
      },
    },
    font: {
      xs: {
        fontSize: foundationToken.font.size.body.sm.fontSize,
        fontWeight: foundationToken.font.weight[600],
      },
      sm: {
        fontSize: foundationToken.font.size.body.sm.fontSize,
        fontWeight: foundationToken.font.weight[600],
      },
      md: {
        fontSize: foundationToken.font.size.body.md.fontSize,
        fontWeight: foundationToken.font.weight[600],
      },
      lg: {
        fontSize: foundationToken.font.size.body.md.fontSize,
        fontWeight: foundationToken.font.weight[600],
      },
    },
    gap: {
      xs: foundationToken.unit[6],
      sm: foundationToken.unit[6],
      md: foundationToken.unit[6],
      lg: foundationToken.unit[6],
    },
    padding: {
      xs: `${foundationToken.unit[2]} ${foundationToken.unit[6]}`,
      sm: `${foundationToken.unit[3]} ${foundationToken.unit[8]}`,
      md: `${foundationToken.unit[4]} ${foundationToken.unit[10]}`,
      lg: `${foundationToken.unit[6]} ${foundationToken.unit[12]}`,
    },
    height: {
      xs: foundationToken.unit[20],
      sm: foundationToken.unit[22],
      md: foundationToken.unit[24],
      lg: foundationToken.unit[28],
    },
    slot: {
      size: {
        xs: foundationToken.unit[12],
        sm: foundationToken.unit[12],
        md: foundationToken.unit[12],
        lg: foundationToken.unit[12],
      },
    },
  };
};

export default tagTokens;
