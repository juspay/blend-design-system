import { ShadowTokensType } from './shadows.tokens';
import { BorderTokensType } from './border.tokens';
import { FontTokensType } from './font.tokens';
import { OpacityTokensType } from './opacity.tokens';
import { UnitTokensType } from './unit.tokens';
import { ColorTokensType } from './color.tokens';
export type FoundationTokenType = {
    shadows: ShadowTokensType;
    border: BorderTokensType;
    font: FontTokensType;
    opacity: OpacityTokensType;
    unit: UnitTokensType;
    colors: ColorTokensType;
};
declare const FOUNDATION_THEME: FoundationTokenType;
export default FOUNDATION_THEME;
