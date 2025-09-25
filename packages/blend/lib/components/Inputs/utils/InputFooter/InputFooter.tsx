import Block from '../../../Primitives/Block/Block'
import { FOUNDATION_THEME } from '../../../../tokens'
import Text from '../../../Text/Text'
import { SingleSelectTokensType } from '../../../SingleSelect/singleSelect.tokens'
import { MultiSelectTokensType } from '../../../MultiSelect/multiSelect.tokens'

type InputFooterProps = {
    error?: boolean
    errorMessage?: string
    hintText?: string
    disabled?: boolean
    tokens?: MultiSelectTokensType | SingleSelectTokensType
}

const InputFooter = ({
    error,
    errorMessage,
    hintText,
    disabled,
    tokens,
}: InputFooterProps) => {
    return (
        ((error && errorMessage) || hintText) && (
            <Block width={'100%'}>
                {error && errorMessage && (
                    <Text
                        // variant="body.md"
                        color={
                            tokens?.errorMessage?.color ||
                            FOUNDATION_THEME.colors.red[600]
                        }
                        fontSize={
                            tokens?.errorMessage?.fontSize ||
                            FOUNDATION_THEME.font.size.body.md.fontSize
                        }
                        fontWeight={
                            tokens?.errorMessage?.fontWeight ||
                            FOUNDATION_THEME.font.weight[500]
                        }
                    >
                        {errorMessage}
                    </Text>
                )}
                {hintText && !error && (
                    <Text
                        // variant="body.md"
                        fontWeight={
                            tokens?.hintText?.fontWeight ||
                            FOUNDATION_THEME.font.weight[400]
                        }
                        fontSize={
                            tokens?.hintText?.fontSize ||
                            FOUNDATION_THEME.font.size.body.md.fontSize
                        }
                        color={
                            disabled
                                ? tokens?.hintText?.color?.disabled ||
                                  FOUNDATION_THEME.colors.gray[400]
                                : tokens?.hintText?.color?.default ||
                                  FOUNDATION_THEME.colors.gray[500]
                        }
                    >
                        {hintText}
                    </Text>
                )}
            </Block>
        )
    )
}

export default InputFooter
