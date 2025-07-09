import { CSSObject } from "styled-components";
import { FOUNDATION_THEME } from "../../tokens";
import { MenuItemV2ActionType, MenuItemV2Variant } from "./types";
import { FoundationTokenType } from "../../tokens/theme.token";

export type MenuItemStates =
  | "default"
  | "hover"
  | "active"
  | "focus"
  | "focusVisible"
  | "disabled";

export type MenuTokensType = {
  shadow: CSSObject["boxShadow"];
  backgroundColor: CSSObject["backgroundColor"];
  paddingTop: CSSObject["paddingTop"];
  paddingBottom: CSSObject["paddingBottom"];
  border: CSSObject["border"];
  outline: CSSObject["outline"];
  borderRadius: CSSObject["borderRadius"];
  item: {
    padding: CSSObject["padding"];
    margin: CSSObject["margin"];
    borderRadius: CSSObject["borderRadius"];
    backgroundColor: {
      [MenuItemV2Variant.DEFAULT]: {
        enabled: {
          [key in MenuItemStates]: CSSObject["backgroundColor"];
        };
        disabled: {
          [key in MenuItemStates]: CSSObject["backgroundColor"];
        };
      };
      [MenuItemV2Variant.ACTION]: {
        [key in MenuItemV2ActionType]: {
          enabled: {
            [key in MenuItemStates]: CSSObject["backgroundColor"];
          };
          disabled: {
            [key in MenuItemStates]: CSSObject["backgroundColor"];
          };
        };
      };
    };
    cursor: CSSObject["cursor"];
    gap: CSSObject["gap"];
    label: {
      fontSize: CSSObject["fontSize"];
      fontWeight: CSSObject["fontWeight"];
      color: {
        [MenuItemV2Variant.DEFAULT]: {
          enabled: {
            [key in MenuItemStates]: CSSObject["color"];
          };
          disabled: {
            [key in MenuItemStates]: CSSObject["color"];
          };
        };
        [MenuItemV2Variant.ACTION]: {
          [key in MenuItemV2ActionType]: {
            enabled: {
              [key in MenuItemStates]: CSSObject["color"];
            };
            disabled: {
              [key in MenuItemStates]: CSSObject["color"];
            };
          };
        };
      };
    };
    subLabel: {
      fontSize: CSSObject["fontSize"];
      fontWeight: CSSObject["fontWeight"];
      color: {
        [MenuItemV2Variant.DEFAULT]: {
          enabled: {
            [key in MenuItemStates]: CSSObject["color"];
          };
          disabled: {
            [key in MenuItemStates]: CSSObject["color"];
          };
        };
        [MenuItemV2Variant.ACTION]: {
          [key in MenuItemV2ActionType]: {
            enabled: {
              [key in MenuItemStates]: CSSObject["color"];
            };
            disabled: {
              [key in MenuItemStates]: CSSObject["color"];
            };
          };
        };
      };
    };
  };
  seperator: {
    color: CSSObject["color"];
    height: CSSObject["height"];
    margin: CSSObject["margin"];
  };
};

