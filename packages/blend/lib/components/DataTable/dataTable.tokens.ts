import { FOUNDATION_THEME } from "../../tokens";
import { CSSObject } from "styled-components";
import { FoundationTokenType } from "../../tokens/theme.token";

export type TableTokenType = {
  padding: CSSObject["padding"];
  width: CSSObject["width"];
  display: CSSObject["display"];
  flexDirection: CSSObject["flexDirection"];
  position: CSSObject["position"];
  header: {
    display: CSSObject["display"];
    justifyContent: CSSObject["justifyContent"];
    alignItems: CSSObject["alignItems"];
    marginBottom: CSSObject["marginBottom"];
    gap: CSSObject["gap"];
    maxWidth: CSSObject["maxWidth"];
    overflowX: CSSObject["overflowX"];
    title: CSSObject;
    description: CSSObject;
    headerSlot1: CSSObject;
    headerSlot2: CSSObject;
    headerSlot3: CSSObject;
  };
  dataTable: {
    borderRadius: CSSObject["borderRadius"];
    border: CSSObject["border"];
    maxHeight: CSSObject["maxHeight"];
    minHeight: CSSObject["minHeight"];
    bulkActions: {
      top: CSSObject["top"];
      left: CSSObject["left"];
      transform: CSSObject["transform"];
      zIndex: CSSObject["zIndex"];
      backgroundColor: CSSObject["backgroundColor"];
      color: CSSObject["color"];
      borderRadius: CSSObject["borderRadius"];
      padding: CSSObject["padding"];
      boxShadow: CSSObject["boxShadow"];
      display: CSSObject["display"];
      alignItems: CSSObject["alignItems"];
      gap: CSSObject["gap"];
      minWidth: CSSObject["minWidth"];
      border: CSSObject["border"];
      selectText: CSSObject;
    };
    table: {
      width: CSSObject["width"];
      tableLayout: CSSObject["tableLayout"];
      borderCollapse: CSSObject["borderCollapse"];
      borderSpacing: CSSObject["borderSpacing"];
      position: CSSObject["position"];
      minWidth: CSSObject["minWidth"];
      header: {
        backgroundColor: CSSObject["backgroundColor"];
        borderBottom: CSSObject["borderBottom"];
        height: CSSObject["height"];
        row: CSSObject;
        cell: CSSObject;
        sortable: {
          cursor: CSSObject["cursor"];
          userSelect: CSSObject["userSelect"];
        };
      };
      body: {
        backgroundColor: CSSObject["backgroundColor"];
        borderTop: CSSObject["borderTop"];
        row: CSSObject;
        cell: {
          padding: CSSObject["padding"];
          fontWeight: CSSObject["fontWeight"];
          color: CSSObject["color"];
          fontSize: CSSObject["fontSize"];
          borderTop: CSSObject["borderTop"];
          expandable: {
            padding: CSSObject["padding"];
            borderTop: CSSObject["borderTop"];
            expandButton: {
              display: CSSObject["display"];
              alignItems: CSSObject["alignItems"];
              justifyContent: CSSObject["justifyContent"];
              width: CSSObject["width"];
              height: CSSObject["height"];
              borderRadius: CSSObject["borderRadius"];
              backgroundColor: CSSObject["backgroundColor"];
              cursor: CSSObject["cursor"];
              transition: CSSObject["transition"];
              color: CSSObject["color"];
              border: CSSObject["border"];
              "&:hover": CSSObject["&:hover"];
            };
          };
        };
      };
      footer: {
        display: CSSObject["display"];
        justifyContent: CSSObject["justifyContent"];
        alignItems: CSSObject["alignItems"];
        padding: CSSObject["padding"];
        borderTop: CSSObject["borderTop"];
        height: CSSObject["height"];
        position: CSSObject["position"];
        bottom: CSSObject["bottom"];
        backgroundColor: CSSObject["backgroundColor"];
        zIndex: CSSObject["zIndex"];
        flexShrink: CSSObject["flexShrink"];
        pagination: {
          pageText: {
            fontSize: CSSObject["fontSize"];
            color: CSSObject["color"];
          };
          pageSizeSelector: {
            gap: CSSObject["gap"];
            padding: CSSObject["padding"];
            borderRadius: CSSObject["borderRadius"];
            display: CSSObject["display"];
            alignItems: CSSObject["alignItems"];
            backgroundColor: CSSObject["backgroundColor"];
            border: CSSObject["border"];
            background: CSSObject["background"];
            cursor: CSSObject["cursor"];
            color: CSSObject["color"];
            fontSize: CSSObject["fontSize"];
            hoverColor: CSSObject["backgroundColor"];
          };
          pageNavigation: {
            gap: CSSObject["gap"];
          };
        };
      };
    };
  };
};

