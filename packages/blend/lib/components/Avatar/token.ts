import { foundationToken } from "../../foundationToken";

const avatarTokens = {
  container: {
    background: {
      default: foundationToken.colors.gray[100],
    },
    border: {
      withImage: foundationToken.colors.gray[0],
      withoutImage: foundationToken.colors.gray[200],
    },
  },
  text: {
    color: {
      default: foundationToken.colors.gray[900],
    },
  },
  indicator: {
    background: {
      default: foundationToken.colors.green[400],
    },
    ring: {
      color: foundationToken.colors.gray[0],
    },
  },
  sizes: {
    sm: {
      width: foundationToken.spacing[24],
      height: foundationToken.spacing[24],
      fontSize: foundationToken.fontSize.bodySM,
      fontWeight: foundationToken.fontWeight[500],
      indicatorSize: "9px",
      indicatorRingWidth: "2px",
      indicatorOffset: "-2px",
    },
    md: {
      width: foundationToken.spacing[32],
      height: foundationToken.spacing[32],
      fontSize: foundationToken.fontSize.bodyMD,
      fontWeight: foundationToken.fontWeight[500],
      indicatorSize: "11px",
      indicatorRingWidth: "2px",
      indicatorOffset: "-2px",
    },
    lg: {
      width: foundationToken.spacing[40],
      height: foundationToken.spacing[40],
      fontSize: foundationToken.fontSize.bodyLG,
      fontWeight: foundationToken.fontWeight[500],
      indicatorSize: "13px",
      indicatorRingWidth: "2px",
      indicatorOffset: "-2px",
    },
    xl: {
      width: foundationToken.spacing[48],
      height: foundationToken.spacing[48],
      fontSize: foundationToken.fontSize.headingSM,
      fontWeight: foundationToken.fontWeight[600],
      indicatorSize: "15px",
      indicatorRingWidth: "2.5px",
      indicatorOffset: "-2px",
    },
  },
  shapes: {
    circular: {
      borderRadius: foundationToken.borderRadius.full,
    },
    rounded: {
      borderRadius: foundationToken.borderRadius[8],
    },
  },
};

export default avatarTokens;
