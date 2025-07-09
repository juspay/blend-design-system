import Block from "../../../Primitives/Block/Block";
import { FOUNDATION_THEME } from "../../../../tokens";
import Text from "../../../Text/Text";

type InputFooterProps = {
  error?: boolean;
  errorMessage?: string;
  hintText?: string;
  disabled?: boolean;
};

const InputFooter = ({
  error,
  errorMessage,
  hintText,
  disabled,
}: InputFooterProps) => {
  return (
    <Block width={"100%"}>
      {error && errorMessage && (
        <Text variant="body.md" color={FOUNDATION_THEME.colors.red[500]}>
          {errorMessage}
        </Text>
      )}
      {hintText && !error && (
        <Text
          variant="body.md"
          fontWeight={400}
          color={
            disabled
              ? FOUNDATION_THEME.colors.gray[400]
              : FOUNDATION_THEME.colors.gray[500]
          }
        >
          {hintText}
        </Text>
      )}
    </Block>
  );
};

export default InputFooter;
