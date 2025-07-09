//statcard.tokens.ts

import { CSSObject } from "styled-components";
import { StatCardVariant } from "./types";
import { FoundationTokenType } from "../../tokens/theme.token";

export type StatCardState = "default" | "hover" | "loading";

export type StatCardTokenType = {
  height: CSSObject["height"];
  border: {
    [key in StatCardState]?: CSSObject["border"];
  };
  borderRadius: CSSObject["borderRadius"];
  backgroundColor: {
    [key in StatCardState]?: CSSObject["backgroundColor"];
  };
  boxShadow: CSSObject["boxShadow"];
  padding: CSSObject["padding"];
  gap: CSSObject["gap"];
  header: {
      gap: CSSObject["gap"];
      titleIcon: {
        width: CSSObject["width"];
        height: CSSObject["height"];
        marginBottom: CSSObject["marginBottom"];
      };
      title: {
        [key in StatCardVariant]: {
          fontSize: CSSObject["fontSize"];
          fontWeight: CSSObject["fontWeight"];
          color: CSSObject["color"];
        };
      };
      helpIcon: {
        width: CSSObject["width"];
        height: CSSObject["height"];
        color: CSSObject["color"];
      };
    };
    headerStatGap:{
      gap: CSSObject["gap"];
    }

  stats: {
    gap: CSSObject["gap"];
    value: {
      [key in StatCardVariant]: {
        fontSize: CSSObject["fontSize"];
        fontWeight: CSSObject["fontWeight"];
        color: CSSObject["color"];
      };
    };
    change: {
      marginLeft: CSSObject["marginLeft"];
      arrow: {
        width: CSSObject["width"];
        height: CSSObject["height"];
        marginRight: CSSObject["marginRight"];
      };
      text: {
        fontSize: CSSObject["fontSize"];
        fontWeight: CSSObject["fontWeight"];
        increase: {
          color: CSSObject["color"];
        };
        decrease: {
          color: CSSObject["color"];
        };
      };
    };
    subtitle: {
      [key in StatCardVariant]: {
        fontSize: CSSObject["fontSize"];
        fontWeight: CSSObject["fontWeight"];
        color: CSSObject["color"];
      };
    };
  };

  chart: {
    height: CSSObject["height"];
    colors: {
      line: {
        increase: CSSObject["color"];
        decrease: CSSObject["color"];
      };
      area: {
        increase: CSSObject["color"];
        decrease: CSSObject["color"];
      };
      gradient: {
        end: CSSObject["color"];
        startOpacity: number;
        endOpacity: number;
      };
    };
    line: {
      strokeWidth: CSSObject["strokeWidth"];
      activeDot: {
        radius: number;
        fill: CSSObject["fill"];
      };
    };
    bar: {
      radius: number[];
      fill: CSSObject["fill"];
      activeBar: {
        fill: CSSObject["fill"];
      };
    };
    progressBar: {
      height: CSSObject["height"];
      borderRadius: CSSObject["borderRadius"];
      gap: CSSObject["gap"];
      background: {
        fill: CSSObject["backgroundColor"];
        empty: CSSObject["backgroundColor"];
        pattern: {
          color: CSSObject["color"];
          size: CSSObject["backgroundSize"];
        };
      };
      label: {
        fontSize: CSSObject["fontSize"];
        fontWeight: CSSObject["fontWeight"];
        color: CSSObject["color"];
      };
    };
    tooltip: {
      cursor: {
        strokeDasharray: string;
        stroke: CSSObject["stroke"];
      };
      container: {
        backgroundColor: CSSObject["backgroundColor"];
        padding: CSSObject["padding"];
        borderRadius: CSSObject["borderRadius"];
      };
      text: {
        color: CSSObject["color"];
      };
      bar: {
        cursor: {
          fill: CSSObject["fill"];
        };
      };
    };
  };
};

