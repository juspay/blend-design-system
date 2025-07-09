import { FOUNDATION_THEME } from "../../tokens";
import { CSSObject } from "styled-components";
import { TooltipSize } from "./types";
import { VariantType } from "../Text/Text";
import { FoundationTokenType } from "../../tokens/theme.token";

export type TooltipTokensType = {
  background: CSSObject["backgroundColor"];
  color: CSSObject["color"];
  fontWeight: {
    [key in TooltipSize]: CSSObject["fontWeight"];
  };
  borderRadius: {
    [key in TooltipSize]: CSSObject["borderRadius"];
  };
  maxWidth: {
    [key in TooltipSize]: CSSObject["maxWidth"];
  };
  padding: {
    [key in TooltipSize]: CSSObject["padding"];
  };
  fontSize: {
    [key in TooltipSize]: VariantType;
  };
  gap: {
    [key in TooltipSize]: CSSObject["gap"];
  };
};

const tooltipTokens: TooltipTokensType = {
  fontWeight: {
    sm: FOUNDATION_THEME.font.weight[500],
    lg: FOUNDATION_THEME.font.weight[500],
  },
  background: FOUNDATION_THEME.colors.gray[900],
  color: FOUNDATION_THEME.colors.gray[0],
  borderRadius: {
    sm: FOUNDATION_THEME.border.radius[6],
    lg: FOUNDATION_THEME.border.radius[8],
  },
  maxWidth: {
    sm: "320px",
    lg: "384px",
  },
  padding: {
    sm: `${FOUNDATION_THEME.unit[4]} ${FOUNDATION_THEME.unit[6]}`,
    lg: `${FOUNDATION_THEME.unit[6]} ${FOUNDATION_THEME.unit[8]}`,
  },
  fontSize: {
    sm: "body.xs",
    lg: "body.sm",
  },
  gap: {
    sm: FOUNDATION_THEME.unit[4],
    lg: FOUNDATION_THEME.unit[6],
  },
};

export const getTooltipTokens = (
  foundationToken: FoundationTokenType,
): TooltipTokensType => {
  return {
    fontWeight: {
      sm: foundationToken.font.weight[500],
      lg: foundationToken.font.weight[500],
    },
    background: foundationToken.colors.gray[900],
    color: foundationToken.colors.gray[0],
    borderRadius: {
      sm: foundationToken.border.radius[6],
      lg: foundationToken.border.radius[8],
    },
    maxWidth: {
      sm: "320px",
      lg: "384px",
    },
    padding: {
      sm: `${foundationToken.unit[4]} ${foundationToken.unit[6]}`,
      lg: `${foundationToken.unit[6]} ${foundationToken.unit[8]}`,
    },
    fontSize: {
      sm: "body.xs",
      lg: "body.sm",
    },
    gap: {
      sm: foundationToken.unit[4],
      lg: foundationToken.unit[6],
    },
  };
};

// type TooltipToken = {
//   background: {
//     color: CSSObject["backgroundColor"];
//   };
//   color: {
//     text: CSSObject["color"];
//   };
//   border: {
//     radius: {
//       sm: CSSObject["borderRadius"];
//       lg: CSSObject["borderRadius"];
//     };
//   };
//   maxWidth: {
//     sm: CSSObject["maxWidth"];
//     lg: CSSObject["maxWidth"];
//   };
//   padding: {
//     sm: CSSObject["padding"];
//     lg: CSSObject["padding"];
//   };
//   font: {
//     size: {
//       sm: VariantType;
//       lg: VariantType;
//     };
//   };
//   size: {
//     sm: CSSObject["width"] | CSSObject["height"];
//     lg: CSSObject["width"] | CSSObject["height"];
//   };
// };

// const tooltipTokens: TooltipToken = {
//   background: {
//     color: FOUNDATION_THEME.colors.gray[900],
//   },
//   color: {
//     text: FOUNDATION_THEME.colors.gray[0],
//   },
//   border: {
//     radius: {
//       sm: FOUNDATION_THEME.border.radius[6],
//       lg: FOUNDATION_THEME.border.radius[8],
//     },
//   },
//   maxWidth: {
//     sm: "320px",
//     lg: "384px",
//   },
//   padding: {
//     sm: `${FOUNDATION_THEME.unit[4]} ${FOUNDATION_THEME.unit[6]}`,
//     lg: `${FOUNDATION_THEME.unit[6]} ${FOUNDATION_THEME.unit[8]}`,
//   },
//   font: {
//     size: {
//       sm: "body.xs",
//       lg: "body.sm",
//     },
//   },
//   size: {
//     sm: FOUNDATION_THEME.unit[14],
//     lg: FOUNDATION_THEME.unit[18],
//   },
// };

export default tooltipTokens;