const menuTokens: MenuTokensType = {
  shadow: FOUNDATION_THEME.shadows.md,
  backgroundColor: FOUNDATION_THEME.colors.gray[0],
  paddingTop: FOUNDATION_THEME.unit[6],
  paddingBottom: FOUNDATION_THEME.unit[6],
  border: `1px solid ${FOUNDATION_THEME.colors.gray[200]}`,
  outline: "none",
  borderRadius: FOUNDATION_THEME.unit[8],
  item: {
    padding: FOUNDATION_THEME.unit[6],
    margin: `${FOUNDATION_THEME.unit[0]} ${FOUNDATION_THEME.unit[6]}`,
    borderRadius: FOUNDATION_THEME.unit[4],
    cursor: "pointer",
    backgroundColor: {
      default: {
        enabled: {
          default: FOUNDATION_THEME.colors.gray[0],
          hover: FOUNDATION_THEME.colors.gray[50],
          active: FOUNDATION_THEME.colors.gray[50],
          focus: FOUNDATION_THEME.colors.gray[50],
          focusVisible: FOUNDATION_THEME.colors.gray[50],
          disabled: FOUNDATION_THEME.colors.gray[0],
        },
        disabled: {
          default: FOUNDATION_THEME.colors.gray[0],
          hover: FOUNDATION_THEME.colors.gray[0],
          active: FOUNDATION_THEME.colors.gray[0],
          focus: FOUNDATION_THEME.colors.gray[0],
          focusVisible: FOUNDATION_THEME.colors.gray[0],
          disabled: FOUNDATION_THEME.colors.gray[0],
        },
      },
      action: {
        primary: {
          enabled: {
            default: FOUNDATION_THEME.colors.primary[0],
            hover: FOUNDATION_THEME.colors.primary[50],
            active: FOUNDATION_THEME.colors.primary[50],
            focus: FOUNDATION_THEME.colors.primary[50],
            focusVisible: FOUNDATION_THEME.colors.primary[50],
            disabled: FOUNDATION_THEME.colors.gray[0],
          },
          disabled: {
            default: FOUNDATION_THEME.colors.gray[0],
            hover: FOUNDATION_THEME.colors.gray[0],
            active: FOUNDATION_THEME.colors.gray[0],
            focus: FOUNDATION_THEME.colors.gray[0],
            focusVisible: FOUNDATION_THEME.colors.gray[0],
            disabled: FOUNDATION_THEME.colors.gray[0],
          },
        },
        danger: {
          enabled: {
            default: FOUNDATION_THEME.colors.red[0],
            hover: FOUNDATION_THEME.colors.red[50],
            active: FOUNDATION_THEME.colors.red[50],
            focus: FOUNDATION_THEME.colors.red[50],
            focusVisible: FOUNDATION_THEME.colors.red[50],
            disabled: FOUNDATION_THEME.colors.gray[0],
          },
          disabled: {
            default: FOUNDATION_THEME.colors.gray[0],
            hover: FOUNDATION_THEME.colors.gray[0],
            active: FOUNDATION_THEME.colors.gray[0],
            focus: FOUNDATION_THEME.colors.gray[0],
            focusVisible: FOUNDATION_THEME.colors.gray[0],
            disabled: FOUNDATION_THEME.colors.gray[0],
          },
        },
      },
    },
    gap: 4,
    label: {
      fontSize: 14,
      fontWeight: 500,
      color: {
        default: {
          enabled: {
            default: FOUNDATION_THEME.colors.gray[600],
            hover: FOUNDATION_THEME.colors.gray[600],
            active: FOUNDATION_THEME.colors.gray[600],
            focus: FOUNDATION_THEME.colors.gray[600],
            focusVisible: FOUNDATION_THEME.colors.gray[600],
            disabled: FOUNDATION_THEME.colors.gray[400],
          },
          disabled: {
            default: FOUNDATION_THEME.colors.gray[400],
            hover: FOUNDATION_THEME.colors.gray[400],
            active: FOUNDATION_THEME.colors.gray[400],
            focus: FOUNDATION_THEME.colors.gray[400],
            focusVisible: FOUNDATION_THEME.colors.gray[400],
            disabled: FOUNDATION_THEME.colors.gray[400],
          },
        },
        action: {
          primary: {
            enabled: {
              default: FOUNDATION_THEME.colors.primary[600],
              hover: FOUNDATION_THEME.colors.primary[600],
              active: FOUNDATION_THEME.colors.primary[600],
              focus: FOUNDATION_THEME.colors.primary[600],
              focusVisible: FOUNDATION_THEME.colors.primary[600],
              disabled: FOUNDATION_THEME.colors.gray[400],
            },
            disabled: {
              default: FOUNDATION_THEME.colors.primary[400],
              hover: FOUNDATION_THEME.colors.primary[400],
              active: FOUNDATION_THEME.colors.primary[400],
              focus: FOUNDATION_THEME.colors.primary[400],
              focusVisible: FOUNDATION_THEME.colors.primary[400],
              disabled: FOUNDATION_THEME.colors.primary[400],
            },
          },
          danger: {
            enabled: {
              default: FOUNDATION_THEME.colors.red[600],
              hover: FOUNDATION_THEME.colors.red[600],
              active: FOUNDATION_THEME.colors.red[600],
              focus: FOUNDATION_THEME.colors.red[600],
              focusVisible: FOUNDATION_THEME.colors.red[600],
              disabled: FOUNDATION_THEME.colors.red[400],
            },
            disabled: {
              default: FOUNDATION_THEME.colors.red[400],
              hover: FOUNDATION_THEME.colors.red[400],
              active: FOUNDATION_THEME.colors.red[400],
              focus: FOUNDATION_THEME.colors.red[400],
              focusVisible: FOUNDATION_THEME.colors.red[400],
              disabled: FOUNDATION_THEME.colors.red[400],
            },
          },
        },
      },
    },
    subLabel: {
      fontSize: 12,
      fontWeight: 400,
      color: {
        default: {
          enabled: {
            default: FOUNDATION_THEME.colors.gray[400],
            hover: FOUNDATION_THEME.colors.gray[400],
            active: FOUNDATION_THEME.colors.gray[400],
            focus: FOUNDATION_THEME.colors.gray[400],
            focusVisible: FOUNDATION_THEME.colors.gray[400],
            disabled: FOUNDATION_THEME.colors.gray[400],
          },
          disabled: {
            default: FOUNDATION_THEME.colors.gray[400],
            hover: FOUNDATION_THEME.colors.gray[400],
            active: FOUNDATION_THEME.colors.gray[400],
            focus: FOUNDATION_THEME.colors.gray[400],
            focusVisible: FOUNDATION_THEME.colors.gray[400],
            disabled: FOUNDATION_THEME.colors.gray[400],
          },
        },
        action: {
          primary: {
            enabled: {
              default: FOUNDATION_THEME.colors.primary[400],
              hover: FOUNDATION_THEME.colors.primary[400],
              active: FOUNDATION_THEME.colors.primary[400],
              focus: FOUNDATION_THEME.colors.primary[400],
              focusVisible: FOUNDATION_THEME.colors.primary[400],
              disabled: FOUNDATION_THEME.colors.gray[400],
            },
            disabled: {
              default: FOUNDATION_THEME.colors.primary[400],
              hover: FOUNDATION_THEME.colors.primary[400],
              active: FOUNDATION_THEME.colors.primary[400],
              focus: FOUNDATION_THEME.colors.primary[400],
              focusVisible: FOUNDATION_THEME.colors.primary[400],
              disabled: FOUNDATION_THEME.colors.primary[400],
            },
          },
          danger: {
            enabled: {
              default: FOUNDATION_THEME.colors.red[400],
              hover: FOUNDATION_THEME.colors.red[400],
              active: FOUNDATION_THEME.colors.red[400],
              focus: FOUNDATION_THEME.colors.red[400],
              focusVisible: FOUNDATION_THEME.colors.red[400],
              disabled: FOUNDATION_THEME.colors.red[400],
            },
            disabled: {
              default: FOUNDATION_THEME.colors.red[400],
              hover: FOUNDATION_THEME.colors.red[400],
              active: FOUNDATION_THEME.colors.red[400],
              focus: FOUNDATION_THEME.colors.red[400],
              focusVisible: FOUNDATION_THEME.colors.red[400],
              disabled: FOUNDATION_THEME.colors.red[400],
            },
          },
        },
      },
    },
  },
  seperator: {
    color: FOUNDATION_THEME.colors.gray[200],
    height: 1,
    margin: `${FOUNDATION_THEME.unit[6]} 0`,
  },
};