export const getStatCardToken = (foundationToken: FoundationTokenType): StatCardTokenType => {
  return {
    height: "190px",
    border: {
      default: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
    },
    borderRadius: foundationToken.border.radius[8],
    backgroundColor: {
      default: foundationToken.colors.gray[0],
    },
    boxShadow: foundationToken.shadows.xs,
    padding: foundationToken.unit[16],
    gap: foundationToken.unit[24],

    header: {
      gap: foundationToken.unit[8],
      titleIcon: {
        width: foundationToken.unit[20],
        height: foundationToken.unit[20],
        marginBottom: foundationToken.unit[16],
      },
      title: {
        [StatCardVariant.NUMBER]: {
          fontSize: foundationToken.font.size.body.md.fontSize,
          fontWeight: foundationToken.font.weight[500],
          color: foundationToken.colors.gray[400],
        },
        [StatCardVariant.LINE]: {
          fontSize: foundationToken.font.size.body.md.fontSize,
          fontWeight: foundationToken.font.weight[500],
          color: foundationToken.colors.gray[400],
        },
        [StatCardVariant.BAR]: {
          fontSize: foundationToken.font.size.body.md.fontSize,
          fontWeight: foundationToken.font.weight[500],
          color: foundationToken.colors.gray[400],
        },
        [StatCardVariant.PROGRESS_BAR]: {
          fontSize: foundationToken.font.size.body.md.fontSize,
          fontWeight: foundationToken.font.weight[500],
          color: foundationToken.colors.gray[400],
        },
      },
      helpIcon: {
        width: "16px",
        height: "16px",
        color: foundationToken.colors.gray[400],
      },
    },
    headerStatGap: {
      gap: foundationToken.unit[6],
    },
    stats: {
      gap: foundationToken.unit[4],
      value: {
        [StatCardVariant.NUMBER]: {
          fontSize: foundationToken.font.size.heading.xl.fontSize,
          fontWeight: foundationToken.font.weight[600],
          color: foundationToken.colors.gray[800],
        },
        [StatCardVariant.LINE]: {
          fontSize: foundationToken.font.size.heading.lg.fontSize,
          fontWeight: foundationToken.font.weight[600],
          color: foundationToken.colors.gray[800],
        },
        [StatCardVariant.BAR]: {
          fontSize: foundationToken.font.size.heading.lg.fontSize,
          fontWeight: foundationToken.font.weight[600],
          color: foundationToken.colors.gray[800],
        },
        [StatCardVariant.PROGRESS_BAR]: {
          fontSize: foundationToken.font.size.heading.lg.fontSize,
          fontWeight: foundationToken.font.weight[600],
          color: foundationToken.colors.gray[800],
        },
      },
      change: {
        marginLeft: foundationToken.unit[8],
        arrow: {
          width: "14px",
          height: "14px",
          marginRight: foundationToken.unit[2],
        },
        text: {
          fontSize: foundationToken.font.size.body.sm.fontSize,
          fontWeight: foundationToken.font.weight[600],
          increase: {
            color: foundationToken.colors.green[600],
          },
          decrease: {
            color: foundationToken.colors.red[600],
          },
        },
      },
      subtitle: {
        [StatCardVariant.NUMBER]: {
          fontSize: foundationToken.font.size.body.sm.fontSize,
          fontWeight: foundationToken.font.weight[500],
          color: foundationToken.colors.gray[400],
        },
        [StatCardVariant.LINE]: {
          fontSize: foundationToken.font.size.body.sm.fontSize,
          fontWeight: foundationToken.font.weight[500],
          color: foundationToken.colors.gray[400],
        },
        [StatCardVariant.BAR]: {
          fontSize: foundationToken.font.size.body.sm.fontSize,
          fontWeight: foundationToken.font.weight[500],
          color: foundationToken.colors.gray[400],
        },
        [StatCardVariant.PROGRESS_BAR]: {
          fontSize: foundationToken.font.size.body.sm.fontSize,
          fontWeight: foundationToken.font.weight[500],
          color: foundationToken.colors.gray[400],
        },
      },
    },

    // Chart section (all chart types)
    chart: {
      height: "50px",
      colors: {
        line: {
          increase: foundationToken.colors.green[500],
          decrease: foundationToken.colors.red[500],
        },
        area: {
          increase: foundationToken.colors.green[500],
          decrease: foundationToken.colors.red[500],
        },
        gradient: {
          end: foundationToken.colors.gray[0],
          startOpacity: 0.2,
          endOpacity: 0.5,
        },
      },
      line: {
        strokeWidth: 2,
        activeDot: {
          radius: 4,
          fill: foundationToken.colors.gray[0],
        },
      },
      bar: {
        radius: [2, 2, 0, 0],
        fill: foundationToken.colors.primary[500],
        activeBar: {
          fill: foundationToken.colors.primary[100],
        },
      },
      progressBar: {
        height: foundationToken.unit[20],
        borderRadius: foundationToken.border.radius[4],
        gap: foundationToken.unit[16],
        background: {
          fill: foundationToken.colors.primary[500],
          empty: foundationToken.colors.gray[0],
          pattern: {
            color: foundationToken.colors.gray[200],
            size: `${foundationToken.unit[10]} ${foundationToken.unit[10]}`,
          },
        },
        label: {
          fontSize: foundationToken.font.size.body.md.fontSize,
          fontWeight: foundationToken.font.weight[600],
          color: foundationToken.colors.gray[700],
        },
      },
      tooltip: {
        cursor: {
          strokeDasharray: "6 5",
          stroke: foundationToken.colors.gray[400],
        },
        container: {
          backgroundColor: foundationToken.colors.gray[900],
          padding: `${foundationToken.unit[4]} ${foundationToken.unit[8]}`,
          borderRadius: foundationToken.border.radius[4],
        },
        text: {
          color: foundationToken.colors.gray[0],
        },
        bar: {
          cursor: {
            fill: "transparent",
          },
        },
      },
    },
  };
};
