import { useComponentToken } from "../../context/useComponentToken";
import { ButtonSubTypeV2, ButtonV2 } from "../ButtonV2";
import Block from "../Primitives/Block/Block";
import { PopoverTokenType } from "./popover.tokens";
import { PopoverProps } from "./types";

const PopoverFooter = ({
  primaryAction,
  secondaryAction,
}: Pick<PopoverProps, "primaryAction" | "secondaryAction">) => {
  const popoverTokens = useComponentToken("POPOVER") as PopoverTokenType;
  if (!primaryAction || !secondaryAction) return null;

  return (
    <Block
      data-design-system="true"
      display="flex"
      alignItems="center"
      gap={popoverTokens.footer.gap}
      justifyContent={popoverTokens.footer.justifyContent}
    >
      {primaryAction && (
        <ButtonV2 {...primaryAction} subType={ButtonSubTypeV2.INLINE} />
      )}
      {secondaryAction && (
        <ButtonV2 {...secondaryAction} subType={ButtonSubTypeV2.INLINE} />
      )}
    </Block>
  );
};

PopoverFooter.displayName = "PopoverFooter";

export default PopoverFooter;
