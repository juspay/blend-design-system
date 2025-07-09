import { CSSObject } from "styled-components";
import { FOUNDATION_THEME, ThemeType } from "../../tokens";
import {
  CheckboxSize,
  CheckboxCheckedState,
  CheckboxInteractionState,
} from "./types";

// Token Structure: $component.$target.$property.[$variant].[$type].[$state]
// $component: CHECKBOX (implied)
// $target: e.g., indicator, icon, content.label, content.subtext, required, transition
// $property: e.g., size, background, border, color, font, spacing, duration
// [$variant]: Optional. e.g., CheckboxSize (sm, md), CheckboxCheckedState (checked, unchecked, indeterminate)
// [$type]: Optional. Generally not used explicitly in this component's tokens.
// [$state]: Optional. e.g., CheckboxInteractionState (default, hover, disabled, error)

export type CheckboxTokensType = Readonly<{
  // Top-level layout tokens (can be considered $target: 'layout', $property: 'gap', etc.)
  gap: CSSObject["gap"];
  slotGap: CSSObject["gap"];
  checkboxMarginRight: CSSObject["marginRight"];

  // $target: 'indicator' (The checkbox square itself)
  indicator: {
    // $property: 'size'
    size: {
      [key in CheckboxSize]: {
        // $variant: sm, md
        width: CSSObject["width"];
        height: CSSObject["height"];
      };
    };
    // $property: 'background'
    background: {
      [key in CheckboxCheckedState]?: {
        // $variant: checked, unchecked, indeterminate
        [key in CheckboxInteractionState]?: CSSObject["backgroundColor"]; // $state: default, hover, disabled, error
      };
    };
    // $property: 'border'
    border: {
      radius: CSSObject["borderRadius"]; // Direct sub-property
      width: CSSObject["borderWidth"]; // Direct sub-property
      color: {
        // Sub-property 'color'
        [key in CheckboxCheckedState]?: {
          // $variant: checked, unchecked, indeterminate
          [key in CheckboxInteractionState]?: CSSObject["borderColor"]; // $state: default, hover, disabled, error
        };
      };
    };
    // $property: 'focus' (conceptually, focus is a $state of the 'indicator' $target)
    focus: {
      outlineColor: CSSObject["borderColor"]; // Sub-property
      outlineWidth: CSSObject["borderWidth"]; // Sub-property
      outlineOffset: CSSObject["outlineOffset"]; // Sub-property
      boxShadow: CSSObject["boxShadow"]; // Sub-property
    };
  };

  // $target: 'icon' (The check/minus symbol)
  icon: {
    // $property: 'color'
    color: {
      [key in Exclude<CheckboxCheckedState, "unchecked">]?: {
        // $variant: checked, indeterminate
        // $state: default, disabled
        [key in Extract<
          CheckboxInteractionState,
          "default" | "disabled"
        >]?: CSSObject["color"];
      };
    };
    // $property: 'size'
    size: {
      [key in CheckboxSize]: {
        // $variant: sm, md
        width: CSSObject["width"];
        height: CSSObject["height"];
        strokeWidth: CSSObject["strokeWidth"];
      };
    };
  };

  // $target: 'content' (Wrapper for label and subtext)
  content: {
    gap: CSSObject["gap"];
    // Sub-target: 'label'
    label: {
      // $property: 'color'
      color: {
        // $state: default, disabled, error (hover is usually not applied to label color directly)
        [key in Exclude<CheckboxInteractionState, "hover">]: CSSObject["color"];
      };
      // $property: 'font'
      font: {
        [key in CheckboxSize]: {
          // $variant: sm, md
          fontSize: CSSObject["fontSize"];
          fontWeight: CSSObject["fontWeight"];
        };
      };
    };
    // Sub-target: 'subtext'
    subtext: {
      // $property: 'color'
      color: {
        [key in Exclude<CheckboxInteractionState, "hover">]: CSSObject["color"]; // $state: default, disabled, error
      };
      // $property: 'font'
      font: {
        [key in CheckboxSize]: {
          // $variant: sm, md
          fontSize: CSSObject["fontSize"];
          fontWeight: CSSObject["fontWeight"];
        };
      };
      // $property: 'spacing'
      spacing: {
        left: {
          // Sub-property
          [key in CheckboxSize]: CSSObject["marginLeft"]; // $variant: sm, md
        };
        top: CSSObject["marginTop"]; // Sub-property
      };
    };
  };

  // $target: 'required' (The required indicator, e.g., asterisk)
  required: {
    color: CSSObject["color"]; // $property
    spacing: CSSObject["marginLeft"]; // $property
  };

  // $target: 'transition' (General animation properties)
  transition: {
    duration: CSSObject["transitionDuration"]; // $property
    easing: CSSObject["transitionTimingFunction"]; // $property
  };
}>;

