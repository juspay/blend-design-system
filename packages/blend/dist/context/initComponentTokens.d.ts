import { ThemeType } from '../tokens';
import { ComponentTokenType } from './ThemeContext';
declare const initTokens: (componentTokens: ComponentTokenType, foundationTokens: ThemeType) => Required<ComponentTokenType>;
export default initTokens;
