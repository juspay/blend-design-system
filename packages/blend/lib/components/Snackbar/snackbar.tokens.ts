import { CSSObject } from "styled-components";
import { FOUNDATION_THEME } from "../../tokens";
import { VariantType } from "../Text/Text";

export type SnackbarTokens = Readonly<{
  icon: {
    color: {
      info: CSSObject["color"];
      success: CSSObject["color"];
      warning: CSSObject["color"];
      error: CSSObject["color"];
    };
  };
  container: {
    backgroundColor: CSSObject["color"];
    borderRadius: CSSObject["borderRadius"];
    padding: CSSObject["padding"];
    minWidth: CSSObject["minWidth"];
    maxWidth: CSSObject["maxWidth"];
    boxShadow: CSSObject["boxShadow"];
  };
  header: {
    layout: {
      gap: CSSObject["gap"];
      marginBottom: CSSObject["marginBottom"];
      iconGap: CSSObject["gap"];
    };
    text: {
      color: CSSObject["color"];
      variant: VariantType;
    };
  };
  description: {
    layout: {
      paddingLeft: CSSObject["paddingLeft"];
      gap: CSSObject["gap"];
    };
    text: {
      color: CSSObject["color"];
      variant: VariantType;
    };
  };
  actionButton: {
    layout: {
      paddingX: CSSObject["padding"];
    };
    text: {
      color: CSSObject["color"];
      variant: VariantType;
    };
  };
}>;

const snackbarTokens: SnackbarTokens = {
  icon: {
    color: {
      info: FOUNDATION_THEME.colors.primary[300],
      success: FOUNDATION_THEME.colors.green[500],
      warning: FOUNDATION_THEME.colors.yellow[500],
      error: FOUNDATION_THEME.colors.red[500],
    },
  },
  container: {
    backgroundColor: FOUNDATION_THEME.colors.gray[900],
    borderRadius: FOUNDATION_THEME.border.radius[8],
    padding: FOUNDATION_THEME.unit[16],
    minWidth: 400,
    maxWidth: 500,
    boxShadow: FOUNDATION_THEME.shadows.lg,
  },
  header: {
    layout: {
      gap: FOUNDATION_THEME.unit[8],
      marginBottom: FOUNDATION_THEME.unit[8],
      iconGap: FOUNDATION_THEME.unit[8],
    },
    text: {
      color: FOUNDATION_THEME.colors.gray[0],
      variant: "body.md",
    },
  },
  description: {
    layout: {
      paddingLeft: FOUNDATION_THEME.unit[24],
      gap: FOUNDATION_THEME.unit[18],
    },
    text: {
      color: FOUNDATION_THEME.colors.gray[300],
      variant: "body.md",
    },
  },
  actionButton: {
    layout: {
      paddingX: FOUNDATION_THEME.unit[2],
    },
    text: {
      color: FOUNDATION_THEME.colors.gray[100],
      variant: "body.md",
    },
  },
};

export default snackbarTokens;
