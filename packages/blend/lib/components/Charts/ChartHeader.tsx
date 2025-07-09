import { ChartHeaderProps } from "./types";
import Block from "../../components/Primitives/Block/Block";
import { FOUNDATION_THEME } from "../../tokens";

export const ChartHeader: React.FC<ChartHeaderProps> = ({
  slot1,
  slot2,
  slot3,
  chartHeaderSlot,
}) => {
  return (
    <Block
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      gap={FOUNDATION_THEME.unit[8]}
      padding={FOUNDATION_THEME.unit[16]}
      paddingLeft={FOUNDATION_THEME.unit[18]}
      paddingRight={FOUNDATION_THEME.unit[18]}
      backgroundColor={FOUNDATION_THEME.colors.gray[25]}
      borderBottom={`1px solid ${FOUNDATION_THEME.colors.gray[200]}`}
      borderRadius={FOUNDATION_THEME.border.radius[8]}
      borderBottomLeftRadius={FOUNDATION_THEME.border.radius[0]}
      borderBottomRightRadius={FOUNDATION_THEME.border.radius[0]}
    >
      <Block>{chartHeaderSlot}</Block>
      <Block
        display="flex"
        alignItems="center"
        gap={FOUNDATION_THEME.unit[8]}
        flexShrink={0}
      >
        {slot1}
        {slot2}
        {slot3}
      </Block>
    </Block>
  );
};
