import { FOUNDATION_THEME } from "../../tokens";
import { CSSObject } from "styled-components";
import { FoundationTokenType } from "../../tokens/theme.token";

export type ModalTokensType = {
  shadow: CSSObject["boxShadow"];
  zIndex: CSSObject["zIndex"];
  borderRadius: CSSObject["borderRadius"];
  headerContainer: {
    padding: CSSObject["padding"];
    borderBottom: CSSObject["borderBottom"];
    borderTop: CSSObject["borderTop"];
    borderLeft: CSSObject["borderLeft"];
    borderRight: CSSObject["borderRight"];
    borderRadius: CSSObject["borderRadius"];
    backgroundColor: CSSObject["backgroundColor"];
    header: {
      color: CSSObject["color"];
      fontSize: CSSObject["fontSize"];
      fontWeight: CSSObject["fontWeight"];
    };
    subtitle: {
      color: CSSObject["color"];
      fontSize: CSSObject["fontSize"];
    };
  };
  bodyContainer: {
    padding: CSSObject["padding"];
    borderBottom: CSSObject["borderBottom"];
    borderTop: CSSObject["borderTop"];
    borderLeft: CSSObject["borderLeft"];
    borderRight: CSSObject["borderRight"];
    borderRadius: CSSObject["borderRadius"];
    backgroundColor: CSSObject["backgroundColor"];
  };
  footerContainer: {
    padding: CSSObject["padding"];
    borderBottom: CSSObject["borderBottom"];
    borderTop: CSSObject["borderTop"];
    borderLeft: CSSObject["borderLeft"];
    borderRight: CSSObject["borderRight"];
    borderRadius: CSSObject["borderRadius"];
    backgroundColor: CSSObject["backgroundColor"];
    alignItems: CSSObject["alignItems"];
    gap: CSSObject["gap"];
  };
};

export const modalTokens: ModalTokensType = {
  shadow: FOUNDATION_THEME.shadows.xs,
  zIndex: 9999,
  borderRadius: FOUNDATION_THEME.border.radius[12],
  headerContainer: {
    padding: FOUNDATION_THEME.unit[16],
    borderBottom: `1px solid ${FOUNDATION_THEME.colors.gray[200]}`,
    borderTop: `1px solid ${FOUNDATION_THEME.colors.gray[200]}`,
    borderLeft: `1px solid ${FOUNDATION_THEME.colors.gray[200]}`,
    borderRight: `1px solid ${FOUNDATION_THEME.colors.gray[200]}`,
    borderRadius: FOUNDATION_THEME.border.radius[12],
    backgroundColor: FOUNDATION_THEME.colors.gray[0],
    header: {
      color: FOUNDATION_THEME.colors.gray[700],
      fontSize: "14px",
      fontWeight: "600",
    },
    subtitle: {
      color: FOUNDATION_THEME.colors.gray[600],
      fontSize: "12px",
    },
  },
  bodyContainer: {
    padding: FOUNDATION_THEME.unit[16],
    borderBottom: `1px solid ${FOUNDATION_THEME.colors.gray[200]}`,
    borderTop: `1px solid ${FOUNDATION_THEME.colors.gray[200]}`,
    borderLeft: `1px solid ${FOUNDATION_THEME.colors.gray[200]}`,
    borderRight: `1px solid ${FOUNDATION_THEME.colors.gray[200]}`,
    borderRadius: FOUNDATION_THEME.border.radius[12],
    backgroundColor: FOUNDATION_THEME.colors.gray[0],
  },
  footerContainer: {
    padding: FOUNDATION_THEME.unit[16],
    borderBottom: `1px solid ${FOUNDATION_THEME.colors.gray[200]}`,
    borderTop: `1px solid ${FOUNDATION_THEME.colors.gray[200]}`,
    borderLeft: `1px solid ${FOUNDATION_THEME.colors.gray[200]}`,
    borderRight: `1px solid ${FOUNDATION_THEME.colors.gray[200]}`,
    borderRadius: `0 0 ${FOUNDATION_THEME.border.radius[12]} ${FOUNDATION_THEME.border.radius[12]}`,
    backgroundColor: FOUNDATION_THEME.colors.gray[0],
    alignItems: "flex-end",
    gap: FOUNDATION_THEME.unit[12],
  },
};

export const getModalComponentTokens = (
  foundationToken: FoundationTokenType,
): ModalTokensType => {
  return {
    shadow: foundationToken.shadows.xs,
    zIndex: 9999,
    borderRadius: foundationToken.border.radius[12],
    headerContainer: {
      padding: foundationToken.unit[16],
      borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,
      borderTop: `1px solid ${foundationToken.colors.gray[200]}`,
      borderLeft: `1px solid ${foundationToken.colors.gray[200]}`,
      borderRight: `1px solid ${foundationToken.colors.gray[200]}`,
      borderRadius: foundationToken.border.radius[12],
      backgroundColor: foundationToken.colors.gray[0],
      header: {
        color: foundationToken.colors.gray[700],
        fontSize: "14px",
        fontWeight: "600",
      },
      subtitle: {
        color: foundationToken.colors.gray[600],
        fontSize: "12px",
      },
    },
    bodyContainer: {
      padding: foundationToken.unit[16],
      borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,
      borderTop: `1px solid ${foundationToken.colors.gray[200]}`,
      borderLeft: `1px solid ${foundationToken.colors.gray[200]}`,
      borderRight: `1px solid ${foundationToken.colors.gray[200]}`,
      borderRadius: foundationToken.border.radius[12],
      backgroundColor: foundationToken.colors.gray[0],
    },
    footerContainer: {
      padding: foundationToken.unit[16],
      borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,
      borderTop: `1px solid ${foundationToken.colors.gray[200]}`,
      borderLeft: `1px solid ${foundationToken.colors.gray[200]}`,
      borderRight: `1px solid ${foundationToken.colors.gray[200]}`,
      borderRadius: `0 0 ${foundationToken.border.radius[12]} ${foundationToken.border.radius[12]}`,
      backgroundColor: foundationToken.colors.gray[0],
      alignItems: "flex-end",
      gap: foundationToken.unit[12],
    },
  };
};

export default modalTokens;
