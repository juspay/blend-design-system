import { CSSObject } from "styled-components";

export type OpacityTokensType = Readonly<{
  0: CSSObject["opacity"];
  5: CSSObject["opacity"];
  10: CSSObject["opacity"];
  20: CSSObject["opacity"];
  30: CSSObject["opacity"];
  40: CSSObject["opacity"];
  50: CSSObject["opacity"];
  60: CSSObject["opacity"];
  70: CSSObject["opacity"];
  80: CSSObject["opacity"];
  90: CSSObject["opacity"];
  100: CSSObject["opacity"];
  [key: string]: CSSObject["opacity"];
}>;

const opacityTokens: OpacityTokensType = {
  0: 0,
  5: 0.05,
  10: 0.1,
  20: 0.2,
  30: 0.3,
  40: 0.4,
  50: 0.5,
  60: 0.6,
  70: 0.7,
  80: 0.8,
  90: 0.9,
  100: 1,
};

export default opacityTokens;