export const getCheckboxTokens = (
  foundationToken: ThemeType,
): CheckboxTokensType => {
  return {
    gap: foundationToken.unit[8],
    slotGap: foundationToken.unit[6],
    checkboxMarginRight: foundationToken.unit[8],

    indicator: {
      size: {
        sm: {
          width: foundationToken.unit[14],
          height: foundationToken.unit[14],
        },
        md: {
          width: foundationToken.unit[16],
          height: foundationToken.unit[16],
        },
      },
      background: {
        unchecked: {
          default: foundationToken.colors.gray[0],
          hover: foundationToken.colors.gray[0],
          disabled: foundationToken.colors.gray[50],
          error: foundationToken.colors.gray[0],
        },
        checked: {
          default: foundationToken.colors.primary[500],
          hover: foundationToken.colors.primary[600],
          disabled: foundationToken.colors.primary[200],
          error: foundationToken.colors.primary[500],
        },
        indeterminate: {
          default: foundationToken.colors.primary[500],
          hover: foundationToken.colors.primary[600],
          disabled: foundationToken.colors.primary[200],
          error: foundationToken.colors.primary[500],
        },
      },
      border: {
        radius: foundationToken.border.radius[4],
        width: foundationToken.border.width[1],
        color: {
          unchecked: {
            default: foundationToken.colors.gray[200],
            hover: foundationToken.colors.primary[600],
            disabled: foundationToken.colors.gray[100],
            error: foundationToken.colors.red[500],
          },
          checked: {
            default: "transparent",
            hover: "transparent",
            disabled: "transparent",
            error: foundationToken.colors.red[500],
          },
          indeterminate: {
            default: "transparent",
            hover: "transparent",
            disabled: "transparent",
            error: foundationToken.colors.red[500],
          },
        },
      },
      focus: {
        outlineColor: foundationToken.colors.primary[200],
        outlineWidth: foundationToken.border.width[2],
        outlineOffset: foundationToken.unit[2],
        boxShadow: `0 0 0 2px ${foundationToken.colors.primary[100]}`,
      },
    },

    icon: {
      color: {
        checked: {
          default: foundationToken.colors.gray[0],
          disabled: foundationToken.colors.gray[0],
        },
        indeterminate: {
          default: foundationToken.colors.gray[0],
          disabled: foundationToken.colors.gray[0],
        },
      },
      size: {
        sm: {
          width: foundationToken.unit[10],
          height: foundationToken.unit[10],
          strokeWidth: 2.5,
        },
        md: {
          width: foundationToken.unit[12],
          height: foundationToken.unit[12],
          strokeWidth: 2.5,
        },
      },
    },

    content: {
      gap: foundationToken.unit[2],
      label: {
        color: {
          default: foundationToken.colors.gray[600],
          disabled: foundationToken.colors.gray[400],
          error: foundationToken.colors.red[600],
        },
        font: {
          sm: {
            fontSize: `${foundationToken.font.size.body.md.fontSize}px`,
            fontWeight: foundationToken.font.weight[500],
          },
          md: {
            fontSize: `${foundationToken.font.size.body.md.fontSize}px`,
            fontWeight: foundationToken.font.weight[500],
          },
        },
      },
      subtext: {
        color: {
          default: foundationToken.colors.gray[400],
          disabled: foundationToken.colors.gray[200],
          error: foundationToken.colors.red[500],
        },
        font: {
          sm: {
            fontSize: `${foundationToken.font.size.body.sm.fontSize}px`,
            fontWeight: foundationToken.font.weight[400],
          },
          md: {
            fontSize: `${foundationToken.font.size.body.md.fontSize}px`,
            fontWeight: foundationToken.font.weight[400],
          },
        },
        spacing: {
          left: {
            sm: foundationToken.unit[20],
            md: foundationToken.unit[24],
          },
          top: foundationToken.unit[4],
        },
      },
    },

    required: {
      color: foundationToken.colors.red[600],
      spacing: foundationToken.unit[2],
    },

    transition: {
      duration: "150ms",
      easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
  };
};

const checkboxTokens: CheckboxTokensType = getCheckboxTokens(FOUNDATION_THEME);

export default checkboxTokens;
