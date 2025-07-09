import { foundationToken } from "../../foundationToken";

const buttonTokens = {
  background: {
    primary: {
      default: `linear-gradient(180deg, ${foundationToken.colors.primary[600]} -5%, ${foundationToken.colors.primary[500]} 107.5%)`,
      hover: foundationToken.colors.primary[500],
      active: foundationToken.colors.primary[600],
      disabled: foundationToken.colors.primary[300],
    },
    secondary: {
      default: foundationToken.colors.gray[0],
      hover: foundationToken.colors.gray[100],
      active: foundationToken.colors.gray[25],
      disabled: foundationToken.colors.gray[150],
    },
    danger: {
      default: `linear-gradient(180deg, ${foundationToken.colors.red[600]} 0%, ${foundationToken.colors.red[500]} 93.75%)`,
      hover: foundationToken.colors.red[500],
      active: foundationToken.colors.red[600],
      disabled: foundationToken.colors.red[300],
    },
    success: {
      default: `linear-gradient(180deg, ${foundationToken.colors.green[600]} 0%, ${foundationToken.colors.green[500]} 100%)`,
      hover: foundationToken.colors.green[500],
      active: foundationToken.colors.green[600],
      disabled: foundationToken.colors.green[200],
    },
    plainIcon: {
      hover: foundationToken.colors.gray[100],
      active: foundationToken.colors.gray[150],
    },
  },
  text: {
    primary: {
      default: foundationToken.colors.gray[0],
      hover: foundationToken.colors.gray[0],
      disabled: foundationToken.colors.gray[0],
    },
    secondary: {
      default: foundationToken.colors.gray[600],
      hover: foundationToken.colors.gray[600],
      disabled: foundationToken.colors.gray[600],
    },
    danger: {
      default: foundationToken.colors.gray[0],
      hover: foundationToken.colors.gray[0],
      disabled: foundationToken.colors.gray[0],
    },
    success: {
      default: foundationToken.colors.gray[0],
      hover: foundationToken.colors.gray[0],
      disabled: foundationToken.colors.gray[0],
    },
  },
  border: {
    primary: {
      default: foundationToken.colors.primary[600],
      hover: foundationToken.colors.primary[500],
      active: foundationToken.colors.primary[500],
      disabled: foundationToken.colors.primary[300],
    },
    secondary: {
      default: foundationToken.colors.gray[200],
      hover: foundationToken.colors.gray[150],
      active: foundationToken.colors.gray[200],
      disabled: foundationToken.colors.gray[200],
    },
    danger: {
      default: foundationToken.colors.red[600],
      hover: foundationToken.colors.red[500],
      active: foundationToken.colors.red[600],
      disabled: foundationToken.colors.red[300],
    },
    success: {
      default: foundationToken.colors.green[600],
      hover: foundationToken.colors.green[500],
      active: foundationToken.colors.green[500],
      disabled: foundationToken.colors.green[300],
    },
  },
  boxShadow: {
    primary: {
      active: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
      focused: `0px 0px 0px 3px ${foundationToken.colors.primary[200]}`,
    },
    secondary: {
      active: "0px 4px 4px 0px rgba(0, 0, 0, 0.10) inset",
      focused: `0px 0px 0px 3px ${foundationToken.colors.gray[100]}`,
    },
    danger: {
      active: "0px 4px 4px 0px rgba(0, 0, 0, 0.12) inset",
      focused: `0px 0px 0px 3px ${foundationToken.colors.red[200]}`,
    },
    success: {
      active: "0px 4px 4px 0px rgba(0, 0, 0, 0.12) inset",
      focused: "0px 0px 0px 3px #BCF5D1",
    },
  },
  link: {
    primary: foundationToken.colors.primary[500],
    secondary: foundationToken.colors.gray[600],
    danger: foundationToken.colors.red[500],
    success: foundationToken.colors.green[500],
    active: {
      primary: foundationToken.colors.primary[700],
      secondary: foundationToken.colors.gray[900],
      danger: foundationToken.colors.red[700],
      success: foundationToken.colors.green[700],
    },
  },
  outline: {
    primary: foundationToken.colors.primary[300],
    secondary: foundationToken.colors.gray[300],
    danger: foundationToken.colors.red[300],
    success: foundationToken.colors.green[300],
  },
  transition: {
    duration: "180ms",
    timing: "ease",
  },
  opacity: {
    disabled: foundationToken.opacity[70],
  },
  plainIcon: {
    background: "transparent",
  },
};

export default buttonTokens;