export const getTableToken = (
  foundationToken: FoundationTokenType,
): TableTokenType => {
  return {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    padding: foundationToken.unit[2],
    position: "relative",
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: foundationToken.unit[16],
      gap: foundationToken.unit[20],
      maxWidth: "100vw",
      overflowX: "auto",
      title: {
        fontSize: foundationToken.font.size.heading.md.fontSize,
        fontWeight: 600,
        color: foundationToken.colors.gray[800],
      },
      description: {
        fontSize: foundationToken.font.size.body.md.fontSize,
        color: foundationToken.colors.gray[500],
        lineHeight: foundationToken.unit[20],
        maxWidth: "70%",
      },
      headerSlot1: {
        maxHeight: `${foundationToken.unit[36]}`,
        flexShrink: 0,
      },
      headerSlot2: {
        maxHeight: `${foundationToken.unit[36]}`,
        flexShrink: 0,
      },
      headerSlot3: {
        maxHeight: `${foundationToken.unit[36]}`,
        flexShrink: 0,
      },
    },
    dataTable: {
      borderRadius: foundationToken.border.radius[8],
      border: `1px solid ${foundationToken.colors.gray[200]}`,
      maxHeight: "calc(100vh - 250px)",
      minHeight: "380px",
      bulkActions: {
        top: "80%",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        backgroundColor: FOUNDATION_THEME.colors.gray[0],
        color: FOUNDATION_THEME.colors.gray[700],
        borderRadius: `${FOUNDATION_THEME.border.radius[12]}`,
        padding: `${FOUNDATION_THEME.unit[8]} ${FOUNDATION_THEME.unit[16]}`,
        boxShadow: FOUNDATION_THEME.shadows.lg,
        display: "flex",
        alignItems: "center",
        gap: FOUNDATION_THEME.unit[12],
        minWidth: "320px",
        border: `${FOUNDATION_THEME.border.width[1]} solid ${FOUNDATION_THEME.colors.gray[200]}`,
        selectText: {
          fontSize: foundationToken.font.size.body.sm.fontSize,
          fontWeight: foundationToken.font.weight[500],
          flex: 1,
        },
      },
      table: {
        width: "100%",
        tableLayout: "auto",
        borderCollapse: "separate",
        borderSpacing: 0,
        position: "relative",
        minWidth: "max-content",
        header: {
          backgroundColor: foundationToken.colors.gray[25],
          borderBottom: `1px solid ${foundationToken.colors.gray[150]}`,
          height: foundationToken.unit[40],
          row: {
            height: foundationToken.unit[56],
            "&:hover": {
              backgroundColor: foundationToken.colors.gray[50],
            },
          },
          cell: {
            padding: `${foundationToken.unit[4]} ${foundationToken.unit[8]}`,
            textAlign: "left",
            fontWeight: foundationToken.font.weight[500],
            color: foundationToken.colors.gray[400],
            fontSize: `${foundationToken.font.size.body.sm.fontSize}px`,
          },
          sortable: {
            cursor: "pointer",
            userSelect: "none",
          },
        },
        body: {
          backgroundColor: foundationToken.colors.gray[25],
          borderTop: `1px solid ${foundationToken.colors.gray[150]}`,
          row: {
            height: foundationToken.unit[56],
            "&:hover": {
              backgroundColor: foundationToken.colors.gray[50],
              cursor: "pointer",
            },
            backgroundColor: foundationToken.colors.gray[25],
          },
          cell: {
            padding: `${foundationToken.unit[4]} ${foundationToken.unit[8]}`,
            fontWeight: foundationToken.font.weight[500],
            color: foundationToken.colors.gray[400],
            fontSize: `${foundationToken.font.size.body.sm.fontSize}px`,
            borderTop: `1px solid ${foundationToken.colors.gray[150]}`,
            expandable: {
              padding: `${foundationToken.unit[16]}`,
              borderTop: `1px solid ${foundationToken.colors.gray[150]}`,
              expandButton: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: `${foundationToken.unit[32]}`,
                height: `${foundationToken.unit[32]}`,
                borderRadius: `${FOUNDATION_THEME.border.radius[4]}`,
                backgroundColor: "transparent",
                cursor: "pointer",
                transition: "background-color 0.2s",
                color: FOUNDATION_THEME.colors.gray[500],
                border: "none",
                "&:hover": {
                  backgroundColor: FOUNDATION_THEME.colors.gray[100],
                  color: FOUNDATION_THEME.colors.gray[700],
                },
              },
            },
          },
        },
        footer: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: `${foundationToken.unit[4]} ${foundationToken.unit[16]}`,
          borderTop: `1px solid ${foundationToken.colors.gray[150]}`,
          height: foundationToken.unit[48],
          position: "sticky",
          bottom: 0,
          backgroundColor: foundationToken.colors.gray[25],
          zIndex: 0,
          flexShrink: 0,
          pagination: {
            pageText: {
              fontSize: `${foundationToken.font.size.body.md.fontSize}px`,
              color: foundationToken.colors.gray[600],
            },
            pageSizeSelector: {
              gap: foundationToken.unit[4],
              padding: `${foundationToken.unit[4]} ${foundationToken.unit[8]}`,
              borderRadius: foundationToken.border.radius[2],
              backgroundColor: foundationToken.colors.gray[25],
              display: "flex",
              alignItems: "center",
              border: "none",
              background: "none",
              cursor: "pointer",
              color: foundationToken.colors.gray[600],
              fontSize: `${foundationToken.font.size.body.md.fontSize}px`,
              hoverColor: foundationToken.colors.gray[50],
            },
            pageNavigation: {
              gap: foundationToken.unit[4],
            },
          },
        },
      },
    },
  };
};
