import { CSSObject } from "styled-components";

type ColorGroupType = Readonly<{
  [key: string]: CSSObject["color"];
}>;

export type ColorTokensType = {
  gray: ColorGroupType;
  primary: ColorGroupType;
  purple: ColorGroupType;
  orange: ColorGroupType;
  red: ColorGroupType;
  green: ColorGroupType;
  yellow: ColorGroupType;
  [key: string]: ColorGroupType;
};

const colorTokens: ColorTokensType = {
  gray: {
    0: "#FFFFFF",
    25: "#FCFCFD",
    50: "#F5F7FA",
    100: "#F2F4F8",
    150: "#ECEFF3",
    200: "#E1E4EA",
    300: "#CACFD8",
    400: "#99A0AE",
    500: "#717784",
    600: "#525866",
    700: "#2B303B",
    800: "#222530",
    900: "#181B25",
    950: "#0E121B",
    1000: "#050506",
  },
  primary: {
    50: "#EFF6FF",
    100: "#DBEAFE",
    200: "#BEDBFF",
    300: "#8EC5FF",
    400: "#51A2FF",
    500: "#2B7FFF",
    600: "#0561E2",
    700: "#1447E6",
    800: "#193CB8",
    900: "#1C398E",
    950: "#162456",
  },
  purple: {
    50: "#FAF5FF",
    100: "#F3E8FF",
    200: "#E9D4FF",
    300: "#DAB2FF",
    400: "#C27AFF",
    500: "#AD46FF",
    600: "#9810FA",
    700: "#8200DB",
    800: "#6E11B0",
    900: "#59168B",
    950: "#3C0366",
  },
  orange: {
    50: "#FFF7ED",
    100: "#FFEDD4",
    200: "#FFD6A8",
    300: "#FFB86A",
    400: "#FF8904",
    500: "#FF6900",
    600: "#F54A00",
    700: "#CA3500",
    800: "#9F2D00",
    900: "#7E2A0C",
    950: "#441306",
  },
  red: {
    50: "#FEF2F2",
    100: "#FFE2E2",
    200: "#FFC9C9",
    300: "#FFA2A2",
    400: "#FF6467",
    500: "#FB2C36",
    600: "#E7000B",
    700: "#C10007",
    800: "#9F0712",
    900: "#82181A",
    950: "#460809",
  },
  green: {
    50: "#F0FDF4",
    100: "#DCFCE7",
    200: "#B9F8CF",
    300: "#7BF1A8",
    400: "#00D492",
    500: "#00C951",
    600: "#00A63E",
    700: "#008236",
    800: "#016630",
    900: "#0D542B",
    950: "#052E16",
  },
  yellow: {
    50: "#FEFCE8",
    100: "#FEF9C2",
    200: "#FFF085",
    300: "#FFDF20",
    400: "#FCC800",
    500: "#EFB100",
    600: "#D08700",
    700: "#A65F00",
    800: "#894B00",
    900: "#733E0A",
    950: "#432004",
  },
};

export default colorTokens;
