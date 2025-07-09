import { CSSObject } from "styled-components";
import { FOUNDATION_THEME } from "../../tokens";

type SelectTokenTypes = {
  trigger: {
    container: {
      gap: CSSObject["gap"];
    };
    label: {
      color: CSSObject["color"];
      fontWeight: CSSObject["fontWeight"];
      fontSize: CSSObject["fontSize"];
    };
    selectedValue: {
      color: CSSObject["color"];
      font: {
        weight: CSSObject["fontWeight"];
        size: {
          sm: CSSObject["fontSize"];
          md: CSSObject["fontSize"];
          lg: CSSObject["fontSize"];
        };
      };
      padding: {
        sm: {
          x: CSSObject["padding"];
          y: CSSObject["padding"];
        };
        md: {
          x: CSSObject["padding"];
          y: CSSObject["padding"];
        };
        lg: {
          x: CSSObject["padding"];
          y: CSSObject["padding"];
        };
      };
    };
  };
};

const selectTokens: Readonly<SelectTokenTypes> = {
  trigger: {
    container: {
      gap: FOUNDATION_THEME.unit[8],
    },
    label: {
      color: FOUNDATION_THEME.colors.gray[700],
      fontWeight: 500,
      fontSize: 14,
    },
    selectedValue: {
      color: FOUNDATION_THEME.colors.gray[700],
      font: {
        weight: 500,
        size: {
          sm: "body.sm",
          md: "body.md",
          lg: "body.md",
        },
      },
      padding: {
        sm: {
          x: FOUNDATION_THEME.unit[14],
          y: FOUNDATION_THEME.unit[6],
        },
        md: {
          x: FOUNDATION_THEME.unit[14],
          y: FOUNDATION_THEME.unit[8],
        },
        lg: {
          x: FOUNDATION_THEME.unit[14],
          y: FOUNDATION_THEME.unit[10],
        },
      },
    },
  },
};

export default selectTokens;
