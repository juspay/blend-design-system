import { FOUNDATION_THEME } from "../../tokens";
import { CSSObject } from "styled-components";
import { FoundationTokenType } from "../../tokens/theme.token";

export type CalendarTokenType = {
  quickRange: {
    width: CSSObject["width"];
    trigger: {
      height: CSSObject["height"];
      borderLeft: CSSObject["borderLeft"];
      borderTop: CSSObject["borderTop"];
      borderBottom: CSSObject["borderBottom"];
      borderTopLeftRadius: CSSObject["borderTopLeftRadius"];
      borderBottomLeftRadius: CSSObject["borderBottomLeftRadius"];
      padding: CSSObject["padding"];
      display: CSSObject["display"];
      justifyContent: CSSObject["justifyContent"];
      alignItems: CSSObject["alignItems"];
      cursor: CSSObject["cursor"];
      width: CSSObject["width"];
      backgroundColor: CSSObject["backgroundColor"];
      iconSize: CSSObject["iconSize"];
      text: CSSObject;
    };
    content: {
      padding: CSSObject["padding"];
      width: CSSObject["width"];
      zIndex: CSSObject["zIndex"];
      backgroundColor: CSSObject["backgroundColor"];
      borderRadius: CSSObject["borderRadius"];
      boxShadow: CSSObject["boxShadow"];
      overflowY: CSSObject["overflowY"];
      overflowX: CSSObject["overflowX"];
    };
    item: {
      width: CSSObject["width"];
      textAlign: CSSObject["textAlign"];
      padding: CSSObject["padding"];
      borderRadius: CSSObject["borderRadius"];
      transition: CSSObject["transition"];
      cursor: CSSObject["cursor"];
      border: CSSObject["border"];
      backgroundColor: CSSObject["backgroundColor"];
      display: CSSObject["display"];
      active: CSSObject;
      text: CSSObject;
      "&:hover": CSSObject;
      "&:focus": CSSObject;
      "&[data-highlighted]": CSSObject;
    };
  };
  trigger: {
    height: CSSObject["height"];
    display: CSSObject["display"];
    alignItems: CSSObject["alignItems"];
    justifyContent: CSSObject["justifyContent"];
    padding: CSSObject["padding"];
    border: CSSObject["border"];
    borderRadius: CSSObject["borderRadius"];
    boxShadow: CSSObject["boxShadow"];
    backgroundColor: CSSObject["backgroundColor"];
    fontSize: CSSObject["fontSize"];
    color: CSSObject["color"];
    cursor: CSSObject["cursor"];
    disabled: {
      opacity: CSSObject["opacity"];
      cursor: CSSObject["cursor"];
    };
    borderRadiusWithPresets: CSSObject["borderRadius"];
    borderRadiusWithoutPresets: CSSObject["borderRadius"];
  };
  calendar: {
    minWidth: CSSObject["minWidth"];
    width: CSSObject["width"];
    backgroundColor: CSSObject["backgroundColor"];
    border: CSSObject["border"];
    borderRadius: CSSObject["borderRadius"];
    boxShadow: CSSObject["boxShadow"];
    zIndex: CSSObject["zIndex"];
    inputs: {
      padding: CSSObject["padding"];
      dateInput: {
        gap: CSSObject["gap"];
        label: {
          color: CSSObject["color"];
          minWidth: CSSObject["minWidth"];
        };
      };
    };
    calendarGrid: {
      container: {
        maxHeight: CSSObject["maxHeight"];
        overflowY: CSSObject["overflowY"];
        overflow: CSSObject["overflow"];
        position: CSSObject["position"];
      };
      month: {
        header: {
          fontSize: CSSObject["fontSize"];
          fontWeight: CSSObject["fontWeight"];
          color: CSSObject["color"];
          padding: CSSObject["padding"];
        };
        container: {
          position: CSSObject["position"];
          height: CSSObject["height"];
        };
      };
      week: {
        row: {
          display: CSSObject["display"];
          gridTemplateColumns: CSSObject["gridTemplateColumns"];
          padding: CSSObject["padding"];
        };
        header: {
          display: CSSObject["display"];
          gridTemplateColumns: CSSObject["gridTemplateColumns"];
          textAlign: CSSObject["textAlign"];
          color: CSSObject["color"];
          padding: CSSObject["padding"];
          position: CSSObject["position"];
          top: CSSObject["top"];
          zIndex: CSSObject["zIndex"];
          backgroundColor: CSSObject["backgroundColor"];
          boxShadow: CSSObject["boxShadow"];
        };
        dayName: {
          padding: CSSObject["padding"];
        };
      };
      day: {
        cell: {
          cursor: CSSObject["cursor"];
          textAlign: CSSObject["textAlign"];
          padding: CSSObject["padding"];
          position: CSSObject["position"];
          fontWeight: CSSObject["fontWeight"];
          boxSizing: CSSObject["boxSizing"];
          border: CSSObject["border"];
        };
        hover: {
          border: CSSObject["border"];
          borderRadius: CSSObject["borderRadius"];
        };
        empty: {
          padding: CSSObject["padding"];
        };
        states: {
          startDate: CSSObject;
          endDate: CSSObject;
          singleDate: CSSObject;
          rangeDay: CSSObject;
          todayDay: CSSObject;
          hoverState: CSSObject;
          disabledDay: CSSObject;
        };
        text: {
          dayNumber: CSSObject;
          selectedDay: CSSObject;
          rangeDay: CSSObject;
          todayDay: CSSObject;
        };
        todayIndicator: {
          position: CSSObject["position"];
          width: CSSObject["width"];
          height: CSSObject["height"];
          backgroundColor: CSSObject["backgroundColor"];
          borderRadius: CSSObject["borderRadius"];
          bottom: CSSObject["bottom"];
          left: CSSObject["left"];
          transform: CSSObject["transform"];
        };
      };
    };
    footer: {
      padding: CSSObject["padding"];
      borderTop: CSSObject["borderTop"];
      timerange: {
        gap: CSSObject["gap"];
        color: CSSObject["color"];
        fontWeight: CSSObject["fontWeight"];
        fontSize: CSSObject["fontSize"];
      };
      button: {
        gap: CSSObject["gap"];
      };
    };
  };
};

