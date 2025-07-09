import { CSSObject } from "styled-components";

type BorderWidthType = Readonly<{
  0: CSSObject["borderWidth"];
  1: CSSObject["borderWidth"];
  1.5: CSSObject["borderWidth"];
  2: CSSObject["borderWidth"];
  3: CSSObject["borderWidth"];
  4: CSSObject["borderWidth"];
  [key: string]: CSSObject["borderWidth"];
}>;

type BorderRadiusType = Readonly<{
  0: CSSObject["borderRadius"];
  2: CSSObject["borderRadius"];
  4: CSSObject["borderRadius"];
  6: CSSObject["borderRadius"];
  8: CSSObject["borderRadius"];
  10: CSSObject["borderRadius"];
  12: CSSObject["borderRadius"];
  16: CSSObject["borderRadius"];
  20: CSSObject["borderRadius"];
  full: CSSObject["borderRadius"];
  [key: string]: CSSObject["borderRadius"];
}>;

export type BorderTokensType = Readonly<{
  width: BorderWidthType;
  radius: BorderRadiusType;
}>;

const borderTokens: BorderTokensType = {
  width: {
    0: "0px",
    1: "1px",
    1.5: "1.5px",
    2: "2px",
    3: "3px",
    4: "4px",
  },
  radius: {
    0: "0px",
    2: "2px",
    4: "4px",
    6: "6px",
    8: "8px",
    10: "10px",
    12: "12px",
    16: "16px",
    20: "20px",
    full: "9999px",
  },
};

export default borderTokens;
