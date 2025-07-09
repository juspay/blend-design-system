import { CSSObject } from "styled-components";

type UnitType =
  | CSSObject["width"]
  | CSSObject["height"]
  | CSSObject["gap"]
  | CSSObject["padding"]
  | CSSObject["margin"];

export type UnitTokensType = Readonly<{
  0: UnitType;
  1: UnitType;
  2: UnitType;
  3: UnitType;
  4: UnitType;
  5: UnitType;
  6: UnitType;
  7: UnitType;
  8: UnitType;
  9: UnitType;
  10: UnitType;
  12: UnitType;
  14: UnitType;
  16: UnitType;
  18: UnitType;
  20: UnitType;
  22: UnitType;
  24: UnitType;
  28: UnitType;
  32: UnitType;
  36: UnitType;
  40: UnitType;
  48: UnitType;
  52: UnitType;
  56: UnitType;
  64: UnitType;
  auto: UnitType;
  [key: string]: UnitType;
}>;

const unitTokens: UnitTokensType = {
  0: "0px",
  1: "1px",
  2: "2px",
  3: "3px",
  4: "4px",
  5: "5px",
  6: "6px",
  7: "7px",
  8: "8px",
  9: "9px",
  10: "10px",
  12: "12px",
  14: "14px",
  16: "16px",
  18: "18px",
  20: "20px",
  22: "22px",
  24: "24px",
  28: "28px",
  32: "32px",
  36: "36px",
  40: "40px",
  48: "48px",
  52: "52px",
  56: "56px",
  64: "64px",
  auto: "auto",
};

export default unitTokens;
