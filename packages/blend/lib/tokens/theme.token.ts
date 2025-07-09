import shadowTokens, { type ShadowTokensType } from "./shadows.tokens";
import borderTokens, { type BorderTokensType } from "./border.tokens";
import fontTokens, { type FontTokensType } from "./font.tokens";
import opacityTokens, { type OpacityTokensType } from "./opacity.tokens";
import unitTokens, { type UnitTokensType } from "./unit.tokens";
import colorTokens, { type ColorTokensType } from "./color.tokens";

export type FoundationTokenType = {
  shadows: ShadowTokensType;
  border: BorderTokensType;
  font: FontTokensType;
  opacity: OpacityTokensType;
  unit: UnitTokensType;
  colors: ColorTokensType;
};

const FOUNDATION_THEME: FoundationTokenType = {
  shadows: shadowTokens,
  border: borderTokens,
  font: fontTokens,
  opacity: opacityTokens,
  unit: unitTokens,
  colors: colorTokens,
};

export default FOUNDATION_THEME;
