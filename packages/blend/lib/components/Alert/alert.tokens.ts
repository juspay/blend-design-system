import { FOUNDATION_THEME } from "../../tokens";
import { CSSObject } from "styled-components";
import { AlertStyle, AlertVariant } from "./types";
import { FoundationTokenType } from "../../tokens/theme.token";

export type AlertTokenType = {
  padding: CSSObject["padding"];
  borderRadius: CSSObject["borderRadius"];
  background: {
    [key in AlertVariant]: {
      [key in AlertStyle]: CSSObject["color"];
    };
  };
  border: {
    [key in AlertVariant]: CSSObject["color"];
  };
  button: {
    [key in AlertVariant]: CSSObject["color"];
  };
};

const alertTokens: AlertTokenType = {
  padding: FOUNDATION_THEME.unit[16],
  borderRadius: FOUNDATION_THEME.border.radius[8],
  background: {
    primary: {
      subtle: FOUNDATION_THEME.colors.primary[50],
      noFill: FOUNDATION_THEME.colors.gray[0],
    },
    warning: {
      subtle: FOUNDATION_THEME.colors.yellow[50],
      noFill: FOUNDATION_THEME.colors.gray[0],
    },
    success: {
      subtle: FOUNDATION_THEME.colors.green[50],
      noFill: FOUNDATION_THEME.colors.gray[0],
    },
    purple: {
      subtle: FOUNDATION_THEME.colors.purple[50],
      noFill: FOUNDATION_THEME.colors.gray[0],
    },
    neutral: {
      subtle: FOUNDATION_THEME.colors.gray[50],
      noFill: FOUNDATION_THEME.colors.gray[0],
    },
    error: {
      subtle: FOUNDATION_THEME.colors.red[50],
      noFill: FOUNDATION_THEME.colors.gray[0],
    },
    orange: {
      subtle: FOUNDATION_THEME.colors.orange[50],
      noFill: FOUNDATION_THEME.colors.gray[0],
    },
  },
  border: {
    primary: `1px solid ${FOUNDATION_THEME.colors.primary[500]}`,
    warning: `1px solid ${FOUNDATION_THEME.colors.yellow[500]}`,
    success: `1px solid ${FOUNDATION_THEME.colors.green[500]}`,
    purple: `1px solid ${FOUNDATION_THEME.colors.purple[500]}`,
    neutral: `1px solid ${FOUNDATION_THEME.colors.gray[500]}`,
    error: `1px solid ${FOUNDATION_THEME.colors.red[500]}`,
    orange: `1px solid ${FOUNDATION_THEME.colors.orange[500]}`,
  },
  button: {
    primary: FOUNDATION_THEME.colors.primary[700],
    warning: FOUNDATION_THEME.colors.yellow[700],
    success: FOUNDATION_THEME.colors.green[700],
    purple: FOUNDATION_THEME.colors.purple[700],
    neutral: FOUNDATION_THEME.colors.gray[700],
    error: FOUNDATION_THEME.colors.red[700],
    orange: FOUNDATION_THEME.colors.orange[700],
  },
};

export const getAlertTokens = (
  foundationToken: FoundationTokenType,
): AlertTokenType => {
  return {
    padding: foundationToken.unit[16],
    borderRadius: foundationToken.border.radius[8],
    background: {
      primary: {
        subtle: foundationToken.colors.primary[50],
        noFill: foundationToken.colors.gray[0],
      },
      warning: {
        subtle: foundationToken.colors.yellow[50],
        noFill: foundationToken.colors.gray[0],
      },
      success: {
        subtle: foundationToken.colors.green[50],
        noFill: foundationToken.colors.gray[0],
      },
      purple: {
        subtle: foundationToken.colors.purple[50],
        noFill: foundationToken.colors.gray[0],
      },
      neutral: {
        subtle: foundationToken.colors.gray[50],
        noFill: foundationToken.colors.gray[0],
      },
      error: {
        subtle: foundationToken.colors.red[50],
        noFill: foundationToken.colors.gray[0],
      },
      orange: {
        subtle: foundationToken.colors.orange[50],
        noFill: foundationToken.colors.gray[0],
      },
    },
    border: {
      primary: `1px solid ${foundationToken.colors.primary[500]}`,
      warning: `1px solid ${foundationToken.colors.yellow[500]}`,
      success: `1px solid ${foundationToken.colors.green[500]}`,
      purple: `1px solid ${foundationToken.colors.purple[500]}`,
      neutral: `1px solid ${foundationToken.colors.gray[500]}`,
      error: `1px solid ${foundationToken.colors.red[500]}`,
      orange: `1px solid ${foundationToken.colors.orange[500]}`,
    },
    button: {
      primary: foundationToken.colors.primary[700],
      warning: foundationToken.colors.yellow[700],
      success: foundationToken.colors.green[700],
      purple: foundationToken.colors.purple[700],
      neutral: foundationToken.colors.gray[700],
      error: foundationToken.colors.red[700],
      orange: foundationToken.colors.orange[700],
    },
  };
};

export default alertTokens;
