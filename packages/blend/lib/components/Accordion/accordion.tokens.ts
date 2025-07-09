import { CSSObject } from "styled-components";
import { AccordionType } from "./types";
import { FoundationTokenType } from "../../tokens/theme.token";

export type AccordionState =
  | "default"
  | "hover"
  | "active"
  | "disabled"
  | "open"
  | "closed";

export type AccordionTokenType = {
  gap: {
    [key in AccordionType]: CSSObject["gap"];
  };
  borderRadius: {
    [key in AccordionType]: CSSObject["borderRadius"];
  };

  item: {
    trigger: {
      border: {
        [key in AccordionType]: {
          [key in AccordionState]?: CSSObject["border"];
        };
      };
      padding: {
        [key in AccordionType]: CSSObject["padding"];
      };
      backgroundColor: {
        [key in AccordionType]: {
          [key in AccordionState]?: CSSObject["backgroundColor"];
        };
      };
      title: {
        fontSize: CSSObject["fontSize"];
        fontWeight: CSSObject["fontWeight"];
        color: {
          [key in AccordionState]?: CSSObject["color"];
        };
      };
      subtext: {
        fontSize: CSSObject["fontSize"];
        gap: CSSObject["gap"];
        color: {
          [key in AccordionState]?: CSSObject["color"];
        };
      };
    };
    separator: {
      color: {
        [key in AccordionType]: CSSObject["color"];
      };
    };
  };
};

export const getAccordionToken = (
  foundationToken: FoundationTokenType,
): AccordionTokenType => {
  return {
    gap: {
      [AccordionType.BORDER]: foundationToken.unit[24],
      [AccordionType.NO_BORDER]: foundationToken.unit[8],
    },
    borderRadius: {
      [AccordionType.BORDER]: foundationToken.border.radius[8],
      [AccordionType.NO_BORDER]: foundationToken.border.radius[8],
    },

    item: {
      trigger: {
        border: {
          [AccordionType.BORDER]: {
            default: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
          },
          [AccordionType.NO_BORDER]: {
            default: "none",
          },
        },
        padding: {
          [AccordionType.BORDER]: `${foundationToken.unit[16]} ${foundationToken.unit[16]}`,
          [AccordionType.NO_BORDER]: `${foundationToken.unit[16]} ${foundationToken.unit[12]}`,
        },
        backgroundColor: {
          [AccordionType.BORDER]: {
            default: "transparent",
            hover: foundationToken.colors.gray[50],
            active: foundationToken.colors.gray[50],
            disabled: foundationToken.colors.gray[50],
            open: foundationToken.colors.gray[50],
          },
          [AccordionType.NO_BORDER]: {
            default: "transparent",
            hover: foundationToken.colors.gray[50],
            active: foundationToken.colors.gray[50],
            disabled: foundationToken.colors.gray[50],
            open: "transparent",
          },
        },
        title: {
          fontSize: foundationToken.font.size.body.md.fontSize,
          fontWeight: foundationToken.font.weight[600],
          color: {
            default: foundationToken.colors.gray[800],
            disabled: foundationToken.colors.gray[500],
          },
        },
        subtext: {
          fontSize: foundationToken.font.size.body.md.fontSize,
          gap: foundationToken.unit[4],
          color: {
            default: foundationToken.colors.gray[600],
            disabled: foundationToken.colors.gray[300],
          },
        },
      },
      separator: {
        color: {
          [AccordionType.BORDER]: foundationToken.colors.gray[200],
          [AccordionType.NO_BORDER]: foundationToken.colors.gray[200],
        },
      },
    },
  };
};