export const getCalendarToken = (
  foundationToken: FoundationTokenType,
): CalendarTokenType => {
  return {
    quickRange: {
      width: "136px",
      trigger: {
        height: foundationToken.unit[40],
        borderLeft: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[300]}`,
        borderTop: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[300]}`,
        borderBottom: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[300]}`,
        borderTopLeftRadius: foundationToken.border.radius[8],
        borderBottomLeftRadius: foundationToken.border.radius[8],
        padding: `${foundationToken.unit[10]} ${foundationToken.unit[12]}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
        width: "100%",
        backgroundColor: "transparent",
        iconSize: foundationToken.unit[16],
        text: {
          color: foundationToken.colors.gray[600],
          fontSize: `${foundationToken.font.size.body.md.fontSize}px`,
          fontWeight: foundationToken.font.weight[500],
        },
      },
      content: {
        padding: FOUNDATION_THEME.unit[4],
        width: "100%",
        zIndex: 1000,
        backgroundColor: FOUNDATION_THEME.colors.gray[0],
        borderRadius: FOUNDATION_THEME.border.radius[6],
        boxShadow: FOUNDATION_THEME.shadows.lg,
        overflowY: "auto",
        overflowX: "hidden",
      },
      item: {
        width: "100%",
        textAlign: "left",
        padding: `${foundationToken.unit[8]} ${foundationToken.unit[12]}`,
        borderRadius: foundationToken.border.radius[6],
        transition: "background-color 0.15s ease-in-out",
        cursor: "pointer",
        border: "none",
        backgroundColor: "transparent",
        display: "block",
        "&:hover": {
          backgroundColor: foundationToken.colors.gray[50],
        },
        "&:focus": {
          outline: "none",
          backgroundColor: foundationToken.colors.gray[50],
        },
        "&[data-highlighted]": {
          backgroundColor: foundationToken.colors.gray[50],
        },
        active: {
          backgroundColor: foundationToken.colors.primary[50],
          color: foundationToken.colors.primary[700],
          fontWeight: foundationToken.font.weight[500],
        },
        text: {
          color: foundationToken.colors.gray[600],
          fontWeight: foundationToken.font.weight[500],
          fontSize: `${foundationToken.font.size.body.md.fontSize}px`,
        },
      },
    },
    trigger: {
      height: foundationToken.unit[40],
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: `${foundationToken.unit[8]} ${foundationToken.unit[12]}`,
      border: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[300]}`,
      borderRadius: foundationToken.border.radius[8],
      boxShadow: foundationToken.shadows.sm,
      backgroundColor: foundationToken.colors.gray[0],
      fontSize: `${foundationToken.font.size.body.md.fontSize}px`,
      color: foundationToken.colors.gray[700],
      cursor: "pointer",
      disabled: {
        opacity: 0.5,
        cursor: "not-allowed",
      },
      borderRadiusWithPresets: "0 8px 8px 0",
      borderRadiusWithoutPresets: foundationToken.border.radius[8],
    },
    calendar: {
      minWidth: "364px",
      width: "364px",
      backgroundColor: foundationToken.colors.gray[0],
      border: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
      borderRadius: foundationToken.border.radius[8],
      boxShadow: foundationToken.shadows.lg,
      zIndex: 1000,
      inputs: {
        padding: `${foundationToken.unit[8]} ${foundationToken.unit[16]}`,
        dateInput: {
          gap: foundationToken.unit[16],
          label: {
            color: foundationToken.colors.gray[400],
            minWidth: foundationToken.unit[36],
          },
        },
      },
      calendarGrid: {
        container: {
          maxHeight: "380px",
          overflowY: "auto",
          overflow: "auto",
          position: "relative",
        },
        month: {
          header: {
            fontSize: `${foundationToken.font.size.body.lg.fontSize}px`,
            fontWeight: foundationToken.font.weight[600],
            color: foundationToken.colors.gray[700],
            padding: `${foundationToken.unit[0]} ${foundationToken.unit[12]}`,
          },
          container: {
            position: "absolute",
            height: "auto",
          },
        },
        week: {
          row: {
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            padding: `0 ${foundationToken.unit[12]}`,
          },
          header: {
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            textAlign: "center",
            color: foundationToken.colors.gray[500],
            padding: `0 ${foundationToken.unit[8]}`,
            position: "sticky",
            top: 0,
            zIndex: 10,
            backgroundColor: foundationToken.colors.gray[0],
            boxShadow: `0 2px 4px -1px ${foundationToken.colors.gray[200]}`,
          },
          dayName: {
            padding: `${foundationToken.unit[12]} ${foundationToken.unit[8]}`,
          },
        },
        day: {
          cell: {
            cursor: "pointer",
            textAlign: "center",
            padding: `${foundationToken.unit[12]} ${foundationToken.unit[8]}`,
            position: "relative",
            fontWeight: foundationToken.font.weight[500],
            boxSizing: "border-box",
            border: "1px solid transparent",
          },
          hover: {
            border: `1px solid ${foundationToken.colors.primary[500]}`,
            borderRadius: foundationToken.border.radius[8],
          },
          empty: {
            padding: `${foundationToken.unit[12]} ${foundationToken.unit[8]}`,
          },
          states: {
            startDate: {
              backgroundColor: foundationToken.colors.primary[500],
              borderTopLeftRadius: foundationToken.border.radius[8],
              borderBottomLeftRadius: foundationToken.border.radius[8],
            },
            endDate: {
              backgroundColor: foundationToken.colors.primary[500],
              borderTopRightRadius: foundationToken.border.radius[8],
              borderBottomRightRadius: foundationToken.border.radius[8],
            },
            singleDate: {
              backgroundColor: foundationToken.colors.primary[500],
              borderRadius: foundationToken.border.radius[8],
            },
            rangeDay: {
              backgroundColor: foundationToken.colors.primary[50],
            },
            todayDay: {
              fontWeight: foundationToken.font.weight[500],
            },
            hoverState: {
              "&:hover": {
                boxShadow: `inset 0 0 0 1px ${foundationToken.colors.primary[500]}`,
                borderRadius: foundationToken.border.radius[8],
              },
            },
            disabledDay: {
              opacity: 0.4,
              cursor: "not-allowed",
              pointerEvents: "none",
            },
          },
          text: {
            dayNumber: {
              color: foundationToken.colors.gray[600],
            },
            selectedDay: {
              color: foundationToken.colors.gray[0],
            },
            rangeDay: {
              color: foundationToken.colors.gray[600],
            },
            todayDay: {
              color: foundationToken.colors.primary[500],
            },
          },
          todayIndicator: {
            position: "absolute",
            width: foundationToken.unit[4],
            height: foundationToken.unit[4],
            backgroundColor: foundationToken.colors.primary[500],
            borderRadius: foundationToken.border.radius.full,
            bottom: foundationToken.unit[4],
            left: "50%",
            transform: "translateX(-50%)",
          },
        },
      },
      footer: {
        padding: foundationToken.unit[16],
        borderTop: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
        timerange: {
          gap: foundationToken.unit[8],
          color: foundationToken.colors.gray[600],
          fontWeight: foundationToken.font.weight[500],
          fontSize: `${foundationToken.font.size.body.md.fontSize}px`,
        },
        button: {
          gap: foundationToken.unit[12],
        },
      },
    },
  };
};