export const getMenuTokens = (
  foundationToken: FoundationTokenType,
): MenuTokensType => {
  return {
    shadow: foundationToken.shadows.md,
    backgroundColor: foundationToken.colors.gray[0],
    paddingTop: foundationToken.unit[6],
    paddingBottom: foundationToken.unit[6],
    border: `1px solid ${foundationToken.colors.gray[200]}`,
    outline: "none",
    borderRadius: foundationToken.unit[8],
    item: {
      padding: foundationToken.unit[6],
      margin: `${foundationToken.unit[0]} ${foundationToken.unit[6]}`,
      borderRadius: foundationToken.unit[4],
      cursor: "pointer",
      backgroundColor: {
        default: {
          enabled: {
            default: foundationToken.colors.gray[0],
            hover: foundationToken.colors.gray[50],
            active: foundationToken.colors.gray[50],
            focus: foundationToken.colors.gray[50],
            focusVisible: foundationToken.colors.gray[50],
            disabled: foundationToken.colors.gray[0],
          },
          disabled: {
            default: foundationToken.colors.gray[0],
            hover: foundationToken.colors.gray[0],
            active: foundationToken.colors.gray[0],
            focus: foundationToken.colors.gray[0],
            focusVisible: foundationToken.colors.gray[0],
            disabled: foundationToken.colors.gray[0],
          },
        },
        action: {
          primary: {
            enabled: {
              default: foundationToken.colors.primary[0],
              hover: foundationToken.colors.primary[50],
              active: foundationToken.colors.primary[50],
              focus: foundationToken.colors.primary[50],
              focusVisible: foundationToken.colors.primary[50],
              disabled: foundationToken.colors.gray[0],
            },
            disabled: {
              default: foundationToken.colors.gray[0],
              hover: foundationToken.colors.gray[0],
              active: foundationToken.colors.gray[0],
              focus: foundationToken.colors.gray[0],
              focusVisible: foundationToken.colors.gray[0],
              disabled: foundationToken.colors.gray[0],
            },
          },
          danger: {
            enabled: {
              default: foundationToken.colors.red[0],
              hover: foundationToken.colors.red[50],
              active: foundationToken.colors.red[50],
              focus: foundationToken.colors.red[50],
              focusVisible: foundationToken.colors.red[50],
              disabled: foundationToken.colors.gray[0],
            },
            disabled: {
              default: foundationToken.colors.gray[0],
              hover: foundationToken.colors.gray[0],
              active: foundationToken.colors.gray[0],
              focus: foundationToken.colors.gray[0],
              focusVisible: foundationToken.colors.gray[0],
              disabled: foundationToken.colors.gray[0],
            },
          },
        },
      },
      gap: 4,
      label: {
        fontSize: 14,
        fontWeight: 500,
        color: {
          default: {
            enabled: {
              default: foundationToken.colors.gray[600],
              hover: foundationToken.colors.gray[600],
              active: foundationToken.colors.gray[600],
              focus: foundationToken.colors.gray[600],
              focusVisible: foundationToken.colors.gray[600],
              disabled: foundationToken.colors.gray[400],
            },
            disabled: {
              default: foundationToken.colors.gray[400],
              hover: foundationToken.colors.gray[400],
              active: foundationToken.colors.gray[400],
              focus: foundationToken.colors.gray[400],
              focusVisible: foundationToken.colors.gray[400],
              disabled: foundationToken.colors.gray[400],
            },
          },
          action: {
            primary: {
              enabled: {
                default: foundationToken.colors.primary[600],
                hover: foundationToken.colors.primary[600],
                active: foundationToken.colors.primary[600],
                focus: foundationToken.colors.primary[600],
                focusVisible: foundationToken.colors.primary[600],
                disabled: foundationToken.colors.gray[400],
              },
              disabled: {
                default: foundationToken.colors.primary[400],
                hover: foundationToken.colors.primary[400],
                active: foundationToken.colors.primary[400],
                focus: foundationToken.colors.primary[400],
                focusVisible: foundationToken.colors.primary[400],
                disabled: foundationToken.colors.primary[400],
              },
            },
            danger: {
              enabled: {
                default: foundationToken.colors.red[600],
                hover: foundationToken.colors.red[600],
                active: foundationToken.colors.red[600],
                focus: foundationToken.colors.red[600],
                focusVisible: foundationToken.colors.red[600],
                disabled: foundationToken.colors.red[400],
              },
              disabled: {
                default: foundationToken.colors.red[400],
                hover: foundationToken.colors.red[400],
                active: foundationToken.colors.red[400],
                focus: foundationToken.colors.red[400],
                focusVisible: foundationToken.colors.red[400],
                disabled: foundationToken.colors.red[400],
              },
            },
          },
        },
      },
      subLabel: {
        fontSize: 12,
        fontWeight: 400,
        color: {
          default: {
            enabled: {
              default: foundationToken.colors.gray[400],
              hover: foundationToken.colors.gray[400],
              active: foundationToken.colors.gray[400],
              focus: foundationToken.colors.gray[400],
              focusVisible: foundationToken.colors.gray[400],
              disabled: foundationToken.colors.gray[400],
            },
            disabled: {
              default: foundationToken.colors.gray[400],
              hover: foundationToken.colors.gray[400],
              active: foundationToken.colors.gray[400],
              focus: foundationToken.colors.gray[400],
              focusVisible: foundationToken.colors.gray[400],
              disabled: foundationToken.colors.gray[400],
            },
          },
          action: {
            primary: {
              enabled: {
                default: foundationToken.colors.primary[400],
                hover: foundationToken.colors.primary[400],
                active: foundationToken.colors.primary[400],
                focus: foundationToken.colors.primary[400],
                focusVisible: foundationToken.colors.primary[400],
                disabled: foundationToken.colors.gray[400],
              },
              disabled: {
                default: foundationToken.colors.primary[400],
                hover: foundationToken.colors.primary[400],
                active: foundationToken.colors.primary[400],
                focus: foundationToken.colors.primary[400],
                focusVisible: foundationToken.colors.primary[400],
                disabled: foundationToken.colors.primary[400],
              },
            },
            danger: {
              enabled: {
                default: foundationToken.colors.red[400],
                hover: foundationToken.colors.red[400],
                active: foundationToken.colors.red[400],
                focus: foundationToken.colors.red[400],
                focusVisible: foundationToken.colors.red[400],
                disabled: foundationToken.colors.red[400],
              },
              disabled: {
                default: foundationToken.colors.red[400],
                hover: foundationToken.colors.red[400],
                active: foundationToken.colors.red[400],
                focus: foundationToken.colors.red[400],
                focusVisible: foundationToken.colors.red[400],
                disabled: foundationToken.colors.red[400],
              },
            },
          },
        },
      },
    },
    seperator: {
      color: foundationToken.colors.gray[200],
      height: 1,
      margin: `${foundationToken.unit[6]} 0`,
    },
  };
};

export default menuTokens;
